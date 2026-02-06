/**
 * ContentEdge - Defines the visible content boundary edge
 *
 * UI CONSTITUTION:
 * - ONLY ONE Edge wrapper per page (all aligned content inside)
 * - Mobile: breathing room (px-4 sm:px-6)
 * - Desktop: aligns to true 960 rail edge
 * - Uses padding (px), NOT margins, for consistent page feel
 *
 * PAIRED WITH: ContentRail (width authority)
 * ContentRail defines max-width (960px)
 * ContentEdge defines visible boundary (padding)
 *
 * Usage:
 * <ContentRail>
 *   <ContentEdge>
 *     All content that should share the same visual edge
 *   </ContentEdge>
 * </ContentRail>
 */

interface ContentEdgeProps {
  children: React.ReactNode;
  className?: string;
}

export function ContentEdge({ children, className = "" }: ContentEdgeProps) {
  return (
    <div className={`w-full px-4 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
