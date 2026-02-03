#!/usr/bin/env node

/**
 * OpenClaw SEO Link Crawler
 * Simulates GoogleBot to ensure zero 404 errors before indexing
 */

import { check } from 'linkinator';

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, ...args) {
  console.log(color, ...args, colors.reset);
}

async function crawl() {
  const START_URL = process.env.START_URL || 'http://localhost:3000';

  log(colors.cyan, '🔍 OpenClaw SEO Link Crawler\n');
  log(colors.blue, `📡 Starting crawl from: ${START_URL}`);
  log(colors.blue, `🔄 Recursive mode: ENABLED`);
  log(colors.blue, `🌐 External links: SKIPPED (internal links only)\n`);

  const results = await check({
    path: START_URL,
    recurse: true,
    // Skip external links - only check our own site
    linksToSkip: [
      /^(?!http:\/\/localhost:3000)/,
    ],
    concurrency: 10,
    timeout: 10000, // 10 second timeout per link
  });

  // Print summary
  console.log('━'.repeat(60));
  log(colors.cyan, '\n📊 CRAWL SUMMARY\n');
  console.log(`   Total Links:      ${results.links.length}`);
  console.log(`   Passed:           ${results.passed}`);
  console.log(`   Failed:           ${results.failed}`);
  console.log(`   Skipped:          ${results.skipped}`);
  console.log('');

  // Group failures by parent page
  const failures = results.links.filter(link => link.state === 'BROKEN');

  if (failures.length > 0) {
    console.log('━'.repeat(60));
    log(colors.red, '\n❌ BROKEN LINKS FOUND\n');

    // Group by parent page for easier debugging
    const failuresByParent = {};
    for (const failure of failures) {
      const parent = failure.parent || '(root)';
      if (!failuresByParent[parent]) {
        failuresByParent[parent] = [];
      }
      failuresByParent[parent].push(failure);
    }

    // Print failures grouped by parent
    for (const [parent, links] of Object.entries(failuresByParent)) {
      log(colors.yellow, `\n📄 Page: ${parent}`);
      for (const link of links) {
        log(colors.red, `   ❌ ${link.url}`);
        console.log(`      Status: ${link.status?.status || 'Unknown'}`);
      }
    }

    console.log('\n' + '━'.repeat(60));
    log(colors.red, '\n❌ SEO HEALTH CHECK FAILED\n');
    log(colors.red, `   ${failures.length} broken link(s) found. Fix them before indexing.\n`);
    console.log('━'.repeat(60));

    process.exit(1);
  }

  console.log('━'.repeat(60));
  log(colors.green, '\n✅ SEO HEALTH CHECK PASSED\n');
  log(colors.green, '   Zero 404 errors found. Your site is ready for indexing.\n');
  console.log('━'.repeat(60));

  process.exit(0);
}

// Run the crawler
crawl().catch((error) => {
  log(colors.red, '\n❌ FATAL ERROR:\n');
  console.error(error);
  process.exit(1);
});
