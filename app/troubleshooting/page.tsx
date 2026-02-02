import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Troubleshooting - OpenClaw Crash Fixes",
  description: "Real crash logs and tested fixes. CUDA OOM, system hangs, connection issues.",
  openGraph: {
    title: "Troubleshooting - OpenClaw Crash Fixes",
    description: "Real crash logs and tested fixes.",
    url: "https://openclaw-ai.org/troubleshooting",
  },
};

const crashFixes = [
  {
    title: "CUDA OOM Errors",
    description: "VRAM ran out. Model loaded but crashed during reasoning.",
    severity: "critical",
    href: "/oom",
    icon: "💥",
    symptoms: [
      "torch.cuda.OutOfMemoryError",
      "System freezes during model load",
      "Crashes after ~6k tokens (24GB GPU)",
    ],
  },
  {
    title: "Low VRAM Trap (<12GB)",
    description: "You tried to run a model that doesn't fit. This is a hardware limit.",
    severity: "critical",
    href: "#low-vram",
    icon: "🪤",
    symptoms: [
      "RTX 3060 / 8GB VRAM trying to run 32B+ models",
      "Instant OOM on model load",
      "System hangs when context grows",
    ],
    isTrap: true,
    fix: null,
  },
  {
    title: "System Hangs / Kernel Swap",
    description: "RAM exhausted. System becomes unresponsive.",
    severity: "high",
    href: "/oom",
    icon: "🐌",
    symptoms: [
      "top shows ollama at 100% CPU",
      "Everything slows to crawl",
      "Force reboot required",
    ],
  },
  {
    title: "Connection Refused (Ollama)",
    description: "OpenClaw can't reach Ollama daemon.",
    severity: "medium",
    href: "#connection-refused",
    icon: "🔌",
    symptoms: [
      "Failed to connect to localhost:11434",
      "ollama serve not running",
      "Wrong base URL in .env",
    ],
    fix: `# Fix: Check Ollama is running
ollama serve

# Fix: Verify .env base URL
LLM_BASE_URL="http://localhost:11434/v1"

# Fix: Test connection
curl http://localhost:11434/api/tags`,
  },
  {
    title: "Model Too Slow (Mac)",
    description: "M2 Mac works but 3.2 tokens/sec is painful.",
    severity: "low",
    href: "/oom",
    icon: "🐢",
    symptoms: [
      "Response takes 40+ seconds",
      "Technically works, practically unusable",
      "Agent workflows take forever",
    ],
  },
];

export default function TroubleshootingPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-16">

          {/* Breadcrumb */}
          <div className="mb-8">
            <Link href="/docs" className="text-sm text-text-tertiary hover:text-text-primary transition-colors">
              ← Back to Start
            </Link>
          </div>

          {/* Hero */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Troubleshooting & Known Crashes
            </h1>
            <p className="text-xl text-text-secondary">
              Real crash logs. Tested fixes. No theory.
            </p>
          </div>

          {/* Disclaimer */}
          <div className="mb-12 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
            <p className="text-sm text-yellow-200">
              <strong>⚠️ These are real crashes from actual testing.</strong> Your results may vary depending on hardware, drivers, and OpenClaw version.
            </p>
          </div>

          {/* Crash Fixes List */}
          <div className="space-y-6 mb-16">
            {crashFixes.map((fix) => (
              <div
                key={fix.href}
                className={`glass-card p-6 border-l-4 hover:bg-white/5 transition-colors ${
                  fix.isTrap ? "border-l-red-500 bg-red-500/5" : "border-l-brand-primary"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{fix.icon}</span>
                      <h3 className="text-xl font-semibold text-text-primary">{fix.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                        fix.severity === "critical" ? "bg-red-500/20 text-red-400" :
                        fix.severity === "high" ? "bg-orange-500/20 text-orange-400" :
                        fix.severity === "medium" ? "bg-yellow-500/20 text-yellow-400" :
                        "bg-blue-500/20 text-blue-400"
                      }`}>
                        {fix.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-text-secondary mb-4">{fix.description}</p>

                    <div className="mb-4">
                      <p className="text-sm text-text-tertiary mb-2">Symptoms:</p>
                      <ul className="space-y-1">
                        {fix.symptoms.map((symptom, i) => (
                          <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                            <span className="text-brand-primary">•</span>
                            <code className="text-text-tertiary">{symptom}</code>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {fix.fix && (
                      <div className="bg-terminal-bg rounded p-4 mb-4">
                        <pre className="text-sm text-green-400 font-mono">
                          <code>{fix.fix}</code>
                        </pre>
                      </div>
                    )}

                    {/* THE TRAP - Affiliate CTA */}
                    {fix.isTrap && (
                      <div className="mt-6 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                        <h4 className="text-lg font-bold text-red-400 mb-3">💀 The Verdict: Hardware Limit</h4>
                        <p className="text-sm text-text-secondary mb-4">
                          <strong>This is a hardware limit.</strong> No config change, no quantization trick, no CPU offloading will fix this.<br />
                          You're debugging physics.
                        </p>
                        <div className="bg-terminal-bg rounded p-4 mb-4">
                          <pre className="text-sm text-green-400 font-mono">
                            <code>$0.80/hr (Cloud GPU) &lt; 4 hours of debugging (Your Rate)</code>
                          </pre>
                        </div>
                        <p className="text-sm text-text-secondary mb-4">
                          Renting a GPU isn't giving up—it's basic math. Stop debugging hardware and start shipping code.
                        </p>
                        <a
                          href="https://www.vultr.com/products/gpu/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-mono text-sm font-bold rounded-lg transition-colors"
                        >
                          Rent a GPU (~$0.50/hr) →
                        </a>
                      </div>
                    )}
                  </div>

                  {!fix.isTrap && (
                    <Button
                      href={fix.href}
                      variant="secondary"
                      className="shrink-0"
                    >
                      View Fix →
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA - Soft */}
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-bold text-text-primary mb-4">
              Still stuck? Read the full crash logs.
            </h3>
            <p className="text-text-secondary mb-6">
              The OOM page has detailed logs, "Things I tried" sections, and the math on VRAM budgets.
            </p>
            <Button href="/oom" variant="secondary">
              Read Full OOM Logs →
            </Button>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
