# Breydan Personal Blog

A modern, AI-focused personal blog built with Next.js 15, featuring a clean design inspired by contemporary portfolio aesthetics. This blog showcases technical content about AI development, full-stack engineering, and SaaS development.

![Next.js](https://img.shields.io/badge/Next.js-15.2-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

🌐 **Live Demo**: [blog.breydan.com](https://blog.breydan.com)

## ✨ Features

### Design & UX
- 🎨 **Modern Design System** - Clean, professional interface with retro-blue color palette
- ✨ **Smooth Animations** - Framer Motion powered animations throughout
- 🎴 **Social Cards** - Interactive stacking cards with expand/collapse animations
- 🔍 **Explore Section** - Grid-based content discovery with hover effects
- 💼 **Featured Work** - Project showcase with full-width and grid layouts
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🌓 **Dark Mode** - Complete theme system with localStorage persistence

### Technical Features
- ⚡ **Next.js 15** - Latest App Router with React 19
- 🎯 **TypeScript** - Full type safety throughout the codebase
- 🎨 **Tailwind CSS 4** - Modern utility-first CSS framework
- 📝 **MDX Support** - Write blog posts with Markdown + React components
- 💬 **Giscus Comments** - GitHub-powered comment system
- 📊 **RSS/Atom/JSON Feeds** - Multiple feed formats for syndication
- 🗺️ **Auto Sitemap** - Automatic sitemap generation for SEO
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and Twitter Cards
- 💡 **Code Highlighting** - Syntax highlighting with Shiki
- 📐 **Math Support** - LaTeX math rendering with KaTeX
- ☁️ **Cloudflare Pages** - Optimized for edge deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/BreydanTan/breydan-blog.git
cd breydan-blog

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your blog.

### Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm run start
```

### Deploy to Cloudflare Pages

```bash
# Build for Cloudflare
npm run build:cloudflare

# Deploy (requires Cloudflare CLI)
npm run deploy
```

## 📁 Project Structure

```
breydan-blog/
├── public/
│   ├── images/          # Social cards, avatars
│   └── projects/        # Project screenshots
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/     # React components
│   │   ├── home/      # Homepage sections
│   │   ├── ui/        # Reusable UI components
│   │   └── ...
│   ├── content/       # Blog posts (MDX)
│   │   └── blog/
│   ├── data/          # JSON data files
│   │   ├── social.json     # Social media links
│   │   └── projects.json   # Featured projects
│   ├── lib/           # Utilities and config
│   └── styles/        # Global styles
└── ...
```

## ⚙️ Configuration

All blog settings are centralized in `src/lib/config.ts`:

```typescript
export const config = {
  site: {
    title: "Your Blog Title",
    name: "Your Name",
    description: "Your blog description",
    url: "https://yourdomain.com",
    // ... more settings
  },
  author: {
    name: "Your Name",
    email: "your@email.com",
    bio: "Your bio",
  },
  social: {
    github: "https://github.com/yourusername",
    x: "https://x.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
  },
  // ... more config
};
```

For detailed configuration options, see [USER_MANUAL.md](./USER_MANUAL.md#configuration).

## ✍️ Writing Blog Posts

Create new blog posts in `src/content/blog/` directory. Both `.md` and `.mdx` formats are supported.

### Example Post

```markdown
---
title: "Your Post Title"
date: "2025-01-17"
updated: "2025-01-17"
keywords: ["Next.js", "React", "TypeScript"]
featured: true
summary: "A brief summary of your post"
---

Your post content here...

## Heading 2

Write **bold** or *italic* text.

\`\`\`typescript
// Code with syntax highlighting
const greeting = "Hello, World!";
\`\`\`
```

## 🎨 Customization

### Adding Social Cards

1. Add your images to `public/images/`:
   - `social-github.jpg`
   - `social-twitter.jpg`
   - `linkdein.jpg`
   - `youtube.jpg`
   - `tiktok.jpg`

2. Update `src/data/social.json`:
```json
{
  "id": 1,
  "name": "GitHub",
  "username": "yourusername",
  "image": "/images/social-github.jpg",
  "url": "https://github.com/yourusername"
}
```

### Adding Featured Projects

1. Add project screenshots to `public/projects/`

2. Update `src/data/projects.json`:
```json
{
  "name": "Project Name",
  "description": "Brief project description",
  "tags": ["Next.js", "React", "TypeScript"],
  "image": "/projects/your-project.jpg",
  "url": "https://your-project.com",
  "isShow": true,
  "featured": true
}
```

Set `featured: true` for full-width display, `false` for grid layout.

## 🎯 Key Components

### Homepage Sections
- **HeroSection** - Main introduction with animated text and social cards
- **ExploreSection** - 4-column grid showcasing different content areas
- **FeaturedWorkSection** - Project showcase with dynamic layouts
- **LatestArticles** - Recent blog posts with smart image extraction

### Interactive Elements
- **SocialCards** - Stacking cards with expand/collapse animation on hover
- **AnimatedText** - Word-by-word text reveal with Framer Motion
- **ThemeToggle** - Persistent dark/light mode switcher
- **BlogCard** - Smart blog post cards with auto-extracted cover images

## 📚 Documentation

- **[User Manual](./USER_MANUAL.md)** - Comprehensive guide for development and deployment
- **[Optimization Plan](./OPTIMIZATION_PLAN.md)** - Performance optimization strategies
- **[Deployment Guide](./DEPLOYMENT.md)** - Cloudflare Pages deployment instructions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Content**: MDX (Markdown + JSX)
- **Comments**: Giscus
- **Deployment**: Cloudflare Pages
- **Icons**: Lucide React

## 📝 License

MIT License - see [LICENSE](./LICENSE) for details

## 👤 Author

**Breydan Tan**
- GitHub: [@BreydanTan](https://github.com/BreydanTan)
- Website: [blog.breydan.com](https://blog.breydan.com)
- Email: breydantech@gmail.com

## 🙏 Acknowledgments

This blog was built with modern web technologies and inspired by contemporary design trends. Special thanks to the open-source community for the amazing tools and libraries.

---

⭐ If you find this project helpful, please consider giving it a star on GitHub!
