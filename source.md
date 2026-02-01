# OpenClaw - 让 AI 不再只会聊天，而是真正替你干活

> OpenClaw 是开源 AI Bot 框架，让 AI 真正替你干活。OpenClaw bot 可通过自然语言在你的电脑执行文件管理、内容创作、自动化部署等真实任务。支持 OpenAI、Claude，10 分钟 openclaw install 快速上手。

---

## 什么是 OpenClaw Bot？

### 项目简介

OpenClaw Bot 是一个开源的 AI Agent 框架，让 AI 不再只会聊天，而是真正替你干活。它能够：

- 通过自然语言指令执行真实任务
- 在你的本地电脑上运行
- 支持文件管理、内容创作、自动化部署等任务
- 支持 OpenAI、Claude 等多种 AI 模型

### 项目名称的演进

- **Moltbot** - 项目初期名称
- **ClawDBot** - 中期名称
- **OpenClaw** - 当前正式名称

### 和传统 AI 的本质区别

| 传统 AI (ChatGPT/Claude) | OpenClaw Bot |
|-------------------------|--------------|
| 只会聊天对话 | 能执行真实任务 |
| 需要人工复制粘贴结果 | 自动化完成工作流 |
| 没有长期记忆 | 有持久化记忆能力 |
| 无法访问本地文件 | 可直接操作本地文件系统 |
| 每次对话都是新的开始 | 能记住之前的上下文 |

---

## AI Bot 的核心特点

### 目标导向
OpenClaw Bot 不是被动回答问题，而是主动完成目标。你只需要告诉它"我要什么"，它会自己规划步骤并执行。

### 有手有脚
与只能聊天的 AI 不同，OpenClaw Bot 拥有：
- 文件操作能力（读取、写入、移动、删除）
- 命令执行能力（运行脚本、调用工具）
- 网络访问能力（请求 API、抓取数据）

### 长期记忆
Bot 可以记住之前的对话和操作历史，形成持续的知识积累，让后续交互更加智能高效。

### 高度可控
- 开源透明，所有代码可审查
- 可自定义限制权限范围
- 可查看每一步操作日志

### 模型灵活
支持多种 AI 模型后端：
- OpenAI (GPT-4, GPT-3.5)
- Anthropic Claude
- 本地模型 (Ollama)
- 其他兼容 API

### 开源透明
- 完全开源，代码公开
- 社区驱动，持续迭代
- 可自部署，数据隐私可控

---

## Install 指南：10分钟快速上手

### 准备环境

**系统要求：**
- macOS / Linux / Windows (WSL)
- Node.js 18+
- Python 3.8+ (可选)
- Git

**AI API Key (二选一)：**
- OpenAI API Key
- Anthropic API Key

### OpenClaw Install: 安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/openclaw-ai/openclaw.git
cd openclaw

# 2. 安装依赖
npm install

# 3. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入你的 API Key

