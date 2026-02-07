"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { trackVultrClick, trackAffiliateClick, trackProductClick, trackToolDowngrade } from "@/lib/tracking"
import { ConversionButton } from "@/components/monetization/ConversionButton"
import { ExternalLink, Cloud, Cpu, Download, Zap, Settings, Package } from "lucide-react"

// ============================================================================
// SINGLE SOURCE OF TRUTH: VRAM Calculator Data
// ============================================================================

type Status = "green" | "yellow" | "red"

const VRAM_OPTIONS = [
  { id: "8gb", label: "8GB (Laptop/Entry)" },
  { id: "12gb", label: "12GB (RTX 3060/4070)" },
  { id: "16gb", label: "16GB (RTX 4080/Mac)" },
  { id: "24gb", label: "24GB (RTX 3090/4090)" },
  { id: "48gb", label: "48GB+ (Pro Workstation)" },
] as const

const MODEL_OPTIONS = [
  { id: "deepseek-r1-distill-32b", label: "DeepSeek R1 Distill (32B)" }, // Default
  { id: "deepseek-r1-full", label: "DeepSeek R1 Full (671B)" },
  { id: "deepseek-r1-distill-8b", label: "DeepSeek R1 Distill (8B)" },
  { id: "llama-3-70b", label: "Llama 3 (70B)" },
] as const

const SMALLEST_MODEL = "deepseek-r1-distill-8b"

// Decision matrix: model -> vram -> status
const DECISION_MATRIX: Record<string, Record<string, Status>> = {
  "deepseek-r1-full": { "8gb": "red", "12gb": "red", "16gb": "red", "24gb": "red", "48gb": "red" },
  "deepseek-r1-distill-32b": { "8gb": "red", "12gb": "yellow", "16gb": "yellow", "24gb": "green", "48gb": "green" },
  "deepseek-r1-distill-8b": { "8gb": "yellow", "12gb": "green", "16gb": "green", "24gb": "green", "48gb": "green" },
  "llama-3-70b": { "8gb": "red", "12gb": "red", "16gb": "yellow", "24gb": "yellow", "48gb": "green" },
}

// Recommended settings for GREEN state
const RECOMMENDED_SETTINGS = {
  quantization: "Int4",
  context: "4096",
  batch: "1",
}

// ============================================================================
// Component
// ============================================================================

