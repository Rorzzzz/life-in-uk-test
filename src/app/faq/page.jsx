import Link from 'next/link'
import { FAQS, getFAQsByCategory, FAQ_CATEGORIES } from '@/data/faqs'

export const metadata = {
  title: 'Life in the UK Test FAQ — 35 Questions Answered',
  description: 'Everything you need to know about the Life in the UK test: cost, pass mark, how to book, what to study, and what happens on test day.',
  alternates: { canonical: 'https://passtheuktest.co.uk/faq' },
}

export default function FAQPage() {
  const byCategory = getFAQsByCategory()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name:    faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-2">Life in the UK Test FAQ</h1>
        <p className="text-ink-muted mb-6">
          35 common questions about the Life in the UK citizenship test — answered.
        </p>

        {FAQ_CATEGORIES.map(cat => {
          const faqs = byCategory[cat]
          if (!faqs) return null
          return (
            <div key={cat} className="mb-8">
              <h2 className="text-lg font-display font-bold text-ink mb-3 border-b border-border pb-2">
                {cat}
              </h2>
              <div className="space-y-4">
                {faqs.map(faq => (
                  <div key={faq.id} className="bg-card rounded-2xl p-5">
                    <h3 className="font-semibold text-ink mb-2">{faq.question}</h3>
                    <p className="text-base text-ink-muted leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 text-center">
          <p className="font-semibold text-ink mb-1">Ready to start practising?</p>
          <p className="text-sm text-ink-muted mb-3">570 free questions with detailed explanations.</p>
          <Link href="/practice" className="inline-block px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
            Start Practising Free →
          </Link>
        </div>

        <div className="mt-6 bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Practice Tests</p>
          <div className="flex flex-wrap gap-2">
            {[1, 5, 10, 15].map(n => (
              <Link key={n} href={`/mock-test/${n}`} className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Mock Test {n}</Link>
            ))}
            <Link href="/mock-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">All 45 tests →</Link>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
            {[
              { slug: 'british-history', title: 'British History',  colour: '#a855f7' },
              { slug: 'uk-government',   title: 'UK Government',    colour: '#3381ff' },
            ].map(t => (
              <Link key={t.slug} href={`/topic/${t.slug}`} className="px-3 py-1.5 text-sm rounded-lg border transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500" style={{ borderColor: `${t.colour}44`, color: t.colour, backgroundColor: `${t.colour}11` }}>{t.title}</Link>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          <Link href="/articles/what-is-the-life-in-the-uk-test" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">What Is the Test?</Link>
          <Link href="/articles/how-much-does-the-life-in-the-uk-test-cost" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Test Cost</Link>
          <Link href="/articles/how-many-questions-are-in-the-life-in-the-uk-test" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Test Questions</Link>
          <Link href="/articles/how-to-pass-the-life-in-the-uk-test-first-time" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">How to Pass</Link>
          <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Key Facts Cheat Sheet</Link>
          <Link href="/how-to-pass" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">How to Pass Guide</Link>
        </div>
      </div>
    </>
  )
}
