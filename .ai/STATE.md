# OpenClaw Project State

**Last Updated:** 2026-02-03
**Status:** Live on Vercel
**Current Phase:** Profit-First (Traffic + Monetization)

---

## PROJECT IDENTITY

- **Name:** OpenClaw AI Survival Guide
- **Description:** Battle-tested guide for running DeepSeek R1 locally without OOM errors
- **Goal:** Help developers avoid crashes AND monetize through VPS affiliates
- **Tagline:** "Stop debugging crashes. Start shipping. Safely."

---

## DEPLOYED URLS

| URL | Status | Notes |
|-----|--------|-------|
| https://openclaw-ai.org | ✅ Working | Main domain (Vercel) |
| https://openclaw-landing.vercel.app | ✅ Working | Vercel deployment |
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
- **CSS Variables:** `bg-background`, `text-primary`, etc.

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
| `/` | `app/page.tsx` | Home (Featured: RCE article) |
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
| `openclaw-security-rce-cve-2026-25253` | CVE-2026-25253: OpenClaw RCE Vulnerability - Critical Security Alert | 2026-02-03 | Security | **Yes** |
| `how-to-use-deepseek-with-openclaw` | Running OpenClaw with DeepSeek R1: The Unofficial, Battle-Tested Guide | 2026-02-01 | Tutorial | No |

**Total Posts:** 2

### Content Files (in `content/posts/`)
- `openclaw-security-rce-cve-2026-25253.mdx` - RCE vulnerability + VPS recommendations
- `how-to-use-deepseek-with-openclaw.mdx` - DeepSeek deployment guide

---

## KEY FILES

| File | Purpose |
|------|---------|
| `lib/blog.ts` | Blog post metadata (SSOT) - **ADD NEW POSTS HERE** |
| `lib/site-config.ts` | Navigation, footer links, site config |
| `lib/content.ts` | FAQ and content data |
| `app/layout.tsx` | Root layout with global metadata |
| `app/globals.css` | Global styles (mobile-first) |
| `app/page.tsx` | Homepage (hardcoded FEATURED_POST_PATH) |
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
- **Prebuild:** `node scripts/generate-context.js` (generates public/ai.json)

---

## KNOWN ISSUES

### VPS Affiliate Links (BLOCKED)
- **Issue:** Placeholder links need actual affiliate codes
- **Action:** Sign up for DigitalOcean, Linode, Hetzner affiliate programs
- **Impact:** Cannot monetize traffic yet

---

## SEO KEYWORDS

### Primary (Current Focus)
- OpenClaw RCE
- CVE-2026-25253
- OpenClaw security
- OpenClaw vulnerability
- DeepSeek R1 crash

### Long-tail
- "OpenClaw RCE exploit"
- "OpenClaw security fix"
- "OpenClaw vs Ollama security"
- "Secure local LLM setup"
- "VPS for OpenClaw"

### Money Keywords (High Intent)
- "Best VPS for OpenClaw"
- "OpenClaw hosting requirements"
- "How to secure OpenClaw"

---

## MONETIZATION

### Current Strategy
- **VPS Affiliate Links** in security-related articles
- **Providers:** DigitalOcean, Linode, Hetzner
- **Placement:** Within problem-solution content

### Content Funnel
1. User searches for OpenClaw problem/security
2. Lands on our guide
3. Reads about VPS isolation as solution
4. Clicks affiliate link
5. We earn commission

---

## AICP (AI Collaboration Protocol)

### Internal Files (`.ai/`)
- `INDEX.md` - This file, entry point
- `STATE.md` - Technical facts (you are here)
- `RULES.md` - Coding standards and constraints
- `DECISIONS.md` - Strategic and technical decisions
- `TASK_BOARD.md` - Current to-do list
- `HANDOFF_PROMPT.md` - Ready-to-use prompt for other AIs

### Public Files
- `public/ai.json` - Machine-readable project metadata
- `public/llms.txt` - Human/AI readable summary

---

## HOW TO ADD NEW CONTENT

### Step 1: Create MDX File
```bash
content/posts/your-slug.mdx
```

### Step 2: Add Metadata
```typescript
// lib/blog.ts
{
  slug: "your-slug",
  canonicalPath: "/guides/your-slug",
  title: "Your Title",
  description: "Meta description",
  date: "2026-02-03",
  author: "LazyDev",
  tags: ["tag1", "tag2"],
  category: "Tutorial",
  featured: false,
  seoKeywords: ["keyword1", "keyword2"],
}
```

### Step 3: Validate
```bash
npm run validate
```

### Step 4: Deploy
```bash
git add .
git commit -m "feat: add new article"
git push
```

Vercel will auto-deploy in ~1-2 minutes.
