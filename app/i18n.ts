import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure locale is always defined
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en'; // Default fallback
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
