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
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
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
      // vercel.app → production domain (prevents duplicate indexing)
      {
        source: '/(.*)',
        has: [{ type: 'host', value: 'life-in-uk-test-liart.vercel.app' }],
        destination: 'https://passtheuktest.co.uk/:path*',
        permanent: true,
      },
      // Redirect /test → /practice for SEO-friendly URL
      { source: '/test', destination: '/practice', permanent: true },
      // Redirect duplicate 2026 guide article → canonical prep page
      { source: '/articles/life-in-the-uk-test-2026-guide', destination: '/2026-test-prep', permanent: true },
      // Merge duplicate "results" article into the more comprehensive page
      { source: '/articles/life-in-the-uk-test-results', destination: '/articles/when-do-you-get-life-in-the-uk-test-results', permanent: true },
      // Merge duplicate citizenship-requirements article into the more linked-to page
      { source: '/articles/requirements-british-citizenship', destination: '/articles/british-citizenship-requirements-2026', permanent: true },
      // Merge duplicate skilled worker LITUK article into the more linked-to page
      { source: '/articles/life-in-the-uk-test-skilled-worker-ilr-requirements', destination: '/articles/skilled-worker-visa-life-in-the-uk-test', permanent: true },
      // Merge duplicate revision-plan article into the more linked-to study-plan page
      { source: '/articles/life-in-the-uk-test-revision-plan', destination: '/articles/life-in-the-uk-test-study-plan', permanent: true },
      // Merge "how to rebook" article into the broader "what happens if you fail" page
      { source: '/articles/failed-life-in-the-uk-test-how-to-rebook', destination: '/articles/what-happens-if-you-fail-the-life-in-the-uk-test', permanent: true },
      // Merge "who needs to take the test" into the exemptions page
      { source: '/articles/who-needs-to-take-life-in-uk-test', destination: '/articles/life-in-the-uk-test-exemptions', permanent: true },
      // Merge duplicate continuous-residence article into the more comprehensive 180-day rule page
      { source: '/articles/ilr-continuous-residence-rule-explained', destination: '/articles/180-day-rule-ilr-uk', permanent: true },
      // Merge duplicate "topics" article into the more actionable chapter-by-chapter study order guide
      { source: '/articles/life-in-the-uk-test-topics', destination: '/articles/life-in-the-uk-test-chapter-by-chapter-guide', permanent: true },
      // Merge cancellation/refund article into the higher-ranking reschedule guide (overlapping intent)
      { source: '/articles/life-in-the-uk-test-cancellation-refund', destination: '/articles/how-to-reschedule-life-in-the-uk-test', permanent: true },
    ]
  },
}

module.exports = nextConfig
