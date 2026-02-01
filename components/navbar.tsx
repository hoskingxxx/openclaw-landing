'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTransition } from 'react';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    startTransition(() => {
      const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`);
      window.location.href = newPathname;
    });
  };

  const otherLocale = locale === 'en' ? 'zh' : 'en';
  const localeLabel = locale === 'en' ? '中文' : 'EN';

  // Navigation links matching the index.html structure
  const navLinks = [
    { href: '#what-is', key: 'intro' },
    { href: '#features', key: 'features' },
    { href: '#use-cases', key: 'useCases' },
    { href: '#scenarios', key: 'scenarios' },
    { href: '#quick-start', key: 'quickStart' },
    { href: '#videos', key: 'videos' },
    { href: '#faq', key: 'faq' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(13,13,15,0.8)] backdrop-blur-[20px] border-b border-[#323238]" role="navigation" aria-label="Main navigation">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-[60px]">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2" aria-label="OpenClaw Home">
            <span className="text-[20px] font-bold bg-gradient-to-r from-[#FF3B30] to-[#FF6B5B] bg-clip-text text-transparent">OpenClaw</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-[#c5c5c9] hover:text-[#FF3B30] transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-[#FF3B30] after:to-[#FF6B5B] after:transition-all hover:after:w-full"
              >
                {t(link.key as any)}
              </a>
            ))}
          </div>

          {/* CTA Button & Language Switcher */}
          <div className="flex items-center space-x-4">
            <a
              href="#quick-start"
              className="hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#FF3B30] to-[#FF6B5B] hover:translate-y-[-2px] hover:scale-105 hover:shadow-[0_6px_25px_rgba(255,59,48,0.35)] transition-all"
            >
              {t('getStarted')}
            </a>

            {/* Language Switcher */}
            <button
              onClick={() => switchLocale(otherLocale)}
              disabled={isPending}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-full text-sm text-[#c5c5c9] bg-[#1a1a1d] border border-[#323238] hover:border-[#FF3B30] hover:text-[#FF3B30] hover:translate-y-[-2px] hover:shadow-[0_4px_15px_rgba(255,59,48,0.15)] transition-all"
              aria-label={`Switch to ${otherLocale === 'en' ? 'English' : '中文'}`}
            >
              <span className="font-semibold">{localeLabel}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-[#f5f5f7] bg-transparent"
              aria-label={t('menu')}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#323238]">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[#c5c5c9] hover:text-[#FF3B30] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t(link.key as any)}
                </a>
              ))}
              <a
                href="#quick-start"
                className="text-[#FF3B30] font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('getStarted')}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
