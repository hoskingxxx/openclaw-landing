# OpenClaw Decision Log

---

[DECISION] Vultr affiliate partnership (ID: 9863490) — Primary monetization

[DECISION] Route prefix `/guides` instead of `/blog` — SEO consolidation

[DECISION] Zero 404 policy — No dead links, use bold text for "Coming Soon"

[DECISION] lib/blog.ts append-only — Preserve chronological order, prevent conflicts

[DECISION] AI identity disclosure ban — Generated files must be production-ready without meta-commentary

[DECISION] Official CLI preference — Use `openclaw plugins install` over `npm install -g`

[DECISION] No hardcoded amounts in CTAs — Use "Limited Time Offer" instead of "$100 Free Credit"

[NOTE] Resource Mismatch narrative — OpenClaw assumes infinite VRAM/bandwidth; local hardware has limits

[NOTE] Trust Mismatch narrative — OpenClaw assumes trusted environment; local machines expose filesystem/data

[NOTE] Authority chain is non-negotiable — CEO veto overrides all AI agents

[NOTE] Fixed Umami race condition by switching RealityCheck tracking to JS API with retry (500ms x5) and 1s impression debounce
