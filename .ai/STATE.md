# OpenClaw Project State

**Last Updated:** 2026-02-03
**Status:** Live on Vercel

---

## PROJECT IDENTITY

- **Name:** OpenClaw AI Survival Guide
- **Description:** Battle-tested guide for running DeepSeek R1 locally with OpenClaw
- **Goal:** Help developers avoid OOM errors and successfully run local LLMs
- **Tagline:** "Stop debugging crashes. Start shipping."

---

## DEPLOYED URLS

| URL | Status | Notes |
|-----|--------|-------|
| https://openclaw-landing.vercel.app | ✅ Working | Vercel deployment |
| https://openclaw-ai.org | ⚠️ DNS Issues | Points to wrong IPs |
| https://github.com/hoskingxxx/openclaw-landing | ✅ Active | Main branch |

---

## TECH STACK

### Core
- **Framework:** Next.js 16.1.6 (App Router)
- **UI:** React 19.2.4, Tailwind CSS 3.4.17
- **Components:** Shadcn UI
- **Icons:** Lucide React
- **TypeScript:** v5

### Content System
- **Format:** MDX for blog posts
- **Processing:** gray-matter, remark, remark-html
- **Location:** `content/posts/*.mdx`
- **Metadata:** `lib/blog.ts` (single source of truth)

### Styling
- **Theme:** Dark mode first
- **Brand Colors:** #FF4500 (orange/red)
- **Aesthetic:** "Survivor/Hacker" - terminal vibes, glass cards

### SEO Infrastructure
- `app/robots.ts` - Robots.txt generator
- `app/sitemap.ts` - Dynamic sitemap
- `app/icon.tsx` - Favicon (32x32)
- `app/apple-icon.tsx` - iOS icon (180x180)
- `app/manifest.ts` - PWA manifest
- Schema: Breadcrumb, Article, FAQ, WebSite, SoftwareApplication

### Analytics
- **Umami:** ID: 5db90e55-9103-490f-8df0-9636a84942c8
- **GSC:** Verified

---

## ROUTES STRUCTURE

### Static Pages
| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Home |
| `/guides` | `app/guides/page.tsx` | Guide listing |
| `/docs` | `app/docs/page.tsx` | Documentation |
| `/faq` | `app/faq/page.tsx` | FAQ |
| `/troubleshooting` | `app/troubleshooting/page.tsx` | Troubleshooting |
| `/oom` | `app/oom/page.tsx` | OOM help |
| `/quick-start` | `app/quick-start/page.tsx` | Quick start |
| `/resources` | `app/resources/page.tsx` | Resources |

### Dynamic Pages
| Route Pattern | File | Purpose |
|---------------|------|---------|
| `/guides/[slug]` | `app/guides/[slug]/page.tsx` | Individual guides |

---

## CONTENT LIBRARY

### Blog Posts (in `lib/blog.ts`)

| Slug | Title | Date | Category | Featured |
|------|-------|------|----------|----------|
| `how-to-use-deepseek-with-openclaw` | Running OpenClaw with DeepSeek R1: The Unofficial, Battle-Tested Guide | 2026-02-01 | Tutorial | Yes |

**Total Posts:** 1

### Content Files
- `content/posts/how-to-use-deepseek-with-openclaw.mdx`

---

## KEY FILES

| File | Purpose |
|------|---------|
| `lib/blog.ts` | Blog post metadata (SSOT) |
| `lib/content.ts` | FAQ and content data |
| `app/layout.tsx` | Root layout with global metadata |
| `app/globals.css` | Global styles (mobile-first) |
| `next.config.mjs` | Next.js config (minimal) |
| `components/SEO/StructuredData.tsx` | Schema.org components |

---

## BUILD & DEPLOYMENT

```bash
# Development
npm run dev

# Build (with validation)
npm run build

# Production
npm run start

# Validate only
npm run validate
```

- **Platform:** Vercel
- **Auto-deploy:** On push to `main` branch
- **Build Command:** `tsx scripts/validate-build.ts && next build`

---

## KNOWN ISSUES

### DNS Configuration (BLOCKED)
- **Issue:** Domain `openclaw-ai.org` points to wrong IPs
- **Expected:** Should point to Vercel's `cname.vercel-dns.com`
- **Current:** Points to `64.29.17.1`, `216.198.79.1` (Heroku IPs)
- **Impact:** Main domain not accessible
- **Workaround:** Use https://openclaw-landing.vercel.app

---

## SEO KEYWORDS

### Primary
- DeepSeek R1
- OpenClaw configuration
- Local LLM setup
- CUDA OOM errors
- VRAM requirements

### Long-tail
- "DeepSeek R1 crash"
- "OpenClaw OOM"
- "torch.cuda.OutOfMemoryError"
- "MPS out of memory"
- "Ollama crash"
