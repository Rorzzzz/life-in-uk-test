import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import RelatedTools from '@/components/ui/RelatedTools'
import ShareButton from '@/components/ui/ShareButton'
import CitizenshipDateClient from './CitizenshipDateClient'

export async function generateMetadata() {
  return {
    title: { absolute: 'When Can I Apply for British Citizenship? Free Date Calculator 2026' },
    description: 'Free calculator — find the exact date you can apply for British citizenship from your ILR date. Handles the 12-month wait and the spouse-of-a-British-citizen exception. No sign-up.',
    alternates: { canonical: 'https://passtheuktest.co.uk/citizenship-date-calculator' },
    keywords: ['when can i apply for british citizenship', 'british citizenship date calculator', 'citizenship application date', 'how long after ilr can i apply for citizenship', '12 month rule citizenship', 'naturalisation date calculator'],
    openGraph: {
      title: 'When Can I Apply for British Citizenship? Free Date Calculator',
      description: 'Find the exact date you can apply for British citizenship from your ILR date — including the spouse exception. Free, no sign-up.',
      url: 'https://passtheuktest.co.uk/citizenship-date-calculator',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'British Citizenship Date Calculator',
  url: 'https://passtheuktest.co.uk/citizenship-date-calculator',
  description: 'Find the earliest date you can apply for British citizenship from your ILR grant date.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  publisher: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How long after ILR can I apply for British citizenship?', acceptedAnswer: { '@type': 'Answer', text: 'Most people must hold Indefinite Leave to Remain (ILR) for 12 months before applying for British citizenship. If you are married to or in a civil partnership with a British citizen, there is no 12-month wait — you can apply as soon as you hold ILR, provided you meet the 3-year residence requirement.' } },
    { '@type': 'Question', name: 'Can I apply for citizenship immediately after getting ILR if my spouse is British?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. If you are married to or in a civil partnership with a British citizen, the 12-month qualifying period after ILR does not apply. You can apply as soon as you have ILR, as long as you have lived in the UK for 3 years and meet the other requirements.' } },
    { '@type': 'Question', name: 'What is the 12-month rule for British citizenship?', acceptedAnswer: { '@type': 'Answer', text: 'The 12-month rule means most applicants must have held ILR (or settled status) for at least 12 months before they can apply to naturalise as a British citizen. The exception is spouses and civil partners of British citizens, who can apply straight away.' } },
    { '@type': 'Question', name: 'How many days can I spend outside the UK before applying for citizenship?', acceptedAnswer: { '@type': 'Answer', text: 'You must not have spent more than 90 days outside the UK in the 12 months immediately before your application. Over the full qualifying period, the limit is usually 450 days for the 5-year route or 270 days for the 3-year spouse route.' } },
    { '@type': 'Question', name: 'Do I need to pass the Life in the UK test before applying for citizenship?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You must have passed the Life in the UK test before applying for naturalisation, unless you are exempt (for example, aged 65 or over). If you passed it for your ILR application, that same pass counts — you do not need to sit it again.' } },
  ],
}

function Intro() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">
        When Can I Apply for British Citizenship?
      </h1>
      <p className="text-base text-ink leading-relaxed mb-3">
        Enter the date you were granted Indefinite Leave to Remain (ILR) and this free calculator shows the earliest date you can apply for British citizenship — including the special rule for spouses and civil partners of British citizens.
      </p>
      <div className="mb-4">
        <ShareButton
          url="https://passtheuktest.co.uk/citizenship-date-calculator"
          title="When Can I Apply for British Citizenship? Free Date Calculator"
          text="Find out exactly when you can apply for British citizenship 🇬🇧"
        />
      </div>
    </div>
  )
}

function Content() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h2 className="text-lg font-display font-bold text-ink mb-3">The 12-month rule explained</h2>
      <p className="text-base text-ink leading-relaxed mb-3">
        For most people, you must hold ILR (also called settled status) for <strong>12 months</strong> before you can apply to naturalise as a British citizen. So if you were granted ILR on 1 June 2026, the earliest you could normally apply is 1 June 2027.
      </p>
      <p className="text-base text-ink leading-relaxed mb-3">
        The big exception: if you are <strong>married to or in a civil partnership with a British citizen</strong>, the 12-month wait does not apply. You can apply as soon as you have ILR, as long as you have lived in the UK for at least 3 years.
      </p>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">The other requirements</h2>
      <p className="text-base text-ink leading-relaxed mb-3">Meeting the date is only part of it. To naturalise you also need to:</p>
      <ul className="text-sm text-ink-muted leading-relaxed space-y-1 mb-4 list-disc list-inside">
        <li>Have spent no more than <strong className="text-ink">90 days outside the UK</strong> in the 12 months before applying</li>
        <li>Meet the total absence limit (450 days over 5 years, or 270 days over 3 years)</li>
        <li>Have passed the <Link href="/mock-test" className="text-brand-400 hover:text-brand-300 underline">Life in the UK test</Link> (unless exempt)</li>
        <li>Meet the <Link href="/b1-check" className="text-brand-400 hover:text-brand-300 underline">B1 English requirement</Link></li>
        <li>Meet the <Link href="/good-character-check" className="text-brand-400 hover:text-brand-300 underline">good character requirement</Link></li>
      </ul>

      <h2 className="text-lg font-display font-bold text-ink mb-3 mt-8">Frequently asked questions</h2>

      <h3 className="text-sm font-bold text-ink mb-1">How long after ILR can I apply for citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">Most people wait 12 months after getting ILR. Spouses and civil partners of British citizens can apply straight away.</p>

      <h3 className="text-sm font-bold text-ink mb-1">What is the 12-month rule?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">You must have held ILR or settled status for at least 12 months before applying to naturalise — unless you are the spouse or civil partner of a British citizen.</p>

      <h3 className="text-sm font-bold text-ink mb-1">Do I need to retake the Life in the UK test for citizenship?</h3>
      <p className="text-sm text-ink-muted leading-relaxed mb-4">No. If you passed it for your ILR application, that pass still counts. If you have not passed it yet, start with our <Link href="/mock-test" className="text-brand-400 hover:text-brand-300 underline">free mock tests</Link>.</p>

      <div className="mt-8 pt-6 border-t border-border">
        <p className="text-sm font-bold text-ink mb-3">Related tools and guides</p>
        <div className="grid grid-cols-1 gap-2">
          {[
            { href: '/ilr-calculator', label: 'ILR eligibility calculator' },
            { href: '/citizenship-planner', label: 'Full citizenship planner' },
            { href: '/true-cost-calculator', label: 'True cost of British citizenship' },
            { href: '/articles/when-can-i-apply-for-british-citizenship', label: 'When can I apply for British citizenship? (guide)' },
            { href: '/articles/ilr-to-british-citizenship', label: 'From ILR to British citizenship' },
            { href: '/tools', label: 'All free immigration tools' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-brand-400 hover:text-brand-300 transition-colors">→ {label}</Link>
          ))}
        </div>
      </div>

      <p className="text-xs text-ink-muted mt-8 leading-relaxed">
        Last reviewed: August 2026 — based on GOV.UK guidance. This tool is for guidance only and is not legal advice. Always check GOV.UK before applying.
      </p>
    </div>
  )
}

export default function CitizenshipDateCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }, { name: 'Citizenship Date Calculator', path: '/citizenship-date-calculator' }]} />
      <Intro />
      <CitizenshipDateClient />
      <Content />
      <RelatedTools current="citizenship-date-calculator" />
    </>
  )
}
