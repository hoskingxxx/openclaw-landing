# OpenClaw Content Playbook (AEO Edition)

**Last Updated:** 2026-02-04
**Phase:** Profit-First (Traffic + Monetization)

---

## 1. The "Answer-First" Rule

### H1 Title Format
**Two Approaches:**

**A. Question-Based (Informational Intent)**
- Must be a specific user question
- Examples:
  - ✅ "How to fix JSON errors in OpenClaw?"
  - ✅ "Why does OpenClaw crash with DeepSeek R1?"
  - ❌ "JSON Error Guide" (too vague)
  - ❌ "Understanding OpenClaw" (not a question)

**B. Clickbait-Optimized (High CTR Intent)**
- Use for troubleshooting/fix articles
- Format: "Problem: The Comparison/Hook"
- Examples:
  - ✅ "Fix OpenClaw CUDA OOM: The $0.50 Solution vs. The 4-Hour Debug"
  - ✅ "OpenClaw Slow Inference? Why 3.5s/token Is Normal (And How to Fix It)"
  - ❌ "How to fix OOM" (too boring, low CTR)
- **Rule:** Frontmatter `title` can be clickbait, `description` remains SEO-accurate

### First 100 Words: Direct Answer (TL;DR)
- **No fluff, no intro**
- Start immediately with the solution
- Include at least one copy-paste code block
- Answer the question directly before explaining

### Content Structure
```
1. TL;DR (Immediate Solution)
2. Error Manifestation (What you see)
3. Root Cause (Why it happens)
4. The Fix (Step-by-step)
5. Prevention (Best practices)
6. Related Fixes (Internal links)
```

---

## 2. Failure Context is King

### Always Include Real Error Logs
- Use actual terminal output format
- Show the full error message
- Include stack traces when relevant

### Explain *Why* It Failed
- OOM (Out of Memory)
- Context Window Overflow
- Model Response Format Issues
- Network/Connection Problems
- Version Incompatibility

### Example Error Format
```bash
Error: JSON parsing failed
Expecting value: line 1 column 1 (char 0)
  at JSON.parse (<anonymous>)
  at OpenClawResponse.processResponse (/lib/processor.js:42)
```

---

## 3. Monetization & Affiliate Strategy

### Phase-Based Approach

**Phase 1 (No Links Yet):**
- Use **Bold Text** for product names only
- Do NOT use broken links or `[PLACEHOLDERS]`
- Format: `**DigitalOcean H100** *(Coming Soon)*`
- Never create "bridge pages" or dead links

**Phase 2 (Links Active):**
- Once affiliate approval is granted
- Convert Bold Text into direct deep links
- Update internal references to use actual URLs

### Placement Strategy
- Affiliate recommendations go in the "Solution" section
- Frame as technical recommendation, NOT sales pitch
- Example: "To avoid OOM with 32B models, we recommend **High-Performance VPS** for dedicated VRAM."
- Never before the technical solution - always after

### When to Mention VPS Solutions
- **VRAM Limitations**: "Your 8GB GPU can't handle 32B models"
- **CPU Bottlenecks**: "Local CPU inference is slow for production"
- **Stability Concerns**: "Production deployments need dedicated resources"
- **Isolation Needs**: "Run AI workloads separately from your main machine"

---

## 4. Technical Constraints

### Structured Data (SEO)
- Every post must include FAQ section
- Use Schema.org FAQPage format
- Wrap Q&A in proper markup

### Metadata (lib/blog.ts)
- **This is the Source of Truth**
- All posts must be added here
- Use this exact schema:
```typescript
{
  slug: "your-slug",
  canonicalPath: "/guides/your-slug",
  title: "Your Question Title",
  description: "Meta description (150 chars max)",
  date: "2026-02-03",
  author: "LazyDev",
  tags: ["tag1", "tag2", "tag3"],
  category: "Tutorial", // or "Security", "Troubleshooting"
  featured: false,
  seoKeywords: ["keyword1", "keyword2", "keyword3"],
}
```

### URL Structure
- Blog prefix: `/guides/`
- Never use `/blog/`
- Canonical path must match slug

---

## 5. Content Quality Checklist

