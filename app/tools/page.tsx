import { Navigation } from "@/components/features/Navigation"
import { Footer } from "@/components/features/Footer"
import { Breadcrumbs } from "@/components/features/Breadcrumbs"
import { ContentRail } from "@/components/features/ContentRail"
import { ContentEdge } from "@/components/features/ContentEdge"
import Link from "next/link"
import { Calculator, Cloud, Settings, ArrowRight } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tools - OpenClaw Hub",
  description: "Free tools for DeepSeek R1 and OpenClaw. VRAM calculator, hardware requirements, and more.",
  keywords: ["OpenClaw tools", "VRAM calculator", "DeepSeek R1 tools"],
  openGraph: {
    title: "Tools - OpenClaw Hub",
    description: "Free tools for DeepSeek R1 and OpenClaw. VRAM calculator, hardware requirements, and more.",
    url: "https://openclaw-ai.org/tools",
    type: "website",
  },
}

const tools = [
  {
    title: "R1 Pre-flight Check",
    description: "Check your VRAM headroom before installing DeepSeek R1. Accounts for OS/IDE overhead - physics-based calculator.",
    href: "/preflight",
    icon: Calculator,
    color: "brand-primary",
    badge: "Free",
  },
  {
    title: "Recommended Setup",
    description: "Recommended configuration settings for optimal DeepSeek R1 performance.",
    href: "/tools/recommended-setup",
    icon: Settings,
    color: "purple",
    badge: "Config",
  },
]

export default function ToolsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background">
        <ContentRail>
          <ContentEdge>
            <div className="py-16 px-4">
              {/* Breadcrumb */}
              <div className="mb-8">
                <Breadcrumbs items={[
                  { label: "Tools", href: "/tools" }
                ]} />
              </div>

              {/* Header */}
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
                  Tools
                </h1>
                <p className="text-xl text-text-secondary">
                  Free utilities for DeepSeek R1 and OpenClaw
                </p>
              </div>

              {/* Tools Grid */}
              <div className="max-w-4xl mx-auto">
                <div className="grid gap-6 md:grid-cols-2">
                  {tools.map((tool) => {
                    const Icon = tool.icon
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="group block p-6 rounded-xl border border-border bg-card hover:border-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/10 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-${tool.color}/10 text-${tool.color} group-hover:bg-${tool.color}/20 transition-colors`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-primary transition-colors">
                                {tool.title}
                              </h3>
                              {tool.badge && (
                                <span className="text-xs px-2 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium">
                                  {tool.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-text-secondary mb-4">
                              {tool.description}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-brand-primary group-hover:gap-2 transition-all">
                              <span>Open tool</span>
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* More Coming Soon */}
              <div className="max-w-3xl mx-auto mt-16">
                <div className="glass-card p-6 border border-dashed border-border/50 text-center">
                  <p className="text-sm text-text-tertiary">
                    More tools coming soon...
                  </p>
                </div>
              </div>
            </div>
          </ContentEdge>
        </ContentRail>
      </main>
      <Footer />
    </>
  )
}
