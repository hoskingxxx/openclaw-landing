"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { AlertTriangle, ExternalLink, Settings, Shield, Zap } from "lucide-react"
import { trackAffiliateClick, trackToolDowngrade } from "@/lib/tracking"
import { SurvivalKitPromo } from "@/components/monetization/SurvivalKitPromo"

// ============================================================================
// GLOBAL AFFILIATE LINKS (HARDCODED)
// ============================================================================

const LINK_KIT = "https://hilda666888.gumroad.com/l/ymwwgm"
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

type AffiliateLocation = 'red_card' | 'yellow_card' | 'green_card' | 'mobile_override'

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

  // Tracking helpers - explicitly call trackEvent with all properties
  const trackGumroad = (location: AffiliateLocation) => {
    trackAffiliateClick({ partner: 'gumroad', status, model, vram, location, postSlug })
  }

  const trackDeepInfra = (location: AffiliateLocation) => {
    trackAffiliateClick({ partner: 'deepinfra', status, model, vram, location, postSlug })
  }

  const trackVultr = (location: AffiliateLocation) => {
    trackAffiliateClick({ partner: 'vultr', status, model, vram, location, postSlug })
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
                  data-umami-event="marketing_affiliate_click"
                  data-umami-partner="gumroad"
                  data-umami-placement="security_banner"
                  className="underline hover:text-amber-950 dark:hover:text-amber-100 font-medium"
                >
                  Safe Config
                </a>
                {" "}or a{" "}
                <a
                  href={LINK_CLOUD}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-umami-event="marketing_affiliate_click"
                  data-umami-partner="vultr"
                  data-umami-placement="security_banner"
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
          RED STATE (Cannot Run)
          ==================================================================== */}
      {status === "red" && (
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

          {/* API Alert Card - 唯一 CTA */}
          <div className="border-2 border-red-500 rounded-lg bg-slate-900 dark:bg-slate-950 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-white font-semibold mb-3">
                  ⚠️ Hardware insufficient. Local deployment will fail.
                </p>
                <a
                  href={LINK_API}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackDeepInfra('red_card')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors text-sm"
                >
                  Get DeepInfra API <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
          YELLOW STATE (Tight Fit - Optimization Needed)
          ==================================================================== */}
      {status === "yellow" && (
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

          {/* Analysis Passed 提示 */}
          <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-sm">
            <p className="text-green-400 font-mono">
              ✅ Analysis Passed. Hardware is compatible.
            </p>
          </div>

          {/* Survival Kit Promo - 唯一 CTA */}
          <SurvivalKitPromo context="reality_check" status="yellow" />
        </div>
      )}

      {/* ====================================================================
          GREEN STATE (Ready)
          ==================================================================== */}
      {status === "green" && (
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

          {/* Mobile CTA Override or Desktop GREEN CTA */}
          {isMobile ? (
            <>
              {/* Analysis Passed 提示 */}
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-sm">
                <p className="text-green-400 font-mono">
                  ✅ Analysis Passed. Hardware is compatible.
                </p>
              </div>

              {/* Survival Kit Promo - 唯一 CTA */}
              <SurvivalKitPromo context="reality_check" status="green" />
            </>
          ) : (
            <>
              {/* Trust Element: Recommended Settings */}
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

              {/* Analysis Passed 提示 */}
              <div className="p-3 bg-green-500/10 border border-green-500/30 rounded text-sm">
                <p className="text-green-400 font-mono">
                  ✅ Analysis Passed. Hardware is compatible.
                </p>
              </div>

              {/* Survival Kit Promo - 唯一 CTA */}
              <SurvivalKitPromo context="reality_check" status="green" />
            </>
          )}
        </div>
      )}

      {/* Footer Note */}
      <p className="text-[10px] text-center text-muted-foreground/60 mt-3 uppercase tracking-widest">
        *Results are estimates based on common setups. Actual requirements may vary.
      </p>
    </div>
  )
}
