import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Breadcrumbs } from "@/components/features/Breadcrumbs";
import { blogPosts } from "@/lib/blog";
import { ArticleStructuredData, BreadcrumbStructuredData } from "@/components/SEO/StructuredData";
import { Button } from "@/components/ui/Button";
import RealityCheck from "@/components/RealityCheck";
import { HashScrollFix } from "@/components/HashScrollFix";
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
import { TableOfContents, MobileTableOfContents } from "@/components/features/TableOfContents";

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
  // Merge with defaultSchema to preserve table support
  // NOTE: rehype-sanitize uses HTML attribute names (class), not React (className)
  const classAttribute = "class";
  const schema = {
    ...defaultSchema,
    clobberPrefix: "",  // Preserve original IDs (e.g., group-1) without user-content- prefix
    attributes: {
      ...(defaultSchema.attributes || {}),
      // Preserve default table attributes and add class
      table: [...((defaultSchema.attributes || {}).table || []), classAttribute],
      thead: [...((defaultSchema.attributes || {}).thead || []), classAttribute],
      tbody: [...((defaultSchema.attributes || {}).tbody || []), classAttribute],
      tr: [...((defaultSchema.attributes || {}).tr || []), classAttribute],
      td: [...((defaultSchema.attributes || {}).td || []), classAttribute, "rowSpan", "colSpan"],
      th: [...((defaultSchema.attributes || {}).th || []), classAttribute, "rowSpan", "colSpan", "scope"],
      a: [
        "href",
        "title",
        "target",
        "rel",
        classAttribute,
        // Umami tracking attributes
        "data-umami-event",
        "data-umami-event-post",
        "data-umami-event-placement",
        "data-umami-event-cta-id",
        "data-umami-event-ref",
        "data-umami-event-utm_content",
        "data-umami-event-verdict",
      ],
      // Add class to all elements
      "*": [...((defaultSchema.attributes || {})["*"] || []), classAttribute, "id"],
    },
    protocols: {
      ...(defaultSchema.protocols || {}),
      href: ["http", "https"],
    },
  };

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeGroupIds)           // Assign clean IDs to Group headings
    .use(rehypeSlug)               // Generate slugs for other headings
    .use(rehypeCollectHeadings, { collector: tocItems })  // Collect h2/h3 for TOC (after rehypeSlug)
    .use(rehypeVultrEnrich, { postSlug: slug, placementDefault: "mdx_auto" })
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
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
          <Breadcrumbs
            items={[
              { label: "Guides", href: "/guides" },
              { label: post.title, href: post.canonicalPath },
            ]}
          />
        </div>

        {/* Article Content + TOC */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* Mobile TOC */}
          <div className="lg:hidden mb-6">
            <MobileTableOfContents items={postContent.toc} />
          </div>

          {/* Two-column grid: article + TOC */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_256px] gap-8">
            {/* Left: Article */}
            <article>
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                  <span className="px-3 py-1 text-sm font-medium bg-brand-primary/20 text-brand-primary rounded flex-shrink-0">
                    {post.category}
                  </span>
                  <span className="text-xs sm:text-sm text-text-tertiary break-words">{post.date}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 break-words leading-tight">
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

              {/* RealityCheck Calculator - For specific articles */}
              {(post.slug === "hardware-requirements-reality-check" || post.slug === "fix-openclaw-install-ps1-npm-enoent-windows") && <RealityCheck />}

              {/* Article Body */}
              <div
                className="glass-card p-4 sm:p-6 md:p-8 prose prose-invert prose-sm md:prose-base prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-blockquote:border-brand-primary prose-blockquote:bg-brand-muted/20 prose-blockquote:text-muted-foreground prose-img:rounded-lg prose-hr:border-border break-words"
                dangerouslySetInnerHTML={{ __html: postContent.content }}
              />

              {/* Article Bottom CTA - Skip on error index page */}
              {post.slug !== "openclaw-error-index" && (
                <div className="mt-12 p-6 bg-muted rounded-xl border border-border">
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Bookmark this site
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    New fixes are added as soon as they appear on GitHub Issues.
                  </p>
                  <Link
                    href="/guides/openclaw-error-index"
                    className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Browse Error Index &rarr;
                  </Link>
                </div>
              )}
            </article>

            {/* Right: Desktop TOC */}
            <div className="hidden lg:block">
              <TableOfContents items={postContent.toc} />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Article Structured Data */}
      <ArticleStructuredData
        title={post.title}
        description={post.description}
        datePublished={post.date}
        author={post.author}
        url={`https://openclaw-ai.org${post.canonicalPath}`}
      />

      {/* Breadcrumb Structured Data */}
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
