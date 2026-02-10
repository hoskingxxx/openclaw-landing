#!/bin/bash
#
# 404 Sentinel - OG Image Monitoring Script
#
# Monitors /og-image.png and /opengraph-image for unexpected 404s or status changes.
# Designed for cron/CI execution with JSON output for log aggregation.
#
# Usage:
#   ./scripts/monitor-og-image.sh
#   npx tsx scripts/monitor-og-image.ts (Node version)
#
# OK Status Codes:
#   - /og-image.png: 308 (Permanent Redirect)
#   - /opengraph-image: 200 (OK)
#
# Anomalies to watch for:
#   - 404 (Not Found)
#   - 500+ (Server Errors)
#   - Missing x-vercel-id (non-Vercel response)
#   - Redirect chain breaking (308 without Location header)

set -euo pipefail

BASE_URL="${BASE_URL:-https://openclaw-ai.org}"
REQUESTS="${REQUESTS:-200}"
CONCURRENT="${CONCURRENT:-10}"
OUTPUT_FILE="${OUTPUT_FILE:-./og-image-monitor-$(date +%Y%m%d-%H%M%S).jsonl}"

declare -a RESULTS

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_request() {
  local endpoint="$1"
  local iteration="$2"

  # Capture full response with timing
  local response
  response=$(curl -sI -w "\n---CURL_STATS---\ntime_total:%{time_total}\nhttp_code:%{http_code}\nredirect_url:%{redirect_url}\nnum_redirects:%{num_redirects}" \
    "${BASE_URL}${endpoint}" 2>&1)

  local http_code=$(echo "$response" | grep "^http_code:" | cut -d: -f2)
  local time_total=$(echo "$response" | grep "^time_total:" | cut -d: -f2)
  local num_redirects=$(echo "$response" | grep "^num_redirects:" | cut -d: -f2)

  # Extract key headers
  local server=$(echo "$response" | grep -i "^server:" | cut -d' ' -f2- | tr -d '\r')
  local location=$(echo "$response" | grep -i "^location:" | cut -d' ' -f2- | tr -d '\r')
  local vercel_id=$(echo "$response" | grep -i "^x-vercel-id:" | cut -d' ' -f2- | tr -d '\r')
  local vercel_cache=$(echo "$response" | grep -i "^x-vercel-cache:" | cut -d' ' -f2- | tr -d '\r')
  local cache_control=$(echo "$response" | grep -i "^cache-control:" | cut -d' ' -f2- | tr -d '\r')
  local via=$(echo "$response" | grep -i "^via:" | cut -d' ' -f2- | tr -d '\r' || echo "")

  # Determine expected status
  local expected_status
  if [[ "$endpoint" == "/og-image.png" ]]; then
    expected_status="308"
  else
    expected_status="200"
  fi

  # Check for anomalies
  local anomaly=""
  local status="ok"

  if [[ "$http_code" == "404" ]]; then
    anomaly="CRITICAL:404"
    status="critical"
  elif [[ "$http_code" == "000" ]]; then
    anomaly="CRITICAL:CONNECTION_FAILED"
    status="critical"
  elif [[ "$http_code" =~ ^5[0-9]{2}$ ]]; then
    anomaly="ERROR:5xx"
    status="error"
  elif [[ "$http_code" != "$expected_status" ]]; then
    anomaly="UNEXPECTED:$http_code (expected $expected_status)"
    status="warning"
  fi

  if [[ -z "$vercel_id" ]] && [[ -z "$via" ]]; then
    anomaly="${anomaly},WARNING:NO_EDGE_ID"
    status="warning"
  fi

  # Note: num_redirects from curl-w is the count of redirects FOLLOWED.
  # With -I (HEAD), curl doesn't follow redirects, so it will be 0 for a 308 response.
  # We check for Location header instead to verify redirect behavior.
  if [[ "$endpoint" == "/og-image.png" ]] && [[ -z "$location" ]] && [[ "$http_code" != "404" ]]; then
    anomaly="${anomaly},WARNING:NO_LOCATION_HEADER"
    status="warning"
  fi

  # Build JSON output (single line for JSONL format)
  local json_entry
  json_entry=$(jq -n -c \
    --arg timestamp "$(date -u +"%Y-%m-%dT%H:%M:%SZ")" \
    --arg endpoint "$endpoint" \
    --argjson iteration "$iteration" \
    --arg status "$status" \
    --argjson http_code "$http_code" \
    --arg expected_code "$expected_status" \
    --argjson time_seconds "$time_total" \
    --argjson redirects "$num_redirects" \
    --arg location "$location" \
    --arg server "$server" \
    --arg vercel_id "$vercel_id" \
    --arg vercel_cache "$vercel_cache" \
    --arg cache_control "$cache_control" \
    --arg via "$via" \
    --arg anomaly "$anomaly" \
    '{
      timestamp: $timestamp,
      endpoint: $endpoint,
      iteration: $iteration,
      status: $status,
      http_code: $http_code,
      expected_code: $expected_code,
      time_seconds: $time_seconds,
      redirects: $redirects,
      location: $location,
      server: $server,
      x_vercel_id: $vercel_id,
      x_vercel_cache: $vercel_cache,
      cache_control: $cache_control,
      via: $via,
      anomaly: $anomaly
    }' 2>/dev/null)

  # Fallback if jq is not available
  if [[ -z "$json_entry" ]]; then
    json_entry="{\"timestamp\":\"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\",\"endpoint\":\"$endpoint\",\"iteration\":$iteration,\"status\":\"$status\",\"http_code\":$http_code,\"expected_code\":\"$expected_status\",\"time_seconds\":$time_total,\"redirects\":$num_redirects,\"location\":\"$location\",\"server\":\"$server\",\"x_vercel_id\":\"$vercel_id\",\"x_vercel_cache\":\"$vercel_cache\",\"cache_control\":\"$cache_control\",\"via\":\"$via\",\"anomaly\":\"$anomaly\"}"
  fi

  echo "$json_entry" >> "$OUTPUT_FILE"

  # Terminal output for anomalies
  if [[ "$status" != "ok" ]]; then
    echo -e "${RED}✗${NC} $endpoint #$iteration: $anomaly (HTTP $http_code)"
  fi
}

