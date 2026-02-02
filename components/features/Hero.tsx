import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="hero-container relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-muted/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="hero-content relative z-10 max-w-4xl mx-auto text-center px-4">
        {/* Badge: Unofficial Community Docs */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-text-tertiary font-mono break-words">
            <span className="mr-2">🦞</span> Unofficial Community Docs
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 leading-tight break-words">
          The OpenClaw<br />Survival Guide
        </h1>

        {/* Viral Slogan */}
        <div className="mb-8 p-4 bg-brand-primary/10 border border-brand-primary/30 rounded-lg max-w-2xl mx-auto">
          <p className="text-base md:text-lg lg:text-xl font-mono text-brand-primary font-bold break-words">
            "If your model crashes silently, it's not a bug. It's physics."
          </p>
        </div>

        {/* Subtitle / Lead Text */}
        <p className="text-base md:text-lg lg:text-xl text-text-secondary mb-10 max-w-3xl mx-auto leading-relaxed break-words">
          Battle-tested guides for running DeepSeek R1 locally.<br />
          <span className="text-text-tertiary">Real crash logs. Real fixes. No hype.</span><br />
          <span className="text-text-tertiary">Written by developers who broke their hardware so you don't have to.</span>
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center items-center w-full sm:w-auto mb-12">
          <Button variant="primary" size="lg" href="/docs" className="text-base px-8 py-4">
            Start Setup (Survivor Mode) →
          </Button>
          <Button variant="secondary" size="lg" href="/troubleshooting" className="text-base px-8 py-4">
            Read the OOM Logs
          </Button>
        </div>

        {/* Crash Log Preview */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-terminal-bg rounded-lg overflow-hidden border border-red-500/30 shadow-xl opacity-60 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-400 font-mono">crash.log</span>
            </div>
            <pre className="p-4 overflow-x-auto text-xs sm:text-sm">
              <code className="text-red-300 font-mono leading-relaxed break-all">
{`[2026-02-01 14:24:43] ERROR: CUDA out of memory. Tried to allocate 128.00 MiB
  (GPU 0; 23.99 GiB total capacity; 23.10 GiB already allocated; 0 bytes free)
  PyTorch attempted to reserve residual memory but failed due to fragmentation.
[System Halted] Agent crashed during reasoning chain.`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-text-tertiary mt-3 font-mono break-words">
            RTX 3090 attempting 32B model. <Link href="/troubleshooting" className="text-brand-primary hover:text-brand-hover underline">See why it crashed →</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
