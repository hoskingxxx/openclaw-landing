# OpenClaw Project State

**Last Updated:** 2026-02-04
**Status:** Live on Vercel (fixed build error)

---

## PROJECT OVERVIEW

**Name:** OpenClaw AI Survival Guide
**Description:** Battle-tested guide for running DeepSeek R1 locally with OpenClaw
**Goal:** Help developers avoid OOM errors and successfully run local LLMs

**Deployed URLs:**
- Production (DNS issues): https://openclaw-ai.org
- Vercel URL (working): https://openclaw-landing.vercel.app
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

### SEO Infrastructure
- `app/robots.ts` - Robots.txt generator
- `app/sitemap.ts` - Dynamic sitemap with blog posts
- `app/icon.svg` - Lobster emoji favicon 🦞
- `app/icon.tsx` - Favicon generator (PNG)
- `app/apple-icon.tsx` - iOS icon
- `app/manifest.ts` - PWA manifest
- Breadcrumb schema on guide pages
- `npm run check:links` - Linkinator crawler validation

### Analytics
- Umami Analytics (ID: 5db90e55-9103-490f-8df0-9636a84942c8)
- Google Search Console verified

---

## CURRENT PAGES/ROUTES

| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | ✅ Home |
| `/guides` | `app/guides/page.tsx` | ✅ Guide listing |
| `/guides/[slug]` | `app/guides/[slug]/page.tsx` | ✅ Dynamic guides |
| `/docs` | `app/docs/page.tsx` | ✅ Documentation |
| `/faq` | `app/faq/page.tsx` | ✅ FAQ |
| `/troubleshooting` | `app/troubleshooting/page.tsx` | ✅ Troubleshooting |
| `/oom` | `app/oom/page.tsx` | ✅ OOM help |
| `/quick-start` | `app/quick-start/page.tsx` | ✅ Quick start |
| `/resources` | `app/resources/page.tsx` | ✅ Resources |

---

## CONTENT LIBRARY

### Blog Posts (in `lib/blog.ts`)

| Slug | Title | Date | Category |
|------|-------|------|----------|
| `how-to-use-deepseek-with-openclaw` | Running OpenClaw with DeepSeek R1: The Unofficial, Battle-Tested Guide | 2026-02-01 | Tutorial |
| `fix-openclaw-json-mode-errors` | How to fix OpenClaw JSON Mode parsing errors with DeepSeek R1 | 2026-02-03 | Troubleshooting |
| `fix-openclaw-cuda-oom-errors` | Fix OpenClaw CUDA OOM: The $0.50 Solution vs. The 4-Hour Debug | 2026-02-03 | Troubleshooting |
| `openclaw-security-rce-cve-2026-25253` | CVE-2026-25253: OpenClaw RCE Vulnerability - Critical Security Alert | 2026-02-03 | Security |
| `fix-openclaw-slow-inference` | OpenClaw Slow Inference? Why 3.5s/token Is Normal (And How to Fix It) | 2026-02-04 | Troubleshooting |

**Total Posts:** 5

### Content Files (in `content/posts/`)
- `how-to-use-deepseek-with-openclaw.mdx`
- `fix-openclaw-json-mode-errors.mdx`
- `fix-openclaw-cuda-oom-errors.mdx`
- `openclaw-security-rce-cve-2026-25253.mdx`
- `fix-openclaw-slow-inference.mdx` (NEW)

---

## KEY FILES TO KNOW

| File | Purpose |
|------|---------|
| `lib/blog.ts` | Blog post metadata (SSOT) |
| `lib/content.ts` | FAQ and other content data |
| `app/layout.tsx` | Root layout with global metadata |
| `app/globals.css` | Global styles with mobile-first rules |
| `next.config.mjs` | Next.js config (minimal - no redirects) |
| `components/SEO/StructuredData.tsx` | Schema.org components |

---

## KNOWN ISSUES

1. **DNS Configuration:** Domain `openclaw-ai.org` points to wrong IPs (Heroku instead of Vercel)
   - Vercel URL works: https://openclaw-landing.vercel.app
   - Need to update DNS to point to `cname.vercel-dns.com`

2. **Redirect Loop (FIXED):** Previously had infinite redirect due to trailing slash rules
   - Resolved by simplifying `next.config.mjs`
   - Hardcoded `FEATURED_POST_PATH` in `app/page.tsx`

3. **404 Error Rate (FIXED):** 31% 404 error rate in GSC due to broken internal links
   - Fixed 12 internal links pointing to `/posts/` instead of `/guides/`
   - All internal links now correctly point to `/guides/{slug}`

4. **Build Error (FIXED):** Missing `lucide-react` dependency caused build failures
   - Installed `lucide-react` package
   - Build now succeeds on Vercel

---

## SEO KEYWORDS TARGETING

### Primary Focus
- DeepSeek R1
- OpenClaw configuration
- Local LLM setup
- CUDA OOM errors
- VRAM requirements
- torch.cuda.OutOfMemoryError

### Long-tail Keywords
- "DeepSeek R1 crash"
- "OpenClaw OOM"
- "Ollama crash"
- "MPS out of memory"
- "OpenClaw slow" (ranking #6 - now has dedicated page)

---

## DEPLOYMENT

- **Platform:** Vercel (auto-deploy on push to main)
- **Build:** `npm run build`
- **Validate:** `npm run validate`
- **Branch:** main

---

## NEXT STEPS (from TASK_BOARD.md)

1. Create more content targeting long-tail DeepSeek keywords
2. Fix DNS for openclaw-ai.org domain
3. Add "OpenClaw security" content (DONE - CVE article published)
4. Create video content using scripts in `assets/video_scripts/`
5. Set up affiliate links for VPS recommendations
