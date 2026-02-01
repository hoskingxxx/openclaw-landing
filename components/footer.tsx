'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">O</span>
            </div>
            <span className="text-white font-semibold">OpenClaw AI</span>
          </Link>

          {/* Links */}
          <div className="flex items-center space-x-8">
            <Link
              href={`/${locale}/privacy`}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              {t('terms')}
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-zinc-500">{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
