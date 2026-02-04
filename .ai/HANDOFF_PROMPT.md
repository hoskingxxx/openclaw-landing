# 🔴 AI Handoff Prompt - Copy & Paste This to ChatGPT/Gemini

**最后更新：** 2026-02-04

---

## 项目上下文：OpenClaw AI Survival Guide

你正在接手一个 **Next.js 16.1.6** 网站，专注于帮助开发者运行 DeepSeek R1 本地部署，解决 OOM 错误和性能问题。

### 📁 先读这些文件（按顺序）：

1. `.ai/STATE.md` - 技术栈、路由、内容库（唯一状态文件 SSOT）
2. `.ai/RULES.md` - 编码规范和约束
3. `.ai/DECISIONS.md` - 已做的战略决策
4. `.ai/CONTENT_PLAYBOOK.md` - 内容创作指南
5. `lib/blog.ts` - 所有文章的元数据（SSOT）

### 🎯 当前状态

**项目阶段：** Profit-First（盈利优先）- 停止复杂系统建设，专注流量和变现

**最新重点：**
- SEO 焦点：AEO（Answer Engine Optimization）+ 长尾故障关键词
- 当前流量策略：抓住"OpenClaw slow"、"CUDA OOM"等痛点搜索
- 变现路径：VPS 联盟链接（DigitalOcean 等）
- 标题策略：点击诱饵优化（提升 US CTR）

### 📊 内容现状

**已发布文章（5 篇）：**
1. `openclaw-security-rce-cve-2026-25253` - **Featured** - RCE 漏洞警告（含 VPS 推荐）
2. `how-to-use-deepseek-with-openclaw` - DeepSeek R1 部署教程（实战测试）
3. `fix-openclaw-json-mode-errors` - JSON 解析错误修复（DeepSeek thinking tags 问题）
4. `fix-openclaw-cuda-oom-errors` - CUDA OOM 错误修复（点击诱饵标题）
5. `fix-openclaw-slow-inference` - 推理速度慢问题（新增，针对 #6 排名关键词）

**内容位置：**
- MDX 源文件：`content/posts/*.mdx`
- 元数据配置：`lib/blog.ts`（添加新文章必须更新这里）
- 视频脚本：`assets/video_scripts/*.txt`（非技术用户录制用）

### 🛠️ 技术栈

```
Next.js 16.1.6 (App Router)
React 19.2.4
Tailwind CSS 3.4.17
MDX + gray-matter + remark
```

### 📁 关键目录结构

```
app/
├── guides/[slug]/page.tsx    # 动态文章页
├── layout.tsx                 # 根布局
├── page.tsx                   # 首页（硬编码 featured post）
├── globals.css                # 全局样式
├── robots.ts                  # robots.txt 生成器
├── sitemap.ts                 # sitemap.xml 生成器
└── icon.tsx                   # favicon 生成器

components/
├── features/                  # 功能组件（Hero, Footer, Navigation）
├── ui/                        # 基础组件（Button, Input）
└── SEO/                       # Schema 组件

lib/
├── blog.ts                    # 文章元数据（SSOT）
└── site-config.ts             # 站点配置（导航、页脚链接）

content/posts/                 # MDX 文章源文件
public/                        # 静态资源
```

### 🔴 重要规则（CRITICAL）

1. **添加新文章的步骤：**
   ```bash
   1. 创建 content/posts/your-slug.mdx
   2. 在 lib/blog.ts 添加元数据
   3. 运行 npm run validate 验证
   ```

2. **URL 规则：**
   - 文章路径前缀：`/guides`（不是 `/blog`）
   - 使用 `canonicalPath` 不要硬编码路径

3. **样式规范：**
   - 只用语义化变量：`bg-background`, `text-primary`
   - 图标用 Lucide React
   - 深色主题，橙色品牌色 `#FF4500`

4. **SEO 规则：**
   - 所有文章页要有 Breadcrumb Schema
   - 使用 `generateMetadata()` 设置元数据
   - Canonical URL 必须正确

### 📈 已完成的 SEO 基建

✅ robots.txt（允许所有爬虫）
✅ sitemap.xml（动态生成，包含所有文章）
✅ Breadcrumb Schema（文章页面包屑导航）
✅ Open Graph 图片
✅ 结构化数据（FAQ, Article, WebSite, SoftwareApplication）

### 🚨 已知问题

1. **DNS 问题：** `openclaw-ai.org` 域名指向错误 IP
   - Vercel URL 正常：https://openclaw-landing.vercel.app
   - 需要在域名注册商更新 DNS 到 `cname.vercel-dns.com`

### 🎯 当前任务（按优先级）

**高优先级：**
- 创建更多安全相关内容（利用搜索趋势）
- 添加更多"如何修复"类教程
- VPS 联盟链接测试

**中优先级：**
- 修复 DNS 问题
- 添加文章目录（TOC）
- 改善移动端体验

### 📝 最近的重要决策

1. **Profit-First 转向（2026-02-03）**
   - 停止复杂系统建设
   - 专注流量获取和变现
   - 内容策略：抓住安全/漏洞类搜索趋势

2. **AEO-First 策略（2026-02-03）**
   - 针对谷歌 AI 摘要优化
   - FAQ 结构化数据
   - 直接回答式内容

3. **/guides 路由（不是 /blog）**
   - "Guides" 比 "blog" 更符合用户意图
   - 匹配 "survival guide" 主题

### 🤖 给 AI 的提示

**当你被要求：**
- ✅ 添加新文章 → 先读 `lib/blog.ts` 了解格式
- ✅ 修复样式 → 检查 `app/globals.css` 和组件
- ✅ SEO 优化 → 查看 `components/SEO/` 和 `app/sitemap.ts`
- ✅ 修改路由 → 先确认 `app/` 下对应页面是否存在

**不要：**
- ❌ 假设文件存在而不检查
- ❌ 硬编码文章路径
- ❌ 使用任意颜色值（用语义变量）
- ❌ 添加 "any" 类型

---

## 当前需要你做什么？

[在这里描述你的任务]

---

**最后确认：**
1. 你已阅读 `.ai/STATE.md` 了解技术栈
2. 你已阅读 `lib/blog.ts` 了解内容结构
3. 你知道当前是 Profit-First 阶段，优先变现

准备就绪后请回复："**已就绪**"，然后开始工作。
