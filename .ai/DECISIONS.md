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

---

## 2026-02-05: Troubleshooting Cluster & Monetization Strategy

### Vultr Affiliate Partnership
**Decision:** Standardized on Vultr as primary VPS affiliate partner
**Rationale:**
- Single affiliate ID (9863490) across all content
- Consistent CTA format: "Deploy on Vultr (Limited Time Offer)"
- Removed hardcoded amounts to avoid compliance/expiration issues
- Link format: `https://www.vultr.com/?ref=9863490`

### "Engineering Rule of Thumb" Content Strategy
**Decision:** Add "2+ errors = switch to VPS" rule to error index
**Rationale:**
- Users hitting multiple environment errors are in "debugging hell"
- Windows PATH/permission issues waste hours
- Clear decision rule: 2+ errors = stop debugging, use VPS
- Positions VPS as "correct architecture" not "giving up"

### Troubleshooting CTA at Footer
**Decision:** Add high-converting CTA card to `/troubleshooting` page footer
**Rationale:**
- Users who scroll entire page are frustrated but didn't find solution
- Orange border (#FF4500) design for visibility
- Text: "Still broken?" → emotional resonance
- Direct affiliate link without additional clicks

### Error Index as "Master Dictionary"
**Decision:** Create searchable error index with copy-paste fixes
**Rationale:**
- Users want Ctrl+F solution, not narrative
- Standard Markdown tables (not complex JSX)
- Quick Fix commands are copy-pasteable
- Links to full guides for complex issues

### Content Cluster Architecture
**Decision:** Organize troubleshooting content into interconnected clusters
**Rationale:**
- Windows cluster: install.ps1 → ENOENT → EINVAL (progressive failure)
- Docker/Linux cluster: EACCES → ARM Clipboard (platform issues)
- Performance cluster: OOM → Slow → JSON (hardware limits)
- Plugin cluster: metadata → install errors (ecosystem issues)
- Cross-link all articles within clusters
- Error index serves as cluster hub

### Git Dependency in Install Verification
**Decision:** Add `git --version` check to install.ps1 troubleshooting
**Rationale:**
- User feedback revealed Git often missing on Windows
- npm tries to spawn git for GitHub packages
- "syscall spawn git" ENOENT errors were common
- Git for Windows download link provided in fix

### Offline Install Method for Windows Plugins
**Decision:** Add manual .tgz installation method to Windows ENOENT article
**Rationale:**
- Some Windows environments have npm/git path issues that can't be fixed
- Manual .tgz download + `openclaw plugins install ./file.tgz` bypasses spawn issues
- Manual `npm install --production` in extension folder completes setup
- Provides nuclear option for stubborn environments

### ARM Clipboard Fix: Upgrade OpenClaw (Not npm)
**Decision:** Corrected ARM article to recommend upgrading OpenClaw package
**Rationale:**
- Original draft suggested upgrading npm (incorrect)
- Real fix: OpenClaw made clipboard dependency optional in newer versions
- `npm install -g openclaw@latest` is the correct solution
- User feedback from Issue #4596 confirmed this fix

---

## CONTENT FORMAT STANDARDS (2026-02-05)

### Affiliate Link Format
**Standard:** `[Deploy on Vultr (Limited Time Offer)](https://www.vultr.com/?ref=9863490)`
**Rules:**
- No hardcoded amounts ($100, $50, etc.)
- Use "Limited Time Offer" or "High Availability & Free Credit"
- Never use placeholders like [INSERT_AFFILIATE_LINK_HERE]
- Place AFTER technical solution, not before

### Error Index Table Format
**Standard Markdown Tables:**
```markdown
| Error String | Quick Fix | Full Guide |
|--------------|-----------|------------|
| `error text` | `command` | [Link](/guides/slug) |
```

### CLI Command Standards
- Use official CLI: `openclaw plugins install` (not `npm install`)
- Show full command with flags when needed
- Explain what the command does

### GitHub Link Format
- Use search queries: `https://github.com/search?q=repo%3Am1heng%2Fopenclaw+issues`
- Avoid direct issue links (can become stale)
- Search queries are more resilient to repository changes
