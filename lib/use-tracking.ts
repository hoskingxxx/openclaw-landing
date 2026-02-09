/**
 * React hooks for Revenue Tracking Specification v1.0
 *
 * Provides:
 * - useRevenueOutbound: Track revenue clicks
 * - useCtaImpression: Track CTA impressions with IntersectionObserver
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  trackRevenueOutbound,
  trackCtaImpression,
  getPageType,
  getSlug,
  type Dest,
  type Offer,
  type Placement,
  type Verdict,
} from "@/lib/tracking";

/**
 * Hook to track revenue outbound clicks
 * Returns an onClick handler that fires the revenue_outbound event
 */
export function useRevenueOutbound(params: {
  dest: Dest;
  offer: Offer;
  placement: Placement;
  verdict?: Verdict;
}): (e: React.MouseEvent) => void {
  const pathname = usePathname();

  return (e: React.MouseEvent) => {
    const pageType = getPageType(pathname || "");
    const slug = getSlug(pathname || "");

    trackRevenueOutbound({
      dest: params.dest,
      offer: params.offer,
      placement: params.placement,
      pageType,
      slug,
      verdict: params.verdict,
      path: pathname,
    });
  };
}

/**
 * Hook to track CTA impressions with IntersectionObserver
 * Fires once per pageview per placement (guarded by sessionStorage)
 *
 * @param elementRef - Ref to the CTA element to observe
 * @param params - Tracking parameters
 */
export function useCtaImpression<T extends HTMLElement>(
  elementRef: React.RefObject<T | null>,
  params: {
    dest: Dest;
    offer: Offer;
    placement: Placement;
    verdict?: Verdict;
  }
): void {
  const pathname = usePathname();
  const hasFiredRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasFiredRef.current) return;

    // Check sessionStorage first (client-side persistence across navigations)
    const sessionKey = `cta_impression_${params.placement}`;
    if (typeof window !== "undefined" && sessionStorage.getItem(sessionKey) === "1") {
      hasFiredRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasFiredRef.current) {
            hasFiredRef.current = true;

            const pageType = getPageType(pathname || "");
            const slug = getSlug(pathname || "");

            trackCtaImpression({
              dest: params.dest,
              offer: params.offer,
              placement: params.placement,
              pageType,
              slug,
              verdict: params.verdict,
              path: pathname,
            });

            // Disconnect after firing
            observer.disconnect();
          }
        });
      },
      {
        // Fire when at least 50% of the element is visible
        threshold: 0.5,
        // Don't fire if element is outside viewport
        rootMargin: "0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, params, pathname]);
}
