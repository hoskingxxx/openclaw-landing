import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { NextStepCard } from "@/components/NextSteps";
import {
  useCases,
  comparisonTable,
  universalCommandTemplate,
  supportedChannels,
  installSteps,
} from "@/lib/content";

function PromoBanner() {
  return (
    <Link
      href="/blog/how-to-use-deepseek-with-openclaw"
      className="block relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      <div className="relative max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-4">
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

        {/* No-Phishing Trust Signal */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center gap-3 text-sm text-text-tertiary">
            <span>🔒</span>
            <span className="font-mono">No-Phishing Promise:</span>
            <span>We never ask for your API keys. No login, no telemetry. All examples use placeholders.</span>
          </div>
        </section>

        {/* Crash Simulation - REPLACES comparison table */}
        <section id="hardware-reality" className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-mono text-red-400 mb-4">
              What Actually Happens
            </h2>
            <p className="text-text-secondary text-sm">
              This is not a joke. This is what most of you will see.
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-red-500/30 shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-400 font-mono">terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 font-mono leading-relaxed">
{`$ openclaw start --model deepseek-r1
Loading model...
Error: CUDA out of memory. Tried to allocate 14.20 GiB (GPU 0;
       8.00 GiB total capacity; 6.42 GiB already allocated;
       5.18 GiB free; 6.42 GiB reserved in total by PyTorch)
If supported, you can use 'max_memory' to limit memory usage.
[Process finished with exit code 1]`}
              </code>
            </pre>
          </div>

          <p className="text-center text-sm text-text-tertiary mt-4 font-mono">
            If your terminal looks like this, <Link href="/blog/how-to-use-deepseek-with-openclaw" className="text-brand-primary hover:text-brand-hover underline">read the Hardware Guide</Link>.
          </p>
        </section>

        {/* Core Features Section - REPLACED WITH CRASH SIMULATION */}
        <section id="hardware-reality" className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-mono text-red-400 mb-4">
              What Actually Happens
            </h2>
            <p className="text-text-secondary text-sm">
              This is not a joke. This is what most of you will see.
            </p>
          </div>

          <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-red-500/30 shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-400 font-mono">terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-gray-100 font-mono leading-relaxed">
{`> openclaw start --model deepseek-r1
Loading model...
Error: CUDA out of memory. Tried to allocate 14.20 GiB (GPU 0;
       8.00 GiB total capacity; 6.42 GiB already allocated;
       5.18 GiB free; 6.42 GiB reserved in total by PyTorch)
If supported, you can use 'max_memory' to limit memory usage.
[Process finished with exit code 1]`}
              </code>
            </pre>
          </div>

          <p className="text-center text-sm text-text-tertiary mt-4 font-mono">
            If your terminal looks like this, <Link href="/blog/how-to-use-deepseek-with-openclaw" className="text-brand-primary hover:text-brand-hover underline">read the Hardware Guide</Link>.
          </p>
        </section>

        {/* Use Cases Section - REMOVED (marketing fluff) */}

        {/* Quick Start Section - REMOVED (marketing fluff) */}

        {/* Universal Command Template Section - REMOVED (marketing fluff) */}

        {/* Simple Next Step - Direct to Guide */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-mono text-text-primary mb-4">
              Ready to break things?
            </h2>
            <p className="text-text-secondary mb-6">
              Read the guide before you waste hours debugging hardware issues.
            </p>
            <Link
              href="/blog/how-to-use-deepseek-with-openclaw"
              className="inline-block px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-mono text-sm rounded transition-colors"
            >
              Read the Survival Guide →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
