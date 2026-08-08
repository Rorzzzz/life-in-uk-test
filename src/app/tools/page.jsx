import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import ShareButton from '@/components/ui/ShareButton'

export async function generateMetadata() {
  return {
    title: { absolute: 'Free UK Immigration Tools & Calculators 2026 — Pass the UK Test' },
    description: 'Every free UK immigration tool in one place — ILR calculator, 180-day absence check, B1 English test, citizenship planner, cost calculator and more. No sign-up, no paywall, updated for 2026.',
    alternates: { canonical: 'https://passtheuktest.co.uk/tools' },
    keywords: ['uk immigration tools', 'ilr calculator', 'free immigration calculator uk', 'uk citizenship calculator', 'life in the uk test tools', 'ilr eligibility tools', '180 day rule calculator'],
    openGraph: {
      title: 'Free UK Immigration Tools & Calculators 2026',
      description: 'Every free UK immigration tool in one place — ILR calculator, absence check, B1 test, citizenship planner, cost calculator and more. No sign-up.',
      url: 'https://passtheuktest.co.uk/tools',
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

// The free tools, grouped into topical clusters
const GROUPS = [
  {
    heading: 'ILR & settlement tools',
    blurb: 'Work out when you qualify for Indefinite Leave to Remain, check your absences and avoid a refusal before you pay the £3,226 fee.',
    tools: [
      { href: '/ilr-calculator',   emoji: '📅', title: 'ILR Eligibility Calculator',   desc: 'Find your exact ILR qualifying date and a full cost breakdown from your visa type and entry date.' },
      { href: '/absence-calculator', emoji: '✈️', title: '180-Day Absence Calculator',  desc: 'Check every rolling 12-month window in your travel history for a breach of the 180-day rule.' },
      { href: '/ilr-checklist',    emoji: '📋', title: 'ILR Document Checklist',       desc: 'Get a printable checklist of exactly which documents your ILR application needs, by visa route.' },
      { href: '/ilr-risk-check',   emoji: '⚠️', title: 'ILR Refusal Risk Checker',     desc: 'Spot the factors that most often cause an ILR refusal — before you submit and lose the fee.' },
    ],
  },
  {
    heading: 'British citizenship tools',
    blurb: 'Plan your route from ILR to a British passport, understand the true cost, and check the requirements that trip people up.',
    tools: [
      { href: '/citizenship-planner',  emoji: '🗺️', title: 'Citizenship Planner',        desc: 'Build a personalised timeline and cost breakdown for your route to British citizenship.' },
      { href: '/citizenship-date-calculator', emoji: '🗓️', title: 'Citizenship Date Calculator', desc: 'Find the exact date you can apply for British citizenship from your ILR date — including the spouse rule.' },
      { href: '/true-cost-calculator', emoji: '💷', title: 'True Cost of Citizenship',    desc: 'Add up every fee and surcharge on the journey to British citizenship — the real total.' },
      { href: '/good-character-check', emoji: '✅', title: 'Good Character Checker',       desc: 'Check whether anything in your history could affect an ILR or citizenship decision.' },
      { href: '/b1-check',             emoji: '🗣️', title: 'B1 English Level Check',       desc: 'Test whether your English meets the B1 requirement for ILR or British citizenship.' },
    ],
  },
  {
    heading: 'Life in the UK test tools',
    blurb: 'Everything you need to prepare for and pass the Life in the UK test — the free way, with no login.',
    tools: [
      { href: '/study-plan-generator', emoji: '📚', title: 'Study Plan Generator',       desc: 'Generate a personalised Life in the UK test study plan around your test date and level.' },
      { href: '/test-exempt',          emoji: '🎓', title: 'Test Exemption Checker',      desc: 'Find out in seconds whether you are exempt from taking the Life in the UK test.' },
    ],
  },
]

// Core free test resources — reinforces internal linking to the SEO pages
const TEST_RESOURCES = [
  { href: '/practice',     title: '767 Practice Questions', desc: 'Adaptive practice by chapter with instant explanations.' },
  { href: '/mock-test',    title: '60 Free Mock Tests',     desc: 'Full 24-question timed exams under real conditions.' },
  { href: '/cheat-sheet',  title: 'Cheat Sheet',            desc: 'Every key date, name and number on one printable page.' },
  { href: '/faq',          title: 'Test FAQ',               desc: 'Answers to the most common Life in the UK test questions.' },
]

const FAQS = [
  { q: 'Are these UK immigration tools really free?', a: 'Yes — every tool on Pass the UK Test is completely free, with no sign-up, no login and no paywall. There is no premium tier. We do not collect your personal data; all calculations run in your browser.' },
  { q: 'Are the ILR and citizenship calculators up to date for 2026?', a: 'Yes. The calculators reflect the fees and rules in force for 2026, including the £3,226 ILR fee from 8 April 2026 and the announced Earned Settlement changes. Immigration rules change often, so always confirm against GOV.UK before you apply.' },
  { q: 'Which tools do I need before applying for ILR?', a: 'Most applicants should use the ILR eligibility calculator to confirm their qualifying date, the 180-day absence calculator to check their travel history, the document checklist to prepare their evidence, and the refusal risk checker before submitting. If English or the Life in the UK test is required, use the B1 check and exemption checker too.' },
  { q: 'Do the tools store or share my personal information?', a: 'No. The tools run entirely in your browser and nothing you enter is sent to a server or shared. You can use them privately without creating an account.' },
  { q: 'Can I use these tools on my phone?', a: 'Yes — every tool is mobile-first and works on any phone, tablet or computer with a web browser. Nothing to download or install.' },
]

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Free UK Immigration Tools & Calculators',
  description: 'A collection of free tools for the Life in the UK test, ILR and British citizenship.',
  itemListElement: GROUPS.flatMap(g => g.tools).map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.title,
    url: `https://passtheuktest.co.uk${t.href}`,
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function ToolsHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
          <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Home</Link>
          <span>/</span>
          <span className="px-2 py-1 text-ink">Tools</span>
        </nav>

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-2">
          Free UK Immigration Tools &amp; Calculators
        </h1>
        <p className="text-base text-ink leading-relaxed mb-3">
          Every free tool for your journey to settlement and British citizenship, in one place. Work out when you qualify for ILR, check the 180-day absence rule, plan your citizenship timeline, test your English level and prepare for the Life in the UK test — with no sign-up, no paywall, and nothing to download.
        </p>
        <p className="text-sm text-ink-muted leading-relaxed mb-4">
          These tools exist on no other Life in the UK test site. Everything runs in your browser and stays private. Updated for 2026, including the £3,226 ILR fee and the announced Earned Settlement changes.
        </p>
        <div className="mb-8">
          <ShareButton
            url="https://passtheuktest.co.uk/tools"
            title="Free UK Immigration Tools & Calculators 2026"
            text="Every free UK immigration tool in one place — ILR calculator, absence check, citizenship planner and more 🇬🇧"
          />
        </div>

        {/* Tool groups */}
        {GROUPS.map(group => (
          <section key={group.heading} className="mb-8">
            <h2 className="text-lg font-display font-bold text-ink mb-1">{group.heading}</h2>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">{group.blurb}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.tools.map(t => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="bg-card border border-border rounded-2xl p-4 hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg" aria-hidden="true">{t.emoji}</span>
                    <span className="text-sm font-semibold text-brand-400">{t.title}</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{t.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Core test resources */}
        <section className="mb-8">
          <h2 className="text-lg font-display font-bold text-ink mb-1">Life in the UK test resources</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-4">The free study tools that go with the calculators above — practise, sit a mock exam and revise the key facts.</p>
          <div className="bg-card border border-border rounded-2xl divide-y divide-border">
            {TEST_RESOURCES.map(r => (
              <Link
                key={r.href}
                href={r.href}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-raised transition-colors first:rounded-t-2xl last:rounded-b-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <div>
                  <p className="text-sm font-semibold text-ink">{r.title}</p>
                  <p className="text-xs text-ink-muted mt-0.5">{r.desc}</p>
                </div>
                <span className="text-brand-400 text-sm flex-shrink-0">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-4">
          <h2 className="text-lg font-display font-bold text-ink mb-4">Frequently asked questions</h2>
          {FAQS.map(({ q, a }) => (
            <div key={q} className="mb-4">
              <h3 className="text-sm font-bold text-ink mb-1">{q}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{a}</p>
            </div>
          ))}
        </section>

        <p className="text-xs text-ink-muted mt-4 leading-relaxed">
          Last reviewed: August 2026 — based on GOV.UK guidance. These tools are for guidance only and are not legal advice. Always check GOV.UK for the latest rules before applying.
        </p>
      </div>
    </>
  )
}
