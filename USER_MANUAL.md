# Breydan Blog 使用手册

## 📋 目录
- [项目概述](#项目概述)
- [环境要求](#环境要求)
- [快速开始](#快速开始)
- [常用命令](#常用命令)
- [本地开发](#本地开发)
- [博客文章管理](#博客文章管理)
- [部署指南](#部署指南)
- [配置说明](#配置说明)
- [故障排除](#故障排除)

---

## 项目概述

这是一个基于 Next.js 15 的现代化博客系统，采用静态导出方式，支持部署到 Cloudflare Pages。

### 技术栈
- **框架**: Next.js 15.2.4 (React 19)
- **语言**: TypeScript 5
- **样式**: TailwindCSS 4
- **内容**: MDX (支持 Markdown + React 组件)
- **评论**: Giscus (基于 GitHub Discussions)
- **部署**: Cloudflare Pages / Vercel
- **UI 组件**: Radix UI + Framer Motion

### 项目特点
- ✅ 静态站点生成 (SSG)
- ✅ 完整的 SEO 优化
- ✅ RSS/Atom/JSON Feed 支持
- ✅ 自动生成 Sitemap
- ✅ 代码高亮 (highlight.js)
- ✅ 数学公式支持 (KaTeX)
- ✅ 响应式设计
- ✅ 暗色模式支持

---

## 环境要求

### 必需
- **Node.js**: >= 20.x
- **npm**: >= 10.x
- **Git**: 最新版本

### 可选 (用于 Cloudflare 部署)
- **Wrangler CLI**: Cloudflare 命令行工具
- **Cloudflare 账号**: 用于部署

---

## 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/BreydanTan/breydan-blog.git
cd breydan-blog
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 `http://localhost:3000` 查看效果。

---

## 常用命令

### 开发命令
```bash
# 启动开发服务器 (使用 Turbopack 加速)
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器 (用于本地预览)
npm start

# 代码检查
npm run lint
```

### 内容管理命令
```bash
# 生成站点地图
npm run generate-sitemap

# 生成 RSS Feed
npm run generate-rss

# 同步图片到 AWS S3
npm run sync-images
```

### Cloudflare 部署命令
```bash
# 构建 Cloudflare 版本
npm run build:cloudflare

# 部署到 Cloudflare Pages
npm run deploy

# 完整部署流程 (构建 + 部署)
npm run build:cloudflare && npm run deploy
```

---

## 本地开发

### 开发工作流

1. **创建新分支**
```bash
git checkout -b feature/your-feature-name
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **实时预览**
- 访问 `http://localhost:3000`
- 修改代码会自动热重载
- 修改博客内容会自动刷新

4. **测试构建**
```bash
npm run build
npm start
```

### 目录结构
```
breydan-blog/
├── src/
│   ├── app/                 # Next.js App Router 页面
│   │   ├── about/          # 关于页面
│   │   ├── blog/           # 博客列表和详情
│   │   └── layout.tsx      # 根布局
│   ├── components/         # React 组件
│   │   ├── ui/             # UI 基础组件
│   │   ├── header/         # 导航栏组件
│   │   └── icons/          # 图标组件
│   ├── content/            # 内容文件
│   │   └── blog/           # 博客文章 (MDX)
│   ├── lib/                # 工具函数和配置
│   │   ├── config.ts       # 站点配置
│   │   └── utils.ts        # 工具函数
│   └── hooks/              # React Hooks
├── public/                 # 静态资源
│   ├── images/             # 图片资源
│   └── favicon.ico         # 网站图标
├── scripts/                # 构建脚本
│   ├── generate-sitemap.js # 生成 Sitemap
│   └── generate-rss.js     # 生成 RSS
└── next.config.ts          # Next.js 配置
```

---

## 博客文章管理

### 创建新文章

1. **创建文件**
在 `src/content/blog/` 目录下创建新的 `.md` 或 `.mdx` 文件：
```bash
touch src/content/blog/my-new-post.md
```

2. **添加 Front Matter**
```markdown
---
title: "文章标题"
date: "2025-01-17"
updated: "2025-01-17"
keywords: ["Next.js", "博客", "教程"]
featured: true
summary: "这是一篇关于 Next.js 博客的教程文章。"
---

# 文章标题

这里是正文内容...
```

### Front Matter 字段说明
| 字段 | 必需 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题 |
| `date` | ✅ | 发布日期 (YYYY-MM-DD) |
| `updated` | ❌ | 更新日期 |
| `keywords` | ❌ | SEO 关键词数组 |
| `featured` | ❌ | 是否在首页展示 |
| `summary` | ✅ | 文章摘要 |

### 文章内容编写

#### 基础 Markdown
```markdown
# 一级标题
## 二级标题
### 三级标题

**粗体** *斜体* ~~删除线~~

- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2

[链接文本](https://example.com)

![图片描述](/images/example.png)
```

#### 代码块
````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

#### 数学公式 (KaTeX)
```markdown
行内公式: $E = mc^2$

块级公式:
$$
\int_{a}^{b} f(x) dx
$$
```

#### 表格
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 数据1 | 数据2 | 数据3 |
```

### 图片管理

#### 本地图片
1. 将图片放在 `public/images/` 目录
2. 在文章中引用：
```markdown
![描述](/images/your-image.png)
```

#### AWS S3 图片
项目配置了 AWS S3 同步功能：
```bash
npm run sync-images
```

这会将 `public/images` 目录同步到 AWS S3。

---

## 部署指南

### 方式一：部署到 Cloudflare Pages (推荐)

#### 首次部署设置

1. **安装 Wrangler CLI**
```bash
npm install -g wrangler
```

2. **登录 Cloudflare**
```bash
wrangler login
```

3. **创建 KV 命名空间**
```bash
wrangler kv:namespace create "CACHE"
```

复制输出的 namespace ID，更新到 `wrangler.toml`:
```toml
[[kv_namespaces]]
binding = "CACHE"
id = "your-namespace-id-here"
```

4. **创建 Pages 项目**
```bash
wrangler pages project create nextjs-blog-template
```

#### 日常部署流程

```bash
# 1. 构建项目
npm run build:cloudflare

# 2. 部署到 Cloudflare
npm run deploy

# 或者一步到位
npm run build:cloudflare && npm run deploy
```

#### 设置自定义域名

1. 登录 Cloudflare Dashboard
2. 进入 Pages 项目
3. 点击 "Custom domains"
4. 添加你的域名
5. 按照提示配置 DNS

### 方式二：部署到 Vercel

1. **安装 Vercel CLI** (可选)
```bash
npm install -g vercel
```

2. **通过 GitHub 集成部署**
   - 访问 [Vercel Dashboard](https://vercel.com)
   - 点击 "New Project"
   - 导入你的 GitHub 仓库
   - 保持默认配置
   - 点击 "Deploy"

3. **通过 CLI 部署**
```bash
vercel
```

### 方式三：静态导出到其他平台

项目已配置为静态导出，可以部署到任何静态托管服务：

```bash
# 构建
npm run build

# out 目录包含所有静态文件
# 可以上传到：
# - Netlify
# - GitHub Pages
# - AWS S3 + CloudFront
# - 任何支持静态网站的服务
```

---

## 配置说明

### 站点配置 (`src/lib/config.ts`)

#### 基本信息
```typescript
site: {
  title: "你的博客标题",
  name: "你的名字",
  description: "博客描述",
  keywords: ["关键词1", "关键词2"],
  url: "https://yourdomain.com",
  baseUrl: "https://yourdomain.com",
}
```

#### 作者信息
```typescript
author: {
  name: "你的名字",
  email: "your@email.com",
  bio: "个人简介",
}
```

#### 社交媒体
```typescript
social: {
  github: "https://github.com/yourusername",
  x: "https://x.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
}
```

#### Giscus 评论系统
```typescript
giscus: {
  repo: "yourusername/your-repo",
  repoId: "R_xxxxx",           // 从 Giscus 获取
  categoryId: "DIC_xxxxx",     // 从 Giscus 获取
}
```

**设置步骤**：
1. 访问 [giscus.app](https://giscus.app)
2. 输入你的 GitHub 仓库
3. 启用 Discussions
4. 复制生成的配置信息

#### 导航菜单
```typescript
navigation: {
  main: [
    { title: "博客", href: "/blog" },
    { title: "关于", href: "/about" },
    // 添加更多导航项
  ],
}
```

### Next.js 配置 (`next.config.ts`)

当前配置为静态导出：
```typescript
{
  output: 'export',           // 静态导出
  trailingSlash: true,        // URL 末尾添加斜杠
  images: {
    unoptimized: true,        // 静态导出必需
  },
}
```

### Cloudflare 配置 (`wrangler.toml`)

```toml
name = "nextjs-blog-template-worker"
compatibility_date = "2024-12-18"

# KV 缓存配置
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"

# 静态资源目录
[assets]
directory = ".open-next/assets"
```

---

## 故障排除

### 常见问题

#### 1. 开发服务器启动失败
```bash
# 清除缓存和依赖
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

#### 2. 构建失败
```bash
# 检查 TypeScript 错误
npm run lint

# 清除构建缓存
rm -rf .next out
npm run build
```

#### 3. 图片无法显示
确保图片路径正确：
- 使用绝对路径: `/images/photo.png`
- 不要使用: `./images/photo.png` 或 `../images/photo.png`

#### 4. Cloudflare 部署失败
```bash
# 检查 Wrangler 登录状态
wrangler whoami

# 重新登录
wrangler logout
wrangler login

# 检查配置
cat wrangler.toml
```

#### 5. Giscus 评论不显示
- 确保仓库是公开的
- 确保已启用 Discussions
- 检查 `repoId` 和 `categoryId` 是否正确

#### 6. 端口冲突
```bash
# 使用不同端口
PORT=3001 npm run dev
```

### 获取帮助

如果遇到问题：
1. 查看 [Next.js 文档](https://nextjs.org/docs)
2. 查看 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
3. 提交 Issue 到 GitHub 仓库

---

## 性能优化建议

### 开发环境
- 使用 Turbopack 加速开发 (默认启用)
- 使用增量静态生成 (ISR) 减少构建时间

### 生产环境
- 图片优化: 使用 WebP 格式
- 代码分割: Next.js 自动处理
- CSS 优化: TailwindCSS 自动清除未使用样式
- 启用 CDN: Cloudflare 自动提供全球 CDN

---

## 更新日志

### 版本管理
```bash
# 查看当前版本
cat package.json | grep version

# 更新依赖
npm update

# 检查过时依赖
npm outdated
```

---

## 许可证

请查看项目根目录的 LICENSE 文件。

---

## 联系方式

- **作者**: Breydan Tan
- **邮箱**: breydantech@gmail.com
- **GitHub**: [@BreydanTan](https://github.com/BreydanTan)
- **博客**: https://blog.breydan.com
