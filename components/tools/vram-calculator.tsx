/**
 * SSOT: R1 Pre-flight Check Calculator
 * ======================================
 * DO NOT DUPLICATE logic in other tools/pages.
 * Import and reuse this component: import { R1PreflightCheck } from "@/components/tools/vram-calculator"
 *
 * DEV GATE: Any changes to this component require passing `npm run release:gate`
 * 没通过 npm run release:gate 不准合并、不准部署。
 *
 * This is the Single Source of Truth for:
 * - Status calculation (red/yellow/green based on VRAM headroom)
 * - CTA rendering (Vultr, Gumroad, Copy Link, 8B downgrade)
 * - All tracking events (revenue_outbound, cta_click, affiliate_click, etc.)
 *
 * To add this calculator to a new page:
 *   import { R1PreflightCheck } from "@/components/tools/vram-calculator"
 *   <R1PreflightCheck />
 */

"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackAffiliateClick, trackRevenueOutbound, trackCtaImpression, trackCtaClick, getPageType } from "@/lib/tracking"
import { ExternalLink, Cloud, AlertTriangle, Settings, Package, Check } from "lucide-react"
import { PRIMARY_OFFER } from "@/lib/offers"

// ============================================================================
// GLOBAL AFFILIATE LINKS (HARDCODED)
// ============================================================================

const LINK_KIT = "https://hilda666888.gumroad.com/l/ymwwgm"
const LINK_API = "https://deepinfra.com/"
const LINK_CLOUD = PRIMARY_OFFER.url

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

/**
 * Calculate effective VRAM after OS/IDE overhead
 * Cloud: No overhead (isolated environment)
 * Windows: ~3GB overhead (OS + IDE + browser)
 * macOS: ~2GB overhead (window server + IDE)
 */
function getEffectiveVRAM(userVRAM: number, environment: Environment): number {
  const overheadMap: Record<Environment, number> = {
    cloud: 0,
    windows: 3,
    macos: 2,
  }
  return Math.max(0, userVRAM - overheadMap[environment])
}

/**
 * Calculate status based on absolute headroom (in GB)
 * Using effectiveVRAM (after OS/IDE overhead), not raw GPU VRAM
 */
