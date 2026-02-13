"use client"

import { useRef } from "react"
import { useRevenueOutbound, useCtaImpression } from "@/lib/use-tracking"

const VULTR_LINK = "https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=article_bottom&utm_campaign=continue_safely"
const GUMROAD_LINK = "https://hilda666888.gumroad.com/l/ymwwgm?utm_source=openclaw&utm_medium=article_bottom"

/**
 * Continue Safely - Unified bottom CTA for articles
 *
 * Primary: Cloud Sandbox (Vultr) - prominent button
 * Secondary: Survival Kit - muted text link only (no competing card)
 */
export function ContinueSafely() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track Cloud Sandbox clicks
  const handleVultrClick = useRevenueOutbound({
    dest: "vultr",
    offer: "cloud_gpu",
    placement: "bottom",
  })

  // Track Survival Kit clicks
  const handleKitClick = useRevenueOutbound({
    dest: "gumroad",
    offer: "survival_kit",
    placement: "bottom",
  })

  // Track impressions
  useCtaImpression(containerRef, {
    dest: "vultr",
    offer: "cloud_gpu",
    placement: "bottom",
  })

  return (
    <div ref={containerRef} className="my-12 pt-8 border-t border-white/10">
      <h2 className="text-2xl font-mono text-text-primary mb-4 text-center">
        Continue Safely
      </h2>

      <div className="flex flex-col items-center gap-6">
        {/* Primary CTA: Cloud Sandbox */}
        <a
          href={VULTR_LINK}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleVultrClick}
          className="w-full sm:w-auto px-10 py-5 text-xl font-bold text-white rounded-lg border-2 border-green-400 bg-green-600 hover:bg-green-500 font-mono text-center"
        >
          Launch Cloud Sandbox →
        </a>

        {/* Secondary CTA: Survival Kit (muted text link) */}
        <div className="text-center">
          <p className="text-sm text-text-tertiary mb-2">
            Need local troubleshooting guides?
          </p>
          <a
            href={GUMROAD_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={handleKitClick}
            className="text-xs text-text-tertiary hover:text-brand-primary underline font-mono transition-colors"
          >
            Survival Kit
          </a>
        </div>
      </div>
    </div>
  )
}
