import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { B2_MOCK_TESTS, B2_MOCK_TEST_COUNT, B2_MOCK_TEST_QUESTIONS, B2_MOCK_TEST_TIME_MINUTES, B2_MOCK_TEST_PASS_MARK } from '@/data/b2MockTests'

export const metadata = {
  title: { absolute: 'B2 English Mock Test — 10 Free Practice Exams for UK Settlement 2026' },
  description: 'Take a free B2 English mock test — 10 full practice exams, 20 questions each covering listening, reading, vocabulary and grammar. Pass mark 14/20. No sign-up.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/mock-test' },
  openGraph: {
    title: 'B2 English Mock Test — 10 Free Practice Exams for UK Settlement 2026',
    description: 'Free B2 English mock tests — 10 full exams, 20 questions, 25-minute timer, instant results. No sign-up. Covers listening, reading, vocabulary and grammar.',
    url: 'https://passtheuktest.co.uk/b2-practice/mock-test',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: ['b2 english mock test', 'b2 english test practice', 'b2 english practice test', 'b2 level english test', 'b2 english exam practice', 'b2 ielts mock test', 'english b2 test free'],
}

const FAQS = [
  { q: 'What is a B2 English mock test?', a: 'A B2 English mock test is a full practice exam that mirrors the format of the real IELTS General Training test used for UK settlement visa applications. Each test includes listening, reading, vocabulary and grammar sections — the four skills tested at B2 level (IELTS Band 5.5).' },
  { q: 'How many questions are in each B2 mock test?', a: `Each mock test has ${B2_MOCK_TEST_QUESTIONS} questions: 4 listening, 4 reading, 6 vocabulary and 6 grammar. You have ${B2_MOCK_TEST_TIME_MINUTES} minutes to complete it — the same pace as the real exam.` },
  { q: 'What is the pass mark for the B2 English test?', a: `You need to answer ${B2_MOCK_TEST_PASS_MARK} out of ${B2_MOCK_TEST_QUESTIONS} questions correctly — that is 70%. This corresponds to IELTS Band 5.5, which is the B2 threshold required for UK settlement (Indefinite Leave to Remain).` },
  { q: 'Which English test do I need for UK settlement?', a: 'For Indefinite Leave to Remain (ILR) or Citizenship, you need to prove B2 English — usually through IELTS Life Skills B1, IELTS Academic or General Training at Band 5.5+, or an approved Secure English Language Test (SELT). These mock tests help you prepare for any of those routes.' },
  { q: 'How is B2 English different from B1?', a: 'B2 (upper intermediate) requires stronger reading comprehension, more precise vocabulary, and the ability to understand abstract or academic texts. B1 tests are required for spouse/partner visas; B2 is required for ILR and citizenship. IELTS Band 5.5 = B2; Band 4.0 = B1.' },
  { q: 'Are these B2 mock tests completely free?', a: 'Yes — all 10 mock tests are completely free. No sign-up, no paywall, no premium tier. Every test and every explanation is free forever.' },
  { q: 'How many mock tests should I do before the real B2 exam?', a: 'Most people who pass first time score consistently above 16/20 across at least 5 full mock tests. If you are scoring 17 or more every time, you are ready. Focus extra revision on any section where you lose more than 2 marks.' },
]

const quizSchema = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'B2 English Mock Test — 10 Free Practice Exams for UK Settlement',
  about: { '@type': 'Thing', name: 'B2 English Language Test for UK Settlement' },
  educationalLevel: 'B2 CEFR',
  description: 'Free 20-question B2 English mock tests covering listening, reading, vocabulary and grammar. Pass mark 14/20 (70%) — equivalent to IELTS Band 5.5.',
  isAccessibleForFree: true,
  publisher: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  hasPart: B2_MOCK_TESTS.map(t => ({
    '@type': 'Quiz',
    name: t.title,
    url: `https://passtheuktest.co.uk/b2-practice/mock-test/${t.number}`,
    isAccessibleForFree: true,
  })),
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'B2 English Mock Tests — 10 Free Practice Exams',
  description: 'Free full-length B2 English mock tests for UK settlement visa preparation',
  numberOfItems: B2_MOCK_TEST_COUNT,
  itemListElement: B2_MOCK_TESTS.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.title,
    url: `https://passtheuktest.co.uk/b2-practice/mock-test/${t.number}`,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