export function VramCalculator() {
  const [model, setModel] = useState("deepseek-r1-distill-32b")
  const [vram, setVram] = useState("12gb")
  const pathname = usePathname()

  const status = DECISION_MATRIX[model]?.[vram] || "yellow"
  const postSlug = pathname?.split("/").filter(Boolean).pop() || ""

  // Handlers
  const handleApiClick = () => {
    trackAffiliateClick({ source: "tool_api_red", verdict: status, postSlug })
  }

  const handleVultrClick = () => {
    const utmContent = `vram_calc_${status}`
    trackVultrClick({
      placement: "vram_calc",
      ctaId: `vram_calc_${status}_button`,
      verdict: status,
      postSlug,
      utmContent,
    })
  }

  const handleDowngrade = () => {
    trackToolDowngrade({ fromModel: model, toModel: SMALLEST_MODEL, postSlug })
    setModel(SMALLEST_MODEL)
  }

  const handleProductClick = () => {
    trackProductClick({ source: "tool_kit_green", verdict: status, postSlug })
  }

  // Can downgrade?
  const canDowngrade = model !== SMALLEST_MODEL

  return (
    <div className="my-8 p-6 border border-border rounded-xl bg-card shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          🧮 Can I Run It? <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded border border-border">Reality Check</span>
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Based on common real-world setups. Default selection is a common setup people try first.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Hardware</label>
          <select
            value={vram}
            onChange={(e) => setVram(e.target.value)}
            className="w-full p-2 rounded border border-input bg-background"
          >
            {VRAM_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-2 rounded border border-input bg-background"
          >
            {MODEL_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      {/* ====================================================================
          SCENARIO A: RED / YELLOW (Failed State) - Aggressive Monetization
          ==================================================================== */}
      {(status === "red" || status === "yellow") && (
        <div className="space-y-3">
          {/* Card 1: API Mode (Primary - Highlighted) */}
          <a
            href="https://deepinfra.com/?ref=openclaw"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleApiClick}
            data-umami-event="affiliate_click"
            data-umami-source="tool_api_red"
            data-umami-verdict={status}
            className="block p-4 rounded-lg border-2 border-blue-500/50 bg-blue-50 dark:bg-blue-950/30 hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  ☁️ API Mode (Recommended)
                  <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Fastest</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Your local hardware will crash/OOM. Run R1 instantly for ~$1.
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Get API Access <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>

          {/* Card 2: Downgrade (Logical - Conditional) */}
          {canDowngrade && (
            <button
              onClick={handleDowngrade}
              data-umami-event="tool_downgrade_click"
              data-umami-from={model}
              data-umami-to={SMALLEST_MODEL}
              className="w-full p-4 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 hover:border-orange-400 hover:shadow-sm transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-orange-900 dark:text-orange-100">
                    📉 Try Smaller Model
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    Your GPU cannot handle this model. Try the 8B version.
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                    Switch to 8B <Zap className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          )}

          {/* Card 3: Cloud GPU (Upsell) */}
          <a
            href={`https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=content&utm_campaign=${postSlug}&utm_content=vram_calc_${status}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVultrClick}
            data-umami-event="vultr_click"
            data-umami-event-placement="vram_calc"
            data-umami-event-verdict={status}
            data-umami-event-ref="9864821-9J"
            className="block p-4 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 hover:border-purple-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-purple-900 dark:text-purple-100">
                  🖥️ Cloud GPU
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  Rent a private H100/A100 server. Full control.
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                  Deploy Vultr <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* ====================================================================
          SCENARIO B: GREEN (Success State) - Upsell the Kit
          ==================================================================== */}
      {status === "green" && (
        <div className="space-y-4">
          {/* Component 1: Free Value (Trust) */}
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 font-bold text-text-primary mb-3">
              <Settings className="w-4 h-4" />
              Recommended Settings
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-text-tertiary text-xs">Quantization</div>
                <div className="font-mono font-medium">{RECOMMENDED_SETTINGS.quantization}</div>
              </div>
              <div>
                <div className="text-text-tertiary text-xs">Context</div>
                <div className="font-mono font-medium">{RECOMMENDED_SETTINGS.context}</div>
              </div>
              <div>
                <div className="text-text-tertiary text-xs">Batch</div>
                <div className="font-mono font-medium">{RECOMMENDED_SETTINGS.batch}</div>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              💡 Use these params to avoid OOM crashes.
            </p>
          </div>

          {/* Component 2: The Product (Profit) */}
          <a
            href="https://hoskington6.gumroad.com/l/ymwwgm?ref=openclaw_tool"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleProductClick}
            data-umami-event="product_click"
            data-umami-source="tool_kit_green"
            data-umami-verdict={status}
            className="block p-5 rounded-lg border-2 border-amber-400/60 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                  🚀 OpenClaw Survival Kit
                  <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">$9.90</span>
                </div>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
                  Stop guessing. Get ready-to-use Docker Templates + Monitoring + Prompts.
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm font-bold text-amber-700 dark:text-amber-300">
                  <Download className="w-4 h-4" />
                  Download Kit <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>

          {/* Component 3: Gratitude (Fallback) */}
          <ConversionButton
            location="tool_green"
            copy="Your hardware is ready. If this tool saved you time, support the dev."
            variant="compact"
          />
        </div>
      )}

      <p className="text-[10px] text-muted-foreground/60 mt-4 text-center">
        *Advanced configurations may change the outcome, but rarely the conclusion.
      </p>
    </div>
  )
}
