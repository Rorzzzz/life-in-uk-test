import Link from 'next/link'
import GoodCharacterClient from './GoodCharacterClient'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: 'What Is Good Character? Free ILR & Citizenship Check 2026',
    description: 'Find out what counts as good character for ILR and citizenship. Criminal convictions, debts, immigration history — free instant check. No sign-up.',
    alternates: { canonical: 'https://passtheuktest.co.uk/good-character-check' },
    openGraph: {
      title: 'What Is Good Character? Free ILR & Citizenship Check 2026',
      description: 'Find out what counts as good character for ILR and citizenship. Criminal convictions, debts, immigration history — free instant check. No sign-up.',
      url: 'https://passtheuktest.co.uk/good-character-check',
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
      name: 'What is the good character requirement for ILR and citizenship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The good character requirement is a holistic assessment UKVI makes before granting ILR or British citizenship. It covers criminal history, immigration conduct, financial honesty (including unpaid taxes and benefit fraud), and civic behaviour. There is no single pass/fail checklist — the caseworker considers the full picture of your history.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does a spent conviction affect my ILR or citizenship application?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Unlike most other contexts, ILR and citizenship applications require you to declare all convictions including spent ones. The Rehabilitation of Offenders Act 1974 does not apply to these applications. Failure to declare a spent conviction is treated as deception — which is more serious in UKVI\'s eyes than the original conviction itself.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do unpaid debts affect good character for ILR or citizenship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unpaid debts can affect the good character assessment, particularly where they involve unpaid taxes, benefit fraud, or deliberate financial dishonesty. A County Court Judgment (CCJ) is noted on your record and may be taken into account. Ordinary consumer debt is less likely to cause a problem, but deliberate non-payment of public duties is viewed more seriously.',
      },
    },
    {
      '@type': 'Question',
      name: 'What about minor offences — do they affect ILR or citizenship?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Minor offences — such as a single caution, small fine, or non-custodial sentence many years ago with no subsequent offending — are assessed case by case. They do not automatically result in refusal. However, they must be declared. A pattern of minor offences is viewed more seriously than a single isolated incident.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I still apply for ILR or citizenship if I have a CCJ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A County Court Judgment (CCJ) does not automatically prevent you from applying for ILR or citizenship. UKVI considers the circumstances — including whether the debt has been paid and how long ago the judgment was issued. Unsatisfied CCJs showing ongoing financial irresponsibility are viewed more negatively. Seek advice from an OISC-registered immigration adviser if you have a CCJ.',
      },
    },
  ],
}

function GoodCharacterIntro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        Good Character Requirement Check — Free ILR &amp; British Citizenship Checker 2026
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        The good character requirement applies to everyone applying for ILR or British citizenship. Answer 6 questions about your criminal history, immigration record, and financial conduct to get an assessment of how your background might be viewed by the Home Office.
      </p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-2 list-disc list-inside">
        <li>6 questions covering all main good character factors</li>
        <li>Green, amber, or red result per factor</li>
        <li>Overall risk level with explanation</li>
        <li>Links to professional advice if your situation is complex</li>
      </ul>
      <div className="mt-4">
        <ShareButton
          url="https://passtheuktest.co.uk/good-character-check"
          title="Free Good Character Check — ILR & Citizenship 2026"
          text="Free good character checker for ILR and British citizenship applications 🇬🇧"
        />
      </div>
    </div>
  )
}

function GoodCharacterContent() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        What is the good character requirement?
      </h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        UKVI assesses whether applicants are of good character before granting ILR or British citizenship. It is a holistic assessment — there is no single checklist of what passes or fails. The caseworker looks at the full picture of your history in the UK and abroad.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
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
      <p className="text-base text-ink leading-relaxed mb-3">
        For most jobs and DBS checks, spent convictions do not need to be declared. Citizenship applications are an exception. You must declare all convictions on a citizenship application — including spent ones.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Failing to declare a conviction you thought was spent is treated as deception. This is more serious in the eyes of the Home Office than the original conviction itself. If in doubt, declare it.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        Use our{' '}
        <Link href="/ilr-risk-check" className="text-brand underline">ILR refusal risk checker</Link>{' '}
        to assess other potential issues before you apply.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">
        Frequently Asked Questions
      </h2>

      <h3 className="text-sm font-bold text-ink mb-1">What is the good character requirement for ILR and citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        The good character requirement is a holistic assessment UKVI makes before granting ILR or British citizenship. It covers criminal history, immigration conduct, financial honesty (including unpaid taxes and benefit fraud), and civic behaviour. There is no single pass/fail checklist — the caseworker considers the full picture. Serious issues do not automatically mean refusal, but they must be declared. Failure to declare something UKVI later finds is treated more seriously than the original issue.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Does a spent conviction affect my ILR or citizenship application?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Yes. Unlike most other contexts, ILR and citizenship applications require you to declare all convictions including spent ones. The Rehabilitation of Offenders Act 1974 does not apply to these applications. Failure to declare a spent conviction is treated as deception — which is more serious in UKVI&apos;s eyes than the original conviction itself. If in doubt, declare it.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Do unpaid debts affect good character for ILR or citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Unpaid debts can affect the good character assessment, particularly where they involve unpaid taxes, benefit fraud, or deliberate financial dishonesty. A County Court Judgment (CCJ) is noted on your record. Ordinary consumer debt is less likely to cause a problem on its own, but deliberate non-payment of public duties is viewed more seriously.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">What about minor offences — do they affect ILR or citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Minor offences are assessed case by case. The Home Office considers the nature of the offence, the sentence given, how long ago it was, and whether there has been any repeat offending. A single caution or small fine many years ago with no pattern of further offending is typically treated more leniently than recent or repeat offences.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Can I still apply for ILR or citizenship if I have a CCJ?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        A County Court Judgment does not automatically prevent you from applying. UKVI considers whether the debt has been paid and how long ago the judgment was issued. Unsatisfied CCJs showing ongoing financial irresponsibility are viewed more negatively. Seek advice from an OISC-registered immigration adviser if you have a CCJ on your record.
      </p>

      <h3 className="text-sm font-bold text-ink mb-1">Where can I find an OISC-registered immigration adviser?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">
        Search the OISC register on GOV.UK to find a regulated immigration adviser near you. Only use advisers registered with the OISC or solicitors regulated by the Solicitors Regulation Authority (SRA). Unregulated immigration advisers operate illegally and can cause serious harm to your application.
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <GoodCharacterIntro />
      <GoodCharacterClient />
      <GoodCharacterContent />
    </>
  )
}
