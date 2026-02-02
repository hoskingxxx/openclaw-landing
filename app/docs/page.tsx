import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Here - OpenClaw Setup Guide",
  description: "Choose your path: Cloud API (5 mins) or Local Hardware (1-2 hours). Pick based on your hardware and sanity.",
  openGraph: {
    title: "Start Here - OpenClaw Setup Guide",
    description: "Choose your path: Cloud API or Local Hardware.",
    url: "https://openclaw-ai.org/docs",
  },
};

export default function DocsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-primary">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 font-mono">
              Start Here. Choose Your Path.
            </h1>
            <p className="text-xl text-text-secondary">
              Two ways to run OpenClaw. Pick based on your hardware and sanity.
            </p>
          </div>

          {/* What is OpenClaw */}
          <section className="mb-16 glass-card p-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-4">What is OpenClaw?</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              OpenClaw <strong>does</strong> things. It doesn't just think.<br />
              It reads files, runs commands, modifies code, executes workflows.<br />
              <span className="text-text-tertiary">ChatGPT thinks. OpenClaw acts.</span>
            </p>
          </section>

          {/* The Fork - Path Selection */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-text-primary mb-8 text-center">
              Choose Your Pain Level
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Path A: Cloud API */}
              <div className="glass-card p-8 border-2 border-green-500/30 hover:border-green-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-xs font-mono font-bold">RECOMMENDED</span>
                  <h3 className="text-xl font-bold text-text-primary">Path A: Cloud API</h3>
                </div>

                <div className="space-y-4 text-text-secondary mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">⏱️</span>
                    <span>Setup time: <strong>5 mins</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">💻</span>
                    <span>Hardware: <strong>Any laptop</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">💰</span>
                    <span>Cost: <strong>~$1-5/mo</strong> (usage-based)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">😴</span>
                    <span>Stability: <strong>Operationally boring</strong></span>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded p-4 mb-6">
                  <p className="text-sm text-green-200">
                    <strong>Pro:</strong> Works immediately. No hardware drama.<br />
                    <strong>Con:</strong> Rate limits during peak hours (9-11AM Beijing).
                  </p>
                </div>

                <Button href="/quick-start#cloud" variant="primary" className="w-full justify-center">
                  Start Cloud Setup →
                </Button>
              </div>

              {/* Path B: Local Hardware */}
              <div className="glass-card p-8 border-2 border-orange-500/30 hover:border-orange-500/50 transition-colors">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded text-xs font-mono font-bold">HARDWARE REQUIRED</span>
                  <h3 className="text-xl font-bold text-text-primary">Path B: Local Ollama</h3>
                </div>

                <div className="space-y-4 text-text-secondary mb-8">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">⏱️</span>
                    <span>Setup time: <strong>1-2 hours</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">🖥️</span>
                    <span>Hardware: <strong>16GB+ RAM / GPU</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">💰</span>
                    <span>Cost: <strong>Free</strong> (if you have GPU)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">🔬</span>
                    <span>Stability: <strong>Experimental</strong></span>
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/20 rounded p-4 mb-6">
                  <p className="text-sm text-orange-200">
                    <strong>Pro:</strong> Full privacy. No rate limits.<br />
                    <strong>Con:</strong> You will fight VRAM. You will crash. You will learn.
                  </p>
                </div>

                <Button href="/quick-start#local" variant="secondary" className="w-full justify-center">
                  Start Local Setup →
                </Button>
              </div>
            </div>
          </section>

          {/* Critical Warning */}
          <section className="mb-16">
            <div className="bg-red-500/10 border-2 border-red-500/50 rounded-lg p-8">
              <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <span>🛑</span> Critical Warning
              </h3>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">1.</span>
                  <span><strong>Do NOT run 67B models on a laptop.</strong> It will not work. Your system will freeze.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">2.</span>
                  <span><strong>Do NOT ignore VRAM warnings.</strong> If nvidia-smi says 16GB, you have ~14GB usable. Plan accordingly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">3.</span>
                  <span><strong>Do NOT skip the Compatibility Matrix.</strong> If your setup isn't tested, you're the test pilot.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">4.</span>
                  <span><strong>If you chose Path B and crashed:</strong> <Link href="/troubleshooting" className="text-blue-400 hover:underline">Read the crash logs</Link> before reporting bugs.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Bottom CTA */}
          <div className="text-center glass-card p-8">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Ready to deploy?
            </h3>
            <p className="text-text-secondary mb-6">
              Pick a path above and follow the step-by-step guide.
            </p>
            <Link
              href="/guides"
              className="text-sm text-brand-primary hover:text-brand-hover underline font-mono"
            >
              Or browse the guides for advanced topics →
            </Link>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
