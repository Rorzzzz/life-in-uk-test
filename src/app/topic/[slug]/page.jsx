import { notFound } from 'next/navigation'
import { TOPICS, getTopicBySlug, getTopicQuestions } from '@/data/topics'
import Link from 'next/link'

function getTopicTests(slug) {
  const idx = TOPICS.findIndex(t => t.slug === slug)
  const set = new Set()
  for (let i = 1; set.size < 4; i++) {
    set.add(((idx * 9 + i * 17) % 45) + 1)
  }
  return [...set]
}

export async function generateStaticParams() {
  return TOPICS.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }) {
  const topic = getTopicBySlug(params.slug)
  if (!topic) return {}
  return {
    title: `${topic.title} — Life in the UK Test Questions`,
    description: topic.description,
    alternates: { canonical: `https://passtheuktest.co.uk/topic/${params.slug}` },
  }
}

export default function TopicPage({ params }) {
  const topic = getTopicBySlug(params.slug)
  if (!topic) return notFound()

  const questions    = getTopicQuestions(params.slug)
  const testNums     = getTopicTests(params.slug)
  const otherTopics  = TOPICS.filter(t => t.slug !== params.slug).slice(0, 2)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted mb-6">
        <Link href="/" className="px-2 py-1 hover:text-ink active:opacity-70 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Home</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">{topic.title}</span>
      </nav>

      <h1 className="text-2xl font-display font-bold text-ink mb-2">{topic.title}</h1>
      <p className="text-ink-muted text-base mb-2">{topic.description}</p>
      <p className="text-sm text-ink-muted mb-6">{questions.length} questions</p>

      <Link
        href="/practice"
        className="block w-full py-3 bg-brand-500 text-white font-semibold rounded-xl text-center mb-6 hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Practice these questions →
      </Link>

      <div className="space-y-2">
        {questions.slice(0, 30).map((q, i) => (
          <Link key={q.id} href={`/questions/${q.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl">
            <div className="bg-card rounded-xl p-4 hover:bg-raised active:opacity-70 transition-colors">
              <p className="text-base text-ink mb-1">{q.q}</p>
              <p className="text-sm text-success">✓ {q.options[q.answer]}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Practice Tests + Related Topics */}
      <div className="mt-6 bg-card rounded-2xl p-4">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Practice Tests</p>
        <div className="flex flex-wrap gap-2">
          {testNums.map(n => (
            <Link
              key={n}
              href={`/mock-test/${n}`}
              className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              Mock Test {n}
            </Link>
          ))}
          <Link
            href="/mock-test"
            className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            All 45 tests →
          </Link>
        </div>
        <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
          {otherTopics.map(t => (
            <Link
              key={t.slug}
              href={`/topic/${t.slug}`}
              className="px-3 py-1.5 text-sm rounded-lg border transition-colors hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              style={{ borderColor: `${t.colour}44`, color: t.colour, backgroundColor: `${t.colour}11` }}
            >
              {t.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2 justify-center flex-wrap">
        <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Cheat Sheet</Link>
        <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">FAQ</Link>
      </div>
    </div>
  )
}
