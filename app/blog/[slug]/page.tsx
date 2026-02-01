import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { blogPosts } from "@/lib/blog";
import { ArticleStructuredData } from "@/components/SEO/StructuredData";
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  return {
    title: `${post.title} - OpenClaw 博客`,
    description: post.description,
    keywords: post.seoKeywords.join(", "),
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://openclaw-ai.org/blog/${post.slug}`,
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

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

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
        {/* 面包屑 */}
        <div className="max-w-4xl mx-auto px-6 pt-8">
          <Breadcrumbs
            items={[
              { label: "博客", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
        </div>

        {/* 文章内容 */}
        <article className="max-w-4xl mx-auto px-6 py-8">
          {/* 文章头部 */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-brand-primary/20 text-brand-primary rounded">
                {post.category}
              </span>
              <span className="text-sm text-text-tertiary">{post.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {post.title}
            </h1>
            <p className="text-xl text-text-secondary mb-6">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-text-tertiary">
              <span>作者: {post.author}</span>
              <span>•</span>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-brand-primary">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* 文章正文 */}
          <div
            className="glass-card p-8 prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: postContent.content }}
          />

          {/* 文章底部 CTA */}
          <div className="mt-12 p-6 bg-brand-muted/20 rounded-xl border border-brand-primary/30">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              想要更多实用教程？
            </h3>
            <p className="text-text-secondary mb-4">
              订阅我们的博客，获取最新的 OpenClaw 教程和技巧。
            </p>
            <Link
              href="/resources"
              className="inline-block px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg transition-colors"
            >
              查看推荐资源
            </Link>
          </div>
        </article>
      </main>

      <Footer />

      {/* Article 结构化数据 */}
      <ArticleStructuredData
        title={post.title}
        description={post.description}
        datePublished={post.date}
        author={post.author}
        url={`https://openclaw-ai.org/blog/${post.slug}`}
      />
    </>
  );
}
