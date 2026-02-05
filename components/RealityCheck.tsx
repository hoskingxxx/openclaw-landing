"use client";

import React, { useState } from "react";
import { AlertTriangle, XCircle, CheckCircle2, Zap } from "lucide-react";

const MODEL_OPTIONS = [
  { id: "deepseek-r1-distill-14b", label: "DeepSeek R1 Distill (14B)" },
  { id: "deepseek-r1-distill-32b", label: "DeepSeek R1 Distill (32B)" },
  { id: "deepseek-r1-distill-70b", label: "DeepSeek R1 Distill (70B)" },
  { id: "deepseek-v3-671b", label: "DeepSeek-V3 (671B Full)" },
];

const VRAM_OPTIONS = [
  { id: "8gb", label: "8GB (RTX 3060/4060 class)", value: 8 },
  { id: "12gb", label: "12GB (RTX 3060/4070 class)", value: 12 },
  { id: "16gb", label: "16GB (RTX 4080 class)", value: 16 },
  { id: "24gb", label: "24GB (RTX 3090/4090 class)", value: 24 },
  { id: "48gb", label: "48GB+ (Multi-GPU / A6000)", value: 48 },
];

// 决策矩阵：保守劝退策略
const DECISION_MATRIX: Record<string, Record<string, "green" | "yellow" | "red">> = {
  "deepseek-r1-distill-14b": { "8gb": "yellow", "12gb": "yellow", "16gb": "green", "24gb": "green", "48gb": "green" },
  "deepseek-r1-distill-32b": { "8gb": "red", "12gb": "yellow", "16gb": "yellow", "24gb": "green", "48gb": "green" },
  "deepseek-r1-distill-70b": { "8gb": "red", "12gb": "red", "16gb": "red", "24gb": "red", "48gb": "yellow" },
  "deepseek-v3-671b": { "8gb": "red", "12gb": "red", "16gb": "red", "24gb": "red", "48gb": "red" },
};

export default function RealityCheck() {
  const [model, setModel] = useState(MODEL_OPTIONS[1].id);
  const [vram, setVram] = useState(VRAM_OPTIONS[1].id);

  const status = DECISION_MATRIX[model]?.[vram] || "red";

  const getContent = () => {
    // 统一 CTA 样式，不再使用黄色按钮
    const baseBtn = "bg-primary text-primary-foreground hover:bg-primary/90";

    switch (status) {
      case "green":
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
          title: "Reality: Optimal",
          badge: "SMOOTH",
          badgeColor: "bg-green-500/20 text-green-500 border-green-500/30",
          reason: "Your hardware meets the requirements for reasonable inference speeds.",
          btn: baseBtn,
          bg: "bg-green-500/5 border-green-500/20"
        };
      case "yellow":
        return {
          icon: <AlertTriangle className="w-5 h-5 text-orange-500" />,
          title: "Reality: Painful",
          badge: "LAGGY",
          badgeColor: "bg-orange-500/20 text-orange-500 border-orange-500/30",
          // 采用 Survivor Voice 文案
          reason: "Expect long pauses and sluggish iteration. Fine for quick tests, frustrating for real work.",
          btn: baseBtn,
          bg: "bg-orange-500/5 border-orange-500/20"
        };
      default:
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          title: "Reality: Crash",
          badge: "IMPOSSIBLE",
          badgeColor: "bg-red-500/20 text-red-500 border-red-500/30",
          reason: "Physical limitations reached. Instant Out-Of-Memory error or unbearable lag (seconds per token).",
          btn: baseBtn,
          bg: "bg-red-500/5 border-red-500/20"
        };
    }
  };

  const content = getContent();
  const affLink = `https://www.vultr.com/?ref=9863490&utm_source=openclaw_tool&utm_medium=calculator&utm_campaign=${status}`;

  return (
    <div className="my-8 p-6 rounded-xl border border-border bg-card shadow-sm text-card-foreground">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-primary fill-primary" />
        <h3 className="text-xl font-bold tracking-tight">VRAM Reality Check</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-muted-foreground">Target Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            // 修复白洞：使用 bg-card 和 focus ring
            className="w-full p-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            {MODEL_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-muted-foreground">Local GPU VRAM</label>
          <select
            value={vram}
            onChange={(e) => setVram(e.target.value)}
            // 修复白洞
            className="w-full p-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            {VRAM_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      {/* 结果卡片 */}
      <div className={`p-4 rounded-lg border ${content.bg} transition-all duration-300`}>
        <div className="flex items-center gap-3 mb-2">
          {content.icon}
          <span className="font-bold uppercase text-sm tracking-wide">{content.title}</span>
          {/* 新增 Visual Badge */}
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${content.badgeColor}`}>
            {content.badge}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {content.reason}
        </p>

        <a
          href={affLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition-transform hover:scale-[1.01] shadow-sm ${content.btn}`}
        >
          {status === "green" ? "Deploy High-Performance Cloud GPU" : "Skip the Slowdown → Deploy on Vultr"}
        </a>
      </div>

      <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest opacity-70">
        Limited Time Offer | Enterprise GPU Infrastructure
      </p>
    </div>
  );
}
