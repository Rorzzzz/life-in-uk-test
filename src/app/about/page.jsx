import Link from 'next/link'

export const metadata = {
  title: 'About Pass the UK Test — Free Life in the UK Test Practice',
  description: 'PassTheUKTest is a free, gamified platform to help you pass the Life in the UK citizenship test first time. Learn about our mission and approach.',
  alternates: { canonical: 'https://passtheuktest.co.uk/about' },
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">About</span>
      </nav>

      <h1 className="text-3xl font-display font-bold text-ink mb-4">About Pass the UK Test</h1>

      <div className="prose-custom space-y-6 text-base text-ink leading-relaxed">
        <p>
          <strong>PassTheUKTest</strong> is a free study platform built to help people pass the
          Life in the UK citizenship test on their first attempt. We believe that preparing for
          this important milestone should be accessible to everyone — not locked behind a paywall.
        </p>

        <h2 className="text-xl font-display font-bold text-ink">What we offer</h2>
        <ul className="space-y-2 list-disc pl-5 text-ink-muted">
          <li>570+ practice questions drawn from the official handbook</li>
          <li>45 full mock tests matching the real exam format (24 questions, 45 minutes)</li>
          <li>Adaptive learning that focuses on your weak areas</li>
          <li>XP, streaks, and badges to keep you motivated</li>
          <li>Study guides for every chapter of the handbook</li>
          <li>Flashcards, cheat sheets, and topic deep-dives</li>
        </ul>

        <h2 className="text-xl font-display font-bold text-ink">Our approach</h2>
        <p>
          The platform uses spaced repetition — the same technique used by medical students and
          language learners — to help you retain information long-term. Questions you find
          difficult appear more often; questions you have mastered are shown less frequently.
        </p>
        <p>
          All content is based on the official
          <em> Life in the United Kingdom: A Guide for New Residents</em> handbook, third edition.
          This is the only book the test draws questions from.
        </p>

        <h2 className="text-xl font-display font-bold text-ink">Disclaimer</h2>
        <p className="text-ink-muted text-sm">
          PassTheUKTest is an independent study resource and is not affiliated with, endorsed by,
          or connected to UK Visas and Immigration (UKVI), the Home Office, or any official UK
          government body. Always check the official UKVI website for the latest test requirements.
        </p>

        <div className="flex gap-3 mt-8">
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
  )
}
