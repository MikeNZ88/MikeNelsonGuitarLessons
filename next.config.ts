import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove trailingSlash: true to allow both formats
  // Force deployment update - Fixed cache corruption issues
  trailingSlash: false,
  async redirects() {
    return [
      // Redirect trailing slash URLs to non-trailing slash versions
      {
        source: '/blog/:slug/',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/lessons/',
        destination: '/lessons',
        permanent: true,
      },
      {
        source: '/about/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/approach/',
        destination: '/approach',
        permanent: true,
      },
      {
        source: '/tools/',
        destination: '/tools',
        permanent: true,
      },
      {
        source: '/rhythm-tool/',
        destination: '/rhythm-tool',
        permanent: true,
      },
      {
        source: '/privacy-policy/',
        destination: '/privacy-policy',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
