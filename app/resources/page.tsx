import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Breadcrumbs } from "@/components/features/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardware Reality Check - OpenClaw Deployment Options",
  description: "Every wrong choice here costs you hours. Cloud GPU, local hardware, or API — choose based on your actual constraints.",
  openGraph: {
    title: "Hardware Reality Check - OpenClaw Deployment Options",
    description: "Choose your path based on hardware and budget.",
    url: "https://openclaw-ai.org/resources",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }]} />
        </div>

        {/* Page Title */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 font-mono">
            Hardware Reality Check
          </h1>
          <p className="text-xl text-text-secondary mb-2">
            Choose your path — every wrong choice here costs you hours.
          </p>
        </section>

        {/* Decision Tree */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6 font-mono">Decision Tree</h2>
            <div className="space-y-4 text-text-secondary">
              <p><strong className="text-white">Question 1:</strong> Do you have a GPU with 16GB+ VRAM?</p>
              <div className="ml-4 space-y-2">
                <p>→ <strong className="text-green-400">Yes:</strong> Run locally with Ollama (see Hardware section below)</p>
                <p>→ <strong className="text-red-400">No:</strong> Go to Question 2</p>
              </div>

              <p className="mt-4"><strong className="text-white">Question 2:</strong> Can you spend ~$0.50/hour for cloud GPU?</p>
              <div className="ml-4 space-y-2">
                <p>→ <strong className="text-green-400">Yes:</strong> Rent a GPU (see VPS section below)</p>
                <p>→ <strong className="text-red-400">No:</strong> Use API services (cheaper upfront)</p>
              </div>

              <p className="mt-4"><strong className="text-white">Question 3:</strong> Do you need 24/7 operation?</p>
              <div className="ml-4 space-y-2">
                <p>→ <strong className="text-green-400">Yes:</strong> VPS or dedicated hardware</p>
                <p>→ <strong className="text-red-400">No:</strong> Local machine or on-demand cloud</p>
              </div>
            </div>
          </div>
        </section>

        {/* VPS Options - De-commercialized */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">☁️ Cloud GPU (VPS)</h2>
          <p className="text-text-secondary mb-6">
            The only way to sleep at night if you don't have 24GB+ VRAM.
          </p>

          <div className="space-y-4">
            {/* Vultr - No buy button */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Vultr High Frequency GPU</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ The only way to sleep at night:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• No local hardware drama</li>
                  <li>• Turn it off when you're done</li>
                  <li>• No worrying about electricity bills</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Works, but you will suffer:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Long-term 24/7 operation (cost adds up: ~$360/mo)</li>
                  <li>• Need to transfer data to/from cloud</li>
                </ul>
              </div>

              <div className="text-sm text-text-secondary mt-4">
                <span className="font-mono">From ~$0.50-0.80/hr (A100/A6000)</span>
              </div>
            </div>

            {/* Other VPS options - simplified */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Other Options</h3>
              <p className="text-sm text-text-secondary mb-4">
                RunPod, Lambda Labs, Vast.ai offer similar GPU rental services. Pricing varies by availability and region.
              </p>
              <p className="text-xs text-text-tertiary">
                Always check: actual GPU model, VRAM, and per-hour cost before committing.
              </p>
            </div>
          </div>
        </section>

        {/* Hardware Options - Gritty Realism */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">💻 Local Hardware</h2>
          <p className="text-text-secondary mb-6">
            Buy once, cry once. Or buy cheap, cry every day.
          </p>

          <div className="space-y-4">
            {/* Mac Mini */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Mac Mini (M4/M4 Pro, 16GB+)</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ The only way to sleep at night:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• 24/7 operation (low power, silent)</li>
                  <li>• Running quantized models (7B-14B)</li>
                  <li>• Fully offline, no API costs</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Works, but you will suffer:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Running full 32B+ models (not enough VRAM)</li>
                  <li>• 3.2 tokens/sec on 8B models (painfully slow)</li>
                </ul>
              </div>

              <div className="text-sm text-text-secondary mt-4">
                <span className="font-mono">From ~$449 (16GB RAM minimum, 24GB recommended for serious use)</span>
              </div>
            </div>

            {/* NVIDIA GPU */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">NVIDIA GPU (4060 Ti 16GB+ or used 3090 24GB)</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ The only way to sleep at night:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Windows/Linux users</li>
                  <li>• Running larger models (up to 32B with 24GB VRAM)</li>
                  <li>• CUDA acceleration (fastest option)</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Works, but you will suffer:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Users with under 16GB VRAM (see <Link href="/troubleshooting" className="text-brand-primary hover:underline">crash logs</Link>)</li>
                  <li>• Mac users (no CUDA support)</li>
                  <li>• Used 3090s are mined-out or have fan issues</li>
                </ul>
              </div>

              <div className="text-sm text-text-secondary mt-4">
                <span className="font-mono">From ~$320 new (16GB) | ~$700 used (3090 24GB - buyer beware)</span>
              </div>
            </div>
          </div>
        </section>

        {/* API Services */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">🔑 API Services</h2>
          <p className="text-text-secondary mb-6">
            The only way to sleep at night if you want zero hardware drama.
          </p>

          <div className="space-y-4">
            {/* DeepSeek */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">DeepSeek API</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ The only way to sleep at night:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• R1 reasoning without hardware drama</li>
                  <li>• Development and testing</li>
                  <li>• Casual use (~$1-5/mo)</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Works, but you will suffer:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Data goes to their servers (privacy tradeoff)</li>
                  <li>• Rate limits during peak hours (9-11AM Beijing)</li>
                  <li>• High-volume production (API costs add up fast)</li>
                </ul>
              </div>

              <div className="text-sm text-text-secondary mt-4">
                <span className="font-mono">Pay-per-use (~$0.14/M input, ~$0.28/M output)</span>
              </div>
            </div>
          </div>
        </section>

        {/* OOM Error Link */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="glass-card p-8 text-center border border-red-500/30">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Not sure if your hardware can handle it?
            </h3>
            <p className="text-text-secondary mb-6">
              Read the crash logs before you buy anything. These are real failures from real hardware.
            </p>
            <Button href="/troubleshooting" variant="secondary">
              Read Crash Logs →
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
