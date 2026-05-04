import B1CheckClient from './B1CheckClient'

export async function generateMetadata() {
  return {
    title: 'B1 English Level Check — Are You Ready for the UK Visa Test?',
    description: 'Check your B1 English level with 15 practice questions. Vocabulary, grammar and reading comprehension — find out if you are ready to book your official B1 test.',
    alternates: { canonical: 'https://passtheuktest.co.uk/b1-check' },
    openGraph: {
      title: 'B1 English Level Check — Are You Ready for the UK Visa Test?',
      description: 'Check your B1 English level with 15 practice questions. Vocabulary, grammar and reading comprehension — find out if you are ready to book your official B1 test.',
      url: 'https://passtheuktest.co.uk/b1-check',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default function B1CheckPage() {
  return <B1CheckClient />
}
