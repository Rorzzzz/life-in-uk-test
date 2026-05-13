import Link from 'next/link'
import AbsenceCalculatorClient from './AbsenceCalculatorClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'Free UK Absence Calculator — Check Your 180-Day ILR Rule',
    description: 'Add your trips outside the UK and instantly see if you have breached the 180-day ILR rule in any 12-month period. Free, no login, results in seconds.',
    alternates: { canonical: 'https://passtheuktest.co.uk/absence-calculator' },
    openGraph: {
      title: 'Free UK Absence Calculator — Check Your 180-Day ILR Rule',
      description: 'Add your trips outside the UK and instantly see if you have breached the 180-day ILR rule in any 12-month period. Free, no login, results in seconds.',
      url: 'https://passtheuktest.co.uk/absence-calculator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function AbsenceCalculatorIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        UK Absence Calculator — Check Your 180-Day ILR Rule
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Use our free absence calculator to check whether your trips outside the UK breach the 180-day rule for ILR eligibility. Enter your qualifying period start date and add each trip — the calculator checks every rolling 12-month window and shows whether you are within the limit.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>Add an unlimited number of trips</li>
        <li>Checks every rolling 12-month window, not just the calendar year</li>
        <li>Instant pass or fail result</li>
        <li>Shows which window is worst if you have exceeded the limit</li>
      </ul>
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/absence-calculator"
          title="Free UK Absence Calculator — Check Your 180-Day ILR Rule"
          text="Free UK absence calculator — check if your travel breaks the 180-day ILR rule 🇬🇧"
        />
      </div>
    </div>
  )
}

function AbsenceCalculatorContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What is the 180-day rule for ILR?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        During your ILR qualifying period, you must not spend more than 180 days outside the UK in any single 12-month period. This window is rolling — it can start on any date, not just 1 January. Every possible consecutive 12-month period within your qualifying period is checked.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        For example: if you left the UK on 1 January 2025 and returned on 1 July 2025, that is 181 days outside the UK in that particular window. That would be a breach of the rule, even if you were in the UK for all other periods.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        How are days outside the UK counted?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Each day you are not physically present in the UK counts as an absence day. Using a conservative approach — which matches UKVI&apos;s practice — your departure day counts as an absence day. Your arrival day back in the UK does not count as an absence.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Short trips add up quickly. A two-week holiday, a week-long business trip, and a few weekend breaks can together amount to over a month of absences per year. Over a 5-year qualifying period, this can become a significant risk if you travel regularly.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What happens if you breach the 180-day rule?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        UKVI can refuse your ILR application if your travel history shows any 12-month window with more than 180 days outside the UK. The £3,226 ILR application fee is not refunded if your application is refused.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        In some cases UKVI may exercise discretion where there were genuine exceptional circumstances — for example, a serious medical emergency that kept you abroad. However, this is rare and not guaranteed. If you have breached the rule, get advice from an OISC-registered immigration adviser before applying.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Breaching the rule does not always mean a permanent bar. You may be able to wait until enough time has passed that the offending 12-month window falls outside your qualifying period.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        How to keep track of your absences
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Start recording every trip from the first day of your qualifying period. Note the date you left the UK and the date you returned for every journey, including short trips. UKVI cross-checks your declared travel history against UK border records.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Use this calculator regularly — not just before you apply. Checking your running total every few months means you can adjust your travel plans if you are approaching the limit, rather than discovering a problem when it is too late.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">How many days can I spend outside the UK for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You can spend up to 180 days outside the UK in any rolling 12-month period. This is the maximum — not an allowance you are entitled to use every year. Your total absences across the qualifying period do not have a separate cap, but each 12-month window must stay at or below 180 days.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Is the 180-day rule per calendar year or rolling?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        It is a rolling window. Every possible 12-month period within your qualifying period is checked — not just January to December. This is why this calculator checks all windows, not just calendar years.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do departure and return days count as absence days?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The conservative approach — and the one used by this calculator — counts your departure day as an absence. Your return day (when you arrive back in the UK) does not count as an absence. This matches the approach UKVI takes when assessing applications.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What if I have already exceeded 180 days in one period?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        If the breached window is still within your qualifying period, your application is likely to be refused. You may need to wait until that window falls outside the start of your qualifying period, or seek professional advice. Do not apply until you have confirmed your position with an OISC-registered adviser.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Does the 180-day rule apply to EU Settled Status holders?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        EU Settled Status has different absence rules. You must not spend more than 5 consecutive years outside the UK or your Settled Status lapses. The rolling 180-day rule described here applies to the standard ILR qualifying period for non-EU routes.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can UKVI check my travel history?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. The UK Border Force records entries and exits. UKVI cross-references your declared travel history on the application form against these records. Providing inaccurate information — even unintentionally — can lead to refusal and affect future applications.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/180-day-rule-ilr-uk" className="text-brand underline">The 180-day rule for ILR — full guide</Link></li>
          <li><Link href="/ilr-calculator" className="text-brand underline">ILR eligibility calculator</Link></li>
          <li><Link href="/ilr-risk-check" className="text-brand underline">ILR refusal risk checker</Link></li>
          <li><Link href="/articles/ilr-eligibility-calculator" className="text-brand underline">When can I apply for ILR? — guide</Link></li>
          <li><Link href="/articles/how-much-does-ilr-cost-2026" className="text-brand underline">How much does ILR cost in 2026?</Link></li>
          <li><Link href="/practice" className="text-brand underline">Life in the UK test practice questions</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: April 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules.
      </p>
    </div>
  )
}

export default function AbsenceCalculatorPage() {
  return (
    <>
      <AbsenceCalculatorIntro />
      <AbsenceCalculatorClient />
      <AbsenceCalculatorContent />
    </>
  )
}
