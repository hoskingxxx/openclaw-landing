import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Breadcrumbs } from "@/components/features/Breadcrumbs";
import { ContentRail } from "@/components/features/ContentRail";
import { ContentEdge } from "@/components/features/ContentEdge";
import { FEATURED_POST_PATH } from "@/lib/blog";
import type { Metadata } from "next";
import { Cpu, Server, Zap, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recommended VPS Setup for OpenClaw - DigitalOcean, Vultr & More",
  description: "Recommended VPS providers for running OpenClaw with DeepSeek R1. Compare DigitalOcean, Vultr, Lambda Labs, and RunPod for AI workloads.",
  openGraph: {
    title: "Recommended VPS Setup for OpenClaw",
    description: "Compare VPS providers for running OpenClaw with DeepSeek R1 in production.",
    url: "https://openclaw-ai.org/tools/recommended-setup",
  },
};

const providers = [
  {
    name: "DigitalOcean",
    icon: Server,
    description: "Dedicated GPU droplets with H100 and A100 options. Reliable, well-documented, great for production.",
    highlights: ["H100 with 80GB VRAM", "$200 credit for new users", "24/7 support"],
    badge: "Recommended",
    status: "available",
  },
  {
    name: "Vultr",
    icon: Zap,
    description: "Flexible hourly billing with cloud GPU options. Good for testing different configurations.",
    highlights: ["A100 40GB/80GB", "Hourly billing", "Global data centers"],
    badge: "Flexible",
    status: "available",
  },
  {
    name: "Lambda Labs",
    icon: Cpu,
    description: "Specialized AI cloud with cheapest H100 pricing. Preconfigured CUDA images.",
    highlights: ["H100 from $2.49/hr", "GPU-optimized images", "DeepSeek preloaded"],
    badge: "Best Value",
    status: "available",
  },
  {
    name: "RunPod",
    icon: Server,
    description: "Budget GPU marketplace with spot instances. Good for development and testing.",
    highlights: ["Spot instances from $0.20/hr", "Wide GPU selection", "Community templates"],
    badge: "Budget",
    status: "available",
  },
];

export default function RecommendedSetupPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <ContentRail>
          <ContentEdge>
          <div className="pt-8 pb-4">
            <Breadcrumbs items={[
              { label: "Tools", href: "/tools" },
              { label: "Recommended Setup", href: "/tools/recommended-setup" }
            ]} />
          </div>
          </ContentEdge>
        </ContentRail>

        {/* Page Title */}
        <ContentRail>
          <ContentEdge>
          <section className="py-8">
            <h1 className="heading-page text-text-primary mb-4">
              Recommended VPS Setup
            </h1>
            <p className="text-xl text-text-secondary">
              GPU cloud providers tested with OpenClaw + DeepSeek R1
            </p>
          </section>
          </ContentEdge>
        </ContentRail>

        {/* Exit Block - Before Coming Soon */}
        <ContentRail>
          <ContentEdge>
          <section className="py-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-text-primary">
                Before you choose a VPS, check if you even need one.
              </h2>
              <p className="text-text-secondary">
                Run the R1 Pre-flight Check to avoid wasting money on the wrong setup.
              </p>
              <div className="space-y-3 pt-2">
                <Link
                  href="/preflight"
                  className="inline-block px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all"
                >
                  Run Pre-flight Check
                </Link>
                <div className="text-sm text-text-secondary">
                  Or <a href="https://hilda666888.gumroad.com/l/ymwwgm" target="_blank" rel="noopener noreferrer sponsored" className="text-orange-500 hover:text-orange-400 underline">get the 1-Click Survival Kit</a>
                </div>
              </div>
            </div>
          </section>
          </ContentEdge>
        </ContentRail>

        {/* Coming Soon Banner */}
        <ContentRail>
          <ContentEdge>
          <section className="pb-8">
          <div className="glass-card border-l-4 border-orange-500 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-text-primary mb-2">
                  Coming Soon - Affiliate Links & Detailed Reviews
                </h2>
                <p className="text-text-secondary">
                  We're currently testing and documenting each provider's performance with OpenClaw.
                  Full benchmarks, pricing comparisons, and direct affiliate links will be added soon.
                </p>
              </div>
            </div>
          </div>
        </section>
          </ContentEdge>
        </ContentRail>

        {/* Provider Cards */}
        <ContentRail>
          <ContentEdge>
          <section className="pb-12">
          <div className="space-y-6">
            {providers.map((provider) => {
              const Icon = provider.icon;
              return (
                <div key={provider.name} className="glass-card">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-background-secondary flex items-center justify-center">
                          <Icon className="w-6 h-6 text-text-primary" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-text-primary">{provider.name}</h3>
                          <span className="inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full bg-orange-500/20 text-orange-400">
                            {provider.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-4">
                      {provider.description}
                    </p>

                    <ul className="space-y-2">
                      {provider.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-text-secondary text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {provider.status === "available" && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-sm text-text-tertiary">
                          Affiliate link coming soon
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
          </ContentEdge>
        </ContentRail>

        {/* Quick Recommendations */}
        <ContentRail>
          <ContentEdge>
          <section className="pb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Quick Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">For Production</h3>
              <p className="text-text-secondary text-sm">
                DigitalOcean H100 or Lambda Labs. Reliable infrastructure with 24/7 support.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-lg font-bold text-text-primary mb-2">For Testing</h3>
              <p className="text-text-secondary text-sm">
                Vultr (hourly billing) or RunPod spot instances. Pay only for what you use.
              </p>
            </div>
          </div>
        </section>
          </ContentEdge>
        </ContentRail>

        {/* Hardware Requirements Reference */}
        <ContentRail>
          <ContentEdge>
          <section className="pb-12">
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold text-text-primary mb-4">
                VRAM Requirements for DeepSeek R1
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-text-secondary">Model</th>
                      <th className="text-left py-2 text-text-secondary">FP16 VRAM</th>
                      <th className="text-left py-2 text-text-secondary">Q4 VRAM</th>
                      <th className="text-left py-2 text-text-secondary">Recommended GPU</th>
                    </tr>
                  </thead>
                  <tbody className="text-text-secondary">
                    <tr className="border-b border-white/5">
                      <td className="py-2">DeepSeek R1 8B</td>
                      <td className="py-2">~16GB</td>
                      <td className="py-2">~6GB</td>
                      <td className="py-2">RTX 3060 (12GB)+</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2">DeepSeek R1 32B</td>
                      <td className="py-2">~64GB</td>
                      <td className="py-2">~20GB</td>
                      <td className="py-2">RTX 4090 (24GB) or H100</td>
                    </tr>
                    <tr>
                      <td className="py-2">DeepSeek R1 70B</td>
                      <td className="py-2">~140GB</td>
                      <td className="py-2">~42GB</td>
                      <td className="py-2">H100 (80GB) or 2x A100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
          </ContentEdge>
        </ContentRail>
      </main>
      <Footer />
    </>
  );
}
