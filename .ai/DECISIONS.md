# OpenClaw Project Decisions Log

**Last Updated:** 2026-02-04

---

## STRATEGIC DECISIONS

### Profit-First Pivot (2026-02-03)
**Decision:** Stop building complex systems, focus on traffic and monetization
**Rationale:**
- Previous focus on infrastructure over-delivered for current needs
- Need to validate business model before further investment
- VPS affiliate links offer immediate monetization path
- Content marketing faster than building SaaS features

**Actions Taken:**
- Simplified context generation (static ai.json instead of script)
- Published RCE vulnerability article to capture search trend
- Added VPS affiliate recommendations to security content

### AEO-First Approach (2026-02-03)
**Decision:** Pivot to Answer Engine Optimization (AEO) instead of traditional SEO
**Rationale:**
- Google AI Overviews are becoming dominant
- Users want direct answers, not just links
- FAQ structured data helps AI extract answers
- "Survivor" tone matches the audience (people who broke things)

### Context Generation: Static Manual Maintenance (2026-02-04)
**Decision:** Context files are maintained manually, NOT auto-generated on build
**Rationale:**
- `public/ai.json` and `public/llms.txt` are static files
- Updated manually when architecture changes significantly
- Prevents drift between documentation and reality
- `scripts/generate-context.js` exists but is run manually, not automatically

### DeepSeek R1 Long-tail Focus
**Date:** 2026-02-03
**Decision:** Focus content on DeepSeek R1 specific problems
**Rationale:**
- DeepSeek R1 is trending (Feb 2026)
- High intent users searching for crash fixes
- Less competition than general "AI" keywords
- Target error messages: "torch.cuda.OutOfMemoryError", "MPS out of memory"

### No SaaS Yet
**Date:** 2026-02-01
**Decision:** Focus on content/education first, delay SaaS monetization
**Rationale:**
- Build authority first
- Understand user pain points through content
- SaaS can come later once we know what features matter

---

## TECHNICAL DECISIONS

### Next.js App Router (Not Pages Router)
**Date:** 2025
**Decision:** Use Next.js 14+ App Router
**Rationale:**
- Built-in SEO metadata API
- Server Components by default
- Better performance
- Future-proof

### MDX for Content
**Date:** 2025
**Decision:** Use MDX instead of Markdown
**Rationale:**
- Can embed React components in content
- Frontmatter support via gray-matter
- Easy to extend

### Minimal Next.js Config
**Date:** 2026-02-03
**Decision:** Remove all redirects from `next.config.mjs`
**Rationale:**
- Redirects were causing infinite loops
- Hardcoded paths are more reliable
- KISS principle

### Hardcoded FEATURED_POST_PATH
**Date:** 2026-02-03
**Decision:** Hardcode featured post path in `app/page.tsx`
**Rationale:**
- Dynamic imports were causing issues
- Single featured post = no need for complexity
- Nuclear fix for redirect loop

---

## CONTENT DECISIONS

### /guides Route (Not /blog)
**Date:** 2025
**Decision:** Use `/guides` instead of `/blog` for content
**Rationale:**
- "Guides" sounds more helpful than "blog"
- Better for user intent
- Matches the "survival guide" theme

### "Survivor/Hacker" Aesthetic
**Date:** 2025
**Decision:** Dark theme, orange accents, terminal vibes
**Rationale:**
- Target audience (developers who crashed)
- Stands out from generic SaaS sites
- Matches the OpenClaw brand

---

## SEO DECISIONS

### Static Sitemap Generation
**Date:** 2026-02-03
**Decision:** Generate sitemap via `app/sitemap.ts` (not static file)
**Rationale:**
- Automatically includes new blog posts
- No manual updates needed
- Next.js native feature

### Dynamic Metadata Generation
**Date:** 2026-02-03
**Decision:** Use `generateMetadata()` in dynamic routes
**Rationale:**
- SEO-friendly titles per article
- Canonical URLs
- Open Graph images per post

