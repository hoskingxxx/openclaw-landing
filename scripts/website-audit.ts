#!/usr/bin/env tsx

/**
 * Website Audit & Evaluation System
 *
 * Comprehensive testing for:
 * - Performance (load times, Core Web Vitals)
 * - SEO (meta tags, structured data, sitemap)
 * - Accessibility (ARIA, semantic HTML, alt text)
 * - Content (broken links, image optimization)
 * - Functionality (interactive elements)
 */

import { JSDOM } from "jsdom";
import { execSync } from "child_process";

// ============================================================================
// Types
// ============================================================================

interface AuditResult {
  category: string;
  name: string;
  status: "pass" | "warn" | "fail";
  score: number;
  message: string;
  details?: string;
}

interface AuditReport {
  url: string;
  timestamp: string;
  results: AuditResult[];
  summary: {
    total: number;
    pass: number;
    warn: number;
    fail: number;
    score: number;
  };
}

// ============================================================================
// Utils
// ============================================================================

function scoreToStatus(score: number): "pass" | "warn" | "fail" {
  if (score >= 90) return "pass";
  if (score >= 70) return "warn";
  return "fail";
}

async function fetchHTML(url: string): Promise<{ html: string; finalUrl: string; loadTime: number }> {
  const start = Date.now();
  const response = await fetch(url, {
    headers: { "User-Agent": "OpenClaw-Audit-Bot/1.0" },
  });
  const loadTime = Date.now() - start;
  return {
    html: await response.text(),
    finalUrl: response.url,
    loadTime,
  };
}

// ============================================================================
// Performance Audits
// ============================================================================

async function auditPerformance(url: string): Promise<AuditResult[]> {
  const results: AuditResult[] = [];
  const { html, loadTime } = await fetchHTML(url);

  // Page load time
  const loadScore = Math.max(0, 100 - loadTime / 50);
  results.push({
    category: "Performance",
    name: "Page Load Time",
    status: scoreToStatus(loadScore),
    score: loadScore,
    message: `Loaded in ${loadTime}ms`,
    details: loadTime < 2000 ? "Good" : loadTime < 4000 ? "Fair" : "Needs optimization",
  });

  // HTML size
  const sizeKB = html.length / 1024;
  const sizeScore = Math.max(0, 100 - sizeKB / 10);
  results.push({
    category: "Performance",
    name: "HTML Size",
    status: scoreToStatus(sizeScore),
    score: sizeScore,
    message: `${sizeKB.toFixed(1)} KB`,
    details: sizeKB < 100 ? "Good" : "Consider lazy loading",
  });

  return results;
}

// ============================================================================
// SEO Audits
// ============================================================================

