import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // Redirect blog posts without trailing slash to with trailing slash
      {
        source: '/blog/free-vst-plugins-reaper-organic-production',
        destination: '/blog/free-vst-plugins-reaper-organic-production/',
        permanent: true,
      },
      // Generic redirect for any path without trailing slash (except files and API)
      {
        source: '/((?!api)(?!_next)(?!.*\\.).*[^/])$',
        destination: '/$1/',
        permanent: true,
      },
    ]
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
