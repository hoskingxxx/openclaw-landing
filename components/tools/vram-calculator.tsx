"use client"

import { useState } from "react"

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

// Decision matrix: model -> vram -> status
const DECISION_MATRIX: Record<string, Record<string, Status>> = {
  "deepseek-r1-full": { "8gb": "red", "12gb": "red", "16gb": "red", "24gb": "red", "48gb": "red" },
  "deepseek-r1-distill-32b": { "8gb": "red", "12gb": "yellow", "16gb": "yellow", "24gb": "green", "48gb": "green" },
  "deepseek-r1-distill-8b": { "8gb": "yellow", "12gb": "green", "16gb": "green", "24gb": "green", "48gb": "green" },
  "llama-3-70b": { "8gb": "red", "12gb": "red", "16gb": "yellow", "24gb": "yellow", "48gb": "green" },
}

// ============================================================================
// Component
// ============================================================================

export function VramCalculator() {
  const [model, setModel] = useState("deepseek-r1-distill-32b")
  const [vram, setVram] = useState("12gb")

  const status = DECISION_MATRIX[model]?.[vram] || "yellow" // Safety fallback

  // Helper for content based on status
  const getContent = (s: Status) => {
    switch(s) {
      case "red": return {
        title: "❌ Hardware Mismatch",
        reason: "You'll hit memory limits in standard setups (OOM likely).",
        cta: "Rent Cloud GPU (Instant Setup) →",
        style: "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
        btn: "bg-red-600 hover:bg-red-700 text-white"
      }
      case "yellow": return {
        title: "⚠️ Technically Possible, But Painful",
        reason: "You're near the memory edge. Expect slowdowns and instability.",
        cta: "Skip the slowdown. Use Cloud GPU →",
        style: "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800",
        btn: "bg-yellow-400 hover:bg-yellow-500 text-yellow-900" // High contrast for accessibility
      }
      default: return {
        title: "✅ Safe Zone",
        reason: "Your local setup should handle this comfortably.",
        cta: null,
        style: "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800",
        btn: ""
      }
    }
  }

  const content = getContent(status)

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

      <div className={`p-4 rounded-lg border ${content.style}`}>
        <p className="font-bold text-lg">{content.title}</p>
        <p className="text-sm mt-1 mb-3 opacity-90">{content.reason}</p>

        {content.cta && (
          <a
            href={`https://www.vultr.com/?ref=9863490&utm_source=calculator&utm_medium=cta&utm_content=${status}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block px-4 py-2 rounded-md text-sm font-bold transition-colors ${content.btn}`}
          >
            {content.cta}
          </a>
        )}
      </div>

      <p className="text-[10px] text-muted-foreground/60 mt-4 text-center">
        *Advanced configurations may change the outcome, but rarely the conclusion.
      </p>
    </div>
  )
}
