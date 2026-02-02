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

        {/* Quick Start: DeepSeek Configuration */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Quick Start: DeepSeek Configuration
            </h2>
            <p className="text-text-secondary text-sm">
              Copy this to your <code className="bg-gray-800 px-2 py-1 rounded text-text-tertiary">.env</code> file
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-gray-400 font-mono">.env</span>
            </div>
            <pre className="p-4 md:p-6 overflow-x-auto">
              <code className="text-sm md:text-base text-gray-100 font-mono leading-relaxed">
{`# .env configuration for OpenClaw
LLM_PROVIDER="openai"
LLM_BASE_URL="https://api.deepseek.com/v1"
LLM_API_KEY="sk-your-key"
LLM_MODEL="deepseek-reasoner" # Requires API key OR local GPU`}
              </code>
            </pre>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Execution AI vs Chat AI
            </h2>
            <p className="text-text-secondary text-lg mb-2">
              OpenClaw executes tasks, ChatGPT answers questions
            </p>
            <p className="text-sm text-text-tertiary">
              Open-source AI Agent framework focused on stable task execution
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full glass-card">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-text-primary">Use Case</th>
                  <th className="text-left p-4 text-text-secondary">ChatGPT</th>
                  <th className="text-left p-4 text-brand-primary">OpenClaw</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.rows.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-text-primary">{row.feature}</td>
                    <td className="p-4 text-text-secondary">{row.chatgpt}</td>
                    <td className="p-4 text-text-primary font-medium">{row.openclaw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

        {/* Use Cases Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              6 Practical Use Cases
            </h2>
            <p className="text-text-secondary text-lg">
              From indie developers to founders, from DevOps to content creation, there's one for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.id}
                className="glass-card p-6 hover:bg-white/12 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                {useCase.popular && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-brand-primary/20 text-brand-primary rounded mb-3">
                    🔥 Popular
                  </span>
                )}
                {useCase.advanced && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-background-elevated text-text-tertiary rounded mb-3">
                    Advanced
                  </span>
                )}
                <h3 className="text-xl font-semibold text-text-primary mb-2">{useCase.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{useCase.description}</p>
                <div className="text-xs text-text-tertiary mb-3">
                  For: {useCase.audience.join(", ")}
                </div>
                <CodeBlock title="Example Command" code={useCase.exampleCommand} />
              </div>
            ))}
          </div>
        </section>

        {/* Quick Start Section */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Quick Start
            </h2>
            <p className="text-text-secondary text-lg">
              Install and configure OpenClaw in 3 steps
            </p>
          </div>

          <div className="space-y-6">
            {installSteps.map((step, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                    <p className="text-sm text-text-secondary">{step.description}</p>
                  </div>
                </div>
                <CodeBlock code={Object.values(step.commands).join("\n")} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/quick-start"
              className="inline-block text-brand-primary hover:text-brand-hover transition-colors"
            >
              View Full Installation Guide →
            </Link>
          </div>
        </section>

        {/* Universal Command Template Section */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Universal Command Template
            </h2>
            <p className="text-text-secondary text-lg">
              The secret to skyrocketing OpenClaw success rates
            </p>
          </div>

          <div className="glass-card p-8">
            <CodeBlock code={universalCommandTemplate} />
            <p className="text-sm text-text-tertiary mt-4">
              💡 This will significantly boost OpenClaw success rates. Copy and send to OpenClaw to execute.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/command-builder"
              className="inline-block px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg transition-colors"
            >
              Use Command Generator →
            </Link>
          </div>
        </section>

        {/* Next Step Recommendation */}
        <section className="max-w-4xl mx-auto px-6">
          <NextStepCard
            icon="🚀"
            title="Start Your OpenClaw Journey"
            description="Check the quick start guide, deploy in 5 minutes and get started."
            href="/quick-start"
            linkText="View Quick Start Guide"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
