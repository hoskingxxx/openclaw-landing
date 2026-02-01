'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto text-center">
        {/* 使用 CSS 动画替代 framer-motion - 更轻量 */}
        <div className="animate-fade-in-up">
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              t('badge1'),
              t('badge2'),
              t('badge3'),
              t('badge4'),
            ].map((badge, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-zinc-300"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* H1 */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            {t('h1')}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>

          {/* CTA Button - 纯 CSS hover 效果 */}
          <button
            onClick={() => trackEvent(ANALYTICS_EVENTS.CTA_CLICK, { location: 'hero' })}
            className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>{t('cta')}</span>
            {/* 内联 SVG 替代 lucide-react 图标 */}
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
