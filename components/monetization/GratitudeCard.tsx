/**
 * Gratitude Card - Primary mobile conversion point
 * Shown at end of articles after user fixes their error
 */

import { CoffeeIcon } from "@/components/icons";
import { getBMCLink } from "@/lib/bmc";

export function GratitudeCard() {
  return (
    <section className="px-4 sm:px-6 mb-8">
      <div className="glass-card p-6 rounded-xl border-2 border-amber-500/20 bg-amber-500/5">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
            <CoffeeIcon className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Did this guide fix your error?
            </h3>
            <p className="text-sm text-text-secondary mb-4 leading-relaxed">
              Consider supporting the maintainer to keep these docs updated.
            </p>
            <a
              href={getBMCLink("article-footer")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/30 hover:scale-105"
              data-cta="bmc-article-footer"
            >
              <CoffeeIcon className="w-4 h-4" />
              Buy me a coffee
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
