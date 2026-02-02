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
            For users who need on-demand GPU power without hardware investment.
          </p>

          <div className="space-y-4">
            {/* Vultr - No buy button */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Vultr High Frequency GPU</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ Suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Testing and development</li>
                  <li>• Short-term intensive tasks</li>
                  <li>• Users who don't want to buy hardware</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Not suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Long-term 24/7 operation (cost adds up: ~$360/mo)</li>
                  <li>• Users with tight budgets</li>
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

        {/* Hardware Options - De-commercialized */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">💻 Local Hardware</h2>
          <p className="text-text-secondary mb-6">
            For users who prefer one-time hardware cost and privacy.
          </p>

          <div className="space-y-4">
            {/* Mac Mini */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Mac Mini (M4/M4 Pro, 16GB+)</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ Suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• 24/7 operation (low power, silent)</li>
                  <li>• Running quantized models (7B-14B)</li>
                  <li>• Users who want always-on availability</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Not suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Running full 32B+ models (requires more VRAM)</li>
                  <li>• Users who need maximum speed</li>
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
                <p className="text-sm font-medium text-white mb-2">✓ Suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Windows/Linux users</li>
                  <li>• Running larger models (up to 32B with 24GB VRAM)</li>
                  <li>• Users who need CUDA acceleration</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Not suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Users with under 16GB VRAM (see <Link href="/troubleshooting" className="text-brand-primary hover:underline">crash logs</Link>)</li>
                  <li>• Mac users (no CUDA support)</li>
                </ul>
              </div>

              <div className="text-sm text-text-secondary mt-4">
                <span className="font-mono">From ~$320 new (16GB) | ~$700 used (3090 24GB)</span>
              </div>
            </div>
          </div>
        </section>

        {/* API Services */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">🔑 API Services</h2>
          <p className="text-text-secondary mb-6">
            For users who prefer managed model access over local deployment.
          </p>

          <div className="space-y-4">
            {/* DeepSeek */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">DeepSeek API</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ Suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Users wanting R1 reasoning without hardware</li>
                  <li>• Development and testing</li>
                  <li>• Cost-conscious users (~$1-5/mo casual use)</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Not suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Users who require complete data privacy</li>
                  <li>• High-volume production (API costs add up)</li>
                </ul>
              </div>

              <div className="text-sm text-text-secondary mt-4">
                <span className="font-mono">Pay-per-use (~$0.14/M input tokens, ~$0.28/M output)</span>
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
