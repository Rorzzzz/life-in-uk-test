import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import QuestionStatsBadge from '@/components/ui/QuestionStatsBadge'
import { QUESTIONS } from '@/data/questions'

export const metadata = {
  title: 'Hardest Life in the UK Test Questions — 50 Most Difficult',
  description: 'The 50 hardest Life in the UK test questions, covering specific dates, statistics, arts and culture. Master these and you\'ll pass.',
  alternates: { canonical: 'https://passtheuktest.co.uk/hardest-questions' },
  openGraph: {
    title: 'Hardest Life in the UK Test Questions — 50 Most Difficult',
    description: 'The 50 hardest Life in the UK test questions. Master these and you will pass first time.',
    url: 'https://passtheuktest.co.uk/hardest-questions',
    type: 'website',
  },
}

export default function HardestQuestionsPage() {
  const hard = QUESTIONS.filter(q => q.difficulty === 'hard').slice(0, 50)
  const medium = QUESTIONS.filter(q => q.difficulty === 'medium').slice(0, 20)
  const questions = [...hard, ...medium].slice(0, 50)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hardest Life in the UK Test Questions',
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
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Hardest Questions', path: '/hardest-questions' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">Hardest Life in the UK Test Questions</h1>
        <p className="text-ink-muted text-base mb-2">
          These 50 questions are the ones candidates most commonly get wrong. They cover specific dates, statistics, arts and culture — areas where the handbook gives precise facts that are easy to misremember under exam conditions.
        </p>
        <p className="text-sm text-ink-muted mb-6">
          Difficulty is based on tagging in our question bank: <span className="text-danger font-medium">hard</span> questions require exact recall of a number, name or date; <span className="text-xp font-medium">medium</span> questions test concepts that are commonly confused. Master these first, then take a <Link href="/mock-test" className="text-brand-400 hover:text-brand-300">mock test</Link> to confirm your readiness.
        </p>

        <div className="space-y-3">
          {questions.map((q, i) => (
            <Link key={q.id} href={`/questions/${q.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl">
              <div className="bg-card rounded-xl p-4 hover:bg-raised active:opacity-70 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono text-ink-muted w-6 flex-shrink-0 pt-0.5">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-ink mb-1">{q.q}</p>
                    <p className="text-sm text-success">✓ {q.options[q.answer]}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      q.difficulty === 'hard' ? 'bg-danger/10 text-danger' : 'bg-xp/10 text-xp'
                    }`}>
                      {q.difficulty}
                    </span>
                    <QuestionStatsBadge questionId={q.id} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Practice Tests</p>
          <div className="flex flex-wrap gap-2">
            {[3, 8, 14, 22].map(n => (
              <Link key={n} href={`/mock-test/${n}`} className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Mock Test {n}</Link>
            ))}
            <Link href="/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">All Mock Tests →</Link>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
            {[
              { slug: 'british-history', title: 'British History', colour: '#a855f7' },
              { slug: 'uk-law',          title: 'UK Law & Rights', colour: '#f59e0b' },
            ].map(t => (
              <Link key={t.slug} href={`/topic/${t.slug}`} className="px-3 py-1.5 text-sm rounded-lg border transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ borderColor: `${t.colour}44`, color: t.colour, backgroundColor: `${t.colour}11` }}>{t.title}</Link>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          <Link href="/practice" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Practice all questions</Link>
          <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Cheat Sheet</Link>
          <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">FAQ</Link>
        </div>
      </div>
    </>
  )
}
