import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'Contact — PassTheUKTest',
  description: 'Contact PassTheUKTest. Questions, corrections, or feedback about our free Life in the UK test practice — email us directly and we read everything.',
  alternates: { canonical: 'https://passtheuktest.co.uk/contact' },
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]} />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
          <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
          <span>/</span>
          <span className="px-2 py-1 text-ink">Contact</span>
        </nav>

        <h1 className="text-3xl font-display font-bold text-ink mb-2">Contact</h1>
        <p className="text-sm text-ink-muted mb-8">We read every message.</p>

        <div className="space-y-8 text-base text-ink leading-relaxed">
          <section>
            <p className="text-ink-muted">
              PassTheUKTest is an independent, free study resource built and run by{' '}
              <Link href="/about" className="text-brand-400 hover:underline">Rory Stephenson</Link>.
              If you have a question, spotted an error in a question or article, or have feedback on
              the site, get in touch — corrections and suggestions are genuinely welcome.
            </p>
          </section>

          <section className="bg-card rounded-2xl p-5">
            <h2 className="text-base font-semibold text-ink mb-2">Email</h2>
            <a
              href="mailto:admin@passtheuktest.co.uk"
              className="text-brand-400 hover:underline font-medium"
            >
              admin@passtheuktest.co.uk
            </a>
            <p className="text-sm text-ink-muted mt-3">
              We aim to reply within a few days. For factual corrections, please include the page or
              question so we can check it against the official handbook or GOV.UK guidance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-bold text-ink mb-3">Common questions</h2>
            <p className="text-ink-muted">
              Many questions are already answered in our{' '}
              <Link href="/faq" className="text-brand-400 hover:underline">FAQ</Link>. For how the site
              works and who is behind it, see the{' '}
              <Link href="/about" className="text-brand-400 hover:underline">About page</Link>.
            </p>
          </section>

          <section>
            <p className="text-xs text-ink-muted">
              PassTheUKTest is not affiliated with, endorsed by, or connected to UK Visas and
              Immigration (UKVI), the Home Office, or any official UK government body. We cannot
              give personal immigration advice — always verify requirements against the official
              UKVI website or a regulated adviser.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
