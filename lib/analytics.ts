/**
 * Umami Analytics
 *
 * Setup instructions:
 * 1. Create an account at https://umami.is/ (or self-host)
 * 2. Add your website and get the Website ID
 * 3. Set NEXT_PUBLIC_UMAMI_WEBSITE_ID in .env.local
 * 4. Set NEXT_PUBLIC_UMAMI_URL (default: https://analytics.umami.is)
 */

export const trackEvent = (eventName: string, eventData?: Record<string, string | number | boolean>) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(eventName, eventData);
  }
};

export const trackPageView = (url?: string) => {
  if (typeof window !== 'undefined' && (window as any).umami) {
    (window as any).umami.track(url || window.location.pathname);
  }
};

// Event names constants
export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  CTA_CLICK: 'cta_click',
  WAITLIST_SUBMIT: 'waitlist_submit',
  WAITLIST_SUCCESS: 'waitlist_success',
  WAITLIST_ERROR: 'waitlist_error',
  DEMO_CLICK: 'demo_click',
  LANGUAGE_SWITCH: 'language_switch',
} as const;
