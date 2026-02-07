"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackAffiliateClick } from "@/lib/tracking"
import { Button } from "@/components/ui/Button"

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const pathname = usePathname()

  // Don't show on Error Index (it's a tool) or Hardware Page (it's already a sales page)
  const isExcludedPage = pathname?.includes('openclaw-error-index') || pathname?.includes('hardware-requirements')

  useEffect(() => {
    if (isExcludedPage) return

    const handleScroll = () => {
      if (window.scrollY > 400) setIsVisible(true)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isExcludedPage])

  if (!isVisible || isExcludedPage) return null

  // Get post slug for UTM
  const postSlug = pathname?.split("/").filter(Boolean).pop() || "";
  const utmContent = "sticky_banner";
  const affLink = `https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=content&utm_campaign=${postSlug}&utm_content=${utmContent}`;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:w-[400px] z-50 animate-in slide-in-from-bottom-5">
      <div className="relative bg-slate-900 border border-orange-500/30 shadow-2xl rounded-lg p-4 flex items-center gap-4">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 bg-slate-800 rounded-full w-6 h-6 flex items-center justify-center text-xs text-slate-400 border border-slate-700 hover:bg-slate-700"
        >
          ✕
        </button>

        <div className="flex-1">
          <p className="text-sm font-semibold text-white">
            🧠 Local environment fighting back?
          </p>
          <p className="text-xs text-slate-400">
            Switch to a clean Cloud GPU and start shipping.
          </p>
        </div>

        <Button
          variant="brand"
          size="sm"
          href={affLink}
          external
          onClick={() => trackAffiliateClick({ source: "vultr_sticky_banner", postSlug })}
          data-cta="true"
          data-umami-event="affiliate_click"
          data-umami-partner="vultr"
          data-umami-placement="sticky_banner"
        >
          Deploy Now →
        </Button>
      </div>
    </div>
  )
}
