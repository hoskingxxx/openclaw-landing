import Link from "next/link";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { NextStepCard } from "@/components/NextSteps";
import {
  useCases,
  comparisonTable,
  universalCommandTemplate,
  supportedChannels,
  installSteps,
} from "@/lib/content";

function PromoBanner() {
  return (
    <Link
      href="/blog/how-to-use-deepseek-with-openclaw"
      className="block relative overflow-hidden group cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 opacity-90 group-hover:opacity-100 transition-opacity" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
      <div className="relative max-w-7xl mx-auto px-3 md:px-6 py-2 md:py-4">
        <div className="flex items-center justify-center gap-2 md:gap-3">
          <span className="text-xl md:text-2xl animate-pulse"></span>
          <span className="text-white font-bold text-sm md:text-lg lg:text-xl drop-shadow-lg">
            热门教程：如何用 DeepSeek R1 零成本驱动 OpenClaw
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs md:text-sm font-medium group-hover:bg-white/30 transition-colors">
            立即查看
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <>
      <Navigation />
      <PromoBanner />
      <main>
        {/* Hero 区域 */}
        <Hero />

        {/* Quick Start: DeepSeek Configuration */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">
              Quick Start: DeepSeek Configuration
            </h2>
            <p className="text-text-secondary text-sm">
              Copy this to your <code className="bg-gray-800 px-2 py-1 rounded text-text-tertiary">.env</code> file
            </p>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-gray-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-gray-400 font-mono">.env</span>
            </div>
            <pre className="p-4 md:p-6 overflow-x-auto">
              <code className="text-sm md:text-base text-gray-100 font-mono leading-relaxed">
{`# .env configuration for OpenClaw
LLM_PROVIDER="openai"
LLM_BASE_URL="https://api.deepseek.com/v1"
LLM_API_KEY="sk-your-key"
LLM_MODEL="deepseek-reasoner" # Uses R1 Chain of Thought`}
              </code>
            </pre>
          </div>
        </section>

        {/* 对比表格区域 */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              不是更强的 ChatGPT，是全新物种
            </h2>
            <p className="text-text-secondary text-lg mb-2">
              OpenClaw 是执行型 AI，不是聊天型 AI
            </p>
            <p className="text-sm text-text-tertiary">
              原名 Clawdbot / Moltbot —— 专注于稳定执行的开源 AI Agent 框架
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full glass-card">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-text-primary">场景</th>
                  <th className="text-left p-4 text-text-secondary">ChatGPT</th>
                  <th className="text-left p-4 text-brand-primary">OpenClaw</th>
                </tr>
              </thead>
              <tbody>
                {comparisonTable.rows.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 last:border-0">
                    <td className="p-4 text-text-primary">{row.feature}</td>
                    <td className="p-4 text-text-secondary">{row.chatgpt}</td>
                    <td className="p-4 text-text-primary font-medium">{row.openclaw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 核心特点区域 */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              为什么选择 OpenClaw？
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon="⚡"
              title="执行型 AI"
              description="你给目标 → 它自己拆步骤 → 调工具 → 执行 → 汇报结果"
            />
            <FeatureCard
              icon="🔒"
              title="本地可控"
              description="部署在你自己的机器或服务器上，代码/文件不需要上传到第三方"
            />
            <FeatureCard
              icon="🎯"
              title="目标驱动"
              description="给「工作要求」不是「聊天问题」，它是执行者不是出主意的人"
            />
            <FeatureCard
              icon="🧠"
              title="有记忆"
              description="持续跟踪项目、记住中间状态、失败后重试、按规则回滚"
            />
            <FeatureCard
              icon="🤖"
              title="Agent 架构"
              description="支持单 Agent 和多 Agent 协作模式，一个分析一个执行一个校验"
            />
            <FeatureCard
              icon="🛣️"
              title="车道队列系统"
              description="独有的 Lane-based Queue 架构，任务有序执行，比 AutoGPT 更稳定，不会死循环"
            />
            <FeatureCard
              icon="🌐"
              title="多平台支持"
              description="WhatsApp、Telegram、Slack、Discord、Signal、iMessage 等 13+ 平台"
            />
          </div>
        </section>

        {/* 6 大玩法区域 */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              6 大实用玩法
            </h2>
            <p className="text-text-secondary text-lg">
              从独立开发者到创业者，从运维到内容创作，总有一款适合你
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => (
              <div
                key={useCase.id}
                className="glass-card p-6 hover:bg-white/12 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{useCase.icon}</div>
                {useCase.popular && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-brand-primary/20 text-brand-primary rounded mb-3">
                    🔥 最火
                  </span>
                )}
                {useCase.advanced && (
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-background-elevated text-text-tertiary rounded mb-3">
                    进阶
                  </span>
                )}
                <h3 className="text-xl font-semibold text-text-primary mb-2">{useCase.title}</h3>
                <p className="text-sm text-text-secondary mb-4">{useCase.description}</p>
                <div className="text-xs text-text-tertiary mb-3">
                  适合：{useCase.audience.join("、")}
                </div>
                <CodeBlock title="示例指令" code={useCase.exampleCommand} />
              </div>
            ))}
          </div>
        </section>

        {/* 快速开始区域 */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              快速开始
            </h2>
            <p className="text-text-secondary text-lg">
              只需 3 步，5 分钟即可部署你的 AI 员工
            </p>
          </div>

          <div className="space-y-6">
            {installSteps.map((step, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{step.title}</h3>
                    <p className="text-sm text-text-secondary">{step.description}</p>
                  </div>
                </div>
                <CodeBlock code={Object.values(step.commands).join("\n")} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/quick-start"
              className="inline-block text-brand-primary hover:text-brand-hover transition-colors"
            >
              查看完整安装指南 →
            </Link>
          </div>
        </section>

        {/* 万能指令模板区域 */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              万能指令模板
            </h2>
            <p className="text-text-secondary text-lg">
              让 OpenClaw 成功率暴涨的秘诀
            </p>
          </div>

          <div className="glass-card p-8">
            <CodeBlock code={universalCommandTemplate} />
            <p className="text-sm text-text-tertiary mt-4">
              💡 这会让 OpenClaw 成功率暴涨。复制后直接发送给 OpenClaw 即可执行。
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/command-builder"
              className="inline-block px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white font-medium rounded-lg transition-colors"
            >
              使用指令生成器 →
            </Link>
          </div>
        </section>

        {/* 下一步推荐 */}
        <section className="max-w-4xl mx-auto px-6">
          <NextStepCard
            icon="🚀"
            title="开始你的 OpenClaw 之旅"
            description="查看快速开始指南，5 分钟即可完成部署并开始使用。"
            href="/quick-start"
            linkText="查看快速开始指南"
          />
        </section>
      </main>

      <Footer />
    </>
  );
}
