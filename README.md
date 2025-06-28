<h1 align=center>Next.js Blog Template | Ladder Theme | <a href="https://guangzhengli.com">Blog</a></h1>

This repository is a Next.js implementation of [hugo-ladder-theme](https://github.com/guangzhengli/hugo-theme-ladder).

This is a Next.js blog template. Here are some basic instructions on how to use it.

## How to develop locally?

```bash
npm install


npm run dev
```

## How to deploy

Clone or fork this repository locally, modify the configuration as described below, and then deploy it on [Vercel](https://vercel.com) by selecting this repository.

All deployment configurations can be left at their default settings; no special configuration is needed.

If you need to use edge or fluid compute, please modify the code or Vercel configuration yourself.

# Blog Configuration

## 1. How to write a blog post

Blog files for this repository should be placed in the `src/content/blog` directory. They can be Markdown or MDX files.

The following metadata needs to be configured by the user as needed:

- `title`: Blog post title
- `date`: Blog post publication date
- `updated`: Blog post update date
- `keywords`: Blog post keywords for SEO optimization
- `featured`: Whether to feature on the homepage
- `summary`: Blog post summary

## 2. Blog Configuration

All blog configurations are centralized in the `src/lib/config.ts` file. The advantages of this are:

1.  **Centralized Management**: All configurations are in one file, making it easy to maintain and modify.
2.  **Type Safety**: Using TypeScript provides type checking and autocompletion.
3.  **Reusability**: Avoids scattering duplicate configurations across various files.
4.  **Consistency**: Ensures the same configuration values are used everywhere.

### 2.1 Basic Site Configuration

```typescript
site: {
  title: "Your Blog Title",
  name: "Your Blog Name",
  description: "Blog description",
  keywords: ["keyword1", "keyword2"],
  url: "https://your-domain.com",
  baseUrl: "https://your-domain.com",
  image: "https://your-domain.com/og-image.png",
  favicon: {
    ico: "/favicon.ico",
    png: "/favicon.png",
    svg: "/favicon.svg",
    appleTouchIcon: "/favicon.png",
  },
  manifest: "/site.webmanifest",
}
```

These configurations are used for:
- Displaying basic website information
- SEO optimization
- Browser tab icon
- Social media sharing previews

### 2.2 Author Information Configuration

```typescript
author: {
  name: "Your Name",
  email: "your-email",
  bio: "Personal bio",
}
```

Author information will be used for:
- Homepage display
- RSS feed information
- Author information in blog posts

### 2.3 Social Media Configuration

```typescript
social: {
  github: "https://github.com/your-username",
  x: "https://x.com/your-username",
  xiaohongshu: "https://www.xiaohongshu.com/user/profile/your-id",
  wechat: "your-wechat-qr-code-image-link",
  buyMeACoffee: "https://www.buymeacoffee.com/your-username",
}
```

These links will be displayed in:
- The social media links section on the homepage
- Social media icons in the navigation bar

### 2.4 Comment System Configuration

```typescript
giscus: {
  repo: "your-github-repo-name",
  repoId: "repository-ID",
  categoryId: "category-ID",
}
```

To use Giscus as the comment system, you need to:
1.  Install the Giscus app on GitHub
2.  Enable Discussions in your repository
3.  Get the configuration information and fill it in here

### 2.5 Navigation Menu Configuration

```typescript
navigation: {
  main: [
    { 
      title: "Blog", 
      href: "/blog",
    },
    // You can add more navigation items
  ],
}
```

This is where you configure the website's navigation menu. It supports:
- Regular links
- Dropdown menus with sub-items

### 2.6 SEO Configuration

```typescript
seo: {
  metadataBase: new URL("https://your-domain.com"),
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: "website" as const,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image" as const,
    creator: "@your-twitter-handle",
  },
}
```

These configurations are used for:
- Search engine optimization
- Social media share cards
- Website metadata

### 2.7 RSS Feed Configuration

```typescript
rss: {
  title: "Your Blog Title",
  description: "Blog description",
  feedLinks: {
    rss2: "/rss.xml",
    json: "/feed.json",
    atom: "/atom.xml",
  },
}
```

These configurations are used to generate:
- RSS 2.0 feed
- JSON Feed
- Atom feed

## 3. How to Modify the Configuration

1.  Open the `src/lib/config.ts` file
2.  Modify the corresponding configuration items according to your needs
3.  After saving the file, Next.js will automatically rebuild and apply the new configuration

Notes:
- Ensure all URLs are valid
- Image links should be accessible
- Social media links must be complete URLs
- After modifying the configuration, it is recommended to check the website's:
  - Homepage display
  - Navigation menu
  - SEO information
  - Social media sharing effectiveness
  - RSS feed

## 4. How to Generate the RSS Feed

Modify the configuration in the `scripts/generate-rss.js` file, then run:

```bash
npm run generate-rss
```

## 5. How to Generate the Sitemap

Modify the configuration in the `scripts/generate-sitemap.js` file, then run:

```bash
npm run generate-sitemap
```