# 4. 启动 Bot
npm start
```

### 配置与初始化

**环境变量配置：**
```bash
# .env 文件内容
OPENAI_API_KEY=sk-xxx          # OpenAI API Key
ANTHROPIC_API_KEY=sk-ant-xxx   # Claude API Key
BOT_NAME=my-bot                # Bot 名称
LOG_LEVEL=info                 # 日志级别
```

### 开始使用

启动后，你可以通过以下方式与 Bot 交互：

1. **命令行模式**：直接在终端输入指令
2. **Telegram 集成**：通过 Telegram Bot 对话
3. **Web 界面**：访问本地 Web UI

---

## 6 大核心玩法

### 1. AI 智能文件管家

**场景描述：**
让 AI 帮你整理下载文件夹、归类文档、清理重复文件。

**指令示例：**
```
帮我把下载文件夹中的所有 PDF 文档移动到 Documents/PDFs 目录，
按月份创建子文件夹进行分类
```

**效果：**
- 自动识别文件类型
- 按规则创建目录结构
- 批量移动文件

---

### 2. AI 内容创作助手

**场景描述：**
让 AI 帮你批量生成内容、优化文章、创建营销文案。

**指令示例：**
```
根据 products.csv 中的商品信息，
为每个商品生成 3 条社交媒体推广文案，
保存到 marketing_copy/ 目录
```

**效果：**
- 读取数据源
- 批量生成内容
- 按规则保存输出

---

### 3. AI 产品实现助手

**场景描述：**
让 AI 帮你从 0 到 1 实现一个小型产品或功能。

**指令示例：**
```
创建一个待办事项 CLI 工具，
支持添加、删除、列表功能，
使用 Node.js 实现
```

**效果：**
- 生成项目结构
- 编写功能代码
- 测试运行

---

### 4. AI 智能调研助理

**场景描述：**
让 AI 帮你收集信息、整理资料、生成报告。

**指令示例：**
```
调研 "AI Agent 工具" 这个主题，
收集 10 篇相关文章并生成摘要报告
```

**效果：**
- 搜索相关信息
- 提取关键内容
- 生成结构化报告

---

### 5. AI 智能监控助手

**场景描述：**
让 AI 定期检查某些状态并通知你。

**指令示例：**
```
每 30 分钟检查一次服务器状态，
如果响应时间超过 1 秒就发送 Telegram 通知
```

**效果：**
- 定时执行检查
- 判断条件
- 发送通知

---

### 6. AI 万能执行助理

**场景描述：**
任何可以通过命令行或脚本完成的任务，都可以交给 OpenClaw Bot。

**指令示例：**
```
备份我的 Documents 文件夹到 Google Drive，
删除 30 天前的本地备份
```

**效果：**
- 执行备份命令
- 清理旧文件
- 完成工作流

---

## 通用指令模板

### 📋 通用指令模板

```
[任务目标] + [操作对象] + [具体要求] + [输出格式]
```

**示例结构：**
```
帮我在 [目录/文件/URL] 中 [操作类型]，
要求 [具体条件/规则]，
结果保存到 [输出位置]
```

### 🎯 模板使用示例

**文件整理任务：**
```
帮我在 ~/Downloads 中找出所有 .jpg 和 .png 图片，
按拍摄日期分类到 Photos/YYYY/MM/ 目录
```

**内容创作任务：**
```
根据 articles.txt 中的标题列表，
为每篇标题生成 200 字的简介，
输出到 summaries.md
```

**开发任务：**
```
创建一个 Python 脚本，
监控指定目录的文件变化并记录到日志
```

**调研任务：**
```
搜索 "Web3 AI Agent" 相关信息，
整理成 Markdown 报告，包含 10 个代表性项目
```

### 💡 专业提示

1. **明确目标**：清楚说明你想要什么结果
2. **提供上下文**：让 Bot 了解任务的背景信息
3. **指定格式**：告诉 Bot 你期望的输出格式
4. **设置限制**：明确权限范围和安全边界

---

## 核心优势

### 从对话到执行的跨越

传统 AI 只能"说"，OpenClaw Bot 能"做"。它将自然语言指令转化为实际的系统操作，真正实现 AI 的实用价值。

### 自然语言驱动的自动化

无需学习编程或复杂的自动化工具，用日常语言就能描述任务，Bot 自动理解和执行。

### 真正的长期协作能力

Bot 记住你的偏好、历史操作和上下文，随着使用时间增加，它会越来越懂你的需求。

### 开源透明与完全掌控

- 所有代码开源，可自由审查和修改
- 本地部署，数据隐私完全可控
- 不依赖第三方黑盒服务

### 适合被展示和传播

Bot 的操作过程可记录、可回放、可分享，适合制作演示视频和教学内容。

### 个体生产力的放大器

对于创业者、独立开发者、内容创作者等，OpenClaw Bot 相当于拥有一个随时待命的虚拟助理。

---

## 用户真实评价

> "作为一个独立开发者，OpenClaw 让我像拥有了一个团队一样。
以前需要半天的工作，现在 10 分钟就搞定了。"
> — 独立开发者 @techfounder

> "我不会写代码，但用 OpenClaw 管理文件、整理资料完全没问题。
就像和一个很聪明的助理对话一样自然。"
> — 市场运营 @sarah_marketing

> "开源这点太重要了。我可以看懂它在做什么，
也能自定义限制，不用担心隐私问题。"
> — 产品经理 @pm_productivity

---

## 谁最适合使用它

### 创业者 / 一人公司

你需要同时处理多个领域的任务，OpenClaw Bot 是你的"万能助理"：
- 市场调研
- 内容创作
- 数据整理
- 简单开发任务

### 懂一点技术的用户

如果你熟悉基本的命令行操作，OpenClaw Bot 可以让你：
- 用自然语言编写脚本
- 自动化重复工作
- 快速原型开发

### PM / 管理型人格

你需要规划和协调，但不一定亲力亲为：
- 让 Bot 执行具体任务
- 你专注于决策和方向
- 工作流自动化

### 想要放大能力的所有人

无论你的职业是什么，只要你有：
- 重复性工作需要自动化
- 想学习 AI 但不会编程
- 需要一个"数字助理"

OpenClaw Bot 都适合你。

---

## 不可替代的 3 个核心场景

### 场景 1：长期执行型 AI 助理

**描述：**
Bot 不是一次性完成任务，而是作为长期助理，持续为你服务。

**为什么不可替代：**
- 传统 AI 每次对话都是新的开始
- OpenClaw Bot 有记忆，可以记住你的偏好和历史
- 越用越聪明，形成个性化工作流

**适用任务：**
- 每日文件整理
- 定期数据备份
- 持续内容创作

---

### 场景 2：非技术用户的自动化入口

**描述：**
不会编程的人也能使用 AI 自动化完成复杂任务。

**为什么不可替代：**
- 传统自动化工具需要学习编程语法
- OpenClaw Bot 用自然语言就能描述任务
- 降低自动化门槛，让更多人受益

**适用任务：**
- 批量重命名文件
- 格式转换
- 数据整理

---

### 场景 3：创业者的执行放大器

**描述：**
一个人也能像团队一样高效运作。

**为什么不可替代：**
- 创业者资源有限，需要兼顾多领域
- OpenClaw Bot 相当于"免费助理"
- 10 倍放大个人生产力

**适用任务：**
- 市场调研
- 竞品分析
- 内容生产
- 简单开发

---

## 使用建议与最佳实践

### 从小任务开始

**建议：**
刚开始使用时，选择简单的、低风险的任务：
- 文件整理
- 文档格式转换
- 简单内容生成

**原因：**
- 建立 Bot 与你的信任关系
- 了解 Bot 的能力边界
- 逐步熟悉指令模式

---

### 明确任务目标

**好的指令：**
```
把 Downloads 文件夹中所有 PDF 按月份分类到 Documents/PDFs/YYYY-MM/ 目录
```

**不好的指令：**
```
整理一下我的文件
```

**建议：**
- 明确操作对象
- 指定输出位置
- 说明具体规则

---

### 合理设置权限

**安全建议：**
- 在测试阶段，限制 Bot 的文件访问范围
- 使用沙箱环境或测试目录
- 逐步放开权限

**环境变量配置：**
```bash
ALLOWED_PATHS=/home/user/documents,/home/user/downloads
DENY_COMMANDS=rm,format,shutdown
```

---

### 记录与追踪

**查看 Bot 操作日志：**
```bash
# 查看最近的操作记录
npm run logs

