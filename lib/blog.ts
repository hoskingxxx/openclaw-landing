// Blog post type definitions
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  category: string;
  featured: boolean;
  seoKeywords: string[];
  // Single source of truth for the URL path
  readonly canonicalPath: string;
}

// ============================================================================
// Route Configuration (Single Source of Truth)
// ============================================================================
// All article URLs are generated from this configuration.
// DO NOT manually construct paths in components - use post.canonicalPath
// ============================================================================
const BLOG_ROUTE_PREFIX = "/guides";

function createCanonicalPath(slug: string): string {
  return `${BLOG_ROUTE_PREFIX}/${slug}`;
}

// Blog post metadata (extracted from frontmatter)
export const blogPosts: BlogPost[] = [
  {
    slug: "openclaw-security-rce-cve-2026-25253",
    canonicalPath: createCanonicalPath("openclaw-security-rce-cve-2026-25253"),
    title: "CVE-2026-25253: OpenClaw RCE Vulnerability - Critical Security Alert",
    description: "OpenClaw has a critical Remote Code Execution vulnerability. Learn how to patch it, or use a VPS to isolate your AI setup.",
    date: "2026-02-03",
    author: "LazyDev",
    tags: ["Security", "CVE", "RCE", "OpenClaw", "Vulnerability"],
    category: "Security",
    featured: false,
    seoKeywords: ["OpenClaw RCE", "CVE-2026-25253", "OpenClaw vulnerability", "OpenClaw security", "AI security"],
  },
  {
    slug: "how-to-use-deepseek-with-openclaw",
    canonicalPath: createCanonicalPath("how-to-use-deepseek-with-openclaw"),
    title: "Running OpenClaw with DeepSeek R1: The Unofficial, Battle-Tested Guide",
    description: "An honest, no-BS guide to running OpenClaw with DeepSeek R1. What works, what crashes, and why your laptop is not enough.",
    date: "2026-02-01",
    author: "LazyDev",
    tags: ["DeepSeek", "OpenClaw", "Tutorial", "Local Deployment"],
    category: "Tutorial",
    featured: false,
    seoKeywords: ["DeepSeek R1", "OpenClaw configuration", "Local LLM setup", "Hardware requirements"],
  },
  {
    slug: "fix-openclaw-json-mode-errors",
    canonicalPath: createCanonicalPath("fix-openclaw-json-mode-errors"),
    title: "How to fix OpenClaw JSON Mode parsing errors with DeepSeek R1",
    description: "OpenClaw fails to parse JSON responses from DeepSeek R1. Learn why the thinking tags break JSON mode and how to fix it with a simple system prompt adjustment.",
    date: "2026-02-03",
    author: "LazyDev",
    tags: ["DeepSeek", "OpenClaw", "JSON", "Troubleshooting", "R1"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["OpenClaw JSON error", "DeepSeek R1 JSON mode", "OpenClaw parsing failed", "DeepSeek thinking tags"],
  },
  {
    slug: "fix-openclaw-cuda-oom-errors",
    canonicalPath: createCanonicalPath("fix-openclaw-cuda-oom-errors"),
    title: "Fix OpenClaw CUDA OOM: The $0.50 Solution vs. The 4-Hour Debug",
    description: "Stop fighting VRAM physics. Copy my config to fix OOM on RTX 3090, or see why renting an H100 is cheaper than your hourly rate.",
    date: "2026-02-03",
    author: "LazyDev",
    tags: ["CUDA", "OOM", "DeepSeek", "OpenClaw", "VRAM", "Troubleshooting"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["OpenClaw CUDA OOM", "DeepSeek R1 out of memory", "OpenClaw VRAM error", "CUDA out of memory fix", "GPU memory optimization"],
  },
  {
    slug: "fix-openclaw-slow-inference",
    canonicalPath: createCanonicalPath("fix-openclaw-slow-inference"),
    title: "OpenClaw Slow Inference? Why 3.5s/token Is Normal (And How to Fix It)",
    description: "OpenClaw generating at 3.5 seconds per token? That's painfully slow. Learn why Mac RAM bandwidth kills inference speed, and see the config that gets you to 100 t/s.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Performance", "Slow", "Inference", "OpenClaw", "VRAM", "Troubleshooting"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["OpenClaw slow", "OpenClaw inference speed", "OpenClaw 3s per token", "OpenClaw tokens per second", "why is OpenClaw so slow"],
  },
  {
    slug: "fix-openclaw-spawn-npm-enoent",
    canonicalPath: createCanonicalPath("fix-openclaw-spawn-npm-enoent"),
    title: "Fix 'Failed to start CLI: Error: spawn npm ENOENT' in OpenClaw",
    description: "See the 'spawn npm ENOENT' error? It means Node/NPM is missing or not in your PATH. Here is the instant fix for Mac, Linux, and Docker.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Troubleshooting", "Environment", "Node.js"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["openclaw npm error", "spawn npm enoent", "openclaw nodejs missing", "openclaw cli failed to start"],
  },
  {
    slug: "fix-openclaw-spawn-npm-enoent-windows",
    canonicalPath: createCanonicalPath("fix-openclaw-spawn-npm-enoent-windows"),
    title: "Fix 'Failed to start CLI: Error: spawn npm ENOENT' on Windows",
    description: "Can't install plugins on Windows? Here is the manual fix (xcopy) and the Node LTS solution.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Troubleshooting", "Windows", "Node.js", "Environment"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["openclaw windows error", "spawn npm enoent windows", "openclaw plugin install fail", "openclaw windows npm", "openclaw @m1heng openclaw"],
  },
  {
    slug: "fix-openclaw-spawn-einval-windows",
    canonicalPath: createCanonicalPath("fix-openclaw-spawn-einval-windows"),
    title: "Fix 'Failed to start CLI: Error: spawn EINVAL' in OpenClaw",
    description: "OpenClaw plugin install fails with 'spawn EINVAL'? Here is the Admin PowerShell fix.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Troubleshooting", "Windows", "Node.js", "Permissions"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["openclaw einval", "spawn einval windows", "openclaw plugin install error", "openclaw windows permission", "openclaw invalid argument"],
  },
  {
    slug: "fix-openclaw-docker-eacces-permission-denied",
    canonicalPath: createCanonicalPath("fix-openclaw-docker-eacces-permission-denied"),
    title: "Fix 'Error: EACCES: permission denied' in OpenClaw Docker (openclaw.json)",
    description: "Docker permission denied? Here is the chown fix and rootless solution.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Troubleshooting", "Docker", "Linux", "Permissions"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["openclaw docker permission denied", "eacces openclaw.json", "docker volume permission", "openclaw docker eacces", "docker uid mismatch"],
  },
  {
    slug: "fix-openclaw-cannot-find-module-clipboard-linux-arm",
    canonicalPath: createCanonicalPath("fix-openclaw-cannot-find-module-clipboard-linux-arm"),
    title: "Fix 'Cannot find module @mariozechner/clipboard-linux-arm-gnueabihf' in OpenClaw",
    description: "Fix OpenClaw crash on Linux ARM due to missing clipboard module.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Troubleshooting", "Linux", "ARM", "Node.js"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["openclaw arm crash", "cannot find module clipboard-linux-arm", "openclaw raspberry pi error", "@mariozechner/clipboard-linux-arm-gnueabihf not found", "openclaw linux arm error"],
  },
  {
    slug: "fix-openclaw-install-ps1-npm-enoent-windows",
    canonicalPath: createCanonicalPath("fix-openclaw-install-ps1-npm-enoent-windows"),
    title: "Fix 'npm error code ENOENT' in install.ps1 on Windows",
    description: "Installer crashes with ENOENT? Refresh your PATH or reinstall Node.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Troubleshooting", "Windows"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["openclaw install.ps1 error", "npm error code enoent windows", "openclaw install failed"],
  },
  {
    slug: "fix-openclaw-package-json-missing-openclaw-extensions",
    canonicalPath: createCanonicalPath("fix-openclaw-package-json-missing-openclaw-extensions"),
    title: "Fix 'package.json missing openclaw.extensions' error",
    description: "Plugin install failed? Use the unified channels package instead.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Troubleshooting", "Plugins"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["package.json missing openclaw.extensions", "openclaw plugin install error"],
  },
  {
    slug: "openclaw-error-index",
    canonicalPath: createCanonicalPath("openclaw-error-index"),
    title: "OpenClaw Error Index (Master Dictionary)",
    description: "A searchable dictionary of OpenClaw errors and fixes. Copy your error message and jump to the exact solution.",
    date: "2026-02-04",
    author: "LazyDev",
    tags: ["Troubleshooting", "Index", "Errors"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["openclaw error codes", "openclaw error index", "openclaw troubleshooting", "openclash crash logs"],
  },
  {
    slug: "hardware-requirements-reality-check",
    canonicalPath: createCanonicalPath("hardware-requirements-reality-check"),
    title: "Can Your PC Run OpenClaw? Hardware Reality Check",
    description: "VRAM requirements and performance reality check for local vs cloud setups.",
    date: "2026-02-05",
    author: "LazyDev",
    tags: ["Hardware", "Requirements", "Performance"],
    category: "Troubleshooting",
    featured: true,
    seoKeywords: ["openclaw hardware requirements", "vram calculator", "deepseek r1 system requirements"],
  },

  {
    slug: "openclaw-agent-api-cost-model",
    canonicalPath: createCanonicalPath("openclaw-agent-api-cost-model"),
    title: "Why OpenClaw Agents Blow Up API Bills: The Loop Cost Model",
    description: "Math model to estimate agent token burn, find API vs GPU breakpoint, and choose the correct architecture.",
    date: "2026-02-05",
    author: "LazyDev",
    tags: ["openclaw","agents","api-cost","gpu","deepseek"],
    category: "Troubleshooting",
    featured: false,
    seoKeywords: ["openclaw agent cost","openclaw api cost","agent token usage","api vs gpu cost","deepseek agent tokens"],
  },

];

// ============================================================================
// Validation: Build-time check for dead links
// ============================================================================
// This function is called during build to verify all posts have valid content files
// ============================================================================
export function validateBlogPosts(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const fs = require("fs");
  const path = require("path");

  for (const post of blogPosts) {
    // Check if canonicalPath is correctly formatted
    if (!post.canonicalPath.startsWith(BLOG_ROUTE_PREFIX)) {
      errors.push(`Post "${post.slug}" has invalid canonicalPath: ${post.canonicalPath}. Must start with ${BLOG_ROUTE_PREFIX}/`);
    }

    // Check if content file exists
    const contentPath = path.join(process.cwd(), "content/posts", `${post.slug}.mdx`);
    if (!fs.existsSync(contentPath)) {
      errors.push(`Post "${post.slug}" references non-existent content file: ${contentPath}`);
    }

    // Verify slug matches canonicalPath suffix
    const expectedSuffix = post.canonicalPath.replace(`${BLOG_ROUTE_PREFIX}/`, "");
    if (post.slug !== expectedSuffix) {
      errors.push(`Post "${post.slug}" has mismatch between slug and canonicalPath. Expected suffix: ${expectedSuffix}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================================================
// Helper: Get post by slug
// ============================================================================
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

// ============================================================================
// Helper: Get all slugs for static generation
// ============================================================================
export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

// ============================================================================
// Helper: Get featured post canonical path (for hardcoded links)
// ============================================================================
export function getFeaturedPostPath(): string {
  const featured = blogPosts.find((p) => p.featured);
  if (!featured) {
    throw new Error("No featured post found. Please mark a post as featured: true in lib/blog.ts");
  }
  return featured.canonicalPath;
}

// HARDCODED PATH - Nuclear fix for redirect loop
// Updated to point to new security article
export const FEATURED_POST_PATH = "/guides/openclaw-security-rce-cve-2026-25253";

// ============================================================================
// Export for convenience
// ============================================================================
export default {
  blogPosts,
  validateBlogPosts,
  getPostBySlug,
  getAllSlugs,
};
