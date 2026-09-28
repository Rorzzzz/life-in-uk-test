import Link from 'next/link'

export const metadata = {
  title: 'B2 English Practice — Free IELTS Practice Tests for UK Visa',
  description: 'Free B2 English practice for ILR and UK settlement. Vocabulary, grammar, reading and writing practice aligned to IELTS General Training format.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice' },
}

const SECTIONS = [
  {
    href: '/b2-practice/vocabulary',
    title: 'Vocabulary',
    description: '300 questions — words in context, word formation, collocations, phrasal verbs',
    colour: '#3381ff',
    status: 'available',
    count: '300 questions',
  },
  {
    href: '/b2-practice/grammar',
    title: 'Grammar',
    description: '200 questions — conditionals, passive voice, reported speech, modals, linking words',
    colour: '#a855f7',
    status: 'available',
    count: '200 questions',
  },
  {
    href: '/b2-practice/reading',
    title: 'Reading',
    description: 'Full passages with questions — 3 text types, skimming and scanning practice',
    colour: '#22d07a',
    status: 'coming-soon',
    count: 'Coming soon',
  },
  {
    href: '/b2-practice/writing',
    title: 'Writing',
    description: 'Task 1 (formal letter) and Task 2 (essay) prompts with model answers',
    colour: '#f59e0b',
    status: 'coming-soon',
    count: 'Coming soon',
  },
  {
    href: '/b2-practice/speaking',
    title: 'Speaking',
    description: 'Parts 1, 2 and 3 prompts with sample answers and vocabulary tips',
    colour: '#ff4d6d',
    status: 'coming-soon',
    count: 'Coming soon',
  },
]

export default function B2PracticeHub() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-1">B2 English Practice</h1>
      <p className="text-ink-muted mb-2">
        Free practice for the B2 English test — aligned to IELTS General Training format.
      </p>
      <p className="text-sm text-ink-muted mb-6">
        From 26 March 2027, most ILR applications require B2 (up from B1).{' '}
        <Link href="/articles/b2-english-requirement-2027" className="text-brand-400 hover:text-brand-300 underline-offset-2 hover:underline">What changes →</Link>
      </p>

      <div className="space-y-3 mb-8">
        {SECTIONS.map(s => (
          s.status === 'available' ? (
            <Link
              key={s.href}
              href={s.href}
              className="flex items-center justify-between bg-card rounded-2xl p-5 border border-border hover:border-brand-500/40 transition-colors group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-ink">{s.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: `${s.colour}22`, color: s.colour }}>{s.count}</span>
                </div>
                <p className="text-sm text-ink-muted leading-snug">{s.description}</p>
              </div>
              <span className="text-brand-400 ml-4 group-hover:translate-x-0.5 transition-transform flex-shrink-0">→</span>
            </Link>
          ) : (
            <div
              key={s.href}
              className="flex items-center justify-between bg-card rounded-2xl p-5 border border-border opacity-60"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-ink">{s.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-raised text-ink-muted font-medium">{s.count}</span>
                </div>
                <p className="text-sm text-ink-muted leading-snug">{s.description}</p>
              </div>
            </div>
          )
        ))}
      </div>

      <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 mb-6">
        <p className="font-semibold text-ink mb-1">Also need the Life in the UK test?</p>
        <p className="text-sm text-ink-muted mb-3">767 free questions — the citizenship knowledge test, separate from B2 English.</p>
        <Link href="/practice" className="inline-block px-5 py-2.5 bg-brand-500 text-white rounded-xl font-semibold text-sm hover:bg-brand-600 active:opacity-80 transition-colors">
          Life in the UK Practice →
        </Link>
      </div>

      <div className="bg-card rounded-2xl p-4">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">B2 English Guides</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/articles/b2-english-requirement-2027" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Requirement 2027</Link>
          <Link href="/articles/b2-english-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">Which B2 Test?</Link>
          <Link href="/articles/b2-vs-b1-english" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 vs B1</Link>
          <Link href="/articles/ielts-life-skills-b2" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">IELTS Life Skills B2?</Link>
          <Link href="/articles/languagecert-b2" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">LanguageCert B2</Link>
        </div>
      </div>
    </div>
  )
}
