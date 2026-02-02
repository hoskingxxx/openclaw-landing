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
    slug: "how-to-use-deepseek-with-openclaw",
    canonicalPath: createCanonicalPath("how-to-use-deepseek-with-openclaw"),
    title: "Running OpenClaw with DeepSeek R1: The Unofficial, Battle-Tested Guide",
    description: "An honest, no-BS guide to running OpenClaw with DeepSeek R1. What works, what crashes, and why your laptop is not enough.",
    date: "2026-02-01",
    author: "LazyDev",
    tags: ["DeepSeek", "OpenClaw", "Tutorial", "Local Deployment"],
    category: "Tutorial",
    featured: true,
    seoKeywords: ["DeepSeek R1", "OpenClaw configuration", "Local LLM setup", "Hardware requirements"],
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

// Export the featured post path directly for convenience
export const FEATURED_POST_PATH = getFeaturedPostPath();

// ============================================================================
// Export for convenience
// ============================================================================
export default {
  blogPosts,
  validateBlogPosts,
  getPostBySlug,
  getAllSlugs,
};
