'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="py-20 px-6 border-t border-[#323238]">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-lg mb-2 bg-gradient-to-r from-[#FF3B30] to-[#FF6B5B] bg-clip-text text-transparent font-semibold">
            {t('tagline')}
          </p>
          <p className="text-sm text-[#86868b]">{t('copyright')}</p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-[#FF3B30] rounded-full text-white cursor-pointer hover:bg-[#FF6B5B] hover:translate-y-[-4px] hover:shadow-[0_8px_30px_rgba(255,59,48,0.4)] transition-all z-[999] flex items-center justify-center"
          aria-label={t('backToTop')}
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
