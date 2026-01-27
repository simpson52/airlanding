/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/miso',
        destination: '/page/miso',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
