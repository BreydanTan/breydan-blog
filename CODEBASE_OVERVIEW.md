# Breydan Blog - Comprehensive Codebase Overview

## 1. PROJECT FOUNDATION

### Framework & Tech Stack
- **Framework**: Next.js 15.2.4 (Latest with App Router)
- **Language**: TypeScript 5
- **React Version**: 19.0.0
- **Styling**: Tailwind CSS 4 + Custom CSS (1768 lines of utility classes)
- **Content Management**: MDX with Markdown
- **Content Collections**: @content-collections/core v0.8.2

### Deployment & Hosting
- **Output**: Static export (SSG)
- **Primary Deployment**: Cloudflare Pages (via OpenNext)
- **Secondary Option**: AWS/Elastic Beanstalk
- **Configuration Files**: 
  - `open-next.config.ts` for Cloudflare
  - `next.config.ts` for static export

### npm Scripts
```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "generate-sitemap": "node scripts/generate-sitemap.js",
  "generate-rss": "node scripts/generate-rss.js",
  "sync-images": "aws s3 sync public/images s3://bucket-url --delete",
  "build:cloudflare": "next build && npx @opennextjs/cloudflare@latest build",
  "deploy": "npm run build && wrangler pages deploy out --project-name=nextjs-blog-template"
}
```

---

## 2. ROUTING STRUCTURE

### Pages & Routes

#### Homepage (`/`) - `/src/app/page.tsx`
**Purpose**: Landing page with featured articles
**Key Features**:
- Hero section with site title and author bio
- Social links (GitHub, X, LinkedIn, Buy Me a Coffee)
- Featured articles section (filtered by `featured: true`)
- Articles sorted by date (newest first)
- Word count display for each article
- Link to "View all articles"

**Components Used**:
- Featured article cards with hover effects
- Social links from config
- Date formatting utilities

#### Blog Listing (`/blog`) - `/src/app/blog/page.tsx`
**Purpose**: Main blog archive with advanced organization
**Key Features**:
- Page statistics:
  - Total article count
  - Total word count across all posts
  - Average read time
  - Years writing
- Featured articles section (displayed in 2-column grid)
- Articles grouped by year with collapsible sections
- Each article shows:
  - Title
  - Publish date with time tag
  - Word count badge
  - Read time estimate
  - Summary/excerpt
  - Featured indicator (if applicable)
- Newsletter signup form (placeholder)
- Back to home link

**Organization**:
- Articles grouped by year (newest first)
- Year badges with article count
- Responsive grid layout

#### Blog Post Detail (`/blog/[...slug]`) - `/src/app/blog/[...slug]/page.tsx`
**Purpose**: Individual article rendering
**Key Features**:
- Full article header with:
  - Article title (h1)
  - Publish date
  - Word count
  - Reading time estimate
  - Summary
- Article body rendered via MDXRemote
- Table of Contents sidebar (sticky, desktop only)
- Code syntax highlighting (highlight.js with GitHub Dark theme)
- Math equation support (KaTeX)
- GitHub comments section (Giscus)
- Back to top button

**MDX Processing**:
- Remark plugins: gfm, math
- Rehype plugins: katex, highlight, slug
- Custom components for headings, code, images, tables

**Static Generation**:
- `generateStaticParams()` creates pages for all blog posts
- Dynamic slug resolution from slug array

#### About Page (`/about`) - `/src/app/about/page.tsx`
**Purpose**: Author bio and CV showcase
**Key Features**:
- Avatar with profile image
- Name and title
- Bio section
- Download Resume button
- Multiple collapsible sections (Skills, Experience, Education, Projects)
- Social links

#### Special Pages
- **404 Page** (`not-found.tsx`): Custom error page
- **Sitemap** (`sitemap.ts`): Dynamic sitemap generation
- **Robots** (`robots.ts`): Robots.txt for SEO

---

## 3. SITE CONFIGURATION

### Configuration File: `/src/lib/config.ts`

