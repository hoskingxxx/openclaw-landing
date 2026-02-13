#!/usr/bin/env node
/**
 * CTA Lint - Enforce CTA weight/compliance rules
 *
 * Prevents regression of:
 * - Multiple strong CTAs per page
 * - Default Cloud CTA on preflight (should be gated)
 * - Multiple saturated button colors
 * - Hardcoded Vultr links without proper components
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const STRICT = process.argv.includes("--strict");

const EXTS = new Set([".ts", ".tsx", ".js", ".jsx"]);

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next" || e.name === "dist") continue;
      walk(p, out);
    } else if (e.isFile()) {
      const ext = path.extname(e.name);
      if (EXTS.has(ext)) out.push(p);
    }
  }
  return out;
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function countOccurrences(haystack, needle) {
  let count = 0;
  let idx = 0;
  while (true) {
    idx = haystack.indexOf(needle, idx);
    if (idx === -1) break;
    count++;
    idx += needle.length;
  }
  return count;
}

function rel(p) {
  return path.relative(ROOT, p);
}

// --- Targets ---
const appDir = path.join(ROOT, "app");
if (!fs.existsSync(appDir)) {
  console.error("[CTA-LINT] No ./app directory found. Abort.");
  process.exit(2);
}

const allFiles = walk(appDir);
const pageFiles = allFiles.filter((f) => /\/page\.(t|j)sx?$/.test(f) && !/\/api\//.test(f));

const errors = [];
const warnings = [];

// --- Rule A: per-page PrimaryCTA count <= 1 ---
for (const f of pageFiles) {
  const s = read(f);
  const n = countOccurrences(s, "<PrimaryCTA");
  if (n > 1) {
    errors.push(`[CTA-LINT][A] Too many PrimaryCTA in ${rel(f)}: ${n}`);
  }
}

// Helper: find a page file by route segment (best-effort)
function findRoutePage(route) {
  // route: "preflight" => app/preflight/page.*
  const direct = pageFiles.find((f) => f.includes(`${path.sep}${route}${path.sep}page.`));
  return direct || null;
}

// --- Rule B: preflight ungated cloud CTA ---
const preflight = findRoutePage("preflight");
if (preflight) {
  const s = read(preflight);

  const cloudNeedles = [
    "Move to Cloud",
    "Launch Cloud",
    "Deploy on Vultr",
    "Deploy Cloud GPU",
    "Vultr",
    "cloud sandbox",
    "Cloud Sandbox",
  ];

  const hasCloudText = cloudNeedles.some((n) => s.includes(n));
  if (hasCloudText) {
    const gatingTokens = ["verdict", "hasChecked", "didCheck", "result", "submitted", "isCalculated"];
    const hasGatingVar = gatingTokens.some((t) => s.includes(t));
    const hasConditionalSyntax = s.includes("&&") || s.includes("?:") || s.includes("?") || s.includes("if (") || s.includes("switch");
    if (!hasGatingVar || !hasConditionalSyntax) {
      errors.push(`[CTA-LINT][B] Preflight Cloud CTA appears ungated in ${rel(preflight)}`);
    }
  }
} else {
  warnings.push("[CTA-LINT] preflight page not found (skipped Rule B).");
}

// --- Rule C: multiple saturated bg colors ---
const saturatedPrefixes = ["bg-orange-", "bg-purple-", "bg-green-", "bg-red-"];
for (const f of pageFiles) {
  const s = read(f);
  const hit = new Set();
  for (const pfx of saturatedPrefixes) {
    if (s.includes(pfx)) hit.add(pfx);
  }
  if (hit.size > 1) {
    const msg = `[CTA-LINT][C] Multiple saturated bg-* colors in ${rel(f)}: ${Array.from(hit).join(", ")}`;
    if (STRICT) errors.push(msg);
    else warnings.push(msg);
  }
}

// --- Rule D: OOM hardcoded Vultr link without CTA/offers ---
const oom = findRoutePage("oom");
if (oom) {
  const s = read(oom);
  const hasVultr = s.includes("vultr.com/?ref=") || s.includes("Deploy on Vultr");
  if (hasVultr) {
    const hasOffersImport = s.includes("lib/offers") || s.includes('from "@/lib/offers"') || s.includes("from '@/lib/offers'");
    const hasCtaComponent = s.includes("ContextCTA") || s.includes("CloudCTA") || s.includes("<ContextCTA") || s.includes("<CloudCTA");
    if (!hasOffersImport && !hasCtaComponent) {
      errors.push(`[CTA-LINT][D] OOM has hardcoded Vultr link without CTA component/offers in ${rel(oom)}`);
    }
  }
} else {
  warnings.push("[CTA-LINT] oom page not found (skipped Rule D).");
}

// --- Report ---
for (const w of warnings) console.warn(w);
for (const e of errors) console.error(e);

if (errors.length) {
  console.error(`\n[CTA-LINT] FAILED with ${errors.length} error(s).`);
  process.exit(1);
}
console.log(`\n[CTA-LINT] PASSED (${warnings.length} warning(s)).`);
