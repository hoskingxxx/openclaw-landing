import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CommandBuilder } from "@/components/CommandBuilder";
import { NextStepCard } from "@/components/NextSteps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Command Generator - Auto-generate Standard Command Templates",
  description: "Enter your goal, auto-generate OpenClaw standard command templates. Supports presets: Bug Fix, Data Processing, SEO Content Generation, one-click copy.",
  openGraph: {
    title: "OpenClaw Command Generator - Auto-generate Standard Command Templates",
    description: "Enter your goal, auto-generate OpenClaw standard command templates, one-click copy.",
    url: "https://openclaw-ai.org/command-builder",
  },
};

export default function CommandBuilderPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "Generator", href: "/command-builder" }]} />
        </div>

        {/* Command Builder Component */}
        <CommandBuilder />

        {/* Next Step */}
        <div className="mt-12">
          <NextStepCard
            icon="🎬"
            title="Watch Video Tutorials"
            description="See how other users use OpenClaw, each video comes with copyable commands."
            href="/videos"
            linkText="View Video Tutorials"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
