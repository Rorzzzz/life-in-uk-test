import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { MOCK_TEST_COUNT, EXAM_QUESTION_COUNT } from '@/data/mockTests'
import MockTestDashboard from './MockTestDashboard'
import MockTestGrid from './MockTestGrid'

export const metadata = {
  title: { absolute: 'Free Life in the UK Mock Tests 2026 — 45 Full-Length Practice Exams' },
  description: 'The closest thing to sitting the real test. 45 free full-length Life in the UK mock exams — 24 questions, 45-minute timer, instant results. No sign-up, no paywall.',
  alternates: { canonical: 'https://passtheuktest.co.uk/mock-test' },
  openGraph: {
    title: 'Free Life in the UK Mock Tests 2026 — 45 Full-Length Practice Exams',
    description: '45 free full-length mock exams for the Life in the UK citizenship test. 24 questions, timed, instant results.',
    url: 'https://passtheuktest.co.uk/mock-test',
  },
}

const FAQS = [
  { q: 'How many free mock tests are there?', a: '45 full-length mock tests, each with 24 unique questions — 1,080 practice questions in total. All completely free with no sign-up required.' },
  { q: 'Are these mock tests similar to the real Life in the UK test?', a: 'Yes. Each mock test mirrors the real exam format exactly — 24 questions, 45 minutes, pass mark of 18/24 (75%). Questions are drawn from all five handbook chapters in the same proportions as the real test.' },
  { q: 'How many mock tests should I do before the real test?', a: 'Most people who pass first time complete at least 5 mock tests scoring above 20/24 consistently. If you are scoring 22 or more on every test, you are ready.' },
  { q: 'What is the pass mark for the Life in the UK test?', a: 'You need to answer 18 out of 24 questions correctly — that is 75%. You have 45 minutes to complete the test.' },
  { q: 'Can I retake the mock tests as many times as I want?', a: 'Yes — all 45 tests are free and unlimited. Each test uses a fixed set of 24 questions so you can track your improvement over multiple attempts.' },
  { q: 'Which mock test should I start with?', a: 'Start with Mock Test 1 and work through them in order. By test 10 you will have a clear picture of which topics need more revision. Use the cheat sheet alongside your practice.' },
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
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2">
            Life in the UK Mock Tests
          </h1>
          <p className="text-base text-ink-muted">
            45 full-length free practice exams — the closest thing to sitting the real test
          </p>
        </div>

        {/* Stats bar */}
        <div className="bg-card rounded-2xl p-4 border border-border mb-6 grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-2xl font-bold font-mono text-ink">{MOCK_TEST_COUNT}</p>
            <p className="text-ink-muted text-xs mt-0.5">Free tests</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-ink">{EXAM_QUESTION_COUNT}</p>
            <p className="text-ink-muted text-xs mt-0.5">Questions</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-ink">45</p>
            <p className="text-ink-muted text-xs mt-0.5">Minutes</p>
          </div>
          <div>
            <p className="text-2xl font-bold font-mono text-success">75%</p>
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

        {/* Test grid — shows pass/fail/score per test for returning users */}
        <MockTestGrid />

        {/* Why use these tests */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">Why use these mock tests?</h2>
          <ul className="space-y-2 text-sm text-ink-muted">
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Matches the real exam exactly</strong> — 24 questions, 45-minute countdown, same chapter distribution as the official test</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">1,080 unique questions</strong> — 45 tests with different questions each time so you never memorise patterns</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Instant detailed results</strong> — see every answer explained, not just your score</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Completely free</strong> — no sign-up, no paywall, no premium tier</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Tracks your progress</strong> — XP, streaks and mastery scores across every session</span></li>
          </ul>
        </div>

        {/* How to use */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">How to use these tests effectively</h2>
          <ol className="space-y-2 text-sm text-ink-muted list-none">
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span><span>Do your first test cold — no revision. Your score tells you exactly where to focus.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span><span>Read every explanation — right or wrong. The explanations contain the facts the test wants you to know.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span><span>Use the <Link href="/cheat-sheet" className="text-brand-400 hover:text-brand-300">cheat sheet</Link> for weak areas — patron saints, key dates and inventions catch most people out.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span><span>Book your test when you consistently score 20+ out of 24. Don&apos;t book earlier.</span></li>
          </ol>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-ink mb-4">Frequently asked questions</h2>
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
