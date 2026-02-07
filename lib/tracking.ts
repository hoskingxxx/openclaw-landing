/**
 * Umami → Attribution tracking helper
 * Standardizes tracking across all outbound links (Vultr, DeepInfra, Gumroad, etc.)
 */

export interface VultrClickEvent extends Record<string, unknown> {
  page_path: string;
  post_slug?: string;
  placement: string;
  cta_id: string;
  verdict?: "green" | "yellow" | "red" | "unsafe";
  ref: string;
  utm_content: string;
}

export interface AffiliateClickEvent extends Record<string, unknown> {
  page_path: string;
  post_slug?: string;
  source: string;
  verdict?: "green" | "yellow" | "red" | "unsafe";
}

export interface ProductClickEvent extends Record<string, unknown> {
  page_path: string;
  post_slug?: string;
  source: string;
  verdict?: "green" | "yellow" | "red" | "unsafe";
}

/**
 * Track Vultr affiliate click with standardized Umami event
 */
export function trackVultrClick(params: {
  placement: string;
  ctaId: string;
  verdict?: "green" | "yellow" | "red" | "unsafe";
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
    ref: "9863490",
    utm_content: utmContent || `${placement}${verdict ? `_${verdict}` : ""}`,
  };

  trackEvent("vultr_click", eventData);
}

/**
 * Track generic affiliate click (DeepInfra, Vultr new link, etc.)
 */
export function trackAffiliateClick(params: {
  source: string;
  verdict?: "green" | "yellow" | "red" | "unsafe";
  postSlug?: string;
}): void {
  if (typeof window === "undefined") return;

  const { source, verdict, postSlug } = params;
  const page_path = window.location.pathname;

  const eventData: AffiliateClickEvent = {
    page_path,
    post_slug: postSlug,
    source,
    ...(verdict && { verdict }),
  };

  trackEvent("affiliate_click", eventData);
}

/**
 * Track product click (Gumroad, etc.)
 */
export function trackProductClick(params: {
  source: string;
  verdict?: "green" | "yellow" | "red" | "unsafe";
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
 * Track tool downgrade click (model switch)
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

/**
 * Internal tracking helper
 */
function trackEvent(eventName: string, data: Record<string, unknown>): void {
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
