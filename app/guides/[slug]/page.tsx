import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Breadcrumbs } from "@/components/features/Breadcrumbs";
import { blogPosts } from "@/lib/blog";
import { ArticleStructuredData, BreadcrumbStructuredData } from "@/components/SEO/StructuredData";
import { Button } from "@/components/ui/Button";
import { VramCalculator } from "@/components/tools/vram-calculator";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

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

async function getPostContent(slug: string) {
  const postsDirectory = path.join(process.cwd(), "content/posts");
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    frontmatter: data,
    content: processedContent.toString(),
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

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
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

          {/* Article Body */}
          <div
            className="glass-card p-4 sm:p-6 md:p-8 prose prose-invert prose-sm md:prose-base max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-secondary prose-pre:border prose-pre:border-border prose-blockquote:border-brand-primary prose-blockquote:bg-brand-muted/20 prose-blockquote:text-muted-foreground prose-img:rounded-lg prose-hr:border-border break-words"
            dangerouslySetInnerHTML={{ __html: postContent.content }}
          />

          {/* VRAM Calculator - Only for hardware requirements article */}
          {post.slug === "hardware-requirements-reality-check" && <VramCalculator />}

          {/* Article Bottom CTA */}
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
        </article>
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
