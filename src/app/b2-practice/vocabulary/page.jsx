import B2VocabClient from './B2VocabClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Vocabulary Practice Free — 300 IELTS Questions for UK Visa',
  description: 'Free B2 vocabulary practice for IELTS and UK immigration. 300 questions — words in context, word formation, collocations, phrasal verbs and academic vocabulary.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/vocabulary' },
  openGraph: {
    title: 'B2 Vocabulary Practice Free — 300 IELTS Questions for UK Visa',
    description: 'Free B2 vocabulary practice for IELTS and UK immigration. 300 questions across 5 categories.',
    url: 'https://passtheuktest.co.uk/b2-practice/vocabulary',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Vocabulary Practice',
  description: 'Free B2 vocabulary practice questions aligned to IELTS General Training format. Covers words in context, word formation, collocations, phrasal verbs, and academic vocabulary.',
  provider: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  numberOfCredits: 300,
  about: ['B2 English', 'IELTS vocabulary', 'UK immigration', 'ILR English requirement'],
}

export default function B2VocabPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Vocabulary', path: '/b2-practice/vocabulary' },
      ]} />
      <B2VocabClient />
    </>
  )
}
