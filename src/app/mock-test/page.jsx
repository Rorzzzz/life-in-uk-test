import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { MOCK_TEST_COUNT, EXAM_QUESTION_COUNT } from '@/data/mockTests'
import MockTestDashboard from './MockTestDashboard'
import MockTestGrid from './MockTestGrid'
import ShareButton from '@/components/ui/ShareButton'

export const metadata = {
  title: { absolute: 'Life in the UK Mock Test — 45 Free Practice Exams 2026' },
  description: 'Take a free Life in the UK mock test — 45 full-length exams, 1,080 questions, 45-minute timer, instant results. No sign-up. Matches the real 2026 exam exactly.',
  alternates: { canonical: 'https://passtheuktest.co.uk/mock-test' },
  openGraph: {
    title: 'Life in the UK Mock Test — 45 Free Practice Exams 2026',
    description: 'Take a free Life in the UK mock test — 45 full-length exams, 1,080 questions, instant results. No sign-up. Matches the real 2026 exam exactly.',
    url: 'https://passtheuktest.co.uk/mock-test',
  },
  keywords: ['life in the uk mock test', 'life in the uk mock test 2026', 'free life in the uk mock test', 'life in the uk practice test', 'free life in the uk practice test', 'life in the uk mock exam', 'life in the uk test 2026', 'free life in the uk test'],
}

const FAQS = [
  { q: 'How many free Life in the UK mock tests are there?', a: 'There are 45 full-length practice exams, each with 24 unique questions — 1,080 practice questions in total. Every one is completely free with no sign-up required.' },
  { q: 'How similar is this to the real Life in the UK exam?', a: 'Each one mirrors the real exam format exactly — 24 questions, 45 minutes, pass mark of 18/24 (75%). Questions are drawn from all five handbook chapters in the same proportions as the official test.' },
  { q: 'How many mock tests should I do before the real Life in the UK test?', a: 'Most people who pass first time complete at least 5 full practice exams scoring above 20/24 consistently. If you are scoring 22 or more on every attempt, you are ready to book.' },
  { q: 'What is the pass mark for the Life in the UK test?', a: 'You need to answer 18 out of 24 questions correctly — that is 75%. You have 45 minutes to complete it.' },
  { q: 'Is this Life in the UK test practice completely free?', a: 'Yes — all 45 tests and practice exams are completely free. No sign-up, no paywall, no premium tier. Every one on this site is free forever.' },
  { q: 'Which Life in the UK practice test should I start with?', a: 'Start with Test 1 and work through them in order. By test 10 you will have a clear picture of which topics need more revision. Use the cheat sheet alongside your revision.' },
]

