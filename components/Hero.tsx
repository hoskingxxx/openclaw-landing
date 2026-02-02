import { Button } from "./ui/Button";

export function Hero() {
  return (
    <section className="hero-container relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-muted/20 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="hero-content relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-muted/30 border border-brand-primary/30 mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-sm text-text-primary">Open Source AI Agent Framework</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
          OpenClaw is powerful.
          <br />
          <span className="text-brand-primary">It's also annoying.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
          DeepSeek R1 runs locally. But probably not on your laptop. This site documents what actually broke so you don't burn your weekend.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-center items-center w-full sm:w-auto">
          <Button variant="primary" size="lg" href="/blog/how-to-use-deepseek-with-openclaw">
            Read the DeepSeek R1 Guide
          </Button>
          <Button variant="secondary" size="lg" href="#hardware-reality">
            View the OOM Error Log
          </Button>
        </div>

        {/* Installation Code Block */}
        <div className="mt-12 max-w-2xl mx-auto">
          {/* Context Tag */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-mono text-text-tertiary bg-background-tertiary px-2 py-1 rounded">
              System: RTX 3070 Ti (8GB) | Model: DeepSeek R1 Distill
            </span>
          </div>

          <div className="bg-[#0d1117] rounded-lg overflow-hidden border border-red-500/30 shadow-xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-400 font-mono">terminal</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-red-300 font-mono leading-relaxed">
{`user@dev-machine:~/openclaw$ openclaw start --model deepseek-r1:67b
[2026-02-01 23:42:15] INFO: Initializing Gateway...
[2026-02-01 23:42:16] INFO: Loading Model [deepseek-r1:67b] via Ollama...
[2026-02-01 23:42:19] WARN: VRAM usage spike detected (15.8GB / 16.0GB)
Traceback (most recent call last):
  File "core/engine.py", line 402, in load_model
    torch.cuda.OutOfMemoryError: CUDA out of memory. Tried to allocate 2.40 GiB (GPU 0; 8.00 GiB total capacity; 6.42 GiB already allocated; 102.00 MiB free)
[System Halted] Agent crashed.`}
              </code>
            </pre>
          </div>
          <p className="text-xs text-text-tertiary mt-3 font-mono">
            Log captured from a standard RTX 3070 setup running R1. <Link href="/blog/how-to-use-deepseek-with-openclaw" className="text-brand-primary hover:text-brand-hover underline">Read the fix →</Link>
          </p>
        </div>

        {/* Core Features Preview - Hidden for now */}
        {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="glass-card p-4 rounded-lg">
            <div className="text-brand-primary text-2xl mb-2">⚡</div>
            <h4 className="text-text-primary font-semibold mb-1">Local Execution</h4>
            <p className="text-sm text-text-secondary">Deploy on your own hardware, private and secure</p>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="text-brand-primary text-2xl mb-2">🎯</div>
            <h4 className="text-text-primary font-semibold mb-1">Goal-Driven</h4>
            <p className="text-sm text-text-secondary">Give work requirements, it breaks down and executes</p>
          </div>
          <div className="glass-card p-4 rounded-lg">
            <div className="text-brand-primary text-2xl mb-2">🔌</div>
            <h4 className="text-text-primary font-semibold mb-1">Multi-Platform</h4>
            <p className="text-sm text-text-secondary">WhatsApp, Telegram, Slack, Discord and more</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
