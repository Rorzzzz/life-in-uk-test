import B2WritingClient from './B2WritingClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: 'B2 Writing Practice Free — AI Feedback on IELTS Letters & Essays',
  description: 'Free B2 writing practice with instant AI examiner feedback. 30 IELTS General Training prompts — Task 1 letters and Task 2 essays. Band score and improvement tips.',
  alternates: { canonical: 'https://passtheuktest.co.uk/b2-practice/writing' },
  openGraph: {
    title: 'B2 Writing Practice Free — AI Feedback on IELTS Letters & Essays',
    description: 'Write a response, get instant AI examiner feedback. 30 IELTS prompts, band score, model answers.',
    url: 'https://passtheuktest.co.uk/b2-practice/writing',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'B2 English Writing Practice with AI Feedback',
  description: 'Free B2 writing practice for IELTS General Training. Write responses to real prompts and receive instant AI examiner feedback with band score estimate.',
  provider: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
  isAccessibleForFree: true,
  about: ['B2 English writing', 'IELTS General Training', 'UK immigration', 'ILR English requirement'],
}

export default function B2WritingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: 'B2 Practice', path: '/b2-practice' },
        { name: 'Writing', path: '/b2-practice/writing' },
      ]} />
      <B2WritingClient />
    </>
  )
}
