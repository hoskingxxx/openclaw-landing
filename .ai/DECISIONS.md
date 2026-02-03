# OpenClaw Project Decisions Log

**Last Updated:** 2026-02-03

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
