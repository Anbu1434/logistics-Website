/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/quote',
        destination: '/?quote=open',
        permanent: false,
      },
      {
        source: '/track',
        destination: '/?track=open',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

