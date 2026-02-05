#!/usr/bin/env node
/**
 * Generates:
 * 1) content/posts/openclaw-agent-api-cost-model.mdx (refuse overwrite)
 * 2) appends one entry to lib/blog.ts (append-only; refuse if slug exists)
 *
 * Constraints:
 * - Additive only
 * - No sed
 * - No config overwrites
 */

import fs from "node:fs";
import path from "node:path";

const SLUG = "openclaw-agent-api-cost-model";
const CANONICAL = `/guides/${SLUG}`;
const OUT_MDX = path.resolve(process.cwd(), `content/posts/${SLUG}.mdx`);
const BLOG_TS = path.resolve(process.cwd(), "lib/blog.ts");

// Content playbook constants
const AUTHOR = "LazyDev";
const CATEGORY = "Troubleshooting"; // allowed: "Security", "Tutorial", "Troubleshooting"
const DATE = "2026-02-05";

// Affiliate
const VULTR_URL = "https://www.vultr.com/?ref=9863490";
const VULTR_CTA = "Deploy on Vultr (Limited Time Offer)";

// Assumptions (explicitly labeled)
const assumptions = {
  loopsPerTask: 5,
  ctxTokensPerLoop: 10_000,
  outTokensPerLoop: 2_000,
  apiInUsdPer1M: 0.14,
  apiOutUsdPer1M: 0.28,
  tasksPerDay: 50,
  daysPerMonth: 30,
  gpuUsdPerHour: 2.5,
};

function fmtUsd(x) {
  return `${x.toFixed(2)}`;
}

function refuseOverwrite(filePath) {
  if (fs.existsSync(filePath)) {
    throw new Error(`Refusing to overwrite existing file: ${filePath}`);
  }
}

function ensureDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readFileOrThrow(filePath) {
  if (!fs.existsSync(filePath)) throw new Error(`Missing required file: ${filePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function assertSlugNotPresent(blogText, slug) {
  // Simple, deterministic guard: if slug string already exists, refuse.
  if (blogText.includes(`slug: "${slug}"`) || blogText.includes(`slug:'${slug}'`) || blogText.includes(`"${slug}"`)) {
    throw new Error(`Slug already appears in lib/blog.ts: ${slug}`);
  }
}

function computeCosts() {
  const inTokensTask = assumptions.loopsPerTask * assumptions.ctxTokensPerLoop;
  const outTokensTask = assumptions.loopsPerTask * assumptions.outTokensPerLoop;

  const costTask =
    (inTokensTask / 1_000_000) * assumptions.apiInUsdPer1M +
    (outTokensTask / 1_000_000) * assumptions.apiOutUsdPer1M;

  const costDay = costTask * assumptions.tasksPerDay;
  const costMonth = costDay * assumptions.daysPerMonth;

  return { inTokensTask, outTokensTask, costTask, costDay, costMonth };
}

function buildBreakpointTable(apiMonthly) {
  const hoursPerDayList = [0.5, 1, 2, 3, 4, 6, 8];
  const lines = [];
  lines.push(`| GPU hours/day | GPU monthly cost (assumption) | API monthly cost (assumption) | Cheaper |`);
  lines.push(`|---:|---:|---:|:---|`);
  for (const hpd of hoursPerDayList) {
    const gpuMonthly = hpd * assumptions.daysPerMonth * assumptions.gpuUsdPerHour;
    let cheaper = "API";
    if (gpuMonthly < apiMonthly) cheaper = "Cloud GPU";
    if (Math.abs(gpuMonthly - apiMonthly) < 0.005) cheaper = "≈ Tie";
    lines.push(`| ${hpd} | ${fmtUsd(gpuMonthly)} | ${fmtUsd(apiMonthly)} | ${cheaper} |`);
  }
  return lines.join("\n");
}

function buildFaqJsonLd() {
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why do OpenClaw agents consume more tokens than chat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Agents run in loops: they re-read context and produce new output multiple times per task. Token usage scales with loop count and context size."
        }
      },
      {
        "@type": "Question",
        "name": "How do I estimate my monthly API cost for agent debugging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Estimate tokens per loop (context read + output), multiply by loops per task and tasks per day, then apply your provider's input/output prices."
        }
      },
      {
        "@type": "Question",
        "name": "When is fixed-cost GPU cheaper than API?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "When your monthly API spend (from your measured loop/token traces) exceeds the GPU hourly rate multiplied by your usage hours."
        }
      }
    ]
  };
  return JSON.stringify(faq, null, 2);
}

function buildMdx() {
  const { inTokensTask, outTokensTask, costTask, costMonth } = computeCosts();
  const table = buildBreakpointTable(costMonth);
  const faqJsonLd = buildFaqJsonLd();

  const title = "Why OpenClaw Agents Blow Up API Bills: The Loop Cost Model";
  const description = "A math-based model to estimate agent token burn, find the API vs GPU cost breakpoint, and choose the correct architecture.";

  // Playbook: Answer-first, include copy-paste code block in first ~100 words.
  // No hype, no AI disclosure, no placeholders, no dead links.
  return `---
title: "${title}"
description: "${description}"
date: "${DATE}"
author: "${AUTHOR}"
tags: ["openclaw", "agents", "api-cost", "gpu", "deepseek"]
category: "${CATEGORY}"
featured: false
seoKeywords: [
  "openclaw agent cost",
  "openclaw api cost",
  "agent token usage",
  "api vs gpu cost",
  "deepseek agent tokens"
]
---

import RealityCheck from "@/components/RealityCheck"

<script type="application/ld+json">
${"\n"}${faqJsonLd.split("\n").map(l => "  " + l).join("\n")}${"\n"}
</script>

# ${title}

> **TL;DR**
> - If you're debugging an agent, your cost scales with **loop count × context tokens × run count**.
> - Use the snippet below to estimate cost quickly, then compare against fixed-cost compute.
>
> \`\`\`bash
> # Example cost estimate (edit numbers to match your trace + provider pricing)
> node -e "const loops=5,ctx=10000,out=2000,inP=0.14,outP=0.28,runs=50,days=30;
> const inT=loops*ctx, outT=loops*out;
> const perTask=(inT/1e6)*inP+(outT/1e6)*outP;
> console.log('per task $'+perTask.toFixed(4));
> console.log('per month $'+(perTask*runs*days).toFixed(2));"
> \`\`\`

<RealityCheck />

## The Log: what you're seeing

A common pattern: a simple prompt causes repeated "think → tool → think" loops, and the agent keeps re-reading growing context.

## Why this happens (Resource Mismatch)

Agents are loop-based. Each loop reads context (input tokens) and emits output tokens. Even if each loop is "small," total usage accumulates quickly.

## The physics (the math)

### Assumptions (examples)

These are **illustrative** numbers to demonstrate the model. Replace them with your real trace and your provider's published prices.

- Loops per task: **${assumptions.loopsPerTask}**
- Context tokens read per loop: **${assumptions.ctxTokensPerLoop.toLocaleString()}**
- Output tokens per loop: **${assumptions.outTokensPerLoop.toLocaleString()}**
- API pricing (example): input **$${assumptions.apiInUsdPer1M}/1M**, output **$${assumptions.apiOutUsdPer1M}/1M**
- Debug runs per day: **${assumptions.tasksPerDay}**
- Days per month: **${assumptions.daysPerMonth}**
- Cloud GPU hourly (example): **$${assumptions.gpuUsdPerHour}/hour**

### Tokens per task

- Input tokens per task: **${inTokensTask.toLocaleString()}**
- Output tokens per task: **${outTokensTask.toLocaleString()}**

### Cost per task (example)

Using the example assumptions above:

- Cost per task (example): **$${fmtUsd(costTask)}**
- Cost per month (example): **$${fmtUsd(costMonth)}**

## The Fix: measure your trace, then decide

1) Capture one real agent trace:
- average context tokens read per loop
- average output tokens per loop
- number of loops per task
- tasks per day during debugging

2) Plug those numbers into the model and compute monthly spend.

3) Compare to fixed-cost compute.

## Breakpoint table (API vs Cloud GPU)

${table}

## The "Survival" recommendation (correct architecture)

Local debugging is bounded by your time and your machine. Fixed-cost compute is bounded by runtime, not tokens.

If your measured monthly API spend exceeds your expected GPU monthly runtime spend, move agent debugging to a clean, isolated Linux environment.

[${VULTR_CTA}](${VULTR_URL})

---

## Related Fixes

- [Fix OpenClaw Slow Inference? Why 3.5s/token Is Normal (And How to Fix It)](/guides/fix-openclaw-slow-inference) - Performance bottlenecks and realistic expectations
- [Fix OpenClaw CUDA OOM: The Cloud Solution vs. The 4-Hour Debug](/guides/fix-openclaw-cuda-oom-errors) - VRAM limits and practical mitigation
- [How to fix OpenClaw JSON Mode parsing errors with DeepSeek R1](/guides/fix-openclaw-json-mode-errors) - Structured output failures and model formatting
`;
}

function buildBlogTsEntry() {
  // Keep metadata description <=150 chars.
  const title = "Why OpenClaw Agents Blow Up API Bills: The Loop Cost Model";
  const description = "Math model to estimate agent token burn, find API vs GPU breakpoint, and choose the correct architecture.";
  const tags = ["openclaw", "agents", "api-cost", "gpu", "deepseek"];
  const seoKeywords = [
    "openclaw agent cost",
    "openclaw api cost",
    "agent token usage",
    "api vs gpu cost",
    "deepseek agent tokens"
  ];

  return `
  {
    slug: "${SLUG}",
    canonicalPath: "${CANONICAL}",
    title: "${title}",
    description: "${description}",
    date: "${DATE}",
    author: "${AUTHOR}",
    tags: ${JSON.stringify(tags)},
    category: "${CATEGORY}",
    featured: false,
    seoKeywords: ${JSON.stringify(seoKeywords)},
  },
`;
}

function appendToBlogTs() {
  const blogText = readFileOrThrow(BLOG_TS);
  assertSlugNotPresent(blogText, SLUG);

  // Find the array closing pattern and insert before it
  const entry = buildBlogTsEntry();
  // The file has: "  },\n];" (note: single space before ])
  const arrayEndPattern = /\n  },\n\];/;

  if (!arrayEndPattern.test(blogText)) {
    throw new Error("Cannot find blogPosts array closing pattern in lib/blog.ts");
  }

  // The regex matches: \n  },\n];
  // We want to replace with: \n  },\n{entry}\n];
  // Note: entry starts with \n  { so we don't need extra comma
  const replacement = "\n  },\n" + entry + "\n];";
  const updated = blogText.replace(arrayEndPattern, replacement);

  fs.writeFileSync(BLOG_TS, updated, "utf8");
}

function main() {
  // 1) MDX
  ensureDir(OUT_MDX);
  refuseOverwrite(OUT_MDX);
  fs.writeFileSync(OUT_MDX, buildMdx(), "utf8");

  // 2) blog.ts append
  appendToBlogTs();

  console.log(`Created: ${path.relative(process.cwd(), OUT_MDX)}`);
  console.log(`Updated (append-only): ${path.relative(process.cwd(), BLOG_TS)}`);
}

try {
  main();
} catch (e) {
  console.error(String(e?.message || e));
  process.exit(1);
}
