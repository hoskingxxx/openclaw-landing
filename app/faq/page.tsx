import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Breadcrumbs } from "@/components/features/Breadcrumbs";
import { NextStepCard } from "@/components/features/NextSteps";
import { faqs } from "@/lib/content";
import { FEATURED_POST_PATH } from "@/lib/blog";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw FAQ - Installation, Configuration & Usage",
  description: "Common questions about OpenClaw installation, configuration, model selection, and platform integration. Includes quick command templates and use case reference.",
  openGraph: {
    title: "OpenClaw FAQ - Installation, Configuration & Usage",
    description: "Common questions about OpenClaw installation, configuration, model selection, and platform integration.",
    url: "https://openclaw-ai.org/faq",
  },
};

// TOC data
const tocItems = faqs.map((cat) => ({
  id: cat.category.replace(/\s+/g, "-").toLowerCase(),
  label: cat.category,
}));

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "FAQ", href: "/faq" }]} />
        </div>

        {/* Page Title */}
        <section className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-secondary mb-2">
            Answers to common questions about OpenClaw
          </p>
          <p className="text-sm text-text-tertiary">
            Formerly known as Clawdbot / Moltbot —— you may have seen these names elsewhere
          </p>
        </section>

        {/* FAQ List */}
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <div className="space-y-8">
            {faqs.map((category) => (
              <div
                key={category.category}
                id={category.category.replace(/\s+/g, "-").toLowerCase()}
                className="scroll-mt-24"
              >
                <h2 className="text-2xl font-bold text-text-primary mb-6">
                  {category.category}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <details
                      key={index}
                      className="group glass-card"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors">
                        <h3 className="text-lg font-medium text-text-primary pr-4">
                          {item.q}
                        </h3>
                        <svg
                          className="w-5 h-5 text-text-secondary flex-shrink-0 group-open:rotate-180 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6">
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-text-secondary whitespace-pre-line">{item.a}</p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Step */}
        <NextStepCard
          icon="📖"
          title="Read the DeepSeek R1 Guide"
          description="Learn how to deploy OpenClaw with DeepSeek R1 locally without running into OOM errors."
          href={FEATURED_POST_PATH}
          linkText="Read the Guide"
        />
      </main>
      <Footer />
    </>
  );
}
