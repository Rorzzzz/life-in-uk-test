import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh text-center px-4">
      <p className="text-6xl mb-4">🗺️</p>
      <h1 className="text-3xl font-display font-bold text-ink mb-2">Page not found</h1>
      <p className="text-ink-muted mb-8">This page doesn&apos;t exist — but your citizenship test prep does.</p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Back to Pass the UK Test
      </Link>
    </div>
  )
}
