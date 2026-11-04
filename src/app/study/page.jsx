import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { STUDY_CHAPTERS } from '@/data/studyGuide'
import { CHAPTERS } from '@/data/questions'
import ContentAd from '@/components/ui/ContentAd'

export const metadata = {
  title: 'Life in the UK Test Study Guide 2026 — All Chapters, Free',
  description: 'Free study guide covering all chapters of the official Life in the UK handbook. Key facts, dates and people — everything you need to pass your citizenship test.',
  alternates: { canonical: 'https://passtheuktest.co.uk/study' },
}

export default function StudyPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Study Guide', path: '/study' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-1">Study Guide</h1>
      <p className="text-ink-muted text-base mb-6">
        All 5 chapters of the official handbook, summarised for quick revision.
      </p>

      <div className="flex flex-col gap-3">
        {STUDY_CHAPTERS.map(ch => {
          const chData = CHAPTERS.find(c => c.id === ch.id)
          return (
            <Link key={ch.id} href={`/study/${ch.slug}`} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
              <div className="bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-raised active:opacity-70 transition-colors">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold font-mono text-lg flex-shrink-0"
                  style={{ backgroundColor: `${chData?.colour ?? '#3381ff'}22`, color: chData?.colour ?? '#3381ff' }}
                >
                  {ch.id}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-ink">{ch.title}</p>
                  <p className="text-xs text-ink-muted">{ch.sections.length} sections</p>
                </div>
                <span className="text-ink-muted">→</span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Real guidance text with the ad inside it, never against the links (2026-11-04) */}
      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-display font-bold text-ink">How to use the study guide</h2>
        <p className="text-base text-ink-muted leading-relaxed">
          The study guide summarises each of the five chapters of the official handbook in plain English. Read one chapter, then practise that chapter straight away while it is fresh. Short daily sessions work better than long ones, because you remember more when you come back to the same facts over several days.
        </p>
      </section>
      <ContentAd id="1" />
      <section className="space-y-3 mb-8">
        <h2 className="text-lg font-display font-bold text-ink">When are you ready to book?</h2>
        <p className="text-base text-ink-muted leading-relaxed">
          You are ready when you can pass full mock tests comfortably, not just once but several times in a row. Aim for 20 or more out of 24, which gives you a safety margin above the pass mark of 18. Use the cheat sheet for a final review of dates, numbers and names the day before your test.
        </p>
      </section>

      <div className="mt-6 flex gap-3 justify-center">
        <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          Key Facts Cheat Sheet →
        </Link>
      </div>
    </div>
    </>
  )
}
