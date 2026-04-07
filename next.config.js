/** @type {import('next').NextConfig} */
const nextConfig = {
  // Path alias: @/ → src/
  // (configured automatically by Next.js when jsconfig.json exists)

  // Strict mode catches bugs early
  reactStrictMode: true,

  // Image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Headers for security + performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache static question pages for 1 hour in CDN
        source: '/questions/:id',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ]
  },

  // Redirects for clean URLs
  async redirects() {
    return [
      // Redirect /test → /practice for SEO-friendly URL
      { source: '/test', destination: '/practice', permanent: true },
    ]
  },
}

module.exports = nextConfig