### Breadcrumb Schema
**Date:** 2026-02-03
**Decision:** Add BreadcrumbList schema to all guide pages
**Rationale:**
- Google shows breadcrumb path in search results
- Helps users navigate
- Rich snippet potential

---

## BRANDING DECISIONS

### "LazyDev" Author Name
**Date:** 2025
**Decision:** Use "LazyDev" as author instead of real name
**Rationale:**
- Matches the survivor/hacker tone
- Relatable to target audience
- Can be changed later

### "OpenClaw Hub" Publisher
**Date:** 2025
**Decision:** Use "OpenClaw Hub" as organization name
**Rationale:**
- Sounds like a community resource
- Not tied to individual
- Professional enough for search engines

---

## REVERSED DECISIONS

### ~~Trailing Slash Removal~~
**Date:** 2026-02-03
**Originally:** Remove trailing slashes via redirects
**Reversed:** Was causing redirect loops
**Resolution:** Removed entirely, let Next.js handle defaults

---

## PENDING DECISIONS

- [ ] Whether to add comments to the site
- [ ] Whether to create a newsletter
- [ ] What to do with the openclaw-ai.org domain (DNS fix needed)

---

## 2026-02-04: Clickbait Title Strategy & Keyword Expansion

### Clickbait Title Optimization
**Decision:** Update article titles to be more compelling for US CTR
**Rationale:**
- US CTR was low (1.7%) with descriptive titles
- Test: "How to fix..." → "Fix X: The $0.50 Solution vs. The 4-Hour Debug"
- Balance between clickbait and technical accuracy
- Keep frontmatter descriptive for SEO, title catchy for clicks

**Example:**
- Old: "How to fix OpenClaw CUDA out of memory (OOM) errors with DeepSeek R1"
- New: "Fix OpenClaw CUDA OOM: The $0.50 Solution vs. The 4-Hour Debug"

### "OpenClaw Slow" Keyword Targeting
**Decision:** Create dedicated page for "openclaw slow" keyword (ranking #6)
**Rationale:**
- GSC shows ranking #6 without dedicated content
- High intent: users experiencing slow inference
- Capture traffic from Mac users with bandwidth limitations
- Bridge to VPS affiliate recommendations

**Content Created:** `fix-openclaw-slow-inference.mdx`

### Video Script Asset Creation
**Decision:** Create text-based video scripts for non-technical user to record
**Rationale:**
- User is not a developer but can record screen
- Scripts provide exact text to display on screen
- Format: [SCREEN X] with error logs, config snippets, CTAs
- Location: `assets/video_scripts/`

**First Script:** OOM fix script (5 screens, error → fix → CTA)

---

## 2026-02-03: Technical SEO & Branding Architecture

### SEO Validation: Dynamic Crawling Over Static Analysis
**Decision:** Adopted `linkinator` (dynamic crawling) over regex scripts for link validation.
**Rationale:**
- We value "Google's perspective" (runtime 404 checks) over static code analysis
- Real crawler behavior matters more than code patterns
- `npm run check:links` must pass before any deployment

### Favicon Strategy: Code-First SVG
**Decision:** Switched to Code-First SVG (`app/icon.svg`) instead of binary uploads.
**Rationale:**
- Uses "Lobster Emoji" 🦞 style to match OpenClaw brand identity
- Editable as text, version-controllable
- Next.js App Router auto-detects `app/icon.svg`

### Crawler Silence Protocol
**Decision:** Maintain a dummy `public/favicon.ico` (even if empty) to silence dumb crawlers.
**Rationale:**
- Even with `app/icon.svg`, crawlers blindly request `/favicon.ico` at root
- Providing a file (0-byte) stops 404 errors from polluting logs
- Keeps SEO check green

### Monetization UX: No Bridge Pages
**Decision:** Rejected "Coming Soon" placeholder pages. Use **Bold Text** placeholders instead.
**Rationale:**
- Dead links hurt SEO and user experience
- `**DeepSeek R1 Optimization** *(Coming Soon)*` is better than a 404
- No "bridge pages" - convert placeholders to links when content exists
