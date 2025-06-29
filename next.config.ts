import type { NextConfig } from "next";
import createMDX from '@next/mdx'
import { withContentCollections } from "@content-collections/next";

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // Required for static export
    domains: ['media.licdn.com', 'elasticbeanstalk-ap-southeast-1-733447040549.s3.ap-southeast-1.amazonaws.com'],
  },
  // JavaScript optimization for better Best Practices score
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enhanced minification for production
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }
    return config;
  },
};

const withMDX = createMDX({
})

export default withContentCollections(withMDX(nextConfig));
