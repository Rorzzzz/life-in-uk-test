import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { MOCK_TEST_COUNT, EXAM_QUESTION_COUNT } from '@/data/mockTests'
import MockTestDashboard from '@/app/mock-test/MockTestDashboard'
import MockTestGrid from '@/app/mock-test/MockTestGrid'
import ShareButton from '@/components/ui/ShareButton'

export const metadata = {
  title: { absolute: 'British Citizenship Test — 60 Free Practice Tests 2026' },
  description: 'Free British citizenship test practice — 60 full tests, 767 questions, 75% pass mark. Also called the Life in the UK Test. No sign-up, no paywall.',
  alternates: { canonical: 'https://passtheuktest.co.uk/british-citizenship-test' },
  openGraph: {
    title: 'British Citizenship Test — 60 Free Practice Tests 2026',
    description: 'Free British citizenship test practice — 60 full tests, 767 questions. Also called the Life in the UK Test. No sign-up.',
    url: 'https://passtheuktest.co.uk/british-citizenship-test',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  keywords: [
    'british citizenship test',
    'british citizenship test practice',
    'british citizenship test free',
    'british citizenship test 2026',
    'british citizenship test mock',
    'british citizenship test questions',
    'uk citizenship test',
    'uk citizenship test practice',
    'uk citizenship test free',
    'citizenship test uk',
  ],
}

const FAQS = [
  { q: 'What is the British citizenship test?', a: 'The British citizenship test is officially called the "Life in the UK Test". It is a 24-question multiple-choice test that you must pass to apply for Indefinite Leave to Remain (ILR) or British citizenship by naturalisation. The test costs £50, takes 45 minutes, and has a pass mark of 75% (18 correct out of 24). It is administered by PSI Services at approved test centres across the UK.' },
  { q: 'Who needs to take the British citizenship test?', a: 'You need to pass the Life in the UK Test if you are applying for Indefinite Leave to Remain (ILR) on most visa routes, or if you are applying for British citizenship by naturalisation. Exemptions apply if you are aged 65 or over, have a qualifying long-term physical or mental condition, or are a national of a majority English-speaking country.' },
  { q: 'What does the British citizenship test cover?', a: 'The test covers five chapters from the official handbook "Life in the United Kingdom: A Guide for New Residents": British values and principles, what the UK is, a long and illustrious history (the largest section at around 40% of the test), a modern thriving society, and UK government and law.' },
  { q: 'What is the pass mark for the British citizenship test?', a: 'You need to answer 18 out of 24 questions correctly — that is 75%. You have 45 minutes. If you fail, you can rebook after 7 days. There is no limit to the number of attempts.' },
  { q: 'How do I book the British citizenship test?', a: 'Book directly at gov.uk/life-in-the-uk-test. The test costs £50 and is available at over 60 approved test centres across England, Scotland, Wales and Northern Ireland.' },
  { q: 'How hard is the British citizenship test?', a: 'The pass rate is around 70–75% on first attempt. Most people who fail do so on history questions — Chapter 3 makes up around 40% of every test and covers dates, inventions, famous people and historical events. Practising with full-length tests and using a cheat sheet for key facts significantly improves your chances.' },
  { q: 'Are these practice tests free?', a: `Yes — all ${MOCK_TEST_COUNT} practice tests are completely free. No sign-up, no paywall, no premium tier. Every test on this site is free forever.` },
]

const quizSchema = {
  '@context': 'https://schema.org',
  '@type': 'Quiz',
  name: 'British Citizenship Test — 60 Free Practice Tests 2026',
  about: { '@type': 'Thing', name: 'Life in the UK Test' },
  educationalLevel: 'British citizenship test preparation',
  description: `Free 24-question British citizenship test practice, also known as the Life in the UK Test. ${MOCK_TEST_COUNT} full practice tests drawn from a bank of ${EXAM_QUESTION_COUNT} questions.`,
  isAccessibleForFree: true,
  publisher: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  hasPart: Array.from({ length: MOCK_TEST_COUNT }, (_, i) => ({
    '@type': 'Quiz',
    name: `British Citizenship Test Practice ${i + 1}`,
    url: `https://passtheuktest.co.uk/mock-test/${i + 1}`,
    isAccessibleForFree: true,
  })),
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `British Citizenship Test — ${MOCK_TEST_COUNT} Free Practice Tests`,
  description: 'Free full-length British citizenship test practice (Life in the UK Test)',
  numberOfItems: MOCK_TEST_COUNT,
  itemListElement: Array.from({ length: MOCK_TEST_COUNT }, (_, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `British Citizenship Test Practice ${i + 1}`,
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

export default function BritishCitizenshipTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'British Citizenship Test', path: '/british-citizenship-test' }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-1">
            British Citizenship Test — {MOCK_TEST_COUNT} Free Practice Tests 2026
          </h1>
          <p className="text-sm text-ink-muted mb-4">
            {MOCK_TEST_COUNT} free tests · {EXAM_QUESTION_COUNT} questions · official format · no sign-up
          </p>

          {/* What is it callout */}
          <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-4 mb-4">
            <p className="text-sm font-semibold text-ink mb-1">What is the British citizenship test?</p>
            <p className="text-sm text-ink-muted leading-relaxed">
              The British citizenship test is officially called the <strong className="text-ink">Life in the UK Test</strong>. It is a 24-question multiple-choice exam you must pass to apply for Indefinite Leave to Remain (ILR) or British citizenship by naturalisation. It costs £50 at an official test centre — our practice tests here are completely free.
            </p>
          </div>

          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-4">
            Our free British citizenship test practice covers all five chapters of the official handbook in the same proportions as the real exam. History alone makes up around 40% of the British citizenship test — the section most people underestimate. With {MOCK_TEST_COUNT} full practice tests and {EXAM_QUESTION_COUNT} unique questions, you can prepare thoroughly without paying the £50 booking fee until you are ready. Every question shows a full explanation the moment you answer.
          </p>

          <div className="flex items-center gap-3 mb-5">
            <Link
              href="/mock-test/1"
              className="flex-1 py-3.5 bg-brand-500 hover:bg-brand-400 active:opacity-70 text-white text-sm font-bold rounded-xl text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Start Free Practice Test →
            </Link>
            <ShareButton
              url="https://passtheuktest.co.uk/british-citizenship-test"
              title="British Citizenship Test — 60 Free Practice Tests 2026"
              text="Free British citizenship test practice — 60 full tests, no sign-up needed! 🇬🇧"
            />
          </div>
          <p className="text-xs text-ink-muted">
            Also try:{' '}
            <Link href="/practice-test" className="text-brand-400 hover:text-brand-300">practice tests →</Link>
            {' '}·{' '}
            <Link href="/mock-test" className="text-brand-400 hover:text-brand-300">mock tests →</Link>
          </p>
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

        {/* Personalised dashboard */}
        <MockTestDashboard />

        {/* Recently Asked */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-danger animate-pulse" />
            <h2 className="text-sm font-semibold text-ink uppercase tracking-wide">Recently Asked in 2026 Exams</h2>
          </div>
          <p className="text-xs text-ink-muted mb-3">These citizenship test practice tests contain questions reported by candidates who sat the real Life in the UK exam in 2026.</p>
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
                    <p className="text-sm font-semibold text-ink group-hover:text-brand-400 transition-colors">Citizenship Test {n}</p>
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
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">All {MOCK_TEST_COUNT} Free British Citizenship Test Practice Tests</h2>
        </div>

        <MockTestGrid />

        {/* What the test covers */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">What does the British citizenship test cover?</h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            The British citizenship test draws questions from the official handbook across five chapters. The weighting is fixed — every test has the same topic split:
          </p>
          <div className="overflow-hidden rounded-xl border border-border mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-raised">
                  <th className="text-left px-3 py-2 font-semibold text-ink">Topic</th>
                  <th className="text-right px-3 py-2 font-semibold text-ink">Questions</th>
                  <th className="text-right px-3 py-2 font-semibold text-ink">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ['Values &amp; principles', '2', '8%'],
                  ['What is the UK?', '3', '13%'],
                  ['A long &amp; illustrious history', '10', '42%'],
                  ['A modern, thriving society', '5', '21%'],
                  ['Government &amp; the law', '4', '17%'],
                ].map(([topic, count, share]) => (
                  <tr key={topic}>
                    <td className="px-3 py-2 text-ink-muted" dangerouslySetInnerHTML={{ __html: topic }} />
                    <td className="px-3 py-2 text-right font-mono text-ink">{count}</td>
                    <td className="px-3 py-2 text-right font-mono text-ink-muted">{share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed">
            History is the biggest section by far — 10 of 24 questions. Most people who fail the British citizenship test do so because they underestimate how much history it covers. Dates, inventions, patron saints and famous people make up the bulk of it. Use the <Link href="/cheat-sheet" className="text-brand-400 hover:text-brand-300">cheat sheet</Link> to lock these in before your test.
          </p>
        </div>

        {/* How to pass */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">How to pass the British citizenship test first time</h2>
          <ol className="space-y-2 text-sm md:text-base text-ink-muted list-none">
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span><span>Take a practice test cold to see your starting point — no revision first. Your score shows exactly where to focus.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span><span>Read every explanation after each question — right or wrong. The explanations are the actual revision material.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span><span>Use the <Link href="/cheat-sheet" className="text-brand-400 hover:text-brand-300">cheat sheet</Link> for history — patron saints, key dates and inventions account for more failures than any other section.</span></li>
            <li className="flex items-start gap-3"><span className="w-5 h-5 rounded-full bg-brand-500/20 text-brand-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span><span>Book your test at gov.uk/life-in-the-uk-test when you consistently score 20 or more out of 24 across multiple practice tests.</span></li>
          </ol>
        </div>

        {/* First-person authority — E-E-A-T */}
        <div className="bg-card rounded-2xl p-5 mb-6 border-l-2 border-brand-500">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-sm font-bold text-brand-400 flex-shrink-0">R</div>
            <div>
              <p className="text-sm font-semibold text-ink leading-tight">Why I built this</p>
              <p className="text-xs text-ink-muted leading-tight">Rory Stephenson — passed the Life in the UK test, built this site</p>
            </div>
          </div>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            I searched for &ldquo;British citizenship test&rdquo; myself before my own test and found nothing but sites charging £10–£15 to access practice questions — or free versions so old they still referenced the 2013 handbook. The test costs £50 to sit and there is no limit on how many times you can fail and rebook; I found that out because I nearly failed the first time, having used inadequate practice material.
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed">
            So I built this: {MOCK_TEST_COUNT} full citizenship test practice tests, every question matched to the real chapter weighting, completely free with no sign-up. The £50 test fee is a significant cost — you should not also have to pay to prepare for it. <Link href="/about" className="text-brand-400 hover:text-brand-300">More about why I made this →</Link>
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-6">
          <h2 className="font-display font-bold text-ink mb-4">British citizenship test — frequently asked questions</h2>
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
          <Link href="/practice-test" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Practice Tests
          </Link>
        </div>

      </div>
    </>
  )
}
