/**
 * AffiliateLink - Affiliate link component with consistent tracking
 *
 * Used in MDX content for affiliate links (Vultr, etc.)
 * Automatically adds data-link="affiliate" for CSS styling
 * Uses data-cta="true" to exclude from prose link color rules
 */

interface AffiliateLinkProps {
  href: string;
  umamiEventPlacement?: string;
  umamiEventContent?: string;
  umamiEventPost?: string;
  umamiEventRef?: string;
  children: React.ReactNode;
}

export function AffiliateLink({
  href,
  umamiEventPlacement = "article_link",
  umamiEventContent = "article_link",
  umamiEventPost = "",
  umamiEventRef = "9863490",
  children,
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      data-link="affiliate"
      data-cta="true"
      data-umami-event="affiliate_click"
      data-umami-event-post={umamiEventPost}
      data-umami-event-placement={umamiEventPlacement}
      data-umami-event-content={umamiEventContent}
      data-umami-event-ref={umamiEventRef}
    >
      {children}
    </a>
  );
}
