# 🚀 开发环境配置指南

本指南将帮助你配置完整的开发环境，包括代码格式化和 CI/CD 自动化。

---

## 📋 目录

1. [代码格式化配置](#1-代码格式化配置)
2. [Git Hooks 配置](#2-git-hooks-配置)
3. [CI/CD 配置](#3-cicd-配置)
4. [验证配置](#4-验证配置)
5. [常见问题](#5-常见问题)

---

## 1. 代码格式化配置

### 安装 Prettier

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

### 配置文件说明

#### `.prettierrc`
已配置的格式化规则：
- ✅ 使用分号
- ✅ 使用双引号
- ✅ 2 空格缩进
- ✅ 行宽 100 字符
- ✅ ES5 风格的尾逗号
- ✅ TailwindCSS 类名自动排序

#### `.prettierignore`
忽略以下文件/目录：
- `node_modules`
- `.next` 和 `out` 构建目录
- 生成的文件（sitemap, RSS 等）

### 添加 NPM 脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md,mdx,css}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,md,mdx,css}\"",
    "type-check": "tsc --noEmit"
  }
}
```

### 使用方法

```bash
# 格式化所有代码
npm run format

# 检查代码格式（不修改文件）
npm run format:check

# 类型检查
npm run type-check
```

---

## 2. Git Hooks 配置

### 安装 Husky 和 lint-staged

```bash
npm install -D husky lint-staged

# 初始化 Husky
npx husky init
```

### 配置说明

#### `.lintstagedrc.json`
在提交前自动执行：
- **TypeScript/JavaScript 文件**: ESLint 修复 + Prettier 格式化
- **JSON/Markdown/CSS 文件**: Prettier 格式化

#### `.husky/pre-commit`
每次 `git commit` 前自动运行 lint-staged

### 工作流程

```bash
# 1. 修改文件
vim src/app/page.tsx

# 2. 添加到暂存区
git add .

# 3. 提交（自动触发格式化和检查）
git commit -m "Update homepage"

# 如果有格式问题，会自动修复并需要重新添加
git add .
git commit -m "Update homepage"
```

---

## 3. CI/CD 配置

### GitHub Actions 工作流

已创建 3 个自动化工作流：

#### 3.1 持续集成 (CI) - `.github/workflows/ci.yml`

**触发条件**:
- Push 到 main/master 分支
- 创建 Pull Request

**执行步骤**:
1. ✅ 代码检出
2. ✅ 安装 Node.js 20
3. ✅ 安装依赖
4. ✅ 运行 ESLint 检查
5. ✅ 检查代码格式
6. ✅ TypeScript 类型检查
7. ✅ 构建项目
8. ✅ 上传构建产物

#### 3.2 Cloudflare 部署 - `.github/workflows/deploy-cloudflare.yml`

**触发条件**:
- Push 到 main/master 分支
- 手动触发

**执行步骤**:
1. ✅ 构建 Cloudflare 版本
2. ✅ 部署到 Cloudflare Pages

**所需 Secrets**:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

#### 3.3 预览部署 - `.github/workflows/preview.yml`

**触发条件**:
- 创建 Pull Request

**执行步骤**:
1. ✅ 构建预览版本
2. ✅ 部署到预览环境
3. ✅ 在 PR 中评论预览链接

### 配置 GitHub Secrets

1. **获取 Cloudflare API Token**:
   ```bash
   # 访问 Cloudflare Dashboard
   # Account > API Tokens > Create Token
   # 使用模板: "Edit Cloudflare Workers"
   ```

2. **获取 Cloudflare Account ID**:
   ```bash
   # Cloudflare Dashboard > 右侧栏查看 Account ID
   ```

3. **在 GitHub 中添加 Secrets**:
   ```
   GitHub Repository > Settings > Secrets and variables > Actions

   添加:
   - CLOUDFLARE_API_TOKEN: <your-token>
   - CLOUDFLARE_ACCOUNT_ID: <your-account-id>
   ```

### 查看工作流状态

```bash
# 访问 GitHub Actions 页面
https://github.com/BreydanTan/breydan-blog/actions

# 或使用 GitHub CLI
gh workflow list
gh run list
gh run view <run-id>
```

---

## 4. 验证配置

### 4.1 验证 Prettier

```bash
# 检查格式
npm run format:check

# 格式化代码
npm run format

# 应该输出: "All matched files use Prettier code style!"
```

### 4.2 验证 Husky

```bash
# 创建测试提交
echo "test" >> test.txt
git add test.txt
git commit -m "test commit"

# 应该看到 lint-staged 运行
# ✔ Preparing lint-staged...
# ✔ Running tasks for staged files...
# ✔ Applying modifications from tasks...
# ✔ Cleaning up temporary files...
```

### 4.3 验证 CI/CD

```bash
# 1. Push 代码到 GitHub
git push origin main

# 2. 访问 Actions 页面查看运行状态
https://github.com/BreydanTan/breydan-blog/actions

# 3. 所有检查应该通过 ✅
```

---

## 5. 常见问题

### Q1: Prettier 和 ESLint 冲突怎么办？

**解决方案**:
```bash
npm install -D eslint-config-prettier

# 更新 eslint.config.mjs，添加 prettier 配置
```

### Q2: Husky hooks 没有执行？

**解决方案**:
```bash
# 重新安装 Husky
rm -rf .husky
npx husky init

# 确保 pre-commit 有执行权限
chmod +x .husky/pre-commit

# 确保 package.json 中有 prepare 脚本
npm pkg set scripts.prepare="husky install"
```

### Q3: GitHub Actions 部署失败？

**检查清单**:
- ✅ 是否添加了 `CLOUDFLARE_API_TOKEN`?
- ✅ 是否添加了 `CLOUDFLARE_ACCOUNT_ID`?
- ✅ Token 权限是否正确？
- ✅ Cloudflare Pages 项目是否已创建？

### Q4: 格式化破坏了我的代码？

**解决方案**:
```bash
# 回退更改
git checkout -- .

# 或使用特定文件的忽略
# 在文件顶部添加:
// prettier-ignore
或
{/* prettier-ignore */}
```

### Q5: CI 构建很慢？

**优化方案**:
```yaml
# 在 workflow 中启用缓存（已配置）
- uses: actions/setup-node@v4
  with:
    cache: 'npm'  # 缓存 npm 依赖
```

---

## 6. VSCode 集成（推荐）

### 安装扩展

```bash
# 必需扩展
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)

# 可选扩展
- MDX (unifiedjs.vscode-mdx)
- GitLens (eamodio.gitlens)
```

### VSCode 配置

创建 `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "files.eol": "\n"
}
```

---

## 7. 完整安装流程

### 一键安装所有工具

```bash
# 1. 安装所有开发依赖
npm install -D prettier prettier-plugin-tailwindcss husky lint-staged

# 2. 初始化 Husky
npx husky init

# 3. 添加 prepare 脚本
npm pkg set scripts.prepare="husky install"

# 4. 运行 prepare
npm run prepare

# 5. 验证安装
npm run format:check
git add .
git commit -m "test: verify husky setup"
```

### 更新 package.json

确保包含以下脚本：

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write \"**/*.{js,jsx,ts,tsx,json,md,mdx,css}\"",
    "format:check": "prettier --check \"**/*.{js,jsx,ts,tsx,json,md,mdx,css}\"",
    "type-check": "tsc --noEmit",
    "prepare": "husky install",
    "generate-sitemap": "node scripts/generate-sitemap.js",
    "generate-rss": "node scripts/generate-rss.js",
    "sync-images": "aws s3 sync public/images s3://elasticbeanstalk-ap-southeast-1-733447040549/blog --delete --acl public-read",
    "build:cloudflare": "next build && npx @opennextjs/cloudflare@latest build",
    "deploy": "npm run build && wrangler pages deploy out --project-name=nextjs-blog-template"
  }
}
```

---

## 8. 最佳实践

### 代码提交流程

```bash
# 1. 创建功能分支
git checkout -b feature/new-feature

# 2. 开发和测试
npm run dev

# 3. 格式化代码
npm run format

# 4. 检查类型
npm run type-check

# 5. 检查 lint
npm run lint

# 6. 提交（自动运行 hooks）
git add .
git commit -m "feat: add new feature"

# 7. 推送并创建 PR
git push origin feature/new-feature
# 自动触发预览部署

# 8. 合并到 main 后自动部署
```

### 团队协作规范

1. **提交前必须**:
   - ✅ 代码格式化通过
   - ✅ ESLint 检查通过
   - ✅ TypeScript 类型检查通过
   - ✅ 本地构建成功

2. **PR 要求**:
   - ✅ CI 检查全部通过
   - ✅ 有意义的提交信息
   - ✅ 代码审查通过

3. **部署流程**:
   - ✅ 自动部署到预览环境（PR）
   - ✅ 合并后自动部署到生产环境

---

## 9. 故障排除命令

```bash
# 清理所有缓存
rm -rf node_modules .next out .husky
npm install
npx husky init

# 检查 Git Hooks
ls -la .husky/
cat .husky/pre-commit

# 测试 lint-staged
npx lint-staged

# 测试 Prettier
npx prettier --check .

# 测试 ESLint
npx eslint .

# 验证 TypeScript
npx tsc --noEmit
```

---

## 总结

配置完成后，你的项目将拥有：

- ✅ **自动代码格式化**: 统一代码风格
- ✅ **Git 提交检查**: 防止提交有问题的代码
- ✅ **CI 自动测试**: 每次提交自动检查
- ✅ **自动部署**: Push 到 main 自动部署到生产
- ✅ **PR 预览**: 每个 PR 自动生成预览环境

这将大大提升开发效率和代码质量！

如有问题，请查看 [GitHub Actions 日志](https://github.com/BreydanTan/breydan-blog/actions) 或提交 Issue。
