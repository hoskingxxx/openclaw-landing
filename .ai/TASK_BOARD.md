# OpenClaw Task Board

**Last Updated:** 2026-02-03
**Current Phase:** Profit-First (Traffic + Monetization)

---

## 🔴 HIGH PRIORITY

### Create More Security/Trending Content
- **Type:** New guides targeting search trends
- **Topics:**
  - "OpenClow vs Ollama security comparison"
  - "Common OpenClaw errors and fixes"
  - "OpenClaw data privacy guide"
  - "How to secure your local LLM setup"
- **Status:** TODO
- **Why:** Capture search traffic, funnel to VPS affiliates

### Test VPS Affiliate Links
- **Action:** Replace PLACEHOLDER with actual affiliate codes
- **Providers:** DigitalOcean, Linode, Hetzner
- **Status:** BLOCKED - Need affiliate accounts
- **File:** `content/posts/openclaw-security-rce-cve-2026-25253.mdx`

### Create "Model Comparison" Content
- **Type:** Comparison articles
- **Topics:**
  - "DeepSeek R1 vs Llama 3 vs Mistral"
  - "Which model fits your VRAM?"
  - "Cost analysis: local vs API LLMs"
- **Status:** TODO
- **Why:** High-intent comparison keywords convert well

---

## 🟡 NEXT UP

### Add Table of Contents to Guides
- **Action:** Auto-generate TOC from headings
- **File:** `app/guides/[slug]/page.tsx`
- **Status:** TODO
- **Priority:** Improves user experience, SEO

### Create "OpenClaw Error Codes" Guide
- **Type:** Reference/fix guide
- **Content:** List common error codes with solutions
- **Keywords:** "OpenClaw error codes", "fix OpenClaw errors"
- **Status:** TODO

### Add Reading Time to Articles
- **Action:** Calculate and display reading time
- **File:** `app/guides/[slug]/page.tsx`
- **Status:** TODO

---

## 🟢 BACKLOG

### Add Internal Linking
- **Action:** Add "Related Posts" section to guide pages
- **File:** `app/guides/[slug]/page.tsx`
- **Status:** BACKLOG

### Fix DNS Configuration
- **Issue:** Domain `openclaw-ai.org` points to wrong IPs
- **Action:** Update DNS to `cname.vercel-dns.com`
- **Status:** BLOCKED - User needs to update at registrar
- **Impact:** Main domain not accessible, Vercel URL works

### Add Search Functionality
- **Type:** Feature
- **Options:** Algolia, Pagefind, or custom
- **Status:** BACKLOG

### Add Comments
- **Type:** Feature
- **Options:** giscus, Disqus, or custom
- **Status:** BACKLOG

### Create Newsletter
- **Type:** Feature
- **Action:** Decide on provider (Resend, ConvertKit, etc.)
- **Status:** BACKLOG

---

## ✅ COMPLETED (2026-02-03)

### Profit-First Pivot
- Simplified project context system
- Created static ai.json for easy handoff
- Published RCE vulnerability article
- Added VPS affiliate links to content
- **Status:** ✅ DONE

### AICP Handoff System
- Created .ai/ directory with context files
- INDEX.md, STATE.md, RULES.md, DECISIONS.md
- HANDOFF_PROMPT.md for ChatGPT/Gemini
- **Status:** ✅ DONE

### SEO Infrastructure
- robots.ts, sitemap.ts
- icon.tsx, apple-icon.tsx
- manifest.ts (PWA)
- Breadcrumb, Article, FAQ schemas
- **Status:** ✅ DONE

### RCE Security Article
- Created CVE-2026-25253 vulnerability guide
- VPS affiliate recommendations
- Set as featured post
- **Status:** ✅ DONE

### Crawler Infrastructure
- Fixed 404s for favicon, robots.txt
- Verified all nav/footer links
- **Status:** ✅ DONE

### Mobile Overflow Fix
- Added global CSS overflow rules
- Code blocks scroll on mobile
- **Status:** ✅ DONE

---

## 🚫 BLOCKED

### Fix openclaw-ai.org DNS
- **Blocker:** User needs to update DNS at domain registrar
- **Impact:** Main domain not accessible
- **Workaround:** Use https://openclaw-landing.vercel.app

### VPS Affiliate Links
- **Blocker:** Need to sign up for affiliate programs
- **Impact:** Can't monetize traffic yet
- **Action:** Sign up for DigitalOcean, Linode, Hetzner affiliates

---

## 📊 CONTENT IDEAS

### High-Intent Keywords (Money Pages)
- "Best VPS for OpenClaw" → VPS affiliate
- "OpenClaw hosting requirements" → VPS affiliate
- "Secure OpenClaw setup" → VPS affiliate
- "OpenClaw vs competitors" → Comparison + affiliate

### Problem-Solution Articles
- "OpenClaw won't start" → Fix guide
- "OpenClaw uses too much RAM" → Optimization guide
- "OpenClaw can't find models" → Troubleshooting
- "OpenClaw connection refused" → Network fix guide

### Trend-Jacking (When opportunities arise)
- Security vulnerabilities
- New model releases
- Major bug discoveries
- Industry news

---

## 💡 MONETIZATION STRATEGY

### Current: VPS Affiliates
- DigitalOcean: $200 credit, potential commission
- Linode: Competitive for Linux users
- Hetzner: Budget option for EU users

### Future Options
- OpenClaw consulting/services
- Premium guides/courses
- Hosting referrals
- Tool recommendations

### Content-to-Money Flow
1. User searches "OpenClaw RCE vulnerability"
2. Lands on our security article
3. Reads about VPS isolation as solution
4. Clicks VPS affiliate link
5. We earn commission
