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
}

// Blog post metadata (extracted from frontmatter)
export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-use-deepseek-with-openclaw",
    title: "How to Run OpenClaw with DeepSeek R1: The Zero-Cost Local Agent Guide",
    description: "Claude API too expensive? Try the free DeepSeek R1. Step-by-step guide to configure DeepSeek with OpenClaw for zero-cost local AI agents.",
    date: "2026-02-01",
    author: "OpenClaw Community",
    tags: ["DeepSeek", "Tutorial", "Local Deployment", "Cost Optimization"],
    category: "Tutorial",
    featured: true,
    seoKeywords: ["DeepSeek R1", "OpenClaw tutorial", "Local LLM Agent", "DeepSeek API setup"],
  },
  {
    slug: "deepseek-guide-cn",
    title: "如何使用 DeepSeek R1 驱动 OpenClaw：零成本打造本地最强 AI 员工",
    description: "Claude API 太贵？试试免费的 DeepSeek R1。手把手教你配置 DeepSeek 驱动 OpenClaw，实现零成本本地 AI 员工。",
    date: "2026-02-01",
    author: "OpenClaw 中文社区",
    tags: ["DeepSeek", "教程", "本地部署", "降本增效"],
    category: "教程",
    featured: false,
    seoKeywords: ["DeepSeek R1", "OpenClaw 教程", "本地 LLM Agent", "DeepSeek 配置"],
  },
];
