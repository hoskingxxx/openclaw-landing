import { Navigation } from "@/components/features/Navigation"
import { Footer } from "@/components/features/Footer"
import { Breadcrumbs } from "@/components/features/Breadcrumbs"
import { ContentRail } from "@/components/features/ContentRail"
import { ContentEdge } from "@/components/features/ContentEdge"
import Link from "next/link"
import { R1PreflightCheck } from "@/components/tools/vram-calculator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "R1 Pre-flight Check - VRAM Calculator for DeepSeek R1",
  description: "Stop guessing. Check your VRAM headroom (OS + IDE overhead) before installing DeepSeek R1. Free physics-based calculator.",
  keywords: ["R1 pre-flight check", "DeepSeek R1 VRAM", "VRAM calculator", "hardware requirements"],
  openGraph: {
    title: "R1 Pre-flight Check - VRAM Calculator for DeepSeek R1",
    description: "Stop guessing. Check your VRAM headroom (OS + IDE overhead) before installing DeepSeek R1. Free physics-based calculator.",
    url: "https://openclaw-ai.org/preflight",
    type: "website",
  },
}

export default function PreflightPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <ContentRail>
          <ContentEdge>
            <div className="pt-8 pb-4">
              {/* Breadcrumb */}
              <Breadcrumbs items={[
                { label: "Tools", href: "/tools" },
                { label: "Pre-flight Check", href: "/preflight" }
              ]} />

              {/* Title Section */}
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                  R1 Pre-flight Check
                </h1>
                <p className="text-xl text-text-secondary mb-4">
                  Stop guessing. Check your VRAM headroom (OS + IDE overhead) before installing.
                </p>
                <div className="inline-block px-4 py-2 bg-brand-primary/10 border border-brand-primary/30 rounded-lg">
                  <p className="text-sm font-mono text-brand-primary">
                    ✓ Free • Physics-based • No signup required
                  </p>
                </div>
              </div>

              {/* Calculator */}
              <div className="max-w-4xl mx-auto">
                <R1PreflightCheck />
              </div>

              {/* Explanation */}
              <div className="max-w-3xl mx-auto mt-12">
                <div className="glass-card p-6 border border-border">
                  <h2 className="text-xl font-bold text-text-primary mb-4">
                    What This Checks
                  </h2>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    Most VRAM calculators show theoretical model size only. This tool accounts for the <strong>invisible overhead</strong> that breaks most local setups:
                  </p>
                  <ul className="text-sm text-text-secondary space-y-2 ml-4">
                    <li>• <strong>OS overhead</strong> (Windows 11: ~2-4GB, macOS: ~1.5-3GB)</li>
                    <li>• <strong>IDE overhead</strong> (VS Code / JetBrains: ~500MB-2GB depending on extensions)</li>
                    <li>• <strong>Browser tabs</strong> (Chrome/Edge: ~300-800MB each)</li>
                    <li>• <strong>Agent context growth</strong> (KV cache that expands with usage)</li>
                  </ul>
                  <p className="text-sm text-text-secondary leading-relaxed mt-4">
                    The tool calculates <strong>actual available VRAM</strong> after subtracting these overheads, then compares against model requirements at 4-bit quantization.
                  </p>
                </div>
              </div>

              {/* Next Steps */}
              <div className="max-w-3xl mx-auto mt-8">
                <div className="glass-card p-6 border border-border">
                  <h2 className="text-xl font-bold text-text-primary mb-4">
                    Understanding Your Results
                  </h2>
                  <div className="space-y-4 text-sm text-text-secondary">
                    <p><span className="text-red-400 font-semibold">RED (Local Setup Not Viable):</span> Physics limit reached. Your VRAM will cause instability or OOM loops. Consider cloud GPU or the Survival Kit for decision boundaries.</p>
                    <p><span className="text-yellow-400 font-semibold">YELLOW (High Risk Zone):</span> You're on the razor's edge. Browser tabs or IDE plugins will crash you. The Survival Kit provides stop rules and red lines.</p>
                    <p><span className="text-green-400 font-semibold">GREEN (Ready with caveats):</span> Hardware looks good, but bookmark this page for updated boundaries as models grow.</p>
                  </div>
                </div>
              </div>

              {/* Internal Links */}
              <div className="max-w-3xl mx-auto mt-8">
                <div className="glass-card p-6 border border-border">
                  <h3 className="text-sm font-mono text-text-tertiary mb-3">Explore</h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <Link href="/guides/hardware-requirements-reality-check" className="text-brand-primary hover:text-brand-hover underline">
                      → Hardware Requirements Reality
                    </Link>
                    <Link href="/guides/fix-openclaw-cuda-oom-errors" className="text-brand-primary hover:text-brand-hover underline">
                      → OOM Error Fixes
                    </Link>
                    <Link href="/guides/openclaw-error-index" className="text-brand-primary hover:text-brand-hover underline">
                      → Error Index
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ContentEdge>
        </ContentRail>
      </main>
      <Footer />
    </>
  );
}