```typescript
config = {
  site: {
    title: "Breydan Personal Blog",
    name: "Breydan Tan",
    description: "AI-powered full-stack developer sharing insights...",
    keywords: ["AI Development", "Next.js", "SaaS", ...],
    url: "https://blog.breydan.com",
    image: "LinkedIn profile photo URL",
    favicon: { ico, png, svg, appleTouchIcon },
    manifest: "/site.webmanifest",
    rss: { feeds configuration }
  },
  author: {
    name: "Breydan Tan",
    email: "breydantech@gmail.com",
    bio: "AI enthusiast exploring..."
  },
  social: {
    github: "https://github.com/BreydanTan",
    x: "https://x.com/BreydanT94338",
    linkedin: "https://www.linkedin.com/in/breydan/"
  },
  giscus: {
    repo: "BreydanTan/breydan-blog",
    repoId: "R_kgDOPDW2Fw",
    categoryId: "DIC_kwDOPDW2F84CsJ8v"
  },
  navigation: {
    main: [
      { title: "Blog", href: "/blog" },
      { title: "About Me", href: "/about" }
    ]
  },
  seo: {
    metadataBase: "https://blog.breydan.com",
    openGraph: { type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", creator: "@Twitter" }
  }
}
```

### Content Collections Config: `/content-collections.ts`

```typescript
defineCollection({
  name: "blogs",
  directory: "src/content/blog",
  include: "**/*.md",
  schema: {
    title: string,
    date: string (ISO 8601),
    updated: string (optional),
    featured: boolean (optional, default false),
    summary: string (optional),
    keywords: string[] (optional)
  },
  transform: generates slug from file path
})
```

---

## 4. LAYOUT & COMPONENT ARCHITECTURE

### Root Layout (`/src/app/layout.tsx`)
- Global metadata and SEO configuration
- Font loading (Inter from Google Fonts)
- Feed links (RSS, Atom, JSON)
- Header component
- Performance monitoring script
- Favicon and manifest references
- Skip-to-content accessibility link

### Header Component (`/src/components/header/index.tsx`)
**Features**:
- Sticky navigation with blur backdrop
- Logo with site title (first word only on small screens)
- Desktop navigation menu (centered)
- Mobile navigation menu (hamburger)
- Social links (GitHub, X, Xiaohongshu)
- Responsive design

### Components Inventory

#### Navigation Components
- `nav-desktop-menu.tsx`: Desktop navigation menu
- `nav-mobile-menu.tsx`: Mobile navigation with sheet/drawer
- `nav-data.ts`: Navigation data structure

#### UI Components (Shadcn UI)
- `button.tsx`: Styled button component
- `collapsible.tsx`: Expandable content sections
- `navigation-menu.tsx`: Navigation menu structure
- `sheet.tsx`: Mobile drawer/sheet component

#### Content Components
- `mdx-components.tsx`: Custom markdown element rendering
  - Headings (h1-h6) with proper spacing
  - Paragraphs with leading
  - Links with hover states
  - Code blocks with syntax highlighting
  - Tables with accessible styling
  - Images with lazy loading
  - Blockquotes with accent borders
  - Strong text, lists, and more

#### Feature Components
- `giscus-comments.tsx`: GitHub-based comment system
- `toc.tsx`: Table of Contents navigation
- `go-to-top.tsx`: Scroll-to-top button
- `loading-skeleton.tsx`: Loading placeholder
- `micro-interactions.tsx`: Animation helpers
- `DownloadResumeButton.tsx`: Resume download button

#### Icon Components
- `github.tsx`: GitHub icon
- `x.tsx`: X/Twitter icon
- `xiaohongshu.tsx`: Xiaohongshu icon

---

## 5. STYLING SYSTEM

### Design System: `/src/app/globals.css` (1768 lines)

#### Color Palette
**Light Mode**:
- Background: #ffffff
- Foreground: #1a1a1a
- Primary: #2563eb (Blue)
- Secondary: #f9fafb (Light gray)
- Muted: #f9fafb
- Border: #e5e7eb

**Dark Mode**:
- Background: #0f0f0f
- Foreground: #fafafa
- Primary: #3b82f6 (Brighter blue)
- Secondary: #262626
- Border: #404040

#### Typography Scale
- Text sizes: xs (12px) to 5xl (48px)
- Line heights: tight (1.25) to loose (2)
- Font: Inter with feature settings

#### Utilities & Classes

**Layout**:
- `.container-anthropic`: Max-width 1200px with auto margins
- `.content-width`: Max-width 65ch for readability

**Responsive**:
- Mobile-first design
- Touch targets: min 44px × 44px
- Responsive typography scaling
- Safe area insets for notched devices

