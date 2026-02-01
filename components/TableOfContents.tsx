"use client";

import { useEffect, useState } from "react";
import { ChevronRightIcon } from "./icons";

interface TableOfContentsProps {
  items: Array<{
    id: string;
    label: string;
    level?: number;
  }>;
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <aside className="hidden lg:block fixed right-0 top-24 w-64 pr-8">
      <nav className="space-y-1" aria-label="Table of contents">
        <h3 className="text-sm font-semibold text-text-tertiary uppercase tracking-wider mb-4 px-3">
          Contents
        </h3>
        <ul className="space-y-1">
          {items.map((item) => {
            const isActive = activeId === item.id;
            const paddingLeft = item.level ? (item.level - 1) * 16 : 0;

            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-brand-primary/10 text-brand-primary font-medium"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  }`}
                  style={{ paddingLeft: `${12 + paddingLeft}px` }}
                >
                  <ChevronRightIcon
                    className={`w-3 h-3 flex-shrink-0 transition-transform ${
                      isActive ? "rotate-90" : ""
                    }`}
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

// Mobile collapsible TOC
export function MobileTableOfContents({ items }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!items || items.length === 0) return null;

  return (
    <div className="lg:hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full glass-card p-4 flex items-center justify-between text-left"
      >
        <span className="text-sm font-semibold text-text-primary">📑 Table of Contents</span>
        <svg
          className={`w-5 h-5 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="glass-card mt-2 p-4">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="block py-2 px-3 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
