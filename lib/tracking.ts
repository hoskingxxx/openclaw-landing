/**
 * Umami → Attribution tracking helper
 * Revenue Tracking Specification v1.0 (Frozen)
 *
 * DEV GATE: Any changes to tracking/events require passing `npm run release:gate`
 * 没通过 npm run release:gate 不准合并、不准部署。
 *
 * Canonical Events:
 * - revenue_outbound: All revenue-related outbound clicks
 * - cta_impression: CTA enters viewport (once per pageview)
 * - cta_click: CTA click tracking
 *
 * Legacy Events (Deprecated - kept for backward compatibility):
 * - vultr_click: Use revenue_outbound instead
 * - affiliate_click: Vultr ONLY, do not use for Gumroad
 * - product_click: Use revenue_outbound instead
 * - marketing_affiliate_click: DEPRECATED, use revenue_outbound instead
 */

declare global {
  interface Window {
    umami?: ((eventName: string, data?: Record<string, unknown>) => unknown) | {
      track?: (eventName: string, data?: Record<string, unknown>) => unknown;
    };
  }
}

// ============================================================================
// Revenue Tracking Specification v1.0 - Canonical Events
// ============================================================================

/**
 * Page type classification
 */
export type PageType =
  | "homepage"
  | "guide"
  | "troubleshooting"
  | "hardware_reality"
  | "oom"
  | "faq"
  | "resources"
  | "docs"
  | "error_index"
  | "preflight";

/**
 * Verdict classification for hardware reality checks
 */
export type Verdict = "green" | "yellow" | "red" | "unsafe";

/**
 * Placement values (Frozen Dictionary v1.0)
 *
 * Gumroad / Survival Kit: top, bottom, troubleshooting_bottom
 * Buy Me a Coffee: navbar, footer, floating, article
 * Vultr: hero, low_vram_trap, page_cta, mdx_auto, security_banner
 * DeepInfra: red_card, yellow_card, green_card, mobile_override
 */
export type Placement =
  // Gumroad / Survival Kit
  | "top"
  | "mid"
  | "bottom"
  | "troubleshooting_bottom"

  // Buy Me a Coffee
  | "navbar"
  | "footer"
  | "floating"
  | "article"

  // Vultr
  | "hero"
  | "low_vram_trap"
  | "page_cta"
  | "mdx_auto"
  | "security_banner"

  // DeepInfra / API fallback
  | "red_card"
  | "yellow_card"
  | "green_card"
  | "mobile_override";

/**
 * Destination platform (legacy - kept for backward compatibility)
 */
export type Dest = "gumroad" | "bmac" | "vultr" | "deepinfra";

/**
 * Offer type (legacy - kept for backward compatibility)
 */
export type Offer = "survival_kit" | "coffee" | "cloud_gpu" | "api_fallback";

// ============================================================================
// P1 Data Quality - New Property Types
// ============================================================================

/**
 * CTA position - standardized across all CTA events
 */
export type CtaPosition = "top" | "mid" | "bottom" | "inline";

/**
 * User intent - why they're seeing this CTA
 */
export type Intent = "stuck" | "evaluate" | "escape";

/**
 * Context - what problem domain they're in
 */
export type Context = "windows" | "hardware" | "json" | "docker" | "security" | "ide";

/**
 * CTA verdict - simplified for CTA events (includes yellow)
 */
export type CtaVerdict = "red" | "yellow" | "green";

/**
 * Destination type - platform classification
 */
export type DestType = "gumroad" | "vultr" | "api";

/**
 * Revenue offer - semantic offer type
 */
export type RevenueOffer = "fix_now" | "escape_local" | "try_api";

// ============================================================================
// Event Interfaces (v1.0 + P1 Enrichment)
// ============================================================================

/**
 * revenue_outbound event data
 * Triggered on every outbound revenue-related click
 *
 * P1: Added dest_type, dest_id, and offer (RevenueOffer) for better attribution
 */
export interface RevenueOutboundEvent extends Record<string, unknown> {
  // Legacy properties (kept for backward compatibility)
  dest?: Dest;
  offer?: Offer;
  placement: Placement;
  page_type: PageType;
  pageType?: PageType; // Transitional dual-write
  slug?: string;
  verdict?: Verdict;
  path: string;

  // P1: New attribution properties
  dest_type?: DestType;
  dest_id?: string;
  offer_revenue?: RevenueOffer;

  // P1: CTA properties
  cta_id?: string;
  cta_position?: CtaPosition;
  intent?: Intent;
  context?: Context;

  // Context: model selection, hardware context for analysis
  model?: string;
  vram?: string;
  environment?: string;
}

