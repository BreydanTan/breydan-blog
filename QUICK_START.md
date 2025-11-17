# 🚀 快速启动指南

网站重构已完成!以下是如何运行和部署你的新网站。

## 📦 本地开发

```bash
# 1. 安装依赖(如果还没安装)
npm install

# 2. 启动开发服务器
npm run dev

# 3. 在浏览器中打开
# http://localhost:3000
```

## 🏗️ 构建和预览

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run start
```

## 🎨 主要变化

### ✅ 完成的功能

1. **配色系统**
   - 复古蓝色主题 (#2d6dc3)
   - 温暖米白色背景 (#fdfaf5)
   - 金黄色强调 (#fad13b)
   - 完整暗色模式

2. **新组件**
   - `HeroSection` - 动画英雄区
   - `BlogCard` - 精美博客卡片
   - `AnimatedText` - 文字逐词动画
   - `ThemeToggle` - 主题切换

3. **设计提升**
   - Instrument Serif 优雅字体
   - Inter 现代正文字体
   - Framer Motion 动画
   - 响应式设计优化

## 🎯 下一步(可选)

### 域名迁移

当你准备好迁移域名到 breydan.com 时:

1. **更新配置文件**
   ```typescript
   // src/lib/config.ts
   export const config = {
     site: {
       url: "https://breydan.com",
       // ...
     }
   }
   ```

2. **重新生成 sitemap**
   ```bash
   npm run generate-sitemap
   ```

3. **Cloudflare Pages 设置**
   - 添加自定义域名: breydan.com
   - 设置 DNS 记录
   - 配置 SSL

4. **301 重定向**
   在 Cloudflare 中设置 blog.breydan.com → breydan.com

### 添加作品集页面(未完成)

如果你需要展示项目作品:

1. 创建 `/src/app/projects` 目录
2. 参考 `BlogCard` 创建 `ProjectCard`
3. 添加项目数据文件

参考文档: `REDESIGN_DOCUMENTATION.md`

## 📚 重要文件

```
重要文档:
├── REDESIGN_DOCUMENTATION.md  - 完整设计文档
├── QUICK_START.md             - 本文件
└── CODEBASE_OVERVIEW.md       - 代码库概览

新组件:
├── src/components/home/
│   ├── hero-section.tsx       - 首页英雄区
│   └── latest-articles.tsx    - 最新文章区
├── src/components/ui/
│   ├── animated-text.tsx      - 动画文本
│   └── section-header.tsx     - 区块标题
├── src/components/
│   ├── blog-card.tsx          - 博客卡片
│   └── theme-toggle.tsx       - 主题切换

样式:
└── src/app/globals.css        - 全局样式(已更新配色)
```

## 🎨 自定义配色

在 `src/app/globals.css` 中修改颜色变量:

```css
:root {
  --primary: #2d6dc3;      /* 主色调 */
  --accent: #fad13b;       /* 强调色 */
  --background: #fdfaf5;   /* 背景色 */
}

.dark {
  --primary: #3884eb;
  --background: #0b1220;
}
```

## ⚡ 性能提示

1. **图片优化**
   - 使用 Next.js Image 组件
   - 转换为 WebP 格式

2. **字体加载**
   - 已配置 Google Fonts
   - 使用 display=swap

3. **构建优化**
   - 静态生成所有页面
   - 自动代码分割

## 🐛 常见问题

### 构建失败?

确保所有博客文章都有 frontmatter:

```markdown
---
title: "文章标题"
date: "2025-01-17"
summary: "文章摘要"
featured: true
---
```

### 动画不流畅?

检查 `framer-motion` 版本:
```bash
npm list framer-motion
```

### 暗色模式不工作?

清除浏览器 localStorage:
```javascript
localStorage.removeItem('theme')
```

## 📞 需要帮助?

查看详细文档:
- `REDESIGN_DOCUMENTATION.md` - 设计系统详解
- `CODEBASE_OVERVIEW.md` - 架构说明

---

**构建成功 ✅**
**代码已推送 ✅**
**准备部署 ✅**

祝你使用愉快! 🎉
