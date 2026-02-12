import Link from "next/link";
import { SecurityHero } from "@/components/features/SecurityHero";
import { Footer } from "@/components/features/Footer";
import { Navigation } from "@/components/features/Navigation";
import { Button } from "@/components/ui/Button";
import { ContentRail } from "@/components/features/ContentRail";
import { ContentEdge } from "@/components/features/ContentEdge";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw AI - Run DeepSeek R1 Preflight & Fix OOM Errors",
  description: "Check if your hardware can handle DeepSeek R1. Battle-tested fixes for CUDA OOM errors, VRAM limits, and installation issues.",
  keywords: ["DeepSeek R1", "R1 Preflight", "OOM errors", "CUDA crashes", "VRAM calculator", "OpenClaw"],
  openGraph: {
    title: "OpenClaw AI - Run DeepSeek R1 Preflight & Fix OOM Errors",
    description: "Check if your hardware can handle DeepSeek R1. Battle-tested fixes for CUDA OOM errors, VRAM limits, and installation issues.",
    url: "https://openclaw-ai.org",
    type: "website",
  },
};

// HARDCODED PATH - Nuclear fix for redirect loop
// Updated to point to new security article
const FEATURED_POST_PATH = "/guides/openclaw-security-rce-cve-2026-25253";

function PromoBanner() {
  return (
    <Link
      href={FEATURED_POST_PATH}
      className="block relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      <div className="relative">
        <ContentRail>
          <ContentEdge className="py-3 md:py-4">
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <span className="text-white font-mono text-sm md:text-base">⚠️ READ THIS BEFORE YOU BREAK ANYTHING</span>
            </div>
          </ContentEdge>
        </ContentRail>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        {/* Security Hero Section - "The Gate" */}
        <SecurityHero />

        {/* Triage CTA */}
        <ContentRail>
          <ContentEdge>
            <section className="py-12">
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
              {/* Action A: Diagnosis */}
        {/* The Fix You Probably Needed */}
        <ContentRail>
          <ContentEdge>
            <section id="quick-fix" className="py-16">
              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-mono text-brand-primary mb-4 break-words">
                  The Fix You Probably Needed
                </h2>
                <p className="text-text-secondary text-sm md:text-base mb-2 break-words">
                  Stop trying to run full-size R1 (67B) — or even unquantized 32B — on a laptop. It won't happen.
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
                <p className="text-xs text-text-tertiary mt-2 break-words">
                  It runs, but at a cost. See <Link href="/guides/how-to-use-deepseek-with-openclaw" className="text-brand-primary hover:text-brand-hover underline">Optimization Trade-offs →</Link>
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
          </ContentEdge>
        </ContentRail>

        {/* Final CTA - Survivor Style */}
        <ContentRail>
          <ContentEdge>
            <section className="py-20">
              <div className="glass-card p-6 sm:p-8 text-center">
              <h2 className="text-xl md:text-2xl font-mono text-text-primary mb-4 break-words">
                Run OpenClaw safely. Avoid local risk.
              </h2>
              <p className="text-text-secondary mb-6 break-words">
                Check if your hardware can handle R1 before you break it.
              </p>
              <Button href="/preflight" className="font-mono text-sm">
                Run R1 Preflight →
              </Button>
              <p className="text-xs text-text-tertiary font-mono mt-6 break-words">
                Takes 2 minutes. Saves you hours of debugging.
              </p>
              <p className="text-xs text-text-tertiary mt-4 leading-relaxed">
                Already stuck? The Survival Kit has exit rules and workarounds.
              </p>
            </div>
          </section>
          </ContentEdge>
        </ContentRail>
      </main>

      {/* Trust Signal */}
      <div className="text-center py-6">
        <p className="text-xs text-text-tertiary">
          Based on recurring R1 crash patterns discussed on GitHub and r/LocalLLaMA.
        </p>
      </div>

      <Footer />
    </>
  );
}
