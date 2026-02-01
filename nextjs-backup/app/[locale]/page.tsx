import { Hero } from '@/components/hero';
import { Demo } from '@/components/demo';
import { Why } from '@/components/why';
import { HowTo } from '@/components/how-to';
import { UseCases } from '@/components/use-cases';
import { FAQ } from '@/components/faq';
import { WaitlistForm } from '@/components/waitlist-form';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // Enable static rendering
  unstable_setRequestLocale(locale);

  // Structured data for SEO
  const structuredData = {
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
    author: {
      '@type': 'Organization',
      name: 'OpenClaw AI',
      url: 'https://openclaw-AI.org',
    },
    potentialAction: {
      '@type': 'UseAction',
      target: 'https://openclaw-AI.org',
    },
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
