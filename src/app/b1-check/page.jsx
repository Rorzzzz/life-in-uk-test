import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import RelatedTools from '@/components/ui/RelatedTools'
import B1CheckClient from './B1CheckClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'B1 English Level Check — Free Practice Test for UK Citizenship 2026',
    description: 'Free B1 English level check for ILR and UK citizenship. 15 questions, instant results. Also try our 4 full B1 practice tests — 60 questions total. No sign-up needed.',
    alternates: { canonical: 'https://passtheuktest.co.uk/b1-check' },
    keywords: ['b1 english test practice free', 'b1 english level check', 'free b1 english test online', 'trinity gese grade 5 practice test', 'ielts life skills b1 practice test', 'languagecert b1 practice test', 'b1 english test for uk citizenship', 'b1 english requirement for ilr'],
    openGraph: {
      title: 'B1 English Level Check — Free Practice Test for UK Citizenship 2026',
      description: 'Free B1 English level check for ILR and UK citizenship. 15 questions, instant results. Also try our 4 full B1 practice tests — 60 questions total. No sign-up needed.',
      url: 'https://passtheuktest.co.uk/b1-check',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the B1 English requirement for UK citizenship?',
      acceptedAnswer: { '@type': 'Answer', text: 'To apply for British citizenship by naturalisation, you must prove English speaking and listening ability at B1 level on the CEFR scale. You must pass a UKVI-approved B1 test such as Trinity GESE Grade 5, IELTS Life Skills B1, or LANGUAGECERT B1, unless you are exempt. B1 remains the requirement for citizenship — it has not changed.' },
    },
    {
      '@type': 'Question',
      name: 'Has the English requirement changed for ILR in 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'From 8 January 2026, Skilled Worker visa applications (new grants) require B2 English. For ILR settlement, B1 remains the requirement until 26 March 2027. British citizenship still requires B1.' },
    },
    {
      '@type': 'Question',
      name: 'Which English tests are accepted for UK citizenship?',
      acceptedAnswer: { '@type': 'Answer', text: 'Accepted tests include Trinity College London GESE Grade 5, IELTS Life Skills B1, and LANGUAGECERT B1. All must be taken with a UKVI-approved provider.' },
    },
    {
      '@type': 'Question',
      name: 'Can I be exempt from the English requirement for UK citizenship?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Exemptions apply if you hold a Skilled Worker or Tier 2 visa, are a national of an exempt country (Australia, Canada, USA, New Zealand), are aged 65 or over, or have a qualifying long-term condition.' },
    },
  ],
}

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'B1 English Level Check',
  url: 'https://passtheuktest.co.uk/b1-check',
  description: 'Check whether your English meets the B1 requirement for ILR or British citizenship.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  publisher: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
}

// These are server-rendered nodes passed as children so the client component
// can show/hide them based on quiz state without re-rendering server content.
function PageHeader() {
  return (
    <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        B1 English Level Check — Free Practice Test for UK Citizenship
      </h1>
      <p className="text-base text-ink-muted leading-relaxed mb-3">
        Find out if your English is at B1 level with our free quiz. Required for most ILR and
        British citizenship applications. Four quizzes, 15 questions each — instant results, no sign-up.
      </p>
      <div className="mb-4">
        <ShareButton
          url="https://passtheuktest.co.uk/b1-check"
          title="B1 English Level Check — Free 15-Question Test 2026"
          text="Free B1 English level check — see if your English meets ILR and citizenship requirements 🇬🇧"
        />
      </div>
    </div>
  )
}

export default function B1CheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }, { name: 'B1 English Check', path: '/b1-check' }]} />

      <B1CheckClient
        header={<PageHeader />}
        footer={<RelatedTools current="b1-check" />}
      />
    </>
  )
}
