import B2ListeningClient from './B2ListeningClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Listening Practice Free — IELTS Audio Comprehension Questions',
  description: 'Free B2 listening practice for UK settlement. Listen to IELTS-style audio clips and answer comprehension questions. All four sections covered. Works in all browsers.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/listening' },
  openGraph: {
    title: 'B2 Listening Practice Free — IELTS Audio Comprehension Questions',
    description: 'Listen to IELTS-style audio clips and answer comprehension questions. Sections 1-4 covered. Free, works in all browsers.',
    url: 'https://passtheuktest.co.uk/b2-practice/listening',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Listening Practice',
  description: 'Free B2 listening practice for IELTS General Training. Listen to audio clips and answer comprehension questions across all four IELTS listening sections.',
  provider: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  about: ['B2 English listening', 'IELTS General Training', 'UK immigration', 'ILR English requirement'],
}

export default function B2ListeningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Listening', path: '/b2-practice/listening' },
      ]} />
      <B2ListeningClient />
    </>
  )
}
