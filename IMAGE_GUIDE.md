# 🖼️ Image Management Guide

## Directory Structure

```
public/images/
├── author/           # Author photos, avatars
├── blog/            # Blog post images
│   ├── saas-techstack/     # Images for tech stack article
│   ├── gemini-cli/         # Images for Gemini CLI article
│   ├── hello-world/        # Images for hello world post
│   └── intro/              # Images for intro post
├── icons/           # Social media icons, UI icons
└── general/         # General site images
```

## How to Add Images to Blog Posts

### 1. **Add Image to Correct Folder**
```bash
# Example: Adding an image to the tech stack article
cp my-diagram.png public/images/blog/saas-techstack/
```

### 2. **Use in Markdown**
```markdown
![Alt text description](/images/blog/saas-techstack/my-diagram.png)
```

### 3. **Image Naming Convention**
- Use descriptive names: `cloudflare-architecture.png`
- Use kebab-case: `next-js-performance-chart.jpg`
- Include dimensions if needed: `hero-banner-1200x600.jpg`

## Supported Formats
✅ **Recommended**: PNG, JPG, WebP, SVG
✅ **Max size**: 2MB per image
✅ **Optimization**: Images are automatically optimized by Cloudflare

## Examples

### Tech Stack Article Images:
```markdown
![Cloudflare Workers Architecture](/images/blog/saas-techstack/cloudflare-architecture.png)
![Performance Comparison Chart](/images/blog/saas-techstack/performance-chart.jpg)
![Cost Analysis](/images/blog/saas-techstack/cost-analysis.webp)
```

### Gemini CLI Article Images:
```markdown
![Terminal Screenshot](/images/blog/gemini-cli/terminal-demo.png)
![CLI Features](/images/blog/gemini-cli/features-overview.jpg)
```

## Best Practices

1. **Optimize before upload**: Use tools like TinyPNG
2. **Use descriptive alt text**: For SEO and accessibility
3. **Consistent sizing**: Try to maintain consistent aspect ratios
4. **Dark mode friendly**: Consider how images look in both themes
5. **Mobile responsive**: Images automatically scale on mobile

## Quick Commands

```bash
# Add image to specific blog post
cp image.png public/images/blog/[post-name]/

# Deploy with new images
npm run deploy
```