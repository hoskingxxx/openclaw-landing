import createMiddleware from 'next-intl/middleware';
import { locales } from './app/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use prefix for locale (e.g., /en, /zh)
  localePrefix: 'always',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(zh|en)/:path*'],
};
