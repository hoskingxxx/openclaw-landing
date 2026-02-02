import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Breadcrumbs } from "@/components/features/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources - VPS, Hardware & API for OpenClaw",
  description: "Hardware and hosting options for running OpenClaw with DeepSeek R1. Decision tree to help you choose.",
  openGraph: {
    title: "Resources - VPS, Hardware & API for OpenClaw",
    description: "Hardware and hosting options for running OpenClaw.",
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
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Deployment Resources
          </h1>
          <p className="text-xl text-text-secondary mb-2">
            Choose your path based on hardware and budget
          </p>
          <p className="text-sm text-text-tertiary">
            Some links contain affiliate commissions. All options listed have been tested.
          </p>
        </section>

        {/* Decision Tree */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6">🌳 Decision Tree</h2>
            <div className="space-y-4 text-text-secondary">
              <p><strong className="text-white">Question 1:</strong> Do you have a GPU with 16GB+ VRAM?</p>
              <div className="ml-4 space-y-2">
                <p>→ <strong className="text-green-400">Yes:</strong> Run locally with Ollama (see Hardware section below)</p>
                <p>→ <strong className="text-red-400">No:</strong> Go to Question 2</p>
              </div>

              <p className="mt-4"><strong className="text-white">Question 2:</strong> Can you spend $0.50/hour for cloud GPU?</p>
              <div className="ml-4 space-y-2">
                <p>→ <strong className="text-green-400">Yes:</strong> Rent a GPU (see VPS section below)</p>
                <p>→ <strong className="text-red-400">No:</strong> Use quantized models or API services</p>
              </div>

              <p className="mt-4"><strong className="text-white">Question 3:</strong> Do you need 24/7 operation?</p>
              <div className="ml-4 space-y-2">
                <p>→ <strong className="text-green-400">Yes:</strong> VPS or dedicated hardware</p>
                <p>→ <strong className="text-red-400">No:</strong> Local machine may work</p>
              </div>
            </div>
          </div>
        </section>

        {/* VPS Options */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">☁️ Cloud GPU (VPS)</h2>
          <p className="text-text-secondary mb-6">
            For users who need on-demand GPU power without hardware investment.
          </p>

          <div className="space-y-4">
            {/* Vultr */}
            <div className="glass-card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">Vultr High Frequency GPU</h3>
                </div>
              </div>

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
                  <li>• Long-term 24/7 operation (cost adds up)</li>
                  <li>• Users with tight budgets</li>
                </ul>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-text-secondary">From ~$0.50-0.80/hr (A100/A6000)</span>
                <a
                  href="https://www.vultr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded transition-colors"
                >
                  Visit Vultr
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hardware Options */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">💻 Local Hardware</h2>
          <p className="text-text-secondary mb-6">
            For users who prefer one-time hardware cost and privacy.
          </p>

          <div className="space-y-4">
            {/* Mac Mini */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Mac Mini (M4/M4 Pro)</h3>

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
                  <li>• Running full 67B models (requires more VRAM)</li>
                  <li>• Users who need maximum speed</li>
                </ul>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-text-secondary">From $449 (16GB RAM minimum)</span>
                <a
                  href="https://www.apple.com/mac-mini/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded transition-colors"
                >
                  Apple Store
                </a>
              </div>
            </div>

            {/* NVIDIA GPU */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">NVIDIA GPU (4060 Ti 16GB+)</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ Suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Windows/Linux users</li>
                  <li>• Running larger models (up to 30B+)</li>
                  <li>• Users who need CUDA acceleration</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Not suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Users with under 16GB VRAM</li>
                  <li>• Mac users (no CUDA support)</li>
                </ul>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-text-secondary">From ~$320 (16GB VRAM minimum)</span>
                <a
                  href="https://www.nvidia.com/en-us/geforce/graphics-cards/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded transition-colors"
                >
                  NVIDIA
                </a>
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
                  <li>• Cost-conscious users (vs Claude/GPT-4)</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Not suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Users who require complete data privacy</li>
                  <li>• High-volume production (API costs add up)</li>
                </ul>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-text-secondary">Pay-per-use pricing</span>
                <a
                  href="https://www.deepseek.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded transition-colors"
                >
                  DeepSeek
                </a>
              </div>
            </div>

            {/* Anthropic */}
            <div className="glass-card p-6">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Anthropic Claude</h3>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✓ Suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Complex reasoning tasks</li>
                  <li>• Production workloads requiring reliability</li>
                  <li>• Users who need strong prompt-injection resistance</li>
                </ul>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-white mb-2">✗ Not suitable for:</p>
                <ul className="text-sm text-text-secondary ml-4">
                  <li>• Budget-constrained users</li>
                  <li>• Simple tasks where cheaper models suffice</li>
                </ul>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-text-secondary">Higher per-token cost</span>
                <a
                  href="https://www.anthropic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded transition-colors"
                >
                  Anthropic
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* OOM Error Link */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="glass-card p-6 text-center">
            <p className="text-text-secondary mb-4">
              Getting CUDA out of memory errors?
            </p>
            <Button href="/oom">
              View OOM Error Solutions →
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
