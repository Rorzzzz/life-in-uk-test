import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import RelatedTools from '@/components/ui/RelatedTools'
import ShareButton from '@/components/ui/ShareButton'
import ContentAd from '@/components/ui/ContentAd'
import B2CheckerClient from './B2CheckerClient'

const URL = 'https://passtheuktest.co.uk/b2-english-checker'

export async function generateMetadata() {
  return {
    title: { absolute: 'B2 English for ILR 2027: Free Checker (Spouses Too)' },
    description: 'From 26 March 2027 most ILR applications need B2 English. Check your route, your deadline to apply under B1 and the tests that count. Free, no sign-up.',
    alternates: { canonical: URL },
    openGraph: {
      title: 'B2 English for ILR 2027: Free Checker (Spouses Too)',
      description: 'Check in 30 seconds whether the 26 March 2027 B2 English rule applies to your ILR, and which tests count.',
      url: URL,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  }
}

const FAQS = [
  { q: 'When does the B2 English requirement for ILR start?', a: 'It applies to ILR applications made on or after 26 March 2027. It is set by Statement of Changes HC 1691, laid on 5 March 2026. If you apply before 26 March 2027, the B1 requirement still applies.' },
  { q: 'Which routes need B2 English for settlement?', a: 'Almost every ILR route that has an English requirement. That includes spouse, partner and parent ILR on the family route, Skilled Worker, Global Talent, Scale-up, Innovator Founder, UK Ancestry, Long Residence and Private Life. The change works through Appendix KoLL and changes to 13 route appendices.' },
  { q: 'Do spouses and partners need B2 English for ILR?', a: 'Yes, if they apply on or after 26 March 2027. Partner and parent ILR on the family route must meet Appendix KoLL, and HC 1691 raises Appendix KoLL to B2 speaking and listening. If you apply before 26 March 2027, B1 is still enough.' },
  { q: 'Does British citizenship need B2 English?', a: 'No. HC 1691 changes the Immigration Rules for settlement only. The English level for British citizenship is set by separate rules and stays at B1 speaking and listening.' },
  { q: 'Does B2 for ILR mean reading and writing too?', a: 'The settlement rule is B2 in speaking and listening. However, every B2 test on the Home Office approved list today is a four-skill test, so in practice you will sit reading and writing as well, unless a speaking-and-listening B2 test is approved before March 2027.' },
  { q: 'Do dependants need B2 English for ILR?', a: 'Yes. The B2 level applies to every applicant whose ILR application is made on or after 26 March 2027 and who must meet the English requirement. That includes dependant partners and adult children, unless they are exempt.' },
  { q: 'How recent does my B2 test need to be?', a: 'You must pass the test in the 2 years before the date you apply. If you plan to apply in 2028, a test taken in early 2026 will be too old.' },
  { q: 'Can I reuse my B1 English certificate?', a: 'Not for an application made on or after 26 March 2027. English shown in an earlier application can only be reused if it was at the level your new application needs. A B1 result does not meet B2.' },
  { q: 'What if I cannot reach B2?', a: 'The new rules accept evidence of at least 75 guided learning hours (not self-study) in the 12 months before you apply, together with a teacher’s view that you are unlikely to reach B2 with further study.' },
  { q: 'Who is exempt from the English requirement?', a: 'You are exempt if you are under 18 or 65 or over on the date you apply, or have a long-term physical or mental condition confirmed by a doctor. Nationals of exempt countries such as the USA, Canada, Australia, New Zealand and Jamaica are also exempt. A degree taught or researched in English can meet the requirement. So can 15 years of continuous leave on certain routes.' },
  { q: 'Can I reuse my ILR English for British citizenship?', a: 'Usually, yes. Citizenship needs B1 speaking and listening. English you showed successfully for ILR at B1 or B2 is at the level citizenship needs, so you do not normally need another test.' },
]

const appSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'B1 or B2 English for ILR Checker',
  url: URL,
  description: 'Check whether you need B1 or B2 English for your ILR application under the 26 March 2027 rule.',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  publisher: { '@type': 'Organization', name: 'Pass the UK Test', url: 'https://passtheuktest.co.uk' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
}

const H2 = 'text-lg font-display font-bold text-ink mb-3 mt-8'
const P = 'text-base text-ink leading-relaxed mb-3'

export default function B2EnglishCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }, { name: 'B1 or B2 English Checker', path: '/b2-english-checker' }]} />

      <div className="max-w-2xl mx-auto px-4 pt-6 pb-2">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">Do I Need B1 or B2 English for ILR?</h1>
        <div className="bg-card border border-border rounded-2xl p-4 mb-3">
          <p className="text-base text-ink leading-relaxed">
            Most people applying for ILR on or after 26 March 2027 need B2 English. This includes spouses and partners, Skilled Workers and Global Talent. If you apply before that date, B1 is still enough. You are exempt if you are 65 or over, have a long-term condition or are from an exempt country.
          </p>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed mb-3">
          Answer three questions to see your level, your deadline and the tests that count. Then practise with our <Link href="/b2-practice" className="text-brand-400 underline">free B2 English tests</Link>.
        </p>
        <div className="mb-2">
          <ShareButton url={URL} title="B2 English for ILR 2027: Free Checker (Spouses Too)" text="Check if the new B2 English rule applies to your ILR 🇬🇧" />
        </div>
      </div>

      <B2CheckerClient />

      <div className="max-w-2xl mx-auto px-4 py-6">
        <h2 className={H2}>How the 2027 B2 rule works</h2>
        <p className={P}>
          Statement of Changes HC 1691 was laid on 5 March 2026. It raises the settlement English level from B1 to B2 on almost every route, including the family route. It applies to applications made <strong>on or after 26 March 2027</strong>. That includes people already on a route to settlement. The date you apply is what counts. An application made on 25 March 2027 is still assessed at B1.
        </p>
        <p className={P}>
          The rule itself is B2 in speaking and listening. In practice, every B2 test on the Home Office&apos;s approved list today also tests reading and writing, so plan for a four-skill test.
        </p>

        <ContentAd id="1" />

        <h2 className={H2}>Who is not affected</h2>
        <p className={P}>
          British citizenship is not affected: it stays at B1. You are exempt from the English requirement if you are under 18 or 65 or over, have a long-term physical or mental condition, or are a national of an exempt country. If you have had 15 years of continuous leave on certain routes, you are treated as meeting it. A degree taught or researched in English, confirmed by Ecctis, can meet the requirement instead of a test.
        </p>

        <h2 className={H2}>Frequently asked questions</h2>
        {FAQS.map(({ q, a }) => (
          <div key={q}>
            <h3 className="text-sm font-bold text-ink mb-1">{q}</h3>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">{a}</p>
          </div>
        ))}

        <h2 className={H2}>Official resources</h2>
        <ul className="text-sm space-y-2 mb-6">
          {[
            ['https://www.gov.uk/government/publications/statement-of-changes-to-the-immigration-rules-hc-1619-5-march-2026', 'Statement of Changes HC 1691 (GOV.UK)'],
            ['https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-koll', 'Appendix KoLL: knowledge of language and life (GOV.UK)'],
            ['https://www.gov.uk/guidance/prove-your-english-language-abilities-with-a-secure-english-language-test-selt', 'Approved English tests (SELT) list (GOV.UK)'],
            ['https://www.gov.uk/english-language/exemptions', 'English language exemptions (GOV.UK)'],
          ].map(([href, label]) => (
            <li key={href}><a href={href} target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 underline">{label}</a></li>
          ))}
        </ul>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm font-bold text-ink mb-3">Related guides and practice</p>
          <div className="grid grid-cols-1 gap-2">
            {[
              { href: '/articles/english-language-requirements-ilr-2026', label: 'B2 English requirement 2027: what changes and when' },
              { href: '/b2-practice', label: 'Free B2 English practice and mock tests' },
              { href: '/tools', label: 'All free immigration tools' },
            ].map(({ href, label }) => (
              <Link key={href} href={href} className="text-sm text-brand-400 hover:text-brand-300 transition-colors">→ {label}</Link>
            ))}
          </div>
        </div>

        <p className="text-xs text-ink-muted mt-8 leading-relaxed">
          Last reviewed: November 2026. Based on Statement of Changes HC 1691, the GOV.UK approved SELT list and GOV.UK English language guidance. This tool is for guidance only and is not legal advice. Always check GOV.UK before applying.
        </p>
      </div>

      <RelatedTools current="b2-english-checker" />
    </>
  )
}
