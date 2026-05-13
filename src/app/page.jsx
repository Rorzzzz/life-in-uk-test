import Link from 'next/link'
import { CHAPTERS } from '@/data/questions'
import HomeDashboard from './HomeDashboard'

export const metadata = {
  title: { absolute: 'Pass the Life in the UK Test — Free Practice, Mock Tests & Immigration Tools' },
  description: 'Everything you need to pass the Life in the UK test — 570 free practice questions, 45 mock exams, ILR calculator, B1 English check, absence calculator and more. All free, no sign-up ever.',
  alternates: { canonical: 'https://passtheuktest.co.uk' },
  openGraph: {
    title: 'Pass the Life in the UK Test — Free Practice, Mock Tests & Immigration Tools',
    description: '570 free practice questions, 45 mock exams, ILR calculator, B1 check, absence calculator and more. All free.',
    url: 'https://passtheuktest.co.uk',
  },
  keywords: ['life in the uk test', 'pass life in the uk test', 'life in the uk test free', 'ilr calculator', 'b1 english check', 'life in the uk test preparation'],
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:       'Pass the UK Test',
  url:        'https://passtheuktest.co.uk',
  logo:       'https://passtheuktest.co.uk/icon.svg',
  sameAs:     [],
  contactPoint: {
    '@type':       'ContactPoint',
    email:         'admin@passtheuktest.co.uk',
    contactType:   'customer support',
  },
  founder: {
    '@type': 'Person',
    name:    'Rory Stephenson',
  },
}

const websiteSchema = {
  '@context':        'https://schema.org',
  '@type':           'WebSite',
  name:              'Pass the UK Test',
  url:               'https://passtheuktest.co.uk',
  potentialAction: {
    '@type':       'SearchAction',
    target:        'https://passtheuktest.co.uk/questions/{search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const STATIC_TOOLS = [
  { href: '/ilr-calculator',       label: 'Free ILR Eligibility Calculator',    desc: 'Find out if you qualify for Indefinite Leave to Remain and calculate your earliest application date.' },
  { href: '/absence-calculator',   label: 'Free UK Absence Calculator',          desc: 'Check if your time abroad breaks the 180-day rule for ILR or citizenship applications.' },
  { href: '/b1-check',             label: 'Free B1 English Level Check',         desc: 'Test your English level to see if you meet the B1 requirement for ILR or British citizenship.' },
  { href: '/true-cost-calculator', label: 'True Cost of British Citizenship',    desc: 'Calculate the full cost of your journey to British citizenship including all fees and surcharges.' },
  { href: '/citizenship-planner',  label: 'Free UK Citizenship Planner',         desc: 'Build a personalised timeline and cost breakdown for your route to British citizenship.' },
  { href: '/ilr-checklist',        label: 'Free ILR Document Checklist',         desc: 'Get a complete printable checklist of documents needed for your ILR application by visa type.' },
  { href: '/ilr-risk-check',       label: 'Free ILR Refusal Risk Checker',       desc: 'Identify factors that could cause your ILR application to be refused before you apply.' },
  { href: '/good-character-check', label: 'Free Good Character Checker',         desc: 'Check if anything in your history could affect your ILR or British citizenship application.' },
  { href: '/study-plan-generator', label: 'Free Life in the UK Study Planner',   desc: 'Generate a personalised study plan based on your test date and current knowledge level.' },
  { href: '/test-exempt',          label: 'Life in the UK Test Exemption Check', desc: 'Find out instantly if you are exempt from taking the Life in the UK test.' },
]

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <HomeDashboard chapters={CHAPTERS} />

      {/* Static section — server-rendered for Google. Not visible above fold. */}
      <section className="max-w-2xl mx-auto px-4 pb-10">
        <div className="bg-card rounded-2xl p-5 mb-4">
          <h2 className="font-display font-bold text-ink mb-2">Free Life in the UK Test Preparation</h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Pass the UK Test is the UK&apos;s most complete free resource for the Life in the UK citizenship test.
            Unlike other sites, we offer not just <Link href="/mock-test" className="text-brand-400 hover:text-brand-300">free mock tests</Link> and <Link href="/practice" className="text-brand-400 hover:text-brand-300">practice questions</Link>,
            but a full suite of free immigration tools — ILR calculator, B1 English check, absence calculator and more.
            Everything is free. No sign-up. No paywall.
          </p>
        </div>

        <div className="bg-card rounded-2xl p-5">
          <h2 className="font-display font-bold text-ink mb-4">Free Immigration Tools</h2>
          <p className="text-sm text-ink-muted mb-4">10 free tools to help with every stage of your journey to ILR and British citizenship — available on no other Life in the UK test site.</p>
          <div className="space-y-3">
            {STATIC_TOOLS.map(({ href, label, desc }) => (
              <div key={href}>
                <Link href={href} className="text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors">
                  {label}
                </Link>
                <p className="text-xs text-ink-muted mt-0.5">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