/**
 * cta_impression event data
 * Triggered when a revenue-related CTA enters the viewport
 * Fires once per pageview per placement
 *
 * P1: Added cta_id, cta_position, intent, context, verdict
 */
export interface CtaImpressionEvent extends Record<string, unknown> {
  // Legacy properties (kept for backward compatibility)
  dest?: Dest;
  offer?: Offer;
  placement: Placement;
  page_type: PageType;
  pageType?: PageType; // Transitional dual-write
  slug?: string;
  verdict?: Verdict;
  path: string;

  // P1: CTA properties (optional for backward compatibility)
  cta_id?: string;
  cta_position?: CtaPosition;
  intent?: Intent;
  context?: Context;
}

/**
 * cta_click event data
 * Triggered when any CTA is clicked
 *
 * P1: New canonical event
 */
export interface CtaClickEvent extends Record<string, unknown> {
  // Core properties
  path: string;
  cta_id: string;
  cta_position: CtaPosition;
  intent: Intent;
  context: Context;
  verdict: CtaVerdict;
  page_type: PageType;
  pageType?: PageType; // Transitional dual-write
  slug?: string;

  // Optional: revenue context
  dest_type?: DestType;
  dest_id?: string;
  offer?: RevenueOffer;

  // Optional: context for analysis (model selection, hardware context)
  model?: string;
  vram?: string;
  environment?: string;
}

/**
 * reality_check_impression event data
 * Triggered when Reality Check component is mounted/visible
 * Fires once per pageview
 *
 * Unchanged - path property only
 */
export interface RealityCheckImpressionEvent extends Record<string, unknown> {
  page_type: PageType;
  slug?: string;
  initial_model: string;
  initial_vram: string;
  initial_status: Verdict;
  path: string;
}

// ============================================================================
// Canonical Tracking Functions (v1.0 + P1 Enrichment)
// ============================================================================

/**
 * Track revenue outbound click (canonical event)
 * Use this for ALL revenue-related outbound clicks
 *
 * P1: Added dest_type, dest_id, offer (RevenueOffer), and optional CTA properties
 * P1: Added model, vram, environment for context analysis
 */
export function trackRevenueOutbound(params: {
  // Legacy parameters (kept for backward compatibility)
  dest?: Dest;
  offer?: Offer;
  placement: Placement;
  pageType: PageType;
  slug?: string;
  verdict?: Verdict;
  path: string;

  // P1: New parameters (optional for backward compatibility)
  dest_type?: DestType;
  dest_id?: string;
  offer_revenue?: RevenueOffer;
  cta_id?: string;
  cta_position?: CtaPosition;
  intent?: Intent;
  context?: Context;

  // Context: model selection, hardware context for analysis
  model?: string;
  vram?: string;
  environment?: string;
}): void {
  if (typeof window === "undefined") return;

  // Click protection: prevent double-firing (P0 hotfix)
  const clickKey = `revenue_outbound:${params.path}:${params.cta_id || params.placement}:${params.verdict || 'unknown'}`;
  if (sessionStorage.getItem(clickKey) === "1") {
    return;
  }
  // Mark as fired (expires on session end)
  sessionStorage.setItem(clickKey, "1");

  const eventData: RevenueOutboundEvent = {
    // Legacy
    ...(params.dest && { dest: params.dest }),
    ...(params.offer && { offer: params.offer }),
    placement: params.placement,
    page_type: params.pageType,
    pageType: params.pageType, // Transitional dual-write
    ...(params.slug && { slug: params.slug }),
    ...(params.verdict && { verdict: params.verdict }),
    path: params.path,

    // P1: New (optional)
    ...(params.dest_type && { dest_type: params.dest_type }),
    ...(params.dest_id && { dest_id: params.dest_id }),
    ...(params.offer_revenue && { offer_revenue: params.offer_revenue }),
    ...(params.cta_id && { cta_id: params.cta_id }),
    ...(params.cta_position && { cta_position: params.cta_position }),
    ...(params.intent && { intent: params.intent }),
    ...(params.context && { context: params.context }),

    // Context: model, vram, environment
    ...(params.model && { model: params.model }),
    ...(params.vram && { vram: params.vram }),
    ...(params.environment && { environment: params.environment }),
  };

  trackEvent("revenue_outbound", eventData);
}

/**
 * Track CTA impression (canonical event)
 * Use IntersectionObserver, fire once per pageview
 *
 * P1: Added cta_id, cta_position, intent, context
 */