**Animations & Interactions**:
- `.transition-anthropic`: 150ms ease-out transitions
- `.fade-in-on-scroll`: Scroll-triggered fade-in
- `.hover-lift`: Card elevation on hover
- `.button-micro`: Button with shine effect
- `.stagger-item`: Staggered animation sequences
- 30+ animation utilities total

**Prose Styles**:
- Enhanced article typography
- Consistent heading spacing
- Blockquote styling with accent border
- Code block styling
- Image styling with borders
- Table styling
- Mobile-optimized prose

**Accessibility**:
- `.sr-only`: Screen reader only text
- `.skip-link`: Skip to content link
- High contrast mode support
- Reduced motion preferences
- 44px+ touch targets
- Focus indicators with animations

**Performance**:
- GPU acceleration utilities
- Content visibility optimization
- Loading skeleton animations
- Image lazy loading classes
- Backdrop blur optimization

---

## 6. BLOG CONTENT MANAGEMENT

### Blog Post Structure

**File Location**: `/src/content/blog/*.md`
**Total Posts**: 8

**Frontmatter Schema**:
```markdown
---
title: "Article Title"
date: "2025-04-05T20:10:00+08:00"
updated: "2025-04-05T20:10:00+08:00"
featured: true  # Optional, highlights on homepage
summary: "Brief description for listings"
keywords: ["tag1", "tag2", "tag3"]
---
```

### Current Blog Posts
1. **hello-world.md** - Basic Markdown Usage (featured)
2. **intro.md** - Introduction article
3. **geminiCLI.md** - Gemini CLI tutorial
4. **kimi-k2-opencode-tutorial.md** - Kimi K2 OpenCode tutorial
5. **saas_techstack.md** - SaaS technology stack
6. **claude-code-nextjs-cloudflare-s3.md** - Claude Code with Next.js/Cloudflare
7. **deploy_worker.md** - Deployment worker guide
8. **building-ai-content-collector-obsidian.md** - AI content collection tool

### Content Features Supported
- **Markdown**: Full GitHub Flavored Markdown (GFM)
- **Math**: KaTeX support for equations
- **Code**: Syntax highlighting (30+ languages)
- **Images**: Lazy loading with responsive support
- **Tables**: Full table support
- **Blockquotes**: Styled quotations
- **Lists**: Ordered and unordered lists

---

## 7. HOMEPAGE DESIGN

### Visual Hierarchy

#### Hero Section
```
[Logo] Breydan [GitHub] [X] [XiaoHongShu]

═══════════════════════════════════════════════════════════

                 BREYDAN PERSONAL BLOG
        
        AI enthusiast exploring the intersection of 
        technology and innovation...
        
        [buyMeACoffee] [X] [LinkedIn]
```

#### Latest Articles Section
```
Latest Articles
Thoughts on technology, development, and building the future.

┌─────────────────────────────────────────────────────────┐
│ Article Title                          Apr 5, 2025 · 250 │
│                                                    words  │
│ Brief summary of the article content...                  │
└─────────────────────────────────────────────────────────┘

[More articles...]

                 View all articles →
```

### Design Philosophy
- **Minimalist**: Clean white background with subtle accents
- **Readable**: Generous spacing and typography
- **Accessible**: High contrast, proper heading hierarchy
- **Interactive**: Smooth transitions and hover effects
- **Responsive**: Mobile-optimized layout

---

## 8. BLOG LISTING ARCHITECTURE

### Statistics Dashboard
```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│      8       │   100,000    │      10      │      2       │
│  Articles    │ Total Words  │ Avg. Read    │  Years       │
│              │              │  Time (min)  │ Writing      │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### Featured Articles Section
```
⭐ Featured Articles

[Grid of 2x2 featured articles with:]
- Title
- Featured badge
- Summary
- Date & read time
```

### Articles by Year
```
2025 [2 articles]
  • Article 1 - Date | Words | Read Time | [Featured]
  • Article 2 - Date | Words | Read Time

2024 [3 articles]
  • Article 1 - Date | Words | Read Time
  [etc.]
