import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { TEST_CENTRES, REGIONS, getCentresByRegion, getCentreSlug } from '@/data/testCentres'
import { MapPin, AlertTriangle } from 'lucide-react'
import PostcodeSearch from '@/components/ui/PostcodeSearch'

export const metadata = {
  title: 'Life in the UK Test Centres — All 60+ UK Locations',
  description: 'Find your nearest Life in the UK test centre. Full list of all approved test venues across England, Scotland, Wales and Northern Ireland with addresses.',
  alternates: { canonical: 'https://passtheuktest.co.uk/test-centres' },
}

export default function TestCentresPage() {
  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Test Centres', path: '/test-centres' }]} />
      <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-2">Test Centres</h1>
      <p className="text-ink-muted text-base mb-4">
        {TEST_CENTRES.length} approved Life in the UK test centres across the UK. Last verified: April 2026.
      </p>

      <PostcodeSearch />

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
          <div key={region} className="mb-8">
            <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">{region}</h2>
            <div className="space-y-2">
              {centres.map(centre => (
                <Link key={centre.id} href={`/test-centres/${getCentreSlug(centre)}`} className="block bg-card rounded-xl p-4 hover:bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-ink text-base">{centre.city}</p>
                      <p className="text-base text-ink-muted mt-0.5 flex items-start gap-1">
                        <MapPin size={13} className="flex-shrink-0 mt-1" />
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
        <p className="font-semibold text-ink mb-1">Book your test</p>
        <p className="text-base text-ink-muted mb-3">Official booking at gov.uk/life-in-the-uk-test. Cost: £50.</p>
        <div className="flex gap-2 flex-wrap">
          <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">FAQ about booking</Link>
          <Link href="/how-to-pass" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">How to prepare</Link>
        </div>
      </div>
    </div>
    </>
  )
}
