import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { NextStepCard } from "@/components/NextSteps";
import { useCases } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Use Cases - 6 Practical Applications",
  description: "From indie developers to founders, DevOps to content creation. AI Programmer, Automation Ops, SEO Content Generation, Data Analysis and more with copyable command templates.",
  openGraph: {
    title: "OpenClaw Use Cases - 6 Practical Applications",
    description: "From indie developers to founders, 6 practical use cases with copyable command templates.",
    url: "https://openclaw-ai.org/use-cases",
  },
};

// TOC data
const tocItems = useCases.map((uc) => ({
  id: uc.id,
  label: uc.title,
}));

export default function UseCasesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "Use Cases", href: "/use-cases" }]} />
        </div>

        {/* Page Title */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            6 Practical Use Cases
          </h1>
          <p className="text-xl text-text-secondary">
            From indie developers to founders, from DevOps to content creation, there's one for you
          </p>
        </section>

        {/* Use Cases List */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="space-y-8">
            {useCases.map((useCase, index) => (
              <div
                key={useCase.id}
                id={useCase.id}
                className="glass-card p-8 scroll-mt-24"
              >
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="text-6xl flex-shrink-0">{useCase.icon}</div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h2 className="text-2xl font-bold text-text-primary">{useCase.title}</h2>
                      {useCase.popular && (
                        <span className="px-3 py-1 text-sm font-medium bg-brand-primary/20 text-brand-primary rounded">
                          🔥 Popular
                        </span>
                      )}
                      {useCase.advanced && (
                        <span className="px-3 py-1 text-sm font-medium bg-background-elevated text-text-tertiary rounded">
                          Advanced
                        </span>
                      )}
                    </div>

                    <p className="text-text-secondary mb-4">{useCase.description}</p>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-text-primary mb-2">For:</h4>
                      <div className="flex flex-wrap gap-2">
                        {useCase.audience.map((audience) => (
                          <span
                            key={audience}
                            className="px-3 py-1 text-sm bg-background-tertiary text-text-secondary rounded"
                          >
                            {audience}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-text-primary mb-2">Example Command:</h4>
                      <CodeBlock code={useCase.exampleCommand} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Next Step */}
        <NextStepCard
          icon="🎯"
          title="Generate Your First Command"
          description="Use the Command Generator to automatically create OpenClaw standard command templates based on your needs."
          href="/command-builder"
          linkText="Open Command Generator"
        />
      </main>
      <Footer />
    </>
  );
}
