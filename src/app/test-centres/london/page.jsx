import Link from 'next/link'
import { MapPin, AlertTriangle, Train } from 'lucide-react'
import { TEST_CENTRES, getCentreSlug } from '@/data/testCentres'

const londonCentres = TEST_CENTRES.filter(c => c.region === 'London')

export const metadata = {
  title: 'Life in the UK Test Centres London — All 10 Locations 2026',
  description: `All ${londonCentres.length} Life in the UK test centres in London: City, Croydon, Hammersmith, Ilford, Lewisham, Southall, Stratford, Tottenham, Wembley, Wood Green. Addresses, transport and booking links.`,
  alternates: { canonical: 'https://passtheuktest.co.uk/test-centres/london' },
  keywords: [
    'life in the uk test centre london',
    'life in the uk test london locations',
    'london life in the uk test booking',
    'life in the uk test centre near me london',
  ],
  openGraph: {
    title: 'Life in the UK Test Centres London — All 10 Locations 2026',
    description: `All ${londonCentres.length} approved Life in the UK test centres in London with addresses and transport links.`,
    url: 'https://passtheuktest.co.uk/test-centres/london',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

// Area guidance: which centre suits which part of London
const AREA_NOTES = {
  'london-city':       'Central/East London, City workers, near Liverpool Street',
  'london-croydon':    'South London, Surrey borders — also serves Sutton, Bromley',
  'london-hammersmith':'West London — also serves Fulham, Shepherd\'s Bush, Chiswick',
  'london-ilford':     'East London — also serves Barking, Romford, Dagenham',
  'london-lewisham':   'South-East London — also serves Greenwich, Catford, Deptford',
  'london-southall':   'West/Outer London — also serves Hayes, Uxbridge, Hounslow',
  'london-stratford':  'East London, Olympic Park area — also serves Hackney, Newham',
  'london-tottenham':  'North-East London — also serves Edmonton, Haringey, Enfield',
  'london-wembley':    'North-West London — also serves Harrow, Brent, Northolt',
  'london-wood-green': 'North London — also serves Muswell Hill, Hornsey, Palmers Green',
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Life in the UK Test Centres in London',
  description: 'All approved Life in the UK test centre locations in London',
  numberOfItems: londonCentres.length,
  itemListElement: londonCentres.map((centre, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: `Life in the UK Test Centre — ${centre.city}`,
    item: {
      '@type': 'LocalBusiness',
      name: `Life in the UK Test Centre — ${centre.city}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: centre.address,
        addressCountry: 'GB',
      },
    },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://passtheuktest.co.uk' },
    { '@type': 'ListItem', position: 2, name: 'Test Centres', item: 'https://passtheuktest.co.uk/test-centres' },
    { '@type': 'ListItem', position: 3, name: 'London', item: 'https://passtheuktest.co.uk/test-centres/london' },
  ],
}

export default function LondonTestCentresPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-ink-muted mb-4" aria-label="Breadcrumb">
          <Link href="/test-centres" className="hover:text-ink">Test Centres</Link>
          <span className="mx-1.5">›</span>
          <span className="text-ink">London</span>
        </nav>

        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          Life in the UK Test Centres in London
        </h1>
        <p className="text-ink-muted text-base mb-1">
          There are {londonCentres.length} approved Life in the UK test centres in London. Slots in London can book out 1–3 weeks in advance, especially at weekends — book as early as possible once your practice scores are consistently above 90%.
        </p>
        <p className="text-sm text-ink-faint mb-5">Last verified: April 2026.</p>

        {/* Practical tips */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 mb-6 flex gap-3">
          <Train size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-ink mb-1">Before you travel</p>
            <ul className="text-sm text-ink-muted space-y-1">
              <li>Do a practice run to the centre — arriving late means failing the session and losing your £50 fee</li>
              <li>Take a photograph of your pass screen before leaving the test room — you receive your Unique Reference Number by email, not as a printed certificate</li>
              <li>If London slots are full, check Guildford, Reading or Brighton — all are under 45 minutes by train</li>
            </ul>
          </div>
        </div>

        {/* Safety disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 mb-6 flex gap-3">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-ink mb-1">Always verify before you travel</p>
            <p className="text-sm text-ink-muted">
              Test centre addresses change. <strong className="text-ink">Do not rely solely on this list.</strong> Always check the address on your booking confirmation email and verify against the official{' '}
              <a href="https://www.gov.uk/life-in-the-uk-test" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline">
                GOV.UK booking page
              </a>{' '}
              before you travel.
            </p>
          </div>
        </div>

        {/* London centre grid */}
        <h2 className="text-lg font-display font-bold text-ink mb-3">
          All {londonCentres.length} London test centres
        </h2>
        <div className="space-y-3 mb-8">
          {londonCentres.map(centre => {
            const slug = getCentreSlug(centre)
            const areaNote = AREA_NOTES[slug]
            const shortName = centre.city.replace('London — ', '')
            return (
              <Link
                key={centre.id}
                href={`/test-centres/${slug}`}
                className="block bg-card rounded-xl p-4 hover:bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-ink text-base">{shortName}</p>
                    <p className="text-sm text-ink-muted mt-0.5 flex items-start gap-1">
                      <MapPin size={13} className="flex-shrink-0 mt-0.5" />
                      {centre.address}
                    </p>
                    {areaNote && (
                      <p className="text-xs text-ink-faint mt-1">{areaNote}</p>
                    )}
                  </div>
                  <span className="text-brand-400 text-sm font-medium flex-shrink-0 mt-0.5">Details →</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Links to other resources */}
        <div className="border-t border-border pt-5 space-y-2 text-sm text-ink-muted">
          <p>
            <Link href="/test-centres" className="text-brand-400 hover:underline">← All UK test centres</Link>
          </p>
          <p>
            <Link href="/articles/how-to-book-the-life-in-the-uk-test" className="text-brand-400 hover:underline">How to book the Life in the UK test</Link>
          </p>
          <p>
            <Link href="/cheat-sheet" className="text-brand-400 hover:underline">Key facts cheat sheet — print before your test</Link>
          </p>
          <p>
            <Link href="/faq" className="text-brand-400 hover:underline">Frequently asked questions about the test</Link>
          </p>
        </div>
      </div>
    </>
  )
}
