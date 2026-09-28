import B2GrammarClient from './B2GrammarClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Grammar Practice Free — 200 IELTS Questions for UK Visa',
  description: 'Free B2 grammar practice for IELTS and UK immigration. 200 questions — conditionals, passive voice, reported speech, modal verbs and linking words.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/grammar' },
  openGraph: {
    title: 'B2 Grammar Practice Free — 200 IELTS Questions for UK Visa',
    description: 'Free B2 grammar practice for IELTS and UK immigration. 200 questions across 5 grammar areas.',
    url: 'https://passtheuktest.co.uk/b2-practice/grammar',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Grammar Practice',
  description: 'Free B2 grammar practice questions aligned to IELTS General Training format. Covers conditionals, passive voice, reported speech, modal verbs, and linking words.',
  provider: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  numberOfCredits: 200,
  about: ['B2 English grammar', 'IELTS grammar', 'UK immigration', 'ILR English requirement'],
}

export default function B2GrammarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Grammar', path: '/b2-practice/grammar' },
      ]} />
      <B2GrammarClient />
    </>
  )
}
