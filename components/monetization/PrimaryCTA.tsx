/**
 * PrimaryCTA - 统一的主 CTA 组件（支持 Cloud 和 Kit）
 *
 * Offers:
 * - Cloud (PRIMARY): Vultr Cloud Sandbox
 * - Kit (SECONDARY): Survival Kit
 *
 * Variants:
 * - "full": 完整卡片（文章底部/首页底部）
 * - "compact": 通知栏（文章顶部）
 * - "inline": 行内文本链接（最小化）
 *
 * Tracking: Uses trackRevenueOutbound with canonical P1 properties
 */

"use client"

import { useRef } from "react"
import { Package, Zap, ExternalLink } from "lucide-react"
import { useRevenueOutbound, useCtaImpression } from "@/lib/use-tracking"
import { PRIMARY_OFFER, SECONDARY_OFFER, CONTEXT_OFFER, generateCtaId, type CtaPlacement, type OfferType } from "@/lib/offers"

type PrimaryVariant = "full" | "compact" | "inline"

interface PrimaryCTAProps {
  variant?: PrimaryVariant
  offer?: OfferType
  placement?: CtaPlacement
  verdict?: "red" | "yellow" | "green"
  className?: string
}

export function PrimaryCTA({
  variant = "full",
  offer = "primary",
  placement = "bottom",
  verdict,
  className = "",
}: PrimaryCTAProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  // Determine which offer config to use
  const offerConfig = offer === "primary" ? PRIMARY_OFFER : SECONDARY_OFFER

  // Map offer type to tracking offer value
  const trackingOffer = offer === "primary" ? "cloud_gpu" : "survival_kit"

  // Generate canonical CTA ID
  const ctaId = generateCtaId({
    offer: offer === "primary" ? "cloud" : "kit",
    placement,
    verdict,
  })

  // Track clicks
  const handleClick = useRevenueOutbound({
    dest: offerConfig.dest_type,
    offer: trackingOffer,
    placement,
    verdict,
  })

  // Track impressions
  useCtaImpression(elementRef, {
    dest: offerConfig.dest_type,
    offer: trackingOffer,
    placement,
    verdict,
  })

  // Inline variant: Minimal text link (not tracking impressions)
  if (variant === "inline") {
    return (
      <a
        href={offerConfig.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`text-xs text-text-tertiary hover:text-text-secondary transition-colors underline ${className}`}
        data-cta="primary"
      >
        {offer === "primary" ? "Get Cloud GPU ($5/mo)" : `Get Survival Kit (${offerConfig.price})`}
      </a>
    )
  }

  // Compact variant: Notice bar style (article top)
  if (variant === "compact") {
    return (
      <div ref={elementRef} className={`my-4 border border-border rounded-lg bg-card h-[60px] sm:h-[70px] flex items-center justify-between px-4 gap-3 ${className}`}>
        <div className="flex items-center gap-2">
          <h4 className="text-sm sm:text-base font-bold text-text-primary font-mono flex-1">
            {offer === "primary" ? "Stop Guessing." : "Stop Debugging."}
          </h4>
        </div>
        <a
          href={offerConfig.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white font-bold rounded transition-colors text-xs sm:text-sm flex-shrink-0"
          data-cta="primary"
          data-cta-strong="1"
        >
          {offer === "primary" ? "Rent GPU" : "Get Decision Boundaries"}
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    )
  }

  // Full variant: Complete promo (article bottom)
  return (
    <div ref={elementRef} className={`my-8 border border-brand-primary/50 rounded-xl bg-brand-primary/10 dark:from-brand-primary/30 dark:to-brand-hover/20 relative overflow-hidden ${className}`}>

      <div className="p-6">
        {/* Header badge */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-brand-primary/20 dark:bg-brand-primary/10 rounded-full border border-brand-primary/30">
            <Zap className="w-3.5 h-3.5 text-brand-primary dark:text-brand-primary" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            {offer === "primary" ? "Official Recommendation" : "Battle-Tested"}
            <ExternalLink className="w-4 h-4 text-brand-primary dark:text-brand-primary" />
          </h3>
        </div>

        {/* Subtitle */}
        <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
          {offer === "primary"
            ? "Stop fighting physics. Rent a clean Linux box with H100 GPU."
            : "Get decision boundaries, stop rules, and red lines for DeepSeek R1."}
        </p>

        {/* CTA Button */}
        <a
          href={offerConfig.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
          data-cta="primary"
          data-cta-strong="1"
        >
          {offer === "primary" ? "Deploy on Vultr →" : `Buy Clarity — ${offerConfig.price}`}
          <ExternalLink className="w-4 h-4 ml-1" />
        </a>

        {/* Trust badges */}
        <div className="mt-4 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span>✓</span> Stop Rules
          </span>
          <span className="flex items-center gap-1">
            <span>✓</span> Red Lines
          </span>
          <span className="flex items-center gap-1">
            <span>✓</span> Exit Points
          </span>
        </div>
      </div>
    </div>
  )
}
