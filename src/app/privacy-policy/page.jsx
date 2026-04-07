import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy — Pass the UK Test',
  description: 'Privacy policy for PassTheUKTest. Learn how we handle your data — we store nothing on our servers.',
  alternates: { canonical: 'https://passtheuktest.co.uk/privacy-policy' },
  robots: { index: false },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl font-display font-bold text-ink mb-2">Privacy Policy</h1>
      <p className="text-xs text-ink-muted mb-8">Last updated: April 2026</p>

      <div className="space-y-8 text-base text-ink leading-relaxed">

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">1. Overview</h2>
          <p>
            PassTheUKTest (<strong>passtheuktest.co.uk</strong>) is a free study tool. We are
            committed to protecting your privacy. This policy explains what data is collected,
            how it is used, and your rights.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">2. Data we collect</h2>
          <p className="mb-3">
            <strong>Your progress data</strong> — quiz answers, XP, streak, and badges — is stored
            entirely in your browser&apos;s <code className="text-brand-400 text-sm">localStorage</code>.
            It never leaves your device and is never sent to our servers. Clearing your browser
            data will erase it.
          </p>
          <p>
            <strong>Analytics</strong> — we use Google Analytics 4 (GA4) to understand how the
            site is used in aggregate (pages visited, session duration, device type). GA4 collects
            anonymised data including approximate location (country/region), browser, and device.
            No personally identifiable information is collected through analytics.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">3. Cookies</h2>
          <p>
            Google Analytics sets first-party cookies (<code className="text-brand-400 text-sm">_ga</code>,&nbsp;
            <code className="text-brand-400 text-sm">_ga_*</code>) to distinguish users and sessions.
            These cookies do not contain personally identifiable information. You can opt out of
            Google Analytics by installing the&nbsp;
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 underline hover:text-brand-300"
            >
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">4. Third parties</h2>
          <p>
            We use Google Analytics (operated by Google LLC). Google&apos;s privacy policy is available
            at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-400 underline hover:text-brand-300">policies.google.com/privacy</a>.
            We do not sell, trade, or share your data with any other third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">5. Your rights (UK GDPR)</h2>
          <p>
            Under UK GDPR you have the right to access, rectify, or erase personal data we hold
            about you. Because all quiz progress is stored locally on your device, you can delete
            it at any time by clearing your browser storage. For analytics data, you can use the
            Google opt-out tool above.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">6. Contact</h2>
          <p className="text-ink-muted">
            For privacy-related queries, please use the contact form on our{' '}
            <Link href="/about" className="text-brand-400 underline hover:text-brand-300">About page</Link>.
          </p>
        </section>

      </div>
    </div>
  )
}
