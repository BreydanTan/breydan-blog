# 🌐 Cloudflare Pages 完整配置指南

本指南将详细介绍如何配置和部署你的 Next.js 博客到 Cloudflare Pages。

---

## 📋 目录

1. [准备工作](#1-准备工作)
2. [获取 Cloudflare 凭证](#2-获取-cloudflare-凭证)
3. [本地部署配置](#3-本地部署配置)
4. [GitHub Actions 自动部署](#4-github-actions-自动部署)
5. [自定义域名配置](#5-自定义域名配置)
6. [环境变量配置](#6-环境变量配置)
7. [性能优化](#7-性能优化)
8. [故障排除](#8-故障排除)

---

## 1. 准备工作

### 1.1 前置要求

- ✅ Cloudflare 账号 (免费即可)
- ✅ Node.js 20+
- ✅ Git 和 GitHub 账号
- ✅ 本地项目已构建成功

### 1.2 检查项目配置

确保以下文件配置正确：

#### `wrangler.toml`
```toml
name = "nextjs-blog-template-worker"
compatibility_date = "2024-12-18"
compatibility_flags = ["nodejs_compat"]
main = ".open-next/worker.js"

# KV namespaces for caching
[[kv_namespaces]]
binding = "CACHE"
id = "your-kv-namespace-id"  # 需要替换

# Assets for static files
[assets]
directory = ".open-next/assets"

# Environment variables
[env.production]
NODE_ENV = "production"
```

#### `next.config.ts`
```typescript
{
  output: 'export',           // 静态导出
  trailingSlash: true,        // URL 末尾斜杠
  images: {
    unoptimized: true,        // 静态导出必需
  },
}
```

---

## 2. 获取 Cloudflare 凭证

### 2.1 创建 API Token

1. **登录 Cloudflare Dashboard**
   ```
   https://dash.cloudflare.com
   ```

2. **进入 API Tokens 页面**
   ```
   右上角头像 > My Profile > API Tokens
   ```

3. **创建 Token**
   - 点击 "Create Token"
   - 使用模板: **"Edit Cloudflare Workers"**
   - 或自定义权限:
     ```
     Account > Cloudflare Pages > Edit
     ```

4. **配置 Token 权限**
   ```
   Account Permissions:
   - Cloudflare Pages: Edit

   Account Resources:
   - Include > [Your Account]

   Client IP Address Filtering (可选):
   - 留空或指定 IP 范围

   TTL (可选):
   - 推荐不设置过期时间
   ```

5. **保存 Token**
   - 点击 "Continue to summary"
   - 点击 "Create Token"
   - **立即复制 Token** (只显示一次！)

   示例格式:
   ```
   xxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 2.2 获取 Account ID

1. **在 Cloudflare Dashboard 任意页面**
2. **查看右侧栏**
   ```
   Account ID: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
3. **复制 Account ID**

### 2.3 创建 KV Namespace

KV Namespace 用于缓存，提升性能。

#### 方法一：使用 Wrangler CLI

```bash
# 安装 Wrangler (如果还没安装)
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 创建 KV namespace
wrangler kv:namespace create "CACHE"

# 输出示例:
# 🌀 Creating namespace with title "nextjs-blog-template-worker-CACHE"
# ✨ Success!
# Add the following to your wrangler.toml:
# { binding = "CACHE", id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" }
```

#### 方法二：通过 Dashboard

1. 访问: `Workers & Pages > KV`
2. 点击 "Create a namespace"
3. 命名为: `blog-cache` 或其他名称
4. 创建后复制 Namespace ID

#### 更新 wrangler.toml

```toml
[[kv_namespaces]]
binding = "CACHE"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"  # 替换为你的 KV ID
```

---

## 3. 本地部署配置

### 3.1 安装 Wrangler CLI

```bash
# 全局安装
npm install -g wrangler

# 或项目本地安装
npm install -D wrangler
```

### 3.2 登录 Cloudflare

```bash
wrangler login
```

这会打开浏览器，授权 Wrangler 访问你的账户。

### 3.3 创建 Pages 项目

```bash
wrangler pages project create nextjs-blog-template
```

输出示例:
```
✨ Successfully created the 'nextjs-blog-template' project.
🌎 View your project at https://nextjs-blog-template.pages.dev
```

### 3.4 构建项目

```bash
# 构建 Cloudflare 版本
npm run build:cloudflare
```

这会创建 `.open-next/` 目录，包含优化后的文件。

### 3.5 首次部署

```bash
# 使用 Wrangler 部署
wrangler pages deploy .open-next/assets --project-name=nextjs-blog-template

# 或使用 npm 脚本
npm run deploy
```

成功后会显示:
```
✨ Success! Uploaded X files (Y.YY sec)

✨ Deployment complete! Take a peek over at https://xxxxx.nextjs-blog-template.pages.dev
```

---

## 4. GitHub Actions 自动部署

### 4.1 添加 GitHub Secrets

1. **进入 GitHub 仓库设置**
   ```
   https://github.com/BreydanTan/breydan-blog/settings/secrets/actions
   ```

2. **添加 Secrets**

   点击 "New repository secret"，添加:

   **CLOUDFLARE_API_TOKEN**
   ```
   名称: CLOUDFLARE_API_TOKEN
   值: xxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   **CLOUDFLARE_ACCOUNT_ID**
   ```
   名称: CLOUDFLARE_ACCOUNT_ID
   值: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

### 4.2 验证 Workflow 配置

检查 `.github/workflows/deploy-cloudflare.yml`:

```yaml
- name: Deploy to Cloudflare Pages
  uses: cloudflare/wrangler-action@v3
  with:
    apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
    command: pages deploy .open-next/assets --project-name=nextjs-blog-template
```

### 4.3 触发部署

```bash
# 提交并推送到 main 分支
git add .
git commit -m "feat: update blog"
git push origin main
```

### 4.4 查看部署状态

1. **GitHub Actions 页面**
   ```
   https://github.com/BreydanTan/breydan-blog/actions
   ```

2. **Cloudflare Dashboard**
   ```
   Workers & Pages > nextjs-blog-template > Deployments
   ```

---

## 5. 自定义域名配置

### 5.1 添加自定义域名

1. **进入 Cloudflare Pages 项目**
   ```
   Workers & Pages > nextjs-blog-template
   ```

2. **点击 "Custom domains"**

3. **添加域名**
   ```
   - 输入你的域名: blog.breydan.com
   - 点击 "Continue"
   ```

### 5.2 配置 DNS

#### 方案 A: 域名在 Cloudflare

如果域名已在 Cloudflare，DNS 会自动配置 ✅

#### 方案 B: 域名在其他服务商

1. **获取 CNAME 记录**
   ```
   Cloudflare 会显示:
   CNAME: your-project.pages.dev
   ```

2. **在域名提供商添加 CNAME**
   ```
   类型: CNAME
   名称: blog (或 @ 表示根域名)
   值: your-project.pages.dev
   TTL: 自动 或 3600
   ```

3. **等待 DNS 传播** (通常 5-30 分钟)

### 5.3 启用 HTTPS

Cloudflare 自动为自定义域名签发 SSL 证书，通常在几分钟内完成。

检查状态:
```
Custom domains > 查看域名旁的状态
✅ Active = 已启用
⏳ Pending = 等待中
```

### 5.4 强制 HTTPS

1. **进入 SSL/TLS 设置**
   ```
   SSL/TLS > Edge Certificates
   ```

2. **启用 "Always Use HTTPS"**
   ```
   ✅ Always Use HTTPS: On
   ```

---

## 6. 环境变量配置

### 6.1 在 Cloudflare 添加环境变量

1. **进入项目设置**
   ```
   Workers & Pages > nextjs-blog-template > Settings > Environment variables
   ```

2. **添加变量**

   **生产环境**:
   ```
   变量名: NEXT_PUBLIC_SITE_URL
   值: https://blog.breydan.com
   环境: Production
   ```

   **预览环境**:
   ```
   变量名: NEXT_PUBLIC_SITE_URL
   值: https://preview.blog.breydan.com
   环境: Preview
   ```

### 6.2 常用环境变量

```bash
# 必需
NEXT_PUBLIC_SITE_URL=https://blog.breydan.com

# 可选
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NODE_ENV=production
```

### 6.3 使用 wrangler.toml 配置

```toml
[env.production]
NODE_ENV = "production"
NEXT_PUBLIC_SITE_URL = "https://blog.breydan.com"

[env.preview]
NODE_ENV = "development"
NEXT_PUBLIC_SITE_URL = "https://preview.blog.breydan.com"
```

---

## 7. 性能优化

### 7.1 启用缓存

KV Namespace 已配置，自动缓存 ✅

### 7.2 配置缓存规则

在 `wrangler.toml` 中:

```toml
[build]
command = "npm run build:cloudflare"

[build.upload]
format = "directory"

# 缓存配置
[[rules]]
type = "Data"
globs = ["**/*.{jpg,jpeg,png,gif,svg,webp,ico}"]
fallthrough = false
```

### 7.3 查看性能指标

1. **Cloudflare Analytics**
   ```
   Workers & Pages > nextjs-blog-template > Analytics
   ```

2. **指标包括**:
   - 请求数
   - 带宽使用
   - 响应时间
   - 错误率

---

## 8. 故障排除

### 8.1 部署失败

**问题**: `Error 10000: Authentication error`

**解决**:
```bash
# 检查 API Token
echo $CLOUDFLARE_API_TOKEN

# 重新登录
wrangler logout
wrangler login
```

### 8.2 KV Namespace 错误

**问题**: `Error: KV namespace not found`

**解决**:
```bash
# 列出所有 KV
wrangler kv:namespace list

# 创建新的
wrangler kv:namespace create "CACHE"

# 更新 wrangler.toml 中的 ID
```

### 8.3 构建失败

**问题**: `Module not found` 或 `Build failed`

**解决**:
```bash
# 清理并重新安装
rm -rf node_modules .next out
npm install

# 重新构建
npm run build:cloudflare
```

### 8.4 域名未生效

**问题**: 自定义域名无法访问

**解决**:
```bash
# 检查 DNS 配置
dig blog.breydan.com

# 或
nslookup blog.breydan.com

# 应该返回 CNAME 记录指向 *.pages.dev
```

### 8.5 环境变量未生效

**问题**: 环境变量在应用中未定义

**解决**:
1. 确保变量名以 `NEXT_PUBLIC_` 开头（客户端使用）
2. 在 Cloudflare Dashboard 检查变量是否正确设置
3. 重新部署项目

### 8.6 查看日志

```bash
# 实时日志
wrangler pages deployment tail

# 或在 Dashboard 查看
# Workers & Pages > nextjs-blog-template > Logs
```

---

## 9. 最佳实践

### 9.1 分支部署策略

```yaml
main 分支 → 生产环境
preview-* 分支 → 预览环境
dev 分支 → 开发环境
```

### 9.2 版本回滚

1. **进入部署历史**
   ```
   Workers & Pages > nextjs-blog-template > Deployments
   ```

2. **选择之前的部署**
3. **点击 "Rollback to this deployment"**

### 9.3 监控和告警

设置 Cloudflare 告警:
```
Notifications > Destinations > 添加邮箱或 Webhook
Notifications > Alerts > 创建告警规则
```

---

## 10. 常用命令速查

```bash
# 登录
wrangler login

# 创建项目
wrangler pages project create <project-name>

# 列出项目
wrangler pages project list

# 部署
wrangler pages deploy <directory> --project-name=<project-name>

# 查看部署列表
wrangler pages deployment list --project-name=<project-name>

# 实时日志
wrangler pages deployment tail

# KV 操作
wrangler kv:namespace list
wrangler kv:namespace create <name>
wrangler kv:key list --namespace-id=<id>
```

---

## 11. 资源链接

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [OpenNext.js 文档](https://opennext.js.org/)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)

---

## 总结

完成以上配置后，你将拥有：

- ✅ 自动化 CI/CD 部署
- ✅ 全球 CDN 加速
- ✅ 免费 HTTPS 证书
- ✅ 自定义域名
- ✅ 预览环境
- ✅ 性能监控

如有问题，请查看 [故障排除](#8-故障排除) 或提交 Issue。
