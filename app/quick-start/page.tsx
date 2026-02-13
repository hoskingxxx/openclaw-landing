import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { ContentRail } from "@/components/features/ContentRail";
import { ContentEdge } from "@/components/features/ContentEdge";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/Button";
import { Alert, AlertTitle } from "@/components/ui/Alert";
import { ContinueSafely } from "@/components/monetization/ContinueSafely";
import Link from "next/link";
import { FEATURED_POST_PATH } from "@/lib/blog";
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
        <ContentRail>
          <ContentEdge>

          {/* Header */}
          <div className="mb-12 border-b border-white/10 pb-8">
            <h1 className="heading-page-mono text-text-primary mb-4">
              Documentation
            </h1>
            <p className="text-xl text-text-secondary">
              Choose how you want to lose time.
            </p>
          </div>

          {/* Compatibility Matrix (What I Did NOT Test) */}
          <section className="mb-12">
            <Alert variant="warning" className="p-6">
              <h2 className="text-lg font-mono text-yellow-400 mb-4 flex items-center gap-2">
                <span>⚠️</span> Compatibility Matrix (What I Did NOT Test)
              </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-3 font-mono text-text-primary">Platform</th>
                    <th className="text-center py-2 px-3 font-mono text-text-primary">Status</th>
                    <th className="text-left py-2 px-3 font-mono text-text-primary">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3">Ubuntu 22.04 + NVIDIA GPU</td>
                    <td className="text-center py-2 px-3"><span className="text-green-400 font-mono">✓ TESTED</span></td>
                    <td className="py-2 px-3 text-text-tertiary text-xs">RTX 3070 Ti (8GB), DeepSeek R1 8B via Ollama</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3">macOS (Apple Silicon)</td>
                    <td className="text-center py-2 px-3"><span className="text-green-400 font-mono">✓ TESTED</span></td>
                    <td className="py-2 px-3 text-text-tertiary text-xs">M1/M2, DeepSeek API via openai provider</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3">Windows (WSL2)</td>
                    <td className="text-center py-2 px-3"><span className="text-red-400 font-mono">✗ BROKEN</span></td>
                    <td className="py-2 px-3 text-text-tertiary text-xs">CUDA passthrough issues. Do NOT report bugs. <span className="text-xs">(Symptom: <code className="font-mono">nvidia-smi</code> works, but Docker sees 0 GPUs)</span></td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-2 px-3">Docker</td>
                    <td className="text-center py-2 px-3"><span className="text-yellow-400 font-mono">? UNTESTED</span></td>
                    <td className="py-2 px-3 text-text-tertiary text-xs">GPU pass-through is your problem.</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3">Node.js &lt; 22</td>
                    <td className="text-center py-2 px-3"><span className="text-red-400 font-mono">✗ UNSUPPORTED</span></td>
                    <td className="py-2 px-3 text-text-tertiary text-xs">ESM modules require Node 22+. Will crash on import.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-tertiary mt-4">
              <strong>If your setup is not listed here:</strong> Proceed at your own risk. Do NOT report bugs for untested configurations.
            </p>
            </Alert>
          </section>

          {/* Decision Matrix (Reality Check) */}
          <section className="mb-16 bg-white/5 rounded-lg p-6 border border-white/10">
            <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
              <span>⚖️</span> Reality Check
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-green-400 font-mono text-sm mb-2">PATH A: CLOUD API</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>Setup time: 5 mins</li>
                  <li>Hardware: Any laptop</li>
                  <li>Cost: ~$1-5/mo (Usage based)</li>
                  <li>Stability: Operationally boring, until rate limits hit</li>
                </ul>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                <h3 className="text-orange-400 font-mono text-sm mb-2">PATH B: LOCAL HARDWARE</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li>Setup time: 1-4 hours</li>
                  <li>Hardware: 16GB+ RAM / GPU</li>
                  <li>Cost: Electricity + Sanity</li>
                  <li>Stability: Experimental</li>
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

            {/* Value Proposition */}
            <Alert variant="success" className="mb-8">
              <p className="text-sm text-green-200">
                <strong>💡 Why I switched:</strong> I tried Path B first and wasted a whole weekend fighting drivers. This costs billable hourly rates, which is cheaper than my hourly rate for debugging CUDA errors.
              </p>
            </Alert>

            <div className="space-y-8 border-l-2 border-green-500/20 pl-6 ml-2">
              {/* Step 0: Node.js Prerequisite */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">0. Install Node.js (NVM Required)</h3>
                <p className="text-sm text-text-secondary mb-3">
                  <strong className="text-red-400">WARNING:</strong> If <code className="text-text-tertiary">node -v</code> returns &lt; 22, STOP. You are wasting your time.
                  <span className="text-text-tertiary text-xs ml-2">(Expect: <code className="font-mono">Error [ERR_REQUIRE_ESM]</code> if you ignore this)</span>
                </p>
                <CodeBlock code={`# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# Reload your shell
source ~/.bashrc  # or: source ~/.zshrc

# Install Node.js 22 (LTS)
nvm install 22
nvm use 22`} />
                <p className="text-xs text-text-tertiary mt-2">
                  Do NOT use <code className="text-text-tertiary">sudo apt install nodejs</code>. That installs ancient versions.
                </p>
              </div>

              {/* Step 1 */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-text-primary mb-2">1. Install OpenClaw</h3>
                <CodeBlock code="npm install -g openclaw@latest" />
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">2. Get DeepSeek Key</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Sign up at <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline font-medium">platform.deepseek.com</a>.
                </p>
                <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                  <p className="text-xs text-blue-200">
                    <strong>💡 Pro Tip:</strong> DeepSeek R1 via API costs ~$1-5/mo for casual use. No VRAM drama.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">3. Configure .env</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Create <code>.env</code> in the root directory where you run <code>openclaw start</code>.
                </p>
                <CodeBlock
                  title=".env"
                  code={`# DeepSeek R1 via OpenAI-compatible API (RECOMMENDED)
# Get your key at: https://platform.deepseek.com
LLM_PROVIDER="openai"
LLM_BASE_URL="https://api.deepseek.com"
LLM_API_KEY="sk-your-key-here"
LLM_MODEL="deepseek-reasoner"`}
                />
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <p className="text-xs text-yellow-200">
                    <strong>⚠️ Rate Limit Reality:</strong> Expect 429 errors or region latency during peak hours (9AM-11AM Beijing time). This is not a bug, it's the reality of DeepSeek.
                    <span className="text-text-tertiary text-xs block mt-1">(Log: <code className="font-mono">HTTP 429 "x-ratelimit-remaining: 0"</code>)</span>
                  </p>
                  <p className="text-xs text-text-tertiary mt-2">
                    Hitting limits? Read the <a href="/guides/how-to-use-deepseek-with-openclaw" className="text-blue-400 underline hover:text-blue-300">DeepSeek Configuration Guide</a>.
                  </p>
                </div>
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
              <p className="text-xs text-text-tertiary mt-2">
                Crashed already? Check the <a href="/guides/fix-openclaw-cuda-oom-errors" className="text-blue-400 underline hover:text-blue-300">CUDA OOM Fix</a> or <a href="/guides/fix-openclaw-json-mode-errors" className="text-blue-400 underline hover:text-blue-300">JSON Parsing Fix</a>.
              </p>
            </div>

            {/* The Reality of Path B (Targeted Crash Log) */}
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="text-sm font-mono text-red-400 mb-3">The Reality of Path B:</h4>
              <p className="text-sm text-text-secondary mb-3">
                I started here. I thought my RTX 3090 (24GB) was enough. It wasn't.
              </p>
              <p className="text-sm text-text-secondary mb-3">
                Here is the log from my first run:
              </p>
              <div className="bg-terminal-bg rounded p-3 mb-3">
                <pre className="text-xs text-red-300 font-mono overflow-x-auto">
                  <code>[2026-02-01 14:24:43] ERROR: CUDA out of memory. Tried to allocate 128.00 MiB
(GPU 0; 23.99 GiB total capacity; 23.10 GiB already allocated; 0 bytes free)</code>
                </pre>
              </div>
              <p className="text-sm text-red-200 font-semibold">
                If you choose this path, you are choosing to debug physics.
              </p>
              <p className="text-xs text-text-tertiary mt-3">
                Stuck on Path B? Read the <Link href="/troubleshooting" className="text-brand-primary hover:text-brand-hover underline">Real OOM Crash Logs →</Link>
              </p>
            </div>

            {/* VRAM Budget Table */}
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="text-sm font-mono text-red-400 mb-3">VRAM Budget Table (Do The Math):</h4>
              <p className="text-xs text-text-tertiary mb-3 italic">
                *Measured on: RTX 3070 Ti (8GB), Context=2048, Model=R1-Distill-8B*
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-text-secondary">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 px-2 font-mono text-text-primary">Component</th>
                      <th className="text-right py-2 px-2 font-mono text-text-primary">VRAM Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-2">DeepSeek R1 8B Model</td>
                      <td className="text-right py-2 px-2 font-mono text-red-300">~4.7 GB</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-2">KV Cache (at 2k ctx)</td>
                      <td className="text-right py-2 px-2 font-mono text-red-300">~1.5 GB</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-2 px-2">System overhead</td>
                      <td className="text-right py-2 px-2 font-mono text-red-300">~1.0 GB</td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="py-2 px-2 font-bold text-text-primary">Total (Minimum)</td>
                      <td className="text-right py-2 px-2 font-mono font-bold text-red-400">~7.2 GB</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="py-3 px-2 text-text-tertiary text-xs" colSpan={2}>
                        <strong className="text-yellow-400">8GB GPU Reality:</strong> You have &lt; 1GB left for reasoning tokens.
                        Set <code className="text-text-tertiary">OLLAMA_NUM_CTX=2048</code> or die.
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <p className="text-xs text-text-tertiary mt-3">
                Think 16GB means 16GB? Read the <Link href="/oom" className="text-brand-primary hover:text-brand-hover underline">Hardware Reality Check →</Link>
              </p>
            </div>

            {/* Shortcut to Sanity (Conversion CTA) */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
              <div className="relative">
                <h4 className="text-lg font-mono text-blue-300 mb-2 flex items-center gap-2">
                  <span>⚡</span> Shortcut to Sanity
                </h4>
                <p className="text-sm text-text-secondary mb-4">
                  Wasted 4 hours and still OOM? The pro choice is <strong>Path A</strong>. Rent the metal and start shipping.
                </p>
                <Button variant="info" size="md" href="#cloud" className="font-mono">
                  <span>→</span> Switch to Cloud API (DeepSeek)
                </Button>
              </div>
            </div>

            {/* Pre-flight Check (Suicide Prevention) */}
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <h4 className="text-sm font-mono text-red-400 mb-3">🛑 Self-Destruct Checklist:</h4>
              <div className="space-y-3 text-sm text-text-secondary">
                <p><strong>Step 1:</strong> Verify you actually have a GPU:</p>
                <CodeBlock code="nvidia-smi
# If this fails, you CANNOT use local LLMs. Use PATH A (Cloud API)." />

                <p><strong>Step 2:</strong> Check VRAM budget:</p>
                <CodeBlock code="# Look for: Memory-Total in nvidia-smi output
# 8GB GPU  → Will OOM with anything beyond num_ctx:2048
# 12GB GPU → Might survive num_ctx:4096
# 16GB+    → You're probably fine" />

                <p className="text-xs text-text-tertiary mt-2">
                  <strong>If you ignored this checklist:</strong> Don't report bugs when your system freezes. You were warned.
                </p>
              </div>
            </div>

            <div className="space-y-8 border-l-2 border-orange-500/20 pl-6 ml-2">
              {/* Step 1 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">1. Install Ollama & Pull Model</h3>
                <CodeBlock code={`# Install Ollama (Mac/Linux)
curl -fsSL https://ollama.com/install.sh | sh

# SAFE MODE: Pull with reduced context (prevents OOM)
OLLAMA_NUM_CTX=2048 ollama run deepseek-r1:8b

# If that works, try 4096:
OLLAMA_NUM_CTX=4096 ollama run deepseek-r1:8b`} />
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded">
                  <p className="text-xs text-red-200">
                    <strong>⚠️ 8GB Blood Oath:</strong> 8B model ≠ 8GB VRAM. With long context, you WILL OOM. Always use <code className="text-text-tertiary">OLLAMA_NUM_CTX</code> to limit context window.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">2. Configure OpenClaw</h3>
                <p className="text-sm text-text-secondary mb-3">
                  Create <code>.env</code> in the <strong>current working directory (CWD)</strong> where you run <code>openclaw start</code>.
                </p>
                <CodeBlock
                  title=".env"
                  code={`LLM_PROVIDER="ollama"
LLM_BASE_URL="http://localhost:11434/v1"
LLM_MODEL="deepseek-r1:8b"`}
                />
                <div className="mt-3 p-3 bg-background-tertiary/50 rounded-lg border border-white/10">
                  <p className="text-xs font-mono text-text-tertiary mb-2">
                    <strong>CWD Reality Check:</strong> The .env file MUST be where you run the command.
                  </p>
                  <pre className="text-xs text-text-tertiary font-mono">
{`your-project/
├── .env              ← PUT IT HERE (NOT in ~)
├── node_modules/
└── package.json

# Terminal:
cd your-project/
openclaw start        ← .env is read from HERE`}
                  </pre>
                </div>
                <div className="mt-3 p-3 bg-background-tertiary/50 rounded-lg border border-white/10">
                  <p className="text-xs text-text-tertiary">
                    <strong>Fail-Fast Tip:</strong> If it freezes on first run, do NOT retry. Lower your context window immediately. Set <code>num_ctx: 2048</code> and test again.
                  </p>
                </div>
              </div>

               {/* Step 3 */}
               <div>
                <h3 className="text-lg font-medium text-text-primary mb-2">3. Launch</h3>
                <CodeBlock code="openclaw start" />
              </div>
            </div>
          </section>

          {/* Survival Status Check */}
          <section className="mb-20 p-6 bg-white/5 rounded-lg border border-white/10">
            <h3 className="text-lg font-mono text-text-primary mb-4">🛑 Survival Status Check:</h3>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>[ ] Ran <code>nvidia-smi</code> and verified available VRAM?</li>
              <li>[ ] <code>.env</code> file exists in current folder?</li>
              <li>[ ] Using <code>deepseek-reasoner</code> for R1?</li>
              <li>[ ] Checked <Link href="/oom" className="text-brand-primary hover:underline">OOM solutions</Link>?</li>
              <li>[ ] Set <code>OLLAMA_NUM_CTX=2048</code> before trying larger contexts?</li>
            </ul>
            <p className="text-xs text-text-tertiary mt-4">
              <strong>If you survived all of these and still see crashes:</strong> THEN you can report a bug. Bring logs.
            </p>
          </section>

          {/* Final CTA */}
          <div className="glass-card p-8 text-center mt-12">
             <h3 className="text-xl font-bold text-text-primary mb-2">System Crashed?</h3>
             <p className="text-text-secondary mb-6">Read the crash logs. Don't touch the settings if it works.</p>
             <Button href={FEATURED_POST_PATH} variant="secondary">
               Debug Crash Logs →
             </Button>
          </div>

          {/* Continue Safely - Unified CTA */}
          <ContinueSafely />

          </ContentEdge>
        </ContentRail>
      </main>
      <Footer />
    </>
  );
}
