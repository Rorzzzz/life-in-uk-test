'use client'

import { useState } from 'react'
import { useWeakSpots } from '@/hooks/useWeakSpots'
import { useGame } from '@/context/GameContext'
import QuestionCard from '@/components/game/QuestionCard'
import Link from 'next/link'

export default function WeakSpotsPage() {
  const { weakQuestions, count, hasWeakSpots } = useWeakSpots()
  const { state } = useGame()

  const [index, setIndex] = useState(0)
  const [practicing, setPracticing] = useState(false)

  if (!hasWeakSpots) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 text-center">
        <p className="text-5xl mb-4">🎯</p>
        <h1 className="text-2xl font-display font-bold text-ink mb-2">No weak spots yet!</h1>
        <p className="text-ink-muted mb-6">
          Answer some questions and we&apos;ll track what you find tricky.
        </p>
        <Link href="/practice" className="inline-block px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
          Start Practising
        </Link>
      </div>
    )
  }

  if (practicing) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setPracticing(false)} className="px-3 py-2 text-sm text-ink-muted hover:text-ink active:opacity-70 rounded-lg hover:bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">← Back</button>
          <h1 className="font-display font-bold text-ink">Weak Spots</h1>
        </div>
        {weakQuestions[index] && (
          <QuestionCard
            question={weakQuestions[index]}
            questionNumber={index + 1}
            totalQuestions={weakQuestions.length}
            onNext={() => setIndex(i => Math.min(weakQuestions.length - 1, i + 1))}
          />
        )}
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-display font-bold text-ink mb-1">Weak Spots</h1>
      <p className="text-ink-muted text-base mb-6">{count} questions where you need more practice</p>

      <button
        onClick={() => { setIndex(0); setPracticing(true) }}
        className="w-full py-4 bg-brand-500 text-white font-bold rounded-2xl mb-6 hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
      >
        Practice All Weak Spots
      </button>

      <div className="space-y-2">
        {weakQuestions.map(q => {
          const prog = state.progress[q.id]
          const acc = prog?.totalAnswered > 0 ? Math.round((prog.totalCorrect / prog.totalAnswered) * 100) : 0
          return (
            <div key={q.id} className="bg-card rounded-xl p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-base text-ink truncate">{q.q}</p>
                <p className="text-xs text-ink-muted mt-0.5">
                  {prog?.totalAnswered ?? 0} attempts · {acc}% accuracy
                </p>
              </div>
              <span className="text-xs font-mono text-danger font-bold">{acc}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
