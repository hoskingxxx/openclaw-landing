"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { AlertTriangle, ExternalLink, Cloud, Settings, Package, Shield, Cpu, Zap } from "lucide-react"
import { trackAffiliateClick, trackToolDowngrade } from "@/lib/tracking"
import { ConversionButton } from "@/components/monetization/ConversionButton"

// ============================================================================
// GLOBAL AFFILIATE LINKS (HARDCODED)
// ============================================================================

const LINK_KIT = "https://hoskington6.gumroad.com/l/ymwwgm"
const LINK_API = "https://deepinfra.com/"
const LINK_CLOUD = "https://www.vultr.com/?ref=9864821-9J"

// ============================================================================
// SELECT STYLES (Hardcoded for dark mode dropdown options)
// ============================================================================
const selectStyle: React.CSSProperties = {
  backgroundColor: "#0f172a",
  color: "#e5e7eb",
};

const optionStyle: React.CSSProperties = {
  backgroundColor: "#0f172a",
  color: "#e5e7eb",
};

// ============================================================================
// TYPES & DATA STRUCTURES (Strict Enum - Do Not Modify)
// ============================================================================

type Environment = "vps" | "local_win" | "local_mac"
type ModelId = "1.5b" | "8b" | "14b" | "32b" | "70b" | "671b"
type VRAMId = "4-6gb" | "8gb" | "12gb" | "16gb" | "24gb" | "48gb"
type Status = "red" | "yellow" | "green"

interface ModelOption {
  id: ModelId
  label: string
  requiredVRAM: number // in GB, for 4-bit quantization ONLY
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
  "1.5b": { id: "1.5b", label: "DeepSeek-R1-Distill-Qwen-1.5B", requiredVRAM: 2 },
  "8b": { id: "8b", label: "DeepSeek-R1-Distill-Llama-8B", requiredVRAM: 6 },
  "14b": { id: "14b", label: "DeepSeek-R1-Distill-Llama-14B", requiredVRAM: 10 },
  "32b": { id: "32b", label: "DeepSeek-R1-Distill-Qwen-32B", requiredVRAM: 20 },
  "70b": { id: "70b", label: "DeepSeek-R1-Distill-Llama-70B", requiredVRAM: 42 },
  "671b": { id: "671b", label: "DeepSeek-V3 (671B Full)", requiredVRAM: 300 },
}

const VRAM_OPTIONS: VRAMOption[] = [
  { id: "4-6gb", label: "4GB–6GB (Entry Level)", gb: 5 },
  { id: "8gb", label: "8GB", gb: 8 },
  { id: "12gb", label: "12GB", gb: 12 },
  { id: "16gb", label: "16GB", gb: 16 },
  { id: "24gb", label: "24GB", gb: 24 },
  { id: "48gb", label: "48GB+", gb: 48 },
]

const ENVIRONMENT_OPTIONS: EnvironmentOption[] = [
  { id: "vps", label: "☁️ Cloud VPS / Docker (Isolated)" },
  { id: "local_win", label: "🪟 Local Windows (Personal PC)" },
  { id: "local_mac", label: "🍎 Local macOS (Daily Driver / Apple Silicon)" },
]

const MODEL_IDS: ModelId[] = ["1.5b", "8b", "14b", "32b", "70b", "671b"]
const SMALLEST_MODEL: ModelId = "1.5b"
const ENTRY_MODEL: ModelId = "8b"

// ============================================================================
// CALCULATION ENGINE (4-bit Quantization Only)
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
// TRACKING HANDLERS (Strict Schema)
// ============================================================================

interface AffiliateTrackParams {
  partner: 'gumroad' | 'deepinfra' | 'vultr'
  location: 'red_card' | 'yellow_card' | 'green_card' | 'mobile_override' | 'security_banner'
  model: ModelId
  vram: VRAMId
  status: Status
  postSlug: string
}

