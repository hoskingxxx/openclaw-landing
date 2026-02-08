"use client"

import { Package, Zap, ExternalLink } from "lucide-react"

// Gumroad 产品链接
const GUMROAD_LINK = "https://hilda666888.gumroad.com/l/ymwwgm"

interface SurvivalKitPromoProps {
  placement?: "top" | "bottom"
}

export function SurvivalKitPromo({ placement = "top" }: SurvivalKitPromoProps) {
  return (
    <div className="my-8 border-2 border-amber-500/50 rounded-xl bg-gradient-to-br from-amber-50/10 to-orange-50/5 dark:from-amber-950/30 dark:to-orange-950/20 relative overflow-hidden">
      {/* 左侧强调条 */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500 to-orange-500"></div>

      <div className="p-6 pl-8">
        {/* 头部标识 */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 dark:bg-amber-500/10 rounded-full border border-amber-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
              Official Recommendation
            </span>
          </div>
        </div>

        {/* 主标题 */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Package className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          Stop Wasting Time on Configs
        </h3>

        {/* 副标题 */}
        <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
          Get the production-ready DeepSeek R1 + OpenClaw config pack. Includes fixes for OOM, permission errors, and optimized settings.
        </p>

        {/* CTA 按钮 */}
        <a
          href={GUMROAD_LINK}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="marketing_affiliate_click"
          data-umami-partner="gumroad"
          data-umami-placement={`survival_kit_promo_${placement}`}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02]"
        >
          <span>Download Survival Kit ($9.90)</span>
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* 信任标识 */}
        <div className="mt-4 pt-4 border-t border-amber-500/20 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span>✓</span> OOM Fix Templates
          </span>
          <span className="flex items-center gap-1">
            <span>✓</span> Optimization Presets
          </span>
          <span className="flex items-center gap-1">
            <span>✓</span> Error Recovery
          </span>
        </div>
      </div>
    </div>
  )
}
