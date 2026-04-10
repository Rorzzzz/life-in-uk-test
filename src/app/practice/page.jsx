import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { CHAPTERS, getByChapter } from '@/data/questions'

export const metadata = {
  title: 'Practice Tests — Pass the UK Test',
  description: 'Practice Life in the UK test questions by chapter. Instant feedback, explanations, and XP rewards. Free adaptive practice.',
  alternates: { canonical: 'https://passtheuktest.co.uk/practice' },
}

export default function PracticePage() {
  const chapterStats = CHAPTERS.map(ch => ({
    ...ch,
    count: getByChapter(ch.id).length,
  }))

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Practice', path: '/practice' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-1">Practice</h1>
      <p className="text-ink-muted text-base mb-6">Choose a chapter to practise, and start your adaptive learning session.</p>

      <div className="flex flex-col gap-3">
        {chapterStats.map(ch => (
          <Link key={ch.id} href={`/practice/${ch.id}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
            <div className="bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-raised active:opacity-70 transition-colors">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold font-mono flex-shrink-0"
                style={{ backgroundColor: `${ch.colour}22`, color: ch.colour }}
              >
                {ch.id}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-ink">{ch.title}</p>
                <p className="text-xs text-ink-muted">{ch.count} questions</p>
              </div>
              <div className="text-ink-muted">→</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link href="/daily" className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-4 text-center hover:bg-brand-500/20 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          <p className="text-2xl mb-1">📅</p>
          <p className="font-semibold text-ink text-base">Daily 5</p>
          <p className="text-sm text-ink-muted">Spaced repetition</p>
        </Link>
        <Link href="/weak-spots" className="bg-danger/10 border border-danger/30 rounded-2xl p-4 text-center hover:bg-danger/20 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          <p className="text-2xl mb-1">🎯</p>
          <p className="font-semibold text-ink text-base">Weak Spots</p>
          <p className="text-sm text-ink-muted">Fix what you miss</p>
        </Link>
      </div>
    </div>
    </>
  )
}
