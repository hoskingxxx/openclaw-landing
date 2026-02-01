/**
 * Umami Analytics Script Component
 *
 * Add this to the root layout to enable Umami analytics tracking.
 */
'use client';

import Script from 'next/script';

const UMAMI_WEBSITE_ID = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const UMAMI_URL = process.env.NEXT_PUBLIC_UMAMI_URL || 'https://analytics.umami.is';

export function AnalyticsScript() {
  // Don't load if in development or no website ID
  if (process.env.NODE_ENV === 'development' || !UMAMI_WEBSITE_ID) {
    return null;
  }

  return (
    <Script
      src={`${UMAMI_URL}/script.js`}
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
