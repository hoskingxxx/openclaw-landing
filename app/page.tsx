import Link from "next/link";
import { Hero } from "@/components/features/Hero";
import { Footer } from "@/components/features/Footer";
import { Navigation } from "@/components/features/Navigation";
import { Button } from "@/components/ui/Button";
import { FEATURED_POST_PATH } from "@/lib/blog";

function PromoBanner() {
  return (
    <Link
      href={FEATURED_POST_PATH}
      className="block relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      <div className="relative max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <span className="text-white font-mono text-sm md:text-base">⚠️ READ THIS BEFORE YOU BREAK ANYTHING</span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <PromoBanner />
      <main>
        {/* Hero Section */}
        <Hero />

        {/* The Fix You Probably Needed */}
        <section id="quick-fix" className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-mono text-brand-primary mb-4 break-words">
              The Fix You Probably Needed
            </h2>
            <p className="text-text-secondary text-sm md:text-base mb-2 break-words">
              Stop trying to run the 67B model on your laptop. It won't happen.
            </p>
            <p className="text-text-tertiary text-sm font-mono">
              You're debugging physics. VRAM is not negotiable.
            </p>
          </div>

          <div className="glass-card p-4 sm:p-6 mb-6">
            <div className="bg-terminal-bg rounded-lg overflow-hidden border border-brand-primary/30">
              <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-gray-400 font-mono">terminal</span>
              </div>
              <pre className="p-4 overflow-x-auto text-xs sm:text-sm">
                <code className="text-green-400 font-mono leading-relaxed break-all">
{`# The "Poor Man's Fix" (Fits in 8GB VRAM)
ollama run deepseek-r1:8b`}
                </code>
              </pre>
            </div>
            <p className="text-sm text-text-secondary mt-4 break-words">
              This downloads the 8B Distilled version. It's dumber, but it runs.
            </p>
          </div>

          <div className="text-center">
            <Link
              href={FEATURED_POST_PATH}
              className="text-sm text-brand-primary hover:text-brand-hover underline font-mono"
            >
              Hardware Reality Check →
            </Link>
          </div>
        </section>

        {/* Final CTA - Survivor Style */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
          <div className="glass-card p-6 sm:p-8 text-center">
            <h2 className="text-xl md:text-2xl font-mono text-text-primary mb-4 break-words">
              If you are here, you probably already broke things.
            </h2>
            <p className="text-text-secondary mb-6 break-words">
              That's why this site exists. You're not alone.
            </p>
            <Button href="/docs" className="font-mono text-sm">
              Start Setup (Survivor Mode) →
            </Button>
            <p className="text-xs text-text-tertiary font-mono mt-6 break-words">
              Bookmark this page. You will be back after your next OOM.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
