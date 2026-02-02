import { Navigation } from "@/components/features/Navigation";
import { Footer } from "@/components/features/Footer";
import { Breadcrumbs } from "@/components/features/Breadcrumbs";
import { blogPosts } from "@/lib/blog";
import { ArticleStructuredData } from "@/components/SEO/StructuredData";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

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

  return {
    title: `${post.title} - OpenClaw Guides`,
    description: post.description,
    keywords: post.seoKeywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://openclaw-ai.org/guides/${post.slug}`,
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
              { label: post.title, href: `/guides/${post.slug}` },
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
            className="glass-card p-4 sm:p-6 md:p-8 prose prose-invert prose-sm md:prose-base max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-text-primary prose-code:text-blue-300 prose-code:bg-background-tertiary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-blockquote:border-brand-primary prose-blockquote:bg-brand-muted/20 prose-blockquote:text-text-secondary prose-img:rounded-lg prose-hr:border-white/10 break-words"
            dangerouslySetInnerHTML={{ __html: postContent.content }}
          />

          {/* Article Bottom CTA */}
          <div className="mt-12 p-6 bg-brand-muted/20 rounded-xl border border-brand-primary/30">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Want More Practical Tutorials?
            </h3>
            <p className="text-text-secondary mb-4">
              Subscribe to our blog for the latest OpenClaw tutorials and tips.
            </p>
            <Button href="/resources">
              View Recommended Resources
            </Button>
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
        url={`https://openclaw-ai.org/guides/${post.slug}`}
      />
    </>
  );
}
