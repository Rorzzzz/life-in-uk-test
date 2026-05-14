import Link from 'next/link'
import ILRRiskClient from './ILRRiskClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'Free ILR Refusal Risk Checker 2026 — Know Your Weak Spots Before You Apply',
    description: 'Free ILR refusal risk checker — identify the factors most likely to cause your application to be refused before you apply. Updated for 2026 rule changes. No sign-up.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-risk-check' },
    openGraph: {
      title: 'Free ILR Refusal Risk Checker 2026 — Know Your Weak Spots Before You Apply',
      description: 'Free ILR refusal risk checker — identify the factors most likely to cause your application to be refused before you apply. Updated for 2026 rule changes. No sign-up.',
      url: 'https://passtheuktest.co.uk/ilr-risk-check',
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
      name: 'What are the most common reasons ILR is refused?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common reasons ILR is refused are: breaching the 180-day absence rule in any rolling 12-month period, not having passed the Life in the UK test, not meeting the English language requirement (B2 from January 2026, up from B1), gaps in continuous lawful residence, missing or inconsistent supporting documents, good character issues including convictions or past deception, and sponsor problems for Skilled Worker applicants.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ILR refusal rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Home Office does not publish a single headline ILR refusal rate. Refusal rates vary significantly by route and individual circumstances. The non-refundable £3,226 fee means the financial cost of a refusal is high — identifying and resolving risk factors before applying is essential.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I reapply after ILR refusal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. There is no mandatory waiting period before reapplying for ILR after a refusal. However, you must fix the underlying reason for refusal before reapplying — submitting again with the same issue will result in a second refusal and a second lost fee. In most cases there is no right of appeal; you can request an administrative review if UKVI made a factual error.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a criminal record affect ILR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Criminal convictions are assessed as part of the good character requirement for ILR. The severity and recency of the conviction matters. Serious custodial sentences carry fixed bars. All convictions — including spent ones — must be declared. Failure to declare is treated as deception and is more serious than the original conviction.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if I have absences over 180 days for ILR?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If any rolling 12-month window within your qualifying period contains more than 180 days outside the UK, UKVI can refuse your application. The £3,226 fee is not refunded. You may need to wait until the offending window falls outside your qualifying period, or seek advice from an OISC-registered immigration adviser. Use our free 180-day absence calculator to check all your windows before applying.',
      },
    },
  ],
}

function ILRRiskIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        Free ILR Refusal Risk Checker 2026 — Know Your Weak Spots Before You Apply
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        ILR applications cost £3,226 per person — and the fee is not refunded if refused. Use our free ILR refusal risk checker to identify potential issues before you submit. Answer 9 questions about your qualifying period, documents, and eligibility to get a risk assessment with recommended next steps.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>9 key refusal factors assessed individually</li>
        <li>Green, amber, or red result per factor</li>
        <li>Overall risk level — low, medium, or high</li>
        <li>Links to fix each issue before you apply</li>
      </ul>
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/ilr-risk-check"
          title="Free ILR Refusal Risk Checker — Know Before You Apply 2026"
          text="Free ILR refusal risk checker — know your weak spots before you apply 🇬🇧"
        />
      </div>
    </div>
  )
}

function ILRRiskContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Most common reasons ILR applications are refused
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        UKVI publishes refusal reasons and these are well documented through immigration case law. The most common reasons are:
      </p>
      <ol className="text-sm text-ink-muted leading-relaxed space-y-2 mb-3 list-decimal list-inside">
        <li>Breaching the 180-day absence rule in any rolling 12-month period during the qualifying period</li>
        <li>Not having passed the Life in the UK test before submitting the application</li>
        <li>Not meeting the English language requirement — from January 2026 this is B2 level for ILR (up from B1)</li>
        <li>Gaps in continuous lawful residence — periods without valid leave to remain</li>
        <li>Insufficient or missing supporting documents</li>
        <li>Good character issues including convictions, civil penalties, or past deception</li>
        <li>Sponsor issues for Skilled Worker applicants — licence revoked, role changed without a new Certificate of Sponsorship</li>
      </ol>
      <p className="text-base text-ink leading-relaxed mb-3">
        <strong>2026 rule change:</strong> From 8 January 2026, the English language requirement for ILR increased from B1 to B2 for most routes. If you are applying for ILR from this date, confirm you have a valid B2 certificate — a B1 certificate alone will no longer satisfy the requirement for most applicants.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        The cost of a refused ILR application
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        A refused ILR application is an expensive setback. The £3,226 application fee is not refunded. You must pay the full fee again if you reapply. A refused application is also noted on your immigration record — which can affect future applications including citizenship.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        For a family of two adults, a refusal means at minimum £6,452 in repeat fees — assuming you fix the underlying issue and reapply. This is why identifying and resolving issues before you apply is so important.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What to do if you identify a risk
      </h2>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-2 mb-3 list-disc list-inside">
        <li>
          Absences: use our{' '}
          <Link href="/absence-calculator" className="text-brand underline">absence calculator</Link>{' '}
          to check every possible 12-month window within your qualifying period
        </li>
        <li>
          Documents: use the{' '}
          <Link href="/ilr-checklist" className="text-brand underline">ILR document checklist</Link>{' '}
          to prepare a complete application
        </li>
        <li>
          Good character: use the{' '}
          <Link href="/good-character-check" className="text-brand underline">good character checker</Link>{' '}
          and seek professional OISC-registered advice if needed
        </li>
        <li>
          English: confirm your B1 certificate is still valid and from an approved provider. Use our{' '}
          <Link href="/b1-check" className="text-brand underline">B1 English level check</Link>{' '}
          to test your readiness
        </li>
        <li>
          Life in the UK test: if you have not yet passed, start practising now with our free{' '}
          <Link href="/practice" className="text-brand underline">practice questions</Link>
        </li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">What are the most common reasons ILR is refused?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The most common reasons are: breaching the 180-day absence rule in any rolling 12-month window, not passing the Life in the UK test, not meeting the English language requirement (B2 from January 2026), gaps in continuous lawful residence, missing documents, good character issues, and sponsor problems for Skilled Worker applicants. Use the checker above to assess your risk across all these factors.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the ILR refusal rate?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The Home Office does not publish a single headline ILR refusal rate. Rates vary significantly by route and individual circumstances. What is consistent is that the £3,226 fee is non-refundable — making a thorough pre-application check essential for every applicant.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I reapply after ILR refusal?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. There is no mandatory waiting period before reapplying for ILR after a refusal. However, you must fix the underlying reason for refusal first — submitting again with the same issue will result in a second refusal and a second lost fee. In most cases there is no right of appeal; you can request an administrative review if UKVI made a factual error.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Does a criminal record affect ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. Criminal convictions are assessed as part of the good character requirement. The severity and recency of the conviction matters. Sentences of 4 years or more carry a permanent bar to citizenship; shorter sentences carry time-limited bars. All convictions — including spent ones — must be declared on the ILR application. Use our{' '}
        <Link href="/good-character-check" className="text-brand underline">good character checker</Link>{' '}
        to assess your position.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What happens if I have absences over 180 days?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        If any rolling 12-month window within your qualifying period contains more than 180 days outside the UK, UKVI can refuse your application. The £3,226 fee is not refunded. You may need to wait until the offending window falls outside your qualifying period. Use our{' '}
        <Link href="/absence-calculator" className="text-brand underline">180-day absence calculator</Link>{' '}
        to check every window before you apply.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Will a refused ILR application affect my citizenship application?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        A refusal is noted on your immigration record and UKVI will see it when you later apply for citizenship. This does not automatically bar you, but it may be taken into account — particularly if the reason involved dishonesty or a good character issue.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/ilr-refusal-reasons-2026" className="text-brand underline">ILR refusal reasons 2026 — full guide</Link></li>
          <li><Link href="/articles/how-much-does-ilr-cost-2026" className="text-brand underline">How much does ILR cost in 2026?</Link></li>
          <li><Link href="/absence-calculator" className="text-brand underline">180-day absence calculator</Link></li>
          <li><Link href="/ilr-checklist" className="text-brand underline">ILR document checklist</Link></li>
          <li><Link href="/good-character-check" className="text-brand underline">Good character requirement checker</Link></li>
          <li><Link href="/ilr-calculator" className="text-brand underline">ILR eligibility calculator</Link></li>
          <li><Link href="/practice" className="text-brand underline">Life in the UK test practice questions</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: April 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules.
      </p>
    </div>
  )
}

export default function ILRRiskCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ILRRiskIntro />
      <ILRRiskClient />
      <ILRRiskContent />
    </>
  )
}
