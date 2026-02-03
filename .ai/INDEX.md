# AICP-Lite Index

**Project ID:** openclaw-ai-org
**Current Phase:** AEO-first (Answer Engine Optimization)
**Last Updated:** 2026-02-03

---

## READ ME FIRST

Welcome to the **AI Collaboration Protocol - Lite**. This directory contains the internal "truth source" for the OpenClaw project.

### Quick Start for AI Assistants

1. **Read this first:** `.ai/INDEX.md` (you are here)
2. **Understand the current state:** `.ai/STATE.md` - tech stack, routes, content
3. **Know the rules:** `.ai/RULES.md` - what we do and don't do
4. **See what was decided:** `.ai/DECISIONS.md` - strategic and technical choices

### Project Summary

**OpenClaw AI Survival Guide** is a battle-tested documentation site for running DeepSeek R1 locally without OOM errors.

- **Stack:** Next.js 16, React 19, Tailwind CSS
- **Hosting:** Vercel (auto-deploy)
- **Content:** MDX-based guides
- **Theme:** Dark mode, orange brand (#FF4500), "survivor/hacker" aesthetic

### Current Focus: AEO-First

We're optimizing for **Answer Engine Optimization** (AI Overviews, Perplexity, ChatGPT Search) rather than traditional SEO.

**Target Keywords:**
- DeepSeek R1 crash fixes
- OpenClaw configuration
- CUDA OOM errors
- Local LLM setup

### Key Rules (Quick Reference)

- ✅ Static content only
- ✅ No SaaS features (yet)
- ✅ No hype content
- ✅ "Survivor" tone - honest, technical, no BS
- ❌ No affiliate links without clear disclosure
- ❌ No hallucinated files or routes

---

## File Guide

| File | Purpose | Update When |
|------|---------|-------------|
| `STATE.md` | Technical facts | Architecture changes, new routes |
| `RULES.md` | Core constraints | Strategy changes |
| `DECISIONS.md` | Decision log | Any strategic choice |

---

## Public Context System

The `scripts/generate-context.js` script automatically generates public-facing context files:

- `public/ai.json` - Machine-readable project metadata
- `public/llms.txt` - Human/AI readable summary

**These are auto-generated on every build** - do not edit manually.

---

## Need Help?

For handoff to another AI, use `.ai/HANDOFF_PROMPT.md` (legacy format, still works).
