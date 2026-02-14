import type { NextConfig } from 'next'

/**
 * Next.js Configuration for Barazo Web
 * Uses standalone output for Docker deployment with SSR.
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
const nextConfig: NextConfig = {
  // Standalone output for Docker (includes Node.js server)
  output: 'standalone',

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.bsky.social',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bsky.app',
      },
    ],
  },

  // Trailing slashes for SEO consistency
  trailingSlash: true,

  // Enable React Compiler (stable in Next.js 16)
  reactCompiler: true,

  // Environment variables available at build time
  env: {
    NEXT_PUBLIC_APP_VERSION: process.env.npm_package_version || '0.1.0',
  },
}

export default nextConfig
