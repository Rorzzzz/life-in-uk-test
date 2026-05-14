import Link from 'next/link'
import B1CheckClient from './B1CheckClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'B1 English Level Check — Free Practice Test for UK Citizenship 2026',
    description: 'Free B1 English level check for UK citizenship applications. 15 questions covering listening and speaking topics — find out if you meet the B1 requirement. No sign-up.',
    alternates: { canonical: 'https://passtheuktest.co.uk/b1-check' },
    openGraph: {
      title: 'B1 English Level Check — Free Practice Test for UK Citizenship 2026',
      description: 'Free B1 English level check for UK citizenship applications. 15 questions covering listening and speaking topics — find out if you meet the B1 requirement. No sign-up.',
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
        text: 'Yes. From 8 January 2026, the English language requirement for ILR (Indefinite Leave to Remain) increased from B1 to B2 level for most routes. B1 is still the requirement for British citizenship (naturalisation). If you are applying for ILR from January 2026 onwards, check whether you now need a B2 certificate rather than B1.',
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
        text: 'Yes. You may be exempt if you hold a Skilled Worker or Tier 2 visa (English was proved at visa stage), if you are a national of an exempt country such as Australia, Canada, USA, or New Zealand, if you are aged 65 or over, or if you have a long-term physical or mental condition. Use our exemption checker to confirm your status.',
      },
    },
  ],
}

function B1CheckIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        B1 English Level Check — Free Practice Test for UK Citizenship
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Find out if your English is at B1 level with our free 15-question practice quiz. The B1 English test is required for most ILR and British citizenship applications. Answer questions covering vocabulary, grammar, and reading comprehension — and find out if you are ready to book an official UKVI-approved test.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>15 questions covering vocabulary, grammar, and reading comprehension</li>
        <li>Instant score at the end</li>
        <li>Personalised recommendation on whether you are ready to book</li>
        <li>This is a practice tool — not an official UKVI-approved test</li>
      </ul>
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/b1-check"
          title="B1 English Level Check — Free 15-Question Test 2026"
          text="Free B1 English level check — see if your English meets ILR and citizenship requirements 🇬🇧"
        />
      </div>
    </div>
  )
}

function B1CheckContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Why do you need a B1 English test for ILR?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Most ILR applicants must prove they can speak and listen in English at B1 level on the Common European Framework of Reference (CEFR). This is a legal requirement — you cannot submit your ILR application without meeting it unless you are exempt.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Accepted tests for the B1 requirement include Trinity GESE Grade 5, IELTS Life Skills B1, and LANGUAGECERT B1. All tests must be taken with a UKVI-approved provider. Skilled Worker visa holders are generally exempt because they proved English when they applied for their visa. Certain nationalities are also exempt — including citizens of Australia, Canada, the USA, and New Zealand.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What does B1 English level mean?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        B1 is the intermediate level on the CEFR scale. At B1 level you can understand the main points of clear speech on familiar topics. You can manage most everyday situations in English and describe your own experiences, events, and plans.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        For the UKVI B1 test, the focus is on speaking and listening — not writing. You will have a short conversation with a trained assessor and answer questions on everyday topics. You do not need to write an essay or pass a written grammar test to meet this requirement.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        How to book an official B1 test
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        You must use a UKVI-approved test provider. The main options are:
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>LANGUAGECERT: available online from home in a secure proctored exam — approximately £150–£215</li>
        <li>Trinity College London: in-person at approved test centres across the UK</li>
        <li>IELTS Life Skills B1: in-person at approved test centres — check the British Council or IDP for booking</li>
      </ul>
      <p className="text-base text-ink leading-relaxed mb-3">
        Results from approved providers are valid for 2 years in most cases. Check GOV.UK for the approved provider list before booking — only tests from approved providers are accepted.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">What is the B1 English requirement for UK citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        To apply for British citizenship by naturalisation, you must prove English speaking and listening ability at B1 level on the CEFR scale. You must pass a UKVI-approved B1 test such as Trinity GESE Grade 5, IELTS Life Skills B1, or LANGUAGECERT B1, unless you qualify for an exemption. B1 remains the standard for citizenship — it has not changed.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Has the English requirement changed for ILR in 2026?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. From 8 January 2026, the English language requirement for ILR increased from B1 to B2 level for most routes. B1 is still the requirement for British citizenship (naturalisation). If you are applying for ILR from January 2026 onwards, check whether you now need a B2 certificate rather than a B1. Use our{' '}
        <Link href="/ilr-risk-check" className="text-brand underline">ILR risk checker</Link>{' '}
        to flag this before you apply.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Which English tests are accepted for UK citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Accepted tests for the B1 English requirement for citizenship include: Trinity College London GESE Grade 5, IELTS Life Skills B1, and LANGUAGECERT B1. All tests must be taken with a UKVI-approved provider. The LANGUAGECERT online option is popular because you can take it from home. Check GOV.UK for the current approved provider list before booking.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How much does a B1 English test cost?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Costs vary by provider. LANGUAGECERT typically costs £150–£215 for the online proctored version. Trinity College London and IELTS Life Skills prices are similar. Check the provider website for current prices as these change regularly. B1 certificates are generally valid for 2 years — the certificate must be current at the time you submit your application.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I be exempt from the English requirement for UK citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. You may be exempt if you hold a Skilled Worker or Tier 2 visa (English was proved at visa stage), if you are a national of an exempt country such as Australia, Canada, USA, or New Zealand, if you are aged 65 or over, or if you have a long-term physical or mental condition. Use our{' '}
        <Link href="/test-exempt" className="text-brand underline">exemption checker</Link>{' '}
        to confirm your status.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Is the B1 test the same as the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. They are two completely separate requirements. The B1 English test proves your speaking and listening ability in English. The Life in the UK test is a knowledge test about British history, culture, and society. Most adult applicants must pass both before applying for ILR or citizenship.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/do-i-need-a-b1-english-test-for-ilr" className="text-brand underline">Do I need a B1 English test for ILR? — full guide</Link></li>
          <li><Link href="/articles/b1-english-test-practice" className="text-brand underline">B1 English test practice and tips</Link></li>
          <li><Link href="/articles/british-citizenship-requirements-2026" className="text-brand underline">British citizenship requirements 2026</Link></li>
          <li><Link href="/test-exempt" className="text-brand underline">Life in the UK test exemption checker</Link></li>
          <li><Link href="/practice" className="text-brand underline">Life in the UK test practice questions</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: April 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules.
      </p>
    </div>
  )
}

export default function B1CheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <B1CheckIntro />
      <B1CheckClient />
      <B1CheckContent />
    </>
  )
}
