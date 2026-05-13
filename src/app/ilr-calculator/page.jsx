import Link from 'next/link'
import ILRCalculatorClient from './ILRCalculatorClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'Free ILR Eligibility Calculator UK — Get Your Date 2026',
    description: 'Free ILR eligibility calculator for the UK. Enter your visa type and arrival date — get your exact qualifying date and full cost breakdown in seconds.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-calculator' },
    openGraph: {
      title: 'Free ILR Eligibility Calculator UK — Get Your Date 2026',
      description: 'Free ILR eligibility calculator for the UK. Enter your visa type and arrival date — get your exact qualifying date and full cost breakdown in seconds.',
      url: 'https://passtheuktest.co.uk/ilr-calculator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function ILRCalculatorIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        ILR Eligibility Calculator — When Can You Apply? (2026)
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Use our free ILR eligibility calculator to find out when you can apply for Indefinite Leave to Remain in the UK. Enter your visa type and UK entry date to get your exact eligibility date and a full cost breakdown. Results are based on current Home Office rules.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>Your earliest ILR eligibility date based on your visa route</li>
        <li>The qualifying period that applies to your route</li>
        <li>Total cost estimate including the ILR fee, biometric enrolment, and test fees</li>
        <li>B1 English and Life in the UK test cost included where required</li>
      </ul>
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/ilr-calculator"
          title="Free ILR Eligibility Calculator UK — Get Your Date 2026"
          text="Free ILR eligibility calculator — find out exactly when you can apply for ILR 🇬🇧"
        />
      </div>
    </div>
  )
}

function ILRCalculatorContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What is ILR (Indefinite Leave to Remain)?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Indefinite Leave to Remain gives you a permanent right to live and work in the UK with no time limit on your stay. It is sometimes called settlement. ILR is different from British citizenship — you do not get a British passport, and ILR can lapse if you spend too long outside the UK.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        For most visa routes, you must hold ILR for at least 12 months before you can apply for British citizenship. Getting ILR is the step between a time-limited visa and becoming a British citizen.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        ILR qualifying periods by visa route
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        The number of years you must live in the UK before applying for ILR depends on your visa type:
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Skilled Worker / Tier 2: 5 years continuous residence</li>
        <li>Family visa (spouse of a British citizen): 5 years</li>
        <li>UK Ancestry: 5 years</li>
        <li>Global Talent: 3 years (shorter qualifying period)</li>
        <li>Long Residence: 10 years continuous lawful residence</li>
        <li>Proposed extension to 10 years for most routes — not yet law as of April 2026</li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        The 180-day absence rule
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        During your qualifying period, you must not spend more than 180 days outside the UK in any single 12-month window. This is a rolling window — it is not calculated from 1 January to 31 December. Any consecutive 12-month period is checked.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Short trips add up quickly. Business travel, family visits, and holidays all count. Breaching this rule can make your ILR application ineligible. Use our{' '}
        <Link href="/absence-calculator" className="text-brand underline">absence calculator</Link>{' '}
        to check if any of your trips breach the 180-day limit.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What the ILR application costs
      </h2>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>ILR application fee: £3,226 per person (from 8 April 2026)</li>
        <li>Biometric enrolment at UKVCAS: £19.20 per person (separate from application fee)</li>
        <li>Life in the UK test: £50 per adult (if not already passed)</li>
        <li>B1 English test: £150–£215 per adult (Skilled Worker applicants are exempt)</li>
        <li>The fee is not refunded if your application is refused</li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">How many years do I need to live in the UK before applying for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Most visa routes require 5 years of continuous residence. Global Talent visa holders qualify after 3 years. Long Residence applicants need 10 years of continuous lawful residence.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I apply for ILR early?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You can submit your ILR application up to 28 days before your qualifying date. UKVI will not process it if submitted earlier than this.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the 180-day rule for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You must not spend more than 180 days outside the UK in any rolling 12-month period during your qualifying period. This limit applies to every possible 12-month window, not just the calendar year.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Is the ILR fee refunded if my application is refused?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. The £3,226 ILR fee is not refunded if your application is refused. You must pay the full fee again if you reapply.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do I need to pass the Life in the UK test before applying for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes, most adult ILR applicants must have passed the Life in the UK test before submitting their application. The pass certificate reference number is included on the application form. Some exemptions apply — see our{' '}
        <Link href="/test-exempt" className="text-brand underline">exemption checker</Link>.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What happens to my ILR if I leave the UK for a long time?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        ILR lapses if you spend 2 or more continuous years outside the UK. If this happens you will need to apply to re-enter under a different route. British citizenship does not lapse in the same way — which is one reason many people apply for citizenship once they are eligible.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/ilr-eligibility-calculator" className="text-brand underline">ILR eligibility explained — full guide</Link></li>
          <li><Link href="/articles/how-much-does-ilr-cost-2026" className="text-brand underline">How much does ILR cost in 2026?</Link></li>
          <li><Link href="/articles/ilr-vs-british-citizenship" className="text-brand underline">ILR vs British citizenship — what is the difference?</Link></li>
          <li><Link href="/ilr-risk-check" className="text-brand underline">ILR refusal risk checker</Link></li>
          <li><Link href="/absence-calculator" className="text-brand underline">180-day absence calculator</Link></li>
          <li><Link href="/practice" className="text-brand underline">Life in the UK test practice questions</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: April 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules.
      </p>
    </div>
  )
}

export default function ILRCalculatorPage() {
  return (
    <>
      <ILRCalculatorIntro />
      <ILRCalculatorClient />
      <ILRCalculatorContent />
    </>
  )
}
