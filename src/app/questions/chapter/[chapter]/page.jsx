import { notFound } from 'next/navigation'
import Link from 'next/link'
import { QUESTIONS, CHAPTERS } from '@/data/questions'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export async function generateStaticParams() {
  return CHAPTERS.map(c => ({ chapter: c.id.toString() }))
}

export async function generateMetadata({ params }) {
  const ch = CHAPTERS.find(c => c.id === parseInt(params.chapter))
  if (!ch) return {}
  const count = QUESTIONS.filter(q => q.chapter === ch.id).length
  return {
    title: { absolute: `${ch.title} — ${count} Life in the UK Test Questions & Answers` },
    description: `All ${count} free Life in the UK test questions and answers for "${ch.title}". Every question has a detailed explanation. No sign-up, updated for 2026.`,
    alternates: { canonical: `https://passtheuktest.co.uk/questions/chapter/${ch.id}` },
    keywords: [`${ch.title.toLowerCase()} life in the uk test`, 'life in the uk test questions', `life in the uk test chapter ${ch.id}`, `${ch.title.toLowerCase()} questions`],
    openGraph: {
      title: `${ch.title} — ${count} Life in the UK Test Questions`,
      description: `All ${count} free questions and answers for "${ch.title}".`,
      url: `https://passtheuktest.co.uk/questions/chapter/${ch.id}`,
      type: 'website',
    },
  }
}

export default function ChapterQuestionsPage({ params }) {
  const ch = CHAPTERS.find(c => c.id === parseInt(params.chapter))
  if (!ch) return notFound()

  const questions = QUESTIONS.filter(q => q.chapter === ch.id)
  const others = CHAPTERS.filter(c => c.id !== ch.id)

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${ch.title} — Life in the UK Test Questions & Answers`,
    description: `All ${questions.length} free Life in the UK test questions and answers for ${ch.title}.`,
    url: `https://passtheuktest.co.uk/questions/chapter/${ch.id}`,
    isPartOf: { '@type': 'WebSite', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'All Questions', path: '/questions' }, { name: ch.title, path: `/questions/chapter/${ch.id}` }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
          <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
          <span>/</span>
          <Link href="/questions" className="px-2 py-1 hover:text-ink rounded transition-colors">All Questions</Link>
          <span>/</span>
          <span className="px-2 py-1 text-ink">{ch.title}</span>
        </nav>

        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          {ch.title}
        </h1>
        <p className="text-base text-ink leading-relaxed mb-3">
          All {questions.length} free Life in the UK test questions and answers for <strong>{ch.title}</strong>. Every question is taken from the official handbook and comes with a detailed explanation.
        </p>
        <p className="text-sm text-ink-muted mb-6">
          <Link href={`/practice/${ch.id}`} className="text-brand-400 hover:text-brand-300">Practise this chapter interactively →</Link>
        </p>

        <ol className="space-y-1 mb-10">
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

        {/* Other chapters */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <p className="text-sm font-bold text-ink mb-3">Questions from other chapters</p>
          <div className="flex flex-col gap-1">
            {others.map(c => (
              <Link key={c.id} href={`/questions/chapter/${c.id}`} className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
                → {c.title} ({QUESTIONS.filter(q => q.chapter === c.id).length} questions)
              </Link>
            ))}
            <Link href="/questions" className="text-sm text-brand-400 hover:text-brand-300 transition-colors mt-2">→ Browse all {QUESTIONS.length} questions</Link>
          </div>
        </div>
      </div>
    </>
  )
}
