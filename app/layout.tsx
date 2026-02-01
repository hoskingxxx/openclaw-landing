import type { Metadata } from "next";
import { FAQStructuredData, SoftwareStructuredData, WebSiteStructuredData } from "@/components/SEO/StructuredData";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://openclaw-ai.org"),
  title: "Run DeepSeek R1 Locally with OpenClaw - The Ultimate AI Agent Guide",
  description: "Zero-cost AI Employee setup. Comprehensive guide for OpenClaw configuration, DeepSeek R1 integration, and command generation. The best alternative to Devin.",
  keywords: [
    "OpenClaw",
    "Clawdbot",
    "Moltbot",
    "AI Agent",
    "Local AI Agent",
    "AI Employee",
    "DeepSeek R1",
    "Ollama",
    "Claude",
    "ChatGPT",
    "Local AI",
    "AI Automation",
    "Lane-based queue",
    "WhatsApp AI",
    "Telegram AI",
    "Slack AI",
    "AI Programmer",
    "Devin alternative",
    "AI Software Engineer",
    "Zero cost AI",
  ].join(", "),
  authors: [{ name: "OpenClaw Community" }],
  creator: "OpenClaw Community",
  publisher: "OpenClaw Community",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://openclaw-ai.org",
    title: "Run DeepSeek R1 Locally with OpenClaw - The Ultimate AI Agent Guide",
    description: "Zero-cost AI Employee setup. Comprehensive guide for OpenClaw configuration, DeepSeek R1 integration, and command generation. The best alternative to Devin.",
    siteName: "OpenClaw Resource Site",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw Resource Site",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Run DeepSeek R1 Locally with OpenClaw - The Ultimate AI Agent Guide",
    description: "Zero-cost AI Employee setup. Comprehensive guide for OpenClaw configuration, DeepSeek R1 integration, and command generation. The best alternative to Devin.",
    images: ["/og-image.png"],
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
        <WebSiteStructuredData />
        <SoftwareStructuredData />
        <FAQStructuredData />

        {/* Microsoft Clarity Analytics - Uncomment and replace PROJECT_ID when going live */}
        {/*
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "YOUR_PROJECT_ID");
            `,
          }}
        />
        */}
      </head>
      <body className="font-sans antialiased">
        <NextTopLoader
          color="#FF4500"
          showSpinner={false}
          speed={200}
        />
        {children}
      </body>
    </html>
  );
}