```

---

## 9. BLOG POST DETAIL PAGE

### Article Layout
```
┌─────────────────────────────────┬──────────────────┐
│                                 │   Table of       │
│  ARTICLE TITLE                  │  Contents        │
│  Date · Words · Read Time        │  (Sticky)        │
│                                 │                  │
│  Summary/Excerpt                │  ↑ Go to Top    │
│  ─────────────────────────────  │                  │
│                                 │                  │
│  [Article Body with:            │                  │
│   - Formatted headings          │                  │
│   - Syntax highlighted code     │                  │
│   - Images                      │                  │
│   - Math equations              │                  │
│   - Tables]                     │                  │
│                                 │                  │
│  ─────────────────────────────  │                  │
│  Comments (Giscus)              │                  │
│                                 │                  │
└─────────────────────────────────┴──────────────────┘
```

### Features
- **TOC Generation**: Auto-generated from heading slugs
- **Read Time**: Calculated from word count (200 words/min)
- **Code Highlighting**: 30+ language support with GitHub Dark theme
- **Comments**: GitHub-powered via Giscus
- **Navigation**: Sticky TOC on desktop, mobile-optimized

---

## 10. KEY TECHNOLOGIES & DEPENDENCIES

### Core Dependencies
```json
{
  "@next/mdx": "^15.2.4",
  "next": "15.2.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5"
}
```

### Content & MDX
```json
{
  "@mdx-js/loader": "^3.1.0",
  "@mdx-js/react": "^3.1.0",
  "next-mdx-remote-client": "^2.1.1",
  "@content-collections/core": "^0.8.2",
  "@content-collections/next": "^0.2.6"
}
```

### Styling
```json
{
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  "tw-animate-css": "^1.2.4",
  "tailwind-merge": "^3.0.2",
  "class-variance-authority": "^0.7.1"
}
```

### Features
```json
{
  "@giscus/react": "^3.1.0",
  "framer-motion": "^12.6.3",
  "lucide-react": "^0.484.0",
  "highlight.js": "^11.11.1",
  "rehype-highlight": "^7.0.2",
  "rehype-katex": "^7.0.1",
  "rehype-slug": "^6.0.0",
  "remark-gfm": "^4.0.1",
  "remark-math": "^6.0.0",
  "marked": "^15.0.7",
  "mdast-util-toc": "^7.1.0",
  "word-count": "^0.3.1",
  "feed": "^4.2.2"
}
```

### UI Components
```json
{
  "@radix-ui/react-collapsible": "^1.1.3",
  "@radix-ui/react-dialog": "^1.1.6",
  "@radix-ui/react-navigation-menu": "^1.2.5",
  "@radix-ui/react-slot": "^1.1.2"
}
```

### Dev Tools
```json
{
  "eslint": "^9",
  "prettier": "^3.6.2",
  "prettier-plugin-tailwindcss": "^0.7.1"
}
```

---

## 11. NEXT.JS CONFIGURATION

### `next.config.ts` Settings
```typescript
{
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',  // Static export for Cloudflare
  trailingSlash: true,  // URLs end with /
  
  images: {
    unoptimized: true,  // Required for static export
    domains: [
      'media.licdn.com',
      'elasticbeanstalk-ap-southeast-1-...'
    ]
  },
  
  eslint: {
    ignoreDuringBuilds: true
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  
  webpack: {
    optimization: {
      minimize: true  // Enable minification
    }
  }
}
```

---

## 12. PERFORMANCE OPTIMIZATIONS

### Implemented
- Static site generation (SSG) for all pages
- Image lazy loading and async decoding
- Font preloading (Inter from Google Fonts)
- CSS minification
- JavaScript minification in production
- Tailwind CSS purging
- DNS prefetch for external resources
- Content visibility optimization
- GPU acceleration for animations
- Backdrop blur optimization

### In-Browser Optimizations
- `window.requestIdleCallback` for non-critical tasks
- Image lazy loading attributes
- Smooth scroll behavior
- Touch-optimized interactions

---

## 13. REFERENCE SETUP (Deprecated)

### Astro Blog Reference
**Location**: `/home/user/breydan-blog/BlogForRef/`
- Contains `astro.config.mjs` and other Astro-specific files
- Kept as reference for potential future migration
- **Current Status**: NOT ACTIVE - Next.js is the main framework

---

## SUMMARY

This is a **modern, production-ready Next.js blog** with:
- Clean, maintainable codebase
- Professional design system
- Advanced content management (MDX with frontmatter)
- Excellent SEO capabilities (sitemap, RSS, robots.txt)
- Accessibility-first approach
- Performance-optimized for static generation
- GitHub integration (comments, deployment)
- Cloud-ready (Cloudflare Pages, AWS)

The blog is designed for a technical audience interested in AI, development, and SaaS topics, with a focus on clear communication and visual polish.

