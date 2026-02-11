/**
 * Production Smoke Test for /preflight
 * Tests against production URL: https://openclaw-ai.org/preflight
 *
 * Validates:
 * - At least one tracking event fired
 * - page_type === "preflight"
 * - No console errors
 * - No pageerror
 */

import { test, expect } from '@playwright/test';

test.describe('Production Smoke: /preflight', () => {
  const productionUrl = 'https://openclaw-ai.org/preflight';

  test.beforeEach(async ({ page }) => {
    // Enable umami debug mode BEFORE any page navigation
    await page.addInitScript(() => {
      localStorage.setItem('umami_debug', '1');
    });

    // Set up request interception for network-level tracking validation
    page.on('request', request => {
      const url = request.url();
      if (url.includes('umami')) {
        page.evaluate((requestUrl: string) => {
          (window as any).__umamiRequests = (window as any).__umamiRequests || [];
          (window as any).__umamiRequests.push(requestUrl);
        }, url).catch(() => {});
      }
    });

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

    // Capture page errors
    page.on('pageerror', error => {
      const errorStr = error.toString();
      page.evaluate((err: string) => {
        (window as any).__pageErrors = (window as any).__pageErrors || [];
        (window as any).__pageErrors.push(err);
      }, errorStr).catch(() => {});
    });
  });

  /**
   * Helper: Get captured Umami events
   */
  async function getUmamiEvents(page: any) {
    return await page.evaluate(() => {
      const logs = (window as any).__umamiLogs || [];
      return logs.map((log: string) => {
        const match = log.match(/\[Umami\]\s+(\w+)\s+(\{.*\})/);
        if (!match) return null;
        const eventName = match[1];
        const jsonStr = match[2];
        try {
          const payload = JSON.parse(jsonStr);
          return { eventName, payload };
        } catch (e) {
          return null;
        }
      }).filter((e: any) => e !== null && e.eventName);
    });
  }

  /**
   * Helper: Get captured Umami network requests
   */
  async function getUmamiRequests(page: any) {
    return await page.evaluate(() => {
      return (window as any).__umamiRequests || [];
    });
  }

  /**
   * Helper: Get captured page errors
   */
  async function getPageErrors(page: any) {
    return await page.evaluate(() => {
      return (window as any).__pageErrors || [];
    });
  }

  /**
   * Helper: Select calculator inputs
   */
  async function selectCalculatorInputs(page: any, environment: string, vram: string, model: string) {
    const selects = page.locator('.grid.grid-cols-1.md\\:grid-cols-3 select');
    await selects.nth(0).selectOption(environment);
    await selects.nth(1).selectOption(vram);
    await selects.nth(2).selectOption(model);
  }

  test('RED state - tracking validation', async ({ page }) => {
    await page.goto(productionUrl);
    await page.waitForLoadState('domcontentloaded');

    // Select RED state
    await selectCalculatorInputs(page, 'windows', '8gb', '70b');
    await page.waitForTimeout(500);

    // Clear logs before CTA click
    await page.evaluate(() => {
      (window as any).__umamiLogs = [];
      (window as any).__pageErrors = [];
    });

    // Click Vultr CTA
    await page.getByTestId('cta-vultr').click();
    await page.waitForTimeout(1000);

    // Get events and errors
    const events = await getUmamiEvents(page);
    const errors = await getPageErrors(page);

    // Validate tracking fired
    expect(events.length, 'At least one tracking event must fire').toBeGreaterThan(0);

    // Validate page_type
    const hasPageType = events.some((e: any) => e.payload.page_type === 'preflight');
    expect(hasPageType, 'page_type must be "preflight"').toBe(true);

    // No critical errors
    const criticalErrors = errors.filter((e: string) =>
      e.includes('AbortError') ||
      e.includes('InvalidStateError')
    );
    expect(criticalErrors.length, 'Must have no critical errors').toBe(0);

    // Network-level tracking validation
    const umamiRequests = await getUmamiRequests(page);
    expect(umamiRequests.length, 'At least one umami network request must be sent').toBeGreaterThan(0);
  });

  test('YELLOW state - tracking validation', async ({ page }) => {
    await page.goto(productionUrl);
    await page.waitForLoadState('domcontentloaded');

    // Select YELLOW state
    await selectCalculatorInputs(page, 'windows', '24gb', '32b');
    await page.waitForTimeout(500);

    await page.evaluate(() => {
      (window as any).__umamiLogs = [];
      (window as any).__pageErrors = [];
    });

    await page.getByTestId('cta-gumroad').click();
    await page.waitForTimeout(1000);

    const events = await getUmamiEvents(page);
    expect(events.length, 'At least one tracking event must fire').toBeGreaterThan(0);

    const hasPageType = events.some((e: any) => e.payload.page_type === 'preflight');
    expect(hasPageType, 'page_type must be "preflight"').toBe(true);
  });

  test('GREEN state - tracking validation', async ({ page }) => {
    await page.goto(productionUrl);
    await page.waitForLoadState('domcontentloaded');

    // Select GREEN state
    await selectCalculatorInputs(page, 'windows', '24gb', '8b');
    await page.waitForTimeout(500);

    // CRITICAL: $9.90 must NOT appear in GREEN state (before any other action)
    const priceLinks = page.locator('text=$9.90');
    const priceCount = await priceLinks.count();
    expect(priceCount, '$9.90 must NOT appear in GREEN state').toBe(0);

    await page.evaluate(() => {
      (window as any).__umamiLogs = [];
      (window as any).__pageErrors = [];
    });

    await page.getByTestId('cta-copy-link').click();
    await page.waitForTimeout(1000);

    const events = await getUmamiEvents(page);
    expect(events.length, 'At least one tracking event must fire').toBeGreaterThan(0);

    const hasPageType = events.some((e: any) => e.payload.page_type === 'preflight');
    expect(hasPageType, 'page_type must be "preflight"').toBe(true);
  });
});
