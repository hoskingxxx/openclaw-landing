import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '../i18n';
import '../globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

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
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className={inter.className}>
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
