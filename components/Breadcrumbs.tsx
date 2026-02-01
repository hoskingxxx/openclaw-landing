import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "./icons";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-text-tertiary py-4" aria-label="Breadcrumb navigation">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-text-primary transition-colors p-2 -m-2 rounded-lg hover:bg-white/5"
        aria-label="Go to home"
      >
        <HomeIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>

      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <ChevronRightIcon className="w-4 h-4 flex-shrink-0" />
          <Link
            href={item.href}
            className={`hover:text-text-primary transition-colors p-1 -m-1 rounded hover:bg-white/5 ${
              index === items.length - 1 ? "text-text-primary font-medium" : ""
            }`}
            aria-current={index === items.length - 1 ? "page" : undefined}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
