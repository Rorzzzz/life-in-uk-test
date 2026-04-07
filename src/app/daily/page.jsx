'use client'

import { useState } from 'react'
import { useGame } from '@/context/GameContext'
import { getDueToday } from '@/algorithms/getDueToday'
import QuestionCard from '@/components/game/QuestionCard'
import ResultScreen from '@/components/game/ResultScreen'
import { useRouter } from 'next/navigation'

export default function DailyPage() {
  const { state, completeChapter } = useGame()
  const router = useRouter()

  const [questions] = useState(() => getDueToday(state.progress, 5))
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  if (questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 text-center">
        <p className="text-5xl mb-4">🌟</p>
        <h1 className="text-xl font-display font-bold text-ink mb-2">All caught up!</h1>
        <p className="text-ink-muted text-base mb-6">No questions due for review today.</p>
        <button onClick={() => router.push('/practice')} className="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface">
          Practice anyway →
        </button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <ResultScreen
          score={correct}
          total={questions.length}
          xpEarned={correct * 10}
          onHome={() => router.push('/')}
        />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📅</span>
        <div>
          <h1 className="font-display font-bold text-ink">Daily 5</h1>
          <p className="text-xs text-ink-muted">Spaced repetition review</p>
        </div>
      </div>
      {questions[index] && (
        <QuestionCard
          question={questions[index]}
          questionNumber={index + 1}
          totalQuestions={questions.length}
          onAnswer={(isCorrect) => { if (isCorrect) setCorrect(c => c + 1) }}
          onNext={() => {
            if (index + 1 >= questions.length) setDone(true)
            else setIndex(i => i + 1)
          }}
        />
      )}
    </div>
  )
}
