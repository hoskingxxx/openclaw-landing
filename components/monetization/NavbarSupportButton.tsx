/**
 * Navbar Support Button - "Trust" monetization entry point
 * Minimalist outline button in header
 */

"use client";

import { CoffeeIcon } from "@/components/icons";
import { getBMCLink } from "@/lib/bmc";

export function NavbarSupportButton() {
  return (
    <a
      href={getBMCLink("navbar")}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary border border-white/10 hover:border-white/20 hover:bg-white/5 rounded-lg transition-all duration-200"
      aria-label="Support on Buy Me a Coffee"
    >
      <CoffeeIcon className="w-4 h-4" />
      <span>Support</span>
    </a>
  );
}
