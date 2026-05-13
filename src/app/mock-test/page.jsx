import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { MOCK_TEST_COUNT, EXAM_QUESTION_COUNT } from '@/data/mockTests'
import MockTestDashboard from './MockTestDashboard'
import MockTestGrid from './MockTestGrid'
import ShareButton from '@/components/ui/ShareButton'

export const metadata = {
  title: { absolute: 'Life in the UK Test — Free Mock Exams & Practice Tests 2026' },
  description: 'Pass the Life in the UK test first time. 45 free online practice tests & mock exams for 2026 — 1,080 questions, instant results, readiness score tracking. No sign-up. No paywall ever.',
  alternates: { canonical: 'https://passtheuktest.co.uk/mock-test' },
  openGraph: {
    title: 'Life in the UK Test — Free Mock Exams & Practice Tests 2026',
    description: 'Pass the Life in the UK test first time. 45 free practice tests & mock exams — 1,080 questions, instant results, readiness tracking. No sign-up.',
    url: 'https://passtheuktest.co.uk/mock-test',
  },
  keywords: ['life in the uk test', 'life in the uk mock test', 'life in the uk practice test', 'life in the uk mock exam', 'life in the uk exam', 'life in the uk test 2026', 'free life in the uk test'],
}

const FAQS = [
  { q: 'How many free Life in the UK mock tests are there?', a: '45 full-length Life in the UK mock tests, each with 24 unique questions — 1,080 practice questions in total. All completely free with no sign-up required.' },
  { q: 'How similar is this to the real Life in the UK exam?', a: 'Each Life in the UK mock test mirrors the real exam format exactly — 24 questions, 45 minutes, pass mark of 18/24 (75%). Questions are drawn from all five handbook chapters in the same proportions as the official Life in the UK test.' },
  { q: 'How many mock tests should I do before the real Life in the UK test?', a: 'Most people who pass first time complete at least 5 Life in the UK practice exams scoring above 20/24 consistently. If you are scoring 22 or more on every mock exam, you are ready to book.' },
  { q: 'What is the pass mark for the Life in the UK test?', a: 'You need to answer 18 out of 24 questions correctly — that is 75%. You have 45 minutes to complete the Life in the UK exam.' },
  { q: 'Is this Life in the UK test practice completely free?', a: 'Yes — all 45 mock tests and practice exams are completely free. No sign-up, no paywall, no premium tier. Every Life in the UK mock exam on this site is free forever.' },
  { q: 'Which Life in the UK practice test should I start with?', a: 'Start with Life in the UK Mock Test 1 and work through them in order. By test 10 you will have a clear picture of which topics need more revision. Use the cheat sheet alongside your Life in the UK test practice.' },
]

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Life in the UK Mock Tests — 45 Free Practice Exams',
  description: 'Free full-length mock tests for the Life in the UK citizenship test',
  numberOfItems: MOCK_TEST_COUNT,
  itemListElement: Array.from({ length: MOCK_TEST_COUNT }, (_, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `Life in the UK Mock Test ${i + 1}`,
    url: `https://passtheuktest.co.uk/mock-test/${i + 1}`,
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

export default function MockTestIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Mock Tests', path: '/mock-test' }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-1">
            Life in the UK Mock Tests & Practice Exams
          </h1>
          <p className="text-sm text-ink-muted mb-4">
            45 free practice exams · 1,080 questions · real exam conditions
          </p>
          <div className="flex items-center gap-3 mb-5">
            <Link
              href="/mock-test/1"
              className="flex-1 py-3.5 bg-brand-500 hover:bg-brand-400 active:opacity-70 text-white text-sm font-bold rounded-xl text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Start Mock Test 1 →
            </Link>
            <ShareButton
              url="https://passtheuktest.co.uk/mock-test"
              title="Life in the UK Test — Free Mock Exams & Practice Tests 2026"
              text="45 free Life in the UK mock tests — pass first time with no sign-up needed! 🎯"
            />
          </div>
          <p className="text-xs text-ink-muted">Want to revise by chapter first? <Link href="/practice" className="text-brand-400 hover:text-brand-300">Practice questions by topic →</Link></p>
        </div>

        {/* Stats bar */}
        <div className="bg-card rounded-2xl p-3 border border-border mb-6 grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-xl font-bold font-mono text-ink">{MOCK_TEST_COUNT}</p>
            <p className="text-ink-muted text-xs mt-0.5">Free tests</p>
          </div>
          <div>
            <p className="text-xl font-bold font-mono text-ink">{EXAM_QUESTION_COUNT}</p>
            <p className="text-ink-muted text-xs mt-0.5">Questions</p>
          </div>
          <div>
            <p className="text-xl font-bold font-mono text-ink">45</p>
            <p className="text-ink-muted text-xs mt-0.5">Minutes</p>
          </div>
          <div>
            <p className="text-xl font-bold font-mono text-success">75%</p>
            <p className="text-ink-muted text-xs mt-0.5">Pass mark</p>
          </div>
        </div>

        {/* Personalised dashboard — shows readiness + next test for returning users */}
        <MockTestDashboard />

        {/* First-timer CTA — only shown when no tests done yet (dashboard returns null) */}
        <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-4 mb-6">
          <p className="font-semibold text-ink mb-1">New here? Start with Test 1</p>
          <p className="text-sm text-ink-muted mb-3">Work through the tests in order. Most people who pass first time score 20+ on at least 5 tests before booking.</p>
          <Link
            href="/mock-test/1"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 active:opacity-70 text-white text-sm font-semibold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Start Mock Test 1 →
          </Link>
        </div>

        {/* Recently Asked in 2026 Exams */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            <h2 className="text-sm font-semibold text-ink uppercase tracking-wide">Recently Asked in 2026 Exams</h2>
          </div>
          <p className="text-xs text-ink-muted mb-3">These practice tests contain questions reported by candidates who sat the real Life in the UK exam in 2026.</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { n: 3,  label: 'History & Key Dates Focus' },
              { n: 7,  label: 'Government & Parliament Focus' },
              { n: 12, label: 'British Values & Society Focus' },
              { n: 19, label: 'Patron Saints & Symbols Focus' },
              { n: 24, label: 'Inventions & Famous People Focus' },
            ].map(({ n, label }) => (
              <Link
                key={n}
                href={`/mock-test/${n}`}
                className="flex items-center justify-between bg-card border border-danger/20 hover:border-danger/40 rounded-xl px-4 py-3 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-danger/10 text-danger text-xs font-bold font-mono flex items-center justify-center flex-shrink-0">{n}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink group-hover:text-brand-400 transition-colors">Mock Test {n}</p>
                    <p className="text-xs text-ink-muted">{label}</p>
                  </div>
                </div>
                <span className="text-xs bg-danger/10 text-danger px-2 py-0.5 rounded-full font-medium flex-shrink-0">2026 Exam</span>
              </Link>
            ))}
          </div>
        </div>

        {/* All 45 tests grid */}
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">All 45 Free Mock Tests</h2>
        </div>

        {/* Test grid — shows pass/fail/score per test for returning users */}
        <MockTestGrid />

        {/* Why use these tests */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">Why use our Life in the UK mock tests?</h2>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Matches the real Life in the UK exam exactly</strong> — 24 questions, 45-minute countdown, same chapter distribution as the official test</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">1,080 unique practice questions</strong> — 45 Life in the UK mock exams with different questions every time so you never memorise patterns</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Instant detailed results</strong> — see every Life in the UK exam answer explained, not just your score</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">100% free Life in the UK test practice</strong> — no sign-up, no paywall, no premium tier</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Tracks your progress</strong> — readiness score, XP and streaks across every Life in the UK practice session</span></li>
          </ul>
        </div>

        {/* How to use */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">How to pass the Life in the UK test using mock exams</h2>
          <ol className="space-y-2 text-sm text-ink-muted list-none">
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span><span>Take your first Life in the UK practice exam cold — no revision. Your score shows exactly where to focus.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span><span>Read every explanation after each mock test — right or wrong. The explanations contain the exact facts the Life in the UK exam tests.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span><span>Use the <Link href="/cheat-sheet" className="text-brand-400 hover:text-brand-300">Life in the UK cheat sheet</Link> for weak areas — patron saints, key dates and inventions catch most people out.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span><span>Book your Life in the UK test when you consistently score 20+ out of 24 across multiple practice exams.</span></li>
          </ol>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-ink mb-4">Life in the UK mock test — frequently asked questions</h2>
          <div className="space-y-3">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-card rounded-xl p-4">
                <p className="font-semibold text-ink text-sm mb-1">{q}</p>
                <p className="text-sm text-ink-muted leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex gap-2 text-sm text-center">
          <Link href="/cheat-sheet" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Cheat Sheet
          </Link>
          <Link href="/faq" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            FAQ
          </Link>
          <Link href="/practice" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Practice
          </Link>
        </div>

      </div>
    </>
  )
}
