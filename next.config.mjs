/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Disable Turbopack in production
  experimental: {
    turbo: undefined,
  },

  // Enable compression
  compress: true,

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Force HTTPS in production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },

  // Redirects for legacy paths and trailing slash normalization
  async redirects() {
    return [
      // Legacy /blog/* routes → /guides/* (permanent 301)
      {
        source: '/blog/:path*',
        destination: '/guides/:path*',
        permanent: true,
      },
      // Legacy /posts/* routes → /guides/* (permanent 301)
      {
        source: '/posts/:path*',
        destination: '/guides/:path*',
        permanent: true,
      },
      // Trailing slash normalization (remove trailing slashes)
      {
        source: '/:path*/',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
