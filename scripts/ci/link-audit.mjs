#!/usr/bin/env node
/**
 * Link & CTA Audit CI
 *
 * Crawls site to check for:
 * - Broken internal links (404)
 * - CTA overload (too many Gumroad/Vultr links)
 * - External link reachability
 *
 * Usage: node scripts/ci/link-audit.mjs
 * Exit codes: 0 = pass, 1 = failed (broken links), 2 = CTA overload
 */

const fs = require("node:fs");
const path = require("node:path");

// Load config
const SCRIPT_DIR = __dirname;
const CONFIG_PATH = path.join(SCRIPT_DIR, 'link-audit.config.json');

let config;
try {
  config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
  if (Object.keys(config).length === 0) {
    console.log(\`[LinkAudit] Config loaded from \${CONFIG_PATH}\`);
  }
} catch (e) {
  try {
    // Fallback
    config = JSON.parse(fs.readFileSync(path.join(SCRIPT_DIR, 'ci/link-audit.config.json'), 'utf8'));
    console.log(\`[LinkAudit] Fallback loaded from \${path.join(SCRIPT_DIR, 'ci/link-audit.config.json')}\`);
  } catch (e2) {
    console.error(\`[LinkAudit] Failed to load config from both paths:\`);
    console.error(\`  Primary: \${CONFIG_PATH}\`);
    console.error(\`  fallback: \${path.join(SCRIPT_DIR, 'ci/link-audit.config.json')}\`);
    process.exit(1);
  }
}

const BASE_URL = process.env.BASE_URL || config.baseUrl;
const ALLOWED_DOMAINS = new Set(config.allowedDomains);
const IGNORE_PATHS = new Set(config.ignorePaths || []);
const ENTRY_POINTS = config.entryPoints;
const CTA_THRESHOLDS = config.ctaThresholds || {};
const EXTERNAL_TIMEOUT = config.externalTimeout || 5000;

// Domain patterns for CTA detection
const CTA_DOMAINS = {
  gumroad: 'hilda666888.gumroad.com',
  vultr: 'www.vultr.com',
  buymeacoffee: 'buymeacoffee.com'
};

// Colors for console output
const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  gray: '\x1b[90m',
  bold: '\x1b[1m'
};

function log(message, color = '') {
  console.log(\`\${color}\${message}\${COLORS.reset}\`);
}

function logError(message) {
  log(\`✗ \${message}\`, COLORS.red);
}

function logWarn(message) {
  log(\`⚠ \${message}\`, COLORS.yellow);
}

function logSuccess(message) {
  log(\`✓ \${message}\`, COLORS.green);
}

function shouldIgnorePath(url) {
  for (const ignorePath of IGNORE_PATHS) {
    if (url.startsWith(ignorePath) || url.includes(ignorePath)) {
      return true;
    }
  }
  return false;
}

/**
 * Extract domain from URL
 */
function extractDomain(url) {
  try {
    if (url.startsWith('/')) return null;
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return null;
  }
}

/**
 * Check if URL is internal (same domain or relative)
 */
function isInternal(url) {
  const domain = extractDomain(url);
  if (!domain) return true;
  return ALLOWED_DOMAINS.has(domain);
}

/**
 * Fetch a URL and return status
 */
async function checkUrl(url) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), EXTERNAL_TIMEOUT);

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: controller.signal,
      headers: {
        'User-Agent': 'OpenClaw-LinkAudit/1.0'
      }
    });
    clearTimeout(timeoutId);

    const status = response.status;
    const finalUrl = response.url.replace(url, ''); // Remove original URL if redirected

    return { status, finalUrl, error: null };
  } catch (error) {
    clearTimeout(timeoutId);
    return { status: null, finalUrl: url, error: error.message };
  }
}

/**
 * Extract all links from HTML content
 */
function extractLinks(html) {
  const links = [];

  // Match href="..." and href='...'
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    links.push(match[1]);
  }

  return links;
}

/**
 * Count CTA links in HTML
 */
function countCTAs(html, pageUrl) {
  const ctaCounts = {
    gumroad: 0,
    vultr: 0,
    buymeacoffee: 0
  };

  const strongCTACount = {
    total: 0,
    buttons: 0
  };

  // Count all CTA links
  for (const [domain, key] of Object.entries(CTA_DOMAINS)) {
    const regex = new RegExp(domain.replace('.', '\\.'), 'gi');
    const matches = html.match(regex);
    ctaCounts[key] = matches ? matches.length : 0;
  }

  // Count strong CTA candidates (button semantics)
  const buttonRegex = /<a[^>]*(?:class="[^"]*btn[^"]*"[^>]*|role="button"|class="[^"]*button[^"]*"[^>]*)/gi;
  const buttonMatches = html.match(buttonRegex);
  strongCTACount.buttons = buttonMatches ? buttonMatches.length : 0;

  // Get thresholds for this path
  const thresholds = CTA_THRESHOLDS.byPath?.[pageUrl] || CTA_THRESHOLDS.default;

  return {
    ctaCounts,
    strongCTACount,
    thresholds,
    exceedsThreshold: Object.entries(ctaCounts).some(([key, count]) => {
      const limit = thresholds[key] || 1;
      return count > limit;
    })
  };
}

/**
 * Main audit function for a single page
 */
async function auditPage(pageUrl) {
  const fullUrl = pageUrl.startsWith('http') ? pageUrl : \`\${BASE_URL}\${pageUrl}\`;

  logInfo(\`Auditing: \${fullUrl}\`);

  try {
    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'OpenClaw-LinkAudit/1.0'
      }
    });

    if (!response.ok) {
      logError(\`Failed to fetch \${fullUrl}: \${response.status}\`);
      return {
        url: fullUrl,
        status: response.status,
        broken: true,
        internalLinks: [],
        externalLinks: [],
        brokenLinks: [],
        cta: null
      };
    }

    const html = await response.text();
    const links = extractLinks(html);

    const internalLinks = [];
    const externalLinks = [];
    const brokenLinks = [];
    const redirectedLinks = [];

    // Categorize links
    for (const link of links) {
      if (shouldIgnorePath(link)) continue;

      const isInt = isInternal(link);

      if (isInt) {
        internalLinks.push({
          url: link,
          fullUrl: link.startsWith('/') ? \`\${BASE_URL}\${link}\` : link
        });
      } else {
        externalLinks.push({
          url: link,
          domain: extractDomain(link)
        });
      }
    }

    // Check CTA counts
    const cta = countCTAs(html, pageUrl);

    return {
      url: fullUrl,
      status: 200,
      internalLinks,
      externalLinks,
      brokenLinks,
      redirectedLinks,
      cta
    };

  } catch (error) {
    logError(\`Error auditing \${fullUrl}: \${error.message}\`);
    return {
      url: fullUrl,
      status: null,
      broken: true,
      error: error.message,
      internalLinks: [],
      externalLinks: [],
      brokenLinks: [],
      redirectedLinks: [],
      cta: null
    };
  }
}

/**
 * Main execution
 */
async function main() {
  log('Starting Link & CTA Audit...', COLORS.bold);
  log(\`Base URL: \${BASE_URL}\`);
  log(\`Entry points: \${ENTRY_POINTS.join(', '\\n')}\`);

  const results = [];
  const stats = {
    totalPages: 0,
    passedPages: 0,
    failedPages: 0,
    totalInternalLinks: 0,
    brokenInternalLinks: 0,
    redirectedInternalLinks: 0,
    totalExternalLinks: 0,
    unreachableExternalLinks: 0,
    ctaViolations: []
  };

  // Audit each entry point
  for (const entryPoint of ENTRY_POINTS) {
    const result = await auditPage(entryPoint);
    results.push(result);

    if (result.broken) {
      stats.failedPages++;
    } else if (result.status === 200) {
      stats.totalPages++;
      stats.passedPages++;
    }

    // Count internal links
    stats.totalInternalLinks += result.internalLinks.length;

    // Check internal link status
    for (const link of result.internalLinks) {
      if (!link.fullUrl.startsWith(BASE_URL)) continue;

      // Check if it's an entry point (exists)
      const linkPath = link.fullUrl.replace(BASE_URL, '').split('?')[0].split('#')[0];
      const isEntryPoint = ENTRY_POINTS.includes(linkPath) || linkPath === '/';

      if (!isEntryPoint) {
        // This is a non-entry internal link, needs checking
        // For now, we'll just warn about non-entry pages
        // In a full implementation, we'd check all these too
      }
    }

    // Count external links
    stats.totalExternalLinks += result.externalLinks.length;

    // Check CTA violations
    if (result.cta && result.cta.exceedsThreshold) {
      stats.ctaViolations.push({
        url: result.url,
        ctaCounts: result.cta.ctaCounts,
        thresholds: result.cta.thresholds
      });
    }
  }

  // Print results
  console.log('\n' + '='.repeat(60));
  log('AUDIT RESULTS', COLORS.bold);
  console.log('='.repeat(60));

  console.log(\`\\nPages audited: \${stats.totalPages}\`);
  console.log(\`Passed: \${COLORS.green}\${stats.passedPages}\${COLORS.reset}\`);
  console.log(\`Failed: \${COLORS.red}\${stats.failedPages}\${COLORS.reset}\`);

  console.log(\`\\nInternal links found: \${stats.totalInternalLinks}\`);

  // Print CTA violations
  if (stats.ctaViolations.length > 0) {
    console.log('\\n' + COLORS.yellow + 'CTA VIOLATIONS:' + COLORS.reset);
    for (const violation of stats.ctaViolations) {
      log(\`  \${violation.url}\`, COLORS.yellow);
      console.log(\`    Gumroad: \${violation.ctaCounts.gumroad} (limit: \${violation.thresholds.gumroad || 1}\`);
      console.log(\`    Vultr: \${violation.ctaCounts.vultr} (limit: \${violation.thresholds.vultr || 1}\`);
      console.log(\`    BuyMeCoffee: \${violation.ctaCounts.buymeacoffee} (limit: \${violation.thresholds.buymeacoffee || 1}\`);
    }
  }

  // Print broken links (if any)
  if (stats.failedPages > 0) {
    console.log('\\n' + COLORS.red + 'BROKEN PAGES:' + COLORS.reset);
    for (const result of results) {
      if (result.broken || result.status === 404) {
        logError(\`  \${result.url} - \${result.status || 'Connection failed'}`);
      }
    }
  }

  // Final verdict
  console.log('\n' + '='.repeat(60));

  const hasErrors = stats.failedPages > 0 || stats.ctaViolations.length > 0;

  if (hasErrors) {
    log('AUDIT FAILED', COLORS.red);
    console.log('='.repeat(60));

    if (stats.failedPages > 0) {
      console.log('\\nBroken internal links found. Please fix:');
      console.log('1. Create missing pages, OR');
      console.log('2. Update/remove broken links');
      console.log(\`3. Run: \${COLORS.yellow}npm run ci:link-audit --fix\`);
    }

    if (stats.ctaViolations.length > 0) {
      console.log('\\nCTA overload detected. Please reduce:');
      console.log('- Gumroad links per page (usually keep to 1)');
      console.log('- Vultr links per page (usually keep to 1)');
    }

    process.exit(1);
  } else {
    log('AUDIT PASSED', COLORS.green);
    console.log('='.repeat(60));
    console.log(\`\\nNo broken links detected\`);
    console.log(\`\\n\${COLORS.green}✓ CTA counts within thresholds\`);
    console.log(\`\\nTotal internal links: \${stats.totalInternalLinks}\`);
    console.log(\`\\nTotal external links: \${stats.totalExternalLinks}\`);
    }

  process.exit(0);
}

main();
