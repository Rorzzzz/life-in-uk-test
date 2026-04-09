import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'Terms of Use — Pass the UK Test',
  description: 'Terms of use for PassTheUKTest. Free to use for personal study purposes.',
  alternates: { canonical: 'https://passtheuktest.co.uk/terms' },
  robots: { index: false },
}

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Terms of Use', path: '/terms' }]} />
      <div className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">Terms of Use</span>
      </nav>

      <h1 className="text-3xl font-display font-bold text-ink mb-2">Terms of Use</h1>
      <p className="text-xs text-ink-muted mb-8">Last updated: April 2026</p>

      <div className="space-y-8 text-base text-ink leading-relaxed">

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">1. Acceptance</h2>
          <p>
            By using <strong>passtheuktest.co.uk</strong> you agree to these terms. If you do not
            agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">2. Permitted use</h2>
          <p>
            The site is provided for personal, non-commercial study purposes only. You may not
            copy, reproduce, scrape, redistribute, or sell any content from this site without
            prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">3. No guarantee of accuracy</h2>
          <p>
            We make every effort to ensure questions and answers are accurate and up to date with
            the official <em>Life in the United Kingdom: A Guide for New Residents</em> handbook.
            However, we make no warranty as to the accuracy, completeness, or fitness for purpose
            of the content. Always verify important information against the official handbook and
            UKVI guidance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">4. No affiliation with UKVI</h2>
          <p>
            PassTheUKTest is an independent resource. We are not affiliated with, endorsed by, or
            connected to UK Visas and Immigration (UKVI), the Home Office, or any official UK
            government body.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">5. Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, PassTheUKTest shall not be liable for any loss
            or damage arising from use of this site, including failure to pass the Life in the UK
            test.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">6. Changes to these terms</h2>
          <p>
            We may update these terms at any time. Continued use of the site after changes
            constitutes acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">7. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">8. Contact</h2>
          <p className="text-ink-muted">
            For queries about these terms, email{' '}
            <a href="mailto:admin@passtheuktest.co.uk" className="text-brand-400 underline hover:text-brand-300">
              admin@passtheuktest.co.uk
            </a>. Site operated by Rory Stephenson.
          </p>
        </section>

      </div>

      <div className="mt-8 pt-6 border-t border-border">
        <Link href="/privacy-policy" className="text-sm text-brand-400 hover:text-brand-300 underline">
          Read our Privacy Policy
        </Link>
      </div>
    </div>
    </>
  )
}
