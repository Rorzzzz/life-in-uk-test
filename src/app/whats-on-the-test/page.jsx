import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

export const metadata = {
  title: { absolute: "What's Really on the Life in the UK Test? We Analysed the Official Handbook" },
  description:
    'We ran OCR on all 93 pages of the official Life in the UK handbook. It references 172 different years — from 1066 to 2020. Here is exactly what you have to memorise.',
  alternates: { canonical: 'https://passtheuktest.co.uk/whats-on-the-test' },
  openGraph: {
    title: "What's Really on the Life in the UK Test? We Analysed the Official Handbook",
    description:
      'The official handbook references 172 different years from 1066 to 2020 across 35,000 words. A data analysis of what the citizenship test actually asks you to memorise.',
    url: 'https://passtheuktest.co.uk/whats-on-the-test',
    type: 'article',
  },
}

// ── Real figures from our analysis of the official 3rd-edition handbook ──
const DISTINCT_YEARS = 172
const TOTAL_MENTIONS = 306
const WORD_COUNT = 35000
const CENTURY_REFS = 23

const ERAS = [
  { label: 'Medieval (pre-1500)', count: 8 },
  { label: '1500–1699', count: 21 },
  { label: '1700s', count: 18 },
  { label: '1800s', count: 41 },
  { label: '1900s', count: 66 },
  { label: '2000 onwards', count: 18 },
]
const ERA_MAX = 66

const HAMMERED = ['1969', '1941', '2012', '1913', '1940']

const OTHER_LOAD = [
  { value: '11', label: 'Kings & queens named by name' },
  { value: '12', label: 'Wars & battles referenced' },
  { value: '23', label: '"Century" references on top of exact years' },
  { value: '5', label: 'Acts of Parliament named' },
]

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "What's Really on the Life in the UK Test? We Analysed the Official Handbook",
  description:
    'A data analysis of the official Life in the UK handbook (3rd edition): it references 172 distinct years from 1066 to 2020 across roughly 35,000 words.',
  datePublished: '2026-07-25',
  author: { '@type': 'Person', name: 'Rory Stephenson', url: 'https://passtheuktest.co.uk/about' },
  publisher: { '@type': 'Organization', name: 'PassTheUKTest', url: 'https://passtheuktest.co.uk' },
}

const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Date and fact density of the official Life in the UK handbook',
  description:
    'Counts of distinct years, date mentions, named monarchs, wars and Acts of Parliament in the official Life in the United Kingdom: A Guide for New Residents (3rd edition).',
  creator: { '@type': 'Organization', name: 'PassTheUKTest' },
  isAccessibleForFree: true,
  license: 'https://passtheuktest.co.uk/whats-on-the-test',
}

