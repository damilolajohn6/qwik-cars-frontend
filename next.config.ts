/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 
        'https://b542fecf-024d-4774-a67d-e64a26e4d3d8.us-east-1.cloud.genez.io/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