# 导出操作历史
npm run export-logs
```

**好处：**
- 了解 Bot 做了什么
- 发现问题时可以追溯
- 优化指令模式

---

### 新手避坑指南

1. **不要让 Bot 删除重要文件**
   - 先在测试目录验证
   - 使用 mv 而不是 rm（移动到回收站）

2. **复杂任务分步骤执行**
   - 将大任务拆成小步骤
   - 每步确认结果后再继续

3. **注意 API 费用**
   - 使用本地模型可以节省成本
   - 设置合理的 Token 限制

4. **定期备份重要数据**
   - 虽然 Bot 很智能，但备份是好习惯

---

## 视频演示资源

### Getting Started（入门教程）

- OpenClaw 安装完整指南
- 配置第一个 Bot
- 发送你的第一个指令

### Viral Demos / 框架能力展示

- "我用 AI 自动整理了 10000 个文件"
- "10 分钟搭建 AI 内容创作系统"
- "OpenClaw vs ChatGPT：真实任务对比"

### Advanced / Agent Concepts

- Agent 长期记忆机制
- 自定义 Skills 开发
- 多 Agent 协作模式

### 🔍 搜索更多视频资源

直接搜索链接：
- YouTube: "OpenClaw AI"
- Bilibili: "OpenClaw 教程"

### 💡 温馨提示

视频资源持续更新中，建议订阅官方频道获取最新内容。

---

## 安全与隐私

### 常见安全风险

1. **文件操作风险**
   - Bot 可能误删重要文件
   - 建议：限制访问范围，使用测试目录

2. **命令执行风险**
   - 恶意指令可能执行危险操作
   - 建议：设置命令白名单/黑名单

3. **API Key 泄露风险**
   - .env 文件可能被意外提交
   - 建议：添加到 .gitignore

---

### 安全最佳实践

1. **最小权限原则**
   - 只授予完成任务所需的最小权限
   - 限制文件访问路径

2. **沙箱环境**
   - 使用 Docker 容器运行 Bot
   - 隔离网络和文件系统

3. **日志审计**
   - 记录所有操作日志
   - 定期审查异常行为

4. **定期更新**
   - 及时更新到最新版本
   - 关注安全公告

---

### 数据隐私说明

**本地部署模式：**
- 所有数据在本地处理
- 不上传到第三方服务器
- 完全掌控数据流向

**云部署模式：**
- 注意查看隐私政策
- 选择可信的云服务商
- 加密敏感数据

---

### 🔒 安全检查清单

- [ ] .env 文件已添加到 .gitignore
- [ ] 限制了 Bot 的文件访问范围
- [ ] 配置了命令黑名单
- [ ] 启用了操作日志记录
- [ ] 定期备份重要数据
- [ ] 使用 Docker 隔离环境（可选）

---

## 常见问题 FAQ

### 它是什么？

OpenClaw 是一个开源的 AI Agent 框架，让 AI 不再只会聊天，而是真正替你干活。它可以在你的电脑上执行文件管理、内容创作、自动化部署等真实任务。

---

### OpenClaw 和 ChatGPT 有什么区别？

| ChatGPT | OpenClaw Bot |
|---------|--------------|
| 只能对话聊天 | 能执行真实任务 |
| 无法操作文件系统 | 可直接操作本地文件 |
| 每次对话都是新的 | 有长期记忆 |
| 需要人工复制结果 | 自动化完成工作流 |

---

### 不会写代码能用 OpenClaw 吗？

完全可以！OpenClaw 的设计理念就是让非技术用户也能用 AI 自动化完成任务。你只需要用自然语言描述任务，Bot 会自动理解和执行。

---

### OpenClaw 一般用来干什么？

- 文件整理和归类
- 批量内容生成
- 数据处理和转换
- 自动化工作流
- 简单的开发任务
- 市场调研和信息收集

---

### 我需要一直盯着它吗？

不需要。OpenClaw Bot 可以在后台运行，按照你的指令自动执行任务。你可以在任何时候查看操作日志或发送新指令。

---

### OpenClaw 适合谁？

- 创业者/独立开发者
- 懂一点技术的用户
- PM/管理者
- 任何想要提升效率的人

---

### 数据会上传到哪里？隐私安全吗？

**本地部署模式：** 所有数据都在你的电脑上处理，不会上传到第三方服务器。

**云部署模式：** 会根据你选择的云服务商处理数据。建议查看隐私政策或使用本地部署。

---

### 如何快速开始使用？

```bash
git clone https://github.com/openclaw-ai/openclaw.git
cd openclaw
npm install
cp .env.example .env
# 编辑 .env 填入 API Key
npm start
```

---

### OpenClaw 有哪些特色功能？

- 自然语言指令执行
- 长期记忆能力
- 多模型支持（OpenAI/Claude/Ollama）
- Telegram 集成
- 自定义 Skills
- 完全开源

---

### 如何开始使用 OpenClaw？

1. 准备环境（Node.js 18+）
2. 克隆项目并安装依赖
3. 配置 API Key
4. 启动 Bot
5. 发送你的第一个指令

---

### OpenClaw 是 AutoGPT 换皮吗？

不是。虽然两者都是 AI Agent 框架，但 OpenClaw：

- 更注重实用性而非实验性
- 设计更简单、更容易上手
- 针对个人使用场景优化
- 有更强的长期记忆能力

---

### OpenClaw 会自己"觉醒"或乱来吗？

不会。OpenClaw Bot：

- 只执行你明确授权的任务
- 所有操作都有日志记录
- 可以设置权限边界
- 不会自主行动

---

### OpenClaw 能替代程序员/助理吗？

不能完全替代，但可以作为辅助工具：

- 处理重复性任务
- 快速原型开发
- 自动化工作流
- 提升个人效率

---

### 它安全吗？

OpenClaw 是开源的，所有代码都可以审查。安全取决于你如何配置：

- 限制文件访问范围
- 设置命令黑名单
- 使用沙箱环境
- 定期查看操作日志

---

### 哪些需求其实不适合用 OpenClaw？

- 需要高度创意和判断的任务
- 涉及敏感数据的操作（建议谨慎）
- 实时性要求极高的场景
- 已经有专门工具的高复杂度任务

---

### 用 OpenClaw 和雇人相比成本差在哪？

| OpenClaw | 雇人 |
|----------|------|
| 一次性成本（API 费用） | 持续性人力成本 |
| 随时可用，无需沟通 | 需要培训和沟通 |
| 可并行处理多任务 | 单线程工作 |
| 无需管理 | 需要管理和监督 |

---

### OpenClaw、clawdbot 和 Moltbot 有什么区别？

这三个是同一个项目的不同名称：

- **Moltbot** - 项目初期的内部名称
- **ClawDBot** - 中期使用的名称
- **OpenClaw** - 当前正式名称

目前统一使用 **OpenClaw**。

---

### 我应该搜索 clawdbot 还是 Moltbot？

建议直接搜索 **"OpenClaw"** 或 **"OpenClaw AI"**。

---

### OpenClaw bot 和普通聊天机器人有什么区别？

普通聊天机器人只能对话，OpenClaw Bot 能执行真实任务：

- 操作文件系统
- 运行命令和脚本
- 访问网络 API
- 自动化工作流

---

### 我应该搜索 clawdbot、Moltbot 还是项目名称？

建议搜索 **"OpenClaw AI"** 或 **"openclaw"**，这是当前正式的项目名称。

---

### 安装 OpenClaw 需要什么准备？

1. **系统要求：** macOS/Linux/Windows (WSL)
2. **Node.js 18+**
3. **AI API Key**（OpenAI 或 Anthropic）
4. **Git**（用于克隆项目）

---

### moltbot 和 openclaw 的关系？

Moltbot 是 OpenClaw 项目的前身名称。项目在发展过程中更名为 OpenClaw，目前统一使用 OpenClaw 这个名称。

---

### openclaw docker 如何部署？

```bash
# 拉取镜像
docker pull openclaw-ai/openclaw:latest

