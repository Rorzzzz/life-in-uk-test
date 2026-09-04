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
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'To apply for British citizenship by naturalisation, you must prove English speaking and listening ability at B1 level on the CEFR scale. You must pass a UKVI-approved B1 test such as Trinity GESE Grade 5, IELTS Life Skills B1, or LANGUAGECERT B1, unless you are exempt. B1 remains the requirement for citizenship — it has not changed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Has the English requirement changed for ILR in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There are two separate changes. From 8 January 2026, Skilled Worker visa applications (new grants) require B2 English. For ILR settlement, B1 remains the requirement until 26 March 2027 — when ILR rises to B2. British citizenship still requires B1. If you are applying for ILR before March 2027, B1 is sufficient.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which English tests are accepted for UK citizenship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accepted tests for the B1 English requirement for citizenship include: Trinity College London GESE Grade 5, IELTS Life Skills B1, and LANGUAGECERT B1. All tests must be taken with a UKVI-approved provider. Check GOV.UK for the current approved provider list before booking.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a B1 English test cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'B1 English test costs vary by provider. LANGUAGECERT typically costs £150–£215 for the online proctored version. Trinity College London and IELTS Life Skills prices are similar. Check the provider\'s website for current prices as these change regularly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I be exempt from the English requirement for UK citizenship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You may be exempt if you hold a Skilled Worker or Tier 2 visa (English was proved at visa stage), if you are a national of an exempt country such as Australia, Canada, USA, or New Zealand, if you are aged 65 or over, or if you have a long-term physical or mental condition.',
      },
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

export default function B1CheckPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }, { name: 'B1 English Check', path: '/b1-check' }]} />

      {/* Page header — always visible */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          B1 English Level Check — Free Practice Test for UK Citizenship
        </h1>
        <p className="text-base text-ink-muted leading-relaxed mb-3">
          Find out if your English is at B1 level with our free quiz. The B1 English test is required
          for most ILR and British citizenship applications. Four quizzes, 15 questions each — instant
          results, no sign-up.
        </p>
        <div className="mb-4">
          <ShareButton
            url="https://passtheuktest.co.uk/b1-check"
            title="B1 English Level Check — Free 15-Question Test 2026"
            text="Free B1 English level check — see if your English meets ILR and citizenship requirements 🇬🇧"
          />
        </div>
      </div>

      {/* Quiz — takes over the page when active, shows SEO content when on select screen */}
      <B1CheckClient />

      <RelatedTools current="b1-check" />
    </>
  )
}
