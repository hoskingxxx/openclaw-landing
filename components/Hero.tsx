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
        <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 leading-tight">
          Run OpenClaw Locally
          <br />
          <span className="text-brand-primary">with DeepSeek R1</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto">
          The open-source agent framework. Automate tasks with $0 API cost using local LLMs.
        </p>

        {/* CTA Button Group */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-center items-center w-full sm:w-auto">
          <Button variant="primary" size="lg" href="/command-generator">
            ⚡ Open Command Generator
          </Button>
          <Button variant="secondary" size="lg" href="/blog/how-to-use-deepseek-with-openclaw">
            📖 Read DeepSeek Guide
          </Button>
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
