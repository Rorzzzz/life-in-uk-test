import B2SpeakingClient from './B2SpeakingClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Speaking Practice Free — Record & Get Examiner Feedback',
  description: 'Free B2 speaking practice for UK settlement. Record your answers to IELTS-style questions and get instant examiner feedback with band score. All browsers supported.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/speaking' },
  openGraph: {
    title: 'B2 Speaking Practice Free — Record & Get Examiner Feedback',
    description: 'Record your spoken answers to IELTS Part 1, 2 and 3 questions. Instant examiner feedback with band score.',
    url: 'https://passtheuktest.co.uk/b2-practice/speaking',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Speaking Practice with Examiner Feedback',
  description: 'Free B2 speaking practice for IELTS General Training. Record spoken responses to real prompts and receive instant examiner feedback with band score estimate.',
  provider: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  about: ['B2 English speaking', 'IELTS General Training', 'UK immigration', 'ILR English requirement'],
}

export default function B2SpeakingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Speaking', path: '/b2-practice/speaking' },
      ]} />
      <B2SpeakingClient />
    </>
  )
}
