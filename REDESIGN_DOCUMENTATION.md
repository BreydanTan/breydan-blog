# 网站重构设计文档

## 🎨 设计系统

### 配色方案 (参考 BlogForRef)

#### 亮色模式
```css
主色调 (Primary): #2d6dc3 - 优雅的蓝色
主色调浅色 (Primary Light): #8fb9ff
主色调更浅 (Primary Lighter): #6da7ff
主色调强调 (Primary Strong): #0066ff
强调色 (Accent): #fad13b - 金黄色

背景色:
- 主背景: #fdfaf5 - 温暖的米白色
- 卡片背景: #ffffff
- 次要背景: #faf9f5

文本颜色:
- 主文本: #2d6dc3 - 蓝色
- 次要文本: #3f4a5a - 深灰蓝色
- 弱化文本: #677487

中性色阶 (蓝灰色系):
--neutral-50: #f7f9fc
--neutral-100: #edf1f8
--neutral-200: #dfe4ed
--neutral-300: #c5cedb
--neutral-500: #677487
--neutral-700: #3f4a5a
--neutral-900: #19222f
```

#### 暗色模式
```css
主色调: #3884eb - 更亮的蓝色
背景色:
- 主背景: #0b1220 - 深海军蓝
- 卡片背景: #0f1b2d
- 次要背景: #19222f

文本颜色:
- 主文本: #3884eb
- 次要文本: #c5cedb
- 弱化文本: #92a1b7
```

### 字体系统

```css
品牌字体 (Headings): "Instrument Serif", serif
- 优雅的衬线字体
- 用于标题和重要文本
- 字重: 400

正文字体 (Body): "Inter", sans-serif
- 现代无衬线字体
- 用于正文和界面元素
- 支持可变字重
```

### 圆角规范

```css
小圆角: 0.375rem (6px)
中圆角: 0.5rem (8px)
大圆角: 1rem (16px) - rounded-2xl
特大圆角: 1.5rem (24px) - rounded-3xl
```

---

## 📦 组件架构

### 新创建的组件

#### 1. **UI 基础组件** (`src/components/ui/`)

**AnimatedText.tsx**
- 功能: 文字逐词出现动画
- Props:
  - `text`: string - 要显示的文本
  - `as`: "h1" | "h2" | "h3" | "p" | "span" - HTML 标签
  - `delay`: number - 延迟时间(秒)
  - `duration`: number - 动画持续时间
  - `stagger`: number - 单词间隔时间
- 使用: Hero 标题动画

**SectionHeader.tsx**
- 功能: 统一的区块标题组件
- Props:
  - `title`: string - 标题
  - `description`: string (可选) - 描述
- 样式: 使用 font-brand 的优雅标题

#### 2. **首页组件** (`src/components/home/`)

**HeroSection.tsx**
- 两栏布局(响应式)
- 左侧: 动画文字介绍 + CTA 按钮 + 社交链接
- 右侧: 特色卡片/头像展示
- 特点:
  - 渐变背景装饰
  - 悬浮装饰元素
  - 响应式网格布局

**LatestArticles.tsx**
- 展示最新 3 篇特色文章
- 使用 BlogCard 组件
- 响应式网格: 1列(移动) → 2列(平板) → 3列(桌面)
- 底部"查看全部"链接

#### 3. **博客组件**

**BlogCard.tsx** (`src/components/blog-card.tsx`)
- 两种布局模式:
  1. **垂直布局** (默认):
     - 图片占位符(带首字母)
     - 日期 + 阅读时间
     - 标题(最多2行)
     - 摘要(最多3行)
     - "Read More"链接

  2. **水平布局** (featured=true):
     - 左右两栏
     - 更大的文字
     - Featured 徽章
     - 适合特色文章

- 悬停效果:
  - 边框颜色变化
  - 轻微上移(-translate-y-1)
  - 阴影加深
  - 渐变遮罩显示

**ThemeToggle.tsx**
- 太阳/月亮图标切换
- localStorage 持久化
- 尊重系统偏好
- 平滑过渡动画

---

## 🎯 页面结构

### 首页 (`src/app/page.tsx`)

```tsx
<div className="container-anthropic">
  <HeroSection />
  <LatestArticles />
</div>
```

