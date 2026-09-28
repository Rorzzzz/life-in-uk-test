import B2GrammarClient from './B2GrammarClient'

export const metadata = {
  title: 'B2 English Grammar Practice — 200 Free IELTS Questions',
  description: 'Free B2 grammar practice for IELTS and UK immigration. 200 questions covering conditionals, passive voice, reported speech, modal verbs and linking words.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/grammar' },
}

export default function B2GrammarPage() {
  return <B2GrammarClient />
}
