/**
 * SiteLevelSchema - Organization Entity for Knowledge Graph
 *
 * Purpose: Establish "OpenClaw Survival Guide" as a recognized entity
 * in Google's Knowledge Graph through structured data.
 *
 * SEO Strategy: Entity > Keywords
 */

export function SiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OpenClaw Survival Guide",
    url: "https://openclaw-ai.org",
    logo: {
      "@type": "ImageObject",
      url: "https://openclaw-ai.org/icon.png",
      caption: "OpenClaw Survival Guide Logo",
    },
    description:
      "Community documentation and survival guides for OpenClaw AI agent framework. Battle-tested fixes for DeepSeek R1, CUDA OOM errors, and local AI inference.",
    sameAs: [
      "https://github.com/openclaw/openclaw", // Official OpenClaw Project
      "https://buymeacoffee.com/openclaw",    // Our Monetization
    ],
    foundingDate: "2025",
    keywords:
      "OpenClaw, DeepSeek R1, AI Agent, Local LLM, CUDA OOM, VRAM requirements",
    audience: {
      "@type": "Audience",
      audienceType: "Developers, AI Engineers, Technical Users",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
