/**
 * ContextCTA - 条件渲染的 CTA 组件（更新为新的 offer 配置）
 *
 * 规则：
 * - verdict="red": 显示 Vultr Cloud Sandbox（PRIMARY，突出）
 * - verdict="yellow": 不显示 Cloud（YELLOW 应该推 Secondary Kit）
 * - verdict="green": 不显示 Cloud（GREEN 不需要云服务）
 *
 * Tracking: Uses trackRevenueOutbound with canonical P1 properties
 */

"use client"

import { useRef } from "react"
import { Cloud, ExternalLink } from "lucide-react"
import { useRevenueOutbound, useCtaImpression } from "@/lib/use-tracking"
import { PRIMARY_OFFER, generateCtaId, type CtaPlacement, type OfferType } from "@/lib/offers"

type Verdict = "red" | "yellow" | "green"

interface ContextCTAProps {
  verdict: Verdict
  placement?: Placement
  className?: string
}

// Use Placement type from tracking.ts (no inline needed for ContextCTA)
type Placement = "bottom" | "red_card" | "yellow_card" | "green_card" | "top"

export function ContextCTA({
  verdict,
  placement = "bottom",
  className = "",
}: ContextCTAProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate canonical CTA ID
  const ctaId = generateCtaId({
    offer: "cloud",
    placement,
    verdict,
  })

  // Track clicks
  const handleClick = useRevenueOutbound({
    dest: "vultr",
    offer: "cloud_gpu",
    placement,
    verdict,
  })

  // Track impressions
  useCtaImpression(containerRef, {
    dest: "vultr",
    offer: "cloud_gpu",
    placement,
    verdict,
  })

  // 只有 RED verdict 才显示 Cloud CTA
  if (verdict !== "red") {
    return null
  }

  return (
    <div ref={containerRef} className={`my-12 pt-8 border-t border-white/10 ${className}`}>
      <h2 className="text-2xl font-mono text-brand-primary mb-4 text-center">
        Hardware Not Enough? Escape to Cloud.
      </h2>
      <div className="flex flex-col items-center gap-6">
        {/* Primary CTA: Cloud Sandbox */}
        <a
          href={PRIMARY_OFFER.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={handleClick}
          className="w-full sm:w-auto px-10 py-5 text-xl font-bold text-white rounded-lg border-2 border-brand-primary bg-brand-primary hover:bg-brand-hover font-mono text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
          data-cta={ctaId}
        >
          Launch Cloud Sandbox ({PRIMARY_OFFER.price}) →
        </a>
      </div>
    </div>
  );
}
