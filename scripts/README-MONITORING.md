# OG Image Monitoring

Lightweight monitoring for `/og-image.png` and `/opengraph-image` endpoints to collect evidence of intermittent 404s.

## Purpose

The OG image redirect (`/og-image.png` → `/opengraph-image`) has historically shown intermittent 404s in production logs. This script provides automated evidence collection without manual testing.

## Quick Start

```bash
# One-time run (200 requests per endpoint)
./scripts/monitor-og-image.sh

# Custom request count
REQUESTS=1000 ./scripts/monitor-og-image.sh

# Target different environment
BASE_URL=http://localhost:3000 ./scripts/monitor-og-image.sh
```

## Expected Behavior

| Endpoint | Expected Status | Description |
|----------|----------------|-------------|
| `/og-image.png` | `308` | Permanent redirect to `/opengraph-image` |
| `/opengraph-image` | `200` | Dynamic OG image generation |

## Exit Codes

- `0` - No critical issues
- `1` - Anomalies detected (404, 5xx, unexpected status codes)

## Output Format

JSONL (one JSON object per line):

```json
{
  "timestamp": "2026-02-10T08:00:00Z",
  "endpoint": "/og-image.png",
  "iteration": 1,
  "status": "ok",
  "http_code": 308,
  "expected_code": "308",
  "time_seconds": 0.123,
  "redirects": 0,
  "location": "/opengraph-image",
  "server": "Vercel",
  "x_vercel_id": "kix1::abc123",
  "x_vercel_cache": "HIT",
  "cache_control": "public, max-age=0, must-revalidate",
  "via": "1.1 varnish",
  "anomaly": ""
}
```

## Anomaly Detection

The script flags:

| Flag | Condition | Severity |
|------|-----------|----------|
| `CRITICAL:404` | HTTP 404 response | Critical |
| `CRITICAL:CONNECTION_FAILED` | Connection timeout/failure | Critical |
| `ERROR:5xx` | HTTP 500-599 | Error |
| `UNEXPECTED:xxx` | Status code != expected | Warning |
| `WARNING:NO_EDGE_ID` | Missing x-vercel-id or via header | Warning |
| `WARNING:NO_REDIRECT` | /og-image.png returned non-redirect | Warning |

## Cron Integration

Run every hour, log to date-stamped files:

```cron
# crontab -e
0 * * * * cd /path/to/repo && ./scripts/monitor-og-image.sh
```

## CI Integration

```yaml
# .github/workflows/og-image-monitor.yml
name: OG Image Monitor
on:
  schedule:
    - cron: '0 * * * *'
  workflow_dispatch:

jobs:
  monitor:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run monitor
        run: ./scripts/monitor-og-image.sh
      - name: Upload results
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: og-image-logs
          path: og-image-monitor-*.jsonl
```

## Analyzing Results

```bash
# Count by status
jq -r '.status' og-image-monitor-*.jsonl | sort | uniq -c

# Show only anomalies
jq 'select(.anomaly != "")' og-image-monitor-*.jsonl

# Group by endpoint
jq -r '.endpoint' og-image-monitor-*.jsonl | sort | uniq -c

# Find slow requests (>1s)
jq 'select(.time_seconds > 1)' og-image-monitor-*.jsonl
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://openclaw-ai.org` | Target URL to test |
| `REQUESTS` | `200` | Number of requests per endpoint |
| `CONCURRENT` | `10` | Concurrent requests (not yet implemented) |
| `OUTPUT_FILE` | `./og-image-monitor-YYYYMMDD-HHMMSS.jsonl` | Output file path |