**简洁的组件组合:**
- HeroSection: 英雄区
- LatestArticles: 最新文章区

---

## 🎨 设计特色

### 1. 复古现代融合
- 衬线字体 (Instrument Serif) + 现代无衬线 (Inter)
- 蓝色系主题唤起复古印刷设计
- 现代化的动画和交互

### 2. 丰富的动画
- **文字动画**: 逐词淡入 + 模糊效果
- **卡片动画**:
  - 滚动时淡入
  - 悬停时上移 + 边框高亮
  - 渐变遮罩过渡
- **主题切换**: 平滑的颜色过渡

### 3. 视觉层次
- 大胆的标题(使用 Instrument Serif)
- 清晰的文本层次(primary/secondary/muted)
- 充足的留白
- 微妙的渐变和阴影

### 4. 响应式设计
- 移动优先方法
- 断点:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

---

## 🚀 关键改进

### 相比原设计

1. **视觉冲击力**
   - ✅ 更大胆的首页英雄区
   - ✅ 优雅的 Instrument Serif 字体
   - ✅ 温暖的米白色背景(#fdfaf5)
   - ✅ 金黄色强调色(#fad13b)

2. **动画体验**
   - ✅ 文字逐词出现动画
   - ✅ 卡片 hover 微交互
   - ✅ 滚动触发动画

3. **组件化**
   - ✅ 高度模块化的组件
   - ✅ 可复用的 UI 组件
   - ✅ 清晰的组件层次

4. **暗色模式**
   - ✅ 完整的暗色主题
   - ✅ 深海军蓝背景(#0b1220)
   - ✅ 主题切换按钮

---

## 📋 使用指南

### 自定义配色

在 `src/app/globals.css` 中修改:

```css
:root {
  --primary: #2d6dc3;  /* 主色调 */
  --accent: #fad13b;   /* 强调色 */
  --background: #fdfaf5; /* 背景色 */
}
```

### 添加新区块

1. 在 `src/components/home/` 创建新组件
2. 使用 `SectionHeader` 组件作为标题
3. 导入到 `src/app/page.tsx`

示例:
```tsx
// src/components/home/featured-works.tsx
export function FeaturedWorks() {
  return (
    <section className="py-16 md:py-24">
      <SectionHeader
        title="Featured Work ↓"
        description="Selected projects I've worked on"
      />
      {/* 内容 */}
    </section>
  );
}
```

### 使用 AnimatedText

```tsx
<AnimatedText
  text="Your animated text here"
  as="h1"
  className="text-4xl font-brand text-primary"
  delay={0.1}
  stagger={0.03}
/>
```

---

## 🎯 未来扩展建议

### 可选功能 (如需要)

1. **作品集页面**
   - 创建 `/projects` 路由
   - ProjectCard 组件(类似 BlogCard)
   - 项目详情页

2. **关于页面增强**
   - 时间线组件
   - 技能标签云
   - 工作经历卡片

3. **高级动画**
   - 视差滚动效果
   - 页面过渡动画
   - SVG 动画装饰

4. **搜索功能**
   - 全文搜索
   - 标签筛选
   - 分类浏览

---

## 🔧 技术栈

- **框架**: Next.js 15 + React 19
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **字体**: Google Fonts (Instrument Serif, Inter)
- **图标**: Lucide React
- **内容**: Content Collections (MDX)

---

## 📱 响应式测试清单

- [ ] 移动端 (320px - 640px)
- [ ] 平板 (640px - 1024px)
- [ ] 桌面 (1024px+)
- [ ] 暗色模式切换
- [ ] 触摸交互(移动端)
- [ ] 键盘导航

---

## 🎨 设计灵感来源

**BlogForRef** - Astro 个人作品集/博客模板
- 复古蓝色配色方案
- Instrument Serif 字体使用
- 卡片 hover 效果
- 动画细节

---

## ✨ 设计哲学

1. **内容优先**: 设计服务于内容,而非压倒内容
2. **优雅简约**: 去除不必要的装饰,保持视觉清晰
3. **性能第一**: 动画不牺牲性能
4. **可访问性**: 语义化 HTML,良好的对比度
5. **愉悦体验**: 微妙的动画增加趣味性

---

生成时间: 2025-01-17
设计版本: v1.0 - BlogForRef 风格
