/**
 * Vercel Analytics Script Component
 *
 * Add this to the root layout to enable Vercel analytics tracking.
 */
'use client';

import { Analytics } from '@vercel/analytics/react';

export function AnalyticsScript() {
  // Don't load if in development
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return <Analytics />;
}
