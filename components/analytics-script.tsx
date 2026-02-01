/**
 * Vercel Analytics & Speed Insights Script Component
 *
 * Add this to the root layout to enable Vercel analytics tracking and speed insights.
 */
'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export function AnalyticsScript() {
  // Don't load if in development
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
