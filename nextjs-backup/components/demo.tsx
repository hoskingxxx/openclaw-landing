'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Demo() {
  const t = useTranslations('demo');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4">
            {t('title')}
          </h2>
        </motion.div>

        {/* Screenshot placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative rounded-xl overflow-hidden border border-border bg-muted"
        >
          {/* Placeholder content */}
          <div className="aspect-video flex items-center justify-center">
            <div className="text-center p-8">
              {/* Mock UI */}
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Mock URL bar */}
                <div className="flex items-center space-x-3 bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  <div className="flex-1 bg-white/5 rounded px-4 py-2 text-sm text-zinc-500 text-left">
                    https://example.com/product-page
                  </div>
                </div>

                {/* Mock result table */}
                <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
                  <div className="grid grid-cols-4 gap-4 p-3 border-b border-white/10 text-xs font-medium text-zinc-400">
                    <div>Title</div>
                    <div>Price</div>
                    <div>Rating</div>
                    <div>Link</div>
                  </div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="grid grid-cols-4 gap-4 p-3 border-b border-white/10 text-sm text-zinc-300">
                      <div>Product {i}</div>
                      <div>$99.99</div>
                      <div>4.{i} ★</div>
                      <div className="text-primary truncate">View</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Overlay label */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-zinc-400">
            {t('placeholderText')}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
