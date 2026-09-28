import B2ReadingClient from './B2ReadingClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Reading Practice Free — IELTS General Training Passages',
  description: 'Free B2 reading practice for IELTS and UK settlement. Passages with comprehension questions — everyday texts, workplace documents and general articles.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/reading' },
  openGraph: {
    title: 'B2 Reading Practice Free — IELTS General Training Passages',
    description: 'Free B2 reading comprehension practice aligned to IELTS General Training. 3 sections, 15 passages.',
    url: 'https://passtheuktest.co.uk/b2-practice/reading',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Reading Practice',
  description: 'Free B2 reading comprehension practice aligned to IELTS General Training format. Covers everyday texts, workplace documents and general articles.',
  provider: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  about: ['B2 English reading', 'IELTS General Training', 'UK immigration', 'ILR English requirement'],
}

export default function B2ReadingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Reading', path: '/b2-practice/reading' },
      ]} />
      <B2ReadingClient />
    </>
  )
}
