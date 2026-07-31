# ChatGPT博客（chatgpt-blog.org）

基于 **Astro 7** + **TypeScript** + **Tailwind CSS v4** 的 AI 大模型教程与资讯博客，面向 Cloudflare Pages 静态部署，侧重 SEO。

## 功能概览

- 首页：三大入口、模型专栏、精选文章、快讯、工具、FAQ、免责声明
- 教程：列表 / 分类 / 分页 / 模型专栏（ChatGPT·Claude·Gemini·Grok）/ 详情 TOC
- 评测中心、快讯、标签页、访问说明、作者页、FAQ、隐私、HTML Sitemap
- 工具对比表 + 详情页；站内搜索；RSS
- SEO：meta / Open Graph / Twitter Card / JSON-LD（WebSite、Article、HowTo、FAQ、ItemList、Breadcrumb、Person）

## 技术栈

| 技术 | 说明 |
| --- | --- |
| Astro 7 | 静态站点生成 |
| TypeScript | 类型安全 |
| Tailwind CSS v4 | `@tailwindcss/vite` |
| Content Collections | guides / news / tools |
| @astrojs/sitemap | 自动生成 sitemap |
| Cloudflare Pages | 静态托管 |

## 快速开始

### 环境要求

- Node.js `>= 22.12.0`
- npm 9+

### 安装 / 开发 / 构建

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
npm run preview
```

## 项目结构

```text
src/
├── content/
│   ├── guides/          # 教程 Markdown
│   ├── news/            # 快讯 Markdown
│   └── tools/           # 工具 JSON
├── content.config.ts
├── layouts/
├── components/
├── pages/               # 路由 + robots.txt.ts + rss.xml.ts
├── styles/global.css
├── config/site.ts
└── utils/
public/images/covers/    # 文章封面 SVG
```

## 内容更新机制（建议每周）

1. **快讯（每周 1–2 条）**：在 `src/content/news/` 新增短文，记录模型/套餐/功能变化摘要  
2. **长文（每周 1 篇）**：优先覆盖高意图词：国内使用、对比、付费、报错排查、场景工作流  
3. **复测**：用固定 3 个真实任务盲测主流模型，必要时更新 `/compare/` 表述  
4. **过期修订**：改 `updatedDate`，避免只改标题不改正文  
5. **内链**：新文至少链到对应模型专栏、评测页、相关旧文  

### 新增教程

```md
---
title: '文章标题'
description: '160 字以内摘要'
pubDate: 2026-07-31
updatedDate: 2026-07-31
author: 'ChatGPT博客编辑部'
category: beginner   # beginner | advanced | api | tools
model: chatgpt       # chatgpt | claude | gemini | grok | general
tags: ['ChatGPT', '入门']
featured: false
cover: '/images/covers/chatgpt.svg'
coverAlt: '文章标题 封面'
howToSteps:          # 可选，用于 HowTo JSON-LD
  - name: '步骤一'
    text: '说明'
---

正文 Markdown…
```

封面可选用：`chatgpt.svg` / `claude.svg` / `gemini.svg` / `grok.svg` / `api.svg` / `tools.svg` / `general.svg`。

批量补封面：

```bash
node scripts/add-covers.mjs
```

### 新增快讯

在 `src/content/news/` 新建 Markdown，字段含 `title`、`description`、`pubDate`、`model`、`tags`。

### 新增工具

在 `src/content/tools/` 新建 JSON，需包含 `pricing`、`platform`、`audience`、`freeTier` 等对比字段。

## Cloudflare Pages 部署

| 配置项 | 值 |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `22`（建议） |

环境变量示例见 `.env.example`。本地预览：

```bash
npx wrangler pages dev dist
```

## SEO 说明

- 每页独立 title / description / canonical / OG / Twitter Card
- JSON-LD：WebSite、FAQPage、Article、HowTo、BreadcrumbList、ItemList、Person
- `robots.txt` → Sitemap；`/sitemap.xml` 301 到 `sitemap-index.xml`
- HTML Sitemap：`/sitemap/`；RSS：`/rss.xml`

## 脚本

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 开发服务器 |
| `npm run build` | 类型检查 + 生产构建 |
| `npm run preview` | 预览构建结果 |
| `node scripts/add-covers.mjs` | 为缺封面的教程补默认封面 |

## 许可证

内容与代码仅供学习参考。本站与 OpenAI、Anthropic、Google、xAI 等无关，商标归各自所有者所有。
