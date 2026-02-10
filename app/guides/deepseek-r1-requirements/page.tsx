import { Navigation } from "@/components/features/Navigation"
import { Footer } from "@/components/features/Footer"
import { ContentRail } from "@/components/features/ContentRail"
import { ContentEdge } from "@/components/features/ContentEdge"
import Link from "next/link"
import { R1PreflightCheck } from "@/components/tools/vram-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DeepSeek R1 Hardware Requirements: VRAM Calculator & Real-World Specs",
  description: "Most guides omit OS/IDE overhead. Check your real VRAM headroom for DeepSeek R1 with our free physics-based calculator.",
  keywords: ["DeepSeek R1 requirements", "VRAM calculator", "hardware requirements", "DeepSeek R1 VRAM"],
  openGraph: {
    title: "DeepSeek R1 Hardware Requirements: VRAM Calculator & Real-World Specs",
    description: "Most guides omit OS/IDE overhead. Check your real VRAM headroom for DeepSeek R1 with our free physics-based calculator.",
    url: "https://openclaw-ai.org/guides/deepseek-r1-requirements",
    type: "article",
  },
}

export default function DeepSeekR1RequirementsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <ContentRail>
          <ContentEdge>
            <article className="py-16 px-4">
              {/* Breadcrumb */}
              <div className="mb-8">
                <Link href="/" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
                  ← Back Home
                </Link>
              </div>

              {/* Header */}
              <div className="max-w-3xl mx-auto mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                  DeepSeek R1 Hardware Requirements
                </h1>
                <p className="text-xl text-text-secondary mb-6">
                  Most guides show theoretical model size only. This guide accounts for the <strong>invisible overhead</strong> that causes most OOM crashes.
                </p>
                <div className="inline-block px-4 py-2 bg-brand-primary/10 border border-brand-primary/30 rounded-lg">
                  <p className="text-sm font-mono text-brand-primary">
                    Free • Physics-based • No signup required
                  </p>
                </div>
              </div>

              {/* Calculator Embed - Prominent */}
              <div className="max-w-4xl mx-auto mb-16">
                <div className="glass-card p-6 border border-border">
                  <h2 className="text-2xl font-bold text-text-primary mb-2 text-center">
                    R1 Pre-flight Check
                  </h2>
                  <p className="text-sm text-text-secondary text-center mb-6">
                    Check your real VRAM headroom (OS + IDE overhead included)
                  </p>
                  <R1PreflightCheck />
                </div>
              </div>

              {/* What This Checks */}
              <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  The Invisible Overhead
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  Most VRAM calculators only show model size at 4-bit quantization. They ignore the reality that your GPU is never 100% available for the model. Here's what actually consumes VRAM:
                </p>
                <div className="space-y-4">
                  <div className="glass-card p-4 border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Operating System</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>Windows 11:</strong> ~2-4GB for desktop composition, DWM, and system processes<br/>
                      <strong>macOS:</strong> ~1.5-3GB for window server and graphics pipeline
                    </p>
                  </div>
                  <div className="glass-card p-4 border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Development Environment</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>VS Code / JetBrains:</strong> ~500MB-2GB depending on extensions and GPU acceleration features
                    </p>
                  </div>
                  <div className="glass-card p-4 border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Browser & Applications</h3>
                    <p className="text-sm text-text-secondary">
                      <strong>Chrome/Edge:</strong> ~300-800MB per tab with hardware acceleration<br/>
                      <strong>Other apps:</strong> Discord, Spotify, and other GPU-accelerated software
                    </p>
                  </div>
                  <div className="glass-card p-4 border border-border">
                    <h3 className="font-semibold text-text-primary mb-2">Agent Context Growth</h3>
                    <p className="text-sm text-text-secondary">
                      KV cache that expands with usage. A 10k token context can add 2-4GB of VRAM during active inference.
                    </p>
                  </div>
                </div>
              </div>

              {/* Model Size Reference */}
              <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  DeepSeek R1 Model Sizes (4-bit Quantization)
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">Model</th>
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">Parameters</th>
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">VRAM Required</th>
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">Recommended GPU</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">DeepSeek-R1-Distill-Qwen-1.5B</td>
                        <td className="py-3 px-4 text-text-secondary">1.5B</td>
                        <td className="py-3 px-4 text-text-secondary">~2 GB</td>
                        <td className="py-3 px-4 text-text-secondary">4GB+</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">DeepSeek-R1-Distill-Llama-8B</td>
                        <td className="py-3 px-4 text-text-secondary">8B</td>
                        <td className="py-3 px-4 text-text-secondary">~6 GB</td>
                        <td className="py-3 px-4 text-text-secondary">8GB+</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">DeepSeek-R1-Distill-Llama-14B</td>
                        <td className="py-3 px-4 text-text-secondary">14B</td>
                        <td className="py-3 px-4 text-text-secondary">~10 GB</td>
                        <td className="py-3 px-4 text-text-secondary">12GB+</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">DeepSeek-R1-Distill-Qwen-32B</td>
                        <td className="py-3 px-4 text-text-secondary">32B</td>
                        <td className="py-3 px-4 text-text-secondary">~20 GB</td>
                        <td className="py-3 px-4 text-text-secondary">24GB+</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">DeepSeek-R1-Distill-Llama-70B</td>
                        <td className="py-3 px-4 text-text-secondary">70B</td>
                        <td className="py-3 px-4 text-text-secondary">~42 GB</td>
                        <td className="py-3 px-4 text-text-secondary">48GB+</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary">DeepSeek-V3 (671B Full)</td>
                        <td className="py-3 px-4 text-text-secondary">671B</td>
                        <td className="py-3 px-4 text-text-secondary">~300 GB</td>
                        <td className="py-3 px-4 text-text-secondary">Multi-GPU / Cloud</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-text-tertiary mt-4">
                  * VRAM requirements shown are for 4-bit quantization only. Actual usage varies by context size and KV cache.
                </p>
              </div>

              {/* Understanding Results */}
              <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  Understanding Your Results
                </h2>
                <div className="space-y-4">
                  <div className="glass-card p-4 border-l-4 border-red-500 bg-red-950/10">
                    <h3 className="font-semibold text-red-400 mb-2">RED (Local Setup Not Viable)</h3>
                    <p className="text-sm text-text-secondary">
                      Physics limit reached. Your VRAM will cause instability or OOM loops. Consider cloud GPU options for reliable inference.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-l-4 border-yellow-500 bg-yellow-950/10">
                    <h3 className="font-semibold text-yellow-400 mb-2">YELLOW (High Risk Zone)</h3>
                    <p className="text-sm text-text-secondary">
                      You're on the razor's edge. Browser tabs or IDE plugins will crash you. Close unnecessary applications before running inference.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-l-4 border-green-500 bg-green-950/10">
                    <h3 className="font-semibold text-green-400 mb-2">GREEN (Ready with caveats)</h3>
                    <p className="text-sm text-text-secondary">
                      Hardware looks good. Bookmark this page for updated boundaries as models grow. Monitor VRAM usage during long sessions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Guides */}
              <div className="max-w-3xl mx-auto">
                <div className="glass-card p-6 border border-border">
                  <h3 className="text-sm font-mono text-text-tertiary mb-4">Related Guides</h3>
                  <div className="space-y-3 text-sm">
                    <Link href="/guides/fix-openclaw-cuda-oom-errors" className="block text-brand-primary hover:text-brand-hover underline">
                      → Fix OpenClaw CUDA OOM Errors
                    </Link>
                    <Link href="/guides/hardware-requirements-reality-check" className="block text-brand-primary hover:text-brand-hover underline">
                      → Hardware Requirements Reality Check
                    </Link>
                    <Link href="/guides/openclaw-error-index" className="block text-brand-primary hover:text-brand-hover underline">
                      → OpenClaw Error Index
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </ContentEdge>
        </ContentRail>
      </main>
      <Footer />
    </>
  )
}