const SECTION_COLOURS = {
  'Everyday conversations & conditionals': '#3381ff',
  'Housing & passive voice':               '#22d07a',
  'Social situations & reported speech':   '#a855f7',
  'Daily life & modal verbs':              '#f59e0b',
  'Community & linking words':             '#06b6d4',
  'Environment & conditionals':            '#22d07a',
  'Culture & passive constructions':       '#ff4d6d',
  'Workplace & reported speech':           '#a855f7',
  'Academic contexts & modal verbs':       '#f59e0b',
  'Mixed skills & grammar range':          '#3381ff',
}

export default function B2MockTestIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'B2 Mock Tests', path: '/b2-practice/mock-test' },
      ]} />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-1">
            B2 English Mock Test — {B2_MOCK_TEST_COUNT} Free Practice Exams
          </h1>
          <p className="text-sm text-ink-muted mb-4">
            {B2_MOCK_TEST_COUNT} free tests · {B2_MOCK_TEST_QUESTIONS} questions each · 25 min · no sign-up
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-4">
            Take a free B2 English mock test under timed conditions — no sign-up, no paywall, ever. Each of our {B2_MOCK_TEST_COUNT} practice exams mirrors the real B2 exam format: {B2_MOCK_TEST_QUESTIONS} multiple-choice questions across listening, reading, vocabulary and grammar, with a {B2_MOCK_TEST_TIME_MINUTES}-minute countdown timer and the same 70% pass mark. Passing at this level corresponds to IELTS Band 5.5 — the B2 threshold required for UK Indefinite Leave to Remain and Citizenship. Every question includes a full explanation the moment you answer.
          </p>
          <Link
            href="/b2-practice/mock-test/1"
            className="block w-full py-3.5 bg-brand-500 hover:bg-brand-400 active:opacity-70 text-white text-sm font-bold rounded-xl text-center transition-colors mb-3"
          >
            Start B2 Mock Test 1 →
          </Link>
          <p className="text-xs text-ink-muted">
            Also practise: <Link href="/b2-practice/writing" className="text-brand-400 hover:text-brand-300">Writing →</Link>{' '}
            <Link href="/b2-practice/speaking" className="text-brand-400 hover:text-brand-300">Speaking →</Link>{' '}
            <Link href="/b2-practice/listening" className="text-brand-400 hover:text-brand-300">Listening →</Link>
          </p>
        </div>

        {/* Stats bar */}
        <div className="bg-card rounded-2xl p-3 border border-border mb-6 grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-xl font-bold font-mono text-ink">{B2_MOCK_TEST_COUNT}</p>
            <p className="text-ink-muted text-xs mt-0.5">Free tests</p>
          </div>
          <div>
            <p className="text-xl font-bold font-mono text-ink">{B2_MOCK_TEST_QUESTIONS}</p>
            <p className="text-ink-muted text-xs mt-0.5">Questions</p>
          </div>
          <div>
            <p className="text-xl font-bold font-mono text-ink">{B2_MOCK_TEST_TIME_MINUTES}</p>
            <p className="text-ink-muted text-xs mt-0.5">Minutes</p>
          </div>
          <div>
            <p className="text-xl font-bold font-mono text-success">70%</p>
            <p className="text-ink-muted text-xs mt-0.5">Pass mark</p>
          </div>
        </div>

        {/* All 10 tests grid */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">All {B2_MOCK_TEST_COUNT} Free B2 Mock Tests</h2>
          <div className="grid grid-cols-1 gap-2">
            {B2_MOCK_TESTS.map(test => {
              const colour = SECTION_COLOURS[test.focus] ?? '#3381ff'
              return (
                <Link
                  key={test.number}
                  href={`/b2-practice/mock-test/${test.number}`}
                  className="flex items-center justify-between bg-card border border-border hover:border-brand-500/30 rounded-xl px-4 py-3 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-9 h-9 rounded-lg text-xs font-bold font-mono flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${colour}18`, color: colour }}
                    >
                      {test.number}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink group-hover:text-brand-400 transition-colors">Mock Test {test.number}</p>
                      <p className="text-xs text-ink-muted">{test.focus}</p>
                    </div>
                  </div>
                  <span className="text-brand-400 text-sm group-hover:translate-x-0.5 transition-transform flex-shrink-0">→</span>
                </Link>
              )
            })}
          </div>
        </div>

        {/* What the B2 test covers */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">What these B2 English mock tests cover</h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            Each of our {B2_MOCK_TEST_COUNT} mock tests is structured to mirror the four core skills assessed at B2 level in the IELTS General Training test — the most common route to proving English ability for UK settlement:
          </p>
          <div className="overflow-hidden rounded-xl border border-border mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-raised">
                  <th className="text-left px-3 py-2 font-semibold text-ink">Section</th>
                  <th className="text-right px-3 py-2 font-semibold text-ink">Questions</th>
                  <th className="text-right px-3 py-2 font-semibold text-ink">What it tests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['Listening', '4', 'Audio comprehension'],
                  ['Reading',   '4', 'Text comprehension'],
                  ['Vocabulary','6', 'Word choice & meaning'],
                  ['Grammar',   '6', 'Accuracy & structure'],
                ].map(([section, q, what]) => (
                  <tr key={section}>
                    <td className="px-3 py-2 text-ink-muted">{section}</td>
                    <td className="px-3 py-2 text-right font-mono text-ink">{q}</td>
                    <td className="px-3 py-2 text-right text-ink-muted text-xs">{what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed">
            The pass mark of 14/20 (70%) reflects the IELTS Band 5.5 threshold — the minimum score accepted for Indefinite Leave to Remain and British Citizenship applications. If you pass every section in these mock tests, you have the vocabulary, grammar and comprehension skills needed for the real exam.
          </p>
        </div>

        {/* Why B2 matters */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">Why B2 English matters for UK settlement</h2>
          <ul className="space-y-2 text-sm md:text-base text-ink-muted">
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">ILR (Indefinite Leave to Remain)</strong> — requires B1 speaking/listening plus Life in the UK test. B2 reading and writing strengthen your overall application.</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">British Citizenship</strong> — same requirement: B1 SELT plus Life in the UK test. B2 skills help you pass both comfortably.</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Skilled Worker Visa</strong> — requires B1 in all four skills. B2-level practice gives you a strong buffer above the pass mark.</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">IELTS General Training</strong> — Band 5.5 overall with no band below 5.0 is the standard B2 benchmark. These tests directly mirror that format.</span></li>
          </ul>
        </div>

        {/* How to use */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">How to prepare using these B2 mock tests</h2>
          <ol className="space-y-2 text-sm md:text-base text-ink-muted list-none">
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span><span>Take Mock Test 1 cold — no preparation. Your section scores show exactly where to focus first.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span><span>Read every explanation — right or wrong. The explanations teach the grammar rules and vocabulary patterns the exam actually tests.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span><span>Practise weak sections separately — use <Link href="/b2-practice/vocabulary" className="text-brand-400 hover:text-brand-300">vocabulary</Link>, <Link href="/b2-practice/grammar" className="text-brand-400 hover:text-brand-300">grammar</Link>, <Link href="/b2-practice/listening" className="text-brand-400 hover:text-brand-300">listening</Link> or <Link href="/b2-practice/reading" className="text-brand-400 hover:text-brand-300">reading</Link> drills between full mock tests.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span><span>Book the real test when you consistently score 16+ across multiple mock tests. Scoring 17+ every attempt means you are ready.</span></li>
          </ol>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-ink mb-4">B2 English mock test — frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-card rounded-xl p-4">
                <p className="font-semibold text-ink text-sm md:text-base mb-1">{q}</p>
                <p className="text-sm md:text-base text-ink-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex gap-2 text-sm text-center">
          <Link href="/b2-practice" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors">
            B2 Practice
          </Link>
          <Link href="/b2-practice/writing" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors">
            Writing
          </Link>
          <Link href="/b2-practice/speaking" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors">
            Speaking
          </Link>
        </div>

      </div>
    </>
  )
}
