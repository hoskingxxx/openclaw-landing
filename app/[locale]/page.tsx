import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';

// 动态导入非首屏组件 - 代码分割
// Demo 组件在首屏后显示，延迟加载
const Demo = dynamic(() => import('@/components/demo').then(mod => ({ default: mod.Demo })), {
  loading: () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse bg-muted/50 rounded-xl h-96" />
      </div>
    </section>
  ),
});

// FAQ 组件在页面底部，延迟加载
const FAQ = dynamic(() => import('@/components/faq').then(mod => ({ default: mod.FAQ })), {
  loading: () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-muted/50 rounded" />
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-muted/50 rounded" />
          ))}
        </div>
      </div>
    </section>
  ),
});

// Why 组件延迟加载
const Why = dynamic(() => import('@/components/why').then(mod => ({ default: mod.Why })), {
  loading: () => <section className="py-20"><div className="animate-pulse bg-muted/50 rounded-xl h-64 mx-auto max-w-7xl" /></section>,
});

// HowTo 组件延迟加载
const HowTo = dynamic(() => import('@/components/how-to').then(mod => ({ default: mod.HowTo })), {
  loading: () => <section className="py-20"><div className="animate-pulse bg-muted/50 rounded-xl h-64 mx-auto max-w-7xl" /></section>,
});

// UseCases 组件延迟加载
const UseCases = dynamic(() => import('@/components/use-cases').then(mod => ({ default: mod.UseCases })), {
  loading: () => <section className="py-20"><div className="animate-pulse bg-muted/50 rounded-xl h-64 mx-auto max-w-7xl" /></section>,
});

// WaitlistForm 延迟加载（在页面底部）
const WaitlistForm = dynamic(() => import('@/components/waitlist-form').then(mod => ({ default: mod.WaitlistForm })), {
  loading: () => <section className="py-20"><div className="animate-pulse bg-muted/50 rounded-xl h-32 mx-auto max-w-md" /></section>,
});

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Hot keywords for SEO
  const hotKeywords = [
    'web scraping',
    'data extraction',
    'no code',
    'CSV export',
    'JSON export',
    'web data',
    '爬虫',
    '数据提取',
    '无代码',
    '网页抓取',
    'openclaw',
    'openclaw ai',
    'AI Bot框架',
    'openclaw bot',
    'openclaw install',
    'moltbot',
    'clawdbot',
    '开源AI助手',
    'AI自动化',
  ];

  // SoftwareApplication JSON-LD
  const softwareAppData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'OpenClaw AI',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: locale === 'zh'
      ? '一键从任意网页抓取结构化数据。无需代码，10秒上手，直接导出 CSV/JSON。'
      : 'Extract structured data from any webpage. No code required. Get started in 10 seconds. Export to CSV/JSON.',
    url: 'https://openclaw-AI.org',
    inLanguage: locale,
    keywords: hotKeywords,
    author: {
      '@type': 'Organization',
      name: 'OpenClaw AI',
      url: 'https://openclaw-AI.org',
    },
    about: hotKeywords.map((keyword) => ({
      '@type': 'Thing',
      name: keyword,
    })),
    potentialAction: {
      '@type': 'UseAction',
      target: 'https://openclaw-AI.org',
    },
  };

  // Article JSON-LD
  const articleData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: locale === 'zh'
      ? 'OpenClaw AI - 一键从任意网页抓取结构化数据'
      : 'OpenClaw AI - Extract structured data from any webpage',
    description: locale === 'zh'
      ? 'OpenClaw是开源AI Bot框架，让AI真正替你干活。OpenClaw bot可通过自然语言在你的电脑执行文件管理、内容创作、自动化部署等真实任务。'
      : 'OpenClaw is an open-source AI Bot framework that lets AI truly work for you. OpenClaw bot can execute real tasks like file management, content creation, and automated deployment through natural language.',
    image: 'https://openclaw-AI.org/og-image.png',
    author: {
      '@type': 'Organization',
      name: 'OpenClaw AI',
      url: 'https://openclaw-AI.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'OpenClaw AI',
      logo: {
        '@type': 'ImageObject',
        url: 'https://openclaw-AI.org/logo.png',
      },
    },
    datePublished: '2025-01-30',
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://openclaw-AI.org/${locale}`,
    },
    inLanguage: locale,
    keywords: hotKeywords,
    about: hotKeywords.map((keyword) => ({
      '@type': 'Thing',
      name: keyword,
    })),
    articleSection: locale === 'zh' ? '技术教程' : 'Technology Tutorial',
  };

  return (
    <>
      {/* SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppData) }}
      />
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
      />

      {/* 首屏组件 - 立即加载 */}
      <Hero />

      {/* 非首屏组件 - 动态加载 */}
      <Demo />
      <Why />
      <HowTo />
      <UseCases />
      <FAQ />
      <WaitlistForm />
    </>
  );
}
