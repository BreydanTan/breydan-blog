import Link from "next/link";
import { allBlogs } from "content-collections";
import { SectionHeader } from "@/components/ui/section-header";
import { BlogCard } from "@/components/blog-card";
import { ArrowRight } from "lucide-react";

export function LatestArticles() {
  const latestBlogs = allBlogs
    .filter((blog: any) => blog.featured === true)
    .sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3);

  if (latestBlogs.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Latest Articles ↓"
          description="Thoughts on technology, development, and building the future."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latestBlogs.map((blog: any) => (
            <BlogCard key={blog.slug} blog={blog} />
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-link-hover font-medium transition-colors group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
