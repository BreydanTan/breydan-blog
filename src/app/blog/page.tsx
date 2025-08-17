import { type Metadata } from "next";
import { allBlogs } from "content-collections";
import Link from "next/link";
import count from "word-count";
import { config } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Blogs | ${config.site.title}`,
  description: `Blogs of ${config.site.title}`,
  keywords: `${config.site.title}, blogs, ${config.site.title} blogs, nextjs blog template`,
};

export default function BlogPage() {
  const blogs = allBlogs.sort(
    (a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate blog statistics
  const totalWords = blogs.reduce(
    (acc: number, blog: any) => acc + count(blog.content),
    0
  );
  const averageReadTime = Math.ceil(totalWords / blogs.length / 200);
  const featuredBlogs = blogs.filter((blog: any) => blog.featured);

  // Group blogs by year for better organization
  const blogsByYear = blogs.reduce((acc: any, blog: any) => {
    const year = new Date(blog.date).getFullYear();
    if (!acc[year]) acc[year] = [];
    acc[year].push(blog);
    return acc;
  }, {});

  const years = Object.keys(blogsByYear).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  return (
    <div className="container-anthropic py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <header className="mb-12 md:mb-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            All Articles
          </h1>
          <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
            A collection of thoughts on technology, development, and building
            the future. Exploring AI, modern web development, and the tools
            shaping our digital world.
          </p>

          {/* Blog Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-subtle p-6 rounded-lg border border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {blogs.length}
              </div>
              <div className="text-sm text-muted">Articles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {totalWords.toLocaleString()}
              </div>
              <div className="text-sm text-muted">Total Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {averageReadTime}
              </div>
              <div className="text-sm text-muted">Avg. Read Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {years.length}
              </div>
              <div className="text-sm text-muted">Years Writing</div>
            </div>
          </div>
        </header>

        {/* Featured Articles */}
        {featuredBlogs.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-8 flex items-center gap-2">
              <span className="text-yellow-500">⭐</span>
              Featured Articles
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredBlogs.slice(0, 4).map((blog: any) => (
                <article key={blog.slug} className="group">
                  <Link href={`/blog/${blog.slug}`} className="block">
                    <div className="p-6 rounded-lg border-2 border-primary/20 bg-gradient-to-br from-subtle to-background hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-semibold text-primary group-hover:text-link transition-anthropic leading-tight">
                            {blog.title}
                          </h3>
                          <span className="text-xs text-muted bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap">
                            Featured
                          </span>
                        </div>
                        {blog.summary && (
                          <p className="text-secondary text-sm leading-relaxed line-clamp-2">
                            {blog.summary}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-xs text-muted">
                          <time dateTime={blog.date}>
                            {formatDate(blog.date)}
                          </time>
                          <span>
                            {Math.ceil(count(blog.content) / 200)} min read
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Articles by Year */}
        <section className="space-y-12">
          {years.map((year) => (
            <div key={year}>
              <h2 className="text-2xl font-semibold text-primary mb-8 flex items-center gap-3">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-lg">
                  {year}
                </span>
                <span className="text-sm text-muted font-normal">
                  {blogsByYear[year].length} article
                  {blogsByYear[year].length !== 1 ? "s" : ""}
                </span>
              </h2>

              <div className="space-y-6">
                {blogsByYear[year].map((blog: any) => (
                  <article key={blog.slug} className="group">
                    <Link href={`/blog/${blog.slug}`} className="block">
                      <div className="p-6 rounded-lg border border-border hover:border-muted hover:bg-subtle transition-anthropic">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <h3 className="text-xl font-semibold text-primary group-hover:text-link transition-anthropic leading-tight">
                              {blog.title}
                            </h3>
                            <div className="flex items-center gap-3 text-xs text-muted whitespace-nowrap">
                              <time
                                dateTime={blog.date}
                                className="bg-subtle px-2 py-1 rounded"
                              >
                                {formatDate(blog.date)}
                              </time>
                              <span className="bg-subtle px-2 py-1 rounded">
                                {count(blog.content)} words
                              </span>
                              <span className="bg-subtle px-2 py-1 rounded">
                                {Math.ceil(count(blog.content) / 200)} min
                              </span>
                            </div>
                          </div>

                          {blog.summary && (
                            <p className="text-secondary leading-relaxed line-clamp-2">
                              {blog.summary}
                            </p>
                          )}

                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-link group-hover:text-link-hover transition-anthropic text-sm font-medium">
                              Read article
                              <svg
                                className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </div>

                            {blog.featured && (
                              <span className="text-xs text-yellow-600 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-full">
                                ⭐ Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-primary/5 to-link/5 p-8 rounded-lg border border-border text-center">
          <h3 className="text-xl font-semibold text-primary mb-3">
            Stay Updated
          </h3>
          <p className="text-secondary mb-6 max-w-md mx-auto">
            Get notified when I publish new articles about AI, development, and
            technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-anthropic font-medium">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-muted mt-3">
            No spam, unsubscribe at any time.
          </p>
        </section>

        {/* Back to Home */}
        <div className="mt-16 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-link hover:text-link-hover font-medium transition-anthropic"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
