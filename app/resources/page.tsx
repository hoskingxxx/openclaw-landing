import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recommended Resources - Best VPS, API and Tools for OpenClaw",
  description: "Curated recommendations for the best hardware, VPS, API services and tools to run OpenClaw. Help you quickly set up a cost-effective local AI employee environment.",
  openGraph: {
    title: "Recommended Resources - Best VPS, API and Tools for OpenClaw",
    description: "Curated recommendations for the best hardware, VPS, API services and tools to run OpenClaw.",
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
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Recommended Resources
          </h1>
          <p className="text-xl text-text-secondary mb-2">
            Curated tools and services for running OpenClaw
          </p>
          <p className="text-sm text-text-tertiary">
            Some links contain affiliate commissions, which help support this site 🙏
          </p>
        </section>

        {/* VPS Recommendations */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">☁️</span>
            <h2 className="text-2xl font-bold text-text-primary">VPS Server Recommendations</h2>
            <span className="px-2 py-1 text-xs bg-brand-primary/20 text-brand-primary rounded">
              Best for 24/7 Operation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* VPS Card 1 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    Vultr High Frequency
                  </h3>
                  <p className="text-sm text-text-tertiary">World's fastest cloud servers</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                  Recommended
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ From $5/mo, hourly billing</li>
                <li>✅ 3.7GHz CPU, excellent performance</li>
                <li>✅ 25+ data centers worldwide</li>
                <li>✅ 1Gbps network, unmetered bandwidth</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$5</span>
                  <span className="text-sm text-text-secondary">/mo starting</span>
                </div>
                <a
                  href="https://www.vultr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View Deal
                </a>
              </div>

              <p className="text-xs text-text-tertiary mt-3">
                🔥 New users get $100 credit
              </p>
            </div>

            {/* VPS Card 2 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    DigitalOcean
                  </h3>
                  <p className="text-sm text-text-tertiary">Developer favorite</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ From $4/mo, simple & transparent</li>
                <li>✅ One-click OpenClaw deployment</li>
                <li>✅ Rich community tutorials</li>
                <li>✅ Stable & reliable, years in operation</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$4</span>
                  <span className="text-sm text-text-secondary">/mo starting</span>
                </div>
                <a
                  href="https://www.digitalocean.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>

            {/* VPS Card 3 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    Contabo
                  </h3>
                  <p className="text-sm text-text-tertiary">Best for large memory</p>
                </div>
                <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded">
                  High Spec
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ From €6.99/mo, huge memory</li>
                <li>✅ 8GB RAM minimum</li>
                <li>✅ Ideal for running local LLMs</li>
                <li>✅ German datacenter, strong privacy</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">€6.99</span>
                  <span className="text-sm text-text-secondary">/mo starting</span>
                </div>
                <a
                  href="https://contabo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* API Recommendations */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🔑</span>
            <h2 className="text-2xl font-bold text-text-primary">API Service Recommendations</h2>
            <span className="px-2 py-1 text-xs bg-brand-primary/20 text-brand-primary rounded">
              Model Access
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* API Card 1 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    DeepSeek Official
                  </h3>
                  <p className="text-sm text-text-tertiary">Best value for money</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                  Recommended
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ New users get 5 million tokens</li>
                <li>✅ R1 reasoning matches GPT-4</li>
                <li>✅ 1/10th the price of Claude</li>
                <li>✅ Supports function calling</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">Free</span>
                  <span className="text-sm text-text-secondary">generous credits</span>
                </div>
                <a
                  href="https://www.deepseek.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Sign Up Now
                </a>
              </div>

              <p className="text-xs text-text-tertiary mt-3">
                🔥 Promo code: OPENCLAW100 (extra 1 million tokens)
              </p>
            </div>

            {/* API Card 2 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    APIFFFF
                  </h3>
                  <p className="text-sm text-text-tertiary">China acceleration relay</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                  Accelerated
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ Direct connection in China, low latency</li>
                <li>✅ Multi-model aggregation</li>
                <li>✅ Transparent pricing, no hidden fees</li>
                <li>✅ 24/7 technical support</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">5% off</span>
                  <span className="text-sm text-text-secondary">exclusive discount</span>
                </div>
                <a
                  href="#"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  View Details
                </a>
              </div>

              <p className="text-xs text-text-tertiary mt-3">
                Promo code: OPENCLAW95
              </p>
            </div>

            {/* API Card 3 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    Anthropic Claude
                  </h3>
                  <p className="text-sm text-text-tertiary">Strongest reasoning</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ Opus 4.5 is currently strongest</li>
                <li>✅ 200K token context window</li>
                <li>✅ Strong prompt injection resistance</li>
                <li>✅ Ideal for complex tasks</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$15</span>
                  <span className="text-sm text-text-secondary">/million tokens</span>
                </div>
                <a
                  href="https://www.anthropic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  Official Site
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Hardware Recommendations */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl font-bold text-text-primary">Hardware Recommendations</h2>
            <span className="px-2 py-1 text-xs bg-brand-primary/20 text-brand-primary rounded">
              Local Operation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hardware Card 1 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    Mac Mini M4
                  </h3>
                  <p className="text-sm text-text-tertiary">Best choice for local AI</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                  Recommended
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ 16GB unified memory minimum</li>
                <li>✅ Silent operation, 24/7 always-on</li>
                <li>✅ Low power consumption, minimal electricity cost</li>
                <li>✅ Perfect support for Ollama + DeepSeek</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$449</span>
                  <span className="text-sm text-text-secondary">starting</span>
                </div>
                <a
                  href="https://www.apple.com/mac-mini/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
                >
                  View Deal
                </a>
              </div>
            </div>

            {/* Hardware Card 2 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    NVIDIA 4060 Ti 16GB
                  </h3>
                  <p className="text-sm text-text-tertiary">Top choice for Windows</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ 16GB VRAM, runs large models</li>
                <li>✅ CUDA acceleration support</li>
                <li>✅ Great value for money</li>
                <li>✅ Can run Llama 3 70B</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$320</span>
                  <span className="text-sm text-text-secondary">starting</span>
                </div>
                <a
                  href="https://www.nvidia.com/en-us/geforce/graphics-cards/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="glass-card p-6 bg-background-tertiary/30">
            <h3 className="text-lg font-semibold text-text-primary mb-3">📝 Disclaimer</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Some links on this page contain affiliate commissions. If you purchase through these links, we may earn a small commission,
              which does not increase your cost. All recommendations are based on our actual usage experience,
              and we only recommend products and services that provide genuine value.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
