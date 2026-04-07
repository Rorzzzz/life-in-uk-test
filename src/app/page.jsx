import { CHAPTERS } from '@/data/questions'
import HomeDashboard from './HomeDashboard'

export const metadata = {
  title: 'Free Life in the UK Test Practice 2026 — Pass the UK Test',
  description: 'Practice for your Life in the UK citizenship test with 570 free questions, adaptive learning, and gamified revision. Pass first time.',
  alternates: { canonical: 'https://passtheuktest.co.uk' },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:       'Pass the UK Test',
  url:        'https://passtheuktest.co.uk',
  logo:       'https://passtheuktest.co.uk/icon.svg',
  sameAs:     [],
}

const websiteSchema = {
  '@context':        'https://schema.org',
  '@type':           'WebSite',
  name:              'Pass the UK Test',
  url:               'https://passtheuktest.co.uk',
  potentialAction: {
    '@type':       'SearchAction',
    target:        'https://passtheuktest.co.uk/questions/{search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      {/* sr-only H1 for SEO — visual heading is in HomeDashboard */}
      <h1 className="sr-only">Free Life in the UK Test Practice 2026 — Pass First Time</h1>
      <HomeDashboard chapters={CHAPTERS} />
    </>
  )
}
