import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { VideoWithNotes } from "@/components/VideoWithNotes";
import { NextStepCard } from "@/components/NextSteps";
import { videoTutorials } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Video Tutorials - Command Walkthroughs & Notes",
  description: "Curated collection of the best OpenClaw tutorials with exclusive command extraction notes. Learn by watching, with copyable commands and configs for each video.",
  openGraph: {
    title: "OpenClaw Video Tutorials - Command Walkthroughs & Notes",
    description: "Curated collection of the best OpenClaw tutorials with exclusive command extraction notes.",
    url: "https://openclaw-ai.org/videos",
  },
};

export default function VideosPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "Videos", href: "/videos" }]} />
        </div>

        {/* Page Title */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Video Tutorials
          </h1>
          <p className="text-xl text-text-secondary">
            Learn by watching, each video comes with copyable commands and configs
          </p>
        </section>

        {/* Video List */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-1 gap-8">
            {videoTutorials.map((video) => (
              <VideoWithNotes key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* Next Step */}
        <NextStepCard
          icon="🎯"
          title="Try What You Just Learned"
          description="Use the Command Generator to enter your goals and auto-generate OpenClaw standard command templates."
          href="/command-builder"
          linkText="Open Command Generator"
        />
      </main>
      <Footer />
    </>
  );
}