function calculateStatus(requiredVRAM: number, effectiveVRAM: number): Status {
  const headroom = effectiveVRAM - requiredVRAM

  // RED: Not enough VRAM (negative headroom)
  if (headroom < 0) return "red"

  // YELLOW: Edge of stability (less than 2GB headroom)
  if (headroom < 2) return "yellow"

  // GREEN: Comfortable fit (2GB+ headroom)
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

  const [showCopyToast, setShowCopyToast] = useState(false)

  const pathname = usePathname()
  const postSlug = pathname?.split("/").filter(Boolean).pop() || ""

  // Debug mode detection (URL param ?debug=1)
  const [searchParams] = useState(() => {
    if (typeof window === 'undefined') return new URLSearchParams()
    return new URLSearchParams(window.location.search)
  })
  const debugMode = searchParams.get('debug') === '1'

  // Refs for CTA impression tracking (Verdict Gate - only primary CTAs)
  const vultrRedCardRef = useRef<HTMLAnchorElement>(null)
  const gumroadYellowCardRef = useRef<HTMLAnchorElement>(null)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Calculate status using effective VRAM (after OS/IDE overhead)
  const userVRAM = VRAM_OPTIONS.find(o => o.id === vram)!.gb
  const effectiveVRAM = getEffectiveVRAM(userVRAM, environment)
  const requiredVRAM = MODELS[model].requiredVRAM
  const status = calculateStatus(requiredVRAM, effectiveVRAM)
  const headroom = effectiveVRAM - requiredVRAM

  // Safe margin from actual calculation logic (hardcoded 2.0 GB in calculateStatus)
  const SAFE_MARGIN_GB = 2.0

  // Overhead values from actual getEffectiveVRAM logic
  const overheadMap: Record<Environment, number> = {
    cloud: 0,
    windows: 3,
    macos: 2,
  }
  const environmentOverhead = overheadMap[environment]

  // Read-only breakdown for audit trail (all values from existing calculations)
  const breakdown = {
    // Input values
    userVRAM,
    environment,
    model,

    // Computed values (from existing logic, no new assumptions)
    requiredVRAM,
    effectiveVRAM,
    headroom,
    safeMargin: SAFE_MARGIN_GB,
    status,

    // Overheads (only what exists in getEffectiveVRAM, no invented values)
    overheads: {
      osOverhead: environmentOverhead, // Source: overheadMap in getEffectiveVRAM
      ideOverhead: 0, // Bundled into environment overhead
      browserOverhead: 0, // Bundled into environment overhead
    },
  } as const

  // CTA impression tracking - Verdict Gate spec
  useEffect(() => {
    const pageType = getPageType(pathname || "")

    // RED: Vultr primary CTA impression
    if (status === "red" && vultrRedCardRef.current) {
      trackCtaImpression({
        dest: "vultr",
        offer: "cloud_gpu",
        placement: "red_card",
        pageType,
        slug: postSlug,
        verdict: "red",
        path: pathname,
        cta_id: "vultr_red_primary",
        cta_position: "bottom",
        intent: "escape",
        context: "hardware",
      })
    }

    // YELLOW: Gumroad primary CTA impression
    if (status === "yellow" && gumroadYellowCardRef.current) {
      trackCtaImpression({
        dest: "gumroad",
        offer: "survival_kit",
        placement: "yellow_card",
        pageType,
        slug: postSlug,
        verdict: "yellow",
        path: pathname,
        cta_id: "kit_yellow_primary",
        cta_position: "bottom",
        intent: "evaluate",
        context: "hardware",
      })
    }
  }, [pathname, postSlug, status])

  // Tracking helpers - Verdict Gate tracking spec
  const handleGumroadClick = useCallback((location: AffiliateLocation) => {
    const pageType = getPageType(pathname || "")
    // Map status/location to canonical cta_id per spec (semantics in cta_id)
    const ctaIdMap: Record<Status, string> = {
      red: "kit_red_secondary",
      yellow: "kit_yellow_primary",
      green: "kit_green_secondary",
    }

    trackRevenueOutbound({
      dest: "gumroad",
      offer: "survival_kit",
      placement: location,
      pageType,
      slug: postSlug,
      verdict: status,
      path: pathname,
      // Semantics expressed through cta_id only
      dest_type: "gumroad",
      dest_id: "gumroad_ymwwgm",
      cta_id: ctaIdMap[status],
      cta_position: "bottom",
      intent: status === "yellow" ? "evaluate" : "escape",
      context: "hardware",
      offer_revenue: "fix_now",
      // Context: model, vram, environment for analysis
      model,
      vram,
      environment,
    })
  }, [pathname, postSlug, status, model, vram, environment])

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
      // P1: Enrichment
      dest_type: "api",
      dest_id: "deepinfra",
      cta_id: `deepinfra_${status}_${location}`,
      offer_revenue: "try_api",
      // Context: model, vram, environment for analysis
      model,
      vram,
      environment,
    })
  }, [pathname, postSlug, status, model, vram, environment])

  const handleVultrClick = useCallback((location: AffiliateLocation) => {
    const pageType = getPageType(pathname || "")

    // Map status/location to canonical cta_id per spec (semantics in cta_id)
    const ctaIdMap: Record<Status, string> = {
      red: "vultr_red_primary",
      yellow: "vultr_yellow_secondary",
      green: "vultr_green_secondary",
    }

    // Double-write: fire BOTH revenue_outbound (canonical) and affiliate_click (legacy)
    trackRevenueOutbound({
      dest: "vultr",
      offer: "cloud_gpu",
      placement: location,
      pageType,
      slug: postSlug,
      verdict: status,
      path: pathname,
      // Semantics expressed through cta_id only
      dest_type: "vultr",
      dest_id: "vultr_cloud_gpu",
      cta_id: ctaIdMap[status],
      cta_position: "bottom",
      intent: "escape",
      context: "hardware",
      offer_revenue: "escape_local",
      // Context: model, vram, environment for analysis
      model,
      vram,
      environment,
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
  }, [status, model, vram, postSlug, pathname, environment])

  // Save/Share tracking - copies link only (no navigator.share to avoid AbortError)
  const handleBookmarkClick = useCallback((location: AffiliateLocation) => {
    const pageType = getPageType(pathname || "")

    // Copy link to clipboard with fallback
    const copyToClipboard = () => {
      // Modern API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(window.location.href)
      }
      // Fallback for older browsers
      const tempInput = document.createElement("input")
      tempInput.value = window.location.href
      document.body.appendChild(tempInput)
      tempInput.select()
      try {
        document.execCommand("copy")
      } catch (err) {
        console.error("[Copy fallback failed]", err)
      }
      document.body.removeChild(tempInput)
      return Promise.resolve()
    }

    copyToClipboard().then(() => {
      setShowCopyToast(true)
      setTimeout(() => setShowCopyToast(false), 2000)
    })

    // Track the copy action - Verdict Gate spec (semantics in cta_id)
    trackCtaClick({
      path: pathname,
      cta_id: "green_primary_copy",
      cta_position: "bottom",
      intent: "evaluate",
      context: "hardware",
      verdict: status,
      pageType,
      slug: postSlug,
      // Context: model, vram, environment for analysis
      model,
      vram,
      environment,
    })
  }, [pathname, postSlug, status, model, vram, environment])

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
          🔴 RED STATE — Exit Mode (Cloud Dominant)
          ==================================================================== */}
      {status === "red" && (
        <div className="space-y-4">
          {/* Headline */}
          <div className="pb-2 border-b border-red-900/30">
            <h3 className="text-lg font-semibold text-red-400">
              Local setup not viable.
            </h3>
          </div>

          {/* Subline */}
          <p className="text-sm text-red-300/80">
            Your hardware headroom is below stable threshold.
          </p>

          {/* Pressure line (factual) */}
          <p className="text-xs text-text-tertiary italic">
            After OS and IDE overhead, this configuration cannot operate safely.
          </p>

          {/* Primary CTA: Cloud (visually dominant) */}
          <a
            ref={vultrRedCardRef}
            href={LINK_CLOUD}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleVultrClick('red_card')}
            data-testid="cta-vultr"
            className="block p-5 rounded-lg border-2 border-purple-500 bg-purple-600 hover:bg-purple-700 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-lg flex-shrink-0">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="font-bold text-white text-lg">
                    Stop struggling. Move to Cloud
                  </div>
                  {/* Badge (subtle) */}
                  <span className="px-2 py-0.5 text-xs bg-white/20 text-white/80 rounded-full flex-shrink-0">
                    Ready in ~60 seconds
                  </span>
                </div>
                <p className="text-sm text-purple-100 mt-2">
                  Hourly billing. No hardware ceiling.
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-white/60 flex-shrink-0" />
            </div>
          </a>

          {/* Secondary CTA: Survival Kit (muted, 10% visual weight) */}
          <div className="text-center pt-2">
            <a
              href={LINK_KIT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleGumroadClick('red_card')}
              className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Need stop rules + red lines? Get the Survival Kit ($9.90).
            </a>
          </div>
        </div>
      )}

      {/* ====================================================================
          🟡 YELLOW STATE — Fragile Mode (Kit Dominant)
          ==================================================================== */}
      {status === "yellow" && (
        <div className="space-y-4">
          {/* Headline */}
          <div className="pb-2 border-b border-yellow-900/30">
            <h3 className="text-lg font-semibold text-yellow-400">
              You are in the risk zone.
            </h3>
          </div>

          {/* Pressure line (diagnostic, not fear) */}
          <p className="text-sm text-yellow-200/80">
            Under real usage, memory drift typically pushes this configuration into RED.
          </p>

          {/* Factual addition */}
          <p className="text-xs text-text-tertiary">
            Practical headroom is within ~1–2GB.
          </p>

          {/* Primary CTA: Survival Kit (dominant) */}
          <a
            ref={gumroadYellowCardRef}
            href={LINK_KIT}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleGumroadClick('yellow_card')}
            data-testid="cta-gumroad"
            className="block p-5 rounded-lg border-2 border-amber-500 bg-amber-600 hover:bg-amber-700 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white/10 rounded-lg flex-shrink-0">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg">
                  Get the Survival Kit — Stop Rules Inside
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-white/60 flex-shrink-0" />
            </div>
          </a>

          {/* Secondary CTA: Cloud (muted ghost, 15% visual weight) */}
          <div className="pt-2">
            <a
              href={LINK_CLOUD}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleVultrClick('yellow_card')}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-text-tertiary hover:text-text-secondary border border-text-tertiary/30 hover:border-text-tertiary/50 rounded-lg transition-all"
            >
              Skip tuning. Run on Cloud instead.
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* ====================================================================
          🟢 GREEN STATE — Clean Mode (No Hard Sell)
          ==================================================================== */}
      {status === "green" && (
        <div className="space-y-4">
          {/* Headline */}
          <div className="pb-2 border-b border-green-900/30">
            <h3 className="text-lg font-semibold text-green-400">
              Hardware looks sufficient.
            </h3>
          </div>

          {/* Toast feedback */}
          {showCopyToast && (
            <div className="p-3 rounded-lg bg-green-900/30 border border-green-700/50 text-green-300 text-sm text-center flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              Config copied!
            </div>
          )}

          {/* Primary CTA: Copy Config (no monetization) */}
          <button
            onClick={() => {
              handleBookmarkClick('green_card')
            }}
            data-testid="cta-copy-link"
            className="w-full p-4 rounded-lg border border-brand-primary bg-brand-primary hover:bg-brand-hover text-white font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Copy Recommended Config</span>
          </button>

          {/* Recommended Settings (trust element) */}
          <div className="p-4 rounded-lg border border-border bg-muted/30">
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

          {/* Secondary CTA: Survival Kit (muted text link, not primary) */}
          <div className="text-center pt-2">
            <a
              href={LINK_KIT}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleGumroadClick('green_card')}
              className="text-sm text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Want stop rules + ready configs? The Survival Kit saves time.
            </a>
          </div>
        </div>
      )}

      {/* ====================================================================
          DEBUG BREAKDOWN — Make verdict reproducible
          ==================================================================== */}
      <div className="mt-6 pt-6 border-t border-border">
        <details className="group">
          <summary className="cursor-pointer list-none">
            <div className="p-3 rounded-lg border border-dashed border-border bg-muted/20 hover:bg-muted/30 transition-colors">
              <h4 className="text-xs font-mono text-text-tertiary flex items-center gap-2">
                Show calculation details
                <span className="text-text-tertiary group-open:rotate-90 transition-transform">▶</span>
              </h4>
            </div>
          </summary>
          <div className="mt-2 p-4 rounded-lg border border-border bg-muted/30 space-y-3">
            {/* Input Values */}
            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-text-tertiary">Model:</span>{' '}
                <span className="text-text-secondary">{MODELS[model].label}</span>
              </div>
              <div>
                <span className="text-text-tertiary">Environment:</span>{' '}
                <span className="text-text-secondary">{ENVIRONMENT_OPTIONS.find(o => o.id === environment)!.label}</span>
              </div>
            </div>

            {/* Computed Values */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-text-tertiary">Raw VRAM:</span>
                <span className="text-text-secondary">{userVRAM.toFixed(1)} GB</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-text-tertiary">Environment overhead:</span>
                <span className="text-text-secondary">-{(userVRAM - effectiveVRAM).toFixed(1)} GB</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-text-tertiary">Effective VRAM:</span>
                <span className="text-text-secondary font-bold">{effectiveVRAM.toFixed(1)} GB</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-text-tertiary">Required VRAM (4-bit):</span>
                <span className="text-text-secondary">{requiredVRAM.toFixed(1)} GB</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-text-tertiary">Headroom:</span>
                <span className={headroom >= 0 ? "text-green-400" : "text-red-400"}>
                  {headroom.toFixed(1)} GB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-tertiary">Safe margin:</span>
                <span className="text-text-secondary">{SAFE_MARGIN_GB.toFixed(1)} GB</span>
              </div>
            </div>

            {/* Decision Rule */}
            <div className="pt-2 border-t border-border">
              <div className="text-xs text-text-tertiary mb-2">Decision rule:</div>
              <div className="text-xs font-mono space-y-1 text-text-secondary">
                <div className={status === "red" ? "text-red-400 font-bold" : ""}>
                  {status === "red" ? "✓ " : ""}RED if headroom &lt; 0 GB
                </div>
                <div className={status === "yellow" ? "text-yellow-400 font-bold" : ""}>
                  {status === "yellow" ? "✓ " : ""}YELLOW if 0 ≤ headroom &lt; 2 GB
                </div>
                <div className={status === "green" ? "text-green-400 font-bold" : ""}>
                  {status === "green" ? "✓ " : ""}GREEN if headroom ≥ 2 GB
                </div>
              </div>
            </div>
          </div>
        </details>
      </div>

      {/* ====================================================================
          DEBUG MODE AUDIT PANEL — Only renders when ?debug=1
          Shows breakdown with "对账式解释" (reconciliation-style explanation)
          ==================================================================== */}
      {debugMode && (
        <div className="mt-6 pt-6 border-t border-border">
          <details className="group" open>
            <summary className="cursor-pointer list-none">
              <div className="p-3 rounded-lg border border-dashed border-red-500/30 bg-red-950/20 hover:bg-red-950/30 transition-colors">
                <h4 className="text-xs font-mono text-red-400 flex items-center gap-2">
                  🔍 DEBUG BREAKDOWN (audit mode)
                  <span className="text-text-tertiary text-[10px]">?debug=1</span>
                </h4>
              </div>
            </summary>
            <div
              data-testid="debug-breakdown"
              className="mt-2 p-4 rounded-lg border border-red-500/30 bg-muted/30 space-y-3 text-xs font-mono"
            >
              {/* Reconciliation-style explanation (对账式解释) */}
              <div className="p-3 rounded bg-background border border-border">
                <div className="text-text-tertiary mb-2">Reconciliation (对账式解释):</div>
                <div className="text-text-secondary font-bold">
                  {userVRAM.toFixed(1)} - {environmentOverhead.toFixed(1)} = {effectiveVRAM.toFixed(1)}; required {requiredVRAM.toFixed(1)};{' '}
                  {effectiveVRAM.toFixed(1)} {effectiveVRAM >= requiredVRAM ? '≥' : '<'} {requiredVRAM.toFixed(1)} ⇒{' '}
                  <span className={status === 'red' ? 'text-red-400' : status === 'yellow' ? 'text-yellow-400' : 'text-green-400'}>
                    {status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Input values */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-text-tertiary mb-2">Input values</div>
                  <div className="space-y-1">
                    <div>model: <span className="text-text-secondary">{breakdown.model}</span></div>
                    <div>userVRAM: <span className="text-text-secondary">{breakdown.userVRAM} GB</span></div>
                    <div>environment: <span className="text-text-secondary">{breakdown.environment}</span></div>
                  </div>
                </div>
                <div>
                  <div className="text-text-tertiary mb-2">Computed values</div>
                  <div className="space-y-1">
                    <div>requiredVRAM: <span className="text-text-secondary">{breakdown.requiredVRAM} GB</span></div>
                    <div>effectiveVRAM: <span className="text-text-secondary font-bold">{breakdown.effectiveVRAM} GB</span></div>
                    <div>headroom: <span className={breakdown.headroom >= 0 ? 'text-green-400' : 'text-red-400'}>{breakdown.headroom} GB</span></div>
                    <div>safeMargin: <span className="text-text-secondary">{breakdown.safeMargin} GB</span></div>
                    <div>status: <span className="text-text-secondary">{breakdown.status}</span></div>
                  </div>
                </div>
              </div>

              {/* Overheads breakdown */}
              <div className="pt-2 border-t border-border/50">
                <div className="text-text-tertiary mb-2">Overheads (source: getEffectiveVRAM)</div>
                <div className="space-y-1">
                  <div>osOverhead: <span className="text-text-secondary">{breakdown.overheads.osOverhead} GB</span> <span className="text-text-tertiary">(environment overhead from overheadMap)</span></div>
                  <div>ideOverhead: <span className="text-text-secondary">{breakdown.overheads.ideOverhead} GB</span> <span className="text-text-tertiary">(bundled into environment overhead)</span></div>
                  <div>browserOverhead: <span className="text-text-secondary">{breakdown.overheads.browserOverhead} GB</span> <span className="text-text-tertiary">(bundled into environment overhead)</span></div>
                </div>
              </div>

              {/* Decision rule applied */}
              <div className="pt-2 border-t border-border/50">
                <div className="text-text-tertiary mb-2">Decision rule applied:</div>
                <div className="space-y-1 text-text-secondary">
                  <div className={status === 'red' ? 'text-red-400 font-bold' : ''}>
                    {status === 'red' ? '✓ ' : ''}RED: headroom ({headroom.toFixed(1)}) &lt; 0
                  </div>
                  <div className={status === 'yellow' ? 'text-yellow-400 font-bold' : ''}>
                    {status === 'yellow' ? '✓ ' : ''}YELLOW: 0 ≤ headroom ({headroom.toFixed(1)}) &lt; {SAFE_MARGIN_GB}
                  </div>
                  <div className={status === 'green' ? 'text-green-400 font-bold' : ''}>
                    {status === 'green' ? '✓ ' : ''}GREEN: headroom ({headroom.toFixed(1)}) ≥ {SAFE_MARGIN_GB}
                  </div>
                </div>
              </div>
            </div>
          </details>
        </div>
      )}

      {/* ====================================================================
          DECISION BOUNDARY
          This block exists to prevent the calculator from replacing the paid Survival Kit.
          The calculator = possibility. The kit = decision.
          ==================================================================== */}
      <div className="mt-6 pt-6 border-t border-border">
        <details className="group">
          <summary className="cursor-pointer list-none">
            <div className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors">
              <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                What this tool does — and what it doesn't
                <span className="text-text-tertiary group-open:rotate-90 transition-transform">▶</span>
              </h4>
            </div>
          </summary>
          <div className="p-4 rounded-lg border border-t-0 border-border bg-muted/30">
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
            {status !== "green" && (
              <a
                href={LINK_KIT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleGumroadClick('green_card')}
                className="text-sm text-text-secondary hover:text-text-primary underline underline-offset-4 transition-colors"
              >
                Buy Clarity — $9.90
              </a>
            )}
          </div>
        </details>
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
