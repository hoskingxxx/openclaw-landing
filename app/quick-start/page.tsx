import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Documentation - OpenClaw Survivor Guide",
  description: "Two paths to running OpenClaw: The stable Cloud API route, or the experimental Local Hardware route.",
};

export default function QuickStartPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background-primary">
        <div className="max-w-3xl mx-auto px-6 py-12">

          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-8">
            <h1 className="text-4xl font-bold text-text-primary mb-4 font-mono">
              Documentation
            </h1>
            <p className="text-xl text-text-secondary">
              Choose your pain level.
            </p>
          </div>

          {/* Decision Matrix (Reality Check) */}
          <section className="mb-16 bg-white/5 rounded-lg p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span>⚖️</span> Reality Check
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-green-400 font-mono text-sm mb-2">PATH A: CLOUD API</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>✅ Setup time: 5 mins</li>
                  <li>✅ Hardware: Any laptop</li>
                  <li>✅ Cost: ~$1-5/mo (Usage based)</li>
                  <li>✅ Stability: Production Ready</li>
                </ul>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <h3 className="text-orange-400 font-mono text-sm mb-2">PATH B: LOCAL HARDWARE</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>⚠️ Setup time: 1-4 hours</li>
                  <li>⚠️ Hardware: 16GB+ RAM / GPU</li>
                  <li>⚠️ Cost: Electricity + Sanity</li>
                  <li>⚠️ Stability: Experimental</li>
                </ul>
              </div>
            </div>
          </section>

          {/* PATH A */}
          <section id="cloud" className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-xs font-mono font-bold">RECOMMENDED</span>
              <h2 className="text-2xl font-bold text-text-primary">Path A: The "Just Work" Method</h2>
            </div>

            <div className="space-y-8 border-l-2 border-green-500/20 pl-6 ml-2">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">1. Install OpenClaw</h3>
                <p className="text-sm text-text-secondary mb-3">Requires Node.js 22+</p>
                <CodeBlock code="npm install -g openclaw@latest" />
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">2. Get DeepSeek Key</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Sign up at <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-brand-primary underline">platform.deepseek.com</a>.
                </p>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">3. Configure .env</h3>
                <p className="text-sm text-text-secondary mb-3">Create a file named <code>.env</code> in your folder.</p>
                <CodeBlock
                  title=".env"
                  code={`# Use OpenAI provider because DeepSeek is compatible
LLM_PROVIDER="openai"
LLM_BASE_URL="https://api.deepseek.com"
LLM_API_KEY="sk-your-key-here"
LLM_MODEL="deepseek-reasoner"`}
                />
              </div>

              {/* Step 4 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">4. Launch</h3>
                <CodeBlock code="openclaw start" />
              </div>
            </div>
          </section>

          {/* PATH B */}
          <section id="local" className="mb-20 pt-8 border-t border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-orange-500/20 text-orange-400 px-3 py-1 rounded text-xs font-mono font-bold">HARDWARE REQUIRED</span>
              <h2 className="text-2xl font-bold text-text-primary">Path B: Local (Ollama)</h2>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 mb-8">
              <p className="text-sm text-orange-200">
                <strong>⚠️ Warning:</strong> If you have less than 16GB RAM, turn back now. Your system will freeze.
              </p>
            </div>

            <div className="space-y-8 border-l-2 border-orange-500/20 pl-6 ml-2">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">1. Install Ollama & Pull Model</h3>
                <CodeBlock code={`# Install Ollama (Mac/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# Pull the 8B model (Fits in 8GB VRAM)
ollama run deepseek-r1:8b`} />
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">2. Configure OpenClaw</h3>
                <p className="text-sm text-text-secondary mb-3">Point it to your local Ollama server.</p>
                <CodeBlock
                  title=".env"
                  code={`LLM_PROVIDER="ollama"
LLM_BASE_URL="http://localhost:11434/v1"
LLM_MODEL="deepseek-r1:8b"`}
                />
              </div>

               {/* Step 3 */}
               <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">3. Launch</h3>
                <CodeBlock code="openclaw start" />
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="glass-card p-8 text-center mt-12">
             <h3 className="text-xl font-bold text-text-primary mb-2">Stuck?</h3>
             <p className="text-text-secondary mb-6">Read the full guide for common OOM fixes.</p>
             <Button href="/guides/how-to-use-deepseek-with-openclaw" variant="secondary">
               Go to Survival Guide →
             </Button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
