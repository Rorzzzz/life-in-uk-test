import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { getAllArticles } from '@/lib/articles'
import { BookOpen } from 'lucide-react'
import ArticlesSearchClient from './ArticlesSearchClient'
import ContentAd from '@/components/ui/ContentAd'

export const metadata = {
  title: 'Life in the UK Test Guides 2026 — Tips, Study Help & Free Advice',
  description: 'Free guides to help you pass the Life in the UK citizenship test — study tips, test day advice, booking guides and more.',
  alternates: { canonical: 'https://passtheuktest.co.uk/articles' },
  openGraph: {
    title: 'Life in the UK Test Guides 2026 — Tips, Study Help & Free Advice',
    description: 'Free guides to help you pass the Life in the UK citizenship test.',
    url: 'https://passtheuktest.co.uk/articles',
    type: 'website',
  },
}

export default function ArticlesIndexPage() {
  const articles = getAllArticles()

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Articles', path: '/articles' }]} />
      <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-brand-400 text-sm font-medium mb-2">
          <BookOpen size={16} />
          <span>Guides & Articles</span>
        </div>
        <h1 className="text-3xl font-display font-bold text-ink mb-3">
          Life in the UK Test Guides
        </h1>
        <p className="text-ink-muted text-base leading-relaxed">
          Everything you need to pass the Life in the UK test — free, detailed and up to date for 2026.
        </p>
      </div>

      <ArticlesSearchClient articles={articles} />

      {/* Internal links for SEO */}
      {/* Real guidance text with the ad inside it, never against the links (2026-11-04) */}
      <section className="mt-10 space-y-3">
        <h2 className="text-lg font-display font-bold text-ink">How these guides are written</h2>
        <p className="text-base text-ink-muted leading-relaxed">
          Every guide is written by Rory Stephenson, who passed the Life in the UK test, and checked against GOV.UK and the official handbook, Life in the United Kingdom: A Guide for New Residents. Fees, rules and dates are reviewed when the Home Office changes them, and each guide shows when it was published.
        </p>
      </section>
      <ContentAd id="1" />
      <section className="space-y-3 mb-8">
        <h2 className="text-lg font-display font-bold text-ink">Where to start</h2>
        <p className="text-base text-ink-muted leading-relaxed">
          If your test is coming up, start with the guides on how the test works and how to pass it first time. If you are planning your settlement or citizenship application, read the guides on costs, requirements and timelines, then use the free calculators to check your own dates.
        </p>
      </section>

      <div className="mt-10 pt-6 border-t border-border">
        <p className="text-sm text-ink-muted mb-3">Ready to start practising?</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/practice" className="text-sm text-brand-400 hover:underline">Practice questions</Link>
          <span className="text-border">·</span>
          <Link href="/exam" className="text-sm text-brand-400 hover:underline">Mock test</Link>
          <span className="text-border">·</span>
          <Link href="/cheat-sheet" className="text-sm text-brand-400 hover:underline">Cheat sheet</Link>
          <span className="text-border">·</span>
          <Link href="/faq" className="text-sm text-brand-400 hover:underline">FAQ</Link>
        </div>
      </div>
    </div>
    </>
  )
}
