import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { TEST_CENTRES, REGIONS, getCentresByRegion, getGoogleMapsURL } from '@/data/testCentres'
import { MapPin } from 'lucide-react'

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
      <p className="text-ink-muted text-base mb-6">
        {TEST_CENTRES.length} approved Life in the UK test centres across the UK.
      </p>

      {REGIONS.map(region => {
        const centres = getCentresByRegion(region)
        return (
          <div key={region} className="mb-8">
            <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">{region}</h2>
            <div className="space-y-2">
              {centres.map(centre => (
                <div key={centre.id} className="bg-card rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-ink text-base">{centre.city}</p>
                      <p className="text-base text-ink-muted mt-0.5 flex items-start gap-1">
                        <MapPin size={13} className="flex-shrink-0 mt-1" />
                        {centre.address}
                      </p>
                    </div>
                    <a
                      href={getGoogleMapsURL(centre)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 whitespace-nowrap font-medium rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      Map →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}

      <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 mt-6">
        <p className="font-semibold text-ink mb-1">Book your test</p>
        <p className="text-base text-ink-muted mb-3">Official booking at lifeintheuktestsupport.co.uk. Cost: £50.</p>
        <div className="flex gap-2 flex-wrap">
          <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">FAQ about booking</Link>
          <Link href="/how-to-pass" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">How to prepare</Link>
        </div>
      </div>
    </div>
    </>
  )
}
