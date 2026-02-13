import type { Metadata } from "next";
import { SoftwareStructuredData, WebSiteStructuredData } from "@/components/SEO/StructuredData";
import { SiteSchema } from "@/components/SEO/SiteSchema";
import NextTopLoader from "nextjs-toploader";
import { UmamiAnalytics } from "@/components/UmamiAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://openclaw-ai.org"),
  title: "Running DeepSeek R1 Locally: The Unofficial OpenClaw Guide",

  // Icons
  icons: {
    icon: "/icon",
    shortcut: "/icon",
    apple: "/apple-icon",
  },

  // Manifest
  manifest: "/manifest.webmanifest",
  description: "Stop debugging DeepSeek R1 crashes. This battle-tested OpenClaw guide explains CUDA OOM errors, VRAM limits, and the fastest fixes that actually work.",
  keywords: [
    "OpenClaw",
    "DeepSeek R1",
    "DeepSeek R1 crash",
    "CUDA OOM",
    "OpenClaw OOM",
    "VRAM requirements",
    "Ollama crash",
    "torch.cuda.OutOfMemoryError",
    "MPS out of memory",
    "AI Agent",
    "Local AI Agent",
    "DeepSeek R1 Local",
    "VRAM Requirements",
    "OpenClaw Config",
    "Ollama",
    "Claude",
    "ChatGPT",
    "Local AI",
    "AI Automation",
    "Private AI",
    "Local inference",
  ].join(", "),
  authors: [{ name: "LazyDev" }],
  creator: "OpenClaw Hub",
  publisher: "OpenClaw Hub",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://openclaw-ai.org",
    title: "Running DeepSeek R1 Locally: The Unofficial OpenClaw Guide",
    description: "Stop debugging DeepSeek R1 crashes. This battle-tested OpenClaw guide explains CUDA OOM errors, VRAM limits, and the fastest fixes that actually work.",
    siteName: "OpenClaw Hub",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OpenClaw Hub",
      },
    ],
  },

  // Twitter Card
  // Note: title and description removed to allow per-page overrides
  twitter: {
    card: "summary_large_image",
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification
  verification: {
    google: "lnGWnIBkynUpLCvSTBaQo1UJC_tBWsGTlrZKZOzMkUM",
  },

  // Other verification tags
  other: {
    "impact-site-verification": "2f0e85b6-bb5c-46ca-81f2-11cb12e06541",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Structured Data */}
        <SiteSchema />
        <WebSiteStructuredData />
        <SoftwareStructuredData />

        {/* Umami Analytics - with internal traffic filtering */}
        <UmamiAnalytics />
      </head>
      <body className="font-sans antialiased">
        <NextTopLoader color="#FF4500" showSpinner={false} speed={200} />
        {children}
      </body>
    </html>
  );
}
