import Link from 'next/link'
import GoodCharacterClient from './GoodCharacterClient'

export async function generateMetadata() {
  return {
    title: 'Free Good Character Check — ILR & Citizenship 2026',
    description: 'Good character is required for ILR and British citizenship. Find out if something in your past might cause a problem — answer 6 questions, free, no login.',
    alternates: { canonical: 'https://passtheuktest.co.uk/good-character-check' },
    openGraph: {
      title: 'Free Good Character Check — ILR & Citizenship 2026',
      description: 'Good character is required for ILR and British citizenship. Find out if something in your past might cause a problem — answer 6 questions, free, no login.',
      url: 'https://passtheuktest.co.uk/good-character-check',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

function GoodCharacterIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        Good Character Check — ILR &amp; Citizenship Requirement 2026
      </h1>
      <p className="text-sm text-ink leading-relaxed mb-3">
        The good character requirement applies to everyone applying for ILR or British citizenship. Answer 6 questions about your criminal history, immigration record, and financial conduct to get an assessment of how your background might be viewed by the Home Office.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>6 questions covering all main good character factors</li>
        <li>Green, amber, or red result per factor</li>
        <li>Overall risk level with explanation</li>
        <li>Links to professional advice if your situation is complex</li>
      </ul>
    </div>
  )
}

function GoodCharacterContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What is the good character requirement?
      </h2>
      <p className="text-sm text-ink leading-relaxed mb-3">
        UKVI assesses whether applicants are of good character before granting ILR or British citizenship. It is a holistic assessment — there is no single checklist of what passes or fails. The caseworker looks at the full picture of your history in the UK and abroad.
      </p>
      <p className="text-sm text-ink leading-relaxed mb-3">
        The main factors are: criminal history, immigration conduct, financial honesty (including unpaid taxes and benefit fraud), and civic behaviour. Serious issues do not automatically mean refusal — but they must be declared. Failure to declare something that UKVI later finds is treated more seriously than the original issue.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What affects the good character assessment?
      </h2>
      <p className="text-sm font-bold text-ink mb-2">Criminal convictions</p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Sentences of 4 years or more in prison: permanent bar to citizenship</li>
        <li>Sentences of 12 months to 4 years: 15-year bar from the end of the sentence</li>
        <li>Sentences of 12 months or less: 7-year bar from the end of the sentence</li>
        <li>Non-custodial sentences, fines, and cautions: assessed case by case</li>
      </ul>
      <p className="text-sm font-bold text-ink mb-2">Immigration conduct</p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-3 list-disc list-inside">
        <li>Overstaying a visa — even briefly — is noted on your record and may affect your application</li>
        <li>Working without permission can result in refusal</li>
        <li>Providing false information on any previous application is treated very seriously</li>
        <li>Civil penalties (such as working without authorisation) are taken into account</li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Spent convictions and citizenship applications
      </h2>
      <p className="text-sm text-ink leading-relaxed mb-3">
        For most jobs and DBS checks, spent convictions do not need to be declared. Citizenship applications are an exception. You must declare all convictions on a citizenship application — including spent ones.
      </p>
      <p className="text-sm text-ink leading-relaxed mb-3">
        Failing to declare a conviction you thought was spent is treated as deception. This is more serious in the eyes of the Home Office than the original conviction itself. If in doubt, declare it.
      </p>
      <p className="text-sm text-ink leading-relaxed mb-3">
        Use our{' '}
        <Link href="/ilr-risk-check" className="text-brand underline">ILR refusal risk checker</Link>{' '}
        to assess other potential issues before you apply.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">Does a criminal record mean automatic refusal for ILR?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Not automatically. The severity and recency of the conviction matters. A minor offence many years ago with no subsequent issues may not prevent a successful application. Serious convictions with custodial sentences have fixed bars attached. Always seek advice from an OISC-registered adviser if you have any criminal history.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do I need to declare spent convictions on a citizenship application?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. Unlike most other contexts, citizenship applications require you to declare all convictions including spent ones. The Rehabilitation of Offenders Act 1974 does not apply to citizenship applications. Failure to declare is treated as deception and is more serious than the conviction itself.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What counts as a minor offence for good character purposes?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        There is no fixed legal definition of minor. The Home Office guidance considers the nature of the offence, the sentence given, how long ago it was, and whether there has been any repeat offending. A single caution or small fine many years ago with no pattern of further offending is typically treated more leniently than recent or repeat offences.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">I had a brief overstay years ago — will this affect my application?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        A brief overstay is noted on your immigration record. Whether it affects your application depends on how long ago it was, how long the overstay lasted, and your conduct since then. UKVI may exercise discretion for a short and old overstay if there is a clear and innocent explanation. Seek professional advice before applying.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I still apply for ILR if I worked without permission?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Working without permission is a serious immigration breach. It may result in a civil penalty and can affect your good character assessment for ILR and citizenship. The outcome depends on the circumstances. Get OISC-registered immigration advice before applying.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Where can I find an OISC-registered immigration adviser?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        You can search the OISC register on GOV.UK to find a regulated immigration adviser near you. Only use advisers registered with the OISC or solicitors regulated by the Solicitors Regulation Authority (SRA). Unregulated immigration advisers operate illegally and can cause serious harm to your application.
      </p>

      <div className="mt-8 pt-6 border-t border-white/10">
        <p className="text-sm font-bold text-ink mb-2">Related guides and tools</p>
        <ul className="text-sm text-ink-muted space-y-1">
          <li><Link href="/articles/good-character-requirement-ilr-citizenship" className="text-brand underline">Good character requirement for ILR and citizenship — full guide</Link></li>
          <li><Link href="/articles/british-citizenship-requirements-2026" className="text-brand underline">British citizenship requirements 2026</Link></li>
          <li><Link href="/articles/ilr-vs-british-citizenship" className="text-brand underline">ILR vs British citizenship — what is the difference?</Link></li>
          <li><Link href="/ilr-risk-check" className="text-brand underline">ILR refusal risk checker</Link></li>
          <li><Link href="/practice" className="text-brand underline">Life in the UK test practice questions</Link></li>
        </ul>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: April 2026 — based on GOV.UK guidance. Always check GOV.UK for the latest rules.
      </p>
    </div>
  )
}

export default function GoodCharacterCheckPage() {
  return (
    <>
      <GoodCharacterIntro />
      <GoodCharacterClient />
      <GoodCharacterContent />
    </>
  )
}
