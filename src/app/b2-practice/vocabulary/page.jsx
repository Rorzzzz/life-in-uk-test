import B2VocabClient from './B2VocabClient'

export const metadata = {
  title: 'B2 English Vocabulary Practice — 300 Free IELTS Questions',
  description: 'Free B2 vocabulary practice for IELTS and UK immigration. 300 questions covering words in context, word formation, collocations, phrasal verbs and academic vocabulary.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/vocabulary' },
}

export default function B2VocabPage() {
  return <B2VocabClient />
}
