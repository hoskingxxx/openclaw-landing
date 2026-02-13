import { Navigation } from "@/components/features/Navigation"
import { Footer } from "@/components/features/Footer"
import { Breadcrumbs } from "@/components/features/Breadcrumbs"
import { ContentRail } from "@/components/features/ContentRail"
import { ContentEdge } from "@/components/features/ContentEdge"
import Link from "next/link"
import type { Metadata } from "next"
import { AlertTriangle, ArrowRight, CheckCircle, XCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Clawdbot is Dead: Migrate from Deprecated Clawdbot to OpenClaw",
  description: "Clawdbot tutorials reference deprecated npm packages that break on modern Windows. Learn how to migrate to current OpenClaw with working commands.",
  keywords: ["Clawdbot deprecated", "OpenClaw migration", "Clawdbot alternative", "OpenClaw Survival Kit"],
  openGraph: {
    title: "Clawdbot is Dead: Migrate from Deprecated Clawdbot to OpenClaw",
    description: "Clawdbot tutorials reference deprecated npm packages that break on modern Windows. Learn how to migrate to current OpenClaw with working commands.",
    url: "https://openclaw-ai.org/guides/clawdbot-migration",
    type: "article",
  },
}

export default function ClawdbotMigrationPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <ContentRail>
          <ContentEdge>
            <article className="py-16 px-4">
              {/* Breadcrumb */}
              <div className="mb-8">
                <Breadcrumbs items={[
                  { label: "Guides", href: "/guides" },
                  { label: "Clawdbot Migration", href: "/guides/clawdbot-migration" }
                ]} />
              </div>

              {/* Header */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/30 border border-red-800/50 rounded-full mb-4">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-400">Deprecation Notice</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
                  Clawdbot is a Dead End
                </h1>
                <p className="text-xl text-text-secondary mb-6">
                  Most Clawdbot tutorials reference <strong>deprecated npm packages</strong> that break on modern Windows. Here's the migration path to working OpenClaw.
                </p>
              </div>

              {/* The Problem */}
              <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  The Problem: Following Old Tutorials
                </h2>
                <div className="glass-card p-6 border border-red-900/30 bg-red-950/10 mb-6">
                  <p className="text-text-secondary leading-relaxed mb-4">
                    If you followed a Clawdbot tutorial and got errors like:
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary font-mono">
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                      <code>npm ERR! code ENOENT</code>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                      <code>spawn npm ENOENT</code>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                      <code>package.json not found</code>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                      <code>@mariozechner/clipboard-linux-arm-gnueabihf</code>
                    </li>
                  </ul>
                </div>
                <p className="text-text-secondary leading-relaxed">
                  These errors occur because Clawdbot references <strong>deprecated package structures</strong> that no longer exist in the OpenClaw ecosystem. The tutorials were written for an older version of the toolchain.
                </p>
              </div>

              {/* The Solution */}
              <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  The Solution: Current OpenClaw
                </h2>
                <p className="text-text-secondary leading-relaxed mb-6">
                  OpenClaw is actively maintained and tracks current package versions. The <strong>OpenClaw Survival Kit</strong> documents the working commands and package structures for modern systems.
                </p>

                <div className="space-y-4">
                  <div className="glass-card p-6 border border-border">
                    <h3 className="font-semibold text-text-primary mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      What You Get with OpenClaw
                    </h3>
                    <ul className="space-y-2 text-sm text-text-secondary">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Current npm packages that install without ENOENT errors</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Working Windows PowerShell scripts (run as Administrator)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>ARM-compatible clipboard modules for Apple Silicon</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Updated plugin metadata structure (openclaw.extensions)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>Current VRAM requirements for DeepSeek R1/V3 models</span>
                      </li>
                    </ul>
                  </div>

                  <div className="glass-card p-6 border border-border">
                    <h3 className="font-semibold text-text-primary mb-4">
                      Quick Migration Checklist
                    </h3>
                    <ol className="space-y-3 text-sm text-text-secondary">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-xs font-bold">1</span>
                        <span>Uninstall any old Clawdbot packages via <code className="bg-border px-1 rounded">npm uninstall -g clawdbot</code></span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-xs font-bold">2</span>
                        <span>Install OpenClaw from the official repository</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-xs font-bold">3</span>
                        <span>Verify your VRAM meets requirements (check below)</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center text-xs font-bold">4</span>
                        <span>Reference current error fixes from the Survival Kit</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>

              {/* Common Errors - Old vs New */}
              <div className="max-w-3xl mx-auto mb-12">
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  Common Errors: Clawdbot vs OpenClaw
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-text-primary font-semibold">Error</th>
                        <th className="text-left py-3 px-4 text-red-400 font-semibold">Clawdbot (Broken)</th>
                        <th className="text-left py-3 px-4 text-green-400 font-semibold">OpenClaw (Fixed)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary font-medium">npm ENOENT</td>
                        <td className="py-3 px-4 text-text-secondary">Dead links in install.ps1</td>
                        <td className="py-3 px-4 text-text-secondary">Current package registry</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary font-medium">spawn EINVAL</td>
                        <td className="py-3 px-4 text-text-secondary">No Admin rights fix</td>
                        <td className="py-3 px-4 text-text-secondary">Run PowerShell as Admin</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary font-medium">clipboard module</td>
                        <td className="py-3 px-4 text-text-secondary">ARM package missing</td>
                        <td className="py-3 px-4 text-text-secondary">Compatible with ARM64</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="py-3 px-4 text-text-secondary font-medium">plugin metadata</td>
                        <td className="py-3 px-4 text-text-secondary">package.json errors</td>
                        <td className="py-3 px-4 text-text-secondary">openclaw.extensions format</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Survival Kit CTA */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="glass-card p-6 border border-amber-900/30">
                  <h3 className="text-xl font-bold text-text-primary mb-4">
                    The OpenClaw Survival Kit
                  </h3>
                  <p className="text-text-secondary leading-relaxed mb-6">
                    The Survival Kit tracks the <strong>current reality</strong> of OpenClaw installation and troubleshooting. Unlike old Clawdbot tutorials, it's updated weekly with working commands, current error fixes, and decision boundaries for hardware limits.
                  </p>
                  <ul className="space-y-2 text-sm text-text-secondary mb-6">
                    <li>• Current installation commands (Windows, macOS, Linux)</li>
                    <li>• Updated error fixes with verified solutions</li>
                    <li>• Stop rules and red lines for VRAM limits</li>
                    <li>• Decision boundaries: API vs Local vs Cloud GPU</li>
                  </ul>
                  <a
                    href="https://hilda666888.gumroad.com/l/ymwwgm"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Get Survival Kit
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Related Guides */}
              <div className="max-w-3xl mx-auto">
                <div className="glass-card p-6 border border-border">
                  <h3 className="text-sm font-mono text-text-tertiary mb-4">Related Fixes</h3>
                  <div className="space-y-3 text-sm">
                    <Link href="/guides/fix-openclaw-install-ps1-npm-enoent-windows" className="block text-brand-primary hover:text-brand-hover underline">
                      → Fix install.ps1 npm ENOENT (Windows)
                    </Link>
                    <Link href="/guides/fix-openclaw-spawn-npm-enoent" className="block text-brand-primary hover:text-brand-hover underline">
                      → Fix spawn npm ENOENT (All Platforms)
                    </Link>
                    <Link href="/guides/fix-openclaw-package-json-missing-openclaw-extensions" className="block text-brand-primary hover:text-brand-hover underline">
                      → Fix plugin metadata errors
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
