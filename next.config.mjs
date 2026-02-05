/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  // 核心修复：301 重定向
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/guides/:slug*',
        permanent: true, // 告诉 Google 这是永久合并 (301)
      },
    ];
  },
};

export default nextConfig;
