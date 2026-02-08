"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig, navLinks, disclaimers } from "@/lib/site-config";
import { MenuIcon, XIcon } from "@/components/icons";
import { NavbarSupportButton } from "@/components/monetization/NavbarSupportButton";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hide donate button on guide detail pages (only show on /guides list page)
  const isGuideDetailPage = pathname?.startsWith("/guides/");

  return (
    <>
      <nav className="md:sticky md:top-0 z-50 w-full border-b border-white/5 bg-background-primary/70 backdrop-blur-lg supports-[backdrop-filter]:bg-background-primary/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary to-brand-hover flex items-center justify-center shadow-lg shadow-brand-primary/20">
                <span className="text-white font-bold text-lg">{siteConfig.logo.emoji}</span>
              </div>
              <span className="text-lg font-semibold text-text-primary hidden sm:block">{siteConfig.name}</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Support Button - hidden on guide detail pages */}
            {!isGuideDetailPage && <NavbarSupportButton />}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 text-text-primary hover:bg-white/5 rounded-lg transition-colors min-h-[44px] min-w-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4 bg-background-primary rounded-lg z-50 relative">
              <div className="flex flex-col gap-1">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-white/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Overlay - 只覆盖导航栏下方的内容 */}
        {mobileMenuOpen && (
          <div
            className="fixed left-0 right-0 bottom-0 top-[73px] bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </nav>
    </>
  );
}
