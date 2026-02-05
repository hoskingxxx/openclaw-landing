# OpenClaw SSOT (Single Source of Truth)

**Authority Chain:** CEO > ChatGPT > Gemini > CC
**CEO veto:** Absolute

---

## Agent Boundaries

### CEO (Human)
- Final GO/NO-GO
- Reviews analytics
- Sends commands to CC
- NO micro-managing UI or debating implementation

### Gemini (Strategy)
- Proposes WHAT/WHY
- NO final decision authority
- NO direct code to CC

### ChatGPT (CTO/Judge)
- Engineering gatekeeper
- NO web browsing, NO trend chasing
- Outputs: deterministic scripts or CLI commands only
- NEVER use `sed`, NEVER overwrite configs
- All changes additive and safe

### CC (Execution)
- Executes commands exactly
- NO architectural decisions, NO interpretation
- Stops if input is ambiguous

### Canonical Workflow
Gemini proposes → CEO to ChatGPT → ChatGPT verdicts → CEO to CC → CC executes → CEO collects data → ChatGPT post-mortem → Gemini recalibrates

---

## Hard Constraints

### Content
- Static only (no user accounts, no databases)
- No SaaS features
- Honest, technical, no exaggerated claims

### Monetization
- Vultr affiliate: `https://www.vultr.com/?ref=9863490`
- CTA: "Deploy on Vultr (Limited Time Offer)"
- NO hardcoded amounts ($100, etc.)
- NO sponsored content without disclosure

### Technical
- Server Components by default
- Semantic HTML, mobile-first
- NO "any" types in TypeScript
- Semantic CSS variables only (`bg-background`, `text-primary`)

### Routing
- Blog prefix: `/guides` (NOT `/blog`)
- Internal links: use `canonicalPath` from `lib/blog.ts`
- ZERO 404 Policy: all links must work before pushing

---

## File Operations

### lib/blog.ts (SSOT)
- APPEND ONLY when adding articles
- DO NOT modify existing entries
- DO NOT re-sort or reorder
- DO NOT delete entries

### Generated Files
- NO AI identity disclosure (e.g., "As an AI", "I'm a language model")
- NO conversational filler ("Let me explain", "Here's what I did")
- Output ONLY production-ready code/content

### CLI Commands
- Use official CLI when available: `openclaw plugins install @package/name`
- NOT `npm install -g` unless CLI doesn't exist

---

## Deployment Checklist

BEFORE `git push`:
1. Run `npm run validate` (must pass)
2. Run `npm run check:links` (zero failures)
3. Verify no broken internal links
4. Update relevant `.ai/` files

---

## Prohibited

- Hallucinating files or routes
- Assuming something exists without checking
- Using "any" types
- Arbitrary color values
- Creating `/blog/` routes
- Publishing `.ai/` files to public
- Hardcoded internal links
- Dead links or placeholder slugs
- Overwriting config files
- Using `sed`
