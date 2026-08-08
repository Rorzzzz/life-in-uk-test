import Link from 'next/link'
import { QUESTIONS, CHAPTERS } from '@/data/questions'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

const TOTAL = QUESTIONS.length

export async function generateMetadata() {
  return {
    title: { absolute: `Life in the UK Test Questions & Answers — All ${TOTAL} Free Questions` },
    description: `Browse all ${TOTAL} free Life in the UK test questions and answers, grouped by handbook chapter. Every question has a detailed explanation. No sign-up, updated for 2026.`,
    alternates: { canonical: 'https://passtheuktest.co.uk/questions' },
    keywords: ['life in the uk test questions', 'life in the uk test questions and answers', 'life in the uk test practice questions', 'life in the uk questions by chapter', 'free life in the uk test questions'],
    openGraph: {
      title: `Life in the UK Test Questions & Answers — All ${TOTAL} Free Questions`,
      description: `Browse all ${TOTAL} free Life in the UK test questions and answers by chapter. Every question has a detailed explanation.`,
      url: 'https://passtheuktest.co.uk/questions',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function QuestionsIndexPage() {
  const byChapter = CHAPTERS.map(ch => ({
    chapter: ch,
    questions: QUESTIONS.filter(q => q.chapter === ch.id),
  }))

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Life in the UK Test Questions & Answers — All ${TOTAL} Questions`,
    description: `All ${TOTAL} free Life in the UK test questions and answers, grouped by handbook chapter.`,
    url: 'https://passtheuktest.co.uk/questions',
    isPartOf: { '@type': 'WebSite', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'All Questions', path: '/questions' }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2">
          Life in the UK Test Questions &amp; Answers
        </h1>
        <p className="text-base text-ink leading-relaxed mb-3">
          Browse all {TOTAL} free Life in the UK test questions, grouped by handbook chapter. Every question has the correct answer and a detailed explanation, drawn from the official <em>Life in the United Kingdom: A Guide for New Residents</em> handbook. No sign-up, no paywall.
        </p>
        <p className="text-sm text-ink-muted leading-relaxed mb-6">
          Prefer to practise interactively? Use <Link href="/practice" className="text-brand-400 hover:text-brand-300">adaptive practice by chapter</Link> or take a <Link href="/mock-test" className="text-brand-400 hover:text-brand-300">free timed mock test</Link>.
        </p>

        {/* Chapter jump nav */}
        <nav aria-label="Jump to chapter" className="flex flex-wrap gap-2 mb-8">
          {byChapter.map(({ chapter, questions }) => (
            <a key={chapter.id} href={`#chapter-${chapter.id}`} className="px-3 py-1.5 text-sm bg-card border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">
              {chapter.title} <span className="text-ink-muted">({questions.length})</span>
            </a>
          ))}
        </nav>

        {byChapter.map(({ chapter, questions }) => (
          <section key={chapter.id} id={`chapter-${chapter.id}`} className="mb-10 scroll-mt-20">
            <h2 className="text-lg font-display font-bold text-ink mb-1">{chapter.title}</h2>
            <p className="text-sm text-ink-muted mb-4">{questions.length} questions · <Link href={`/practice/${chapter.id}`} className="text-brand-400 hover:text-brand-300">Practise this chapter →</Link></p>
            <ol className="space-y-1">
              {questions.map(q => (
                <li key={q.id}>
                  <Link
                    href={`/questions/${q.id}`}
                    className="block py-2 px-3 -mx-1 rounded-lg text-sm text-ink-muted hover:text-ink hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {q.q}
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}

        <div className="bg-card border border-border rounded-2xl p-5 mt-4">
          <p className="text-sm font-bold text-ink mb-3">Keep preparing</p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/practice', label: 'Practice by chapter' },
              { href: '/mock-test', label: '60 free mock tests' },
              { href: '/hardest-questions', label: 'Hardest questions' },
              { href: '/cheat-sheet', label: 'Cheat sheet' },
              { href: '/tools', label: 'Free immigration tools' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-brand-400 hover:text-brand-300 hover:border-brand-500/40 transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
