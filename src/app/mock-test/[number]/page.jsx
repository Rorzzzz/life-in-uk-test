import { notFound } from 'next/navigation'
import { MOCK_TEST_NUMBERS, getMockTest, getMockTestMeta } from '@/data/mockTests'
import { TOPICS } from '@/data/topics'
import { CHAPTERS } from '@/data/questions'
import Link from 'next/link'
import MockTestClient from './MockTestClient'
import BreadcrumbSchema from '@/components/ui/BreadcrumbSchema'

function getRelatedTests(n) {
  const others = []
  for (let i = 1; others.length < 4; i++) {
    const candidate = ((n + i - 1) % 45) + 1
    if (candidate !== n) others.push(candidate)
  }
  return others
}

export async function generateStaticParams() {
  return MOCK_TEST_NUMBERS.map(n => ({ number: n.toString() }))
}

export async function generateMetadata({ params }) {
  const n = parseInt(params.number)
  if (n < 1 || n > 45) return {}
  const meta = getMockTestMeta(n)
  return {
    title:       meta.title,
    description: meta.description,
    alternates:  { canonical: meta.canonical },
  }
}

export default function MockTestPage({ params }) {
  const n = parseInt(params.number)
  if (n < 1 || n > 45) return notFound()

  const questions     = getMockTest(n)
  const relatedTests  = getRelatedTests(n)
  const featuredTopics = TOPICS.slice((n * 3) % TOPICS.length, (n * 3) % TOPICS.length + 2)

  return (
    <>
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: 'Mock Tests', path: '/mock-test' }, { name: `Mock Test ${n}`, path: `/mock-test/${n}` }]} />
      <MockTestClient testNumber={n} questions={questions} />

      {/* Static question list — indexed by Google, gives each test unique content */}
      <section className="max-w-2xl mx-auto px-4 pb-4">
        <div className="bg-card rounded-2xl p-5">
          <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wide mb-4">Questions in Mock Test {n}</h2>
          <div className="space-y-3">
            {questions.map((q, i) => {
              const chapter = CHAPTERS.find(c => c.id === q.chapter)
              return (
                <Link
                  key={q.id}
                  href={`/questions/${q.id}`}
                  className="flex items-start gap-3 group hover:bg-raised rounded-xl p-2 -mx-2 transition-colors"
                >
                  <span className="text-xs font-mono text-ink-muted w-5 flex-shrink-0 pt-0.5">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-ink group-hover:text-brand-400 transition-colors leading-snug">{q.q}</p>
                    <p className="text-xs text-ink-muted mt-0.5">{chapter?.title}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Internal links — shown below the test */}
      <div className="max-w-2xl mx-auto px-4 pb-8">
        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">More Practice Tests</p>
          <div className="flex flex-wrap gap-2">
            {relatedTests.map(t => (
              <Link
                key={t}
                href={`/mock-test/${t}`}
                className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Mock Test {t}
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
            {featuredTopics.map(t => (
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
      </div>
    </>
  )
}