# 运行容器
docker run -d \
  -e OPENAI_API_KEY=sk-xxx \
  -v ~/data:/app/data \
  openclaw-ai/openclaw:latest
```

---

### OpenClaw 支持 gemini 吗？

目前主要支持 OpenAI 和 Anthropic Claude。Gemini 支持正在开发中，敬请期待。

---

### 如何配置 openclaw gateway？

在 `.env` 文件中配置：

```bash
# 使用 OpenAI
OPENAI_API_KEY=sk-xxx
OPENAI_BASE_URL=https://api.openai.com/v1

# 使用代理网关
OPENAI_BASE_URL=https://your-gateway.com/v1
```

---

### openclaw telegram 如何集成？

1. 创建 Telegram Bot（通过 BotFather）
2. 获取 Bot Token
3. 在 `.env` 中配置：
```bash
TELEGRAM_BOT_TOKEN=your-bot-token
TELEGRAM_ENABLED=true
```
4. 启动 Bot

---

### ollama openclaw 本地部署方法？

```bash
# 安装 Ollama
curl -fsSL https://ollama.com/install.sh | sh

# 拉取模型
ollama pull llama2

# 配置 OpenClaw 使用 Ollama
# 在 .env 中：
OLLAMA_ENABLED=true
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

---

### How to use OpenClaw？

1. Install: `npm install openclaw`
2. Configure: Set up your API key in `.env`
3. Start: `npm start`
4. Send commands in natural language

---

### OpenClaw 有哪些 AI Skills？

Skills 是 Bot 的可扩展能力模块：

- **文件操作**：读取、写入、移动、删除
- **命令执行**：运行 shell 命令
- **网络请求**：HTTP API 调用
- **数据处理**：解析、转换、格式化
- **内容生成**：文本、代码生成

你可以自定义开发自己的 Skills。

---

### OpenClaw Reddit 社区有讨论吗？

是的！你可以在以下社区参与讨论：

- Reddit: r/openclaw
- GitHub Discussions
- Discord 社区

---

### OpenClaw 配置需要哪些步骤？

1. 复制 `.env.example` 到 `.env`
2. 填入 API Key（OpenAI 或 Anthropic）
3. （可选）配置 Telegram Bot
4. （可选）设置权限范围
5. 启动 Bot

---

**OpenClaw — 让 AI 不再只会聊天，而是真正替你干活**

---

## 页脚信息

© 2025 OpenClaw AI · 开源自托管 AI Agent
