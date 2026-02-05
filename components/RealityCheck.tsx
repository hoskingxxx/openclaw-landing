"use client";

import React, { useState } from "react";
import { AlertTriangle, XCircle, CheckCircle2, ShieldAlert, Zap } from "lucide-react";

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

const ENV_OPTIONS = [
  { id: "vps", label: "Cloud VPS / Docker (Isolated)" },
  { id: "local_win", label: "Local Windows (Personal PC)" },
  { id: "local_mac", label: "Local macOS (Daily Driver)" },
];

const DECISION_MATRIX: Record<string, Record<string, "green" | "yellow" | "red">> = {
  "deepseek-r1-distill-14b": { "8gb": "yellow", "12gb": "yellow", "16gb": "green", "24gb": "green", "48gb": "green" },
  "deepseek-r1-distill-32b": { "8gb": "red", "12gb": "yellow", "16gb": "yellow", "24gb": "green", "48gb": "green" },
  "deepseek-r1-distill-70b": { "8gb": "red", "12gb": "red", "16gb": "red", "24gb": "red", "48gb": "yellow" },
  "deepseek-v3-671b": { "8gb": "red", "12gb": "red", "16gb": "red", "24gb": "red", "48gb": "red" },
};

export default function RealityCheck() {
  const [model, setModel] = useState(MODEL_OPTIONS[1].id);
  const [vram, setVram] = useState(VRAM_OPTIONS[1].id);
  const [env, setEnv] = useState(ENV_OPTIONS[1].id);

  const hwStatus = DECISION_MATRIX[model]?.[vram] || "red";
  const isLocal = env.includes("local");
  const securityRisk = isLocal;

  const getContent = () => {
    const baseBtn = "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20";

    if (securityRisk) {
      return {
        icon: <ShieldAlert className="w-5 h-5 text-orange-500" />,
        title: "Reality: Security Risk",
        badge: "UNSAFE",
        badgeColor: "bg-orange-500/20 text-orange-500 border-orange-500/30",
        reason: "Running AI agents on a personal OS exposes your files to RCE risks. Mainstream media warns against local execution without sandboxing.",
        btn: baseBtn,
        btnText: "Switch to Secure Cloud Sandbox",
        bg: "bg-orange-500/5 border-orange-500/20",
        event: "Conversion-Security-Risk"
      };
    }

    switch (hwStatus) {
      case "green":
        return {
          icon: <CheckCircle2 className="w-5 h-5 text-green-500" />,
          title: "Reality: Optimal",
          badge: "SMOOTH",
          badgeColor: "bg-green-500/20 text-green-500 border-green-500/30",
          reason: "Your hardware meets the requirements. Isolated environment confirmed.",
          btn: baseBtn,
          btnText: "Deploy High-Performance Cloud GPU",
          bg: "bg-green-500/5 border-green-500/20",
          event: "Conversion-Hardware-Optimal"
        };
      case "yellow":
        return {
          icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
          title: "Reality: Painful",
          badge: "LAGGY",
          badgeColor: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
          reason: "Even in the cloud, this model might be slow on smaller instances. Expect pauses.",
          btn: baseBtn,
          btnText: "Upgrade to Faster Instance",
          bg: "bg-yellow-500/5 border-yellow-500/20",
          event: "Conversion-Hardware-Painful"
        };
      default:
        return {
          icon: <XCircle className="w-5 h-5 text-red-500" />,
          title: "Reality: Crash",
          badge: "IMPOSSIBLE",
          badgeColor: "bg-red-500/20 text-red-500 border-red-500/30",
          reason: "Hardware insufficient for this model size. Instant OOM expected.",
          btn: baseBtn,
          btnText: "Get Enterprise-Grade VRAM",
          bg: "bg-red-500/5 border-red-500/20",
          event: "Conversion-Hardware-Crash"
        };
    }
  };

  const content = getContent();
  // 增加 UTM 参数和 Umami 事件追踪
  const affLink = `https://www.vultr.com/?ref=9863490&utm_source=openclaw_tool&utm_medium=calculator&utm_campaign=${securityRisk ? 'security_risk' : hwStatus}`;

  return (
    <div className="my-8 p-6 rounded-xl border border-border bg-card shadow-sm text-card-foreground">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-primary fill-primary" />
        <h3 className="text-xl font-bold tracking-tight">AI Deployment Reality Check</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-6">
        {/* Environment Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-muted-foreground">Environment</label>
          <select
            value={env}
            onChange={(e) => setEnv(e.target.value)}
            className="w-full p-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            {ENV_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
          </select>
        </div>
        {/* Model Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-muted-foreground">Target Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full p-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            {MODEL_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
          </select>
        </div>
        {/* VRAM Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium leading-none text-muted-foreground">Local VRAM</label>
          <select
            value={vram}
            onChange={(e) => setVram(e.target.value)}
            className="w-full p-2 rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            {VRAM_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
          </select>
        </div>
      </div>

      {/* Result Card */}
      <div className={`p-5 rounded-lg border ${content.bg} transition-all duration-300 relative overflow-hidden`}>
        <div className="flex items-center gap-3 mb-2 relative z-10">
          {content.icon}
          <span className="font-bold uppercase text-sm tracking-wide">{content.title}</span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${content.badgeColor}`}>
            {content.badge}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-5 leading-relaxed relative z-10">
          {content.reason}
        </p>

        <a
          href={affLink}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event={content.event}
          data-umami-event-model={model}
          data-umami-event-env={env}
          className={`inline-flex w-full items-center justify-center rounded-md px-4 py-3 text-sm font-bold transition-transform hover:scale-[1.01] ${content.btn}`}
        >
          {content.btnText}
        </a>
      </div>

      <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest opacity-70">
        Secure Infrastructure | DeepSeek R1 Ready
      </p>
    </div>
  );
}
