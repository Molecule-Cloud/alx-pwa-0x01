// next.config.ts
import type { NextConfig } from 'next'

import withPWAInit from '@ducanh2912/next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  sw: 'sw.js',
  publicExcludes: ['!noprecache/**/*'],
  fallbacks: {
    document: '/offline',
  },
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\.media-amazon\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'movie-images-cache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
          },
        },
      },
      {
        urlPattern: /\/api\/.*$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 10,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 5, // 5 minutes
          },
        },
      },
      {
        urlPattern: /\.(css|js|woff|woff2|ttf|eot)$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'static-resources-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
          },
        },
      },
    ],
  },
})


const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media-amazon.com', 'm.media-amazon.com', 'via.placeholder.com'],
    // Or use remotePatterns for more control:
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'themebeyond.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default  withPWA({
  ...nextConfig
})