import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

// Static routes with their SEO priorities
const staticRoutes: Array<{
  url: string;
  lastModified?: string;
  changeFrequency?: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}> = [
  {
    url: "https://openclaw-ai.org",
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: "https://openclaw-ai.org/guides",
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    url: "https://openclaw-ai.org/docs",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "https://openclaw-ai.org/faq",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    url: "https://openclaw-ai.org/troubleshooting",
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    url: "https://openclaw-ai.org/quick-start",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    url: "https://openclaw-ai.org/resources",
    changeFrequency: "monthly",
    priority: 0.6,
  },
  {
    url: "https://openclaw-ai.org/oom",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static routes
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route.url,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Dynamic blog/guide routes
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://openclaw-ai.org${post.canonicalPath}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
