"use client";

import Link from "next/link";
import { formatDate } from "@/lib/utils";
import count from "word-count";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface BlogCardProps {
  blog: any;
  featured?: boolean;
}

export function BlogCard({ blog, featured = false }: BlogCardProps) {
  const readingTime = Math.ceil(count(blog.content) / 200);

  if (featured) {
    // Horizontal layout for featured posts
    return (
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="group"
      >
        <Link href={`/blog/${blog.slug}`}>
          <div className="grid md:grid-cols-2 gap-6 p-6 md:p-8 rounded-2xl border-2 border-border hover:border-primary/50 bg-card transition-all duration-300 hover:shadow-lg">
            {/* Image */}
            <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                  Featured
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <time dateTime={blog.date}>{formatDate(blog.date)}</time>
                <span>·</span>
                <span>{readingTime} min read</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold font-brand text-primary group-hover:text-link-hover transition-colors line-clamp-2">
                {blog.title}
              </h3>

              <p className="text-secondary leading-relaxed line-clamp-3">
                {blog.summary}
              </p>

              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                Read More
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Vertical layout for regular posts
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group h-full"
    >
      <Link href={`/blog/${blog.slug}`} className="block h-full">
        <div className="h-full flex flex-col p-6 rounded-2xl border border-border hover:border-primary/50 bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          {/* Image Placeholder */}
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 mb-4">
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-brand text-primary/40">
                {blog.title.charAt(0)}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted">
              <time dateTime={blog.date}>{formatDate(blog.date)}</time>
              <span>·</span>
              <span>{readingTime} min</span>
            </div>

            <h3 className="text-xl font-bold font-brand text-primary group-hover:text-link-hover transition-colors line-clamp-2">
              {blog.title}
            </h3>

            <p className="text-sm text-secondary leading-relaxed line-clamp-3 flex-1">
              {blog.summary}
            </p>

            <div className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all pt-2">
              Read More
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
