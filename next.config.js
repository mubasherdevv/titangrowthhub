/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*.html',
        destination: '/api/verify-html/:path*',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/wp-content/:all*(css|js|gif|jpe?g|png|webp|woff2?|ttf|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