export default function WhatsOnTheTestPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }} />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: "What's on the Test", path: '/whats-on-the-test' }]} />

      <div className="max-w-2xl mx-auto px-4 py-6">

        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-display font-bold text-ink mb-3 leading-tight">
          What&apos;s really on the Life in the UK test? We analysed the official handbook
        </h1>
        <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-5">
          Everyone tells you the Life in the UK test is &ldquo;just history and facts.&rdquo; We wanted the actual
          numbers. So we ran optical character recognition (OCR) across all <strong className="text-ink">93 pages</strong> of
          the official handbook — <em>Life in the United Kingdom: A Guide for New Residents</em> (3rd edition) — and
          counted exactly what it asks you to memorise. The answer explains why so many people underestimate it.
        </p>

        {/* Headline stat tiles */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { value: DISTINCT_YEARS, label: 'Distinct years referenced', colour: '#3381ff' },
            { value: '1066–2020', label: 'Span of history covered', colour: '#f59e0b' },
            { value: TOTAL_MENTIONS, label: 'Total date mentions', colour: '#22d07a' },
            { value: `~${(WORD_COUNT / 1000).toFixed(0)}k`, label: 'Words in the whole book', colour: '#ff4d6d' },
          ].map(({ value, label, colour }) => (
            <div key={label} className="bg-card rounded-2xl p-4 text-center">
              <p className="font-display font-bold text-2xl md:text-3xl mb-1 font-mono" style={{ color: colour }}>{value}</p>
              <p className="text-xs text-ink-muted">{label}</p>
            </div>
          ))}
        </div>

        {/* The headline finding */}
        <div className="bg-card rounded-2xl p-5 mb-6 border-l-2 border-brand-500">
          <h2 className="font-display font-bold text-ink mb-2">172 different years — in one small book</h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-3">
            The single biggest surprise: the official handbook references <strong className="text-ink">172 distinct
            years</strong>, spanning from the Battle of Hastings in <strong className="text-ink">1066</strong> all the
            way to <strong className="text-ink">2020</strong> — nearly a thousand years of history packed into roughly
            35,000 words. Those years come up <strong className="text-ink">{TOTAL_MENTIONS} times</strong> in total, with
            another {CENTURY_REFS} looser &ldquo;century&rdquo; references on top.
          </p>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed">
            That is the real reason the test catches people out. It is not that the questions are tricky — it is the
            sheer <strong className="text-ink">density of dates and names</strong> you have to recall from a single read-through.
          </p>
        </div>

        {/* Era distribution chart */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-1">When those 172 years fall</h2>
          <p className="text-xs text-ink-muted mb-4">Distinct years referenced in the official handbook, by era</p>
          <div className="space-y-3">
            {ERAS.map(({ label, count }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-ink">{label}</span>
                  <span className="text-sm font-mono text-ink-muted">{count}</span>
                </div>
                <div className="h-3 rounded bg-raised overflow-hidden">
                  <div
                    className="h-full rounded bg-brand-500"
                    style={{ width: `${(count / ERA_MAX) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-ink-muted leading-relaxed mt-4">
            Two-thirds of the dates you need — <strong className="text-ink">107 of the 172</strong> — fall in the 1800s
            and 1900s. The modern era is where the memorisation load is heaviest, which is exactly the part most people
            under-revise.
          </p>
        </div>

        {/* Dates hammered hardest */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-2">The dates the book repeats most</h2>
          <p className="text-sm md:text-base text-ink-muted leading-relaxed mb-4">
            A handful of years come up again and again — a strong signal they are worth locking in first. These were the
            most-repeated years across the whole handbook:
          </p>
          <div className="flex flex-wrap gap-2">
            {HAMMERED.map((y) => (
              <span key={y} className="px-3 py-1.5 text-sm font-mono font-bold rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/30">
                {y}
              </span>
            ))}
          </div>
        </div>

        {/* Other memorisation load */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-4">It is not just dates</h2>
          <div className="grid grid-cols-2 gap-3">
            {OTHER_LOAD.map(({ value, label }) => (
              <div key={label} className="bg-raised rounded-xl p-3">
                <p className="font-display font-bold text-xl font-mono text-ink mb-1">{value}</p>
                <p className="text-xs text-ink-muted leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What it means for you */}
        <div className="bg-card rounded-2xl p-5 mb-6">
          <h2 className="font-display font-bold text-ink mb-3">What this means for your revision</h2>
          <ul className="space-y-2 text-sm md:text-base text-ink-muted">
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Dates are the whole game.</strong> With 172 years to know, drilling them is the highest-value thing you can do — our <Link href="/cheat-sheet" className="text-brand-400 hover:text-brand-300">cheat sheet</Link> lists the key ones on one page.</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Focus on the modern era.</strong> The 1800s and 1900s hold most of the dates and are where people lose marks.</span></li>
            <li className="flex items-start gap-2"><span className="text-success mt-0.5">✓</span> <span><strong className="text-ink">Practise under real conditions.</strong> Recall under a timer is different from recognising a fact. Our <Link href="/mock-test" className="text-brand-400 hover:text-brand-300">free mock tests</Link> mirror the real 24-question, 45-minute exam.</span></li>
          </ul>
        </div>

        {/* Methodology — honest, builds trust */}
        <div className="bg-card rounded-2xl p-5 mb-6 border border-border">
          <h2 className="text-sm font-semibold text-ink uppercase tracking-wide mb-3">Methodology</h2>
          <p className="text-sm text-ink-muted leading-relaxed mb-3">
            We rendered all 93 pages of the official 3rd-edition handbook and ran optical character recognition to
            extract roughly 35,000 words of text. We then counted every distinct four-digit year between 1000 and 2025,
            every named monarch, and every reference to a war, battle or Act of Parliament.
          </p>
          <p className="text-sm text-ink-muted leading-relaxed">
            Figures are derived from OCR of a scanned copy and are accurate to within a small margin — the odd date can
            be missed or double-counted by the scan. We publish the counts and analysis only; we do not reproduce the
            handbook&apos;s copyrighted text. This is an independent analysis by PassTheUKTest and is not affiliated with
            the Home Office or TSO.
          </p>
        </div>

        {/* Bottom links */}
        <div className="flex gap-2 text-sm text-center">
          <Link href="/mock-test" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Free Mock Tests
          </Link>
          <Link href="/cheat-sheet" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Cheat Sheet
          </Link>
          <Link href="/practice" className="flex-1 py-3 bg-raised rounded-xl text-brand-400 hover:text-brand-300 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            Practice
          </Link>
        </div>

      </div>
    </>
  )
}
