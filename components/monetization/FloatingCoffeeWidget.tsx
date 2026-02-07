/**
 * Floating Coffee Widget - Desktop-only delayed FAB
 * SEO-safe: Hidden on mobile to avoid "Intrusive Interstitial" penalty
 * Only shows on /guides/ and /troubleshooting/ routes
 */

"use client";

import { useEffect, useState } from "react";
import { CoffeeIcon } from "@/components/icons";
import { getBMCLink } from "@/lib/bmc";
import { usePathname } from "next/navigation";

export function FloatingCoffeeWidget() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  // Check if we're on a valid route for the widget
  const isValidRoute =
    pathname?.startsWith("/guides/") || pathname?.startsWith("/troubleshooting/");

  useEffect(() => {
    if (!isValidRoute) return;

    // 5-second delay before showing the widget
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isValidRoute]);

  // Don't render if not on valid route
  if (!isValidRoute) return null;

  return (
    <a
      href={getBMCLink("floating-widget")}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        fixed bottom-6 right-6 z-50
        hidden md:flex
        items-center justify-center
        w-14 h-14
        bg-brand-primary hover:bg-brand-hover
        text-white
        rounded-full
        shadow-xl shadow-brand-primary/30 hover:shadow-2xl hover:shadow-brand-primary/40
        transition-all duration-300
        hover:scale-110
        group
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
      `}
      aria-label="Support on Buy Me a Coffee"
      data-cta="bmc-floating-widget"
    >
      <CoffeeIcon className="w-6 h-6" />
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Buy me a coffee
      </span>
    </a>
  );
}
