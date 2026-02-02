import Link from "next/link";
import { NextStepCard } from "@/components/NextSteps";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        {/* 404 Graphic */}
        <div className="text-8xl md:text-9xl font-bold text-brand-primary mb-6">404</div>

        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: "Page Not Found", href: "/404" }]} />

        {/* Main Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          Oops, Page Not Found
        </h1>

        {/* Description */}
        <p className="text-lg text-text-secondary mb-8">
          You've stumbled into the OpenClaw digital void.
          <br />
          Don't worry, let me help you find your way back.
        </p>

        {/* Search Suggestions */}
        <div className="glass-card p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold text-text-primary mb-4">You can try:</h3>
          <ul className="space-y-3 text-text-secondary">
            <li className="flex items-center gap-3">
              <span className="text-brand-primary">•</span>
              <span>Check if the URL is spelled correctly</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-primary">•</span>
              <span>Use the navigation to explore our content</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-brand-primary">•</span>
              <span>Check the <Link href="/blog" className="text-brand-primary hover:underline">Guides</Link> or <Link href="/faq" className="text-brand-primary hover:underline">FAQ</Link></span>
            </li>
          </ul>
        </div>

        {/* Return Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background-tertiary hover:bg-background-elevated text-text-primary font-medium rounded-lg border border-white/10 transition-colors"
          >
            <span className="text-xl">📖</span>
            View Guides
          </Link>
        </div>
      </div>

      {/* Next Step */}
      <div className="mt-16">
        <NextStepCard
          icon="🎯"
          title="Start with Quick Start Guide"
          description="If you're new here, check out our quick start guide to deploy OpenClaw in 5 minutes."
          href="/quick-start"
          linkText="View Quick Start Guide"
        />
      </div>
    </div>
  );
}