const quizSchema = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'Life in the UK Mock Test — 45 Free Practice Exams 2026',
  about: { '@type': 'Thing', name: 'Life in the UK Test' },
  educationalLevel: 'Citizenship test preparation',
  description: 'Free 24-question mock exam for the Life in the UK citizenship test, drawn from a bank of 1,080 questions across 45 full practice tests.',
  isAccessibleForFree: true,
  publisher: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  hasPart: Array.from({ length: MOCK_TEST_COUNT }, (_, i) => ({
    '@type': 'Quiz',
    name: `Life in the UK Mock Test ${i + 1}`,
    url: `https://passtheuktest.co.uk/mock-test/${i + 1}`,
    isAccessibleForFree: true,
  })),
}

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Mock Tests', path: '/mock-test' }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-1">
            Life in the UK Mock Test — 45 Free Practice Exams 2026
          </h1>
          <p className="text-sm text-ink-muted mb-4">
            45 free mock tests · 1,080 questions · real exam conditions · no sign-up
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-4">
            Take a free Life in the UK mock test — or call it a Life in the UK practice test, they&apos;re the same thing here — with no sign-up, no paywall, ever. Each of our 45 practice exams matches the real 2026 British citizenship test exactly: 24 multiple-choice questions, a 45-minute timer, and the same 75% pass mark. Every question is drawn from the official <em>Life in the United Kingdom: A Guide for New Residents</em> (3rd edition) handbook, with a full explanation shown the moment you answer — right or wrong — so every attempt doubles as a revision session. Start with Test 1 below, or jump straight to whichever one you need.
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
          <ul className="space-y-2 text-sm md:text-base text-ink-muted">
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Matches the real exam exactly</strong> — 24 questions, 45-minute countdown, same chapter distribution as the official test</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">1,080 unique practice questions</strong> — 45 full exams with different questions every time so you never memorise patterns</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Instant detailed results</strong> — see every answer explained, not just your score</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">100% free, always</strong> — no sign-up, no paywall, no premium tier</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Tracks your progress</strong> — readiness score, XP and streaks across every session</span></li>
          </ul>
        </div>

        {/* How realistic */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">How realistic is this Life in the UK mock test?</h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            Every one of our 45 free practice exams is built the same way the real one is structured, not just randomly pulled from a question pile. Each 24-question test is weighted to match the official handbook chapters in the same proportions the real exam uses:
          </p>
          <div className="overflow-hidden rounded-xl border border-border mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-raised">
                  <th className="text-left px-3 py-2 font-semibold text-ink">Handbook chapter</th>
                  <th className="text-right px-3 py-2 font-semibold text-ink">Questions per test</th>
                  <th className="text-right px-3 py-2 font-semibold text-ink">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['1 — Values &amp; principles', '2', '8%'],
                  ['2 — What is the UK?', '3', '13%'],
                  ['3 — A long &amp; illustrious history', '10', '42%'],
                  ['4 — A modern, thriving society', '5', '21%'],
                  ['5 — Government &amp; the law', '4', '17%'],
                ].map(([chapter, count, share]) => (
                  <tr key={chapter}>
                    <td className="px-3 py-2 text-ink-muted" dangerouslySetInnerHTML={{ __html: chapter }} />
                    <td className="px-3 py-2 text-right font-mono text-ink">{count}</td>
                    <td className="px-3 py-2 text-right font-mono text-ink-muted">{share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            That weighting is the part most free tests get wrong. History and government make up nearly 60% of every real exam, so a mock test that pulls questions at random — as most free ones do — over-samples the easy chapters and leaves you unprepared for the two that actually decide whether you pass.
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            The 24 questions in each mock test are also fixed and repeatable — Mock Test 7 always contains the same 24 questions, drawn from across our full bank of 570 unique questions. That means you can retake a test later to check whether a topic that tripped you up has actually sunk in, while still having 44 other full exams with completely different questions to work through.
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed">
            Combined with the same 45-minute countdown and 18/24 (75%) pass mark as the real test, this is as close as free online practice gets to sitting the actual citizenship exam — short of booking it. For the official rules on what to expect on the day, see our <Link href="/articles/life-in-the-uk-test-what-to-expect-on-the-day" className="text-brand-400 hover:text-brand-300">test day guide</Link>.
          </p>
        </div>

        {/* First-person authority — why these tests exist */}
        <div className="bg-card rounded-2xl p-5 mb-6 border-l-2 border-brand-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-sm font-bold text-brand-400 flex-shrink-0">R</div>
            <div>
              <p className="text-sm font-semibold text-ink leading-tight">Why I built these tests</p>
              <p className="text-xs text-ink-muted leading-tight">Rory Stephenson — passed the Life in the UK test, built this site</p>
            </div>
          </div>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            When I was revising for my own test, every free mock I could find had the same flaw: the questions were pulled at random, so one test would be half history and the next would barely touch it. That is not how the real exam works — the chapter split is fixed, and Chapter 3 alone is around 40% of it. Practising on random tests gave me a score that meant nothing.
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed">
            So I built these 45 the way I wished mine had been: each one weighted to the real exam&apos;s chapter split, fixed so you can retake the exact same test and see if a weak topic has actually improved, and every question explained the moment you answer. It is the tool I needed and could not find — free, with no sign-up, because a citizenship test should not sit behind a paywall. <Link href="/about" className="text-brand-400 hover:text-brand-300">More about why I made this →</Link>
          </p>
        </div>

        {/* How to use */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">How to pass the Life in the UK test using mock exams</h2>
          <ol className="space-y-2 text-sm md:text-base text-ink-muted list-none">
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span><span>Take your first practice exam cold — no revision. Your score shows exactly where to focus.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span><span>Read every explanation after each attempt — right or wrong. The explanations contain the exact facts the exam tests.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span><span>Use the <Link href="/cheat-sheet" className="text-brand-400 hover:text-brand-300">cheat sheet</Link> for weak areas — patron saints, key dates and inventions catch most people out.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span><span>Book your test when you consistently score 20+ out of 24 across multiple attempts.</span></li>
          </ol>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-ink mb-4">Life in the UK mock test — frequently asked questions</h2>
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
          <Link href="/practice" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Practice
          </Link>
        </div>

      </div>
    </>
  )
}
