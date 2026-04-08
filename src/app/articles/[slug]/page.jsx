import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPublishedSlugs, getArticleBySlug } from '@/lib/articles'
import { BookOpen, Clock, ChevronLeft } from 'lucide-react'

export async function generateStaticParams() {
  return getAllPublishedSlugs()
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords?.join(', '),
    alternates: { canonical: `https://passtheuktest.co.uk/articles/${params.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://passtheuktest.co.uk/articles/${params.slug}`,
      type: 'article',
      publishedTime: article.date,
    },
  }
}

const CATEGORY_COLOURS = {
  'Study Tips': 'bg-brand-500/10 text-brand-400',
  'Test Day':   'bg-success/10 text-success',
  'Test Info':  'bg-amber-500/10 text-amber-400',
}

// MDX component overrides — maps markdown elements to styled versions
const components = {
  h2: ({ children }) => (
    <h2 className="text-xl font-display font-bold text-ink mt-8 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold text-ink mt-6 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-ink-muted leading-relaxed mb-4">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside text-ink-muted space-y-1.5 mb-4 ml-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside text-ink-muted space-y-1.5 mb-4 ml-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a href={href} className="text-brand-400 hover:underline">{children}</a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-brand-500 pl-4 py-1 my-4 bg-brand-500/5 rounded-r-lg">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-border my-6" />,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-6 rounded-xl border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="text-left px-4 py-3 bg-raised text-xs font-semibold uppercase tracking-wide text-ink-muted border-b border-border">{children}</th>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-border last:border-b-0">{children}</tr>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-ink-muted leading-snug">{children}</td>
  ),
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  // Article schema for Google
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Organization', name: 'PassPort', url: 'https://passtheuktest.co.uk' },
    publisher: { '@type': 'Organization', name: 'PassPort', url: 'https://passtheuktest.co.uk' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://passtheuktest.co.uk/articles/${params.slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="max-w-2xl mx-auto px-4 py-8 pb-24">
        {/* Back link */}
        <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink mb-6 transition-colors">
          <ChevronLeft size={15} />
          All articles
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
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
          <h1 className="text-2xl font-display font-bold text-ink leading-snug mb-3">
            {article.title}
          </h1>
          <p className="text-ink-muted leading-relaxed">
            {article.description}
          </p>
        </header>

        {/* Article body */}
        <article className="prose-custom">
          <MDXRemote
            source={article.content}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        {/* CTA — drives to practice */}
        <div className="mt-10 bg-brand-500/10 border border-brand-500/20 rounded-2xl p-6 text-center">
          <p className="text-sm font-medium text-ink mb-1">Ready to put this into practice?</p>
          <p className="text-xs text-ink-muted mb-4">Free practice questions — no login, no paywall.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/practice"
              className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Start practising
            </Link>
            <Link
              href="/exam"
              className="bg-card border border-border hover:bg-raised text-ink text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
            >
              Take a mock test
            </Link>
          </div>
        </div>

        {/* Internal links */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-ink-muted mb-2 font-medium uppercase tracking-wide">More resources</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/cheat-sheet" className="text-sm text-brand-400 hover:underline">Key facts cheat sheet</Link>
            <Link href="/faq" className="text-sm text-brand-400 hover:underline">Test FAQ</Link>
            <Link href="/exam-format" className="text-sm text-brand-400 hover:underline">Exam format</Link>
            <Link href="/how-to-pass" className="text-sm text-brand-400 hover:underline">How to pass</Link>
            <Link href="/articles" className="text-sm text-brand-400 hover:underline">All articles</Link>
          </div>
        </div>
      </div>
    </>
  )
}
