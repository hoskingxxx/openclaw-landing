# PRD：OpenClaw AI（openclaw-AI.org）MVP 需求文档

> 目标：先占“openclaw”关键词生态位（流量位），用一个信息完整、审美在线、强转化的落地页快速上线；同时打通 Waitlist（邮箱收集）与埋点，后续无痛迭代到可试用版本。

---

## 0. 背景与目标

### 背景
- 已购买域名：`openclaw-AI.org`
- 产品方向：No-code / Low-code 网页数据提取（抓取→结构化→导出）
- 当前阶段：新手快站策略（先 Landing Page 占位 → 再迭代核心功能）

### 业务目标（Phase 1 必须达成）
1. **上线一个高审美、信息完整、转化导向强的静态落地页**
2. **实现转化闭环**：用户提交邮箱加入 Waitlist
3. **可观测**：埋点可查看访问、点击、提交转化
4. **为 Phase 2 预留扩展位**：可接入真实 Extract API（不改整体结构）

### 非目标（Phase 1 不做）
- 不做复杂抓取规则编辑器
- 不做账号体系/登录
- 不做支付/订阅
- 不做“任意网站通用抓取”的完整能力（Phase 2+ 再迭代）

---

## 1. 用户画像与使用场景

### 核心用户
- 内容运营 / 增长 / 市场：抓列表、竞品信息、素材库
- 创业者 / 独立开发者：快速拉数据验证想法
- 学生 / 研究人员：抓取资料但不会写爬虫
- AI 工作流用户：需要结构化数据喂给模型/自动化

### 高频场景（用于文案与后续迭代）
- 列表页：标题/链接/价格/评分/时间
- 文章页：标题/作者/发布时间/摘要/链接
- 商品页：标题/价格/卖点/图片链接

---

## 2. 产品定位（文案必须体现）

### One-liner（What is）
- 中文：**OpenClaw AI：一键从任意网页抓取结构化数据（无需代码）。**
- 英文：**Paste a link → Extract → Get clean CSV/JSON. No code.**

### Why（价值主张）
- 省时间：替代手动复制粘贴
- 降门槛：非技术用户也能用
- 输出可用：CSV/JSON 直接进入表格、Notion、自动化、AI 工作流

### How to（傻瓜式步骤）
1. 粘贴 URL
2. 点击 Extract
3. 导出 CSV/JSON 或复制结果

---

## 3. 功能范围（MVP）

## Phase 1：静态落地页 + Waitlist + 埋点（必须交付）

### 3.1 Landing Page（单页）
**必须包含以下模块：**
- **Above-the-Fold（首屏）**
  - H1：一句话定义（What is）
  - 副标题：补充价值（Why）
  - 主 CTA：`Join Waitlist / 免费加入等候名单`
  - 信任标签（3~5个）：`10秒上手 / 无需代码 / CSV/JSON / Early access`
- **What is**
- **Why**
- **How to use（3 steps）**
- **Demo 区块**
  - 截图位（UI screenshot placeholder）
  - 视频位（30 秒 demo placeholder）
- **FAQ（4~6 条）**
- **Waitlist 表单（Email + CTA）**
- Footer（版权、隐私政策入口占位）

**设计要求：**
- 风格：科技感 / Linear 风 / 暗色渐变（审美在线）
- 移动端适配必须良好（无横向滚动）
- 首屏加载尽量快：避免大图；图片懒加载
- CTA 全站主推 1 个目标：加入 Waitlist（最多出现 3 次）

---

### 3.2 Waitlist 表单（转化闭环）
**行为：**
- 输入邮箱 → 点击加入
- 前端校验邮箱格式
- 成功提示：加入成功（告知后续会发邀请）
- 失败提示：网络错误/重复邮箱等

**存储字段（最小集）：**
- `email`（string, required, unique 推荐）
- `created_at`（timestamp）
- `utm_source`（string, optional）
- `utm_medium`（string, optional）
- `utm_campaign`（string, optional）
- `referrer`（string, optional）
- `page_path`（string, optional）
- `user_agent`（string, optional）

> 存储方案建议（任选一种实现）：  
> A) Supabase（推荐）  
> B) Google Sheet（最快）  
> C) Serverless + KV/DB（更灵活）

---

### 3.3 埋点（可观测）
**必须埋的事件：**
- `page_view`
- `click_primary_cta`（首屏 CTA）
- `click_demo`（点击 demo/观看视频）
- `submit_waitlist_success`
- `submit_waitlist_error`

