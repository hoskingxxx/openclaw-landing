/**
 * ContentRail - Single source of truth for content WIDTH across the site
 *
 * HARD RULE: This component defines ONLY max-width (960px).
 * It does NOT apply padding. Padding must be applied explicitly by sections.
 *
 * Rail specification:
 * - Desktop: 960px max-width (single visual rail)
 * - Mobile: full-width
 * - No padding baked into rail (prevents true edge alignment)
 *
 * Usage:
 *   <ContentRail>
 *     <YourContent /> // Add px-4 sm:px-6 to sections as needed
 *   </ContentRail>
 */

import { ReactNode } from "react";

interface ContentRailProps {
  children: ReactNode;
  className?: string;
}

export function ContentRail({ children, className = "" }: ContentRailProps) {
  return (
    <div className={`mx-auto w-full max-w-[960px] ${className}`}>
      {children}
    </div>
  );
}
