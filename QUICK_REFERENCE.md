# Quick Reference Guide - Breydan Blog

## Essential File Locations

### Configuration Files
- `/home/user/breydan-blog/package.json` - Dependencies and scripts
- `/home/user/breydan-blog/next.config.ts` - Next.js configuration
- `/home/user/breydan-blog/content-collections.ts` - Blog content schema
- `/home/user/breydan-blog/src/lib/config.ts` - Site configuration
- `/home/user/breydan-blog/tsconfig.json` - TypeScript settings

### Pages & Routes
- `/home/user/breydan-blog/src/app/page.tsx` - Homepage
- `/home/user/breydan-blog/src/app/blog/page.tsx` - Blog listing
- `/home/user/breydan-blog/src/app/blog/[...slug]/page.tsx` - Article detail
- `/home/user/breydan-blog/src/app/about/page.tsx` - About page
- `/home/user/breydan-blog/src/app/layout.tsx` - Root layout

### Components
- `/home/user/breydan-blog/src/components/header/` - Navigation header
- `/home/user/breydan-blog/src/components/mdx-components.tsx` - Article rendering
- `/home/user/breydan-blog/src/components/toc.tsx` - Table of contents
- `/home/user/breydan-blog/src/components/giscus-comments.tsx` - Comments
- `/home/user/breydan-blog/src/components/ui/` - UI components

### Styling
- `/home/user/breydan-blog/src/app/globals.css` - Global styles (1768 lines)
- Custom CSS variables in `:root` and `.dark`
- Tailwind utilities throughout

### Content
- `/home/user/breydan-blog/src/content/blog/` - Blog posts (8 markdown files)

---

## Key Code Snippets

### Adding a New Blog Post
Create `/src/content/blog/my-post.md`:
```markdown
---
title: "My New Article"
date: "2025-11-17T10:00:00+08:00"
updated: "2025-11-17T10:00:00+08:00"
featured: true
summary: "Brief description for article listings"
keywords: ["keyword1", "keyword2"]
---

# Article Content

Your markdown content here...
```

### Homepage Featured Articles Query
From `/src/app/page.tsx`:
```typescript
const blogs = allBlogs
  .filter((blog: any) => blog.featured === true)
  .sort(
    (a: any, b: any) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
```

### Accessing Site Configuration
From any component:
```typescript
import { config } from "@/lib/config";

// Use config values
config.site.title
config.author.name
config.social.github
```

### Custom MDX Component Example
From `/src/components/mdx-components.tsx`:
```typescript
const components = {
  h1: ({ className, ...props }) => (
    <h1 className={cn("text-[3.2rem] font-semibold", className)} {...props} />
  ),
  // ... more components
}
```

---

## Design System Colors

### Light Mode (Default)
- Primary: `#2563eb` (Blue)
- Background: `#ffffff` (White)
- Secondary: `#f9fafb` (Light gray)
- Border: `#e5e7eb`
- Text Primary: `#1a1a1a` (Dark)

### Dark Mode
- Primary: `#3b82f6` (Brighter blue)
- Background: `#0f0f0f` (Dark)
- Secondary: `#262626`
- Border: `#404040`
- Text Primary: `#fafafa` (Light)

### Using in CSS
```css
color: var(--text-primary);
background: var(--background);
border: 1px solid var(--border);
```

---

## NPM Scripts

### Development
```bash
npm run dev          # Start dev server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Content Generation
```bash
npm run generate-sitemap   # Generate sitemap.xml
npm run generate-rss       # Generate RSS feeds
```

### Deployment
```bash
npm run build:cloudflare   # Build for Cloudflare
npm run deploy             # Deploy to Cloudflare Pages
npm run sync-images        # Sync images to AWS S3
```

---

## Routing Map

```
/                          → Homepage (featured articles)
/blog/                     → Blog listing (all articles, by year)
/blog/article-slug/        → Article detail page
/about/                    → About page
/404                       → Not found page (custom)
/sitemap.xml              → Sitemap (auto-generated)
/robots.txt               → Robots.txt (auto-generated)
/rss.xml                  → RSS feed
/atom.xml                 → Atom feed
/feed.json                → JSON feed
```

---

## Component Hierarchy

```
<RootLayout>
  <Header>
    <Logo>
    <NavDesktopMenu>
    <NavMobileMenu>
    <SocialLinks>
  </Header>
  
  <main>
    <HomePage> | <BlogPage> | <ArticlePage> | <AboutPage>
  </main>
