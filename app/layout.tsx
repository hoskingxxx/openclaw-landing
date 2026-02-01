import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FAQStructuredData, SoftwareStructuredData, WebSiteStructuredData } from "@/components/SEO/StructuredData";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openclaw-ai.org"),
  title: "OpenClaw (Clawdbot) - 支持 DeepSeek 的本地 AI 员工",
  description: "不是聊天机器人，而是你的 AI 员工。你给目标，它负责拆解、执行、汇报。本地部署、隐私安全、支持 DeepSeek R1 / Ollama / Claude / GPT，支持 WhatsApp/Telegram/Slack 等 13+ 平台。",
  keywords: [
    "OpenClaw",
    "Clawdbot",
    "Moltbot",
    "AI Agent",
    "Local AI Agent",
    "AI 助手",
    "AI 员工",
    "DeepSeek R1",
    "Ollama",
    "Claude",
    "ChatGPT",
    "本地 AI",
    "AI 自动化",
    "Lane-based queue",
    "车道队列架构",
    "WhatsApp AI",
    "Telegram AI",
    "Slack AI",
    "AI 程序员",
    "AI 运维",
  ].join(", "),
  authors: [{ name: "OpenClaw 中文社区" }],
  creator: "OpenClaw 中文社区",
  publisher: "OpenClaw 中文社区",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://openclaw-ai.org",
    title: "OpenClaw 中文资源站 - 你的 AI 员工",
    description: "不是聊天机器人，而是你的 AI 员工。你给目标，它负责拆解、执行、汇报。",
    siteName: "OpenClaw 中文资源站",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenClaw 中文资源站",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw 中文资源站 - 你的 AI 员工",
    description: "不是聊天机器人，而是你的 AI 员工。你给目标，它负责拆解、执行、汇报。",
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

  // Verification（需要时添加）
  // verification: {
  //   google: "your-google-verification-code",
  //   bing: "your-bing-verification-code",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 结构化数据 */}
        <WebSiteStructuredData />
        <SoftwareStructuredData />
        <FAQStructuredData />

        {/* Microsoft Clarity 热力图埋点 - 上线时取消注释并替换 PROJECT_ID */}
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
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
