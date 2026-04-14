'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Search, Loader2 } from 'lucide-react'
import { TEST_CENTRES, getCentreSlug, distanceMiles } from '@/data/testCentres'

export default function PostcodeSearch() {
  const [postcode, setPostcode] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSearch(e) {
    e.preventDefault()
    const cleaned = postcode.trim().toUpperCase().replace(/\s+/g, '')
    if (!cleaned) return

    setLoading(true)
    setError('')
    setResults(null)

    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(cleaned)}`)
      const data = await res.json()

      if (!res.ok || data.status !== 200) {
        setError('Postcode not found. Please check and try again.')
        return
      }

      const { latitude, longitude } = data.result
      const sorted = TEST_CENTRES
        .map(c => ({ ...c, miles: distanceMiles(latitude, longitude, c.lat, c.lng) }))
        .sort((a, b) => a.miles - b.miles)
        .slice(0, 5)

      setResults(sorted)
    } catch {
      setError('Could not look up that postcode. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card rounded-2xl p-5 mb-6">
      <h2 className="font-semibold text-ink mb-1">Find your nearest test centre</h2>
      <p className="text-sm text-ink-muted mb-4">Enter your postcode to see the closest centres sorted by distance.</p>

      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={postcode}
          onChange={e => setPostcode(e.target.value)}
          placeholder="e.g. SW1A 1AA"
          maxLength={8}
          className="flex-1 bg-raised border border-border rounded-xl px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-brand-500 uppercase"
          aria-label="Enter your postcode"
        />
        <button
          type="submit"
          disabled={loading || !postcode.trim()}
          className="px-4 py-2.5 bg-brand-500 text-white rounded-xl font-semibold text-sm hover:bg-brand-600 disabled:opacity-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 flex items-center gap-2"
        >
          {loading
            ? <Loader2 size={15} className="animate-spin" />
            : <Search size={15} />
          }
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {error && (
        <p className="mt-3 text-sm text-danger">{error}</p>
      )}

      {results && (
        <div className="mt-4 space-y-2">
          <p className="text-xs text-ink-muted font-medium uppercase tracking-wide mb-2">Nearest test centres</p>
          {results.map((centre, i) => (
            <Link
              key={centre.id}
              href={`/test-centres/${getCentreSlug(centre)}`}
              className="flex items-center justify-between p-3 bg-raised rounded-xl hover:bg-border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <div className="flex items-start gap-2 flex-1 min-w-0">
                <span className="text-xs font-bold text-brand-400 w-4 flex-shrink-0 mt-0.5">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{centre.city}</p>
                  <p className="text-xs text-ink-muted flex items-center gap-1 mt-0.5">
                    <MapPin size={10} className="flex-shrink-0" />
                    {centre.address}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-brand-400 flex-shrink-0 ml-3 whitespace-nowrap">
                {centre.miles < 1 ? `${(centre.miles * 5280 / 1760).toFixed(1)} mi` : `${centre.miles.toFixed(1)} mi`} →
              </span>
            </Link>
          ))}
          <p className="text-xs text-ink-muted mt-2">Distances are straight-line. Always verify the address on your booking confirmation before travelling.</p>
        </div>
      )}
    </div>
  )
}
