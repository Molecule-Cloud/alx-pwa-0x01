// next.config.ts
import type { NextConfig } from 'next'

import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',

})


const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media-amazon.com'],
    // Or use remotePatterns for more control:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.media-amazon.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default  withPWA({
  ...nextConfig
})