import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "资源推荐 - OpenClaw 最佳 VPS、API 和工具",
  description: "精选运行 OpenClaw 的最佳硬件、VPS、API 服务和工具推荐。帮你快速搭建高性价比的本地 AI 员工环境。",
  openGraph: {
    title: "资源推荐 - OpenClaw 最佳 VPS、API 和工具",
    description: "精选运行 OpenClaw 的最佳硬件、VPS、API 服务和工具推荐。",
    url: "https://openclaw-ai.org/resources",
  },
};

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* 面包屑 */}
        <div className="max-w-7xl mx-auto px-6 pt-8">
          <Breadcrumbs items={[{ label: "资源推荐", href: "/resources" }]} />
        </div>

        {/* 页面标题 */}
        <section className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            资源推荐
          </h1>
          <p className="text-xl text-text-secondary mb-2">
            精选运行 OpenClaw 的最佳工具和服务
          </p>
          <p className="text-sm text-text-tertiary">
            部分链接包含返利，购买后支持本站持续运营 🙏
          </p>
        </section>

        {/* VPS 推荐 */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">☁️</span>
            <h2 className="text-2xl font-bold text-text-primary">VPS 服务器推荐</h2>
            <span className="px-2 py-1 text-xs bg-brand-primary/20 text-brand-primary rounded">
              24 小时挂机首选
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* VPS 卡片 1 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    Vultr High Frequency
                  </h3>
                  <p className="text-sm text-text-tertiary">全球最快云服务器</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                  推荐
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ $5/月起，按小时计费</li>
                <li>✅ 3.7GHz CPU，性能极佳</li>
                <li>✅ 全球 25+ 数据中心</li>
                <li>✅ 1Gbps 网络，上传下载不限速</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$5</span>
                  <span className="text-sm text-text-secondary">/月起</span>
                </div>
                {/* TODO: 替换为 Affiliate 链接 */}
                <a
                  href="https://www.vultr.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
                >
                  查看优惠
                </a>
              </div>

              <p className="text-xs text-text-tertiary mt-3">
                🔥 新用户送 $100 额度
              </p>
            </div>

            {/* VPS 卡片 2 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    DigitalOcean
                  </h3>
                  <p className="text-sm text-text-tertiary">开发者首选</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ $4/月起，简单透明</li>
                <li>✅ 一键部署 OpenClaw</li>
                <li>✅ 社区教程丰富</li>
                <li>✅ 稳定可靠，运行多年</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$4</span>
                  <span className="text-sm text-text-secondary">/月起</span>
                </div>
                {/* TODO: 替换为 Affiliate 链接 */}
                <a
                  href="https://www.digitalocean.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  查看详情
                </a>
              </div>
            </div>

            {/* VPS 卡片 3 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    Contabo
                  </h3>
                  <p className="text-sm text-text-tertiary">大内存首选</p>
                </div>
                <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-400 rounded">
                  高配
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ €6.99/月起，超大内存</li>
                <li>✅ 8GB RAM 起步</li>
                <li>✅ 适合运行本地 LLM</li>
                <li>✅ 德国机房，隐私保护强</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">€6.99</span>
                  <span className="text-sm text-text-secondary">/月起</span>
                </div>
                {/* TODO: 替换为 Affiliate 链接 */}
                <a
                  href="https://contabo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  查看详情
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* API 推荐 */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🔑</span>
            <h2 className="text-2xl font-bold text-text-primary">API 服务推荐</h2>
            <span className="px-2 py-1 text-xs bg-brand-primary/20 text-brand-primary rounded">
              模型调用
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* API 卡片 1 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    DeepSeek 官方
                  </h3>
                  <p className="text-sm text-text-tertiary">性价比之王</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                  推荐
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ 新用户送 500 万 tokens</li>
                <li>✅ R1 推理能力媲美 GPT-4</li>
                <li>✅ 价格只有 Claude 的 1/10</li>
                <li>✅ 支持函数调用</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">免费</span>
                  <span className="text-sm text-text-secondary">额度充足</span>
                </div>
                {/* TODO: 替换为 Affiliate 链接 */}
                <a
                  href="https://www.deepseek.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
                >
                  立即注册
                </a>
              </div>

              <p className="text-xs text-text-tertiary mt-3">
                🔥 推荐码：OPENCLAW100（额外 100 万 tokens）
              </p>
            </div>

            {/* API 卡片 2 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    APIFFFF
                  </h3>
                  <p className="text-sm text-text-tertiary">国内加速中转</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-400 rounded">
                  加速
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ 国内直连，延迟低</li>
                <li>✅ 支持多模型聚合</li>
                <li>✅ 价格透明，无隐藏费用</li>
                <li>✅ 24/7 技术支持</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">95折</span>
                  <span className="text-sm text-text-secondary">专属优惠</span>
                </div>
                {/* TODO: 替换为 Affiliate 链接 */}
                <a
                  href="#"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  查看详情
                </a>
              </div>

              <p className="text-xs text-text-tertiary mt-3">
                优惠码：OPENCLAW95
              </p>
            </div>

            {/* API 卡片 3 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    Anthropic Claude
                  </h3>
                  <p className="text-sm text-text-tertiary">最强推理能力</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ Opus 4.5 当前最强</li>
                <li>✅ 200 万 token 上下文</li>
                <li>✅ Prompt injection 抗性强</li>
                <li>✅ 适合复杂任务</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$15</span>
                  <span className="text-sm text-text-secondary">/百万 tokens</span>
                </div>
                {/* TODO: 替换为 Affiliate 链接 */}
                <a
                  href="https://www.anthropic.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  官网
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 硬件推荐 */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">💻</span>
            <h2 className="text-2xl font-bold text-text-primary">硬件推荐</h2>
            <span className="px-2 py-1 text-xs bg-brand-primary/20 text-brand-primary rounded">
              本地运行
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 硬件卡片 1 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    Mac Mini M4
                  </h3>
                  <p className="text-sm text-text-tertiary">本地 AI 最佳选择</p>
                </div>
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded">
                  推荐
                </span>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ 16GB 统一内存起</li>
                <li>✅ 静音运行，24 小时挂机</li>
                <li>✅ 功耗低，电费可忽略</li>
                <li>✅ 完美支持 Ollama + DeepSeek</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$449</span>
                  <span className="text-sm text-text-secondary">起</span>
                </div>
                {/* TODO: 替换为 Affiliate 链接 */}
                <a
                  href="https://www.apple.com/mac-mini/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white text-sm font-medium rounded-lg transition-colors"
                >
                  查看优惠
                </a>
              </div>
            </div>

            {/* 硬件卡片 2 */}
            <div className="glass-card p-6 hover:border-brand-primary/50 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-1">
                    NVIDIA 4060 Ti 16GB
                  </h3>
                  <p className="text-sm text-text-tertiary">Windows 用户首选</p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-text-secondary mb-6">
                <li>✅ 16GB 显存，跑大模型</li>
                <li>✅ 支持 CUDA 加速</li>
                <li>✅ 性价比高</li>
                <li>✅ 可运行 Llama 3 70B</li>
              </ul>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-text-primary">$320</span>
                  <span className="text-sm text-text-secondary">起</span>
                </div>
                {/* TODO: 替换为 Affiliate 链接 */}
                <a
                  href="https://www.nvidia.com/en-us/geforce/graphics-cards/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-background-tertiary hover:bg-background-elevated text-text-primary text-sm font-medium rounded-lg border border-white/10 transition-colors"
                >
                  查看详情
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 免责声明 */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="glass-card p-6 bg-background-tertiary/30">
            <h3 className="text-lg font-semibold text-text-primary mb-3">📝 免责声明</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              本页面推荐的链接部分包含返利机制。如果你通过这些链接购买，我们可能会获得少量佣金，
              这不会增加你的购买成本。所有推荐都是基于我们实际使用经验，
              我们只会推荐真正有价值的产品和服务。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
