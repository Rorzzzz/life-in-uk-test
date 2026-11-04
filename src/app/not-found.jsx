import Link from 'next/link'
import NoAds from '@/components/ui/NoAds'

const POPULAR = [
  { href: '/mock-test',   label: 'Free Life in the UK mock tests' },
  { href: '/practice',    label: 'Practise by chapter' },
  { href: '/study',       label: 'Study guide' },
  { href: '/cheat-sheet', label: 'Cheat sheet: key dates and facts' },
  { href: '/faq',         label: 'Life in the UK test FAQ' },
  { href: '/articles',    label: 'Guides and articles' },
]

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4 py-12">
      {/* Error pages must not show ads (Google Publisher Policy 11112688) */}
      <NoAds />
      <p className="text-6xl mb-4">🗺️</p>
      <h1 className="text-3xl font-display font-bold text-ink mb-2">Page not found</h1>
      <p className="text-ink-muted mb-8">This page doesn&apos;t exist — but your citizenship test prep does.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Back to Pass the UK Test
      </Link>
      <nav aria-label="Popular pages" className="mt-10 w-full max-w-xs">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted mb-3">Popular pages</p>
        <ul className="space-y-2">
          {POPULAR.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block px-4 py-3 min-h-[44px] rounded-xl border border-border bg-card text-sm text-ink hover:border-brand-400 transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
