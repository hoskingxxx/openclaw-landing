'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';

export function WaitlistForm() {
  const t = useTranslations('waitlist');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Track submit attempt
    trackEvent(ANALYTICS_EVENTS.WAITLIST_SUBMIT);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      trackEvent(ANALYTICS_EVENTS.WAITLIST_ERROR, { reason: 'invalid_email' });
      return;
    }

    setIsLoading(true);

    // Simulate API call (Phase 2: Replace with actual API call)
    setTimeout(() => {
      setStatus('success');
      trackEvent(ANALYTICS_EVENTS.WAITLIST_SUCCESS, { email_domain: email.split('@')[1] });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-8">
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-zinc-400 mb-10">{t('subtitle')}</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                disabled={isLoading || status === 'success'}
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || status === 'success'}
                className="px-6 py-3 bg-gradient-primary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Loading...
                  </span>
                ) : (
                  t('button')
                )}
              </button>
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center text-green-400"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                {t('success')}
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-center justify-center text-red-400"
              >
                <AlertCircle className="w-5 h-5 mr-2" />
                {t('error')}
              </motion.div>
            )}
          </form>

          <p className="text-sm text-zinc-500 mt-6">
            Phase 2: Waitlist storage will be integrated with Supabase
          </p>
        </motion.div>
      </div>
    </section>
  );
}
