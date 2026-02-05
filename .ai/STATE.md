# OpenClaw Project State

**Last Updated:** 2026-02-05
**Status:** Live on Vercel (13 articles published)

---

## PROJECT OVERVIEW

**Name:** OpenClaw AI Survival Guide
**Description:** Battle-tested guide for running DeepSeek R1 locally with OpenClaw
**Goal:** Help developers avoid errors and successfully run local LLMs

**Deployed URLs:**
- Production: https://openclaw-ai.org
- Vercel URL: https://openclaw-landing.vercel.app
- GitHub: https://github.com/hoskingxxx/openclaw-landing

---

## TECH STACK

### Frontend
- **Framework:** Next.js 16.1.6 (App Router)
- **UI:** React 19.2.4, Tailwind CSS 3.4.17
- **Components:** Shadcn UI (in `components/ui/`)
- **Icons:** Lucide React
- **Theme:** Dark mode first, orange/red brand colors (#FF4500)

### Content
- **Format:** MDX for blog posts
- **Processing:** gray-matter, remark, remark-html
- **Location:** `content/posts/*.mdx`
- **Metadata SSOT:** `lib/blog.ts`

### SEO Infrastructure
- `app/robots.ts` - Robots.txt generator
- `app/sitemap.ts` - Dynamic sitemap with blog posts
- `app/icon.svg` - Lobster emoji favicon 🦞
- Breadcrumb schema on guide pages
- `npm run validate` - Build-time validation
- Umami Analytics (ID: 5db90e55-9103-490f-8df0-9636a84942c8)
- Impact Radius verification (2f0e85b6-bb5c-46ca-81f2-11cb12e06541)

---

## CURRENT PAGES/ROUTES

| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | ✅ Home |
| `/guides` | `app/guides/page.tsx` | ✅ Guide listing (13 posts) |
| `/guides/[slug]` | `app/guides/[slug]/page.tsx` | ✅ Dynamic guides |
| `/docs` | `app/docs/page.tsx` | ✅ Documentation |
| `/troubleshooting` | `app/troubleshooting/page.tsx` | ✅ Troubleshooting + CTA |
| `/resources` | `app/resources/page.tsx` | ✅ Resources |

---

## CONTENT LIBRARY (13 Articles)

### Blog Posts (in `lib/blog.ts`)

| # | Slug | Title | Date | Category |
|---|------|-------|------|----------|
| 1 | `how-to-use-deepseek-with-openclaw` | Running OpenClaw with DeepSeek R1: The Unofficial, Battle-Tested Guide | 2026-02-01 | Tutorial |
| 2 | `openclaw-security-rce-cve-2026-25253` | CVE-2026-25253: OpenClaw RCE Vulnerability - Critical Security Alert | 2026-02-03 | Security (Featured) |
| 3 | `fix-openclaw-json-mode-errors` | How to fix OpenClaw JSON Mode parsing errors with DeepSeek R1 | 2026-02-03 | Troubleshooting |
| 4 | `fix-openclaw-cuda-oom-errors` | Fix OpenClaw CUDA OOM: The $0.50 Solution vs. The 4-Hour Debug | 2026-02-03 | Troubleshooting |
| 5 | `fix-openclaw-slow-inference` | OpenClaw Slow Inference? Why 3.5s/token Is Normal (And How to Fix It) | 2026-02-04 | Troubleshooting |
| 6 | `fix-openclaw-spawn-npm-enoent` | Fix 'Failed to start CLI: Error: spawn npm ENOENT' in OpenClaw | 2026-02-04 | Troubleshooting |
| 7 | `fix-openclaw-spawn-npm-enoent-windows` | Fix 'Failed to start CLI: Error: spawn npm ENOENT' on Windows | 2026-02-04 | Troubleshooting |
| 8 | `fix-openclaw-spawn-einval-windows` | Fix 'Failed to start CLI: Error: spawn EINVAL' in OpenClaw | 2026-02-04 | Troubleshooting |
| 9 | `fix-openclaw-docker-eacces-permission-denied` | Fix 'Error: EACCES: permission denied' in OpenClaw Docker (openclaw.json) | 2026-02-04 | Troubleshooting |
| 10 | `fix-openclaw-cannot-find-module-clipboard-linux-arm` | Fix 'Cannot find module @mariozechner/clipboard-linux-arm-gnueabihf' in OpenClaw | 2026-02-04 | Troubleshooting |
| 11 | `fix-openclaw-install-ps1-npm-enoent-windows` | Fix 'npm error code ENOENT' in install.ps1 on Windows | 2026-02-04 | Troubleshooting |
| 12 | `fix-openclaw-package-json-missing-openclaw-extensions` | Fix 'package.json missing openclaw.extensions' error | 2026-02-04 | Troubleshooting |
| 13 | `openclaw-error-index` | OpenClaw Error Index (Master Dictionary) | 2026-02-04 | Troubleshooting |

**Total Posts:** 13
**Categories:** Security (1), Tutorial (1), Troubleshooting (11)

---

## CONTENT CLUSTERS

### Windows Troubleshooting Cluster
- install.ps1 ENOENT → spawn npm ENOENT → spawn EINVAL
- Forms the "Windows Install Hell" sequence
- All cross-linked internally

### Docker/Linux Cluster
- Docker EACCES → ARM Clipboard compatibility
- Permission and architecture issues

### Performance Cluster
- CUDA OOM → Slow Inference → JSON Mode errors
- Hardware limitation problems

### Plugin/Metadata Cluster
- package.json missing extensions → plugin install errors
- Ecosystem compatibility issues

### Index Page
- Error Index (Master Dictionary)
- Links to all 12 fix articles

---

## MONETIZATION STRATEGY

### Affiliate Partner: Vultr
- **Affiliate ID:** 9863490
- **Link Format:** https://www.vultr.com/?ref=9863490
- **CTA Text:** "Deploy on Vultr (Limited Time Offer)" or "Deploy on Vultr (High Availability & Free Credit)"
- **Placement:** After technical solution, before footer
- **Status:** ✅ ACTIVE (all articles updated)

### Conversion Optimization
- Added CTA card to `/troubleshooting` page footer
- Orange border, high contrast design
- Target: frustrated users who scrolled entire page without solution

---

## KEY FILES TO KNOW

| File | Purpose |
|------|---------|
| `lib/blog.ts` | Blog post metadata (SSOT) - APPEND ONLY |
| `app/troubleshooting/page.tsx` | Troubleshooting page with CTA |
| `app/layout.tsx` | Root layout with metadata |
| `content/posts/*.mdx` | Article content files |

---

## DEPLOYMENT

- **Platform:** Vercel (auto-deploy on push to main)
- **Build:** `npm run build`
- **Validate:** `npm run validate`
- **Branch:** main
- **Last Commit:** b36d2a1 (Git dependency check)

---

## SEO STATUS

### Keywords Targeting
- **Primary:** DeepSeek R1, OpenClaw configuration, Local LLM setup
- **Long-tail:** "openclaw error codes", "openclaw slow", "openclaw install failed", "spawn npm ENOENT"

### Link Health
- **All 13 articles:** ✅ 200 (no 404s)
- **Internal links:** ✅ All validated
- **Affiliate links:** ✅ Active and formatted correctly

---

## NEXT STEPS

1. Monitor GSC for new keyword opportunities
2. Create content for high-traffic error messages
3. Expand plugin ecosystem troubleshooting
4. Add more platform-specific fixes (macOS, Linux variants)
