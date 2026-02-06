/**
 * CoffeeButton - "Buy me a coffee" CTA button
 *
 * Used in MDX content for author support links.
 */

interface CoffeeButtonProps {
  href: string;
  children: React.ReactNode;
}

export function CoffeeButton({ href, children }: CoffeeButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded transition-colors"
    >
      {children}
    </a>
  );
}
