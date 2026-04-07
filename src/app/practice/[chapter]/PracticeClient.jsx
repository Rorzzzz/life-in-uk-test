'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { buildAdaptiveSession } from '@/algorithms/sessionBuilder'
import { useGame } from '@/context/GameContext'
import QuestionCard from '@/components/game/QuestionCard'
import ResultScreen from '@/components/game/ResultScreen'
import BadgeUnlock from '@/components/game/BadgeUnlock'

export default function PracticeClient({ chapter, questions }) {
  const { state, completeChapter } = useGame()
  const router = useRouter()

  const [session]               = useState(() => buildAdaptiveSession(state.progress, { chapterId: chapter.id }))
  const [index, setIndex]       = useState(0)
  const [correct, setCorrect]   = useState(0)
  const [done, setDone]         = useState(false)

  const current = session[index]

  function handleAnswer(isCorrect) {
    if (isCorrect) setCorrect(c => c + 1)
  }

  function handleNext() {
    if (index + 1 >= session.length) {
      completeChapter(chapter.id, correct, session.length)
      setDone(true)
    } else {
      setIndex(i => i + 1)
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <ResultScreen
          score={correct}
          total={session.length}
          xpEarned={correct * 10 + 25}
          onRetry={() => { setIndex(0); setCorrect(0); setDone(false) }}
          onHome={() => router.push('/')}
        />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <BadgeUnlock />

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono"
          style={{ backgroundColor: `${chapter.colour}22`, color: chapter.colour }}
        >
          {chapter.id}
        </div>
        <div>
          <h1 className="font-display font-bold text-ink leading-tight">{chapter.title}</h1>
          <p className="text-xs text-ink-muted">{session.length} questions · Adaptive</p>
        </div>
      </div>

      {current && (
        <QuestionCard
          question={current}
          questionNumber={index + 1}
          totalQuestions={session.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
    </div>
  )
}
