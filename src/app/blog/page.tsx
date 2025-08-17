import { type Metadata } from "next";
import { allBlogs } from "content-collections";
import Link from "next/link";
import count from 'word-count'
import { config } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Blogs | ${config.site.title}`,
  description: `Blogs of ${config.site.title}`,
  keywords: `${config.site.title}, blogs, ${config.site.title} blogs, nextjs blog template`,
};

export default function BlogPage() {
  const blogs = allBlogs.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="container-anthropic py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            All Articles
          </h1>
          <p className="text-lg text-secondary">
            A collection of thoughts on technology, development, and building the future.
          </p>
        </header>

        {/* Articles Grid */}
        <div className="space-y-8">
          {blogs.map((blog: any) => (
            <article key={blog.slug} className="group">
              <Link href={`/blog/${blog.slug}`} className="block">
                <div className="p-6 rounded-lg border border-border hover:border-muted hover:bg-subtle transition-anthropic">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="text-xl md:text-2xl font-semibold text-primary group-hover:text-link transition-anthropic leading-tight">
                        {blog.title}
                      </h2>
                      <div className="flex items-center gap-2 text-xs text-muted whitespace-nowrap">
                        <time dateTime={blog.date}>
                          {formatDate(blog.date)}
                        </time>
                        <span>·</span>
                        <span>{count(blog.content)} words</span>
                      </div>
                    </div>
                    
                    {blog.summary && (
                      <p className="text-secondary leading-relaxed line-clamp-2">
                        {blog.summary}
                      </p>
                    )}
                    
                    <div className="flex items-center text-link group-hover:text-link-hover transition-anthropic text-sm font-medium">
                      Read article
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-link hover:text-link-hover font-medium transition-anthropic"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}


