import { notFound } from 'next/navigation'
import { CHAPTERS, getByChapter } from '@/data/questions'
import Link from 'next/link'
import PracticeClient from './PracticeClient'

const CHAPTER_SEO = {
  1: {
    title: 'Life in the UK Test British Values Questions — Free Practice with Answers 2026',
    metaDesc: 'Master the fundamental British values the test actually asks about. Free questions on democracy, rule of law, individual liberty and mutual respect — with full answers.',
  },
  2: {
    title: 'Life in the UK Test Geography & Nations Questions — Free Practice with Answers 2026',
    metaDesc: 'Know every capital, patron saint and national symbol before your test. Free practice questions on the four nations — with instant answers and explanations.',
  },
  3: {
    title: 'Life in the UK Test British History Questions — Free Practice with Answers 2026',
    metaDesc: 'Master every date, battle and monarch the test actually asks about. 250+ questions on British history — instant answers, full explanations, completely free.',
  },
  4: {
    title: 'Life in the UK Test Modern Society Questions — Free Practice with Answers 2026',
    metaDesc: 'Culture, sport, arts and inventions — the topics most people underestimate. Free practice questions on modern British society with instant answers.',
  },
  5: {
    title: 'Life in the UK Test Government & Law Questions — Free Practice with Answers 2026',
    metaDesc: 'Parliament, elections, courts and your rights — guaranteed to come up. Free practice questions on UK government and law with full answers and explanations.',
  },
}

export async function generateStaticParams() {
  return CHAPTERS.map(ch => ({ chapter: ch.id.toString() }))
}

export async function generateMetadata({ params }) {
  const chapterId = parseInt(params.chapter)
  const chapter   = CHAPTERS.find(c => c.id === chapterId)
  if (!chapter) return {}
  const seo       = CHAPTER_SEO[chapterId]
  return {
    title: seo.title,
    description: seo.metaDesc,
    alternates: { canonical: `https://passtheuktest.co.uk/practice/${params.chapter}` },
    openGraph: {
      title: seo.title,
      description: seo.metaDesc,
    },
  }
}

export default function PracticePage({ params }) {
  const chapterId = parseInt(params.chapter)
  const chapter   = CHAPTERS.find(c => c.id === chapterId)
  if (!chapter) return notFound()

  const questions = getByChapter(chapterId)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type':    'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://passtheuktest.co.uk' },
      { '@type': 'ListItem', position: 2, name: 'Practice', item: 'https://passtheuktest.co.uk/practice' },
      { '@type': 'ListItem', position: 3, name: chapter.title, item: `https://passtheuktest.co.uk/practice/${chapterId}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.slice(0, 10).map(q => ({
      '@type': 'Question',
      name: q.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${q.options[q.answer]}. ${q.explanation}`,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <PracticeClient chapter={chapter} questions={questions} />

      {/* Static question list — indexed by Google, gives each chapter page unique content */}
      <section className="max-w-2xl mx-auto px-4 pb-10">
        <div className="bg-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide mb-1">{chapter.title}</h2>
          <p className="text-xs text-ink-muted mb-4">{questions.length} questions in this chapter</p>
          <div className="space-y-2">
            {questions.map((q, i) => (
              <Link
                key={q.id}
                href={`/questions/${q.id}`}
                className="flex items-start gap-3 group hover:bg-raised rounded-xl p-2 -mx-2 transition-colors"
              >
                <span className="text-xs font-mono text-ink-muted w-5 flex-shrink-0 pt-0.5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-ink group-hover:text-brand-400 transition-colors leading-snug">{q.q}</p>
                  <p className="text-xs text-brand-400 mt-0.5">Answer: {q.options[q.answer]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