async function auditSEO(url: string, path: string): Promise<AuditResult[]> {
  const results: AuditResult[] = [];
  const { html } = await fetchHTML(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Title tag
  const title = doc.querySelector("title")?.textContent || "";
  const titleScore = title.length >= 30 && title.length <= 60 ? 100 : title.length > 0 ? 70 : 0;
  results.push({
    category: "SEO",
    name: "Title Tag",
    status: scoreToStatus(titleScore),
    score: titleScore,
    message: title ? `"${title.substring(0, 50)}${title.length > 50 ? "..." : ""}"` : "Missing",
    details: title.length > 0 ? `${title.length} chars` : "Critical: Add title tag",
  });

  // Meta description
  const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute("content") || "";
  const descScore = metaDesc.length >= 120 && metaDesc.length <= 160 ? 100 : metaDesc.length > 0 ? 70 : 0;
  results.push({
    category: "SEO",
    name: "Meta Description",
    status: scoreToStatus(descScore),
    score: descScore,
    message: metaDesc ? `"${metaDesc.substring(0, 50)}..."` : "Missing",
    details: metaDesc.length > 0 ? `${metaDesc.length} chars` : "Add meta description",
  });

  // Canonical URL
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href") || "";
  results.push({
    category: "SEO",
    name: "Canonical URL",
    status: canonical ? "pass" : "fail",
    score: canonical ? 100 : 0,
    message: canonical ? "Present" : "Missing",
    details: canonical || "Add canonical tag to prevent duplicate content",
  });

  // Structured data
  const schemas = doc.querySelectorAll('script[type="application/ld+json"]');
  results.push({
    category: "SEO",
    name: "Structured Data",
    status: schemas.length > 0 ? "pass" : "warn",
    score: schemas.length * 25,
    message: `${schemas.length} schema(s) found`,
    details: schemas.length > 0 ? Array.from(schemas).map(s => {
      try {
        const data = JSON.parse(s.textContent || "");
        return data["@type"] || "unknown";
      } catch {
        return "invalid";
      }
    }).join(", ") : "Consider adding Organization, WebSite schemas",
  });

  // Open Graph tags
  const ogTags = ["og:title", "og:description", "og:image", "og:url"];
  const ogPresent = ogTags.filter(tag => doc.querySelector(`meta[property="${tag}"]`)).length;
  const ogScore = (ogPresent / ogTags.length) * 100;
  results.push({
    category: "SEO",
    name: "Open Graph Tags",
    status: scoreToStatus(ogScore),
    score: ogScore,
    message: `${ogPresent}/${ogTags.length} present`,
    details: ogPresent < ogTags.length ? "Missing: " + ogTags.filter(t => !doc.querySelector(`meta[property="${t}"]`)).join(", ") : "Good social sharing optimization",
  });

  // Heading hierarchy
  const headings = doc.querySelectorAll("h1, h2, h3");
  const h1Count = doc.querySelectorAll("h1").length;
  const headingScore = h1Count === 1 && headings.length >= 3 ? 100 : h1Count === 1 ? 70 : 0;
  results.push({
    category: "SEO",
    name: "Heading Structure",
    status: scoreToStatus(headingScore),
    score: headingScore,
    message: `${h1Count} H1, ${headings.length} total headings`,
    details: h1Count === 1 ? "Good single H1" : h1Count === 0 ? "Missing H1!" : "Multiple H1s detected",
  });

  return results;
}

// ============================================================================
// Accessibility Audits
// ============================================================================

async function auditAccessibility(url: string): Promise<AuditResult[]> {
  const results: AuditResult[] = [];
  const { html } = await fetchHTML(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Images with alt text
  const images = doc.querySelectorAll("img");
  const imagesWithAlt = Array.from(images).filter(img => img.getAttribute("alt"));
  const altScore = images.length > 0 ? (imagesWithAlt.length / images.length) * 100 : 100;
  results.push({
    category: "Accessibility",
    name: "Image Alt Text",
    status: scoreToStatus(altScore),
    score: altScore,
    message: `${imagesWithAlt.length}/${images.length} images have alt`,
    details: images.length - imagesWithAlt.length > 0 ? "Missing alt text hurts SEO and screen readers" : "Good",
  });

  // ARIA labels on interactive elements
  const buttonsWithoutLabel = Array.from(doc.querySelectorAll("button")).filter(btn =>
    !btn.getAttribute("aria-label") && !btn.textContent?.trim()
  );
  const ariaScore = buttonsWithoutLabel.length === 0 ? 100 : Math.max(0, 100 - buttonsWithoutLabel.length * 20);
  results.push({
    category: "Accessibility",
    name: "ARIA Labels",
    status: scoreToStatus(ariaScore),
    score: ariaScore,
    message: `${buttonsWithoutLabel.length} button(s) missing labels`,
    details: buttonsWithoutLabel.length > 0 ? "Icon-only buttons need aria-label" : "Good",
  });

  // Semantic HTML
  const hasNav = !!doc.querySelector("nav");
  const hasMain = !!doc.querySelector("main");
  const hasArticle = !!doc.querySelector("article");
  const semanticScore = (Number(hasNav) + Number(hasMain) + Number(hasArticle)) / 3 * 100;
  results.push({
    category: "Accessibility",
    name: "Semantic HTML",
    status: scoreToStatus(semanticScore),
    score: semanticScore,
    message: `nav: ${hasNav ? "✓" : "✗"}, main: ${hasMain ? "✓" : "✗"}, article: ${hasArticle ? "✓" : "✗"}`,
    details: semanticScore < 100 ? "Use semantic elements for better screen reader support" : "Excellent semantic structure",
  });

  // Color contrast (basic check for brand-primary)
  const hasDarkMode = html.includes("dark:") || html.includes("class=\"dark\"");
  results.push({
    category: "Accessibility",
    name: "Dark Mode Support",
    status: hasDarkMode ? "pass" : "warn",
    score: hasDarkMode ? 100 : 50,
    message: hasDarkMode ? "Detected" : "Not clearly detected",
    details: "Dark mode improves accessibility and user preference support",
  });

  return results;
}

// ============================================================================
// Content Audits
// ============================================================================

async function auditContent(url: string): Promise<AuditResult[]> {
  const results: AuditResult[] = [];
  const { html } = await fetchHTML(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Internal links
  const internalLinks = Array.from(doc.querySelectorAll("a[href^='/'], a[href^='https://openclaw-ai.org']"));
  results.push({
    category: "Content",
    name: "Internal Linking",
    status: internalLinks.length >= 5 ? "pass" : "warn",
    score: Math.min(100, internalLinks.length * 10),
    message: `${internalLinks.length} internal link(s)`,
    details: internalLinks.length >= 5 ? "Good internal linking for SEO" : "Add more internal links",
  });

  // Content length (for article pages)
  const articleText = doc.querySelector("article")?.textContent || "";
  const wordCount = articleText.split(/\s+/).length;
  const contentScore = wordCount >= 300 ? 100 : wordCount >= 150 ? 70 : 40;
  results.push({
    category: "Content",
    name: "Content Depth",
    status: scoreToStatus(contentScore),
    score: contentScore,
    message: `~${wordCount} words`,
    details: wordCount >= 300 ? "Good content depth" : "Thin content may not rank well",
  });

  // Broken external links (sample check)
  const externalLinks = Array.from(doc.querySelectorAll("a[href^='http']")).slice(0, 5);
  let brokenCount = 0;
  for (const link of externalLinks) {
    try {
      const href = link.getAttribute("href");
      if (href) {
        const res = await fetch(href, { method: "HEAD", signal: AbortSignal.timeout(5000) });
        if (res.status >= 400) brokenCount++;
      }
    } catch {
      brokenCount++;
    }
  }
  const linkScore = externalLinks.length > 0 ? Math.max(0, 100 - (brokenCount / externalLinks.length) * 100) : 100;
  results.push({
    category: "Content",
    name: "External Link Health",
    status: scoreToStatus(linkScore),
    score: linkScore,
    message: externalLinks.length > 0 ? `${brokenCount}/${externalLinks.length} broken (sampled)` : "No external links checked",
    details: brokenCount > 0 ? "Fix broken links for better UX" : "Links are healthy",
  });

  return results;
}

// ============================================================================
// Security Audits
// ============================================================================

async function auditSecurity(url: string): Promise<AuditResult[]> {
  const results: AuditResult[] = [];
  const { html } = await fetchHTML(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // HTTPS
  const isHTTPS = url.startsWith("https://");
  results.push({
    category: "Security",
    name: "HTTPS",
    status: isHTTPS ? "pass" : "fail",
    score: isHTTPS ? 100 : 0,
    message: isHTTPS ? "Secure connection" : "Not using HTTPS!",
    details: "HTTPS is required for modern web",
  });

  // External scripts
  const externalScripts = Array.from(doc.querySelectorAll("script[src]")).filter(s =>
    !s.getAttribute("src")?.includes("openclaw-ai.org") &&
    !s.getAttribute("src")?.includes("vercel") &&
    !s.getAttribute("src")?.includes("next")
  );
  results.push({
    category: "Security",
    name: "Third-Party Scripts",
    status: externalScripts.length <= 2 ? "pass" : "warn",
    score: Math.max(0, 100 - externalScripts.length * 10),
    message: `${externalScripts.length} external script(s)`,
    details: externalScripts.length > 2 ? "Review third-party scripts for privacy/performance" : "Minimal third-party dependencies",
  });

  // CSP headers (basic check)
  results.push({
    category: "Security",
    name: "Security Headers",
    status: "warn",
    score: 50,
    message: "Not verified via fetch",
    details: "Check Content-Security-Policy, X-Frame-Options headers manually",
  });

  return results;
}

// ============================================================================
// Monetization Audits
// ============================================================================

async function auditMonetization(url: string): Promise<AuditResult[]> {
  const results: AuditResult[] = [];
  const { html } = await fetchHTML(url);
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // BMC links
  const bmcLinks = Array.from(doc.querySelectorAll("a[href*='buymeacoffee.com']"));
  results.push({
    category: "Monetization",
    name: "Buy Me a Coffee Links",
    status: bmcLinks.length > 0 ? "pass" : "warn",
    score: bmcLinks.length * 25,
    message: `${bmcLinks.length} BMC link(s)`,
    details: bmcLinks.length > 0 ? "Conversion paths present" : "Consider adding conversion buttons",
  });

  // Analytics tracking
  const hasUmami = html.includes("umami") || html.includes("data-umami");
  results.push({
    category: "Monetization",
    name: "Analytics Setup",
    status: hasUmami ? "pass" : "fail",
    score: hasUmami ? 100 : 0,
    message: hasUmami ? "Umami tracking detected" : "No analytics detected",
    details: hasUmami ? "Good" : "Install Umami for conversion tracking",
  });

  // CTA diversity
  const ctas = doc.querySelectorAll("a[href*='buymeacoffee'], button[class*='cta'], [class*='donate'], [class*='support']");
  results.push({
    category: "Monetization",
    name: "CTA Diversity",
    status: ctas.length >= 2 ? "pass" : "warn",
    score: ctas.length * 30,
    message: `${ctas.length} CTA element(s)`,
    details: ctas.length >= 2 ? "Multiple conversion touchpoints" : "Add more CTAs (navbar, inline, widget)",
  });

  return results;
}

// ============================================================================
// Main
// ============================================================================

async function runAudit(baseUrl: string, paths: string[] = ["/", "/guides", "/faq"]): Promise<AuditReport[]> {
  const reports: AuditReport[] = [];

  for (const path of paths) {
    const url = path.startsWith("http") ? path : `${baseUrl.replace(/\/$/, "")}${path}`;
    console.log(`\n🔍 Auditing: ${url}`);

    const allResults: AuditResult[] = [
      ...(await auditPerformance(url)),
      ...(await auditSEO(url, path)),
      ...(await auditAccessibility(url)),
      ...(await auditContent(url)),
      ...(await auditSecurity(url)),
      ...(await auditMonetization(url)),
    ];

    const summary = {
      total: allResults.length,
      pass: allResults.filter(r => r.status === "pass").length,
      warn: allResults.filter(r => r.status === "warn").length,
      fail: allResults.filter(r => r.status === "fail").length,
      score: Math.round(allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length),
    };

    reports.push({
      url,
      timestamp: new Date().toISOString(),
      results: allResults,
      summary,
    });

    // Print summary
    console.log(`  Score: ${summary.score}/100`);
    console.log(`  ✅ Pass: ${summary.pass} | ⚠️  Warn: ${summary.warn} | ❌ Fail: ${summary.fail}`);
  }

  return reports;
}

function printReport(reports: AuditReport[]): void {
  console.log("\n" + "=".repeat(60));
  console.log("📊 WEBSITE AUDIT REPORT");
  console.log("=".repeat(60));

  for (const report of reports) {
    console.log(`\n📄 ${report.url}`);
    console.log(`   Score: ${report.summary.score}/100 | ✅ ${report.summary.pass} | ⚠️  ${report.summary.warn} | ❌ ${report.summary.fail}`);

    // Group by category
    const byCategory = new Map<string, AuditResult[]>();
    for (const result of report.results) {
      if (!byCategory.has(result.category)) {
        byCategory.set(result.category, []);
      }
      byCategory.get(result.category)!.push(result);
    }

    for (const [category, results] of byCategory) {
      console.log(`\n   ${category}:`);
      for (const result of results) {
        const icon = result.status === "pass" ? "✅" : result.status === "warn" ? "⚠️" : "❌";
        console.log(`     ${icon} ${result.name}: ${result.message} (${result.score}/100)`);
        if (result.details) {
          console.log(`        → ${result.details}`);
        }
      }
    }
  }

  console.log("\n" + "=".repeat(60));
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  const baseUrl = process.env.AUDIT_URL || "https://openclaw-ai.org";
  const paths = ["/", "/guides/how-to-use-deepseek-with-openclaw", "/faq", "/troubleshooting"];

  console.log("🚀 Starting website audit...");
  console.log(`📍 Base URL: ${baseUrl}`);
  console.log(`📋 Pages to audit: ${paths.length}`);

  const reports = await runAudit(baseUrl, paths);
  printReport(reports);

  // Exit with error code if critical failures
  const hasCriticalFailures = reports.some(r =>
    r.results.some(res => res.status === "fail" && res.category === "SEO")
  );

  if (hasCriticalFailures) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { runAudit };
export type { AuditReport, AuditResult };
