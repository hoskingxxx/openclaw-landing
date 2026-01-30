'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent opacity-50" />

      <div className="relative max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
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

          {/* CTA Button */}
          <Link href="#waitlist">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              <span>{t('cta')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
