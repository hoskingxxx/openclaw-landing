const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./app/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 优化图片
  images: {
    unoptimized: true,
  },

  // 禁用 X-Powered-By 头
  poweredByHeader: false,
};

module.exports = withNextIntl(nextConfig);
