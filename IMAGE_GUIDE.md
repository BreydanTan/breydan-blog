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

## S3 Integration (Recommended)

### Setup (One-time)
1. ✅ S3 bucket configured: `elasticbeanstalk-ap-southeast-1-733447040549`
2. Ensure AWS CLI is configured: `aws configure`
3. ✅ Auto-set public read permissions for all uploaded images

### Your Complete Workflow

#### For Blog Post Images:
```bash
# 1. Add image to correct folder
cp my-image.png public/images/blog/my-post-name/

# 2. Sync to S3 with public permissions
npm run sync-images

# 3. Use FULL S3 URL in markdown (include https:// and .s3.region.amazonaws.com)
![Description](https://elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com/blog/blog/my-post-name/my-image.png)
```

#### For Site Images (Avatar, Icons, etc):
```bash
# 1. Add to appropriate folder
cp avatar.png public/images/author/
# or
cp icon.png public/images/icons/

# 2. Sync to S3
npm run sync-images

#2.1 deploy
npm run deploy

# 3. Use in components
src="https://elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com/blog/author/avatar.png"
```

#### Quick Reference:
- **Your S3 Base URL**: `https://elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com/blog/`
- **Local to S3 Mapping**: `public/images/` → `s3://bucket/blog/`
- **Auto-public**: All synced images get public read permissions
- **Sync Command**: `npm run sync-images`

## Quick Commands

```bash
# Add image to specific blog post
cp image.png public/images/blog/[post-name]/

# Sync all images to S3
npm run sync-images

# Deploy with new images
npm run deploy
```

⏺ A sitemap is an XML file that tells search engines (Google, Bing, etc.) about all the pages on your website. It helps
  search engines:

  1. Discover pages - Find all your blog posts automatically
  2. Index faster - Know when content was updated
  3. Understand structure - See page priorities and update frequencies
  4. Improve SEO - Better search engine visibility

  Do you need to run it every time?

  Manual approach: Yes, currently you'd run npm run generate-sitemap each time you add a new blog post.

  Better approach: You can automate it by:
  - Adding it to your build process
  - Using Next.js dynamic sitemap (which this project already supports via src/app/sitemap.ts)

  The current setup generates a static sitemap file, but Next.js can generate it dynamically during build, so search
  engines always see your latest content without manual regeneration.

  For production, consider adding npm run generate-sitemap to your deployment pipeline.