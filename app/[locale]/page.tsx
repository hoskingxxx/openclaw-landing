import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';

// 强制静态生成 - 所有页面在构建时预渲染
export const dynamicParams = false;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero - Main component */}
      <Hero />
    </>
  );
}
