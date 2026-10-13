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
      // Merge duplicate continuous-residence article into absence calculator (180-day article is itself being merged there)
      { source: '/articles/ilr-continuous-residence-rule-explained', destination: '/absence-calculator', permanent: true },
      // Merge duplicate "topics" article into the more actionable chapter-by-chapter study order guide
      { source: '/articles/life-in-the-uk-test-topics', destination: '/articles/life-in-the-uk-test-chapter-by-chapter-guide', permanent: true },
      // Merge cancellation/refund article into the higher-ranking reschedule guide (overlapping intent)
      { source: '/articles/life-in-the-uk-test-cancellation-refund', destination: '/articles/how-to-reschedule-life-in-the-uk-test', permanent: true },
      // Merge the pass-rate article into the stronger /pass-rate page (both ranked p2 for "life in the uk test pass rate" — cannibalising)
      { source: '/articles/life-in-the-uk-test-pass-rate', destination: '/pass-rate', permanent: true },

      // ── Section B: hidden duplicate URLs (no MDX file, need 301 for any inbound links) ──
      { source: '/articles/life-in-the-uk-test-waiting-time', destination: '/articles/life-in-the-uk-test-booking-wait-time', permanent: true },
      { source: '/articles/what-to-do-after-passing-the-life-in-the-uk-test', destination: '/articles/what-to-do-after-passing-life-in-the-uk-test', permanent: true },
      { source: '/articles/life-in-the-uk-key-dates', destination: '/articles/life-in-the-uk-test-key-dates', permanent: true },
      { source: '/articles/life-in-the-uk-test-key-dates-to-memorise-2026', destination: '/articles/life-in-the-uk-test-key-dates', permanent: true },
      { source: '/articles/b1-english-language-test-practice', destination: '/articles/b1-english-test-practice', permanent: true },
      { source: '/articles/what-happens-if-the-life-in-the-uk-test', destination: '/articles/what-happens-if-you-fail-the-life-in-the-uk-test', permanent: true },
      { source: '/articles/when-do-life-in-the-uk-test-results-email-urn', destination: '/articles/when-do-you-get-life-in-the-uk-test-results', permanent: true },
      { source: '/articles/how-long-does-id-take-to-study-for-the-life-in-the-uk-test', destination: '/articles/how-long-does-it-take-to-study-for-the-life-in-the-uk-test', permanent: true },
      { source: '/articles/how-long-does-uk-citizensake-2026', destination: '/articles/how-long-does-uk-citizenship-take-2026', permanent: true },

      // ── Section D: article merges ──
      // Test-centre articles → hub/centre pages
      { source: '/articles/life-in-the-uk-test-centre-london', destination: '/test-centres/london', permanent: true },
      { source: '/articles/life-in-the-uk-test-centre-birmingham', destination: '/test-centres/birmingham-city-centre', permanent: true },
      { source: '/articles/life-in-the-uk-test-centre-manchester', destination: '/test-centres/manchester-city', permanent: true },
      // Practice/study merges
      { source: '/articles/hardest-life-in-the-uk-test-questions', destination: '/hardest-questions', permanent: true },
      { source: '/articles/life-in-the-uk-test-pass-mark', destination: '/pass-rate', permanent: true },
      { source: '/articles/how-many-questions-are-in-the-life-in-the-uk-test', destination: '/exam-format', permanent: true },
      { source: '/articles/british-citizenship-test', destination: '/british-citizenship-test', permanent: true },
      { source: '/how-to-pass', destination: '/articles/how-to-pass-the-life-in-the-uk-test-first-time', permanent: true },
      { source: '/articles/best-way-to-study-for-life-in-the-uk-test', destination: '/articles/how-to-pass-the-life-in-the-uk-test-first-time', permanent: true },
      { source: '/articles/life-in-the-uk-test-what-to-study', destination: '/articles/life-in-the-uk-test-chapter-by-chapter-guide', permanent: true },
      { source: '/articles/life-in-the-uk-test-official-handbook', destination: '/articles/life-in-the-uk-test-chapter-by-chapter-guide', permanent: true },
      { source: '/articles/what-is-the-shadow-cabinet-uk', destination: '/articles/life-in-the-uk-test-chapter-5-government-law-guide', permanent: true },
      { source: '/articles/what-is-proportional-representation-uk', destination: '/articles/life-in-the-uk-test-chapter-5-government-law-guide', permanent: true },
      { source: '/articles/what-is-statutory-sick-pay-uk', destination: '/articles/life-in-the-uk-test-chapter-4-modern-society', permanent: true },
      { source: '/articles/can-i-change-my-life-in-the-uk-test-date', destination: '/articles/how-to-reschedule-life-in-the-uk-test', permanent: true },
      { source: '/articles/do-i-need-to-take-the-life-in-the-uk-test', destination: '/articles/life-in-the-uk-test-exemptions', permanent: true },
      { source: '/articles/life-in-the-uk-test-free-practice-questions', destination: '/questions', permanent: true },
      { source: '/articles/life-in-the-uk-test-questions-pdf', destination: '/questions', permanent: true },
      { source: '/life-in-the-uk-test-questions-pdf', destination: '/questions', permanent: true },
      // B2/English merges
      { source: '/articles/b2-english-requirement-2027', destination: '/articles/english-language-requirements-ilr-2026', permanent: true },
      { source: '/articles/b2-english-test', destination: '/articles/english-language-requirements-ilr-2026', permanent: true },
      { source: '/articles/b2-vs-b1-english', destination: '/articles/english-language-requirements-ilr-2026', permanent: true },
      { source: '/articles/ielts-life-skills-b2', destination: '/articles/english-language-requirements-ilr-2026', permanent: true },
      { source: '/articles/languagecert-b2', destination: '/articles/english-language-requirements-ilr-2026', permanent: true },
      { source: '/articles/do-i-need-a-b1-english-test-for-ilr', destination: '/articles/english-language-requirements-ilr-2026', permanent: true },
      // Immigration changes merges
      { source: '/articles/new-rules-uk-citizenship-2026', destination: '/articles/life-in-the-uk-test-2027-changes', permanent: true },
      { source: '/articles/uk-immigration-white-paper-2025-what-it-means', destination: '/articles/life-in-the-uk-test-2027-changes', permanent: true },
      { source: '/articles/is-ilr-being-extended-to-10-years', destination: '/articles/life-in-the-uk-test-2027-changes', permanent: true },
      { source: '/articles/earned-settlement-uk', destination: '/articles/life-in-the-uk-test-2027-changes', permanent: true },
      { source: '/articles/uk-immigration-changes-2026-life-in-the-uk-test', destination: '/articles/life-in-the-uk-test-2027-changes', permanent: true },
      // Citizenship merges
      { source: '/articles/how-long-does-it-take-to-get-british-citizenship', destination: '/articles/how-long-does-uk-citizenship-take-2026', permanent: true },
      { source: '/articles/when-can-i-apply-for-british-citizenship', destination: '/articles/how-long-does-uk-citizenship-take-2026', permanent: true },
      { source: '/articles/ilr-to-british-citizenship', destination: '/articles/how-long-does-uk-citizenship-take-2026', permanent: true },
      { source: '/articles/british-citizenship-by-marriage-2026', destination: '/articles/how-long-does-uk-citizenship-take-2026', permanent: true },
      { source: '/articles/how-much-does-british-citizenship-cost-2026', destination: '/articles/true-cost-of-becoming-british', permanent: true },
      { source: '/articles/how-much-does-ilr-cost-2026', destination: '/articles/true-cost-of-becoming-british', permanent: true },
      { source: '/articles/how-to-apply-for-british-citizenship', destination: '/articles/british-citizenship-requirements-2026', permanent: true },
      { source: '/articles/naturalisation-form-an-guide', destination: '/articles/british-citizenship-requirements-2026', permanent: true },
      { source: '/articles/ilr-vs-british-citizenship', destination: '/articles/british-citizenship-requirements-2026', permanent: true },
      { source: '/articles/what-is-indefinite-leave-to-remain', destination: '/articles/british-citizenship-requirements-2026', permanent: true },
      { source: '/articles/good-character-requirement-ilr-citizenship', destination: '/articles/british-citizenship-requirements-2026', permanent: true },
      { source: '/articles/what-disqualifies-you-from-british-citizenship', destination: '/articles/british-citizenship-requirements-2026', permanent: true },
      { source: '/articles/ilr-application-how-to-apply-online', destination: '/articles/ilr-set-o-form-guide', permanent: true },
      { source: '/articles/what-not-to-say-citizenship-interview', destination: '/articles/uk-citizenship-naturalisation-interview', permanent: true },
      { source: '/articles/eu-settled-status-to-british-citizenship', destination: '/articles/eu-citizens-life-in-the-uk-test', permanent: true },
      { source: '/articles/180-day-rule-ilr-uk', destination: '/absence-calculator', permanent: true },
      { source: '/articles/ilr-eligibility-calculator', destination: '/ilr-calculator', permanent: true },
      { source: '/articles/ilr-documents-required-2026', destination: '/ilr-checklist', permanent: true },

      // ── Section E: 301 exceptions (kept alive but redirected) ──
      { source: '/articles/fastest-way-to-get-british-citizenship', destination: '/articles/how-long-does-uk-citizenship-take-2026', permanent: true },
      { source: '/articles/what-happens-after-you-get-ilr', destination: '/articles/how-long-does-uk-citizenship-take-2026', permanent: true },
      { source: '/articles/ilr-28-day-rule-uk', destination: '/articles/ilr-set-o-form-guide', permanent: true },
    ]
  },
}

module.exports = nextConfig
