import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '../i18n';
import '../globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { AnalyticsScript } from '@/components/analytics-script';

// Bilingual metadata configuration
const metadataByLocale: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'OpenClaw AI - Extract structured data from any webpage',
    description: 'Paste a link. Get clean CSV/JSON. No code required. Extract web data in seconds.',
  },
  zh: {
    title: 'OpenClaw AI - 一键从任意网页抓取结构化数据',
    description: '粘贴链接，获得清晰的 CSV/JSON 数据。无需代码。10秒上手。',
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Generate metadata based on locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = metadataByLocale[locale as Locale] || metadataByLocale.en;

  return {
    metadataBase: new URL('https://openclaw-AI.org'),
    title: t.title,
    description: t.description,
    keywords: [
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
    ],
    authors: [{ name: 'OpenClaw AI' }],
    creator: 'OpenClaw AI',
    publisher: 'OpenClaw AI',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `https://openclaw-AI.org/${locale}`,
      siteName: 'OpenClaw AI',
      type: 'website',
      locale: locale,
      alternateLocale: locales.filter((l) => l !== locale),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['/og-image.png'],
      creator: '@openclawai',
    },
    alternates: {
      canonical: `https://openclaw-AI.org/${locale}`,
      languages: {
        en: 'https://openclaw-AI.org/en',
        zh: 'https://openclaw-AI.org/zh',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Enable static rendering
  setRequestLocale(locale);

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

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

  // WebSite JSON-LD Structured Data
  const webSiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'OpenClaw AI',
    url: 'https://openclaw-AI.org',
    description: locale === 'zh'
      ? 'OpenClaw是开源AI Bot框架，让AI真正替你干活。OpenClaw bot可通过自然语言在你的电脑执行文件管理、内容创作、自动化部署等真实任务。'
      : 'OpenClaw is an open-source AI Bot framework that lets AI truly work for you. OpenClaw bot can execute real tasks like file management, content creation, and automated deployment through natural language.',
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://openclaw-AI.org/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    keywords: hotKeywords,
    about: hotKeywords.map((keyword) => ({
      '@type': 'Thing',
      name: keyword,
    })),
    publisher: {
      '@type': 'Organization',
      name: 'OpenClaw AI',
      url: 'https://openclaw-AI.org',
    },
  };

  return (
    <html lang={locale} className="dark">
      <head>
        {/* WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteStructuredData) }}
        />
        <AnalyticsScript />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
