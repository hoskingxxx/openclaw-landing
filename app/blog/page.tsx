import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NextStepCard } from "@/components/NextSteps";
import { blogPosts } from "@/lib/blog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw Blog - Tutorials, Cases and Best Practices",
  description: "Deep dive into OpenClaw tips, deployment guides, real-world cases and latest updates. DeepSeek, local deployment, AI Agent architecture explained.",
  openGraph: {
    title: "OpenClaw Blog - Tutorials, Cases and Best Practices",
    description: "Deep dive into OpenClaw tips, deployment guides, real-world cases and latest updates.",
    url: "https://openclaw-ai.org/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
        </div>

        {/* Page Title */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            OpenClaw Blog
          </h1>
          <p className="text-xl text-text-secondary">
            Tutorials, Cases and Best Practices
          </p>
        </section>

        {/* Featured Posts */}
        {blogPosts.filter((post) => post.featured).length > 0 && (
          <section className="max-w-7xl mx-auto px-6 pb-12">
            <h2 className="text-2xl font-bold text-text-primary mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter((post) => post.featured).map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="glass-card p-6 hover:bg-white/12 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium bg-brand-primary/20 text-brand-primary rounded">
                      Hot
                    </span>
                    <span className="text-xs text-text-tertiary">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-background-tertiary text-text-secondary rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Posts */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">All Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="glass-card p-6 hover:bg-white/12 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-text-tertiary">{post.date}</span>
                  <span className="px-2 py-1 text-xs bg-background-tertiary text-text-secondary rounded">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-brand-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-text-secondary mb-4 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-background-tertiary text-text-secondary rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Next Step */}
        <NextStepCard
          icon="🛠️"
          title="View Resources"
          description="Curated VPS, API and tool recommendations to help you quickly set up OpenClaw."
          href="/resources"
          linkText="View Recommended Resources"
        />
      </main>
      <Footer />
    </>
  );
}
