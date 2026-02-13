/**
 * Security Hero - "The Gate" (High-Security Funnel)
 * =====================================================
 * Compliant copy - no "detected" language.
 * Dark background, Monospace font, Red/Yellow/Green colors.
 */

"use client"

import Link from "next/link"
import { trackVultrOutbound } from "@/lib/tracking";
import { ContentRail } from "@/components/features/ContentRail"
import { ContentEdge } from "@/components/features/ContentEdge"

const LINK_VULTR = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=hero&utm_campaign=security_gate"

export function SecurityHero() {
  const handleVultrClick = () => {
    trackVultrOutbound({
      placement: "hero",
      slug: "",
      path: "/",
      intent: "start",
    })
  }

  return (
    <section className="relative flex items-center justify-center py-20 bg-black min-h-[80vh]">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>

      <ContentRail>
        <ContentEdge className="relative z-10 text-center">
        <div className="mb-10 inline-flex items-center px-6 py-2 rounded-full border-2 border-yellow-500 bg-yellow-500/20 font-bold text-yellow-400 font-mono">
          <span className="text-2xl">⚠️</span>
          <span>SYSTEM ADVISORY</span>
        </div>

        <h1 className="text-6xl font-bold mb-8 text-center text-red-400 font-mono leading-tight">
          Run OpenClaw safely. Avoid local root risk and OOM loops.
        </h1>

        <h2 className="text-2xl font-bold mb-6 text-center text-red-400 font-mono">
          Cloud sandbox isolates experiments and reduces setup churn.
        </h2>

        <div className="mb-10 max-w-3xl mx-auto space-y-4">
          <div className="bg-gray-900/80 border border-red-500/30 rounded-lg p-6">
            <div className="space-y-3 text-base md:text-lg text-gray-300 font-mono">
              <p className="flex items-start">
                <span className="text-red-400 mr-3">►</span>
                <span className="text-white">Local debugging often fails because:</span>
              </p>

              <div className="ml-6 space-y-2">
                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-white">VRAM limits:</span> <span className="text-green-400">Consumer cards with &lt;24GB cannot run R1</span>
                </p>

                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-white">OOM errors:</span> <span className="text-green-400">CUDA out of memory requires expensive hardware upgrades</span>
                </p>

                <p className="flex items-start">
                  <span className="text-red-400 mr-3">•</span>
                  <span className="text-white">Root access:</span> <span className="text-green-400">Agents need full system privileges</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-red-500/30">
                <p className="text-xl font-bold text-red-400">
                  RUN OPENCLAW SAFELY.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <PrimaryCTA variant="full" placement="hero" offer="primary" />
        </div>

        <div className="text-center">
          <Link
            href="#guides"
            className="text-sm font-mono text-gray-400 hover:text-gray-300 underline"
          >
            I accept the risk. Continue to local guides &darr;
          </Link>
        </div>
        </ContentEdge>
      </ContentRail>
    </section>
  )
}
