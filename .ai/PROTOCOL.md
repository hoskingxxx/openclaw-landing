# AI Collaboration Protocol (AICP)

**Last Updated:** 2026-02-03
**Version:** 1.0

## Purpose

This protocol establishes a "Shared Brain" for AI assistants (Claude, Gemini, ChatGPT, etc.) working on the OpenClaw project. All AIs must adhere to these rules to maintain consistency and avoid hallucinations.

---

## MANDATORY FIRST STEP

**Before answering ANY question, you MUST:**

1. Read `.ai/STATE.md` - Understand the tech stack, deployed URL, and current goals
2. Read `.ai/DECISIONS.md` - Understand what decisions have already been made
3. Read `.ai/TASK_BOARD.md` - Check if your task is already tracked
4. **NEVER hallucinate files or routes** - Verify existence before referencing

---

## CORE RULES

### 1. NO HALLUCINATION
- Never reference files that don't exist
- Never assume routes/pages exist - check the file structure
- Always verify before saying "file X does Y"

### 2. SINGLE SOURCE OF TRUTH
- Blog posts: `lib/blog.ts` (blogPosts array)
- Routes: Check `app/` directory structure
- Content: `content/posts/*.mdx`
- FAQ data: `lib/content.ts` (faqs array)

### 3. PROJECT STRUCTURE
```
app/
├── guides/[slug]/page.tsx  # Dynamic blog/guide pages
├── docs/page.tsx           # Documentation
├── faq/page.tsx            # FAQ
├── troubleshooting/page.tsx
├── oom/page.tsx
├── quick-start/page.tsx
├── resources/page.tsx
├── icon.tsx                # Favicon
├── robots.ts               # Robots.txt generator
├── sitemap.ts              # Sitemap.xml generator
└── manifest.ts             # PWA manifest

content/posts/              # Blog content in MDX
lib/blog.ts                # Blog metadata (SSOT)
```

### 4. CODING STANDARDS
- Framework: Next.js 14 (App Router), Tailwind CSS, Shadcn UI
- Colors: Semantic variables ONLY (bg-background, text-primary)
- Icons: Lucide React
- Theme: Dark mode first ("Survivor/Hacker" aesthetic)
- No "any" types in TypeScript
- Prefer Server Components by default

### 5. SEO RULES
- All blog posts use canonicalPath from `lib/blog.ts`
- Blog route prefix: `/guides`
- Sitemap and robots.txt auto-generated
- Breadcrumb schema on all guide pages

### 6. WHEN CREATING CONTENT
1. Add entry to `lib/blog.ts`
2. Create MDX file in `content/posts/{slug}.mdx`
3. Run `npm run validate` to check for dead links
4. Update `.ai/STATE.md` with new content

---

## HANDOFF PROCEDURE

When switching between AI assistants:

1. Update `TASK_BOARD.md` with current progress
2. Update `DECISIONS.md` if new decisions were made
3. Update `.ai/STATE.md` if architecture changed
4. Use the prompt in `HANDOFF_PROMPT.md` to brief the next AI

---

## VIOLATIONS

If you catch another AI violating these rules:

1. Point them to read PROTOCOL.md
2. Ask them to verify file existence
3. Request they update the relevant .ai/ files

---

## FILES TO UPDATE AFTER WORK

| Action | File to Update |
|--------|----------------|
| Added new page | STATE.md |
| Made strategic decision | DECISIONS.md |
| Completed task | TASK_BOARD.md |
| Changed tech stack | STATE.md |
| Added content | STATE.md |
