'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Users, Code, Workflow, ShoppingCart, Megaphone, TrendingUp } from 'lucide-react';

export function UseCases() {
  const t = useTranslations('useCases');

  const icons = [Users, Code, Workflow, ShoppingCart, Megaphone, TrendingUp];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-zinc-400">{t('subtitle')}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {t.raw('items').map((item: any, index: number) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