</RootLayout>
```

---

## Content Organization

### Blog Post Metadata
```typescript
{
  title: string,        // Required
  date: string,         // Required (ISO 8601)
  updated?: string,     // Optional
  featured?: boolean,   // Optional (default: false)
  summary?: string,     // Optional
  keywords?: string[],  // Optional
  content: string       // MDX/Markdown content
}
```

### Featured Post Criteria
- `featured: true` in frontmatter
- Appears on homepage
- Appears in "Featured Articles" section on /blog/

---

## Key Dependencies to Know

| Package | Purpose |
|---------|---------|
| `next@15.2.4` | Framework |
| `react@19.0.0` | UI library |
| `typescript@5` | Type checking |
| `tailwindcss@4` | Styling |
| `@next/mdx` | MDX processing |
| `next-mdx-remote-client` | MDX rendering |
| `@content-collections/core` | Content schema |
| `highlight.js` | Code syntax highlighting |
| `rehype-katex` | Math equation rendering |
| `@giscus/react` | Comments system |
| `lucide-react` | Icons |

---

## Important Configuration Values

### From `/src/lib/config.ts`
```typescript
// Site
config.site.title = "Breydan Personal Blog"
config.site.url = "https://blog.breydan.com"
config.site.description = "AI-powered full-stack developer..."

// Author
config.author.name = "Breydan Tan"
config.author.email = "breydantech@gmail.com"

// Social
config.social.github = "https://github.com/BreydanTan"
config.social.x = "https://x.com/BreydanT94338"
config.social.linkedin = "https://www.linkedin.com/in/breydan/"

// Giscus (Comments)
config.giscus.repo = "BreydanTan/breydan-blog"
```

---

## Performance Tips

1. **Static Generation**: All pages are pre-built at compile time
2. **Image Optimization**: Use lazy loading and async decoding
3. **Font Loading**: Inter loaded from Google Fonts with preconnect
4. **CSS Minification**: Automatic in production build
5. **Code Splitting**: Handled by Next.js automatically

---

## Customization Points

### To change blog theme:
1. Edit `/src/app/globals.css` `:root` variables
2. Update color palette (light and dark modes)
3. Rebuild with `npm run build`

### To add new pages:
1. Create file in `/src/app/your-page/page.tsx`
2. Export default React component
3. Add metadata export for SEO
4. Route is auto-generated based on file structure

### To modify article rendering:
1. Edit `/src/components/mdx-components.tsx`
2. Add or override component styling
3. Test with `npm run dev`

### To change navigation:
1. Edit `/src/components/header/nav-data.ts`
2. Update menu items
3. Rebuild header if needed

---

## Deployment Checklist

Before deploying to production:

- [ ] Update `config.site.url` in `/src/lib/config.ts`
- [ ] Update social links if changed
- [ ] Generate sitemap: `npm run generate-sitemap`
- [ ] Generate RSS feeds: `npm run generate-rss`
- [ ] Build: `npm run build`
- [ ] Test build locally: `npm start`
- [ ] Check `/out` directory exists (static export)
- [ ] Deploy to Cloudflare: `npm run deploy`

---

## File Paths Reference (Absolute Paths)

```
/home/user/breydan-blog/
├── src/app/                               # Pages
├── src/components/                        # Reusable components
├── src/content/blog/                      # Blog posts
├── src/lib/                               # Utilities
├── src/app/globals.css                    # Styles
├── package.json
├── next.config.ts
├── content-collections.ts
├── tsconfig.json
└── public/                                # Static assets
```

All paths in this guide use absolute paths as required.

