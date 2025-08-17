import { allBlogs } from "content-collections"
import type { Metadata } from "next"
import { absoluteUrl, formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { getTableOfContents } from "@/lib/toc"
import { DashboardTableOfContents } from "@/components/toc"
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import count from 'word-count'
import { components } from "@/components/mdx-components"
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import 'highlight.js/styles/github-dark.min.css'
import GiscusComments from "@/components/giscus-comments"
import { GoToTop } from "@/components/go-to-top"
import 'katex/dist/katex.min.css';
import { config } from "@/lib/config";

type BlogsPageProps = {
  params: Promise<{slug: string[]}>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const options = {
  mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [
        rehypeKatex,
        rehypeHighlight,
        rehypeSlug
      ],
  }
}

async function getBlogsFromParams(slugs: string[]) {
  const slug = slugs?.join("/") || ""
  const blog = allBlogs.find((blog: any) => blog.slug === slug)

  if (!blog) {
    return null
  }

  return blog
}

export async function generateMetadata({ params }: BlogsPageProps): Promise<Metadata> {
  const { slug } = await params
  const blog = await getBlogsFromParams(slug)

  if (!blog) {
    return {}
  }

  return {
    title: blog.title,
    description: blog.title,
    keywords: blog.keywords,
    openGraph: {
      title: blog.title,
      description: blog.title,
      type: config.seo.openGraph.type,
      url: absoluteUrl("/" + blog.slug),
      images: [
        {
          url: config.site.image
        },
      ],
    },
    twitter: {
      card: config.seo.twitter.card,
      title: blog.title,
      description: blog.title,
      images: [
        {
          url: config.site.image
        },
      ],
      creator: config.seo.twitter.creator,
    },
  }
}

export async function generateStaticParams(): Promise<string[]> {
  // @ts-ignore
  return allBlogs.map((blog: any) => ({
    slug: blog.slug.split('/'),
  }))
}

export default async function BlogPage(props: BlogsPageProps) {
  const { slug } = await props.params;
  const blog = await getBlogsFromParams(slug)

  if (!blog) {
    notFound()
  }

  const toc = await getTableOfContents(blog.content)

  return (
    <main className="relative py-8 md:py-12">
      <div className="container-anthropic">
        <div className="max-w-full lg:grid lg:grid-cols-[1fr_280px] lg:gap-12 xl:gap-16">
          {/* Article Content */}
          <article className="max-w-none">
            {/* Article Header */}
            <header className="mb-8 md:mb-12 pb-8 border-b border-border">
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight tracking-tight text-balance">
                  {blog.title}
                </h1>
                
                <div className="flex items-center gap-4 text-sm text-muted">
                  <time dateTime={blog.date} className="font-medium">
                    {formatDate(blog.date)}
                  </time>
                  <span>·</span>
                  <span>{count(blog.content)} words</span>
                  <span>·</span>
                  <span>{Math.ceil(count(blog.content) / 200)} min read</span>
                </div>

                {blog.summary && (
                  <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-3xl">
                    {blog.summary}
                  </p>
                )}
              </div>
            </header>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-primary prose-headings:tracking-tight prose-p:text-secondary prose-p:leading-relaxed prose-a:text-link prose-a:no-underline hover:prose-a:text-link-hover prose-a:transition-colors prose-strong:text-primary prose-code:text-primary prose-code:bg-subtle prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-blockquote:border-l-primary prose-blockquote:bg-subtle prose-blockquote:text-secondary">
              <MDXRemote source={blog.content} components={components} options={options} />
            </div>

            {/* Comments Section */}
            <div className="mt-16 pt-8 border-t border-border">
              <GiscusComments />
            </div>
          </article>

          {/* Table of Contents Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="bg-subtle rounded-lg p-6 border border-border">
                <h3 className="font-semibold text-primary mb-4">Table of Contents</h3>
                <DashboardTableOfContents toc={toc} />
              </div>
              
              <div className="flex justify-center">
                <GoToTop />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