### Before Publishing, Verify:
- [ ] TL;DR has copy-paste code block
- [ ] Error logs are realistic (or use "common pattern" language)
- [ ] Root cause is explained (not just "it broke")
- [ ] Affiliate links come AFTER technical solution
- [ ] FAQ section has 3+ Q&A items
- [ ] Internal links in "Related Fixes" section
- [ ] Metadata added to `lib/blog.ts`
- [ ] Run `npm run validate` to check for dead links

---

## 6. SEO & AEO Optimization

### Answer Engine Optimization
- Write for AI Overviews, not just search crawlers
- Direct, concise answers in first paragraph
- Use question-based H1 titles
- Include FAQ structured data

### Target Keyword Placement
- In H1 title
- In first 100 words
- In one H2 heading
- In meta description
- In URL slug

### Long-tail Keyword Examples
- "OpenClaw JSON parsing error"
- "DeepSeek R1 OpenClaw compatibility"
- "OpenClaw CUDA out of memory fix"
- "OpenClaw vs Ollama performance"

---

## 7. Internal Linking Strategy

### "Related Fixes" Section
Every article must end with:
```markdown
---
## Related Fixes

- [Guide Title](/guides/slug) - Brief description
- [Guide Title](/guides/slug) - Brief description
- [Guide Title](/guides/slug) - Brief description
```

### Cross-Link Rules
- Link to troubleshooting guides when relevant
- Link to security guides for production concerns
- **ZERO 404 POLICY:** If content does not exist yet, use Bold Text with *(Coming Soon)*
- **NEVER create dead links or placeholder slugs** - Links are ONLY allowed if `lib/blog.ts` has the entry

**Example - WRONG (dead link):**
```markdown
- [DeepSeek R1 Optimization](/guides/deepseek-r1-optimization) - Coming Soon
```

**Example - CORRECT (no dead link):**
```markdown
- **DeepSeek R1 Optimization** *(Coming Soon)*
```

---

## 8. Tone & Voice

### The "Survivor" Voice
- Write for developers who just crashed their system
- Be direct, technical, no hype
- Use "we" and "you" (not "users")
- Admit when we don't know something

### What Works
- "Here's what broke and how to fix it"
- "Common failure patterns we've observed"
- "This usually happens when..."

### What Doesn't Work
- "Amazing breakthrough guide" (hype)
- "You'll love this" (marketing fluff)
- "100% success rate" (fake data)

---

## 9. File Safety Rules

### When Updating `lib/blog.ts`
- **APPEND ONLY** - Add new entries at the end
- **DO NOT** modify existing posts
- **DO NOT** re-sort or reorder
- **DO NOT** delete entries

### When Creating MDX Files
- Use kebab-case for filenames: `your-article-slug.mdx`
- Match filename to `slug` in lib/blog.ts
- Include frontmatter (title, description, date, etc.)

---

## 10. Production Workflow

```bash
# 1. Create MDX file
content/posts/your-slug.mdx

# 2. Update lib/blog.ts (APPEND only)
lib/blog.ts

# 3. Validate
npm run validate

# 4. Commit
git add content/posts/ lib/blog.ts
git commit -m "feat: add new article"

# 5. Push (Vercel auto-deploys)
git push
```

---

## 11. Emergency Rules

### If Something Goes Wrong
1. Check `npm run validate` output
2. Verify slug matches filename
3. Check for syntax errors in MDX
4. Review lib/blog.ts for proper formatting

### Rollback Procedure
```bash
git revert HEAD
git push
```

---

## 12. Handoff Checklist

When passing to another AI:
1. Point them to this Playbook first
2. Send them the latest `lib/blog.ts`
3. Include current task context
4. Remind them of the guardrails

---

## 13. Video Script Assets

### Purpose
Text-based scripts for non-technical user to record tutorial videos

### Location
`assets/video_scripts/{topic}_script.txt`

### Format
```text
[SCREEN 1: TITLE]
Content to display on screen

[SCREEN 2: TITLE]
Content to display on screen
```

### Guidelines
- Max 5-6 screens per video
- Start with the error/problem
- Show the fix (config or code)
- End with CTA (affiliate link)
- User records screen, overlays text

### Existing Scripts
- `oom_fix_script.txt` - CUDA OOM error fix (5 screens)

---

**Remember:** We help developers who broke things. Be direct, be honest, be useful.
