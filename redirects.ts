/**
 * 404 Redirect Map - P0 Technical Debt Fix
 *
 * Common 404 URLs → Target destination
 * Based on valid routes from app/ directory and lib/blog.ts slugs
 */

export default {
  // ============================================================================
  // COMMON TYPO / OLD URL REDIRECTS
  // ============================================================================

  // Hardware check variations
  "/hardware-reality-check": "/guides/hardware-requirements-reality-check",
  "/reality-check": "/guides/hardware-requirements-reality-check",
  "/vram-calculator": "/guides/hardware-requirements-reality-check",
  "/hardware": "/guides/hardware-requirements-reality-check",
  "/can-i-run": "/guides/hardware-requirements-reality-check",

  // Troubleshooting redirects
  "/troubleshoot": "/troubleshooting",
  "/errors": "/guides/openclaw-error-index",
  "/error-index": "/guides/openclaw-error-index",
  "/fix": "/troubleshooting",

  // Guide redirects (old /doc patterns)
  "/docs/guides": "/guides",
  "/doc/guides": "/guides",
  "/guide": "/guides",

  // OOM redirects
  "/oom-errors": "/guides/fix-openclaw-cuda-oom-errors",
  "/out-of-memory": "/guides/fix-openclaw-cuda-oom-errors",
  "/vram-error": "/guides/fix-openclaw-cuda-oom-errors",

  // Windows-specific redirects
  "/windows": "/guides/fix-openclaw-spawn-npm-enoent-windows",
  "/windows-fix": "/guides/fix-openclaw-spawn-npm-enoent-windows",
  "/powershell": "/guides/fix-openclaw-install-ps1-npm-enoent-windows",

  // JSON mode redirects
  "/json-error": "/guides/fix-openclaw-json-mode-errors",
  "/json-fix": "/guides/fix-openclaw-json-mode-errors",

  // ============================================================================
  // SLUG VARIATIONS (common mistakes)
  // ============================================================================

  // Hardware requirements
  "/hardware-requirements": "/guides/hardware-requirements-reality-check",

  // DeepSeek guide
  "/deepseek": "/guides/how-to-use-deepseek-with-openclaw",
  "/deepseek-guide": "/guides/how-to-use-deepseek-with-openclaw",
  "/r1": "/guides/how-to-use-deepseek-with-openclaw",

  // ============================================================================
  // LEGACY / BROKEN BACKLINKS (from GSC data)
  // ============================================================================

  // Common trailing slash or extension mistakes
  "/index": "/",
  "/home": "/",

  // ============================================================================
  // FALLBACK FOR UNKNOWN GUIDES
  // ============================================================================

  // If someone tries to access a guide-like URL without /guides/ prefix
  // This is handled by Next.js dynamic routing, but listing for clarity
} as const;
