import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { MOCK_TEST_COUNT, EXAM_QUESTION_COUNT } from '@/data/mockTests'
import MockTestDashboard from '@/app/mock-test/MockTestDashboard'
import MockTestGrid from '@/app/mock-test/MockTestGrid'
import ShareButton from '@/components/ui/ShareButton'

export const metadata = {
  title: { absolute: 'Life in the UK Practice Test — 60 Free Tests 2026' },
  description: 'Free Life in the UK practice tests — 60 full-length tests, 767 questions, 45 minutes, 75% pass mark. Build confidence before your real test. No sign-up needed.',
  alternates: { canonical: 'https://passtheuktest.co.uk/practice-test' },
  openGraph: {
    title: 'Life in the UK Practice Test — 60 Free Tests 2026',
    description: 'Free Life in the UK practice tests — 60 full-length tests, 767 questions. Build confidence before your real test. No sign-up needed.',
    url: 'https://passtheuktest.co.uk/practice-test',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: [
    'life in the uk practice test',
    'life in the uk practice test free',
    'life in the uk practice test 2026',
    'uk citizenship test practice',
    'british citizenship test practice',
    'life in the uk test free',
    'life in the uk free practice test',
    'life in the uk test 2026 practice',
  ],
}

const FAQS = [
  { q: 'How many free Life in the UK practice tests are there?', a: `There are ${MOCK_TEST_COUNT} full-length practice tests, each with 24 questions drawn from a bank of ${EXAM_QUESTION_COUNT} unique questions. Every test is completely free with no sign-up required.` },
  { q: 'How should I use these practice tests to prepare?', a: 'Start with Practice Test 1 before you have done any revision — your score shows exactly where to focus. Then revise those weak areas using the cheat sheet or study guide, and return to a new practice test to measure improvement. Repeat until you are consistently scoring 20 or more out of 24.' },
  { q: 'Are these practice tests the same format as the real Life in the UK test?', a: 'Yes — every practice test matches the real exam exactly: 24 multiple-choice questions, 45 minutes, and a pass mark of 18 out of 24 (75%). Questions are weighted to the same chapter distribution as the official test, so the difficulty is realistic.' },
  { q: 'What topics do the Life in the UK practice tests cover?', a: 'Each practice test covers all five handbook chapters: British values and principles, what the UK is, a long and illustrious history, a modern thriving society, and UK government and law. History alone makes up around 40% of each test — the same as the real exam.' },
  { q: 'How many practice tests should I do before my real test?', a: 'Most people who pass first time complete at least 5 full practice tests scoring above 20 out of 24 consistently. When you are scoring 22 or more on every attempt, you are ready to book the official test.' },
  { q: 'What is the pass mark for the Life in the UK test?', a: 'You need to answer 18 out of 24 questions correctly — that is 75%. You have 45 minutes to complete the test. Each practice test here uses the exact same pass mark.' },
  { q: 'Are these Life in the UK practice tests free?', a: `Yes — all ${MOCK_TEST_COUNT} practice tests are completely free. No sign-up, no paywall, no premium tier. Every practice test on this site is free forever.` },
]

const quizSchema = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Life in the UK Practice Test — 60 Free Tests 2026',
  about: { '@type': 'Thing', name: 'Life in the UK Test' },
  educationalLevel: 'Citizenship test preparation',
  description: `Free 24-question practice test for the Life in the UK citizenship test, drawn from a bank of ${EXAM_QUESTION_COUNT} questions across ${MOCK_TEST_COUNT} full practice tests.`,
  isAccessibleForFree: true,
  publisher: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  hasPart: Array.from({ length: MOCK_TEST_COUNT }, (_, i) => ({
    '@type': 'Quiz',
    name: `Life in the UK Practice Test ${i + 1}`,
    url: `https://passtheuktest.co.uk/mock-test/${i + 1}`,
    isAccessibleForFree: true,
  })),
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `Life in the UK Practice Tests — ${MOCK_TEST_COUNT} Free Tests`,
  description: 'Free full-length practice tests for the Life in the UK citizenship test',
  numberOfItems: MOCK_TEST_COUNT,
  itemListElement: Array.from({ length: MOCK_TEST_COUNT }, (_, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `Life in the UK Practice Test ${i + 1}`,
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

export default function PracticeTestIndexPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Practice Test', path: '/practice-test' }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-1">
            Life in the UK Practice Test — {MOCK_TEST_COUNT} Free Tests 2026
          </h1>
          <p className="text-sm text-ink-muted mb-4">
            {MOCK_TEST_COUNT} free practice tests · {EXAM_QUESTION_COUNT} questions · official exam format · no sign-up
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-4">
            Our free Life in the UK practice tests are the most realistic way to prepare for your citizenship exam. Each practice test is 24 questions, 45 minutes, and built to the same chapter distribution as the real test — so the difficulty and topic mix you practice with is exactly what you will face on the day. With {MOCK_TEST_COUNT} full practice tests and {EXAM_QUESTION_COUNT} unique questions, you will never repeat the same test twice. Every question shows a full explanation the moment you answer, turning each practice test into a revision session as well as a performance check. Start below — free, no sign-up, no paywall.
          </p>
          <div className="flex items-center gap-3 mb-5">
            <Link
              href="/mock-test/1"
              className="flex-1 py-3.5 bg-brand-500 hover:bg-brand-400 active:opacity-70 text-white text-sm font-bold rounded-xl text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Start Practice Test 1 →
            </Link>
            <ShareButton
              url="https://passtheuktest.co.uk/practice-test"
              title="Life in the UK Practice Test — 60 Free Tests 2026"
              text={`${MOCK_TEST_COUNT} free Life in the UK practice tests — build confidence before your real test! 🎯`}
            />
          </div>
          <p className="text-xs text-ink-muted">
            Want timed exam conditions? Try our{' '}
            <Link href="/mock-test" className="text-brand-400 hover:text-brand-300">mock tests →</Link>
          </p>
        </div>

        {/* Stats bar */}
        <div className="bg-card rounded-2xl p-3 border border-border mb-6 grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-xl font-bold font-mono text-ink">{MOCK_TEST_COUNT}</p>
            <p className="text-ink-muted text-xs mt-0.5">Practice tests</p>
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

        {/* Personalised dashboard */}
        <MockTestDashboard />

        {/* Recently Asked */}
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
                    <p className="text-sm font-semibold text-ink group-hover:text-brand-400 transition-colors">Practice Test {n}</p>
                    <p className="text-xs text-ink-muted">{label}</p>
                  </div>
                </div>
                <span className="text-xs bg-danger/10 text-danger px-2 py-0.5 rounded-full font-medium flex-shrink-0">2026 Exam</span>
              </Link>
            ))}
          </div>
        </div>

        {/* All tests grid */}
        <div className="mb-2">
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">All {MOCK_TEST_COUNT} Free Practice Tests</h2>
        </div>

        <MockTestGrid />

        {/* Why use */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">Why use our Life in the UK practice tests?</h2>
          <ul className="space-y-2 text-sm md:text-base text-ink-muted">
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Build genuine confidence</strong> — each practice test shows you exactly which topics to focus on, so you study smarter not longer</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">{EXAM_QUESTION_COUNT} unique questions across {MOCK_TEST_COUNT} tests</strong> — never repeat the same practice test twice, keeping every session fresh</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Learn as you go</strong> — every question shows a full explanation the moment you answer, right or wrong</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Official format</strong> — 24 questions, 45-minute timer, 75% pass mark — identical to the real 2026 test</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Track your progress</strong> — readiness score updates across every practice test so you know when you are ready to book</span></li>
          </ul>
        </div>

        {/* How to use */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">How to use practice tests effectively</h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            Most people use practice tests the wrong way — they skip through quickly, check their score, and move on. The candidates who pass first time use them differently: they treat every explanation as revision material, not just feedback.
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            After each answer — right or wrong — read the explanation fully. The explanations contain the exact facts the real test pulls from. Over five or six practice tests, the facts that keep coming up are the ones worth memorising. Use the <Link href="/cheat-sheet" className="text-brand-400 hover:text-brand-300">cheat sheet</Link> alongside your practice for patron saints, key dates, and inventions — the three areas that account for the most wrong answers.
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed">
            Each practice test here is fixed — Practice Test 7 always contains the same 24 questions. That means you can retake a specific test later to confirm a weak topic has actually improved, while still having {MOCK_TEST_COUNT - 1} other tests with completely different questions to work through.
          </p>
        </div>

        {/* First-person authority */}
        <div className="bg-card rounded-2xl p-5 mb-6 border-l-2 border-brand-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-sm font-bold text-brand-400 flex-shrink-0">R</div>
            <div>
              <p className="text-sm font-semibold text-ink leading-tight">Why I built these practice tests</p>
              <p className="text-xs text-ink-muted leading-tight">Rory Stephenson — passed the Life in the UK test, built this site</p>
            </div>
          </div>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            Every free practice test I found when preparing for my own test pulled questions at random — so one test would be half history and the next would barely touch it. That is not how the real exam works. History is around 40% of every test, fixed. Practising on random questions gave me scores that meant nothing.
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed">
            So I built these practice tests the right way: each one weighted to the real exam&apos;s chapter split, with a full explanation after every answer, and completely free — no sign-up, no paywall. <Link href="/about" className="text-brand-400 hover:text-brand-300">More about why I made this →</Link>
          </p>
        </div>

        {/* Step-by-step */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">Step-by-step: how to prepare with practice tests</h2>
          <ol className="space-y-2 text-sm md:text-base text-ink-muted list-none">
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span><span>Take Practice Test 1 cold — no revision first. Your score reveals your starting point and exactly where to focus.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span><span>Read every explanation, even for correct answers — the explanations are the revision material, not a secondary feature.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span><span>Use the <Link href="/cheat-sheet" className="text-brand-400 hover:text-brand-300">cheat sheet</Link> for weak spots — patron saints, key dates and inventions catch most people out.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span><span>Book your test when you consistently score 20+ out of 24 across at least five practice tests.</span></li>
          </ol>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-ink mb-4">Life in the UK practice test — frequently asked questions</h2>
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
          <Link href="/cheat-sheet" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Cheat Sheet
          </Link>
          <Link href="/faq" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            FAQ
          </Link>
          <Link href="/mock-test" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Mock Tests
          </Link>
        </div>

      </div>
    </>
  )
}
