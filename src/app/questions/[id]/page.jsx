import { notFound } from 'next/navigation'
import { QUESTIONS, getById, CHAPTERS } from '@/data/questions'
import { TOPICS } from '@/data/topics'
import Link from 'next/link'

// Deterministic: spread 4 tests across the 45 available based on question ID
function getRelatedTests(id) {
  const set = new Set()
  for (let i = 1; set.size < 4; i++) {
    set.add(((id * 7 + i * 13) % 45) + 1)
  }
  return [...set]
}

// Find 2 topics most relevant to this question by tag overlap
function getRelatedTopics(question) {
  return TOPICS
    .map(t => ({ ...t, overlap: question.tags.filter(tag => t.tags.includes(tag)).length }))
    .filter(t => t.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap)
    .slice(0, 2)
}

export async function generateStaticParams() {
  return QUESTIONS.map(q => ({ id: q.id.toString() }))
}

export async function generateMetadata({ params }) {
  const q = getById(parseInt(params.id))
  if (!q) return {}
  const shortQ = q.q.length > 55 ? q.q.slice(0, 55) + '...' : q.q
  return {
    title: `${shortQ} — Life in the UK Test`,
    description: `Answer: ${q.options[q.answer]}. ${q.explanation.slice(0, 120)}`,
    openGraph: {
      title:       shortQ,
      description: q.explanation.slice(0, 150),
    },
    alternates: { canonical: `https://passtheuktest.co.uk/questions/${params.id}` },
  }
}

export default function QuestionPage({ params }) {
  const question = getById(parseInt(params.id))
  if (!question) return notFound()

  const chapter = CHAPTERS.find(c => c.id === question.chapter)

  // Related questions (same chapter, nearby IDs)
  const related = QUESTIONS
    .filter(q => q.chapter === question.chapter && q.id !== question.id)
    .slice(0, 4)

  const relatedTests  = getRelatedTests(question.id)
  const relatedTopics = getRelatedTopics(question)

  const quizSchema = {
    '@context':   'https://schema.org',
    '@type':      'Quiz',
    name:         question.q,
    description:  question.explanation,
    educationalLevel: 'beginner',
    about: { '@type': 'Thing', name: chapter?.title ?? 'Life in the UK Test' },
    hasPart: [{
      '@type':          'Question',
      text:             question.q,
      suggestedAnswer:  question.options
        .filter((_, i) => i !== question.answer)
        .map(opt => ({ '@type': 'Answer', text: opt })),
      acceptedAnswer: {
        '@type': 'Answer',
        text:    question.options[question.answer],
        comment: { '@type': 'Comment', text: question.explanation },
      },
    }],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',            item: 'https://passtheuktest.co.uk' },
      { '@type': 'ListItem', position: 2, name: chapter?.title ?? 'Practice', item: `https://passtheuktest.co.uk/practice/${question.chapter}` },
      { '@type': 'ListItem', position: 3, name: `Question ${question.id}`, item: `https://passtheuktest.co.uk/questions/${question.id}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
          <Link href="/" className="px-2 py-1 hover:text-ink active:opacity-70 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Home</Link>
          <span>/</span>
          <Link href={`/practice/${chapter?.id}`} className="px-2 py-1 hover:text-ink active:opacity-70 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">{chapter?.title}</Link>
          <span>/</span>
          <span className="px-2 py-1 text-ink">Q{question.id}</span>
        </nav>

        {/* Question */}
        <div className="bg-card rounded-2xl p-6 mb-4">
          <span className="inline-block text-xs font-medium text-brand-400 uppercase tracking-wide mb-3">
            {chapter?.title}
          </span>
          <h1 className="text-xl font-display font-bold text-ink mb-6">
            {question.q}
          </h1>

          {/* Options */}
          <div className="space-y-2 mb-6">
            {question.options.map((opt, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-xl border-2 p-4 ${
                  i === question.answer
                    ? 'border-success/50 bg-success/5'
                    : 'border-border bg-raised'
                }`}
              >
                <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold font-mono ${
                  i === question.answer ? 'bg-success text-white' : 'bg-card text-ink-muted'
                }`}>
                  {['A','B','C','D'][i]}
                </span>
                <span className={`text-base leading-snug mt-0.5 ${i === question.answer ? 'font-semibold text-ink' : 'text-ink-muted'}`}>
                  {opt}
                  {i === question.answer && ' ✓'}
                </span>
              </div>
            ))}
          </div>

          {/* Explanation */}
          <div className="bg-raised rounded-xl p-4">
            <p className="text-xs font-medium text-brand-400 uppercase tracking-wide mb-1">Explanation</p>
            <p className="text-base text-ink leading-relaxed">{question.explanation}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <span className="text-xs bg-raised px-3 py-1 rounded-full text-ink-muted">
            {question.difficulty}
          </span>
          {question.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-raised px-3 py-1 rounded-full text-ink-muted">
              {tag}
            </span>
          ))}
        </div>

        {/* Practice CTA */}
        <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-4 mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-ink text-sm">Test yourself on this topic</p>
            <p className="text-xs text-ink-muted">Earn XP and track your progress</p>
          </div>
          <Link
            href={`/practice/${question.chapter}`}
            className="px-4 py-3 bg-brand-500 text-white rounded-xl text-sm font-semibold whitespace-nowrap hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Practice →
          </Link>
        </div>

        {/* Practice Tests */}
        <div className="bg-card rounded-2xl p-4 mb-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Practice Tests</p>
          <div className="flex flex-wrap gap-2">
            {relatedTests.map(n => (
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
          {relatedTopics.length > 0 && (
            <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
              {relatedTopics.map(t => (
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

        {/* Utility links */}
        <div className="flex flex-wrap gap-1 mb-6">
          {[
            { href: '/cheat-sheet',       label: 'Cheat Sheet' },
            { href: '/faq',               label: 'FAQ' },
            { href: '/hardest-questions', label: 'Hardest Questions' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="px-3 py-2 text-xs text-brand-400 hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              {label}
            </Link>
          ))}
        </div>

        {/* Related questions */}
        {related.length > 0 && (
          <div>
            <h2 className="font-semibold text-ink mb-3">More questions from this chapter</h2>
            <div className="space-y-2">
              {related.map(q => (
                <Link
                  key={q.id}
                  href={`/questions/${q.id}`}
                  className="block bg-card rounded-xl p-3 hover:bg-raised active:opacity-70 transition-colors text-base text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {q.q}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
