import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Breadcrumbs } from "@/components/features/Breadcrumbs";
import { ContentRail } from "@/components/features/ContentRail";
import { blogPosts } from "@/lib/blog";
import { ArticleStructuredData, BreadcrumbStructuredData } from "@/components/SEO/StructuredData";
import RealityCheck from "@/components/RealityCheck";
import { HashScrollFix } from "@/components/HashScrollFix";
import { SurvivalKitPromo } from "@/components/monetization/SurvivalKitPromo";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import { rehypeVultrEnrich } from "@/lib/rehype-vultr-enrich";
import { rehypeGroupIds } from "@/lib/rehype-group-ids";
import { rehypeCollectHeadings, type TocItem } from "@/lib/rehype-collect-headings";
import { rehypeDecisionGate, preprocessDecisionGates } from "@/lib/rehype-decision-gate";
import { rehypeWrapRelatedSections } from "@/lib/rehype-wrap-related-sections";
import { rehypeWrapStuckSections } from "@/lib/rehype-wrap-stuck-sections";
import { rehypeClusterLinks } from "@/lib/rehype-cluster-links";
import rehypeRaw from "rehype-raw";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  const canonicalUrl = `https://openclaw-ai.org${post.canonicalPath}`;

  return {
    title: `${post.title} - OpenClaw Guides`,
    description: post.description,
    keywords: post.seoKeywords.join(", "),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonicalUrl,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

async function getPostContent(slug: string): Promise<{
  frontmatter: Record<string, unknown>;
  content: string;
  toc: TocItem[];
} | null> {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Preprocess :::decision-gate blocks before remark
  const contentWithGates = preprocessDecisionGates(content);

  const tocItems: TocItem[] = [];

  // Sanitize schema - allow Vultr affiliate links with security
  const classAttribute = "class";
  const schema = {
    ...defaultSchema,
    clobberPrefix: "",
    attributes: {
      ...(defaultSchema.attributes || {}),
      table: [...((defaultSchema.attributes || {}).table || []), classAttribute],
      thead: [...((defaultSchema.attributes || {}).thead || []), classAttribute],
      tbody: [...((defaultSchema.attributes || {}).tbody || []), classAttribute],
      tr: [...((defaultSchema.attributes || {}).tr || []), classAttribute],
      td: [...((defaultSchema.attributes || {}).td || []), classAttribute, "rowSpan", "colSpan"],
      th: [...((defaultSchema.attributes || {}).th || []), classAttribute, "rowSpan", "colSpan", "scope"],
      img: ["src", "alt", "title", "width", "height", classAttribute, "loading"],
      a: [
        "href",
        "title",
        "target",
        "rel",
        classAttribute,
        "data-umami-event",
        "data-umami-event-post",
        "data-umami-event-placement",
        "data-umami-event-cta-id",
        "data-umami-event-ref",
        "data-umami-event-utm_content",
        "data-umami-event-verdict",
        "data-link",
        "data-cta",
      ],
      // Schema.org attributes for FAQ structured data - explicit div/h3 support
      div: [
        classAttribute,
        "id",
        "data-block",
        "itemscope",
        "itemtype",
        "itemprop",
      ],
      h3: [
        classAttribute,
        "id",
        "itemscope",
        "itemtype",
        "itemprop",
      ],
      p: [
        classAttribute,
        "itemscope",
        "itemtype",
        "itemprop",
      ],
      "*": [
        ...((defaultSchema.attributes || {})["*"] || []),
        classAttribute,
        "id",
        "data-block",
        // Schema.org attributes for FAQ structured data
        "itemscope",
        "itemtype",
        "itemprop",
      ],
    },
    protocols: {
      ...(defaultSchema.protocols || {}),
      href: ["http", "https"],
      itemtype: ["https"],
    },
  };

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeGroupIds)
    .use(rehypeSlug)
    .use(rehypeCollectHeadings, { collector: tocItems })
    .use(rehypeVultrEnrich, { postSlug: slug, placementDefault: "mdx_auto" })
    .use(rehypeWrapRelatedSections)
    .use(rehypeWrapStuckSections)
    .use(rehypeClusterLinks)
    .use(rehypeSanitize, schema)
    .use(rehypeExternalLinks, {
      target: "_blank",
      rel: ["nofollow", "noopener", "noopener noreferrer"],
    })
    .use(rehypeStringify)
    .process(contentWithGates);

  return {
    frontmatter: data,
    content: processedContent.toString(),
    toc: tocItems,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const postContent = await getPostContent(post.slug);

  if (!postContent) {
    notFound();
  }

  return (
    <>
      <Navigation />
      <Suspense fallback={null}>
        <HashScrollFix />
      </Suspense>
      <main className="min-h-screen" data-section="guides">
        <ContentRail className="py-4">
          <header className="px-4 sm:px-6 py-8 pb-4">
            <Breadcrumbs
              items={[
                { label: "Guides", href: "/guides" },
                { label: post.title, href: post.canonicalPath },
              ]}
            />
          </header>

          <header className="px-4 sm:px-6 mb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-brand-primary/20 text-brand-primary rounded flex-shrink-0">
                {post.category}
              </span>
              <span className="text-xs sm:text-sm text-text-tertiary break-words">{post.date}</span>
            </div>
            <h1 className="heading-page text-text-primary mb-4 break-words leading-tight">
              {post.title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 break-words">
              {post.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-text-tertiary">
              <span>By: {post.author}</span>
              <span>•</span>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-brand-primary break-words">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Reality Check Calculator - Array Whitelist */}
          {(() => {
            // 工具页面白名单：只在这些页面显示 VRAM 计算器
            const CALCULATOR_WHITELIST = [
              "hardware-requirements-reality-check",  // 硬件需求页面
              "openclaw-error-index",                  // 错误索引（包含硬件相关错误）
            ] as const;

            const shouldShow = CALCULATOR_WHITELIST.includes(post.slug as any);

            // 调试日志（生产环境可移除）
            if (typeof window !== "undefined") {
              console.log("[RealityCheck] Current slug:", post.slug, "Show:", shouldShow);
            }

            return shouldShow ? (
              <section className="px-4 sm:px-6 mb-8">
                <RealityCheck />
              </section>
            ) : null;
          })()}

          <section className="px-4 sm:px-6">
            <article
              className="glass-card w-full p-6 prose prose-invert prose-sm md:prose-base prose-max-w-none break-words"
              style={{ maxWidth: 'unset' }}
              dangerouslySetInnerHTML={{ __html: postContent.content }}
            />
          </section>

          {post.slug !== "openclaw-error-index" && (
            <section className="px-4 sm:px-6 mt-12">
              <div className="pt-8 border-t border-white/10">
                <p className="text-xl font-semibold text-text-primary mb-2">
                  Bookmark this site
                </p>
                <p className="text-text-secondary mb-4">
                  New fixes are added as soon as they appear on GitHub Issues.
                </p>
                <Link
                  href="/guides/openclaw-error-index"
                  className="text-sm font-medium text-brand-primary hover:underline inline-flex items-center gap-1"
                  data-link="brand"
                >
                  Browse Error Index &rarr;
                </Link>
              </div>
            </section>
          )}

          {/* Gumroad 推广 - 底部 (full) */}
          <section className="px-4 sm:px-6 mb-8">
            <SurvivalKitPromo variant="full" placement="bottom" />
          </section>
        </ContentRail>
      </main>

      <Footer />

      <ArticleStructuredData
        title={post.title}
        description={post.description}
        datePublished={post.date}
        author={post.author}
        url={`https://openclaw-ai.org${post.canonicalPath}`}
      />

      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "https://openclaw-ai.org" },
          { name: "Guides", url: "https://openclaw-ai.org/guides" },
          { name: post.title, url: `https://openclaw-ai.org${post.canonicalPath}` },
        ]}
      />
    </>
  );
}
