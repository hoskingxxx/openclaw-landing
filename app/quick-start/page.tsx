import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents, MobileTableOfContents } from "@/components/TableOfContents";
import { NextStepCard } from "@/components/NextSteps";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { installSteps, supportedChannels, supportedModels } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Setup Guide - The Honest Version",
  description: "How to actually deploy OpenClaw without crashing. Hardware requirements, configuration steps, and troubleshooting OOM errors.",
  openGraph: {
    title: "OpenClaw Setup Guide - The Honest Version",
    description: "How to actually deploy OpenClaw without crashing.",
    url: "https://openclaw-ai.org/quick-start",
  },
};

// Table of Contents data
const tocItems = [
  { id: "requirements", label: "Requirements" },
  { id: "install", label: "Installation" },
  { id: "models", label: "Model Configuration" },
  { id: "platforms", label: "Supported Platforms" },
];

export default function QuickStartPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "Quick Start", href: "/quick-start" }]} />
        </div>

        {/* Page Title */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Quick Start
          </h1>
          <p className="text-xl text-text-secondary">
            Deploy Your AI Employee in 5 Minutes
          </p>

          {/* Mobile TOC */}
          <MobileTableOfContents items={tocItems} />
        </section>

        {/* Content + Sidebar */}
        <div className="max-w-7xl mx-auto px-6 pb-12 lg:flex lg:gap-12">
          <div className="lg:flex-1 min-w-0">
            {/* Requirements */}
            <section id="requirements" className="mb-12 scroll-mt-24">
              <div className="glass-card p-6">
                <h2 className="text-2xl font-semibold text-text-primary mb-4">System Requirements</h2>
                <ul className="space-y-2 text-text-secondary">
                  <li>✅ macOS / Linux / Windows (WSL2 strongly recommended)</li>
                  <li>✅ Node.js ≥22</li>
                  <li>✅ An LLM API Key (Anthropic or OpenAI)</li>
                </ul>
              </div>
            </section>

            {/* Installation Steps */}
            <section id="install" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">Installation Steps</h2>
              <div className="space-y-6">
                {installSteps.map((step, index) => (
                  <div key={index} className="glass-card p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                        <p className="text-sm text-text-secondary">{step.description}</p>
                      </div>
                    </div>
                    <CodeBlock code={Object.values(step.commands).join("\n\n")} />
                  </div>
                ))}
              </div>
            </section>

            {/* Model Configuration */}
            <section id="models" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">Model Configuration</h2>
              <div className="glass-card p-6">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-primary/20 text-brand-primary rounded text-sm font-medium mb-2">
                    Recommended
                  </span>
                  <p className="text-text-primary font-semibold">
                    {supportedModels.recommended.provider} - {supportedModels.recommended.models.join(", ")}
                  </p>
                  <p className="text-sm text-text-secondary mt-1">{supportedModels.recommended.reason}</p>
                </div>
                <div className="space-y-3 mt-6">
                  {supportedModels.providers.map((provider, index) => (
                    <div key={index} className="border-t border-white/10 pt-3">
                      <p className="text-text-primary font-medium">{provider.name}</p>
                      <p className="text-sm text-text-secondary">Auth: {provider.auth}</p>
                      <p className="text-sm text-text-secondary">Models: {provider.models}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Supported Platforms */}
            <section id="platforms" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">Supported Platforms</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-4">
                  <h3 className="text-text-primary font-medium mb-2">Mainstream</h3>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    {supportedChannels.mainstream.map((channel) => (
                      <li key={channel}>• {channel}</li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-text-primary font-medium mb-2">Extended</h3>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    {supportedChannels.extended.map((channel) => (
                      <li key={channel}>• {channel}</li>
                    ))}
                  </ul>
                </div>
                <div className="glass-card p-4">
                  <h3 className="text-text-primary font-medium mb-2">Voice</h3>
                  <ul className="space-y-1 text-sm text-text-secondary">
                    {supportedChannels.voice.map((channel) => (
                      <li key={channel}>• {channel}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar TOC */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>

        {/* Next Step */}
        <NextStepCard
          icon="🎬"
          title="Watch Video Tutorials"
          description="Learn OpenClaw through videos, each with copyable commands."
          href="/videos"
          linkText="View Video Tutorials"
        />
      </main>
      <Footer />
    </>
  );
}
