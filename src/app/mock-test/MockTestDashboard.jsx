'use client'

import { useGame } from '@/context/GameContext'
import Link from 'next/link'
import { MOCK_TEST_COUNT } from '@/data/mockTests'

function ReadinessMeter({ pct }) {
  const colour = pct >= 80 ? '#22d07a' : pct >= 60 ? '#f59e0b' : '#3381ff'
  const label  = pct >= 80 ? 'Ready to book' : pct >= 60 ? 'Getting there' : 'Keep practising'
  return (
    <Link href="/readiness" className="block bg-card rounded-2xl p-5 mb-6 border border-border hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-ink">Your readiness</p>
          <p className="text-xs text-ink-muted">{label} · tap for details</p>
        </div>
        <span className="text-3xl font-bold font-mono" style={{ color: colour }}>{pct}%</span>
      </div>
      <div className="h-2 bg-raised rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: colour }}
        />
      </div>
      {pct >= 80 && (
        <p className="text-xs text-success mt-2">You are consistently scoring above 83% — you are ready to book your test.</p>
      )}
    </Link>
  )
}

export default function MockTestDashboard() {
  const { state } = useGame()
  const testScores = state?.testScores ?? {}

  const completed    = Object.keys(testScores).map(Number)
  const totalDone    = completed.length
  const passed       = completed.filter(n => testScores[n]?.passed)
  const failed       = completed.filter(n => !testScores[n]?.passed)

  // Readiness: avg score % of last 5 completed tests
  const recent = completed
    .sort((a, b) => (testScores[b]?.date ?? 0) - (testScores[a]?.date ?? 0))
    .slice(0, 5)
  const readinessPct = recent.length === 0 ? 0 : Math.round(
    recent.reduce((sum, n) => sum + (testScores[n].score / testScores[n].total), 0) / recent.length * 100
  )

  // Next recommended test
  const nextTest = Array.from({ length: MOCK_TEST_COUNT }, (_, i) => i + 1)
    .find(n => !testScores[n]) ?? 1

  if (totalDone === 0) return null

  return (
    <>
      <ReadinessMeter pct={readinessPct} />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-card rounded-xl p-3 text-center border border-border">
          <p className="text-xl font-bold font-mono text-ink">{totalDone}<span className="text-sm text-ink-muted">/{MOCK_TEST_COUNT}</span></p>
          <p className="text-xs text-ink-muted mt-0.5">Tests done</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center border border-border">
          <p className="text-xl font-bold font-mono text-success">{passed.length}</p>
          <p className="text-xs text-ink-muted mt-0.5">Passed</p>
        </div>
        <div className="bg-card rounded-xl p-3 text-center border border-border">
          <p className="text-xl font-bold font-mono text-danger">{failed.length}</p>
          <p className="text-xs text-ink-muted mt-0.5">Failed</p>
        </div>
      </div>

      {/* Next test CTA */}
      <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-4 mb-6 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-ink text-sm">Next recommended</p>
          <p className="text-xs text-ink-muted mt-0.5">Mock Test {nextTest} — not attempted yet</p>
        </div>
        <Link
          href={`/mock-test/${nextTest}`}
          className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Start →
        </Link>
      </div>
    </>
  )
}
