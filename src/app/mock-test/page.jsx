import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { MOCK_TEST_COUNT, EXAM_QUESTION_COUNT } from '@/data/mockTests'

export const metadata = {
  title: 'Life in the UK Mock Tests 2026 — 45 Free Full Practice Exams',
  description: `Practice with ${MOCK_TEST_COUNT} full mock tests for the Life in the UK citizenship test. 24 questions, 45 minutes, pass mark 18/24. Free.`,
  alternates: { canonical: 'https://passtheuktest.co.uk/mock-test' },
}

export default function MockTestIndexPage() {
  const tests = Array.from({ length: MOCK_TEST_COUNT }, (_, i) => i + 1)

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Mock Tests', path: '/mock-test' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">Mock Tests</h1>
        <p className="text-ink-muted">
          {MOCK_TEST_COUNT} full practice tests · {EXAM_QUESTION_COUNT} questions each · 45 minutes · Pass mark: 18/24
        </p>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border mb-6 flex gap-6 text-sm">
        <div className="text-center">
          <p className="text-2xl font-bold font-mono text-ink">{MOCK_TEST_COUNT}</p>
          <p className="text-ink-muted text-xs mt-0.5">Tests</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-mono text-ink">{EXAM_QUESTION_COUNT}</p>
          <p className="text-ink-muted text-xs mt-0.5">Questions</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-mono text-ink">45</p>
          <p className="text-ink-muted text-xs mt-0.5">Minutes</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold font-mono text-success">75%</p>
          <p className="text-ink-muted text-xs mt-0.5">Pass mark</p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
        {tests.map(n => (
          <Link
            key={n}
            href={`/mock-test/${n}`}
            className="bg-card border border-border rounded-xl p-4 flex flex-col items-center gap-1 hover:border-brand-500 hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <span className="text-xs text-ink-muted font-mono">Test</span>
            <span className="text-xl font-bold font-mono text-ink">{n}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex gap-4 text-sm text-center">
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
