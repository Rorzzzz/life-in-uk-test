import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'About — PassTheUKTest | Built by Rory Stephenson',
  description: 'PassTheUKTest was built by Rory Stephenson after going through the Life in the UK test himself. Free, no subscription, no billing surprises — ever.',
  alternates: { canonical: 'https://passtheuktest.co.uk/about' },
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Rory Stephenson',
  url: 'https://passtheuktest.co.uk/about',
  email: 'admin@passtheuktest.co.uk',
  description: 'Creator of PassTheUKTest. Passed the Life in the UK citizenship test and built the site to provide a free, high-quality alternative to subscription-based test prep services.',
  knowsAbout: ['Life in the UK Test', 'British Citizenship', 'ILR', 'UK Immigration'],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]} />
      <div className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">About</span>
      </nav>

      {/* Person-first lead */}
      <div className="flex items-start gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-brand-500/20 flex items-center justify-center text-xl font-bold text-brand-400 flex-shrink-0">R</div>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink mb-1">Rory Stephenson</h1>
          <p className="text-sm text-ink-muted">Built PassTheUKTest · Passed the Life in the UK test · admin@passtheuktest.co.uk</p>
        </div>
      </div>

      <div className="space-y-8 text-base text-ink leading-relaxed">

        <section>
          <p className="text-ink-muted text-lg leading-relaxed">
            PassTheUKTest was built by <strong className="text-ink">Rory Stephenson</strong> after going through the Life in the UK test himself. He passed first time — but the experience of searching for decent free practice resources and finding only slow, cluttered sites with paywalled features motivated him to build something better.
          </p>
          <p className="text-ink-muted mt-4">
            The goal was simple: build the resource he wished had existed when he was preparing. Free, adaptive, mobile-first, and honest about what the test actually requires.
          </p>
        </section>

        <section className="bg-card rounded-2xl p-5">
          <h2 className="text-base font-semibold text-ink mb-4">What the site offers</h2>
          <ul className="space-y-2.5 text-sm text-ink-muted">
            {[
              '570 practice questions drawn directly from the official handbook',
              'Adaptive learning — questions you find hard appear more often',
              '45 mock exams replicating real test conditions (24 Qs, 45 mins)',
              'Spaced repetition flashcards using the SM-2 algorithm',
              'XP, streaks, levels and badges to keep you motivated',
              'Cheat sheet of key dates, names and facts — printable before your test',
              'Study guides for all 5 handbook chapters',
              'Articles covering every practical question about the test process',
              'Everything free — no subscription, no login, no paywall',
            ].map(item => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-success flex-shrink-0 mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">Why free?</h2>
          <p className="text-ink-muted">
            The people taking this test are already paying £50 to UKVI and often significantly more in wider immigration costs — solicitor fees, application fees, biometric appointments. Adding another subscription on top of that is unnecessary. Every feature on this site is free and will remain free.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">How the content is produced</h2>
          <p className="text-ink-muted">
            Every question is drawn from the official <em>Life in the United Kingdom: A Guide for New Residents</em> handbook, third edition — the only source the real test uses. Questions are written against the handbook directly, each with a written explanation. Articles are written against GOV.UK guidance and reviewed when official information changes.
          </p>
          <p className="text-ink-muted mt-3">
            If you spot something that looks wrong, email directly: <a href="mailto:admin@passtheuktest.co.uk" className="text-brand-400 hover:underline">admin@passtheuktest.co.uk</a>. Every correction is read and actioned.
          </p>
        </section>

        <section className="bg-card rounded-2xl p-5">
          <p className="font-semibold text-ink mb-1">Get in touch</p>
          <p className="text-sm text-ink-muted mb-2">
            Questions, corrections, or feedback — I read everything.
          </p>
          <a
            href="mailto:admin@passtheuktest.co.uk"
            className="text-brand-400 hover:underline text-sm font-medium"
          >
            admin@passtheuktest.co.uk
          </a>
        </section>

        <section>
          <p className="text-xs text-ink-muted">
            PassTheUKTest is an independent study resource. Not affiliated with, endorsed by, or
            connected to UK Visas and Immigration (UKVI), the Home Office, or any official UK
            government body. Always verify test requirements against the official UKVI website.
          </p>
        </section>

        <div className="flex gap-3">
          <Link
            href="/practice"
            className="px-5 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Start practising →
          </Link>
          <Link
            href="/faq"
            className="px-5 py-3 bg-card border border-border rounded-xl font-semibold text-ink hover:bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Read FAQ
          </Link>
        </div>

      </div>
    </div>
    </>
  )
}
