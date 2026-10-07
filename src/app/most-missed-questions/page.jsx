import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import QuestionStatsBadge from '@/components/ui/QuestionStatsBadge'
import { QUESTIONS } from '@/data/questions'
import { MOST_MISSED_IDS } from '@/data/mostMissed'

export const metadata = {
  title: 'Most Commonly Failed Life in the UK Test Questions — Study These First',
  description: 'The questions that candidates fail most often in the Life in the UK test. Study these before anything else to avoid the most common mistakes.',
  alternates: { canonical: 'https://passtheuktest.co.uk/most-missed-questions' },
  openGraph: {
    title: 'Most Commonly Failed Life in the UK Test Questions',
    description: 'The questions candidates fail most often. Study these first to avoid the most common mistakes in the Life in the UK test.',
    url: 'https://passtheuktest.co.uk/most-missed-questions',
    type: 'website',
  },
}

export default function MostMissedPage() {
  const idSet = new Set(MOST_MISSED_IDS)
  const questions = QUESTIONS.filter(q => idSet.has(q.id))

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Most Commonly Failed Life in the UK Test Questions',
    numberOfItems: questions.length,
    itemListElement: questions.map((q, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: q.q,
      url: `https://passtheuktest.co.uk/questions/${q.id}`,
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Most Missed Questions', path: '/most-missed-questions' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">Most Commonly Failed Life in the UK Test Questions</h1>
        <p className="text-ink-muted text-base mb-2">
          These {questions.length} questions are the ones candidates fail most often in the Life in the UK test. They cover areas where the official handbook buries specific facts that are easy to overlook — exact years, legislation names, and statistics.
        </p>
        <p className="text-sm text-ink-muted mb-6">
          Study these before anything else. Click any question to see the full explanation, then take a <Link href="/mock-test" className="text-brand-400 hover:text-brand-300">free mock test</Link> to see if you have them locked in.
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
                  <QuestionStatsBadge questionId={q.id} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex gap-2 justify-center flex-wrap">
          <Link href="/mock-test" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Mock Tests</Link>
          <Link href="/weak-spots" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Your weak spots</Link>
          <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Cheat Sheet</Link>
          <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">FAQ</Link>
        </div>
      </div>
    </>
  )
}
