'use client'

import { useGame } from '@/context/GameContext'
import Link from 'next/link'
import { MOCK_TEST_COUNT } from '@/data/mockTests'

export default function MockTestGrid() {
  const { state } = useGame()
  const testScores = state?.testScores ?? {}
  const tests = Array.from({ length: MOCK_TEST_COUNT }, (_, i) => i + 1)

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-8">
      {tests.map(n => {
        const result = testScores[n]
        const done   = !!result
        const passed = result?.passed
        const score  = result?.score

        return (
          <Link
            key={n}
            href={`/mock-test/${n}`}
            className={`rounded-xl p-3 flex flex-col items-center gap-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              done
                ? passed
                  ? 'bg-success/10 border border-success/30 hover:bg-success/20'
                  : 'bg-danger/10 border border-danger/30 hover:bg-danger/20'
                : 'bg-card border border-border hover:border-brand-500 hover:bg-raised'
            }`}
          >
            <span className="text-xs text-ink-muted font-mono">Test</span>
            <span className={`text-lg font-bold font-mono ${done ? passed ? 'text-success' : 'text-danger' : 'text-ink'}`}>
              {n}
            </span>
            {done && (
              <span className={`text-xs font-mono font-semibold ${passed ? 'text-success' : 'text-danger'}`}>
                {score}/24
              </span>
            )}
          </Link>
        )
      })}
    </div>
  )
}
