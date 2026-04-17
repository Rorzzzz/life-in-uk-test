import { notFound } from 'next/navigation'
import { CHAPTERS, getByChapter } from '@/data/questions'
import PracticeClient from './PracticeClient'

export async function generateStaticParams() {
  return CHAPTERS.map(ch => ({ chapter: ch.id.toString() }))
}

export async function generateMetadata({ params }) {
  const chapter = CHAPTERS.find(c => c.id === parseInt(params.chapter))
  if (!chapter) return {}
  return {
    title: `${chapter.title} Practice Questions — Free Life in the UK Test`,
    description: `Practice ${chapter.title} questions for your Life in the UK citizenship test. Free adaptive practice with instant explanations.`,
    alternates: { canonical: `https://passtheuktest.co.uk/practice/${params.chapter}` },
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PracticeClient chapter={chapter} questions={questions} />
    </>
  )
}
