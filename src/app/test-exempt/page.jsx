import Link from 'next/link'
import ExemptWizardClient from './ExemptWizardClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'Am I Exempt From the Life in the UK Test? — Free 60-Second Check 2026',
    description: 'Find out instantly if you are exempt from the Life in the UK test. Free 60-second checker — covers age, health, disability and visa exemptions. No sign-up required.',
    alternates: { canonical: 'https://passtheuktest.co.uk/test-exempt' },
    openGraph: {
      title: 'Am I Exempt From the Life in the UK Test? — Free 60-Second Check 2026',
      description: 'Find out instantly if you are exempt from the Life in the UK test. Free 60-second checker — covers age, health, disability and visa exemptions. No sign-up required.',
      url: 'https://passtheuktest.co.uk/test-exempt',
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
      name: 'Who is exempt from the Life in the UK test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You are exempt from the Life in the UK test if you are under 18 or aged 65 or over at the time of your application, if you have a long-term physical or mental condition that prevents you sitting the test (with medical evidence), or if you are a national of certain exempt countries including Australia, Canada, USA, and New Zealand.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a medical exemption from the Life in the UK test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can claim a medical exemption if you have a long-term physical or mental condition that prevents you from sitting the test. You need a letter from a doctor confirming the condition, plus any supporting medical reports. A short-term illness or temporary condition does not usually qualify.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are EU citizens exempt from the Life in the UK test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'EU citizens are not automatically exempt from the Life in the UK test on nationality grounds. Unlike citizens of countries such as Australia, Canada, or the USA, EU citizens must still pass the Life in the UK test when applying for ILR or British citizenship unless they qualify under age or medical exemptions.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the age exemption apply automatically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. If you are under 18 or aged 65 or over at the date of your ILR or citizenship application, you are automatically exempt. You declare this on your application form — no separate evidence is required. Your age on the application date (not the test date) determines whether you qualify.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I have a disability — am I exempt from the Life in the UK test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You may be exempt if your disability constitutes a long-term physical or mental condition that prevents you from sitting the test. You will need a letter from your doctor confirming this. A disability alone does not automatically grant exemption — the key question is whether the condition prevents you from taking the test.',
      },
    },
  ],
}

function TestExemptIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        Am I Exempt From the Life in the UK Test? Free 60-Second Check
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Not everyone needs to take the Life in the UK test. Find out in 60 seconds whether you are exempt by answering 5 questions about your age, nationality, visa type, and health. Get a clear yes or no with a full explanation of your exemption status.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>5 questions — takes under 60 seconds</li>
        <li>Covers all exemption categories including age, nationality, and health</li>
        <li>Explains what evidence you need if you are exempt</li>
        <li>Clear result: exempt or not exempt, with the reason</li>
      </ul>
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/test-exempt"
          title="Am I Exempt from the Life in the UK Test? Free Check 2026"
          text="Free Life in the UK test exemption checker — find out instantly if you need to take it 🇬🇧"
        />
      </div>
    </div>
  )
}

function TestExemptContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Who is exempt from the Life in the UK test?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        The following groups do not need to take the Life in the UK test when applying for ILR or British citizenship:
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Under 18 at the time of your application — fully exempt, no evidence needed</li>
        <li>Aged 65 or over — fully exempt, no evidence needed</li>
        <li>Long-term physical or mental condition that prevents you from sitting the test — exempt with a doctor&apos;s letter and supporting medical evidence</li>
        <li>Certain nationalities including Australia, Canada, USA, New Zealand, and others (see full list below)</li>
      </ul>
      <p className="text-base text-ink leading-relaxed mb-3">
        Note: Skilled Worker visa holders are exempt from the B1 English language requirement but are not automatically exempt from the Life in the UK test. These are two separate requirements.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Exempt nationalities (full list)
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Citizens of the following countries are exempt from both the Life in the UK test and the B1 English language requirement when applying for ILR or citizenship:
      </p>
      <p className="text-sm text-ink-muted leading-relaxed mb-3">
        Antigua and Barbuda, Australia, The Bahamas, Barbados, Belize, British Overseas Territories citizens, Canada, Dominica, Grenada, Guyana, Jamaica, Ireland (applying for citizenship only), Malta, New Zealand, St Kitts and Nevis, St Lucia, St Vincent and the Grenadines, Trinidad and Tobago, United States of America.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        This list can change. Always verify your status on GOV.UK before submitting your application.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What does exemption mean in practice?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        If you are exempt from the Life in the UK test, you are also exempt from the B1 English language requirement. You declare your exemption on your ILR or citizenship application form — you do not need to sit a test or obtain a certificate.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Age exemptions (under 18 and 65 or over) need no extra evidence — your age on the form is enough</li>
        <li>Nationality exemptions need no extra evidence — your passport confirms your nationality</li>
        <li>Health exemptions need a completed form from a doctor plus supporting medical reports</li>
        <li>If you were exempt when you got ILR, you still need to submit a new exemption declaration for your citizenship application</li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">Who is exempt from the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You are exempt if you are under 18 or aged 65 or over at the time of your application, if you have a long-term physical or mental condition that prevents you sitting the test (with medical evidence), or if you are a national of certain exempt countries including Australia, Canada, USA, New Zealand, and others. Use the checker above to confirm your status.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I get a medical exemption from the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. If you have a long-term physical or mental condition that prevents you from sitting the test, you can claim a medical exemption. You need a letter from a doctor confirming the condition and explaining why it prevents you taking the test. The Home Office may also ask for supporting medical reports. A short-term illness or temporary condition does not usually qualify.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Are EU citizens exempt from the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. EU citizens are not automatically exempt from the Life in the UK test on nationality grounds. Unlike citizens of countries such as Australia, Canada, and the USA, EU nationals must still pass the Life in the UK test when applying for ILR or British citizenship — unless they qualify under the age or medical exemptions.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Does the age exemption apply automatically?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. If you are under 18 or aged 65 or over at the date of your ILR or citizenship application, you are automatically exempt — no extra evidence is needed. Your age on the application date (not the test date) is what matters. If you turn 65 before you submit your application, you are exempt.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What if I have a disability — am I exempt from the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You may be exempt if your disability constitutes a long-term physical or mental condition that prevents you from sitting the test. The key question is whether the condition makes it impossible for you to take the test — not simply whether it makes it more difficult. Get a letter from your doctor explaining why your condition prevents you from sitting the test.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I take the Life in the UK test in Welsh or Scottish Gaelic?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. The test is available in Welsh (Cymraeg) and Scottish Gaelic at certain test centres. You must request this when booking. The content and pass mark are the same as the English-language version.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/life-in-the-uk-test-exemptions" className="text-brand underline">Life in the UK test exemptions — full guide</Link></li>
          <li><Link href="/articles/do-i-need-to-take-the-life-in-the-uk-test" className="text-brand underline">Do I need to take the Life in the UK test?</Link></li>
          <li><Link href="/articles/life-in-the-uk-test-disability-exemptions" className="text-brand underline">Life in the UK test disability exemptions</Link></li>
          <li><Link href="/practice" className="text-brand underline">Life in the UK test practice questions</Link></li>
          <li><Link href="/exam" className="text-brand underline">Full mock exam — timed, 24 questions</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: April 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules.
      </p>
    </div>
  )
}

export default function TestExemptPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <TestExemptIntro />
      <ExemptWizardClient />
      <TestExemptContent />
    </>
  )
}