**工具建议（任选一种）：**
- Plausible / Umami / GA4（优先轻量）

---

## Phase 2：可试用 Extract（后续迭代，不阻塞上线）

### 3.4 Try Extract（极简可试用）
- 输入 URL（先支持 1~2 个模板页面类型即可）
- 返回结构化结果：
  - JSON 文本
  - 表格预览
- 导出 CSV（前端生成即可）
- 明确 Early Access 限制说明（告诉用户逐步扩展）

---

## 4. 信息架构与交互

### 页面结构（建议顺序）
1. Hero（标题/价值/CTA/信任标签）
2. Demo（截图 + 视频）
3. Why（价值卡片）
4. How（3 步）
5. Use cases（面向人群/场景）
6. FAQ
7. Waitlist（强转化）
8. Footer

### CTA 规则
- 主 CTA：`加入等候名单`（唯一核心目标）
- Secondary CTA：`看演示`（可选）
- 每个关键模块结尾可出现 CTA，但全页不超过 3 次

---

## 5. 内容与素材需求

### 必备素材（优先级）
1. 产品 UI 截图（mock 也可）
2. 30 秒 Demo 视频（录屏即可，不需要露脸）
3. Logo（可先用几何 icon + OpenClaw AI 字样）

### 30 秒 Demo 视频脚本（建议）
- 0–5s：打开 openclaw-AI.org（展示一句话定位）
- 5–15s：粘贴 URL → 点击 Extract
- 15–25s：展示表格 + JSON 输出
- 25–30s：导出 CSV/Copy JSON → CTA（Join waitlist）

---

## 6. 技术实现要求（给 Claude Code）

### 6.1 技术栈建议（轻量、易部署）
- Frontend：纯 HTML/CSS/JS（或 Next.js 静态导出）
- 部署：Vercel / Cloudflare Pages / Netlify
- Waitlist 存储（任选其一）：
  - Supabase：表 + serverless API 写入
  - Google Sheet：脚本/API 写入

### 6.2 必须交付物
- `index.html`（或 Next.js 项目结构）
- `assets/`（图片/视频占位或样例）
- `README.md`
  - 本地预览方法
  - 部署步骤
  - 环境变量配置（若有后端）
  - 如何替换截图/视频/文案

### 6.3 质量要求（验收指标）
- Lighthouse：Performance 80+（尽量）
- 移动端无横向滚动、按钮可点、字体可读
- Waitlist 提交成功/失败提示明确
- UTM/referrer 可记录
- 埋点事件可在分析工具看到

---

## 7. 验收清单（你验收 Claude 输出用）

### 页面层
- [ ] 首屏 10 秒能看懂：是什么/为什么/怎么开始
- [ ] 主 CTA 清晰醒目（不超过 2 个按钮）
- [ ] What / Why / How 结构完整
- [ ] Demo 区块存在（截图位+视频位）
- [ ] FAQ 有真实感
- [ ] 移动端适配正常（无横向滚动）

### 转化闭环
- [ ] Email 可提交成功并存储
- [ ] 重复邮箱有提示（或可覆盖）
- [ ] UTM/referrer 记录成功

### 数据可观测
- [ ] page_view、cta_click、submit_success、submit_error 可追踪
- [ ] 可查看转化率（提交 / 访问）

---

## 8. Claude Code 开发任务拆分（可直接执行）

### Task A：生成高审美 Landing Page
- 输出单页：Hero / Demo / Why / How / FAQ / Waitlist / Footer
- 暗色科技风（Linear 风格）
- 响应式 + 轻微动效
- 保留截图与视频替换位（明确注释）

### Task B：实现 Waitlist 存储（任选一种）
- 方案 1：Supabase（推荐）
  - 创建表 `waitlist`
  - 提供 `POST /api/waitlist` 写入
- 方案 2：Google Sheet
  - 提供写入脚本/API 与配置说明

### Task C：接入埋点
- 接入 Umami/Plausible/GA4
- 事件：page_view、click_primary_cta、click_demo、submit_success、submit_error

### Task D：输出部署与替换指南
- README：本地预览、部署、配置、替换素材与文案

---

## 9. 一句话总目标（写在 Claude Code 的第一行）
> 在最短时间内把 openclaw-AI.org 上线成一个可转化的高审美 Landing Page，并打通邮箱收集 + 埋点，用于抢占 openclaw 关键词生态位。
