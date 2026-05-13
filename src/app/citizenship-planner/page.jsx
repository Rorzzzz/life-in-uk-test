import Link from 'next/link'
import CitizenshipPlannerClient from './CitizenshipPlannerClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'UK Citizenship Planner 2026 — Free Timeline & Cost Tool',
    description: 'Free British citizenship timeline calculator — enter your ILR date and route to get your exact eligibility date, total cost, and step-by-step timeline.',
    alternates: { canonical: 'https://passtheuktest.co.uk/citizenship-planner' },
    openGraph: {
      title: 'UK Citizenship Planner 2026 — Free Timeline & Cost Tool',
      description: 'Free British citizenship timeline calculator — enter your ILR date and route to get your exact eligibility date, total cost, and step-by-step timeline.',
      url: 'https://passtheuktest.co.uk/citizenship-planner',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function CitizenshipPlannerIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        British Citizenship Planner — Timeline &amp; Cost Calculator 2026
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Find out when you can apply for British citizenship and what it will cost. Enter your ILR date and route to get your exact eligibility date, a month-by-month timeline, and a full breakdown of fees. Updated for April 2026 Home Office fees.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>Calculates your earliest citizenship eligibility date</li>
        <li>Covers standard route, spouse route, and EU Settled Status route</li>
        <li>Full cost breakdown including ceremony fee</li>
        <li>Passport cost shown separately — it is optional and a separate process</li>
      </ul>
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/citizenship-planner"
          title="UK Citizenship Planner 2026 — Free Timeline & Cost Tool"
          text="Free UK citizenship timeline planner — see your exact route to a British passport 🇬🇧"
        />
      </div>
    </div>
  )
}

function CitizenshipPlannerContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        How long does it take to get British citizenship?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        The timeline depends on your route to citizenship:
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Standard route: 5 years qualifying residence in the UK, then ILR, then 12 months with ILR before applying for citizenship</li>
        <li>Spouse of a British citizen: 3 years in the UK — no ILR required before applying</li>
        <li>EU Settled Status route: 1 year after Settled Status is granted</li>
        <li>Processing time after application: usually within 6 months</li>
        <li>Total minimum from arriving in the UK to citizenship: approximately 6.5 years on the standard route</li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        British citizenship requirements
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        To apply for British citizenship by naturalisation you must meet all of the following:
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>5 years continuous residence in the UK (or 3 years for the spouse route)</li>
        <li>Indefinite Leave to Remain or EU Settled Status for at least 12 months immediately before applying (standard route)</li>
        <li>Passed the Life in the UK test</li>
        <li>B1 English speaking and listening certificate — or a valid exemption</li>
        <li>Good character — no serious criminal convictions or immigration violations</li>
        <li>Intend to continue living in the UK</li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What does British citizenship cost?
      </h2>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Naturalisation application fee: £1,709 per adult</li>
        <li>Citizenship ceremony fee: £130 — included in the total (£1,839 for adults, all in)</li>
        <li>Child citizenship registration: £1,000 per child</li>
        <li>British passport (separate, optional): £102 adult / £66.50 child — online application</li>
        <li>None of the application fees are refunded if the application is refused</li>
      </ul>
      <p className="text-base text-ink leading-relaxed mb-3">
        A family of two adults and one child applying together faces total costs of approximately £4,678 in application and ceremony fees, before passport costs. Use our{' '}
        <Link href="/ilr-calculator" className="text-brand underline">ILR calculator</Link>{' '}
        to also estimate the cost of the ILR stage.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">How long after ILR can I apply for citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        On the standard route, you must hold ILR for at least 12 months before applying for citizenship. If you apply before 12 months have passed since your ILR was granted, your application will be refused.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the spouse route to British citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        If you are married to or in a civil partnership with a British citizen, you can apply for citizenship after 3 years of living in the UK. You do not need to hold ILR first. You must still pass the Life in the UK test, meet the English language requirement, and satisfy the good character requirement.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Is the citizenship ceremony fee included in the £1,709?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. The total you pay when applying is £1,839 per adult — this covers the £1,709 naturalisation fee plus the £130 citizenship ceremony fee. You cannot opt out of the ceremony — it is a legal requirement before citizenship is confirmed.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Does the proposed 10-year ILR rule affect my citizenship timeline?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        As of April 2026, the proposal to extend the ILR qualifying period from 5 to 10 years has been announced but is not yet law. If it becomes law it would significantly extend the path to citizenship for new visa holders. Check GOV.UK for the latest position before making plans.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the good character requirement?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The Home Office assesses whether you are of good character before granting citizenship. This covers criminal convictions, immigration conduct, financial honesty, and civic behaviour. Use our{' '}
        <Link href="/good-character-check" className="text-brand underline">good character checker</Link>{' '}
        to assess how your background might be viewed.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Will I lose my original nationality if I become British?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The UK allows dual nationality. Becoming a British citizen does not require you to give up your existing citizenship. However, your original country may not allow dual nationality — check the rules of your home country before applying.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/how-long-does-it-take-to-get-british-citizenship" className="text-brand underline">How long does it take to get British citizenship?</Link></li>
          <li><Link href="/articles/british-citizenship-requirements-2026" className="text-brand underline">British citizenship requirements 2026</Link></li>
          <li><Link href="/articles/how-much-does-british-citizenship-cost-2026" className="text-brand underline">How much does British citizenship cost in 2026?</Link></li>
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

export default function CitizenshipPlannerPage() {
  return (
    <>
      <CitizenshipPlannerIntro />
      <CitizenshipPlannerClient />
      <CitizenshipPlannerContent />
    </>
  )
}