function trackAffiliateClickStrict(params: AffiliateTrackParams) {
  trackAffiliateClick({
    source: `tool_${params.partner}_${params.location}`,
    verdict: params.status,
    postSlug: params.postSlug,
  })
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function RealityCheck() {
  const [model, setModel] = useState<ModelId>("8b")
  const [vram, setVram] = useState<VRAMId>("8gb")
  const [environment, setEnvironment] = useState<Environment>("local_win")
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

  // Calculate status (OS does NOT affect status)
  const userVRAM = VRAM_OPTIONS.find(o => o.id === vram)!.gb
  const requiredVRAM = MODELS[model].requiredVRAM
  const status = calculateStatus(requiredVRAM, userVRAM)

  // Try Smaller Model always goes to 8B (ENTRY_MODEL), unless already at 8B or smaller
  const canDowngradeTo8B = model !== "8b" && model !== "1.5b"

  // Show security banner? (Independent layer, does NOT affect status)
  const showSecurityBanner = environment === "local_win" || environment === "local_mac"

  // Tracking helpers
  const trackGumroad = (location: AffiliateTrackParams['location']) => {
    trackAffiliateClickStrict({ partner: 'gumroad', location, model, vram, status, postSlug })
  }

  const trackDeepInfra = (location: AffiliateTrackParams['location']) => {
    trackAffiliateClickStrict({ partner: 'deepinfra', location, model, vram, status, postSlug })
  }

  const trackVultr = (location: AffiliateTrackParams['location']) => {
    trackAffiliateClickStrict({ partner: 'vultr', location, model, vram, status, postSlug })
  }

  const handleDowngrade = () => {
    // Always downgrade to 8B as the entry point
    trackToolDowngrade({ fromModel: model, toModel: ENTRY_MODEL, postSlug })
    setModel(ENTRY_MODEL)
  }

  return (
    <div className="my-8 p-6 border border-border rounded-xl bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">AI Deployment Reality Check</h3>
      </div>

      {/* Security Banner (Independent Layer - Does NOT affect status) */}
      {showSecurityBanner && (
        <div className="mb-6 p-4 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold text-amber-900 dark:text-amber-100 text-sm">
                ⚠️ Security Note
              </div>
              <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
                Local environments have limited isolation.
                {" "}For long-term safety, use our{" "}
                <a
                  href={LINK_KIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGumroad('security_banner')}
                  className="underline hover:text-amber-950 dark:hover:text-amber-100 font-medium"
                >
                  Safe Config
                </a>
                {" "}or a{" "}
                <a
                  href={LINK_CLOUD}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackVultr('security_banner')}
                  className="underline hover:text-amber-950 dark:hover:text-amber-100 font-medium"
                >
                  Cloud VPS
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Input Controls */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Environment</label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value as Environment)}
            className="w-full h-10 rounded-md border border-input px-3 appearance-none cursor-pointer"
            style={selectStyle}
          >
            {ENVIRONMENT_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id} style={optionStyle}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your VRAM</label>
          <select
            value={vram}
            onChange={(e) => setVram(e.target.value as VRAMId)}
            className="w-full h-10 rounded-md border border-input px-3 appearance-none cursor-pointer"
            style={selectStyle}
          >
            {VRAM_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id} style={optionStyle}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Target Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as ModelId)}
            className="w-full h-10 rounded-md border border-input px-3 appearance-none cursor-pointer"
            style={selectStyle}
          >
            {MODEL_IDS.map(id => (
              <option key={id} value={id} style={optionStyle}>{MODELS[id].label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* ====================================================================
          MOBILE OVERRIDE (< 768px) - Priority #1
          ==================================================================== */}
      {isMobile && (
        <div className="space-y-3">
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
            <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
              📱 Mobile Detected
            </div>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Local inference is not practical on mobile.
            </p>
          </div>

          {/* Primary: DeepInfra API - ALWAYS priority in MOBILE */}
          <a
            href={LINK_API}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDeepInfra('mobile_override')}
            data-umami-event="affiliate_click"
            data-umami-partner="deepinfra"
            data-umami-location="mobile_override"
            data-umami-model={model}
            data-umami-vram={vram}
            data-umami-status={status}
            className="block p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
          >
            <div className="flex items-center gap-3">
              <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="flex-1">
                <div className="font-bold text-blue-900 dark:text-blue-100">
                  Try on Phone
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                  Run instantly via API. No setup.
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          </a>

          {/* Secondary: Gumroad */}
          <a
            href={LINK_KIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGumroad('mobile_override')}
            data-umami-event="affiliate_click"
            data-umami-partner="gumroad"
            data-umami-location="mobile_override"
            data-umami-model={model}
            data-umami-vram={vram}
            data-umami-status={status}
            className="block p-3 rounded-lg border border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-all"
          >
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="text-amber-900 dark:text-amber-100">View Survival Kit</span>
            </div>
          </a>
        </div>
      )}

      {/* ====================================================================
          DESKTOP: RED STATE (Cannot Run)
          ==================================================================== */}
      {!isMobile && status === "red" && (
        <div className="space-y-3">
          {/* Status Header */}
          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold">
              🔴 Cannot Run
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              Estimated VRAM requirement exceeds your hardware.
            </p>
          </div>

          {/* Primary CTA: DeepInfra API - ALWAYS priority in RED */}
          <a
            href={LINK_API}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDeepInfra('red_card')}
            data-umami-event="affiliate_click"
            data-umami-partner="deepinfra"
            data-umami-location="red_card"
            data-umami-model={model}
            data-umami-vram={vram}
            data-umami-status={status}
            className="block p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-blue-900 dark:text-blue-100">
                  Run Instantly for $1
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Skip hardware limits. Cloud API access.
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Get Started <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>

          {/* Secondary CTA: Vultr Cloud GPU */}
          <a
            href={LINK_CLOUD}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackVultr('red_card')}
            data-umami-event="affiliate_click"
            data-umami-partner="vultr"
            data-umami-location="red_card"
            data-umami-model={model}
            data-umami-vram={vram}
            data-umami-status={status}
            className="block p-4 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 hover:border-purple-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-purple-900 dark:text-purple-100">
                  Rent High-Memory Cloud GPU
                </div>
                <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                  Get a private H100/A100 with full control.
                </p>
                <div className="flex items-center gap-2 mt-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                  Deploy Vultr <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>

          {/* Fallback: Try Smaller Model (8B) */}
          {canDowngradeTo8B && (
            <button
              onClick={handleDowngrade}
              data-umami-event="tool_downgrade_click"
              data-umami-from={model}
              data-umami-to={ENTRY_MODEL}
              className="w-full p-4 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 hover:border-orange-400 hover:shadow-sm transition-all text-left"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-orange-900 dark:text-orange-100">
                    Try Smaller Model (8B)
                  </div>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                    Your GPU cannot handle {MODELS[model].label}. Try {MODELS[ENTRY_MODEL].label}.
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
      )}

      {/* ====================================================================
          DESKTOP: YELLOW STATE (Tight Fit - Optimization Needed)
          ==================================================================== */}
      {!isMobile && status === "yellow" && (
        <div className="space-y-3">
          {/* Status Header */}
          <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 text-yellow-900 dark:text-yellow-100 font-semibold">
              ⚠️ Performance Warning
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              VRAM is very tight. Optimization required.
            </p>
          </div>

          {/* Primary CTA: Gumroad - ALWAYS priority in YELLOW */}
          <a
            href={LINK_KIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGumroad('yellow_card')}
            data-umami-event="affiliate_click"
            data-umami-partner="gumroad"
            data-umami-location="yellow_card"
            data-umami-model={model}
            data-umami-vram={vram}
            data-umami-status={status}
            className="block p-5 rounded-lg border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 hover:border-amber-600 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                  Get Extreme Optimization Config ($9.90)
                </div>
                <p className="text-sm text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
                  Production-ready templates for tight VRAM scenarios.
                </p>
                <div className="flex items-center gap-2 mt-3 text-sm font-bold text-amber-700 dark:text-amber-300">
                  Download <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>

          {/* Secondary CTA: DeepInfra API (Text Link) */}
          <div className="text-center">
            <a
              href={LINK_API}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDeepInfra('yellow_card')}
              data-umami-event="affiliate_click"
              data-umami-partner="deepinfra"
              data-umami-location="yellow_card"
              data-umami-model={model}
              data-umami-vram={vram}
              data-umami-status={status}
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-brand-primary transition-colors"
            >
              Or run smoothly via API <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Fallback: Try Smaller Model (8B) */}
          {canDowngradeTo8B && (
            <button
              onClick={handleDowngrade}
              data-umami-event="tool_downgrade_click"
              data-umami-from={model}
              data-umami-to={ENTRY_MODEL}
              className="w-full p-3 rounded-lg border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/20 hover:border-orange-400 hover:shadow-sm transition-all text-left"
            >
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span className="text-orange-900 dark:text-amber-100 font-medium">
                  Try Smaller Model (8B)
                </span>
              </div>
            </button>
          )}
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
              Your hardware can handle this model.
            </p>
          </div>

          {/* Trust Element: Recommended Settings (Gray background) */}
          <div className="p-4 rounded-lg border border-border bg-muted/50">
            <div className="flex items-center gap-2 font-bold text-text-primary mb-3">
              <Settings className="w-4 h-4" />
              Recommended Settings
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <div className="text-text-tertiary text-xs">Quantization</div>
                <div className="font-mono font-medium">4-bit</div>
              </div>
              <div>
                <div className="text-text-tertiary text-xs">Context</div>
                <div className="font-mono font-medium">4096</div>
              </div>
              <div>
                <div className="text-text-tertiary text-xs">Batch</div>
                <div className="font-mono font-medium">1</div>
              </div>
            </div>
          </div>

          {/* Primary CTA: Gumroad - DOMINANT, ALWAYS priority in GREEN */}
          <a
            href={LINK_KIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGumroad('green_card')}
            data-umami-event="affiliate_click"
            data-umami-partner="gumroad"
            data-umami-location="green_card"
            data-umami-model={model}
            data-umami-vram={vram}
            data-umami-status={status}
            className="block p-6 rounded-lg border-2 bg-gradient-to-br from-emerald-500 via-green-500 to-amber-500 hover:from-emerald-600 hover:via-green-600 hover:to-amber-600 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-white flex items-center gap-2 text-lg">
                  🚀 Download 1-Click Survival Kit ($9.90)
                </div>
                <p className="text-sm text-white/90 mt-2 leading-relaxed">
                  Ready-to-use templates, monitoring, and prompts.
                </p>
                <div className="flex items-center gap-2 mt-4 text-base font-bold text-white">
                  <ExternalLink className="w-5 h-5" />
                  Get Instant Access
                </div>
              </div>
            </div>
          </a>

          {/* Secondary CTA: DeepInfra API (Weak Text Link ONLY) */}
          <div className="text-center">
            <a
              href={LINK_API}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDeepInfra('green_card')}
              data-umami-event="affiliate_click"
              data-umami-partner="deepinfra"
              data-umami-location="green_card"
              data-umami-model={model}
              data-umami-vram={vram}
              data-umami-status={status}
              className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-brand-primary transition-colors"
            >
              Just want to test quickly? Try API. <ExternalLink className="w-3 h-3" />
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
      <p className="text-[10px] text-center text-muted-foreground/60 mt-3 uppercase tracking-widest">
        *Results are estimates based on common setups. Actual requirements may vary.
      </p>
    </div>
  )
}
