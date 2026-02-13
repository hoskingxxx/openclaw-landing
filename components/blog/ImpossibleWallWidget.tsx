/**
 * Impossible Wall Widget - Blog Injection
 * =====================================
 * Compact advisory widget for blog posts.
 * Unified tracking + compliant copy.
 */

"use client"

import { useState, useEffect } from "react"
import { trackVultrOutbound } from "@/lib/tracking"
import { ContentRail } from "@/components/features/ContentRail"
import { ContentEdge } from "@/components/features/ContentEdge"
import { PRIMARY_OFFER } from "@/lib/offers"

interface ImpossibleWallWidgetProps {
  slug?: string
}

export function ImpossibleWallWidget({ slug }: ImpossibleWallWidgetProps) {
  const [dismissed, setDismissed] = useState(false)
  const [path, setPath] = useState("")

  useEffect(() => {
    setPath(window.location.pathname)
  }, [])

  const handleVultrClick = () => {
    trackVultrOutbound({
      placement: "blog_widget",
      slug,
      path,
      intent: "escape",
    })
  }

  if (dismissed) return null

  return (
    <ContentRail>
      <ContentEdge className="my-8">
        <div className="bg-gray-950 border border-green-500/50 rounded-lg overflow-hidden shadow-xl">
        {/* Terminal Header */}
        <div className="bg-gray-900 px-4 py-2 border-b border-green-500/30 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-green-400 font-mono text-sm flex-1">
            advisory.sh
          </span>
        </div>

        {/* Terminal Content */}
        <div className="p-5 font-mono text-sm space-y-4">
          <p className="text-red-400 font-bold">
            SYSTEM ADVISORY
          </p>
          <p className="text-gray-300">
            Local runs often require sudo/root and can expose your host system.
          </p>
          <p className="text-gray-300">
            If you hit OOM / driver conflicts, cloud sandbox is fastest path.
          </p>
          <p className="text-gray-300">
            Recommended: run in an isolated instance.
          </p>

          {/* CTA Button */}
          <a
            href={PRIMARY_OFFER.url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={handleVultrClick}
            className="block w-full py-4 px-6 bg-brand-primary hover:bg-brand-hover text-white font-bold text-center rounded-lg transition-colors shadow-lg"
          >
            [ Launch Cloud Sandbox ($5/mo) ]
          </a>

          {/* Dismiss */}
          <button
            onClick={() => setDismissed(true)}
            className="text-xs text-gray-500 hover:text-gray-400 underline mx-auto block"
          >
            I understand the risk. Continue reading
          </button>
        </div>
      </div>
      </ContentEdge>
    </ContentRail>
  )
}
