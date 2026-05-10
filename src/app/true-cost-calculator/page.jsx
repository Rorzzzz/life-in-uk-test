import Link from 'next/link'
import TrueCostClient from './TrueCostClient'

export async function generateMetadata() {
  return {
    title: 'True Cost of Becoming British — Free Calculator 2026',
    description: 'Most people only budget for the £1,839 citizenship fee. The real cost — visas, IHS, ILR, and more — is far higher. Calculate your exact total free.',
    alternates: { canonical: 'https://passtheuktest.co.uk/true-cost-calculator' },
    openGraph: {
      title: 'Becoming British Costs £40,000+ — Calculate Yours Free',
      description: 'Most people only budget for the £1,839 citizenship fee. The real cost — visas, IHS, ILR, and more — reaches £40,000+ per person. Calculate yours free.',
      url: 'https://passtheuktest.co.uk/true-cost-calculator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function TrueCostIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        True Cost of Becoming British — Full Journey Calculator
      </h1>
      <p className="text-sm text-ink leading-relaxed mb-3">
        Most people applying for British citizenship only think about the citizenship fee. The real cost — from your first visa to your British passport — is dramatically higher. This calculator adds up every fee in the journey so you can plan ahead.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>All visa renewals included, based on your route and number of renewals</li>
        <li>Immigration Health Surcharge calculated for the full qualifying period</li>
        <li>ILR fee, citizenship fee, and optional passport included</li>
        <li>Shareable result — copy your total and send it to anyone</li>
      </ul>
    </div>
  )
}

function TrueCostContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Why the true cost is much higher than most people expect
      </h2>
      <p className="text-sm text-ink leading-relaxed mb-3">
        Most people only budget for the ILR fee and the citizenship fee. But these two costs are only the final stage of a journey that typically spans 6 or more years and involves repeated visa applications, the Immigration Health Surcharge, language and knowledge tests, and biometric enrolment. When you add it all up, the total is often a shock.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>The Immigration Health Surcharge alone can exceed £10,000 for a family of four over the qualifying period</li>
        <li>Visa renewals add thousands of pounds before ILR is even in sight</li>
        <li>The ILR fee of £3,226 per person is one of the highest settlement fees in the world</li>
        <li>A family of four will typically spend £80,000&ndash;£120,000 over the full immigration journey when all costs are included</li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        The biggest cost most people forget — the Immigration Health Surcharge
      </h2>
      <p className="text-sm text-ink leading-relaxed mb-3">
        The Immigration Health Surcharge (IHS) is paid upfront with every visa application. It is not a small administrative charge — it is a major cost that most people underestimate until they see the bill.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>£1,035 per adult per year — paid at the point of application for the full duration of the visa</li>
        <li>£776 per child per year</li>
        <li>A single 5-year Skilled Worker visa costs £5,175 in IHS for the main applicant alone</li>
        <li>For a family of four on a 5-year visa, the IHS bill is £18,275 — before any other fee</li>
        <li>You pay the IHS again if you renew — it is not a one-off charge</li>
      </ul>
      <p className="text-sm text-ink leading-relaxed mb-3">
        Once you have ILR, you stop paying the IHS. That is one of the most significant financial benefits of reaching ILR. For more detail, read our guide to the{' '}
        <Link href="/articles/immigration-health-surcharge-ilr" className="text-brand underline">Immigration Health Surcharge and how it works</Link>.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        How UK immigration fees have changed
      </h2>
      <p className="text-sm text-ink leading-relaxed mb-3">
        UK immigration fees have increased sharply over the past 14 years. The ILR fee has more than tripled since 2014, and the citizenship fee has more than doubled. There is no sign of reversal.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>ILR fee in 2012: £1,051 — ILR fee in 2026: £3,226 — a 207% increase</li>
        <li>Citizenship fee in 2012: £874 total — in 2026: £1,839 total (including ceremony)</li>
        <li>The Immigration Health Surcharge did not exist before 2015</li>
        <li>Every major fee has increased at almost every review point since 2014</li>
      </ul>
      <p className="text-sm text-ink leading-relaxed mb-3">
        If you are in year 1 or 2 of your immigration journey, budget for fees that are higher than today&apos;s figures by the time you reach ILR. Read our article on{' '}
        <Link href="/articles/why-is-ilr-so-expensive" className="text-brand underline">why ILR is so expensive</Link>{' '}
        for the full picture.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">What is the total cost of becoming a British citizen?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The total cost depends on your visa route, how many renewals you need, and how many people in your family are applying. For a single adult on the Skilled Worker route with one renewal, the total from first visa to British passport is typically £25,000&ndash;£35,000. For a family of four, the total can easily exceed £80,000. Use the calculator above to get a figure for your specific situation.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Is the Immigration Health Surcharge refunded when you get ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. The IHS is not refunded at any stage. If you get ILR earlier than expected and paid IHS for years you did not end up using, you do not receive a refund for the unused portion. This is one of the most frustrating aspects of the IHS system for applicants who apply successfully before their visa expires.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Are immigration fees refunded if your application is refused?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. Immigration application fees — including the ILR fee of £3,226 and the naturalisation fee of £1,709 — are non-refundable regardless of the outcome. This makes it essential to ensure your application is complete and correct before submitting. Use our{' '}
        <Link href="/ilr-calculator" className="text-brand underline">ILR calculator</Link>{' '}
        to check your eligibility before applying.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can you pay immigration fees in instalments?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. All immigration fees — visa applications, ILR, and naturalisation — must be paid in full at the point of application. There is no instalment option, deferred payment, or credit facility. This is why early financial planning is essential. Dividing your expected total cost by the number of months until your ILR qualifying date gives you a manageable monthly savings target.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How can I reduce the total cost of becoming British?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        There are limited options to reduce the total. The most effective are: passing the Life in the UK test and B1 English test first time (avoiding retake fees); checking whether your employer will contribute to ILR fees; applying for citizenship as soon as you are eligible to avoid additional years of IHS; and checking whether you qualify for a fee waiver (available on human rights routes only). The largest costs — visa fees, IHS, and ILR — are fixed by the Home Office and cannot be reduced on standard routes.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/how-much-does-ilr-cost-2026" className="text-brand underline">How much does ILR cost in 2026?</Link></li>
          <li><Link href="/articles/how-much-does-british-citizenship-cost-2026" className="text-brand underline">How much does British citizenship cost in 2026?</Link></li>
          <li><Link href="/articles/immigration-health-surcharge-ilr" className="text-brand underline">Immigration Health Surcharge — the full guide</Link></li>
          <li><Link href="/articles/why-is-ilr-so-expensive" className="text-brand underline">Why is ILR so expensive?</Link></li>
          <li><Link href="/ilr-calculator" className="text-brand underline">ILR eligibility calculator</Link></li>
          <li><Link href="/citizenship-planner" className="text-brand underline">British citizenship planner</Link></li>
          <li><Link href="/cheat-sheet" className="text-brand underline">Life in the UK test cheat sheet</Link></li>
          <li><Link href="/faq" className="text-brand underline">Life in the UK test FAQ</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: May 2026 — based on GOV.UK guidance. Fees verified against Home Office fee regulations. Always check GOV.UK for the latest rates before making financial plans.
      </p>
    </div>
  )
}

export default function TrueCostCalculatorPage() {
  return (
    <>
      <TrueCostIntro />
      <TrueCostClient />
      <TrueCostContent />
    </>
  )
}
