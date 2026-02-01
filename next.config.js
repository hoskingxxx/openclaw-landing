const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./app/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Deploy to Vercel for optimal performance with i18n
};

module.exports = withNextIntl(nextConfig);