export function trackCtaImpression(params: {
  // Legacy parameters (kept for backward compatibility)
  dest?: Dest;
  offer?: Offer;
  placement: Placement;
  pageType: PageType;
  slug?: string;
  verdict?: Verdict;
  path: string;

  // P1: New parameters (optional for backward compatibility)
  cta_id?: string;
  cta_position?: CtaPosition;
  intent?: Intent;
  context?: Context;
}): void {
  if (typeof window === "undefined") return;

  // Dedupe key: path + cta_id + verdict (per P0 hotfix spec)
  const sessionKey = `cta_impression:${params.path}:${params.cta_id || params.placement}:${params.verdict || 'unknown'}`;
  if (sessionStorage.getItem(sessionKey) === "1") {
    return;
  }

  // Mark as fired
  sessionStorage.setItem(sessionKey, "1");

  const eventData: CtaImpressionEvent = {
    // Legacy
    ...(params.dest && { dest: params.dest }),
    ...(params.offer && { offer: params.offer }),
    placement: params.placement,
    page_type: params.pageType,
    pageType: params.pageType, // Transitional dual-write
    ...(params.slug && { slug: params.slug }),
    ...(params.verdict && { verdict: params.verdict }),
    path: params.path,

    // P1: New (optional)
    ...(params.cta_id && { cta_id: params.cta_id }),
    ...(params.cta_position && { cta_position: params.cta_position }),
    ...(params.intent && { intent: params.intent }),
    ...(params.context && { context: params.context }),
  };

  trackEvent("cta_impression", eventData);
}

/**
 * Track CTA click (canonical event)
 *
 * P1: New canonical event
 * P1: Added model, vram, environment for context analysis
 */
export function trackCtaClick(params: {
  path: string;
  cta_id: string;
  cta_position: CtaPosition;
  intent: Intent;
  context: Context;
  verdict: CtaVerdict;
  pageType: PageType;
  slug?: string;
  dest_type?: DestType;
  dest_id?: string;
  offer?: RevenueOffer;

  // Context: model selection, hardware context for analysis
  model?: string;
  vram?: string;
  environment?: string;
}): void {
  if (typeof window === "undefined") return;

  const eventData: CtaClickEvent = {
    path: params.path,
    cta_id: params.cta_id,
    cta_position: params.cta_position,
    intent: params.intent,
    context: params.context,
    verdict: params.verdict,
    page_type: params.pageType,
    pageType: params.pageType, // Transitional dual-write
    ...(params.slug && { slug: params.slug }),
    ...(params.dest_type && { dest_type: params.dest_type }),
    ...(params.dest_id && { dest_id: params.dest_id }),
    ...(params.offer && { offer: params.offer }),

    // Context: model, vram, environment
    ...(params.model && { model: params.model }),
    ...(params.vram && { vram: params.vram }),
    ...(params.environment && { environment: params.environment }),
  };

  trackEvent("cta_click", eventData);
}

/**
 * Reset impression tracking (for testing or page transitions)
 * Call this when starting a new page view
 */
export function resetCtaImpressions(): void {
  if (typeof window === "undefined") return;
  Object.keys(sessionStorage)
    .filter(key => key.startsWith("cta_impression_"))
    .forEach(key => sessionStorage.removeItem(key));
}

/**
 * Track Reality Check impression (canonical event)
 * Fires once per pageview when Reality Check component is mounted
 *
 * Unchanged - only path property enforced
 */
export function trackRealityCheckImpression(params: {
  pageType: PageType;
  slug?: string;
  initialModel: string;
  initialVram: string;
  initialStatus: Verdict;
  path: string;
}): void {
  if (typeof window === "undefined") return;

  // Check if already fired for this pageview
  const sessionKey = "reality_check_impression";
  if (sessionStorage.getItem(sessionKey) === "1") {
    return;
  }

  // Mark as fired
  sessionStorage.setItem(sessionKey, "1");

  const eventData: RealityCheckImpressionEvent = {
    page_type: params.pageType,
    ...(params.slug && { slug: params.slug }),
    initial_model: params.initialModel,
    initial_vram: params.initialVram,
    initial_status: params.initialStatus,
    path: params.path,
  };

  trackEvent("reality_check_impression", eventData);
}

// ============================================================================
// Legacy Events (Deprecated - Kept for Backward Compatibility)
// ============================================================================

export interface VultrClickEvent extends Record<string, unknown> {
  page_path: string;
  post_slug?: string;
  placement: string;
  cta_id: string;
  verdict?: Verdict;
  ref: string;
  utm_content: string;
}

/**
 * @deprecated Use trackRevenueOutbound instead
 * Legacy Vultr click tracking - kept for backward compatibility
 */
