/**
 * SecondaryExitButton - "Deploy on Vultr" CTA for decision gate exit pages
 *
 * Used in MDX content to render styled links with Umami tracking.
 * This component handles the Vultr affiliate link with all necessary tracking.
 */

interface SecondaryExitButtonProps {
  href: string;
  umamiEventPlacement?: string;
  umamiEventContent?: string;
  umamiEventPost?: string;
  umamiEventRef?: string;
  children: React.ReactNode;
}

export function SecondaryExitButton({
  href,
  umamiEventPlacement = "article_link",
  umamiEventContent = "article_link",
  umamiEventPost = "",
  umamiEventRef = "9863490",
  children,
}: SecondaryExitButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors"
      data-umami-event="secondary_exit_click"
      data-umami-event-post={umamiEventPost}
      data-umami-event-placement={umamiEventPlacement}
      data-umami-event-content={umamiEventContent}
      data-umami-event-ref={umamiEventRef}
    >
      {children}
    </a>
  );
}
