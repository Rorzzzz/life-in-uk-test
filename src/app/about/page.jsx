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

      <h1 className="text-3xl font-display font-bold text-ink mb-8">About PassTheUKTest</h1>

      <div className="space-y-8 text-base text-ink leading-relaxed">

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">Who built this</h2>
          <p className="text-ink-muted">
            My name is <strong className="text-ink">Rory Stephenson</strong>. I built PassTheUKTest
            after going through the Life in the UK test process myself. Like most people preparing
            for it, I started by searching for practice sites — and found the same handful of tools
            everyone uses: slow, cluttered, mobile-unfriendly, and almost all of them hiding the
            useful features behind a subscription.
          </p>
          <p className="text-ink-muted mt-3">
            I passed first time. But the experience of preparing for the test made me want to build
            something better — a free resource I would actually have wanted to use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">Why I built it</h2>
          <p className="text-ink-muted">
            The Life in the UK test is a real barrier for a lot of people. It is not especially
            difficult if you prepare properly, but the material is dense, the official handbook is
            dry, and most people do not have weeks to study. What you need is something that helps
            you learn efficiently — that shows you what you do not know, keeps you coming back, and
            does not charge you for the privilege.
          </p>
          <p className="text-ink-muted mt-3">
            PassTheUKTest is completely free. No subscription, no trial that converts to a charge,
            no account required. Every question, every mock test, every study tool — free. That was
            a deliberate decision, not a placeholder until we add a paywall. The people taking this
            test are already paying £50 to UKVI and often much more in wider immigration costs.
            They do not need another bill.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">What makes this different</h2>
          <p className="text-ink-muted">
            The established sites in this space have a consistent problem: they charge monthly
            subscriptions, make cancellation difficult, and have the Trustpilot reviews to prove it.
            The most commonly used one — lifeintheuktestweb.co.uk — has hundreds of complaints
            about unexpected charges and auto-renewals. That should not be how test preparation
            works.
          </p>
          <p className="text-ink-muted mt-3">
            Beyond the business model, the products themselves have not meaningfully improved in
            years. The same static question lists, the same format, nothing that adapts to what you
            actually need to work on.
          </p>
          <p className="text-ink-muted mt-3">
            This site uses spaced repetition — the same technique used by medical students and
            language learners — to surface questions you find difficult more often and back off on
            ones you have already learned. Your progress is tracked locally in your browser. Nothing
            is sent to a server. Nothing is stored against an account.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-display font-bold text-ink mb-3">How the content is produced</h2>
          <p className="text-ink-muted">
            Every question on this site is drawn from the official{' '}
            <em>Life in the United Kingdom: A Guide for New Residents</em> handbook, third edition —
            the only book the real test draws from. Questions are written against the handbook
            directly, checked for accuracy, and each has a written explanation so you understand
            why the answer is correct, not just what it is.
          </p>
          <p className="text-ink-muted mt-3">
            Articles are written against GOV.UK guidance and updated when official information
            changes. If you spot something that looks wrong, email me directly.
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
