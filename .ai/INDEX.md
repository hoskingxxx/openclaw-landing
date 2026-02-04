# AICP-Lite Index

**Project ID:** openclaw-ai-org
**Current Phase:** Profit-First (Traffic + Monetization)
**Last Updated:** 2026-02-04

---

## 🚨 READ ME FIRST - Current Status

### Phase: Profit-First
**目标：** 停止复杂系统建设，专注流量获取和变现

**当前策略：**
1. 抓住长尾关键词（"OpenClaw slow"、CUDA OOM、JSON 错误）
2. 通过 VPS 联盟链接变现
3. 点击诱饵标题优化（提升 US CTR）

### 最新发布内容（5 篇文章）
- **Featured:** `openclaw-security-rce-cve-2026-25253` - RCE 漏洞警告（含 VPS 推荐）
- `how-to-use-deepseek-with-openclaw` - DeepSeek R1 部署教程（实战测试）
- `fix-openclaw-json-mode-errors` - JSON 解析错误修复
- `fix-openclaw-cuda-oom-errors` - CUDA OOM 错误修复（点击诱饵标题）
- `fix-openclaw-slow-inference` - 推理速度慢问题（新增）

---

## Quick Start for New AI Assistants

### 第一步：读这 4 个文件

1. **`.ai/STATE.md`** - 技术栈、路由、内容库（SSOT - 唯一状态文件）
2. **`.ai/RULES.md`** - 编码规范和约束
3. **`.ai/DECISIONS.md`** - 已做的战略决策
4. **`lib/blog.ts`** - 所有文章的元数据

### 第二步：了解项目结构

```
Next.js 16 + React 19 + Tailwind CSS
├── app/guides/[slug]/page.tsx  # 动态文章
├── lib/blog.ts                 # 文章元数据（SSOT）
├── content/posts/*.mdx         # 文章内容
└── components/features/        # 功能组件
```

### 第三步：开始工作

根据任务类型，查看对应的文件：
- 添加文章 → 读 `lib/blog.ts` 和现有 MDX 文件
- 修复样式 → 读 `app/globals.css`
- SEO 问题 → 读 `app/robots.ts` 和 `app/sitemap.ts`

---

## Project Summary

**OpenClaw AI Survival Guide** - 帮助开发者本地运行 DeepSeek R1 避免 OOM 错误。

- **Stack:** Next.js 16, React 19, Tailwind CSS
- **Hosting:** Vercel (自动部署)
- **Content:** MDX 格式
- **Theme:** 深色主题，橙色品牌 (#FF4500)，"生存指南"风格

---

## Current Focus: Profit-First

### SEO 关键词（当前目标）
- OpenClaw RCE
- CVE-2026-25253
- OpenClaw security
- DeepSeek R1 crash
- CUDA OOM errors

### 变现路径
- VPS 联盟链接（DigitalOcean, Linode, Hetzner）
- 在安全类文章中软性推荐

### 内容策略
- 抓住突发搜索趋势（安全漏洞、错误修复）
- 直接回答式内容（AEO 优化）
- 问题 → 解决方案 → 产品推荐

---

## Key Rules (Quick Reference)

**编码规范：**
- ✅ 静态内容优先
- ✅ 深色主题，橙色品牌
- ✅ 移动端优先
- ✅ 语义化 CSS 变量
- ❌ 不用 "any" 类型
- ❌ 不硬编码路径

**内容工作流：**
1. 创建 `content/posts/your-slug.mdx`
2. 在 `lib/blog.ts` 添加元数据
3. 运行 `npm run validate`
4. 提交并推送（Vercel 自动部署）

---

## File Guide

| File | Purpose | Update When |
|------|---------|-------------|
| `STATE.md` | 技术事实 | 架构变化、新路由 |
| `RULES.md` | 核心约束 | 策略变化 |
| `DECISIONS.md` | 决策日志 | 任何战略选择 |
| `TASK_BOARD.md` | 任务列表 | 完成任务、添加新任务 |

---

## Public Context System

`public/ai.json` 和 `public/llms.txt` 是静态文件，由手动维护：

- `public/ai.json` - 机器可读的项目元数据
- `public/llms.txt` - 人类/AI 可读摘要

**注意:** `scripts/generate-context.js` 存在但仅在架构重大变更时手动运行，不是自动构建流程。

---

## Deployed URLs

| URL | Status |
|-----|--------|
| https://openclaw-landing.vercel.app | ✅ Working |
| https://openclaw-ai.org | ⚠️ DNS Issues |

---

## 给 ChatGPT/Gemini 的快速提示

复制 `.ai/HANDOFF_PROMPT.md` 的内容粘贴给他们即可。

那个文件包含了：
- 项目完整上下文
- 技术栈详情
- 关键文件位置
- 重要规则
- 当前任务
- 已知问题

---

## Need Help?

**遇到问题时：**
1. 先检查 `.ai/STATE.md` 确认文件存在
2. 参考 `.ai/RULES.md` 确认编码规范
3. 查看 `lib/blog.ts` 了解内容格式

**交接给另一个 AI：**
使用 `.ai/HANDOFF_PROMPT.md` 作为交接文档。
