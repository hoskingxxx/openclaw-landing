'use client';

import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTransition } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      // Replace the current locale in the pathname
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      window.location.href = newPathname;
    });
  };

  const otherLocale = locale === 'en' ? 'zh' : 'en';
  const localeLabel = locale === 'en' ? '中文' : 'English';

  // Navigation links with anchors
  const navLinks = [
    { href: '#why', label: locale === 'en' ? 'Why' : '为什么' },
    { href: '#how', label: locale === 'en' ? 'How to Use' : '如何使用' },
    { href: '#faq', label: locale === 'en' ? 'FAQ' : '常见问题' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2" aria-label="OpenClaw AI Home">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-white font-semibold text-lg">OpenClaw AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <button
              onClick={() => switchLocale(otherLocale)}
              disabled={isPending}
              className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label={`Switch to ${otherLocale === 'en' ? 'English' : '中文'}`}
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span>{localeLabel}</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-zinc-400 hover:text-white hover:bg-white/5"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-zinc-400 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => switchLocale(otherLocale)}
                disabled={isPending}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors self-start"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span>{localeLabel}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
