import Link from 'next/link'
import { B1_TEST_NUMBERS } from '@/data/b1Questions'

export const metadata = {
  title: 'B1 English Practice Tests — 60 Free Questions 2026',
  description: 'Free B1 English practice tests for ILR and UK citizenship. 4 tests, 15 questions each — vocabulary, grammar and reading. No sign-up. Instant results.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b1-practice' },
  openGraph: {
    title: 'B1 English Practice Tests — 60 Free Questions 2026',
    description: 'Four free B1 English practice tests. 15 questions each, covering vocabulary, grammar and reading comprehension. For ILR and UK citizenship applicants.',
    url: 'https://passtheuktest.co.uk/b1-practice',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const TEST_META = [
  {
    number: 1,
    title: 'Practice Test 1',
    subtitle: 'Vocabulary · Grammar · Reading',
    description: 'Cover essential vocabulary like "mandatory", "eligible" and "valid". Grammar includes present perfect, modals and articles. Two reading passages.',
    badge: 'Start here',
    badgeColor: 'bg-brand-500 text-white',
  },
  {
    number: 2,
    title: 'Practice Test 2',
    subtitle: 'Vocabulary · Grammar · Reading',
    description: 'New vocabulary including "consent", "deport" and "surcharge". Grammar covers passive voice, first conditional and must/don\'t have to.',
    badge: 'Citizenship focus',
    badgeColor: 'bg-success/20 text-success',
  },
  {
    number: 3,
    title: 'Practice Test 3',
    subtitle: 'Vocabulary · Grammar · Reading',
    description: 'Vocabulary like "provisional", "exempt" and "naturalisation". Grammar: reported speech, gerunds and question tags. Passage on 2026 rule changes.',
    badge: 'Rule changes',
    badgeColor: 'bg-amber-500/20 text-amber-400',
  },
  {
    number: 4,
    title: 'Practice Test 4',
    subtitle: 'Vocabulary · Grammar · Reading',
    description: 'Advanced vocabulary: "discretionary", "statutory" and "liable". Grammar: third conditional, indirect questions and future perfect.',
    badge: 'Advanced',
    badgeColor: 'bg-purple-500/20 text-purple-400',
  },
]

export default function B1PracticeIndexPage() {
  return (
    <div className="min-h-screen bg-[#0d0f1a] py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
          <span className="mx-2">›</span>
          <span className="text-slate-300">B1 Practice Tests</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 bg-brand-500/15 text-brand-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 border border-brand-500/25">
            <span>🇬🇧</span>
            <span>B1 English · ILR &amp; Citizenship</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-clash)' }}>
            Free B1 English Practice Tests
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Four free practice tests — 60 questions total — covering the vocabulary, grammar and
            reading comprehension you need for your B1 English test for ILR or UK citizenship.
          </p>
        </header>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { value: '4', label: 'Practice tests' },
            { value: '60', label: 'Total questions' },
            { value: '~5 min', label: 'Per test' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#131629] rounded-xl p-4 text-center border border-white/5">
              <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Test cards */}
        <div className="space-y-4 mb-10">
          {TEST_META.map(test => (
            <Link
              key={test.number}
              href={`/b1-practice/${test.number}`}
              className="block bg-[#131629] border border-white/5 rounded-2xl p-5 hover:border-brand-500/40 hover:bg-[#1a1e33] transition-all group"
            >
              <div className="flex items-start gap-4">
                {/* Number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-brand-400" style={{ fontFamily: 'var(--font-mono)' }}>
                    {test.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="text-white font-semibold group-hover:text-brand-300 transition-colors">
                      {test.title}
                    </h2>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${test.badgeColor}`}>
                      {test.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{test.subtitle}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">{test.description}</p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-slate-600 group-hover:text-brand-400 transition-colors text-lg mt-0.5">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* What's tested section */}
        <div className="bg-[#131629] border border-white/5 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-clash)' }}>
            What these tests cover
          </h2>
          <div className="space-y-3">
            {[
              {
                icon: '📖',
                title: 'Vocabulary',
                text: 'Immigration and citizenship terms — exactly the kind of language used in official letters, the Life in the UK test and GOV.UK guidance.',
              },
              {
                icon: '✏️',
                title: 'Grammar',
                text: 'B1-level structures: present perfect, modal verbs, passive voice, conditionals, reported speech and relative clauses.',
              },
              {
                icon: '🗂️',
                title: 'Reading Comprehension',
                text: 'Short passages on UK citizenship, rights, law and government — similar in style to the reading sections of approved B1 tests.',
              },
            ].map(item => (
              <div key={item.title} className="flex gap-3">
                <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <span className="text-white font-medium text-sm">{item.title} — </span>
                  <span className="text-slate-400 text-sm">{item.text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to b1-check */}
        <div className="bg-gradient-to-r from-brand-500/10 to-brand-600/5 border border-brand-500/20 rounded-2xl p-5 mb-8">
          <p className="text-sm text-slate-300 mb-3">
            <strong className="text-white">Not sure if your English is at B1 yet?</strong>{' '}
            Take our quick 15-question level check to find out before booking an official test.
          </p>
          <Link
            href="/b1-check"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Take the free B1 level check →
          </Link>
        </div>

        {/* Schema: ItemList for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ItemList',
              name: 'Free B1 English Practice Tests',
              description: 'Four free B1 English practice tests for ILR and UK citizenship applicants.',
              numberOfItems: B1_TEST_NUMBERS.length,
              itemListElement: B1_TEST_NUMBERS.map((n, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                name: `B1 English Practice Test ${n}`,
                url: `https://passtheuktest.co.uk/b1-practice/${n}`,
              })),
            }),
          }}
        />
      </div>
    </div>
  )
}
