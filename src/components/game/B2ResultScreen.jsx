'use client'

import Link from 'next/link'
import ProgressRing from '@/components/ui/ProgressRing'
import dynamic from 'next/dynamic'

const ConfettiBlast = dynamic(() => import('./ConfettiBlast'), { ssr: false })

export default function B2ResultScreen({ score, total, wrongQuestions = [], onRetry, onChangeCategory, hubHref = '/b2-practice' }) {
  const pct    = Math.round((score / total) * 100)
  const passed = pct >= 75
  const colour = pct >= 75 ? '#22d07a' : pct >= 50 ? '#f59e0b' : '#ff4d6d'

  const label = pct >= 75 ? 'B2 Ready' : pct >= 50 ? 'Keep Practising' : 'Needs Work'
  const labelColour = pct >= 75 ? 'bg-success/10 text-success' : pct >= 50 ? 'bg-xp/10 text-xp' : 'bg-danger/10 text-danger'

  const headline = pct >= 80 ? 'Excellent work!' : pct >= 75 ? 'Well done!' : pct >= 50 ? 'Good effort!' : 'Keep going!'
  const subline  = pct >= 75
    ? `${pct}% — above the B2 pass threshold.`
    : pct >= 50
    ? `${pct}% — aim for 75% or above.`
    : `${pct}% — review the questions below and try again.`

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <ConfettiBlast trigger={passed} />

      {/* Score ring */}
      <div className="flex flex-col items-center text-center gap-4 mb-8">
        <ProgressRing value={pct} size={120} strokeWidth={10} colour={colour} ariaLabel={`Score: ${score} out of ${total}`}>
          <span className="font-display font-bold text-2xl" style={{ color: colour }}>
            {score}/{total}
          </span>
        </ProgressRing>

        <div>
          <h2 className="text-2xl font-display font-bold text-ink mb-1">{headline}</h2>
          <p className="text-ink-muted text-sm">{subline}</p>
        </div>

        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${labelColour}`}>
          {label}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 mb-8">
        <button
          onClick={onRetry}
          className="w-full py-3 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold rounded-xl transition-colors"
        >
          New session →
        </button>
        <button
          onClick={onChangeCategory}
          className="w-full py-3 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink rounded-xl text-sm font-medium transition-colors"
        >
          Change category
        </button>
        <Link
          href={hubHref}
          className="w-full py-3 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink rounded-xl text-sm font-medium transition-colors text-center"
        >
          ← B2 Practice hub
        </Link>
      </div>

      {/* Wrong question review */}
      {wrongQuestions.length > 0 && (
        <div className="bg-card rounded-2xl p-4 border border-border mb-6">
          <p className="font-semibold text-ink mb-0.5">Questions you got wrong ({wrongQuestions.length})</p>
          <p className="text-xs text-ink-muted mb-4">Review these before your next session</p>
          <div className="space-y-4">
            {wrongQuestions.map((q, i) => (
              <div key={q.id} className="bg-raised rounded-xl p-4 border border-border">
                <p className="text-xs text-ink-muted font-mono mb-1.5">Q{i + 1}</p>
                <p className="font-semibold text-ink text-sm mb-3">{q.q}</p>
                <div className="bg-danger/10 border border-danger/20 rounded-xl px-3 py-2 mb-2">
                  <p className="text-xs text-danger font-semibold mb-0.5">✗ Your answer</p>
                  <p className="text-sm text-ink">{q.options[q.selectedIndex]}</p>
                </div>
                <div className="bg-success/10 border border-success/20 rounded-xl px-3 py-2 mb-3">
                  <p className="text-xs text-success font-semibold mb-0.5">✓ Correct answer</p>
                  <p className="text-sm text-ink">{q.options[q.answer]}</p>
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">{q.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Retention links */}
      <div className="bg-card rounded-2xl p-4">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Also practise</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Vocabulary</Link>
          <Link href="/b2-practice/grammar" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Grammar</Link>
          <Link href="/practice" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">Life in the UK Test</Link>
          <Link href="/articles/b2-english-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">Which B2 Test?</Link>
        </div>
      </div>
    </div>
  )
}
