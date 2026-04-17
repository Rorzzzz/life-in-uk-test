import { notFound } from 'next/navigation'
import { STUDY_CHAPTERS, getChapterBySlug } from '@/data/studyGuide'
import { CHAPTERS } from '@/data/questions'
import { TOPICS } from '@/data/topics'
import Link from 'next/link'

// Deterministic mock test spread for a chapter page
function getChapterTests(chapterId) {
  const set = new Set()
  for (let i = 1; set.size < 4; i++) {
    set.add(((chapterId * 11 + i * 17) % 45) + 1)
  }
  return [...set]
}

// Topics relevant to each chapter (hand-mapped for quality)
const CHAPTER_TOPICS = {
  1: ['british-values', 'uk-law'],
  2: ['geography', 'immigration-citizenship'],
  3: ['british-history', 'famous-people'],
  4: ['uk-government', 'british-values'],
  5: ['nhs-welfare', 'arts-literature', 'sport', 'inventions-science', 'religion-culture'],
}

export async function generateStaticParams() {
  return STUDY_CHAPTERS.map(ch => ({ chapter: ch.slug }))
}

export async function generateMetadata({ params }) {
  const ch = getChapterBySlug(params.chapter)
  if (!ch) return {}
  return {
    title: `${ch.title} — Life in the UK Test Study Notes 2026`,
    description: `Study notes for ${ch.title} — Life in the UK citizenship test. Key facts, dates, people and explanations to help you pass.`,
    alternates: { canonical: `https://passtheuktest.co.uk/study/${params.chapter}` },
  }
}

export default function StudyChapterPage({ params }) {
  const ch = getChapterBySlug(params.chapter)
  if (!ch) return notFound()
  const chData    = CHAPTERS.find(c => c.id === ch.id)
  const testNums  = getChapterTests(ch.id)
  const topicSlugs = (CHAPTER_TOPICS[ch.id] ?? []).slice(0, 2)
  const topics    = topicSlugs.map(slug => TOPICS.find(t => t.slug === slug)).filter(Boolean)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://passtheuktest.co.uk' },
      { '@type': 'ListItem', position: 2, name: 'Study Guide', item: 'https://passtheuktest.co.uk/study' },
      { '@type': 'ListItem', position: 3, name: ch.title,      item: `https://passtheuktest.co.uk/study/${params.chapter}` },
    ],
  }

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <div className="max-w-2xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-ink-muted mb-6">
        <Link href="/study" className="px-2 py-1 hover:text-ink active:opacity-70 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Study Guide</Link>
        <span>/</span>
        <span className="text-ink">{ch.title}</span>
      </nav>

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono"
          style={{ backgroundColor: `${chData?.colour ?? '#3381ff'}22`, color: chData?.colour ?? '#3381ff' }}
        >
          {ch.id}
        </div>
        <h1 className="text-2xl font-display font-bold text-ink">{ch.title}</h1>
      </div>

      <p className="text-ink-muted mb-8">{ch.intro}</p>

      {/* Sections */}
      <div className="space-y-6">
        {ch.sections.map((section, i) => (
          <div key={i} className="bg-card rounded-2xl p-5">
            <h2 className="font-display font-bold text-ink mb-3">{section.heading}</h2>
            <div className="text-base text-ink-muted leading-relaxed whitespace-pre-line space-y-1">
              {section.content.split('\n').map((line, j) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={j} className="font-semibold text-ink">{line.replace(/\*\*/g, '')}</p>
                }
                if (line.startsWith('• ')) {
                  return <p key={j} className="flex gap-2"><span className="text-brand-400 flex-shrink-0">•</span><span>{line.slice(2)}</span></p>
                }
                return line ? <p key={j}>{line}</p> : <span key={j} />
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-6 flex gap-3">
        <Link
          href={`/practice/${ch.id}`}
          className="flex-1 py-3 bg-brand-500 text-white rounded-xl font-semibold text-center hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Practice Chapter {ch.id} →
        </Link>
        <Link href="/cheat-sheet" className="px-4 py-3 bg-card rounded-xl font-semibold text-ink text-center hover:bg-raised active:opacity-70 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          Cheat Sheet
        </Link>
      </div>

      {/* Mock tests + topics */}
      <div className="mt-6 bg-card rounded-2xl p-4">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Practice Tests</p>
        <div className="flex flex-wrap gap-2">
          {testNums.map(n => (
            <Link
              key={n}
              href={`/mock-test/${n}`}
              className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Mock Test {n}
            </Link>
          ))}
          <Link
            href="/mock-test"
            className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            All 45 tests →
          </Link>
        </div>
        {topics.length > 0 && (
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
            {topics.map(t => (
              <Link
                key={t.slug}
                href={`/topic/${t.slug}`}
                className="px-3 py-1.5 text-sm rounded-lg border transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                style={{ borderColor: `${t.colour}44`, color: t.colour, backgroundColor: `${t.colour}11` }}
              >
                {t.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  )
}
