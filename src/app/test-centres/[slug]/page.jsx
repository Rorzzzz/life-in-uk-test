import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, AlertTriangle, Clock, PoundSterling, CheckCircle } from 'lucide-react'
import { TEST_CENTRES, getCentreSlug, getCentreBySlug, getCentresByRegion } from '@/data/testCentres'

export async function generateStaticParams() {
  return TEST_CENTRES.map(centre => ({ slug: getCentreSlug(centre) }))
}

export async function generateMetadata({ params }) {
  const centre = getCentreBySlug(params.slug)
  if (!centre) return {}
  const cityName = centre.city.replace(' — ', ' ')
  return {
    title: `Life in the UK Test Centre ${cityName} — Address & Booking`,
    description: `Life in the UK test centre in ${cityName}. Address: ${centre.address}. Book online at GOV.UK — £50, 24 questions, 45 minutes. Always verify address on your booking confirmation.`,
    alternates: { canonical: `https://passtheuktest.co.uk/test-centres/${params.slug}` },
  }
}

export default function TestCentreCityPage({ params }) {
  const centre = getCentreBySlug(params.slug)
  if (!centre) notFound()

  const cityName = centre.city.replace(' — ', ' ')
  const nearbycentres = getCentresByRegion(centre.region)
    .filter(c => getCentreSlug(c) !== params.slug)
    .slice(0, 4)

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentOffice',
    name: `Life in the UK Test Centre — ${cityName}`,
    description: `Official Life in the UK citizenship test centre in ${cityName}.`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: centre.address.split(',')[0],
      addressLocality: cityName,
      addressCountry: 'GB',
    },
    url: 'https://www.gov.uk/life-in-the-uk-test',
    serviceType: 'Life in the UK Test',
    areaServed: cityName,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://passtheuktest.co.uk' },
      { '@type': 'ListItem', position: 2, name: 'Test Centres', item: 'https://passtheuktest.co.uk/test-centres' },
      { '@type': 'ListItem', position: 3, name: cityName, item: `https://passtheuktest.co.uk/test-centres/${params.slug}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
          <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
          <span>/</span>
          <Link href="/test-centres" className="px-2 py-1 hover:text-ink rounded transition-colors">Test Centres</Link>
          <span>/</span>
          <span className="px-2 py-1 text-ink">{cityName}</span>
        </nav>

        <h1 className="text-2xl font-display font-bold text-ink mb-2">
          Life in the UK Test Centre — {cityName}
        </h1>
        <p className="text-ink-muted text-base mb-6">
          Official test centre address and booking information for {cityName}.
        </p>

        {/* Address card */}
        <div className="bg-card rounded-2xl p-5 mb-4">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={18} className="text-brand-400" />
            </div>
            <div>
              <p className="font-semibold text-ink mb-1">{centre.city}</p>
              <p className="text-base text-ink-muted">{centre.address}</p>
              <p className="text-xs text-ink-muted mt-1">{centre.region}</p>
            </div>
          </div>
          <a
            href="https://www.gov.uk/life-in-the-uk-test"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block text-center py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Book at this test centre — GOV.UK →
          </a>
        </div>

        {/* Google Maps embed */}
        <div className="rounded-2xl overflow-hidden border border-border mb-4" style={{ height: '220px' }}>
          <iframe
            title={`Map of ${cityName} test centre`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(centre.address)}&output=embed&zoom=15`}
            width="100%"
            height="220"
            style={{ border: 0, display: 'block' }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Safety disclaimer */}
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-4 mb-6 flex gap-3">
          <AlertTriangle size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-ink-muted">
            <strong className="text-ink">Always verify the address on your booking confirmation</strong> before you travel. Test centre addresses can change. The address shown here was last verified April 2026 — do not rely solely on this page.
          </p>
        </div>

        {/* Test info */}
        <div className="bg-card rounded-2xl p-5 mb-4">
          <h2 className="font-semibold text-ink mb-4">About the test</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '📝', label: 'Questions', value: '24 multiple choice' },
              { icon: '⏱️', label: 'Time limit', value: '45 minutes' },
              { icon: '🎯', label: 'Pass mark', value: '18/24 (75%)' },
              { icon: '💷', label: 'Cost', value: '£50 per attempt' },
              { icon: '⚡', label: 'Results', value: 'Shown immediately' },
              { icon: '📄', label: 'ID required', value: 'Passport (or pre-2025 BRP)' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-2">
                <span className="text-base">{icon}</span>
                <div>
                  <p className="text-xs text-ink-muted">{label}</p>
                  <p className="text-sm font-medium text-ink">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What to bring */}
        <div className="bg-card rounded-2xl p-5 mb-4">
          <h2 className="font-semibold text-ink mb-3">What to bring to {cityName}</h2>
          <ul className="space-y-2">
            {[
              'Valid passport, pre-2025 BRP, or EU/EEA national identity card — eVisas and driving licences are not accepted',
              'Your booking confirmation email or reference number',
              'Arrive at least 15 minutes before your appointment time',
            ].map(item => (
              <li key={item} className="flex items-start gap-2 text-sm text-ink-muted">
                <CheckCircle size={14} className="text-success flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Nearby centres */}
        {nearbycentres.length > 0 && (
          <div className="bg-card rounded-2xl p-5 mb-4">
            <h2 className="font-semibold text-ink mb-3">Other centres in {centre.region}</h2>
            <div className="space-y-2">
              {nearbycentres.map(c => (
                <Link
                  key={c.id}
                  href={`/test-centres/${getCentreSlug(c)}`}
                  className="flex items-center justify-between p-3 bg-raised rounded-xl hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">{c.city}</p>
                    <p className="text-xs text-ink-muted">{c.address}</p>
                  </div>
                  <span className="text-xs text-brand-400 flex-shrink-0 ml-2">View →</span>
                </Link>
              ))}
            </div>
            <Link href="/test-centres" className="block text-center text-sm text-brand-400 hover:text-brand-300 mt-3 transition-colors">
              View all 62 test centres →
            </Link>
          </div>
        )}

        {/* Prepare CTA */}
        <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-5 text-center">
          <p className="font-semibold text-ink mb-1">Ready to book? Make sure you are prepared first.</p>
          <p className="text-sm text-ink-muted mb-4">The pass rate is 67%. Practice until you are scoring 90%+ before spending £50.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/practice" className="px-5 py-2.5 bg-brand-500 text-white rounded-xl font-semibold text-sm hover:bg-brand-600 transition-colors">
              Free practice questions
            </Link>
            <Link href="/exam" className="px-5 py-2.5 bg-card border border-border text-ink rounded-xl font-semibold text-sm hover:bg-raised transition-colors">
              Take a mock exam
            </Link>
          </div>
        </div>

        {/* Internal links */}
        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          <Link href="/articles/how-to-book-the-life-in-the-uk-test" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 rounded-xl hover:bg-brand-500/10 transition-colors">How to book</Link>
          <Link href="/articles/what-id-do-you-need-for-the-life-in-the-uk-test" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 rounded-xl hover:bg-brand-500/10 transition-colors">ID requirements</Link>
          <Link href="/exam-format" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 rounded-xl hover:bg-brand-500/10 transition-colors">Exam format</Link>
          <Link href="/articles/how-much-does-the-life-in-the-uk-test-cost" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 rounded-xl hover:bg-brand-500/10 transition-colors">Test cost</Link>
        </div>
      </div>
    </>
  )
}
