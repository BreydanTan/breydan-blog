import { allBlogs } from "content-collections";
import Link from "next/link";
import count from 'word-count'
import { config } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const blogs = allBlogs
    .filter((blog: any) => blog.featured === true)
    .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const socialLinks = [
    { name: "buyMeACoffee", key: "buyMeACoffee" },
    { name: "X", key: "x" },
    { name: "Linkedin", key: "linkedin" },
  ]
    .map(item => ({
      name: item.name,
      href: config.social && config.social[item.key as keyof typeof config.social]
    }))
    .filter(link => !!link.href);

  return (
    <main className="container-anthropic py-12 md:py-16">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto mb-16 md:mb-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight tracking-tight text-balance">
            {config.site.title}
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-2xl mx-auto text-balance">
            {config.author.bio}
          </p>
          
          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-6 pt-4">
              {socialLinks.map((link, index) => (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className="text-muted hover:text-primary transition-anthropic text-sm font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Articles Section */}
      <section className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
            Latest Articles
          </h2>
          <p className="text-secondary">
            Thoughts on technology, development, and building the future.
          </p>
        </div>

        <div className="space-y-8">
          {blogs.map((blog: any) => (
            <article key={blog.slug} className="group">
              <Link href={`/blog/${blog.slug}`} className="block">
                <div className="p-6 rounded-lg border border-border hover:border-muted hover:bg-subtle transition-anthropic">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-primary group-hover:text-link transition-anthropic leading-tight">
                        {blog.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted whitespace-nowrap">
                        <time dateTime={blog.date}>
                          {formatDate(blog.date)}
                        </time>
                        <span>·</span>
                        <span>{count(blog.content)} words</span>
                      </div>
                    </div>
                    <p className="text-secondary leading-relaxed line-clamp-2">
                      {blog.summary}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Articles Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-link hover:text-link-hover font-medium transition-anthropic"
          >
            View all articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
