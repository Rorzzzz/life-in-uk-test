import Link from 'next/link'
import ILRCalculatorClient from './ILRCalculatorClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'ILR Calculator UK 2026 — Free Eligibility Date & Absence Check',
    description: 'Free ILR calculator UK — find your exact eligibility date, check the 180-day absence rule and get a full cost breakdown. Updated for 2026 Earned Settlement changes. No sign-up.',
    alternates: { canonical: 'https://passtheuktest.co.uk/ilr-calculator' },
    keywords: ['ilr calculator', 'ilr calculator uk', 'ilr eligibility calculator', 'ilr calculator 2026', 'when can i apply for ilr', 'ilr date calculator', 'indefinite leave to remain calculator'],
    openGraph: {
      title: 'ILR Calculator UK 2026 — Free Eligibility Date & Absence Check',
      description: 'Free ILR calculator — find your exact eligibility date, check absences and get a full cost breakdown. Updated for 2026.',
      url: 'https://passtheuktest.co.uk/ilr-calculator',
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
      name: 'How many years do I need to live in the UK before applying for ILR?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most visa routes require 5 years of continuous residence. Global Talent visa holders qualify after 3 years. Long Residence applicants need 10 years of continuous lawful residence. Note: the government has announced plans to extend most routes to 10 years under Earned Settlement — not yet law as of May 2026.' },
    },
    {
      '@type': 'Question',
      name: 'What is the 2026 Earned Settlement change?',
      acceptedAnswer: { '@type': 'Answer', text: 'The UK government announced that most visa routes will require 10 years of residence before qualifying for ILR, replacing the current 5-year rule. This is part of the Earned Settlement policy. As of May 2026 this has not yet passed into law. People who are already in the qualifying period under current rules should apply as soon as they are eligible.' },
    },
    {
      '@type': 'Question',
      name: 'Can I apply for ILR early?',
      acceptedAnswer: { '@type': 'Answer', text: 'You can submit your ILR application up to 28 days before your qualifying date is complete. UKVI will not process it if submitted more than 28 days early.' },
    },
    {
      '@type': 'Question',
      name: 'What is the 180-day rule for ILR?',
      acceptedAnswer: { '@type': 'Answer', text: 'You must not spend more than 180 days outside the UK in any rolling 12-month period during your qualifying period. This limit applies to every possible 12-month window, not just the calendar year. Use the absence calculator to check your specific travel history.' },
    },
    {
      '@type': 'Question',
      name: 'How much does ILR cost in 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'The ILR application fee is £3,226 per person from 8 April 2026. Additional costs include biometric enrolment (£19.20), Life in the UK test (£50 if not already passed), and B1 English test (£150-£215 if required). The fee is not refunded if your application is refused.' },
    },
    {
      '@type': 'Question',
      name: 'Is the ILR fee refunded if my application is refused?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The £3,226 ILR fee is not refunded if your application is refused. You must pay the full fee again if you reapply.' },
    },
    {
      '@type': 'Question',
      name: 'How long does ILR take to process in 2026?',
      acceptedAnswer: { '@type': 'Answer', text: 'Standard ILR processing takes around 6 months. Priority processing (additional fee) reduces this to around 5 working days. Super Priority processing gives a next-day decision. Processing times can vary — always check GOV.UK for current estimates.' },
    },
    {
      '@type': 'Question',
      name: 'Do I need to pass the Life in the UK test before applying for ILR?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, most adult ILR applicants must have passed the Life in the UK test before submitting their application. Some exemptions apply for applicants aged 65 or over or those with certain health conditions.' },
    },
  ],
}

function ILRCalculatorIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        ILR Calculator UK 2026 — Check Your Eligibility Date
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Use our free ILR eligibility calculator to find out exactly when you can apply for Indefinite Leave to Remain in the UK. Enter your visa type and UK entry date to get your qualifying date, 180-day absence check, and full cost breakdown instantly.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-4 list-disc list-inside">
        <li>Your earliest ILR eligibility date based on your visa route</li>
        <li>The qualifying period that applies to your route</li>
        <li>Total cost estimate including the ILR fee, biometric enrolment, and test fees</li>
        <li>B1 English and Life in the UK test cost included where required</li>
      </ul>

      {/* 2026 Earned Settlement Warning */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-4">
        <p className="text-sm font-bold text-amber-400 mb-1">⚠️ 2026 Earned Settlement Update</p>
        <p className="text-sm text-ink-muted leading-relaxed">
          The UK government has announced plans to extend the ILR qualifying period from <strong className="text-ink">5 years to 10 years</strong> under a new &quot;Earned Settlement&quot; policy. As of May 2026 this has <strong className="text-ink">not yet passed into law</strong>. If you are currently in your qualifying period, apply as soon as you are eligible under existing rules.{' '}
          <Link href="/articles/is-ilr-being-extended-to-10-years" className="text-amber-400 hover:text-amber-300 underline">Read more →</Link>
        </p>
      </div>

      <div className="mt-2">
        <ShareButton
          url="https://passtheuktest.co.uk/ilr-calculator"
          title="ILR Calculator UK 2026 — Free Eligibility Date & Absence Check"
          text="Free ILR calculator — find out exactly when you can apply for ILR in the UK 🇬🇧"
        />
      </div>
    </div>
  )
}

function ILRCalculatorContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      {/* Absence calculator CTA */}
      <div className="bg-card border border-border rounded-2xl p-4 mb-8 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-ink text-sm">Also check your 180-day absences</p>
          <p className="text-xs text-ink-muted mt-0.5">Enter your travel history to see if any trips breach the limit</p>
        </div>
        <Link
          href="/absence-calculator"
          className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Absence Check →
        </Link>
      </div>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-4">
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
      <div className="bg-card rounded-2xl overflow-hidden border border-border mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 font-semibold text-ink">Visa route</th>
              <th className="text-left px-4 py-3 font-semibold text-ink">Qualifying period</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              ['Skilled Worker / Tier 2', '5 years'],
              ['Family visa (spouse of British citizen)', '5 years'],
              ['UK Ancestry', '5 years'],
              ['Health & Care Worker', '5 years'],
              ['Global Talent', '3 years'],
              ['Innovator Founder', '3 years'],
              ['Long Residence', '10 years'],
            ].map(([route, period]) => (
              <tr key={route}>
                <td className="px-4 py-3 text-ink-muted">{route}</td>
                <td className="px-4 py-3 text-ink font-semibold">{period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        The 180-day absence rule explained
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        During your qualifying period, you must not spend more than 180 days outside the UK in any single rolling 12-month window. This is not a calendar year — it means any consecutive 365-day period is checked.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Short trips add up quickly. Business travel, family visits, and holidays all count. A single long trip or several short ones can breach this rule. Use our{' '}
        <Link href="/absence-calculator" className="text-brand-400 hover:text-brand-300 underline">180-day absence calculator</Link>{' '}
        to check every rolling window in your travel history.
      </p>
      <div className="bg-card border border-border rounded-xl p-4 mb-4">
        <p className="text-sm font-semibold text-ink mb-1">Example</p>
        <p className="text-sm text-ink-muted">If you left the UK on 1 January 2024 and returned on 1 July 2024, that is 181 days outside the UK in that window — a breach of the rule, even if all other periods were fine.</p>
      </div>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What the ILR application costs in 2026
      </h2>
      <div className="bg-card rounded-2xl overflow-hidden border border-border mb-4">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-border">
            {[
              ['ILR application fee', '£3,226 per person (from 8 April 2026)'],
              ['Biometric enrolment (UKVCAS)', '£19.20 per person'],
              ['Life in the UK test', '£50 per adult (if not already passed)'],
              ['B1 English test', '£150–£215 (Skilled Worker exempt)'],
              ['Priority processing', 'Additional fee — check GOV.UK'],
            ].map(([item, cost]) => (
              <tr key={item}>
                <td className="px-4 py-3 text-ink-muted">{item}</td>
                <td className="px-4 py-3 text-ink font-semibold">{cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-ink-muted mb-4">The ILR fee is not refunded if your application is refused. Use our <Link href="/ilr-risk-check" className="text-brand-400 hover:text-brand-300 underline">ILR refusal risk checker</Link> before you apply.</p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        ILR processing times 2026
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        Standard ILR processing currently takes around 6 months. You can pay for faster processing:
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-4 list-disc list-inside">
        <li><strong className="text-ink">Standard:</strong> around 6 months</li>
        <li><strong className="text-ink">Priority:</strong> around 5 working days (additional fee applies)</li>
        <li><strong className="text-ink">Super Priority:</strong> next working day decision (additional fee applies)</li>
      </ul>
      <p className="text-sm text-ink-muted mb-4">Processing times vary. Always check the <a href="https://www.gov.uk/guidance/visa-decision-waiting-times-applications-outside-the-uk" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 underline">GOV.UK processing times page</a> before applying.</p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently asked questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">What is the 2026 Earned Settlement change?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The UK government has announced plans to extend most ILR qualifying periods from 5 years to 10 years under a new &quot;Earned Settlement&quot; policy. As of May 2026 this has not yet passed into law. If you qualify under the current 5-year rules, apply as soon as you are eligible — do not wait.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How many years do I need to live in the UK before applying for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Most visa routes require 5 years of continuous residence. Global Talent and Innovator Founder holders qualify after 3 years. Long Residence applicants need 10 years of continuous lawful residence.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I apply for ILR early?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You can submit your ILR application up to 28 days before your qualifying date is complete. UKVI will not process applications submitted more than 28 days early.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the 180-day rule for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You must not spend more than 180 days outside the UK in any rolling 12-month period during your qualifying period. This applies to every possible 12-month window, not just the calendar year.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Is the ILR fee refunded if my application is refused?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        No. The £3,226 ILR fee is not refunded if your application is refused. You must pay the full fee again if you reapply.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do I need to pass the Life in the UK test before applying for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes, most adult ILR applicants must have passed the Life in the UK test before submitting their application. Some exemptions apply — use our <Link href="/test-exempt" className="text-brand-400 hover:text-brand-300 underline">exemption checker</Link> to see if you qualify.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What happens to my ILR if I leave the UK for a long time?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        ILR lapses if you spend 2 or more continuous years outside the UK. British citizenship does not lapse in the same way — which is one reason many people apply for citizenship as soon as they are eligible after getting ILR.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">How long does ILR take to process in 2026?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Standard processing takes around 6 months. Priority processing takes around 5 working days. Super Priority gives a next-day decision. All options carry additional fees beyond the standard £3,226 application fee.
      </p>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm font-bold text-ink mb-3">Related tools and guides</p>
        <div className="grid grid-cols-1 gap-2">
          {[
            { href: '/absence-calculator', label: '180-day absence calculator' },
            { href: '/ilr-checklist', label: 'ILR document checklist by visa type' },
            { href: '/ilr-risk-check', label: 'ILR refusal risk checker' },
            { href: '/true-cost-calculator', label: 'True cost of becoming British' },
            { href: '/articles/how-much-does-ilr-cost-2026', label: 'How much does ILR cost in 2026?' },
            { href: '/articles/ilr-vs-british-citizenship', label: 'ILR vs British citizenship — what is the difference?' },
            { href: '/articles/is-ilr-being-extended-to-10-years', label: 'Is ILR being extended to 10 years?' },
            { href: '/mock-test', label: 'Life in the UK test — free mock exams' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-brand-400 hover:text-brand-300 transition-colors">
              → {label}
            </Link>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: May 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules before applying.
      </p>
    </div>
  )
}

export default function ILRCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ILRCalculatorIntro />
      <ILRCalculatorClient />
      <ILRCalculatorContent />
    </>
  )
}