# Main monitoring loop
echo "🔍 OG Image Sentinel - Starting $REQUESTS requests per endpoint..."
echo "📝 Output: $OUTPUT_FILE"

# Write header for human readability
echo "# OG Image Monitoring Run - $(date -u)" > "$OUTPUT_FILE"
echo "# BASE_URL=$BASE_URL REQUESTS=$REQUESTS" >> "$OUTPUT_FILE"

# Monitor /og-image.png
echo ""
echo "📷 Testing /og-image.png (expecting 308 redirect)..."

for ((i=1; i<=REQUESTS; i++)); do
  log_request "/og-image.png" "$i"

  if (( i % 50 == 0 )); then
    echo -n "."
  fi
done
echo ""

# Monitor /opengraph-image
echo ""
echo "🖼️  Testing /opengraph-image (expecting 200 OK)..."

for ((i=1; i<=REQUESTS; i++)); do
  log_request "/opengraph-image" "$i"

  if (( i % 50 == 0 )); then
    echo -n "."
  fi
done
echo ""

# Summary
echo ""
echo "✅ Monitoring complete. Results saved to: $OUTPUT_FILE"

# Count anomalies using grep -c (returns count directly)
# grep -c returns exit code 1 when no matches, so we use || true to avoid triggering fallback
critical_count=$(grep -c '"status": "critical"' "$OUTPUT_FILE" 2>/dev/null || true)
warning_count=$(grep -c '"status": "warning"' "$OUTPUT_FILE" 2>/dev/null || true)
error_count=$(grep -c '"status": "error"' "$OUTPUT_FILE" 2>/dev/null || true)

# Ensure we have numeric values (empty if file doesn't exist yet)
: "${critical_count:=0}"
: "${warning_count:=0}"
: "${error_count:=0}"

echo ""
echo "📊 Summary:"
echo "  Critical: $critical_count"
echo "  Errors:   $error_count"
echo "  Warnings: $warning_count"

if [[ "$critical_count" -gt 0 ]] || [[ "$error_count" -gt 0 ]]; then
  echo -e "${RED}⚠️  Anomalies detected! Review $OUTPUT_FILE${NC}"
  exit 1
else
  echo -e "${GREEN}✓ No critical issues detected${NC}"
  exit 0
fi
