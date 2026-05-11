/** @type {import('next').NextConfig} */
const nextConfig = {
  // Path alias: @/ → src/
  // (configured automatically by Next.js when jsconfig.json exists)

  // Strict mode catches bugs early
  reactStrictMode: true,

  // Inline critical CSS into HTML to eliminate render-blocking stylesheet request
  experimental: {
    optimizeCss: true,
  },

  // Image optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
    ],
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
      // www → non-www (belt-and-braces alongside Vercel domain redirect)
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'www.passtheuktest.co.uk' }],
        destination: 'https://passtheuktest.co.uk/:path*',
        permanent: true,
      },
      // Redirect /test → /practice for SEO-friendly URL
      { source: '/test', destination: '/practice', permanent: true },
    ]
  },
}

module.exports = nextConfig
