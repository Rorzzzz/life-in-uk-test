import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { TEST_CENTRES, REGIONS, getCentresByRegion, getCentreSlug } from '@/data/testCentres'
import { MapPin, AlertTriangle } from 'lucide-react'
import PostcodeSearch from '@/components/ui/PostcodeSearch'

export const metadata = {
  title: 'Life in the UK Test Centres Near You — All 60+ Locations 2026',
  description: `Find your nearest Life in the UK test centre. ${TEST_CENTRES.length} approved test venues across England, Scotland, Wales and Northern Ireland — addresses, maps links and booking info.`,
  alternates: { canonical: 'https://passtheuktest.co.uk/test-centres' },
  keywords: [
    'life in the uk test centre near me',
    'life in the uk test centres near me',
    'nearest life in the uk test centre',
    'life in the uk test centre locations',
    'life in the uk test venues 2026',
  ],
  openGraph: {
    title: 'Life in the UK Test Centres Near You — All 60+ Locations 2026',
    description: `Find your nearest Life in the UK test centre. ${TEST_CENTRES.length} approved venues across England, Scotland, Wales and Northern Ireland.`,
    url: 'https://passtheuktest.co.uk/test-centres',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

// Region slugs for jump links
function regionSlug(region) {
  return region.toLowerCase().replace(/\s+/g, '-')
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Life in the UK Test Centres',
  description: 'All approved Life in the UK test centre locations across the United Kingdom',
  numberOfItems: TEST_CENTRES.length,
  itemListElement: TEST_CENTRES.map((centre, i) => ({
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

export default function TestCentresPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', path: '/' },
          { name: 'Test Centres', path: '/test-centres' },
        ]}
      />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          Life in the UK Test Centres Near You
        </h1>
        <p className="text-ink-muted text-base mb-1">
          {TEST_CENTRES.length} approved test centres across England, Scotland, Wales and Northern Ireland.
          Enter your postcode below to find the nearest venue, or jump to your region.
        </p>
        <p className="text-sm text-ink-faint mb-5">Last verified: April 2026.</p>

        <PostcodeSearch />

        {/* Region jump navigation */}
        <div className="mb-6">
          <p className="text-xs text-ink-faint uppercase tracking-wide font-semibold mb-2">Jump to region</p>
          <div className="flex flex-wrap gap-2">
            {REGIONS.map(region => (
              <a
                key={region}
                href={`#${regionSlug(region)}`}
                className="px-3 py-1.5 text-sm bg-card border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/50 transition-colors"
              >
                {region}
                <span className="ml-1.5 text-xs text-ink-faint">
                  ({getCentresByRegion(region).length})
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Safety disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 mb-6 flex gap-3">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-ink mb-1">Always verify before you travel</p>
            <p className="text-sm text-ink-muted">
              Test centre addresses change. <strong className="text-ink">Do not rely solely on this list.</strong> Always check the address on your booking confirmation email and verify against the official{' '}
              <a
                href="https://www.gov.uk/life-in-the-uk-test"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline"
              >
                GOV.UK booking page
              </a>{' '}
              before you travel. Arriving at the wrong location could mean losing your £50 fee.
            </p>
          </div>
        </div>

        {REGIONS.map(region => {
          const centres = getCentresByRegion(region)
          return (
            <div key={region} id={regionSlug(region)} className="mb-8 scroll-mt-20">
              <h2 className="text-lg font-display font-bold text-ink mb-1 border-b border-border pb-2 flex items-center justify-between">
                {region}
                <span className="text-sm font-normal text-ink-faint">{centres.length} centre{centres.length !== 1 ? 's' : ''}</span>
              </h2>
              <div className="space-y-2 mt-3">
                {centres.map(centre => (
                  <Link
                    key={centre.id}
                    href={`/test-centres/${getCentreSlug(centre)}`}
                    className="block bg-card rounded-xl p-4 hover:bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-ink text-base">{centre.city}</p>
                        <p className="text-sm text-ink-muted mt-0.5 flex items-start gap-1">
                          <MapPin size={13} className="flex-shrink-0 mt-0.5" />
                          {centre.address}
                        </p>
                      </div>
                      <span className="text-sm text-brand-400 whitespace-nowrap font-medium flex-shrink-0">
                        View →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 mt-6">
          <p className="font-semibold text-ink mb-1">Ready to book?</p>
          <p className="text-sm text-ink-muted mb-3">
            Book your test at{' '}
            <a
              href="https://www.gov.uk/life-in-the-uk-test"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-400 hover:underline"
            >
              gov.uk/life-in-the-uk-test
            </a>
            . The test costs £50 and takes around 45 minutes.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/exam-format"
              className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              What to expect on the day
            </Link>
            <Link
              href="/faq"
              className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              FAQ about booking
            </Link>
            <Link
              href="/how-to-pass"
              className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              How to prepare
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
