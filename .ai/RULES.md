# OpenClaw Project Rules

**Last Updated:** 2026-02-04

---

## CORE CONSTRAINTS

### Content Strategy
- ✅ **Static content only** - No user accounts, no databases
- ✅ **No SaaS features** - Focus on education/authority first
- ✅ **No hype content** - Be honest, technical, no exaggerated claims
- ✅ **"Survivor" tone** - Write for developers who crashed their systems

### Monetization
- ✅ **Affiliate links OK** - Only if genuinely helpful and clearly disclosed
- ❌ **No sponsored content** - Without clear labeling
- ❌ **No paywalled content** - Everything must be freely accessible

### Technical
- ✅ **Server Components by default** - Only use "use client" when necessary
- ✅ **Semantic HTML** - Proper heading hierarchy, aria labels where needed
- ✅ **Mobile-first** - Test on mobile viewport before desktop
- ✅ **No "any" types** - Use proper TypeScript types

---

## CODING STANDARDS

### File Structure
```
app/
├── guides/[slug]/page.tsx  # Dynamic routes
├── (static pages)/page.tsx  # Static routes
├── layout.tsx               # Root layout
├── globals.css              # Global styles
├── robots.ts                # SEO: robots.txt
├── sitemap.ts               # SEO: sitemap.xml
└── icon.*                   # Favicon

components/
├── ui/                      # Dumb components (Button, Input)
├── features/                # Feature components (Hero, Footer)
└── SEO/                     # Schema components

lib/
├── blog.ts                  # Blog metadata (SSOT)
└── content.ts               # FAQ data

content/posts/               # MDX files
```

### Naming Conventions
- **Components:** PascalCase (`Hero.tsx`, `HardwareTable.tsx`)
- **Functions:** camelCase (`formatDate`, `getPostBySlug`)
- **Files:** Match export name or purpose

### Styling
- **Colors:** Use semantic variables ONLY (`bg-background`, `text-primary`)
- **Icons:** Lucide React imports (`import { IconName } from 'lucide-react'`)
- **No arbitrary hex values** in component code

---

## CONTENT WORKFLOW

When creating a new guide:

1. **Add to `lib/blog.ts`:**
   ```typescript
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

2. **Create MDX file:** `content/posts/your-slug.mdx`

3. **Validate:** Run `npm run validate` to check for dead links

4. **Update state:** Add to `.ai/STATE.md` content library

---

## SEO RULES

### URL Structure
- Blog route prefix: `/guides` (NOT `/blog`)
- Use `canonicalPath` from `lib/blog.ts` - never hardcode
- Dynamic routes: `/guides/[slug]`

### Metadata
- Always include `generateMetadata()` in dynamic routes
- Set `alternates.canonical` for definitive URLs
- Open Graph images for all content pages

### Schema
- **BreadcrumbList** on all guide pages
- **Article** on blog posts
- **FAQPage** on FAQ page
- **WebSite** on homepage
- **SoftwareApplication** for OpenClaw

---

## WHAT TO DO WHEN...

### Adding a new page
1. Create `app/your-page/page.tsx`
2. Add to sitemap (`app/sitemap.ts`)
3. Update `.ai/STATE.md`
4. Run `npm run validate`

### Making a strategic decision
1. Document in `.ai/DECISIONS.md`
2. Include date, rationale, and expected impact
3. Update `.ai/INDEX.md` if phase changes

### Handing off to another AI
1. Update `.ai/DECISIONS.md` with any new choices
2. Update `.ai/STATE.md` if architecture changed
3. Use `.ai/HANDOFF_PROMPT.md` to brief next AI

---

## PROHIBITED

❌ Hallucinating files or routes
❌ Assuming something exists without checking
❌ Adding "any" types "just to make it work"
❌ Using arbitrary color values
❌ Creating blog routes (use /guides)
❌ Publishing .ai/ files directly (use generate-context.js)
❌ Using `/posts/` in internal links (always use `/guides/`)

---

## HARDCODE EXCEPTION

⚠️ **Exception:** The featured post path in `app/page.tsx` MAY be hardcoded to avoid redirect loops. All other internal links MUST use dynamic `canonicalPath` from `lib/blog.ts`.

---

## Deployment & Quality Assurance

### The "Green Check" Rule
**BEFORE any `git push` to production, you MUST:**
1. Run `npm run check:links` (in a separate terminal while `npm run dev` is active)
2. Verify ZERO failures (even favicon.ico 404s count)
3. Fix any broken links before pushing

### Zero 404 Policy
- If `check:links` reports ANY failure, do not push
- Fix it first
- Internal links must match real file slugs
- External links must be live

### Internal Linking Protocol
- **Never guess slugs** - Always read `lib/blog.ts` or check file structure
- Confirm destination URL exists before linking
- Use `canonicalPath` from `lib/blog.ts` for internal links
- For placeholder content: use bold text with *(Coming Soon)*, not broken links
