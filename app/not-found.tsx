import Link from "next/link";
import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";

const VULTR_LINK = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=404&utm_campaign=error_page";

export default function NotFoundPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          {/* 404 Graphic */}
          <div className="text-8xl md:text-9xl font-bold text-red-500 mb-6 font-mono">404</div>

          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 font-mono">
            You ventured too deep.
          </h1>

          {/* Description */}
          <p className="text-lg text-text-secondary mb-8">
            This page crashed (or never existed).<br />
            <span className="text-text-tertiary">That's what happens when you ignore compatibility matrix.</span>
          </p>

          {/* Crash Log Style Box */}
          <div className="bg-terminal-bg rounded-lg overflow-hidden border border-red-500/30 mb-8">
            <div className="flex items-center gap-2 px-4 py-3 bg-terminal-header border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-xs text-gray-400 font-mono">error.log</span>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="text-sm text-red-300 font-mono leading-relaxed">
{`[2026-02-02] ERROR: Page not found
  at /not-found (line 404)
[WARN] This route was tested on Ubuntu 22.04 / RTX 3090 24GB
[FATAL] Your journey ends here. Return to safety.`}
              </code>
            </pre>
          </div>

          {/* Return Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={VULTR_LINK}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="px-8 py-4 text-lg font-bold text-white rounded-lg border-2 border-green-400 bg-green-600 hover:bg-green-500 font-mono"
            >
              Launch Cloud Sandbox ($5/mo) →
            </a>
            <Link
              href="/guides"
              className="px-8 py-4 text-lg font-bold text-text-primary border-2 border-brand-primary bg-transparent hover:bg-brand-primary/10 font-mono"
            >
              Browse Guides →
            </Link>
          </div>

          {/* Survival Tip */}
          <p className="text-xs text-text-tertiary font-mono mt-8">
            💡 Pro tip: Bookmark main pages. You'll need them after your next OOM.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
