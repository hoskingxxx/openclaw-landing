"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { trackAffiliateClick, trackToolDowngrade } from "@/lib/tracking"
import { ConversionButton } from "@/components/monetization/ConversionButton"
import { ExternalLink, Cloud, AlertTriangle, Settings, Package, Shield, Cpu, Zap } from "lucide-react"

// ============================================================================
// TYPES & DATA STRUCTURES
// ============================================================================

type Environment = "cloud" | "windows" | "macos"
type ModelId =
  | "1.5b"
  | "8b"
  | "14b"
  | "32b"
  | "70b"
  | "671b"
type VRAMId = "5gb" | "8gb" | "12gb" | "16gb" | "24gb" | "48gb"
type Status = "red" | "yellow" | "green"

interface ModelOption {
  id: ModelId
  label: string
  requiredVRAM: number // in GB, for 4-bit quantization
}

interface VRAMOption {
  id: VRAMId
  label: string
  gb: number
}

interface EnvironmentOption {
  id: Environment
  label: string
}

// ============================================================================
// DATA (Single Source of Truth)
// ============================================================================

const MODELS: Record<ModelId, ModelOption> = {
  "1.5b": { id: "1.5b", label: "DeepSeek R1 Distill (1.5B)", requiredVRAM: 2 },
  "8b": { id: "8b", label: "DeepSeek R1 Distill (8B)", requiredVRAM: 6 },
  "14b": { id: "14b", label: "DeepSeek R1 Distill (14B)", requiredVRAM: 10 },
  "32b": { id: "32b", label: "DeepSeek R1 Distill (32B)", requiredVRAM: 20 },
  "70b": { id: "70b", label: "DeepSeek R1 Distill (70B)", requiredVRAM: 42 },
  "671b": { id: "671b", label: "DeepSeek V3 (671B Full)", requiredVRAM: 300 },
}

const VRAM_OPTIONS: VRAMOption[] = [
  { id: "5gb", label: "4GB–6GB (Entry Level)", gb: 5 },
  { id: "8gb", label: "8GB", gb: 8 },
  { id: "12gb", label: "12GB (RTX 3060/4070)", gb: 12 },
  { id: "16gb", label: "16GB (RTX 4080/Mac)", gb: 16 },
  { id: "24gb", label: "24GB (RTX 3090/4090)", gb: 24 },
  { id: "48gb", label: "48GB+ (Pro Workstation)", gb: 48 },
]

const ENVIRONMENT_OPTIONS: EnvironmentOption[] = [
  { id: "cloud", label: "☁️ Cloud VPS / Docker (Isolated)" },
  { id: "windows", label: "🪟 Local Windows (Personal PC)" },
  { id: "macos", label: "🍎 Local macOS (Apple Silicon)" },
]

const MODEL_IDS: ModelId[] = ["1.5b", "8b", "14b", "32b", "70b", "671b"]
const SMALLEST_MODEL: ModelId = "1.5b"
const ENTRY_MODEL: ModelId = "8b"

// ============================================================================
// CALCULATION ENGINE
// ============================================================================

function calculateStatus(requiredVRAM: number, userVRAM: number): Status {
  // RED: Impossible
  if (requiredVRAM > userVRAM) return "red"

  // YELLOW: Tight fit (within 5% margin)
  const threshold = userVRAM * 0.95
  if (requiredVRAM > threshold) return "yellow"

  // GREEN: Comfortable fit
  return "green"
}

// ============================================================================
// TRACKING HANDLERS
// ============================================================================

interface TrackParams {
  partner: 'deepinfra' | 'vultr' | 'gumroad'
  location: 'red_card' | 'yellow_card' | 'green_card' | 'mobile_override'
  model: ModelId
  vram: VRAMId
  postSlug: string
}

function trackAffiliate(params: TrackParams) {
  trackAffiliateClick({
    source: `tool_${params.partner}_${params.location}`,
    verdict: undefined, // Status is separate from verdict
    postSlug: params.postSlug,
  })
}

// ============================================================================
// COMPONENT
// ============================================================================

