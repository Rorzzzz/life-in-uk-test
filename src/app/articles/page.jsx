import Link from 'next/link'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'
import { getAllArticles } from '@/lib/articles'
import { BookOpen } from 'lucide-react'
import ArticlesSearchClient from './ArticlesSearchClient'

export const metadata = {
  title: 'Life in the UK Test Articles & Guides 2026',
  description: 'Free guides to help you pass the Life in the UK citizenship test — study tips, test day advice, booking guides and more.',
  alternates: { canonical: 'https://passtheuktest.co.uk/articles' },
  openGraph: {
    title: 'Life in the UK Test Articles & Guides 2026',
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
