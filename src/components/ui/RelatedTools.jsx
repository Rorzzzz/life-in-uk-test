import Link from 'next/link'

// Single source of truth for the free-tools cluster cross-linking.
const TOOLS = [
  { slug: 'ilr-calculator',       emoji: '📅', title: 'ILR Eligibility Calculator' },
  { slug: 'absence-calculator',   emoji: '✈️', title: '180-Day Absence Calculator' },
  { slug: 'ilr-checklist',        emoji: '📋', title: 'ILR Document Checklist' },
  { slug: 'ilr-risk-check',       emoji: '⚠️', title: 'ILR Refusal Risk Checker' },
  { slug: 'citizenship-planner',  emoji: '🗺️', title: 'Citizenship Planner' },
  { slug: 'citizenship-date-calculator', emoji: '🗓️', title: 'Citizenship Date Calculator' },
  { slug: 'true-cost-calculator', emoji: '💷', title: 'True Cost of Citizenship' },
  { slug: 'good-character-check', emoji: '✅', title: 'Good Character Checker' },
  { slug: 'b1-check',             emoji: '🗣️', title: 'B1 English Level Check' },
  { slug: 'study-plan-generator', emoji: '📚', title: 'Study Plan Generator' },
  { slug: 'test-exempt',          emoji: '🎓', title: 'Test Exemption Checker' },
]

// Consistent cross-link module for every tool page. Shows the sibling tools
// plus a link to the /tools hub — guarantees a fully-connected cluster.
export default function RelatedTools({ current }) {
  const others = TOOLS.filter(t => t.slug !== current)
  return (
    <section className="max-w-2xl mx-auto px-4 pb-10">
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="text-sm font-bold text-ink uppercase tracking-wide">More free tools</h2>
          <Link href="/tools" className="text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors flex-shrink-0">
            All tools →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {others.map(t => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span className="text-base" aria-hidden="true">{t.emoji}</span>
              <span className="text-sm text-ink-muted hover:text-ink">{t.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
