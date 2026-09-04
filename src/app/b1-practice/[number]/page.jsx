import { notFound } from 'next/navigation'
import { B1_PRACTICE_TESTS, B1_TEST_NUMBERS } from '@/data/b1Questions'
import B1PracticeClient from './B1PracticeClient'

export async function generateStaticParams() {
  return B1_TEST_NUMBERS.map(n => ({ number: n.toString() }))
}

export async function generateMetadata({ params }) {
  const num = parseInt(params.number)
  if (!B1_TEST_NUMBERS.includes(num)) return {}

  const titles = {
    1: 'B1 English Practice Test 1 — Free 15 Questions 2026',
    2: 'B1 English Practice Test 2 — Free 15 Questions 2026',
    3: 'B1 English Practice Test 3 — Free 15 Questions 2026',
    4: 'B1 English Practice Test 4 — Free 15 Questions 2026',
  }

  const descriptions = {
    1: 'Free B1 English practice test 1. 15 questions: vocabulary, grammar and reading comprehension. For ILR and UK citizenship. No sign-up. Instant results.',
    2: 'Free B1 English practice test 2. 15 questions covering consent, deport, passive voice and citizenship ceremony reading passage. No sign-up required.',
    3: 'Free B1 English practice test 3. 15 questions including vocabulary like "provisional" and "naturalisation", and a passage on 2026 English level rule changes.',
    4: 'Free B1 English practice test 4. 15 advanced questions: discretionary, statutory, third conditional and indirect questions. For ILR and citizenship.',
  }

  return {
    title: titles[num],
    description: descriptions[num],
    alternates: { canonical: `https://passtheuktest.co.uk/b1-practice/${num}` },
    openGraph: {
      title: titles[num],
      description: descriptions[num],
      url: `https://passtheuktest.co.uk/b1-practice/${num}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function B1PracticePage({ params }) {
  const num = parseInt(params.number)
  const questions = B1_PRACTICE_TESTS[num]

  if (!questions) return notFound()

  return (
    <B1PracticeClient
      questions={questions}
      testNumber={num}
      totalTests={B1_TEST_NUMBERS.length}
    />
  )
}
