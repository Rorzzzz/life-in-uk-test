import Link from 'next/link'
import CitizenshipPlannerClient from './CitizenshipPlannerClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'When Can I Apply for British Citizenship? Free Timeline 2026',
    description: 'Find out exactly when you can apply for British citizenship. Enter your details to see your eligibility date, timeline and total costs. Free, no sign-up.',
    alternates: { canonical: 'https://passtheuktest.co.uk/citizenship-planner' },
    openGraph: {
      title: 'When Can I Apply for British Citizenship? Free Timeline 2026',
      description: 'Find out exactly when you can apply for British citizenship. Enter your details to see your eligibility date, timeline and total costs. Free, no sign-up.',
      url: 'https://passtheuktest.co.uk/citizenship-planner',
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
      name: 'How long does it take to get British citizenship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On the standard route, it takes a minimum of approximately 6.5 years from arriving in the UK to receiving British citizenship: 5 years qualifying residence, then ILR, then 12 months with ILR before applying for citizenship, plus processing time. The spouse of a British citizen route takes around 3 years. EU Settled Status holders can apply 1 year after Settled Status is granted.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long after ILR can I apply for citizenship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On the standard route, you must hold ILR for at least 12 months immediately before applying for citizenship. Applying before 12 months have passed since your ILR was granted will result in a refused application.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the 450-day absence rule for citizenship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For British citizenship by naturalisation, you must not have spent more than 450 days outside the UK in the 5 years before your application, and no more than 90 days outside the UK in the 12 months immediately before your application. These are separate from the ILR 180-day rule and must both be met.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does citizenship processing take in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'British citizenship (naturalisation) applications typically take within 6 months to process. The Home Office publishes current processing times on GOV.UK. After approval, you attend a citizenship ceremony at your local council before citizenship is formally confirmed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to give up my current passport to become British?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The UK allows dual nationality — becoming a British citizen does not require you to give up your existing citizenship or passport. However, your original country may not permit dual nationality. Check the rules of your home country before applying for British citizenship.',
      },
    },
  ],
}

function CitizenshipPlannerIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        UK Citizenship Timeline Planner 2026 — Your Free Route to a British Passport
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

      <h3 className="text-sm font-bold text-ink mb-1">How long does it take to get British citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        On the standard route, it takes a minimum of approximately 6.5 years from arriving in the UK: 5 years qualifying residence, then ILR, then 12 months with ILR before applying for citizenship, plus processing time. The spouse of a British citizen route takes around 3 years in the UK. EU Settled Status holders can apply 1 year after Settled Status is granted.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How long after ILR can I apply for citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        On the standard route, you must hold ILR for at least 12 months immediately before applying for citizenship. Applying before 12 months have passed will result in a refused application and a lost fee. Use the planner above to calculate your exact eligibility date.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the 450-day absence rule for citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        For British citizenship by naturalisation, you must not have spent more than 450 days outside the UK in the 5 years before your application, and no more than 90 days outside the UK in the 12 months immediately before your application. These limits are separate from the ILR 180-day rule and both must be met.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How long does citizenship processing take in 2026?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        British citizenship (naturalisation) applications typically take within 6 months to process. The Home Office publishes current processing times on GOV.UK. After approval, you attend a mandatory citizenship ceremony at your local council before citizenship is formally confirmed.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do I need to give up my current passport to become British?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. The UK allows dual nationality — becoming a British citizen does not require you to give up your existing citizenship or passport. However, your original country may not permit dual nationality. Check the rules of your home country before applying for British citizenship.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Does the proposed 10-year ILR rule affect my citizenship timeline?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        As of May 2026, the proposal to extend the ILR qualifying period to 10 years (Earned Settlement) has been announced but is not yet law. If enacted, it would significantly extend the path to citizenship for new visa holders. Check GOV.UK for the latest position before making long-term plans.
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CitizenshipPlannerIntro />
      <CitizenshipPlannerClient />
      <CitizenshipPlannerContent />
    </>
  )
}