export function trackVultrClick(params: {
  placement: string;
  ctaId: string;
  verdict?: Verdict;
  postSlug?: string;
  utmContent?: string;
}): void {
  if (typeof window === "undefined") return;

  const { placement, ctaId, verdict, postSlug, utmContent } = params;
  const page_path = window.location.pathname;

  const eventData: VultrClickEvent = {
    page_path,
    post_slug: postSlug,
    placement,
    cta_id: ctaId,
    ...(verdict && { verdict }),
    ref: "9864821-9J",
    utm_content: utmContent || `${placement}${verdict ? `_${verdict}` : ""}`,
  };

  trackEvent("vultr_click", eventData);
}

export interface AffiliateClickEvent extends Record<string, unknown> {
  page_path: string;
  post_slug?: string;
  partner: "vultr";
  status: "red" | "yellow" | "green";
  model: string;
  vram: string;
  location: "red_card" | "yellow_card" | "green_card" | "mobile_override";
  path?: string;
}

/**
 * @deprecated For Vultr use trackRevenueOutbound instead
 * Legacy affiliate click - Vultr ONLY per spec v1.0
 * DO NOT use for Gumroad
 */
export function trackAffiliateClick(params: {
  partner: "vultr";
  status: "red" | "yellow" | "green";
  model: string;
  vram: string;
  location: "red_card" | "yellow_card" | "green_card" | "mobile_override";
  postSlug?: string;
  path?: string;
}): void {
  if (typeof window === "undefined") return;

  const { partner, status, model, vram, location, postSlug, path } = params;
  const page_path = window.location.pathname;

  const eventData: AffiliateClickEvent = {
    page_path,
    post_slug: postSlug,
    partner,
    status,
    model,
    vram,
    location,
    ...(path && { path }),
  };

  trackEvent("affiliate_click", eventData);
}

export interface ProductClickEvent extends Record<string, unknown> {
  page_path: string;
  post_slug?: string;
  source: string;
  verdict?: Verdict;
}

/**
 * @deprecated Use trackRevenueOutbound instead
 * Legacy product click tracking - kept for backward compatibility
 */
export function trackProductClick(params: {
  source: string;
  verdict?: Verdict;
  postSlug?: string;
}): void {
  if (typeof window === "undefined") return;

  const { source, verdict, postSlug } = params;
  const page_path = window.location.pathname;

  const eventData: ProductClickEvent = {
    page_path,
    post_slug: postSlug,
    source,
    ...(verdict && { verdict }),
  };

  trackEvent("product_click", eventData);
}

/**
 * @deprecated Use trackRevenueOutbound instead
 * Tool downgrade tracking - not a revenue event, kept as-is
 */
export function trackToolDowngrade(params: {
  fromModel: string;
  toModel: string;
  postSlug?: string;
}): void {
  if (typeof window === "undefined") return;

  const page_path = window.location.pathname;

  trackEvent("tool_downgrade_click", {
    page_path,
    post_slug: params.postSlug,
    from_model: params.fromModel,
    to_model: params.toModel,
  });
}

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Internal tracking helper
 */
function trackEvent(eventName: string, data: Record<string, unknown>): void {
  // DEV: Log payload for verification (enable via localStorage.umami_debug = "1")
  if (process.env.NODE_ENV === "development" || (typeof window !== "undefined" && localStorage.getItem("umami_debug") === "1")) {
    console.log(`[Umami] ${eventName}`, JSON.stringify(data));
  }

  const umami = window.umami;
  if (umami) {
    try {
      if (typeof umami === "function") {
        umami(eventName, data);
      } else if (typeof umami === "object" && typeof umami.track === "function") {
        umami.track(eventName, data);
      }
    } catch (e) {
      if (process.env.NODE_ENV === "development") {
        console.error("[Umami tracking failed]", e);
      }
    }
  }
}

/**
 * Get page type from current pathname
 */
export function getPageType(pathname: string): PageType {
  if (pathname === "/") return "homepage";
  if (pathname.startsWith("/guides/")) return "guide";
  if (pathname === "/guides") return "resources";
  if (pathname === "/troubleshooting") return "troubleshooting";
  if (pathname === "/hardware-requirements-reality-check") return "hardware_reality";
  if (pathname === "/oom") return "oom";
  if (pathname === "/faq") return "faq";
  if (pathname === "/resources") return "resources";
  if (pathname === "/preflight") return "preflight";
  if (pathname.startsWith("/docs") || pathname.startsWith("/quick-start")) return "docs";
  if (pathname.includes("error-index")) return "error_index";
  return "homepage"; // fallback
}

/**
 * Get slug from current pathname
 */
export function getSlug(pathname: string): string | undefined {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : undefined;
}
