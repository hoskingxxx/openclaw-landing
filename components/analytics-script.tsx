/**
 * Vercel Analytics & Speed Insights Script Component
 *
 * Add this to the root layout to enable Vercel analytics tracking and speed insights.
 * Uses lazyOnload strategy to prevent blocking first paint.
 */
'use client';

import Script from 'next/script';

export function AnalyticsScript() {
  // Don't load if in development
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      {/* Vercel Analytics - lazy load to prevent blocking */}
      <Script
        src="https://cdn.vercel-insights.com/v1/script.js"
        strategy="lazyOnload"
        data-host-url="https://vercel.live"
      />
      {/* Speed Insights is automatically included by Vercel Analytics */}
    </>
  );
}
