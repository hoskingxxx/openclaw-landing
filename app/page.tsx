import Link from "next/link";
import { SecurityHero } from "@/components/features/SecurityHero";
import { Footer } from "@/components/features/Footer";
import { Navigation } from "@/components/features/Navigation";
import { ContentRail } from "@/components/features/ContentRail";
import { ContentEdge } from "@/components/features/ContentEdge";
import { PrimaryCTA } from "@/components/monetization/PrimaryCTA";
import { PRIMARY_OFFER } from "@/lib/offers";
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

function PromoBanner() {
  return (
    <Link
      href="/guides/openclaw-security-rce-cve-2026-25253"
      className="block relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-orange-500/20" />
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

        {/* Why Local Fails */}
        <ContentRail>
          <ContentEdge>
            <section className="py-16">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-3xl font-mono text-red-400 mb-4">
                  Why Local Fails
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Most users hit the same wall. Here's what actually breaks.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* VRAM */}
                <div className="bg-terminal-bg border border-red-500/30 rounded-lg p-6">
                  <div className="text-4xl mb-4">🎮</div>
                  <h3 className="text-lg font-mono text-red-400 mb-3">VRAM Wall</h3>
                  <p className="text-sm text-text-secondary">
                    R1 67B needs 48GB+. Consumer cards top out at 24GB.
                    You're not buggy — you're physics-limited.
                  </p>
                </div>

                {/* OOM */}
                <div className="bg-terminal-bg border border-red-500/30 rounded-lg p-6">
                  <div className="text-4xl mb-4">💥</div>
                  <h3 className="text-lg font-mono text-red-400 mb-3">OOM Loops</h3>
                  <p className="text-sm text-text-secondary">
                    CUDA out of memory crashes mid-inference.
                    No config tweak fixes insufficient hardware.
                  </p>
                </div>

                {/* Risk */}
                <div className="bg-terminal-bg border border-red-500/30 rounded-lg p-6">
                  <div className="text-4xl mb-4">🔐</div>
                  <h3 className="text-lg font-mono text-red-400 mb-3">Root Risk</h3>
                  <p className="text-sm text-text-secondary">
                    AI agents need full system privileges.
                    One bad prompt = root-level execution.
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <p className="text-text-tertiary text-sm font-mono mb-6">
                  You can fight physics, or you can understand the limits.
                </p>
                {/* Secondary CTA: Survival Kit */}
                <PrimaryCTA variant="full" placement="bottom" offer="secondary" />
              </div>
            </section>
          </ContentEdge>
        </ContentRail>

        {/* The Fix You Probably Needed */}
        <ContentRail>
          <ContentEdge>
            <section id="quick-fix" className="py-16">
              <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-mono text-brand-primary mb-4 break-words">
                  The Alternative: Run Smaller
                </h2>
                <p className="text-text-secondary text-sm md:text-base mb-2 break-words">
                  Stop trying to run full-size R1 (67B) — or even unquantized 32B — on a laptop. It won't happen.
                </p>
                <p className="text-text-tertiary text-sm font-mono">
                  You're debugging physics. VRAM is not negotiable.
                </p>
              </div>

              <div className="glass-card p-4 sm:p-6 mb-6 max-w-3xl mx-auto">
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
                  This downloads 8B Distilled version. It's dumber, but it runs.
                </p>
                <p className="text-xs text-text-tertiary mt-2 break-words">
                  It runs, but at a cost. See <Link href="/guides/how-to-use-deepseek-with-openclaw" className="text-brand-primary hover:text-brand-hover underline">Optimization Trade-offs →</Link>
                </p>
              </div>

              <div className="text-center">
                <Link
                  href="/guides/openclaw-security-rce-cve-2026-25253"
                  className="text-sm text-brand-primary hover:text-brand-hover underline font-mono"
                >
                  Hardware Reality Check →
                </Link>
              </div>
            </section>
          </ContentEdge>
        </ContentRail>

        {/* Final CTA - Cloud */}
        <ContentRail>
          <ContentEdge>
            <section className="py-20">
              <div className="glass-card p-6 sm:p-8 text-center max-w-3xl mx-auto">
                <h2 className="text-xl md:text-2xl font-mono text-text-primary mb-4 break-words">
                  Stop Fighting Physics. Rent GPU.
                </h2>
                <p className="text-text-secondary mb-6 break-words">
                  Skip the hardware limits. Spin up an H100, run your job, done.
                </p>
                <p className="text-xs text-text-tertiary font-mono mb-6 break-words">
                  $5/hr. No setup. Destroy when done.
                </p>
                <a
                  href={PRIMARY_OFFER.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="text-xs text-brand-primary hover:text-brand-hover underline font-mono"
                >
                  Deploy on Vultr →
                </a>
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
