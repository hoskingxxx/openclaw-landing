"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackAffiliateClick, trackToolDowngrade, trackRevenueOutbound, trackCtaImpression, getPageType } from "@/lib/tracking"
import { ConversionButton } from "@/components/monetization/ConversionButton"
import { ExternalLink, Cloud, AlertTriangle, Settings, Package, Shield, Cpu, Zap } from "lucide-react"

// ============================================================================
// GLOBAL AFFILIATE LINKS (HARDCODED)
// ============================================================================

const LINK_KIT = "https://hilda666888.gumroad.com/l/ymwwgm"
const LINK_API = "https://deepinfra.com/"
const LINK_CLOUD = "https://www.vultr.com/?ref=9864821-9J"

// ============================================================================
// TYPES & DATA STRUCTURES (Strict Enum - Do Not Modify)
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
  { id: "5gb", label: "4GB–6GB (Entry Level)", gb: 5 },
  { id: "8gb", label: "8GB", gb: 8 },
  { id: "12gb", label: "12GB", gb: 12 },
  { id: "16gb", label: "16GB", gb: 16 },
  { id: "24gb", label: "24GB", gb: 24 },
  { id: "48gb", label: "48GB+", gb: 48 },
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
// TRACKING HANDLERS (Revenue Tracking Spec v1.0)
// ============================================================================

type AffiliateLocation = 'red_card' | 'yellow_card' | 'green_card' | 'mobile_override'

// ============================================================================
// COMPONENT
// ============================================================================

