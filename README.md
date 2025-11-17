# Breydan Personal Blog

个人技术博客，分享 AI、全栈开发、SaaS 开发相关内容。

基于 [hugo-ladder-theme](https://github.com/guangzhengli/hugo-theme-ladder) 的 Next.js 实现。

## 快速开始

### 本地开发
```bash
npm install
npm run dev
```

访问 http://localhost:3000

### 构建
```bash
npm run build
```

### 部署到 Cloudflare Pages
```bash
npm run build:cloudflare
npm run deploy
```

## 文档

- **[使用手册](./USER_MANUAL.md)** - 详细的开发、部署和配置指南
- **[优化方案](./OPTIMIZATION_PLAN.md)** - 项目优化建议和实施计划
- **[部署指南](./DEPLOYMENT.md)** - Cloudflare 部署说明

## 主要功能

- ✅ Next.js 15 + React 19 + TypeScript
- ✅ TailwindCSS 4 样式系统
- ✅ MDX 支持 (Markdown + React 组件)
- ✅ Giscus 评论系统
- ✅ RSS/Atom/JSON Feed
- ✅ 自动生成 Sitemap
- ✅ SEO 优化
- ✅ 代码高亮和数学公式支持
- ✅ Cloudflare Pages 部署

## 配置

所有博客配置都集中在 `src/lib/config.ts` 文件中，包括：
- 站点基本信息
- 作者信息
- 社交媒体链接
- Giscus 评论配置
- 导航菜单
- SEO 设置

详细配置说明请查看 [使用手册](./USER_MANUAL.md#配置说明)。

## 编写博客

博客文章放在 `src/content/blog/` 目录，支持 `.md` 和 `.mdx` 格式。

示例 Front Matter:
```markdown
---
title: "文章标题"
date: "2025-01-17"
updated: "2025-01-17"
keywords: ["Next.js", "博客"]
featured: true
summary: "文章摘要"
---

文章内容...
```

详细写作指南请查看 [使用手册](./USER_MANUAL.md#博客文章管理)。

## 许可证

MIT

## 联系方式

- **作者**: Breydan Tan
- **邮箱**: breydantech@gmail.com
- **GitHub**: [@BreydanTan](https://github.com/BreydanTan)
- **博客**: https://blog.breydan.com
