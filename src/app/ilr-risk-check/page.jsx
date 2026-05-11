import Link from 'next/link'
import ILRRiskClient from './ILRRiskClient'

export async function generateMetadata() {
  return {
    title: 'Free ILR Refusal Risk Checker — Know Before You Apply 2026',
    description: 'ILR refusal risk checker — find out if your absences, documents, or history could cause a refusal. Answer 9 questions and get a free assessment.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-risk-check' },
    openGraph: {
      title: 'Free ILR Refusal Risk Checker — Know Before You Apply 2026',
      description: 'ILR refusal risk checker — find out if your absences, documents, or history could cause a refusal. Answer 9 questions and get a free assessment.',
      url: 'https://passtheuktest.co.uk/ilr-risk-check',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function ILRRiskIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        ILR Refusal Risk Checker — Free Assessment Before You Apply
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
        <li>Breaching the 180-day absence rule in any 12-month period during the qualifying period</li>
        <li>Not having passed the Life in the UK test before submitting the application</li>
        <li>Not meeting the English language requirement (B1 level)</li>
        <li>Gaps in continuous lawful residence — periods without valid leave to remain</li>
        <li>Insufficient or missing supporting documents</li>
        <li>Good character issues including convictions, civil penalties, or past deception</li>
        <li>Sponsor issues for Skilled Worker applicants — licence revoked, role changed without a new Certificate of Sponsorship</li>
      </ol>

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

      <h3 className="text-sm font-bold text-ink mb-1">Can I appeal an ILR refusal?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        In most cases there is no right of appeal against an ILR refusal. You can request an administrative review if you believe UKVI made a factual error. Otherwise, you must address the reason for refusal and reapply — paying the full fee again. Get advice from an OISC-registered adviser before deciding your next step.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Is the £3,226 ILR fee refunded if my application is refused?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. The ILR application fee is not refunded regardless of the outcome. This applies even if your application is refused on a technicality. Always check your eligibility carefully before applying.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How long must I wait before reapplying after a refusal?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        There is no mandatory waiting period before reapplying for ILR after a refusal. However, you must fix the underlying reason for refusal before reapplying. Reapplying with the same issue will result in a second refusal.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Will a refused ILR application affect my future citizenship application?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        A refusal is noted on your immigration record. When you later apply for citizenship, UKVI can see that a previous ILR application was refused and the reason for refusal. This does not automatically bar you from citizenship, but it may be taken into account — particularly if the reason involved dishonesty or a good character issue.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the single most common reason ILR is refused?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Breaching the 180-day absence rule is one of the most frequent reasons for ILR refusal. Many applicants are unaware that the rule applies to every rolling 12-month window — not just each calendar year. Use our{' '}
        <Link href="/absence-calculator" className="text-brand underline">absence calculator</Link>{' '}
        to check all your windows before applying.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I apply for ILR even if I have a spent conviction?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Spent convictions must still be declared on your ILR application. Whether they affect your outcome depends on the nature of the conviction, when it occurred, and your conduct since. Get advice from an OISC-registered adviser if you have any conviction history, including old or spent ones.
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
      <ILRRiskIntro />
      <ILRRiskClient />
      <ILRRiskContent />
    </>
  )
}
