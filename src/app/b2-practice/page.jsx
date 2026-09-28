import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 English Practice Free — 529 IELTS Questions for UK Visa 2026',
  description: 'Free B2 English practice for UK settlement. 529 questions covering vocabulary, grammar, reading and writing — aligned to IELTS General Training format.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice' },
  openGraph: {
    title: 'B2 English Practice Free — 529 IELTS Questions for UK Visa 2026',
    description: 'Free B2 English practice for UK settlement. 529 questions aligned to IELTS General Training.',
    url: 'https://passtheuktest.co.uk/b2-practice',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const SECTIONS = [
  {
    href: '/b2-practice/vocabulary',
    title: 'Vocabulary',
    description: '240 questions — words in context, collocations, phrasal verbs, academic vocabulary',
    colour: '#3381ff',
    status: 'available',
    count: '240 questions',
  },
  {
    href: '/b2-practice/grammar',
    title: 'Grammar',
    description: '200 questions — conditionals, passive voice, reported speech, modal verbs, linking words',
    colour: '#a855f7',
    status: 'available',
    count: '200 questions',
  },
  {
    href: '/b2-practice/listening',
    title: 'Listening',
    description: 'Audio passages with comprehension questions — 4 sections, everyday and academic contexts',
    colour: '#22d07a',
    status: 'coming-soon',
    count: 'Coming soon',
  },
  {
    href: '/b2-practice/reading',
    title: 'Reading',
    description: '15 passages with comprehension questions — everyday texts, workplace documents, general articles',
    colour: '#06b6d4',
    status: 'available',
    count: '89 questions',
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

const FAQS = [
  {
    q: 'Do I need B2 English for ILR?',
    a: 'From 26 March 2027, yes. Most ILR applications will require B2 English — one level above the current B1 requirement. If your ILR date is before 26 March 2027, you still need B1. The change is confirmed law under HC 1691.',
  },
  {
    q: 'Which tests count for B2 English for UK visa?',
    a: 'Four providers are UKVI-approved for B2: Trinity (ISE II), IELTS for UKVI (score 5.5 in all 4 skills), LanguageCert (General SELT B2), and Pearson (PTE Academic UKVI). General IELTS Academic does not count — you need the UKVI version specifically.',
  },
  {
    q: 'Is B2 English the same as IELTS 5.5?',
    a: 'Yes. IELTS 5.5 in all four skills (listening, reading, writing, speaking) is the B2 level benchmark on the CEFR scale. For UK immigration purposes, you need the IELTS for UKVI version — not standard IELTS Academic or General Training.',
  },
  {
    q: 'Does the Life in the UK test count as a B2 English test?',
    a: 'No. The Life in the UK test proves knowledge of British history and values — it is not an English language test. You need a separate B2 SELT result and a Life in the UK test pass. Both are required for ILR from 2027.',
  },
]

export default function B2PracticeHub() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'B2 English Practice for UK Immigration',
    description: 'Free B2 English practice questions aligned to IELTS General Training format, for people applying for ILR or British citizenship.',
    provider: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
    isAccessibleForFree: true,
    hasCourseInstance: SECTIONS.filter(s => s.status === 'available').map(s => ({
      '@type': 'CourseInstance',
      name: `B2 ${s.title} Practice`,
      url: `https://passtheuktest.co.uk${s.href}`,
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'B2 Practice', path: '/b2-practice' }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-1">B2 English Practice — Free</h1>
        <p className="text-ink-muted mb-2">
          529 free questions aligned to IELTS General Training format — the most common B2 test for UK settlement.
        </p>
        <p className="text-sm text-ink-muted mb-6">
          From 26 March 2027, most ILR applications require B2 (up from B1).{' '}
          <Link href="/articles/b2-english-requirement-2027" className="text-brand-400 hover:text-brand-300 underline-offset-2 hover:underline">What changes and who it affects →</Link>
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

        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-semibold text-ink mb-3">What is B2 English?</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-3">
            B2 is the fourth level on the CEFR scale — above B1, below C1. At B2 you can understand the main ideas of complex texts, interact fluently with native speakers, and produce clear, detailed written text on a range of subjects.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed mb-3">
            For UK immigration, B2 is tested in all four skills: listening, reading, writing, and speaking. The most common approved test is IELTS for UKVI — a score of 5.5 in all four components is the B2 benchmark.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            B1 tested only speaking and listening. B2 adds reading and writing — that is the main difference in difficulty. See our{' '}
            <Link href="/articles/b2-vs-b1-english" className="text-brand-400 hover:text-brand-300">B2 vs B1 comparison →</Link>
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-base font-semibold text-ink mb-4">Common Questions</h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-card rounded-2xl p-5">
                <h3 className="font-semibold text-ink mb-2 text-sm">{faq.q}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
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
    </>
  )
}
