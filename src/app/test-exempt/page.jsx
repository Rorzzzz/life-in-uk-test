import Link from 'next/link'
import ExemptWizardClient from './ExemptWizardClient'

export async function generateMetadata() {
  return {
    title: 'Am I Exempt from the Life in the UK Test? Free Check 2026',
    description: 'Life in the UK test exemptions apply for age, health, and some nationalities. Answer 5 questions and find out in 60 seconds if you need to take it — free.',
    alternates: { canonical: 'https://passtheuktest.co.uk/test-exempt' },
    openGraph: {
      title: 'Am I Exempt from the Life in the UK Test? Free Check 2026',
      description: 'Life in the UK test exemptions apply for age, health, and some nationalities. Answer 5 questions and find out in 60 seconds if you need to take it — free.',
      url: 'https://passtheuktest.co.uk/test-exempt',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function TestExemptIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        Life in the UK Test Exemption Checker — Do You Need to Take It?
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

      <h3 className="text-sm font-bold text-ink mb-1">Is the age 65 exemption based on age at application or test date?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The exemption is based on your age at the date of your ILR or citizenship application — not the date you sit the test. If you turn 65 before you submit your application, you are exempt. If you are 64 when you apply, you are not.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do children applying with parents need to take the test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Children under 18 are fully exempt from the Life in the UK test. They do not need to pass the test or obtain a B1 English certificate. Their age on the application form is sufficient.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">I am from the USA — do I still need the Life in the UK test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. Citizens of the USA are on the exempt nationality list. You do not need to take the Life in the UK test or the B1 English test when applying for ILR or British citizenship.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Skilled Worker visa — am I exempt from the test?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Skilled Worker visa holders are exempt from the B1 English language test because they proved English ability when they applied for their visa. However, they are not automatically exempt from the Life in the UK test. Unless you are exempt on age or nationality grounds, you must still pass the Life in the UK test before applying for ILR.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What evidence do I need to claim a medical exemption?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You need a letter from a doctor confirming you have a long-term physical or mental condition that prevents you from sitting the test. The Home Office may ask for additional medical reports. A short-term illness or temporary condition does not usually qualify.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I take the Life in the UK test in Welsh or Scottish Gaelic?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. The test is available in Welsh (Cymraeg) and Scottish Gaelic at certain test centres. You must request this when booking. The content and pass mark are the same as the English-language test.
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
      <TestExemptIntro />
      <ExemptWizardClient />
      <TestExemptContent />
    </>
  )
}
