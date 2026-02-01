import dynamic from 'next/dynamic';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/hero';

// 强制静态生成 - 所有页面在构建时预渲染
export const dynamicParams = false;

// 动态导入非首屏组件 - 代码分割
const Demo = dynamic(() => import('@/components/demo').then(mod => ({ default: mod.Demo })), {
  loading: () => (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="animate-pulse bg-muted/50 rounded-xl h-96" />
      </div>
    </section>
  ),
});

const Why = dynamic(() => import('@/components/why').then(mod => ({ default: mod.Why })), {
  loading: () => <section className="py-20"><div className="animate-pulse bg-muted/50 rounded-xl h-64 mx-auto max-w-7xl" /></section>,
});

const HowTo = dynamic(() => import('@/components/how-to').then(mod => ({ default: mod.HowTo })), {
  loading: () => <section className="py-20"><div className="animate-pulse bg-muted/50 rounded-xl h-64 mx-auto max-w-7xl" /></section>,
});

const UseCases = dynamic(() => import('@/components/use-cases').then(mod => ({ default: mod.UseCases })), {
  loading: () => <section className="py-20"><div className="animate-pulse bg-muted/50 rounded-xl h-64 mx-auto max-w-7xl" /></section>,
});

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

  return (
    <>
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
