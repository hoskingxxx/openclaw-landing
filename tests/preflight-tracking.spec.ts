/**
 * Automated acceptance test for /preflight tracking
 *
 * Tests:
 * 1. RED state: Windows + 8GB + 70B → Vultr CTA
 * 2. YELLOW state: macOS + 16GB + 32B → Gumroad CTA
 * 3. GREEN state: Windows + 24GB + 8B → Copy Link (no share errors)
 *
 * Validates:
 * - page_type="preflight" (not "homepage")
 * - path="/preflight" or page_path="/preflight"
 * - verdict matches expected status
 * - No navigator.share errors
 */

import { test, expect } from '@playwright/test';

interface UmamiEvent {
  eventName: string;
  payload: {
    path?: string;
    page_path?: string;
    page_type?: string;
    pageType?: string;
    verdict?: string;
    status?: string;
    cta_id?: string;
    placement?: string;
    model?: string;
    vram?: string;
    environment?: string;
    [key: string]: unknown;
  };
}

test.describe('Preflight Tracking Acceptance', () => {
  test.beforeEach(async ({ page }) => {
    // Set desktop viewport to ensure desktop CTAs are used
    await page.setViewportSize({ width: 1280, height: 720 });

    // Intercept umami.track BEFORE page load
    await page.addInitScript(() => {
      (window as any).__umamiEvents = (window as any).__umamiEvents || [];
      // Store original umami object
      const originalUmami = (window as any).umami;

      // @ts-ignore - Monkey-patch umami to capture events
      (window as any).umami = new Proxy((originalUmami || {}), {
        apply(target: any, thisArg: any, args: any[]) {
          // Track event calls: umami(eventName, data)
          if (args.length >= 2 && typeof args[0] === 'string') {
            (window as any).__umamiEvents.push({
              eventName: args[0],
              payload: { ...args[1] }
            });
          }
          // Call original if it's a function
          if (typeof target === 'function') {
            return target.apply(thisArg, args);
          }
          // Call track method if it exists
          if (target && typeof target.track === 'function') {
            return target.track(args[0], args[1]);
          }
        },
        get(target: any, prop: string) {
          // Return track method or original property
          if (prop === 'track') {
            return (eventName: string, data: any) => {
              (window as any).__umamiEvents.push({ eventName, payload: { ...data } });
              if (typeof target === 'function') {
                target(eventName, data);
              } else if (target && typeof target.track === 'function') {
                target.track(eventName, data);
              }
            };
          }
          return target[prop];
        }
      });
    });

    // Enable umami debug mode BEFORE navigation
    await page.goto('/preflight');

    // Capture console logs IMMEDIATELY
    page.on('console', msg => {
      const text = msg.text();
      if (text.includes('[Umami]')) {
        // Get the actual object data from console args
        page.evaluate((log: string) => {
          (window as any).__umamiLogs = (window as any).__umamiLogs || [];
          (window as any).__umamiLogs.push(log);
        }, text).catch(() => {});
      }
    });

    // Intercept tracking calls to capture full payload
    await page.addInitScript(() => {
      const originalTrack = (window as any).umami;
      if (originalTrack) {
        (window as any).__umamiEvents = (window as any).__umamiEvents || [];
        // @ts-ignore - Monkey-patch umami.track
        (window as any).umami = function(eventName: string, data: any) {
          // Store the actual event data
          (window as any).__umamiEvents.push({ eventName, payload: { ...data } });
          // Call original
          if (typeof originalTrack === 'function') {
            originalTrack(eventName, data);
          } else if (originalTrack.track) {
            originalTrack.track(eventName, data);
          }
        };
      }
    });

    // Capture page errors
    page.on('pageerror', error => {
      const errorStr = error.toString();
      // Filter out extension-related errors
      if (
        errorStr.includes('content_script') ||
        errorStr.includes('Immersive Translate') ||
        errorStr.includes('chrome-extension') ||
        errorStr.includes('moz-extension')
      ) {
        return;
      }
      page.evaluate((err: string) => {
        (window as any).__pageErrors = (window as any).__pageErrors || [];
        (window as any).__pageErrors.push(err);
      }, errorStr).catch(() => {});
    });

    await page.reload();
    await page.waitForLoadState('domcontentloaded');
  });

  /**
   * Helper: Get captured Umami events
   * Parses console.log output like: [Umami] revenue_outbound {"dest":"vultr",...}
   */
  async function getUmamiEvents(page: any): Promise<UmamiEvent[]> {
    return await page.evaluate(() => {
      const logs = (window as any).__umamiLogs || [];

      return logs.map((log: string) => {
        // Match: [Umami] eventName JSON_STRING
        // Handle format: [Umami] revenue_outbound {"dest":"vultr",...}
        const match = log.match(/\[Umami\]\s+(\w+)\s+(\{.*\})/);
        if (!match) return null;

        const eventName = match[1];
        const jsonStr = match[2];

        try {
          const payload = JSON.parse(jsonStr);
          return { eventName, payload };
        } catch (e) {
          console.error('Failed to parse Umami event JSON:', e);
          return null;
        }
      }).filter((e: any) => e !== null && e.eventName);
    });
  }

  /**
   * Helper: Get captured page errors
   */
  async function getPageErrors(page: any): Promise<string[]> {
    return await page.evaluate(() => {
      return (window as any).__pageErrors || [];
    });
  }

  /**
   * Helper: Clear captured logs
   */
  async function clearLogs(page: any) {
    await page.evaluate(() => {
      (window as any).__umamiLogs = [];
      (window as any).__pageErrors = [];
    });
  }

  /**
   * Helper: Select calculator inputs by label
   */
  async function selectCalculatorInputs(page: any, environment: string, vram: string, model: string) {
    // Find all selects in the calculator
    const selects = page.locator('.grid.grid-cols-1.md\\:grid-cols-3 select');
    const count = await selects.count();

    if (count < 3) {
      throw new Error(`Expected 3 selects, found ${count}`);
    }

    // Select by index: 0=Environment, 1=VRAM, 2=Model
    await selects.nth(0).selectOption(environment);
    await selects.nth(1).selectOption(vram);
    await selects.nth(2).selectOption(model);
  }

  /**
   * Helper: Wait for status indicator to appear and stabilize
   * Checks for status-specific DOM elements that indicate the component has updated
   */
  async function waitForStatusUpdate(page: any, expectedStatus: 'red' | 'yellow' | 'green') {
    // Wait for the corresponding CTA button to be visible
    // Each status has a unique testid that only appears when that status is active
    const testIdMap = {
      'red': 'cta-vultr',
      'yellow': 'cta-gumroad',
      'green': 'cta-copy-link',
    };

    const testId = testIdMap[expectedStatus];

    // First, wait a bit for React state to update
    await page.waitForTimeout(300);

    // Then wait for the element to be visible with longer timeout
    await page.waitForSelector(`[data-testid="${testId}"]`, { state: 'visible', timeout: 10000 });
  }

  /**
   * Helper: Get path from any event (supports both 'path' and 'page_path')
   */
  function getPathFromEvent(event: UmamiEvent): string | undefined {
    return event.payload.path || event.payload.page_path;
  }

  /**
   * Helper: Get verdict from any event (supports both 'verdict' and 'status')
   */
  function getVerdictFromEvent(event: UmamiEvent): string | undefined {
    return event.payload.verdict || event.payload.status;
  }

  /**
   * Helper: Select calculator option by label text
   * Finds select with matching label text and selects it
   */
  async function selectCalculatorOption(page: any, labelText: string) {
    // Use the actual CSS class from the component: grid-cols-1 md:grid-cols-3
    const select = page.locator(`.grid.grid-cols-1 select`).filter({ hasText: labelText });
    await select.selectOption(labelText);
  }

  /**
   * Helper: Validate revenue_outbound schema
   * Ensures only allowed fields are present
   */
  function validateRevenueOutboundSchema(payload: any): { valid: boolean; errors: string[] } {
    const REQUIRED_FIELDS = ["pageType", "placement"];
    const ALLOWED_FIELDS = [
      "pageType", "path", "page_path",
      "verdict", "status",
      "placement",
      "dest", "dest_type", "dest_id",
      "offer", "offer_revenue",
      "cta_id", "cta_position",
      "intent", "context",
      "slug", "post_slug",
      "model", "vram", "environment",
      "partner", "location"
    ];

    const errors: string[] = [];

    // Check required fields
    for (const field of REQUIRED_FIELDS) {
      if (!(field in payload) || payload[field] === undefined) {
        errors.push(`Missing required field: ${field}`);
      }
    }

    // Check for unexpected fields
    const unexpectedFields = Object.keys(payload).filter(
      key => !ALLOWED_FIELDS.includes(key)
    );
    if (unexpectedFields.length > 0) {
      errors.push(`Unexpected fields: ${unexpectedFields.join(", ")}`);
    }

    return { valid: errors.length === 0, errors };
  }

  /**
   * Scenario A: RED state - Windows + 8GB + 70B
   * Expected: revenue_outbound OR affiliate_click with page_type/preflight + verdict=red
   */
  test('A) RED: Windows + 8GB + 70B → Vultr CTA tracking', async ({ page }) => {
    // Select inputs for RED state
    await selectCalculatorInputs(page, 'windows', '8gb', '70b');

    // Wait for RED status to appear (cta-vultr will be visible)
    await waitForStatusUpdate(page, 'red');

    // Clear logs before CTA click
    await clearLogs(page);

    // Click Vultr CTA using stable testid
    await page.getByTestId('cta-vultr').click();

    // Wait for tracking to fire
    await page.waitForTimeout(1000);

    // Get captured events
    const events = await getUmamiEvents(page);
    const errors = await getPageErrors(page);

    // Print all events for debugging
    console.log('\n=== SCENARIO A: RED STATE ===');
    console.log('All captured logs:', await page.evaluate(() => (window as any).__umamiLogs || []));
    console.log('Parsed events:', events.length);
    events.forEach((e: any) => {
      console.log(`  ${e.eventName}:`, {
        page_type: e.payload.page_type,
        path: getPathFromEvent(e),
        verdict: getVerdictFromEvent(e),
        model: e.payload.model,
        vram: e.payload.vram,
      });
    });

    // Must have revenue_outbound OR affiliate_click event
    const revenueEvent = events.find((e: any) => e.eventName === 'revenue_outbound' || e.eventName === 'affiliate_click');
    expect(revenueEvent, 'Must have revenue_outbound or affiliate_click event').toBeDefined();

    // Validate schema and page_type from revenue_outbound (if present)
    const revenueOutbound = events.find((e: any) => e.eventName === 'revenue_outbound');
    if (revenueOutbound) {
      // Schema validation
      const schemaValidation = validateRevenueOutboundSchema(revenueOutbound.payload);
      expect(schemaValidation.valid, `Schema validation failed: ${schemaValidation.errors.join(', ')}`).toBe(true);

      // Page type validation
      expect(revenueOutbound!.payload.pageType, 'pageType must be "preflight"').toBe('preflight');
    }

    // Validate path and verdict across ALL events (different events have different field names)
    const allPaths = events.map(getPathFromEvent).filter(Boolean);
    const allVerdicts = events.map(getVerdictFromEvent).filter(Boolean);
    expect(allPaths.some(p => p === '/preflight'), 'path must be "/preflight" in at least one event').toBe(true);
    expect(allVerdicts.some(v => v === 'red'), 'verdict must be "red" in at least one event').toBe(true);

    // No share-related errors
    const shareErrors = errors.filter((e: string) =>
      e.includes('AbortError') ||
      e.includes('InvalidStateError') ||
      e.includes('navigator.share')
    );
    expect(shareErrors.length, 'Must have no share-related errors').toBe(0);

    console.log('✅ Scenario A PASSED\n');
  });

  /**
   * Scenario B: YELLOW state - Windows + 24GB + 32B
   * Expected: revenue_outbound with page_type=preflight, verdict=yellow
   *
   * Calculation: Windows (24GB) - 3GB overhead = 21GB effective
   * 32B requires 20GB, headroom = 1GB (< 2GB) → YELLOW
   */
  test('B) YELLOW: Windows + 24GB + 32B → Gumroad CTA tracking', async ({ page }) => {
    // Select inputs for YELLOW state
    await selectCalculatorInputs(page, 'windows', '24gb', '32b');

    // Wait for YELLOW status to appear (cta-gumroad will be visible)
    await waitForStatusUpdate(page, 'yellow');

    // Clear logs before CTA click
    await clearLogs(page);

    // Click Gumroad CTA using stable testid
    await page.getByTestId('cta-gumroad').click();

    // Wait for tracking
    await page.waitForTimeout(1000);

    // Get captured events
    const events = await getUmamiEvents(page);
    const errors = await getPageErrors(page);

    // Assertions
    console.log('\n=== SCENARIO B: YELLOW STATE ===');
    console.log('Captured events:', events.length);
    events.forEach((e: any) => {
      console.log(`  ${e.eventName}:`, {
        page_type: e.payload.page_type,
        path: getPathFromEvent(e),
        verdict: getVerdictFromEvent(e),
        model: e.payload.model,
        vram: e.payload.vram,
      });
    });

    // Must have revenue_outbound event
    const revenueOutbound = events.find((e: any) => e.eventName === 'revenue_outbound');
    expect(revenueOutbound, 'Must have revenue_outbound event').toBeDefined();

    // Validate payload
    expect(revenueOutbound!.payload.pageType, 'pageType must be "preflight"').toBe('preflight');
    expect(getPathFromEvent(revenueOutbound!), 'path must be "/preflight"').toBe('/preflight');
    expect(getVerdictFromEvent(revenueOutbound!), 'verdict must be "yellow"').toBe('yellow');

    // No share-related errors
    const shareErrors = errors.filter((e: string) =>
      e.includes('AbortError') ||
      e.includes('InvalidStateError') ||
      e.includes('navigator.share')
    );
    expect(shareErrors.length, 'Must have no share-related errors').toBe(0);

    console.log('✅ Scenario B PASSED\n');
  });

  /**
   * Scenario C: GREEN state - Windows + 24GB + 8B
   * Expected: cta_click with page_type=preflight, verdict=green, NO share errors
   */
  test('C) GREEN: Windows + 24GB + 8B → Copy Link tracking (no share errors)', async ({ page }) => {
    // Select inputs for GREEN state
    await selectCalculatorInputs(page, 'windows', '24gb', '8b');

    // Wait for GREEN status to appear (cta-copy-link will be visible)
    await waitForStatusUpdate(page, 'green');

    // Clear logs before CTA click
    await clearLogs(page);

    // Click Copy Link button using stable testid
    await page.getByTestId('cta-copy-link').click();

    // Wait for toast to appear
    await page.waitForSelector('text=Link copied!', { state: 'visible', timeout: 5000 }).catch(() => {
      console.log('Toast not found, continuing with assertions...');
    });

    // Get captured events
    const events = await getUmamiEvents(page);
    const errors = await getPageErrors(page);

    // Assertions
    console.log('\n=== SCENARIO C: GREEN STATE ===');
    console.log('Captured events:', events.length);
    events.forEach((e: any) => {
      console.log(`  ${e.eventName}:`, {
        page_type: e.payload.page_type,
        path: getPathFromEvent(e),
        verdict: getVerdictFromEvent(e),
        cta_id: e.payload.cta_id,
        model: e.payload.model,
        vram: e.payload.vram,
      });
    });

    // Must have cta_click event
    const ctaClick = events.find((e: any) => e.eventName === 'cta_click');
    expect(ctaClick, 'Must have cta_click event').toBeDefined();

    // Validate payload
    expect(ctaClick!.payload.pageType, 'pageType must be "preflight"').toBe('preflight');
    expect(getPathFromEvent(ctaClick!), 'path must be "/preflight"').toBe('/preflight');
    expect(getVerdictFromEvent(ctaClick!), 'verdict must be "green"').toBe('green');
    expect(ctaClick!.payload.cta_id, 'cta_id must be "green_primary_copy"').toBe('green_primary_copy');

    // Critical: NO share-related errors
    const shareErrors = errors.filter((e: string) =>
      e.includes('AbortError') ||
      e.includes('InvalidStateError') ||
      e.includes('navigator.share')
    );

    if (shareErrors.length > 0) {
      console.error('❌ Share errors found:', shareErrors);
    }
    expect(shareErrors.length, 'Must have NO share-related errors (AbortError/InvalidStateError)').toBe(0);

    // Optional: Verify toast appeared (link copied feedback) - non-blocking
    const toastVisible = await page.getByText('Link copied!').isVisible().catch(() => false);
    if (toastVisible) {
      console.log('✅ Toast "Link copied!" appeared');
    } else {
      console.log('⚠️  Toast "Link copied!" not found (tracking still verified)');
    }

    console.log('✅ Scenario C PASSED\n');
  });

  /**
   * Scenario D: Impression deduplication check (WARNING, not blocking)
   */
  test('D) Impression deduplication - warn if duplicate impressions', async ({ page }) => {
    // Select any state
    await selectCalculatorInputs(page, 'windows', '16gb', '32b');

    await page.waitForTimeout(500);

    // Get impressions
    const events = await getUmamiEvents(page);
    const impressions = events.filter((e: any) => e.eventName === 'cta_impression');

    console.log('\n=== SCENARIO D: IMPRESSION DEDUPE CHECK ===');
    console.log(`Total impressions: ${impressions.length}`);

    // Check for duplicates
    const impressionKeys: string[] = [];
    const duplicates: string[] = [];

    impressions.forEach((imp: any) => {
      const key = `${imp.payload.placement}_${imp.payload.cta_id || 'no_id'}`;
      if (impressionKeys.includes(key)) {
        duplicates.push(key);
      } else {
        impressionKeys.push(key);
      }
    });

    if (duplicates.length > 0) {
      console.warn(`⚠️  WARNING: Duplicate impressions found: ${duplicates.join(', ')}`);
    } else {
      console.log('✅ No duplicate impressions detected');
    }

    console.log('Impression details:');
    impressions.forEach((imp: any, i: number) => {
      console.log(`  ${i + 1}. placement=${imp.payload.placement}, cta_id=${imp.payload.cta_id || 'N/A'}`);
    });
    console.log('');
  });

  /**
   * Scenario E: Debug Breakdown - RED state
   * Verify breakdown values are consistent with RED verdict
   * Windows + 8GB + 70B → headroom = 5 - 42 = -37 GB (RED)
   */
  test('E) Debug Breakdown: RED state values are consistent', async ({ page }) => {
    // Select inputs for RED state
    await selectCalculatorInputs(page, 'windows', '8gb', '70b');
    await waitForStatusUpdate(page, 'red');

    // Open Debug Breakdown section
    const debugSummary = page.getByText('Show calculation details');
    await debugSummary.click();

    // Wait for breakdown content to appear
    await page.waitForTimeout(300);

    // Extract values from breakdown - use the details element content
    const breakdownLocator = page.locator('details').filter({ hasText: 'Show calculation details' });
    const breakdownText = await breakdownLocator.textContent();

    console.log('\n=== SCENARIO E: RED DEBUG BREAKDOWN ===');
    console.log('Breakdown content:', breakdownText);

    // Verify key values are present
    expect(breakdownText).toContain('Raw VRAM:');
    expect(breakdownText).toContain('8.0 GB');
    expect(breakdownText).toContain('Effective VRAM:');
    expect(breakdownText).toContain('5.0 GB'); // 8GB - 3GB overhead
    expect(breakdownText).toContain('Required VRAM');
    expect(breakdownText).toContain('42.0 GB'); // 70B model requires 42GB
    expect(breakdownText).toContain('Headroom:');
    // Headroom should be negative (RED)
    expect(breakdownText).toContain('-37.0 GB'); // 5 - 42 = -37

    // Verify decision rule matches RED verdict
    expect(breakdownText).toContain('RED if headroom < 0 GB');

    // Verify RED rule is highlighted/bolded
    const redRule = page.locator('text=RED if headroom').first();
    const isRedBolded = await redRule.evaluate(el => {
      return window.getComputedStyle(el).fontWeight === '700' ||
             window.getComputedStyle(el).fontWeight === 'bold';
    });
    expect(isRedBolded).toBe(true);

    console.log('✅ Scenario E PASSED\n');
  });

  /**
   * Scenario F: Debug Breakdown - YELLOW state
   * Verify breakdown values are consistent with YELLOW verdict
   * Windows + 24GB + 32B → headroom = 21 - 20 = 1 GB (YELLOW)
   */
  test('F) Debug Breakdown: YELLOW state values are consistent', async ({ page }) => {
    // Select inputs for YELLOW state
    await selectCalculatorInputs(page, 'windows', '24gb', '32b');
    await waitForStatusUpdate(page, 'yellow');

    // Open Debug Breakdown section
    const debugSummary = page.getByText('Show calculation details');
    await debugSummary.click();

    // Wait for breakdown content to appear
    await page.waitForTimeout(300);

    // Extract values from breakdown - use the details element content
    const breakdownLocator = page.locator('details').filter({ hasText: 'Show calculation details' });
    const breakdownText = await breakdownLocator.textContent();

    console.log('\n=== SCENARIO F: YELLOW DEBUG BREAKDOWN ===');
    console.log('Breakdown content:', breakdownText);

    // Verify key values are present
    expect(breakdownText).toContain('Raw VRAM:');
    expect(breakdownText).toContain('24.0 GB');
    expect(breakdownText).toContain('Effective VRAM:');
    expect(breakdownText).toContain('21.0 GB'); // 24GB - 3GB overhead
    expect(breakdownText).toContain('Required VRAM');
    expect(breakdownText).toContain('20.0 GB'); // 32B model requires 20GB
    expect(breakdownText).toContain('Headroom:');
    // Headroom should be positive but less than 2GB (YELLOW)
    expect(breakdownText).toContain('1.0 GB'); // 21 - 20 = 1

    // Verify decision rule matches YELLOW verdict
    expect(breakdownText).toContain('YELLOW if 0 ≤ headroom < 2 GB');

    // Verify YELLOW rule is highlighted/bolded
    const yellowRule = page.locator('text=YELLOW if 0').first();
    const isYellowBolded = await yellowRule.evaluate(el => {
      return window.getComputedStyle(el).fontWeight === '700' ||
             window.getComputedStyle(el).fontWeight === 'bold';
    });
    expect(isYellowBolded).toBe(true);

    console.log('✅ Scenario F PASSED\n');
  });

  /**
   * Scenario G: Debug Breakdown - GREEN state
   * Verify breakdown values are consistent with GREEN verdict
   * Windows + 24GB + 8B → headroom = 21 - 6 = 15 GB (GREEN)
   */
  test('G) Debug Breakdown: GREEN state values are consistent', async ({ page }) => {
    // Select inputs for GREEN state
    await selectCalculatorInputs(page, 'windows', '24gb', '8b');
    await waitForStatusUpdate(page, 'green');

    // Open Debug Breakdown section
    const debugSummary = page.getByText('Show calculation details');
    await debugSummary.click();

    // Wait for breakdown content to appear
    await page.waitForTimeout(300);

    // Extract values from breakdown - use the details element content
    const breakdownLocator = page.locator('details').filter({ hasText: 'Show calculation details' });
    const breakdownText = await breakdownLocator.textContent();

    console.log('\n=== SCENARIO G: GREEN DEBUG BREAKDOWN ===');
    console.log('Breakdown content:', breakdownText);

    // Verify key values are present
    expect(breakdownText).toContain('Raw VRAM:');
    expect(breakdownText).toContain('24.0 GB');
    expect(breakdownText).toContain('Effective VRAM:');
    expect(breakdownText).toContain('21.0 GB'); // 24GB - 3GB overhead
    expect(breakdownText).toContain('Required VRAM');
    expect(breakdownText).toContain('6.0 GB'); // 8B model requires 6GB
    expect(breakdownText).toContain('Headroom:');
    // Headroom should be >= 2GB (GREEN)
    expect(breakdownText).toContain('15.0 GB'); // 21 - 6 = 15

    // Verify decision rule matches GREEN verdict
    expect(breakdownText).toContain('GREEN if headroom ≥ 2 GB');

    // Verify GREEN rule is highlighted/bolded
    const greenRule = page.locator('text=GREEN if headroom').first();
    const isGreenBolded = await greenRule.evaluate(el => {
      return window.getComputedStyle(el).fontWeight === '700' ||
             window.getComputedStyle(el).fontWeight === 'bold';
    });
    expect(isGreenBolded).toBe(true);

    console.log('✅ Scenario G PASSED\n');
  });

  /**
   * Regression Tests for Debug Breakdown Panel
   * Verify panel values match verdict across all three states
   */
  test.describe('Debug Breakdown Regression Tests', () => {
    test.beforeEach(async ({ page }) => {
      // Enable debug mode by navigating with ?debug=1
      await page.goto('/preflight?debug=1');
      await page.waitForLoadState('domcontentloaded');

      // Set desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });

      // Wait for calculator to initialize
      await page.waitForTimeout(500);
    });

    /**
     * DEBUG MODE AUDIT TESTS
     * These tests verify the debug breakdown panel (?debug=1) shows correct calculations
     * All values must match the actual calculation logic, not hardcoded strings
     */

    /**
     * RED State Debug Audit
     * Windows + 8GB + 70B:
     *   - userVRAM: 8, osOverhead: 3, effectiveVRAM: 8 - 3 = 5
     *   - requiredVRAM: 42, headroom: 5 - 42 = -37
     *   - headroom < 0 => RED
     */
    test('DEBUG-AUDIT-RED: Panel values match actual calculation (debug=1)', async ({ page }) => {
      // Navigate with debug=1 to enable audit panel
      await page.goto('/preflight?debug=1');

      // Select RED state inputs
      await selectCalculatorOption(page, 'windows');
      await selectCalculatorOption(page, '8gb');
      await selectCalculatorOption(page, '70b');
      await page.waitForTimeout(500);
      await page.waitForSelector('[data-testid="cta-vultr"]', { state: 'visible' });

      // Locate debug panel using data-testid
      const debugPanel = page.locator('[data-testid="debug-breakdown"]');
      await expect(debugPanel).toBeVisible();

      const panelText = await debugPanel.textContent();
      console.log('\n=== DEBUG-AUDIT-RED ===');
      console.log('Panel content:', panelText);

      // Verify reconciliation-style explanation
      // "8.0 - 3.0 = 5.0; required 42.0; 5.0 < 42.0 ⇒ RED"
      expect(panelText).toContain('8.0 - 3.0 = 5.0');
      expect(panelText).toContain('required 42.0');
      expect(panelText).toContain('5.0 < 42.0');
      expect(panelText).toContain('⇒ RED');

      // Verify breakdown values match calculation
      expect(panelText).toContain('userVRAM: 8 GB');
      expect(panelText).toContain('requiredVRAM: 42 GB');
      expect(panelText).toContain('effectiveVRAM: 5 GB');
      expect(panelText).toContain('headroom: -37 GB');
      expect(panelText).toContain('status: red');

      // Verify overheads are from actual logic
      expect(panelText).toContain('osOverhead: 3 GB');
      expect(panelText).toContain('ideOverhead: 0 GB');
      expect(panelText).toContain('browserOverhead: 0 GB');

      console.log('✅ DEBUG-AUDIT-RED PASSED\n');
    });

    /**
     * YELLOW State Debug Audit
     * Windows + 24GB + 32B:
     *   - userVRAM: 24, osOverhead: 3, effectiveVRAM: 24 - 3 = 21
     *   - requiredVRAM: 20, headroom: 21 - 20 = 1
     *   - 0 <= headroom < 2 => YELLOW
     */
    test('DEBUG-AUDIT-YELLOW: Panel values match actual calculation (debug=1)', async ({ page }) => {
      await page.goto('/preflight?debug=1');

      await selectCalculatorOption(page, 'windows');
      await selectCalculatorOption(page, '24gb');
      await selectCalculatorOption(page, '32b');
      await page.waitForTimeout(500);
      await page.waitForSelector('[data-testid="cta-gumroad"]', { state: 'visible' });

      const debugPanel = page.locator('[data-testid="debug-breakdown"]');
      await expect(debugPanel).toBeVisible();

      const panelText = await debugPanel.textContent();
      console.log('\n=== DEBUG-AUDIT-YELLOW ===');
      console.log('Panel content:', panelText);

      // Verify reconciliation-style explanation
      expect(panelText).toContain('24.0 - 3.0 = 21.0');
      expect(panelText).toContain('required 20.0');
      expect(panelText).toContain('21.0 ≥ 20.0');  // effectiveVRAM >= requiredVRAM
      expect(panelText).toContain('⇒ YELLOW');

      // Verify breakdown values
      expect(panelText).toContain('userVRAM: 24 GB');
      expect(panelText).toContain('requiredVRAM: 20 GB');
      expect(panelText).toContain('effectiveVRAM: 21 GB');
      expect(panelText).toContain('headroom: 1 GB');
      expect(panelText).toContain('safeMargin: 2 GB');
      expect(panelText).toContain('status: yellow');

      console.log('✅ DEBUG-AUDIT-YELLOW PASSED\n');
    });

    /**
     * GREEN State Debug Audit
     * Windows + 24GB + 8B:
     *   - userVRAM: 24, osOverhead: 3, effectiveVRAM: 24 - 3 = 21
     *   - requiredVRAM: 6, headroom: 21 - 6 = 15
     *   - headroom >= 2 => GREEN
     */
    test('DEBUG-AUDIT-GREEN: Panel values match actual calculation (debug=1)', async ({ page }) => {
      await page.goto('/preflight?debug=1');

      await selectCalculatorOption(page, 'windows');
      await selectCalculatorOption(page, '24gb');
      await selectCalculatorOption(page, '8b');
      await page.waitForTimeout(500);
      await page.waitForSelector('[data-testid="cta-copy-link"]', { state: 'visible' });

      const debugPanel = page.locator('[data-testid="debug-breakdown"]');
      await expect(debugPanel).toBeVisible();

      const panelText = await debugPanel.textContent();
      console.log('\n=== DEBUG-AUDIT-GREEN ===');
      console.log('Panel content:', panelText);

      // Verify reconciliation-style explanation
      expect(panelText).toContain('24.0 - 3.0 = 21.0');
      expect(panelText).toContain('required 6.0');
      expect(panelText).toContain('21.0 ≥ 6.0');
      expect(panelText).toContain('⇒ GREEN');

      // Verify breakdown values
      expect(panelText).toContain('userVRAM: 24 GB');
      expect(panelText).toContain('requiredVRAM: 6 GB');
      expect(panelText).toContain('effectiveVRAM: 21 GB');
      expect(panelText).toContain('headroom: 15 GB');
      expect(panelText).toContain('safeMargin: 2 GB');
      expect(panelText).toContain('status: green');

      console.log('✅ DEBUG-AUDIT-GREEN PASSED\n');
    });
  });

  /**
   * EDGE CASE TESTS
   * Tests for specific combinations mentioned in requirements
   */
  test.describe('Edge Cases (Controversial Combinations)', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      // Navigate with debug=1
      await page.goto('/preflight?debug=1');
      await page.waitForTimeout(500);
    });

    /**
     * Edge Case 1: Windows + 12GB + 14B
     * Calculation: userVRAM=12, osOverhead=3, effectiveVRAM=12-3=9, requiredVRAM=10, headroom=9-10=-1
     * Verdict: headroom < 0 => RED
     */
    test('EDGE-1: Windows + 12GB + 14B = RED', async ({ page }) => {
      await selectCalculatorOption(page, 'windows');
      await selectCalculatorOption(page, '12gb');
      await selectCalculatorOption(page, '14b');
      await page.waitForTimeout(500);
      await page.waitForSelector('[data-testid="cta-vultr"]', { state: 'visible' });

      const debugPanel = page.locator('[data-testid="debug-breakdown"]');
      const panelText = await debugPanel.textContent();

      // Verify verdict is RED (headroom = 9 - 10 = -1 < 0)
      expect(panelText).toContain('status: red');
      expect(panelText).toContain('headroom: -1 GB');

      // Verify reconciliation: 12.0 - 3.0 = 9.0; required 10.0; 9.0 < 10.0 => RED
      expect(panelText).toContain('12.0 - 3.0 = 9.0');
      expect(panelText).toContain('required 10.0');
      expect(panelText).toContain('9.0 < 10.0');

      console.log('✅ EDGE-1 PASSED: Windows + 12GB + 14B = RED\n');
    });

    /**
     * Edge Case 2: macOS + 12GB + 14B
     * Calculation: userVRAM=12, osOverhead=2, effectiveVRAM=12-2=10, requiredVRAM=10, headroom=10-10=0
     * Verdict: headroom >= 0 but < 2 => YELLOW
     */
    test('EDGE-2: macOS + 12GB + 14B = YELLOW', async ({ page }) => {
      await selectCalculatorOption(page, 'macos');
      await selectCalculatorOption(page, '12gb');
      await selectCalculatorOption(page, '14b');
      await page.waitForTimeout(500);
      await page.waitForSelector('[data-testid="cta-gumroad"]', { state: 'visible' });

      const debugPanel = page.locator('[data-testid="debug-breakdown"]');
      const panelText = await debugPanel.textContent();

      // Verify verdict is YELLOW (headroom = 10 - 10 = 0, 0 <= 0 < 2)
      expect(panelText).toContain('status: yellow');
      expect(panelText).toContain('headroom: 0 GB');

      // Verify reconciliation: 12.0 - 2.0 = 10.0; required 10.0; 10.0 >= 10.0 => YELLOW
      expect(panelText).toContain('12.0 - 2.0 = 10.0');
      expect(panelText).toContain('required 10.0');
      expect(panelText).toContain('10.0 ≥ 10.0');
      expect(panelText).toContain('⇒ YELLOW');

      console.log('✅ EDGE-2 PASSED: macOS + 12GB + 14B = YELLOW\n');
    });

    /**
     * Edge Case 3: Windows + 16GB + 32B
     * Calculation: userVRAM=16, osOverhead=3, effectiveVRAM=16-3=13, requiredVRAM=20, headroom=13-20=-7
     * Verdict: headroom < 0 => RED
     */
    test('EDGE-3: Windows + 16GB + 32B = RED', async ({ page }) => {
      await selectCalculatorOption(page, 'windows');
      await selectCalculatorOption(page, '16gb');
      await selectCalculatorOption(page, '32b');
      await page.waitForTimeout(500);
      await page.waitForSelector('[data-testid="cta-vultr"]', { state: 'visible' });

      const debugPanel = page.locator('[data-testid="debug-breakdown"]');
      const panelText = await debugPanel.textContent();

      // Verify verdict is RED (headroom = 13 - 20 = -7 < 0)
      expect(panelText).toContain('status: red');
      expect(panelText).toContain('headroom: -7 GB');

      // Verify reconciliation: 16.0 - 3.0 = 13.0; required 20.0; 13.0 < 20.0 => RED
      expect(panelText).toContain('16.0 - 3.0 = 13.0');
      expect(panelText).toContain('required 20.0');
      expect(panelText).toContain('13.0 < 20.0');

      console.log('✅ EDGE-3 PASSED: Windows + 16GB + 32B = RED\n');
    });

    /**
     * Edge Case 4: macOS + 16GB + 32B
     * Calculation: userVRAM=16, osOverhead=2, effectiveVRAM=16-2=14, requiredVRAM=20, headroom=14-20=-6
     * Verdict: headroom < 0 => RED
     */
    test('EDGE-4: macOS + 16GB + 32B = RED', async ({ page }) => {
      await selectCalculatorOption(page, 'macos');
      await selectCalculatorOption(page, '16gb');
      await selectCalculatorOption(page, '32b');
      await page.waitForTimeout(500);
      await page.waitForSelector('[data-testid="cta-vultr"]', { state: 'visible' });

      const debugPanel = page.locator('[data-testid="debug-breakdown"]');
      const panelText = await debugPanel.textContent();

      // Verify verdict is RED (headroom = 14 - 20 = -6 < 0)
      expect(panelText).toContain('status: red');
      expect(panelText).toContain('headroom: -6 GB');

      // Verify reconciliation: 16.0 - 2.0 = 14.0; required 20.0; 14.0 < 20.0 => RED
      expect(panelText).toContain('16.0 - 2.0 = 14.0');
      expect(panelText).toContain('required 20.0');
      expect(panelText).toContain('14.0 < 20.0');

      console.log('✅ EDGE-4 PASSED: macOS + 16GB + 32B = RED\n');
    });
  });
});
