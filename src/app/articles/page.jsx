import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { BookOpen, Clock, ChevronRight } from 'lucide-react'

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

const CATEGORY_COLOURS = {
  'Study Tips':  'bg-brand-500/10 text-brand-400',
  'Test Day':    'bg-success/10 text-success',
  'Test Info':   'bg-amber-500/10 text-amber-400',
}

export default function ArticlesIndexPage() {
  const articles = getAllArticles()

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24">
      {/* Header */}
      <div className="mb-8">
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

      {articles.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <p className="text-ink-muted">Articles coming soon.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {articles.map(article => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group bg-card border border-border rounded-2xl p-5 hover:border-brand-500/40 hover:bg-raised transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {article.category && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${CATEGORY_COLOURS[article.category] ?? 'bg-border text-ink-muted'}`}>
                        {article.category}
                      </span>
                    )}
                    {article.readTime && (
                      <span className="flex items-center gap-1 text-xs text-ink-muted">
                        <Clock size={11} />
                        {article.readTime}
                      </span>
                    )}
                  </div>
                  <h2 className="text-base font-semibold text-ink group-hover:text-brand-400 transition-colors leading-snug mb-1">
                    {article.title}
                  </h2>
                  <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">
                    {article.description}
                  </p>
                </div>
                <ChevronRight size={18} className="text-ink-muted group-hover:text-brand-400 transition-colors shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      )}

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
  )
}
