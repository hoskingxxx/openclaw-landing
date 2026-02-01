import { Hero } from '@/components/hero';
import { Demo } from '@/components/demo';
import { Why } from '@/components/why';
import { HowTo } from '@/components/how-to';
import { UseCases } from '@/components/use-cases';
import { FAQ } from '@/components/faq';
import { WaitlistForm } from '@/components/waitlist-form';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering
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

  // Article JSON-LD (for the landing page content)
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

      <Hero />
      <Demo />
      <Why />
      <HowTo />
      <UseCases />
      <FAQ />
      <WaitlistForm />
    </>
  );
}
