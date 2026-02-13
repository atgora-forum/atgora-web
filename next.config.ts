import type { NextConfig } from 'next'

/**
 * Next.js Configuration for Barazo Web
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */
const nextConfig: NextConfig = {
  // Static export for Docker deployment
  output: 'export',
  distDir: 'dist',

  // Image optimization (static export requires unoptimized images)
  images: {
    unoptimized: true,
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
