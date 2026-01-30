'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link as LinkIcon, MousePointer2, FileDown } from 'lucide-react';

export function HowTo() {
  const t = useTranslations('how');

  const icons = [LinkIcon, MousePointer2, FileDown];

  return (
    <section id="how" className="py-20 px-4 sm:px-6 lg:px-8" aria-labelledby="how-heading">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 id="how-heading" className="text-3xl md:text-5xl font-semibold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-zinc-400">{t('subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.raw('steps').map((step: any, index: number) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg z-10" aria-hidden="true">
                  {step.number}
                </div>

                <article className="pt-8 pr-8 pl-8 pb-6 rounded-xl bg-card border border-border h-full">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 mt-4" aria-hidden="true">
                    <Icon className="w-6 h-6 text-zinc-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400">{step.description}</p>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
