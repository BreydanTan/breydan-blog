# 🚀 快速开始指南

欢迎使用 Breydan Blog！本指南将帮助你在 5 分钟内完成开发环境配置。

---

## 📦 一键安装（推荐）

```bash
# 1. 克隆项目（如果还没有）
git clone https://github.com/BreydanTan/breydan-blog.git
cd breydan-blog

# 2. 安装依赖
npm install

# 3. 运行自动配置脚本
npm run setup

# 4. 启动开发服务器
npm run dev
```

访问 `http://localhost:3000` 查看效果！

---

## 📚 完整文档索引

| 文档 | 用途 | 适合人群 |
|------|------|---------|
| [README.md](./README.md) | 项目概览和快速开始 | 所有人 |
| [USER_MANUAL.md](./USER_MANUAL.md) | 完整使用手册 | 开发者 |
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | CI/CD 和代码格式化配置 | 开发者 |
| [CLOUDFLARE_GUIDE.md](./CLOUDFLARE_GUIDE.md) | Cloudflare Pages 部署 | 运维人员 |
| [OPTIMIZATION_PLAN.md](./OPTIMIZATION_PLAN.md) | 项目优化方案 | 技术负责人 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 部署说明 | 运维人员 |

---

## 🛠️ 常用命令

### 开发
```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器（本地预览）
```

### 代码质量
```bash
npm run lint         # 检查代码质量
npm run lint:fix     # 自动修复代码问题
npm run format       # 格式化所有代码
npm run format:check # 检查代码格式（不修改）
npm run type-check   # TypeScript 类型检查
```

### 内容管理
```bash
npm run generate-sitemap  # 生成站点地图
npm run generate-rss      # 生成 RSS Feed
npm run sync-images       # 同步图片到 S3
```

### 部署
```bash
npm run build:cloudflare  # 构建 Cloudflare 版本
npm run deploy            # 部署到 Cloudflare Pages
```

### 维护
```bash
npm run clean        # 清理缓存和构建文件
npm run setup        # 重新配置开发环境
```

---

## ✍️ 写文章

### 1. 创建文章
```bash
# 在 src/content/blog/ 目录创建新文件
touch src/content/blog/my-first-post.md
```

### 2. 添加元数据
```markdown
---
title: "我的第一篇文章"
date: "2025-01-17"
updated: "2025-01-17"
keywords: ["博客", "教程"]
featured: true
summary: "这是文章摘要"
---

# 文章标题

这里是正文内容...
```

### 3. 预览
```bash
npm run dev
# 访问 http://localhost:3000/blog
```

详细写作指南: [USER_MANUAL.md - 博客文章管理](./USER_MANUAL.md#博客文章管理)

---

## 🎨 代码格式化

### 自动格式化（Git 提交时）
```bash
git add .
git commit -m "your message"
# 自动运行格式化和检查 ✅
```

### 手动格式化
```bash
npm run format
```

### VSCode 保存时自动格式化
1. 安装推荐扩展（`.vscode/extensions.json`）
2. 保存文件时自动格式化 ✅

详细配置: [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## 🚀 部署到 Cloudflare

### 方式一：手动部署
```bash
# 1. 构建
npm run build:cloudflare

# 2. 部署
npm run deploy
```

### 方式二：自动部署（推荐）
```bash
# 1. 配置 GitHub Secrets
# Settings > Secrets > Actions
# 添加: CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID

# 2. Push 到 main 分支
git push origin main

# 3. 自动部署 ✅
# 查看进度: https://github.com/你的用户名/breydan-blog/actions
```

详细步骤: [CLOUDFLARE_GUIDE.md](./CLOUDFLARE_GUIDE.md)

---

## 🔧 配置

### 站点配置
编辑 `src/lib/config.ts`:
```typescript
export const config = {
  site: {
    title: "你的博客标题",
    url: "https://yourdomain.com",
    // ...
  },
  author: {
    name: "你的名字",
    email: "your@email.com",
    // ...
  },
  social: {
    github: "https://github.com/yourusername",
    // ...
  },
}
```

### 环境变量
```bash
# 复制示例文件
cp .env.example .env.local

# 编辑配置
vim .env.local
```

详细配置: [USER_MANUAL.md - 配置说明](./USER_MANUAL.md#配置说明)

---

## 📋 检查清单

### 首次设置
- [ ] 运行 `npm install`
- [ ] 运行 `npm run setup`
- [ ] 配置 `src/lib/config.ts`
- [ ] 测试开发服务器 `npm run dev`

### 配置 Git Hooks
- [ ] 安装 Husky: `npx husky init`
- [ ] 测试提交检查

### 配置 CI/CD
- [ ] 添加 GitHub Secrets
- [ ] 测试自动部署

### 配置域名
- [ ] 在 Cloudflare 添加自定义域名
- [ ] 配置 DNS
- [ ] 启用 HTTPS

---

## 🆘 常见问题

### Q: 开发服务器启动失败？
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Q: Git Hooks 不工作？
```bash
rm -rf .husky
npx husky init
chmod +x .husky/pre-commit
```

### Q: 部署失败？
检查:
1. GitHub Secrets 是否正确配置
2. Cloudflare API Token 权限
3. 查看 [CLOUDFLARE_GUIDE.md - 故障排除](./CLOUDFLARE_GUIDE.md#8-故障排除)

### Q: 如何格式化代码？
```bash
npm run format
```

更多问题: [USER_MANUAL.md - 故障排除](./USER_MANUAL.md#故障排除)

---

## 📖 学习路径

### 初学者
1. 阅读 [README.md](./README.md) - 了解项目
2. 运行 `npm run setup` - 配置环境
3. 阅读 [USER_MANUAL.md](./USER_MANUAL.md) - 学习使用
4. 写第一篇文章
5. 本地部署测试

### 开发者
1. 完成初学者步骤
2. 阅读 [SETUP_GUIDE.md](./SETUP_GUIDE.md) - 配置工具
3. 配置 GitHub Actions
4. 配置 Cloudflare 自动部署
5. 查看 [OPTIMIZATION_PLAN.md](./OPTIMIZATION_PLAN.md) - 优化项目

### 高级用户
1. 完成开发者步骤
2. 实施优化方案
3. 添加自定义功能
4. 性能监控和优化

---

## 🎯 下一步

完成快速开始后，建议：

1. **写第一篇文章**
   - 在 `src/content/blog/` 创建文件
   - 使用 MDX 格式
   - 添加代码块和图片

2. **配置 GitHub Actions**
   - 添加 Secrets
   - 测试自动部署

3. **配置自定义域名**
   - 在 Cloudflare 添加域名
   - 配置 DNS
   - 启用 HTTPS

4. **优化项目**
   - 查看 [OPTIMIZATION_PLAN.md](./OPTIMIZATION_PLAN.md)
   - 实施第一阶段优化

---

## 📞 获取帮助

- **文档**: 查看上方文档索引
- **Issues**: [GitHub Issues](https://github.com/BreydanTan/breydan-blog/issues)
- **邮件**: breydantech@gmail.com

---

## 🎉 祝贺！

你已经完成了基本配置。开始创作吧！

```bash
npm run dev
# 访问 http://localhost:3000
```

Happy coding! 🚀
