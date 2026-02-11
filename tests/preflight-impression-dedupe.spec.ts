/**
 * Cross-Page Impression Deduplication Test
 *
 * Visits:
 * - /preflight
 * - then a guide page
 *
 * Asserts:
 * - No duplicate cta_impression events
 */

import { test, expect } from '@playwright/test';

test.describe('Cross-Page Impression Deduplication', () => {
  test('No duplicate impressions when visiting /preflight then guide page', async ({ page }) => {
    // Set up console log capture
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('[Umami]')) {
        page.evaluate((log: string) => {
          (window as any).__umamiLogs = (window as any).__umamiLogs || [];
          (window as any).__umamiLogs.push(log);
        }, text).catch(() => {});
      }
    });

    // Visit /preflight first
    await page.goto('https://openclaw-ai.org/preflight');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for impressions to fire

    // Then visit a guide page (uses same calculator component)
    await page.goto('https://openclaw-ai.org/guides/hardware-requirements-reality-check');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1000); // Wait for impressions to fire

    // Get captured events
    const events = await page.evaluate(() => {
      const logs = (window as any).__umamiLogs || [];
      return logs.map((log: string) => {
        const match = log.match(/\[Umami\]\s+(\w+)\s+(\{.*\})/);
        if (!match) return null;
        const eventName = match[1];
        const jsonStr = match[2];
        try {
          const payload = JSON.parse(jsonStr);
          return { eventName, payload, cta_id: payload.cta_id, placement: payload.placement };
        } catch (e) {
          return null;
        }
      }).filter((e: any) => e !== null);
    });

    // Count cta_impression events
    const impressions = events.filter((e: any) => e.eventName === 'cta_impression');

    console.log('\n=== IMPRESSION DEDUPE CHECK ===');
    console.log(`Total impressions: ${impressions.length}`);
    impressions.forEach((imp: any, i: number) => {
      console.log(`  ${i + 1}. cta_id=${imp.cta_id || 'N/A'}, placement=${imp.placement || 'N/A'}`);
    });

    // Check for duplicates by cta_id + placement combination
    const impressionKeys: string[] = [];
    const duplicates: string[] = [];

    impressions.forEach((imp: any) => {
      const key = `${imp.placement}_${imp.cta_id || 'no_id'}`;
      if (impressionKeys.includes(key)) {
        duplicates.push(key);
      } else {
        impressionKeys.push(key);
      }
    });

    if (duplicates.length > 0) {
      console.error(`❌ Duplicate impressions found: ${duplicates.join(', ')}`);
    } else {
      console.log('✅ No duplicate impressions detected');
    }

    expect(duplicates.length, 'Must have no duplicate impressions').toBe(0);
  });
});
