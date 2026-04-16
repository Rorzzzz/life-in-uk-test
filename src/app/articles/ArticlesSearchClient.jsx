'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, Clock, ChevronRight, X } from 'lucide-react'
import clsx from 'clsx'

const CATEGORY_COLOURS = {
  'Study Tips': 'bg-brand-500/10 text-brand-400',
  'Test Day':   'bg-success/10 text-success',
  'Test Info':  'bg-amber-500/10 text-amber-400',
}

export default function ArticlesSearchClient({ articles }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return articles
    return articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description?.toLowerCase().includes(q) ||
      a.category?.toLowerCase().includes(q)
    )
  }, [query, articles])

  return (
    <>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search guides…"
          className="w-full bg-card border border-border rounded-xl pl-10 pr-10 py-3 text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:border-brand-500/60 transition-colors"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <p className="text-ink-muted text-sm">No articles match &ldquo;{query}&rdquo;.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {query && (
            <p className="text-xs text-ink-muted -mb-1">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </p>
          )}
          {filtered.map(article => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group bg-card border border-border rounded-2xl p-5 hover:border-brand-500/40 hover:bg-raised transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {article.category && (
                      <span className={clsx(
                        'text-xs font-medium px-2 py-0.5 rounded-full',
                        CATEGORY_COLOURS[article.category] ?? 'bg-border text-ink-muted'
                      )}>
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
    </>
  )
}
