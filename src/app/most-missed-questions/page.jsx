import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { QUESTIONS } from '@/data/questions'
import { MOST_MISSED_IDS } from '@/data/mostMissed'

export const metadata = {
  title: 'Most Commonly Failed Life in the UK Test Questions',
  description: 'The questions that candidates fail most often in the Life in the UK test. Study these to avoid the most common mistakes.',
  alternates: { canonical: 'https://passtheuktest.co.uk/most-missed-questions' },
}

export default function MostMissedPage() {
  const idSet = new Set(MOST_MISSED_IDS)
  const questions = QUESTIONS.filter(q => idSet.has(q.id))

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Most Missed Questions', path: '/most-missed-questions' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">Most Missed Questions</h1>
      <p className="text-ink-muted text-base mb-6">
        {questions.length} questions commonly failed in the Life in the UK test.
      </p>

      <div className="space-y-3">
        {questions.map((q, i) => (
          <Link key={q.id} href={`/questions/${q.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl">
            <div className="bg-card rounded-xl p-4 hover:bg-raised active:opacity-70 transition-colors">
              <div className="flex items-start gap-3">
                <span className="text-xs font-mono text-ink-muted w-6 flex-shrink-0 pt-0.5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium text-ink mb-1">{q.q}</p>
                  <p className="text-sm text-success">✓ {q.options[q.answer]}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex gap-2 justify-center flex-wrap">
        <Link href="/weak-spots" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Your weak spots</Link>
        <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Cheat Sheet</Link>
      </div>
    </div>
    </>
  )
}