export function R1PreflightCheck() {
  const [model, setModel] = useState<ModelId>("8b")
  const [vram, setVram] = useState<VRAMId>("8gb")
  const [environment, setEnvironment] = useState<Environment>("windows")
  const [isMobile, setIsMobile] = useState(false)

  const pathname = usePathname()
  const postSlug = pathname?.split("/").filter(Boolean).pop() || ""

  // Refs for CTA impression tracking
  const gumroadSecurityRef = useRef<HTMLAnchorElement>(null)
  const vultrSecurityRef = useRef<HTMLAnchorElement>(null)
  const deepInfraRedCardRef = useRef<HTMLAnchorElement>(null)
  const vultrRedCardRef = useRef<HTMLAnchorElement>(null)
  const gumroadYellowCardRef = useRef<HTMLAnchorElement>(null)
  const deepInfraYellowCardRef = useRef<HTMLAnchorElement>(null)
  const gumroadGreenCardRef = useRef<HTMLAnchorElement>(null)
  const deepInfraGreenCardRef = useRef<HTMLAnchorElement>(null)

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
  const showSecurityBanner = environment === "windows" || environment === "macos"

  // CTA impression tracking for text links
  useEffect(() => {
    const pageType = getPageType(pathname || "")

    // Security banner Gumroad link impression
    if (showSecurityBanner && gumroadSecurityRef.current) {
      trackCtaImpression({
        dest: "gumroad",
        offer: "survival_kit",
        placement: "green_card",
        pageType,
        slug: postSlug,
        verdict: "green",
        path: pathname,
      })
    }

    // Security banner Vultr link impression
    if (showSecurityBanner && vultrSecurityRef.current) {
      trackCtaImpression({
        dest: "vultr",
        offer: "cloud_gpu",
        placement: "green_card",
        pageType,
        slug: postSlug,
        verdict: "green",
        path: pathname,
      })
    }

    // DeepInfra red card impression
    if (status === "red" && deepInfraRedCardRef.current) {
      trackCtaImpression({
        dest: "deepinfra",
        offer: "api_fallback",
        placement: "red_card",
        pageType,
        slug: postSlug,
        verdict: "red",
        path: pathname,
      })
    }

    // Vultr red card impression
    if (status === "red" && vultrRedCardRef.current) {
      trackCtaImpression({
        dest: "vultr",
        offer: "cloud_gpu",
        placement: "red_card",
        pageType,
        slug: postSlug,
        verdict: "red",
        path: pathname,
      })
    }

    // Gumroad yellow card impression
    if (status === "yellow" && gumroadYellowCardRef.current) {
      trackCtaImpression({
        dest: "gumroad",
        offer: "survival_kit",
        placement: "yellow_card",
        pageType,
        slug: postSlug,
        verdict: "yellow",
        path: pathname,
      })
    }

    // DeepInfra yellow card impression
    if (status === "yellow" && deepInfraYellowCardRef.current) {
      trackCtaImpression({
        dest: "deepinfra",
        offer: "api_fallback",
        placement: "yellow_card",
        pageType,
        slug: postSlug,
        verdict: "yellow",
        path: pathname,
      })
    }

    // Gumroad green card impression
    if (status === "green" && gumroadGreenCardRef.current) {
      trackCtaImpression({
        dest: "gumroad",
        offer: "survival_kit",
        placement: "green_card",
        pageType,
        slug: postSlug,
        verdict: "green",
        path: pathname,
      })
    }

    // DeepInfra green card impression
    if (status === "green" && deepInfraGreenCardRef.current) {
      trackCtaImpression({
        dest: "deepinfra",
        offer: "api_fallback",
        placement: "green_card",
        pageType,
        slug: postSlug,
        verdict: "green",
        path: pathname,
      })
    }
  }, [pathname, postSlug, showSecurityBanner, status])

  // Tracking helpers - use revenue_outbound for Gumroad and DeepInfra per Spec v1.0
  const handleGumroadClick = useCallback((location: AffiliateLocation) => {
    const pageType = getPageType(pathname || "")
    trackRevenueOutbound({
      dest: "gumroad",
      offer: "survival_kit",
      placement: status === "yellow" ? "yellow_card" : "green_card",
      pageType,
      slug: postSlug,
      verdict: status,
      path: pathname,
    })
  }, [pathname, postSlug, status])

  const handleDeepInfraClick = useCallback((location: AffiliateLocation) => {
    const pageType = getPageType(pathname || "")
    trackRevenueOutbound({
      dest: "deepinfra",
      offer: "api_fallback",
      placement: location,
      pageType,
      slug: postSlug,
      verdict: status,
      path: pathname,
    })
  }, [pathname, postSlug, status])

  const handleVultrClick = useCallback((location: AffiliateLocation) => {
    const pageType = getPageType(pathname || "")

    // Double-write: fire BOTH revenue_outbound (canonical) and affiliate_click (legacy)
    trackRevenueOutbound({
      dest: "vultr",
      offer: "cloud_gpu",
      placement: location,
      pageType,
      slug: postSlug,
      verdict: status,
      path: pathname,
    })

    trackAffiliateClick({
      partner: 'vultr',
      status,
      model,
      vram,
      location,
      postSlug,
      path: pathname,
    })
  }, [status, model, vram, postSlug, pathname])

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
          Based on common setups. Results are estimates.
        </p>
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
                  ref={gumroadSecurityRef}
                  href={LINK_KIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleGumroadClick('green_card')}
                  className="underline hover:text-amber-950 dark:hover:text-amber-100 font-medium"
                >
                  Safe Config
                </a>
                {" "}or a{" "}
                <a
                  ref={vultrSecurityRef}
                  href={LINK_CLOUD}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleVultrClick('green_card')}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Your Environment</label>
          <select
            value={environment}
            onChange={(e) => setEnvironment(e.target.value as Environment)}
            className="w-full p-2 rounded border border-input bg-white dark:bg-gray-900 text-sm"
          >
            {ENVIRONMENT_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your VRAM</label>
          <select
            value={vram}
            onChange={(e) => setVram(e.target.value as VRAMId)}
            className="w-full p-2 rounded border border-input bg-white dark:bg-gray-900 text-sm"
          >
            {VRAM_OPTIONS.map(opt => (
              <option key={opt.id} value={opt.id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">{opt.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Target Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value as ModelId)}
            className="w-full p-2 rounded border border-input bg-white dark:bg-gray-900 text-sm"
          >
            {MODEL_IDS.map(id => (
              <option key={id} value={id} className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">{MODELS[id].label}</option>
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
              <AlertTriangle className="w-5 h-5" />
              Status: Local Setup Not Viable
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
              Physics limit reached. VRAM overhead will cause instability or OOM loops.
            </p>
          </div>

          {/* Mobile CTA Override or Desktop RED CTA */}
          {isMobile ? (
            <>
              {/* Primary: DeepInfra API - ALWAYS priority in MOBILE */}
              <a
                href={LINK_API}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDeepInfraClick('mobile_override')}
                className="block p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="flex-1">
                    <div className="font-bold text-blue-900 dark:text-blue-100">
                      Run on Cloud GPU
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      DeepInfra API - Instant access
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
              </a>

              {/* Secondary: Survival Kit */}
              <a
                href={LINK_KIT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleGumroadClick('mobile_override')}
                className="block p-3 rounded-lg border border-text-secondary hover:border-brand-primary transition-all text-center"
              >
                <span className="text-sm text-text-secondary">
                  Get Survival Kit (View Stop Rules)
                </span>
              </a>
            </>
          ) : (
            <>
              {/* Status Header */}
              <div className="flex items-center gap-2 text-red-400 font-semibold">
                <AlertTriangle className="w-5 h-5" />
                Status: Local Setup Not Viable
              </div>

              {/* Primary CTA: DeepInfra API - ALWAYS priority in RED */}
              <a
                ref={deepInfraRedCardRef}
                href={LINK_API}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDeepInfraClick('red_card')}
                className="block p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Cloud className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-blue-900 dark:text-blue-100">
                      Run on Cloud GPU
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      DeepInfra API - Instant access, no setup
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                      Get Started <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Secondary CTA: Survival Kit - Decision boundary */}
              <div className="text-center mt-3">
                <a
                  href={LINK_KIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleGumroadClick('red_card')}
                  className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-brand-primary transition-colors"
                >
                  Get Survival Kit (View Stop Rules) <ExternalLink className="w-3 h-3" />
                </a>
              </div>

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
            </>
          )}
        </div>
      )}

      {/* ====================================================================
          YELLOW STATE (Tight Fit - Optimization Needed)
          ==================================================================== */}
      {status === "yellow" && (
        <div className="space-y-3">
          {/* Status Header */}
          <div className="flex items-center gap-2 text-yellow-400 font-semibold">
            <AlertTriangle className="w-5 h-5" />
            Status: High Risk Zone
          </div>

          {/* Copy: Risk explanation */}
          <p className="text-sm text-yellow-200 dark:text-yellow-100 mb-4">
            You are on the razor's edge. Browser tabs or IDE plugins will crash you.
          </p>

          {/* Mobile CTA Override or Desktop YELLOW CTA */}
          {isMobile ? (
            <>
              {/* Primary: Gumroad - ALWAYS priority in MOBILE YELLOW */}
              <a
                href={LINK_KIT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleGumroadClick('mobile_override')}
                className="block p-5 rounded-lg border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 hover:border-amber-600 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                      Download Survival Kit ($9.90)
                    </div>
                    <p className="text-sm text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
                      Stop rules, red lines, and decision boundaries.
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm font-bold text-amber-700 dark:text-amber-300">
                      Get Started → <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Secondary: Cloud GPU */}
              <a
                href={LINK_CLOUD}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleVultrClick('mobile_override')}
                className="block p-4 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/20 hover:border-purple-400 transition-all text-center"
              >
                <span className="text-sm text-purple-900 dark:text-purple-100">
                  Or rent a Cloud GPU
                </span>
              </a>
            </>
          ) : (
            <>
              {/* Primary CTA: Gumroad - ALWAYS priority in YELLOW */}
              <a
                ref={gumroadYellowCardRef}
                href={LINK_KIT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleGumroadClick('yellow_card')}
                className="block p-5 rounded-lg border-2 border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/20 hover:border-amber-600 hover:shadow-lg hover:shadow-amber-500/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl shadow-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-amber-900 dark:text-amber-100 flex items-center gap-2">
                      Download Survival Kit ($9.90)
                    </div>
                    <p className="text-sm text-amber-800 dark:text-amber-200 mt-1 leading-relaxed">
                      Stop rules, red lines, and decision boundaries.
                    </p>
                    <div className="flex items-center gap-2 mt-3 text-sm font-bold text-amber-700 dark:text-amber-300">
                      See Red Lines → <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>

              {/* Secondary CTA: Cloud GPU */}
              <div className="text-center mt-3">
                <a
                  href={LINK_CLOUD}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleVultrClick('yellow_card')}
                  className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Or rent a Cloud GPU <ExternalLink className="w-3 h-3" />
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
            </>
          )}
        </div>
      )}

      {/* ====================================================================
          GREEN STATE (Ready)
          ==================================================================== */}
      {status === "green" && (
        <div className="space-y-4">
          {/* Status Header */}
          <div className="flex items-center gap-2 text-green-400 font-semibold">
            ✅ Status: Ready (with caveats)
          </div>

          {/* Copy: What this means */}
          <p className="text-sm text-green-200 dark:text-green-100 mb-4">
            Hardware looks good. Bookmark this page for updated boundaries.
          </p>

          {/* Mobile CTA Override or Desktop GREEN CTA */}
          {isMobile ? (
            <>
              {/* Primary: DeepInfra API - ALWAYS priority in MOBILE */}
              <a
                href={LINK_API}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDeepInfraClick('mobile_override')}
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
                onClick={() => handleGumroadClick('mobile_override')}
                className="block p-3 rounded-lg border border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-all"
              >
                <div className="flex items-center gap-2 text-sm">
                  <Package className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="text-amber-900 dark:text-amber-100">Buy Clarity — $9.90</span>
                </div>
              </a>
            </>
          ) : (
            <>
              {/* Primary: DeepInfra API - ALWAYS priority in MOBILE */}
              <a
                href={LINK_API}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleDeepInfraClick('mobile_override')}
                className="block p-4 rounded-lg border-2 border-blue-500 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="flex-1">
                    <div className="font-bold text-blue-900 dark:text-blue-100">
                      Run on Cloud GPU
                    </div>
                    <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      DeepInfra API - Instant access
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
              </a>

              {/* Secondary: Bookmark */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'R1 Pre-flight Check',
                      url: window.location.href,
                    })
                  }
                }}
                className="block p-4 rounded-lg border border-text-secondary bg-card hover:border-brand-primary transition-all text-center"
              >
                <span className="text-sm text-text-secondary">
                  Bookmark This Page
                </span>
              </button>

              {/* Trust Element: Recommended Settings (Gray background) */}
              <div className="p-4 rounded-lg border border-border" style={{backgroundColor: '#313131'}}>
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

              {/* Primary CTA: Bookmark - Soft retention for GREEN */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'R1 Pre-flight Check',
                      url: window.location.href,
                    })
                  }
                }}
                className="w-full p-4 rounded-lg border border-brand-primary bg-brand-primary hover:bg-brand-hover text-white font-medium hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
              >
                <span>Bookmark Page for Later</span>
              </button>

              {/* Footer: Buy Me a Coffee */}
              <ConversionButton
                location="tool_green"
                copy="Your hardware is ready. If this tool saved you time, support the dev."
                variant="compact"
              />
            </>
          )}
        </div>
      )}

      {/* ====================================================================
          DECISION BOUNDARY
          This block exists to prevent the calculator from replacing the paid Survival Kit.
          The calculator = possibility. The kit = decision.
          ==================================================================== */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="p-4 rounded-lg border border-border bg-muted/30">
          <h4 className="text-sm font-semibold text-text-primary mb-3">
            What this tool does — and what it doesn't
          </h4>
          <p className="text-sm text-text-secondary mb-3">
            This calculator measures <strong>possibility</strong>.
          </p>
          <p className="text-sm text-text-secondary mb-3">
            It tells you what <em>might</em> work based on VRAM and model size.
          </p>
          <p className="text-sm text-text-secondary mb-4">
            It does <strong>not</strong> tell you:
          </p>
          <ul className="text-sm text-text-secondary mb-4 ml-4 list-disc space-y-1">
            <li>When to stop</li>
            <li>Whether continuing is rational</li>
            <li>How much time you're about to waste</li>
          </ul>
          <p className="text-sm text-text-secondary mb-2">
            If you're still guessing after seeing this result:
          </p>
          <p className="text-sm text-text-secondary mb-3">
            👉 <strong>The Survival Kit exists for what comes next.</strong>
          </p>
          <p className="text-sm text-text-secondary mb-4">
            It doesn't optimize.<br />
            It decides.
          </p>
          <a
            href={LINK_KIT}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors"
          >
            Buy Clarity — $9.90
          </a>
        </div>
      </div>

      {/* JetBrains / Cursor Disclaimer */}
      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-text-tertiary leading-relaxed">
          JetBrains / Cursor users:<br />
          Local R1 failures usually happen <strong>before inference</strong>.<br />
          The red lines are documented inside the Survival Kit.
        </p>
      </div>

      {/* Footer Note */}
      <p className="text-[10px] text-muted-foreground/60 mt-4 text-center">
        *Results are estimates based on common setups. Actual requirements may vary.
      </p>
    </div>
  )
}
