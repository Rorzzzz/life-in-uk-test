import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { CHAPTERS, getByChapter } from '@/data/questions'

// Accurate one-line summaries of the 5 official handbook chapters — used for
// ItemList/Course structured data (the chapter rich-result carousel).
const CHAPTER_DESCRIPTIONS = {
  1: 'The fundamental principles and shared values of British life, and what it means to be a permanent resident or citizen of the UK.',
  2: 'The countries, capital cities, national flags and geography that make up the United Kingdom.',
  3: 'British history from the earliest times to the modern day — the key events, dates and figures the test covers.',
  4: 'Life in the UK today: the nations and regions, religion, customs, sport, arts, culture and leisure.',
  5: 'How the UK is governed, the legal system, and the rights and responsibilities of residents and citizens.',
}

export const metadata = {
  title: { absolute: 'Life in the UK Test Revision Questions — 767 Free Questions by Chapter' },
  description: 'Learn and revise for the Life in the UK test with 767 free questions by chapter. Adaptive practice, instant explanations, XP rewards. Master every topic before you sit the exam.',
  alternates: { canonical: 'https://passtheuktest.co.uk/practice' },
  openGraph: {
    title: 'Life in the UK Test Revision Questions — 767 Free Questions by Chapter',
    description: 'Adaptive revision for the Life in the UK test. 767 free questions by chapter with instant explanations.',
  },
}

export default function PracticePage() {
  const chapterStats = CHAPTERS.map(ch => ({
    ...ch,
    count: getByChapter(ch.id).length,
  }))

  // ItemList of the 5 chapters (each with a description) — drives the chapter
  // rich-result carousel in Bing/Google.
  const chaptersSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Life in the UK Test Chapters',
    description: 'The five chapters of the Life in the UK test, based on the official Life in the United Kingdom handbook.',
    itemListElement: CHAPTERS.map((ch, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: ch.title,
      description: CHAPTER_DESCRIPTIONS[ch.id],
      url: `https://passtheuktest.co.uk/practice/${ch.id}`,
    })),
  }

  // Course schema — accurate entity data (free, self-paced, 5 chapters).
  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Life in the UK Test Practice',
    description: 'Free practice for the Life in the UK citizenship test, organised into the five chapters of the official handbook. 767 questions with instant explanations.',
    provider: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
    isAccessibleForFree: true,
    about: CHAPTERS.map(ch => ch.title),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(chaptersSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Practice', path: '/practice' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-1">Life in the UK Revision Questions</h1>
      <p className="text-ink-muted text-base mb-4">767 free questions by chapter — learn and revise at your own pace with instant explanations.</p>
      <p className="text-sm text-ink-muted mb-2">Ready to simulate the real exam? <Link href="/mock-test" className="text-brand-400 hover:text-brand-300">Take a timed mock test →</Link></p>
      <p className="text-sm text-ink-muted mb-6">Prefer to read? <Link href="/questions" className="text-brand-400 hover:text-brand-300">Browse all 767 questions and answers →</Link></p>

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