export function VramCalculator() {
  const [model, setModel] = useState<ModelId>("14b") // Default to mid-tier
  const [vram, setVram] = useState<VRAMId>("8gb")   // Default to common laptop GPU
  const [environment, setEnvironment] = useState<Environment>("windows")
  const [isMobile, setIsMobile] = useState(false)

  const pathname = usePathname()
  const postSlug = pathname?.split("/").filter(Boolean).pop() || ""

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate status
  const userVRAM = VRAM_OPTIONS.find(o => o.id === vram)!.gb
  const requiredVRAM = MODELS[model].requiredVRAM
  const status = calculateStatus(requiredVRAM, userVRAM)

  // Can show downgrade?
  const canDowngrade = model !== SMALLEST_MODEL

  // Show security banner?
  const showSecurityBanner = environment === "windows" || environment === "macos"

  // Handlers
  const handleDeepInfraClick = () => {
    const location = isMobile ? "mobile_override" :
                      status === "red" ? "red_card" :
                      status === "yellow" ? "yellow_card" : "green_card"
    trackAffiliate({ partner: "deepinfra", location, model, vram, postSlug })
  }

  const handleVultrClick = () => {
    trackAffiliate({ partner: "vultr", location: "red_card", model, vram, postSlug })
  }

  const handleGumroadClick = () => {
    const location = isMobile ? "mobile_override" :
                      status === "red" ? "red_card" :
                      status === "yellow" ? "yellow_card" : "green_card"
    trackAffiliate({ partner: "gumroad", location, model, vram, postSlug })
  }

  const handleDowngrade = () => {
    trackToolDowngrade({ fromModel: model, toModel: ENTRY_MODEL, postSlug })
    setModel(ENTRY_MODEL)
  }

  return (
    <div className="my-8 p-6 border border-border rounded-xl bg-card shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          🧮 Can I Run It? <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-1 rounded border border-border">Reality Check</span>
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Based on 4-bit quantization requirements. Results are estimates.
        </p>
      </div>

      {/* Security Banner (Independent Layer) */}
      {showSecurityBanner && (
        <div className="mb-6 p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-900 dark:text-amber-100 text-sm">
                Security Note
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                Local isolation on {environment === "windows" ? "Windows" : "macOS"} is limited for AI workloads.
                {" "}Consider using our <strong>Safe Config (Gumroad)</strong> or <strong>Cloud VPS</strong> for isolated environments.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Environment</label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value as Environment)}
            className="w-full p-2 rounded border border-input bg-background text-sm"
          >
            {ENVIRONMENT_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your VRAM</label>
          <select
            value={vram}
            onChange={(e) => setVram(e.target.value as VRAMId)}
            className="w-full p-2 rounded border border-input bg-background text-sm"
          >
            {VRAM_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Target Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as ModelId)}
            className="w-full p-2 rounded border border-input bg-background text-sm"
          >
            {MODEL_IDS.map(id => (
              <option key={id} value={id}>{MODELS[id].label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ====================================================================
          MOBILE OVERRIDE (< 768px)
          ==================================================================== */}
      {isMobile && (
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              📱 Mobile Detected
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300 mb-3">
              Local inference on mobile is not practical. Use cloud API instead.
            </p>
          </div>

          {/* Primary: DeepInfra API */}
          <a
            href="https://deepinfra.com/?ref=openclaw"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDeepInfraClick}
            data-umami-event="affiliate_click"
            data-umami-partner="deepinfra"
            data-umami-location="mobile_override"
            className="block p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="flex-1">
                <div className="font-bold text-blue-900 dark:text-blue-100">
                  Try on Phone (API Mode)
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Run R1 instantly for ~$1. No setup required.
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </a>

          {/* Secondary: Gumroad */}
          <a
            href="https://hoskington6.gumroad.com/l/ymwwgm?ref=openclaw_tool"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGumroadClick}
            data-umami-event="affiliate_click"
            data-umami-partner="gumroad"
            data-umami-location="mobile_override"
            className="block p-3 rounded-lg border border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-all"
          >
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-900 dark:text-amber-100">View Survival Kit ($9.90)</span>
            </div>
          </a>
        </div>
      )}

      {/* ====================================================================
          DESKTOP: RED STATE (Impossible)
          ==================================================================== */}
      {!isMobile && status === "red" && (
        <div className="space-y-3">
          {/* Status Header */}
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold">
              <AlertTriangle className="w-5 h-5" />
              🔴 Hardware Insufficient
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              This model requires an estimated {requiredVRAM}GB+ VRAM. Your setup has {userVRAM}GB.
            </p>
          </div>

          {/* Primary: DeepInfra API */}
          <a
            href="https://deepinfra.com/?ref=openclaw"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDeepInfraClick}
            data-umami-event="affiliate_click"
            data-umami-partner="deepinfra"
            data-umami-location="red_card"
            className="block p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-blue-900 dark:text-blue-100 flex items-center gap-2">
                  ☁️ Run on Cloud API
                  <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Recommended</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Skip the hardware limits. Run DeepSeek R1 instantly for ~$1.
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Get API Access <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>

          {/* Secondary: Vultr */}
          <a
            href={`https://www.vultr.com/?ref=9864821-9J&utm_source=openclaw&utm_medium=content&utm_campaign=${postSlug}&utm_content=vram_calc_red`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVultrClick}
            data-umami-event="affiliate_click"
            data-umami-partner="vultr"
            data-umami-location="red_card"
            className="block p-4 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 hover:border-purple-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-purple-900 dark:text-purple-100">
                  🖥️ Rent Cloud GPU
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  Get a private H100/A100 server with full control.
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                  Deploy Vultr <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>

          {/* Fallback: Try Smaller Model */}
          {canDowngrade && (
            <button
              onClick={handleDowngrade}
              data-umami-event="tool_downgrade_click"
              data-umami-from={model}
              data-umami-to={ENTRY_MODEL}
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
                    Your GPU cannot handle {MODELS[model].label}. Try the {MODELS[ENTRY_MODEL].label} instead.
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm font-medium text-orange-600 dark:text-orange-400">
                    Switch to {MODELS[ENTRY_MODEL].label} <Zap className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          )}
        </div>
      )}

      {/* ====================================================================
          DESKTOP: YELLOW STATE (Tight Fit - Needs Optimization)
          ==================================================================== */}
      {!isMobile && status === "yellow" && (
        <div className="space-y-3">
          {/* Status Header */}
          <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100 font-semibold">
              <AlertTriangle className="w-5 h-5" />
              ⚠️ Tight Fit - Optimization Required
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              This model fits your VRAM, but you'll need careful configuration to avoid OOM crashes.
            </p>
          </div>

          {/* Primary: Gumroad Kit (Sell the Skill) */}
          <a
            href="https://hoskington6.gumroad.com/l/ymwwgm?ref=openclaw_tool"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGumroadClick}
            data-umami-event="affiliate_click"
            data-umami-partner="gumroad"
            data-umami-location="yellow_card"
            className="block p-5 rounded-lg border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 hover:border-amber-600 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                  🚀 Get Extreme Optimization Config
                  <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">$9.90</span>
                </div>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
                  Stop guessing. Get production-ready templates with tuned parameters for tight VRAM scenarios.
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm font-bold text-amber-700 dark:text-amber-300">
                  Download Kit <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>

          {/* Secondary: DeepInfra API */}
          <a
            href="https://deepinfra.com/?ref=openclaw"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDeepInfraClick}
            data-umami-event="affiliate_click"
            data-umami-partner="deepinfra"
            data-umami-location="yellow_card"
            className="block p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/20 hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="flex-1">
                <div className="font-semibold text-blue-900 dark:text-blue-100">
                  Or run smoothly on Cloud API
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Skip the optimization headache. ~$1 to start.
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </a>

          {/* Fallback: Try Smaller Model */}
          <button
            onClick={handleDowngrade}
            data-umami-event="tool_downgrade_click"
            data-umami-from={model}
            data-umami-to={ENTRY_MODEL}
            className="w-full p-3 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 hover:border-orange-400 hover:shadow-sm transition-all text-left"
          >
            <div className="flex items-center gap-2 text-sm">
              <Cpu className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-orange-900 dark:text-orange-100 font-medium">
                Try Smaller Model ({MODELS[ENTRY_MODEL].label})
              </span>
            </div>
          </button>
        </div>
      )}

      {/* ====================================================================
          DESKTOP: GREEN STATE (Ready)
          ==================================================================== */}
      {!isMobile && status === "green" && (
        <div className="space-y-4">
          {/* Status Header */}
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 text-green-900 dark:text-green-100 font-semibold">
              ✅ Ready to Run
            </div>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Your hardware can handle this model comfortably.
            </p>
          </div>

          {/* Trust Element: Recommended Settings */}
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 font-bold text-text-primary mb-3">
              <Settings className="w-4 h-4" />
              Recommended Settings
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-text-tertiary text-xs">Quantization</div>
                <div className="font-mono font-medium">Q4_K_M (4-bit)</div>
              </div>
              <div>
                <div className="text-text-tertiary text-xs">Context Length</div>
                <div className="font-mono font-medium">4096 tokens</div>
              </div>
              <div>
                <div className="text-text-tertiary text-xs">Batch Size</div>
                <div className="font-mono font-medium">1</div>
              </div>
            </div>
            <p className="text-xs text-text-secondary mt-2">
              💡 Use these params to avoid OOM crashes.
            </p>
          </div>

          {/* Primary: Gumroad Kit (DOMINANT) */}
          <a
            href="https://hoskington6.gumroad.com/l/ymwwgm?ref=openclaw_tool"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGumroadClick}
            data-umami-event="affiliate_click"
            data-umami-partner="gumroad"
            data-umami-location="green_card"
            className="block p-6 rounded-lg border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 hover:border-amber-600 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2 text-lg">
                  🚀 Download 1-Click Survival Kit
                  <span className="text-sm bg-amber-500 text-white px-3 py-1 rounded-full font-bold">$9.90</span>
                </div>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-2 leading-relaxed">
                  Get ready-to-use Docker templates, monitoring dashboards, and optimized prompts.
                                   {" "}Stop configuring, start running.
                </p>
                <div className="flex items-center gap-2 mt-4 text-base font-bold text-amber-700 dark:text-amber-300">
                  <ExternalLink className="w-5 h-5" />
                  Get Instant Access
                </div>
              </div>
            </div>
          </a>

          {/* Secondary: DeepInfra API (Small Link) */}
          <div className="text-center">
            <a
              href="https://deepinfra.com/?ref=openclaw"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDeepInfraClick}
              data-umami-event="affiliate_click"
              data-umami-partner="deepinfra"
              data-umami-location="green_card"
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-brand-primary transition-colors"
            >
              Just want to test? Try Cloud API <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Footer: Buy Me a Coffee */}
          <ConversionButton
            location="tool_green"
            copy="Your hardware is ready. If this tool saved you time, support the dev."
            variant="compact"
          />
        </div>
      )}

      {/* Footer Note */}
      <p className="text-[10px] text-muted-foreground/60 mt-4 text-center">
        *Results are estimates based on 4-bit quantization. Actual requirements may vary.
      </p>
    </div>
  )
}
