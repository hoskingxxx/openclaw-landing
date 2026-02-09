/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // SEO: 禁用尾部斜杠，避免权重分散
  trailingSlash: false,

  // 301 重定向
  async redirects() {
    return [
      // 旧博客路径 → 新指南路径
      {
        source: '/blog/:slug*',
        destination: '/guides/:slug*',
        permanent: true,
      },
      // 已删除页面重定向
      {
        source: '/use-cases',
        destination: '/resources',
        permanent: true,
      },
      // 旧文章 slug 重定向
      {
        source: '/guides/openclaw-oom-fix',
        destination: '/guides/fix-openclaw-cuda-oom-errors',
        permanent: true,
      },
      {
        source: '/guides/deepseek-r1-optimization',
        destination: '/guides/how-to-use-deepseek-with-openclaw',
        permanent: true,
      },
      // GSC 404 fixes: OG image 别名
      {
        source: '/og-image.png',
        destination: '/opengraph-image',
        permanent: true,
      },
      // Favicon alias
      {
        source: '/favicon.ico',
        destination: '/icon',
        permanent: true,
      },
      // 404 页面 → 错误索引
      {
        source: '/404',
        destination: '/guides/openclaw-error-index',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
