import { notFound } from 'next/navigation'
import Link from 'next/link'
import B2MockTestClient from './B2MockTestClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { B2_MOCK_TESTS, B2_MOCK_TEST_COUNT, getB2MockTest } from '@/data/b2MockTests'
import { B2_LISTENING_TASKS } from '@/data/b2Listening'
import { B2_READING_PASSAGES } from '@/data/b2Reading'
import { B2_VOCAB_QUESTIONS } from '@/data/b2Vocabulary'
import { B2_GRAMMAR_QUESTIONS } from '@/data/b2Grammar'
import { B2_WRITING_TASKS } from '@/data/b2Writing'
import { B2_SPEAKING_TASKS } from '@/data/b2Speaking'

export async function generateStaticParams() {
  return B2_MOCK_TESTS.map(t => ({ number: t.number.toString() }))
}

export async function generateMetadata({ params }) {
  const n = parseInt(params.number)
  if (n < 1 || n > B2_MOCK_TEST_COUNT) return {}
  const test = getB2MockTest(n)
  return {
    title: { absolute: `B2 English Mock Test ${n} — Free Practice Exam | PassTheUKTest` },
    description: `Take B2 English Mock Test ${n} free — 20 questions covering listening, reading, vocabulary and grammar. ${test.focus}. Pass mark 14/20 (70%). No sign-up.`,
    alternates: { canonical: `https://passtheuktest.co.uk/b2-practice/mock-test/${n}` },
    openGraph: {
      title: `B2 English Mock Test ${n} — Free Practice Exam`,
      description: `Free B2 English mock test — 20 questions, 25 minutes, listening + reading + vocabulary + grammar. ${test.focus}.`,
      url: `https://passtheuktest.co.uk/b2-practice/mock-test/${n}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function getRelatedTests(n) {
  const others = []
  for (let i = 1; others.length < 3; i++) {
    const candidate = ((n + i - 1) % B2_MOCK_TEST_COUNT) + 1
    if (candidate !== n) others.push(candidate)
  }
  return others
}

export default function B2MockTestPage({ params }) {
  const n = parseInt(params.number)
  if (n < 1 || n > B2_MOCK_TEST_COUNT) return notFound()

  const testData       = getB2MockTest(n)
  const listeningClip  = B2_LISTENING_TASKS.find(t => t.id === testData.listeningClipId)
  const readingPassage = B2_READING_PASSAGES.find(p => p.id === testData.readingPassageId)
  const vocabQuestions = testData.vocabIds.map(id => B2_VOCAB_QUESTIONS.find(q => q.id === id)).filter(Boolean)
  const grammarQuestions = testData.grammarIds.map(id => B2_GRAMMAR_QUESTIONS.find(q => q.id === id)).filter(Boolean)
  const writingTask    = B2_WRITING_TASKS.find(t => t.id === testData.writingTaskId)
  const speakingTask   = B2_SPEAKING_TASKS.find(t => t.id === testData.speakingTaskId)

  if (!listeningClip || !readingPassage || vocabQuestions.length < 6 || grammarQuestions.length < 6 || !writingTask || !speakingTask) {
    return notFound()
  }

  const relatedTests = getRelatedTests(n)

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: `B2 English Mock Test ${n} — Free Practice Exam`,
    about: { '@type': 'Thing', name: 'B2 English Language Test for UK Settlement' },
    educationalLevel: 'B2 CEFR',
    description: `Free 20-question B2 English mock test covering listening, reading, vocabulary and grammar. ${testData.focus}.`,
    isAccessibleForFree: true,
    publisher: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'B2 Mock Tests', path: '/b2-practice/mock-test' },
        { name: `Mock Test ${n}`, path: `/b2-practice/mock-test/${n}` },
      ]} />

      <B2MockTestClient
        testData={testData}
        listeningClip={listeningClip}
        readingPassage={readingPassage}
        vocabQuestions={vocabQuestions}
        grammarQuestions={grammarQuestions}
        writingTask={writingTask}
        speakingTask={speakingTask}
      />

      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">More B2 Mock Tests</p>
          <div className="flex flex-wrap gap-2">
            {relatedTests.map(t => (
              <Link
                key={t}
                href={`/b2-practice/mock-test/${t}`}
                className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors"
              >
                Mock Test {t}
              </Link>
            ))}
            <Link
              href="/b2-practice/mock-test"
              className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors"
            >
              All B2 mock tests →
            </Link>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
            <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Writing</Link>
            <Link href="/b2-practice/speaking" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Speaking</Link>
            <Link href="/b2-practice/listening" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Listening</Link>
          </div>
        </div>
      </div>
    </>
  )
}
