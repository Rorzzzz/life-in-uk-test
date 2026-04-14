'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getMockTest, EXAM_DURATION_SECONDS } from '@/data/mockTests'
import { CHAPTERS } from '@/data/questions'
import { useGame } from '@/context/GameContext'
import QuestionCard from '@/components/game/QuestionCard'
import TimerBar from '@/components/game/TimerBar'
import ResultScreen from '@/components/game/ResultScreen'
import BadgeUnlock from '@/components/game/BadgeUnlock'
import dynamic from 'next/dynamic'

const ConfettiBlast = dynamic(() => import('@/components/game/ConfettiBlast'), { ssr: false })

export default function ExamPage() {
  const router = useRouter()
  const { completeExam } = useGame()

  const [questions, setQuestions] = useState(() => getMockTest(1))

  useEffect(() => {
    setQuestions(getMockTest(Math.floor(Math.random() * 45) + 1))
  }, [])
  const [index, setIndex]          = useState(0)
  const [correct, setCorrect]      = useState(0)
  const correctRef                 = useRef(0)
  const [wrongByChapter, setWrongByChapter] = useState({})
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION_SECONDS)
  const [started, setStarted]   = useState(false)
  const [done, setDone]         = useState(false)

  // Timer — handleFinish intentionally excluded: useRef pattern avoids stale closure
  useEffect(() => {
    if (!started || done) return
    if (timeLeft <= 0) { handleFinish(correctRef.current); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [started, done, timeLeft]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFinish = useCallback((finalCorrect) => {
    setDone(true)
    completeExam(finalCorrect, questions.length, timeLeft)
  }, [questions.length, timeLeft, completeExam])

  function handleAnswer(isCorrect) {
    if (isCorrect) {
      setCorrect(c => { correctRef.current = c + 1; return c + 1 })
    } else {
      const chapter = questions[index]?.chapter
      if (chapter) {
        setWrongByChapter(prev => ({ ...prev, [chapter]: (prev[chapter] ?? 0) + 1 }))
      }
    }
  }

  function handleNext() {
    if (index + 1 >= questions.length) {
      handleFinish(correctRef.current)
    } else {
      setIndex(i => i + 1)
    }
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col items-center text-center gap-6">
        <p className="text-5xl">🎓</p>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink mb-2">Life in the UK Mock Exam — 24 Questions, 45 Minutes</h1>
          <p className="text-ink-muted">24 questions · 45 minutes · Pass mark: 18/24 (75%)</p>
        </div>
        <div className="bg-card rounded-2xl p-5 text-left w-full max-w-sm space-y-3">
          {['24 multiple choice questions', '45 minute time limit', 'Pass with 18/24 or more', 'Results shown immediately'].map(tip => (
            <p key={tip} className="text-base flex items-center gap-2 text-ink-muted">
              <span className="text-success">✓</span> {tip}
            </p>
          ))}
        </div>
        <button
          onClick={() => setStarted(true)}
          className="w-full max-w-sm py-4 bg-brand-500 text-white font-bold text-lg rounded-2xl hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          Start Mock Exam
        </button>
      </div>
    )
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <ConfettiBlast trigger={correct >= 18} />
        <ResultScreen
          score={correct}
          total={questions.length}
          xpEarned={correct === questions.length ? 200 : correct >= 18 ? 100 : 0}
          onRetry={() => { setIndex(0); setCorrect(0); setWrongByChapter({}); setDone(false); setStarted(false); setTimeLeft(EXAM_DURATION_SECONDS) }}
          onHome={() => router.push('/')}
          onDifferentTest={() => {
            const n = Math.floor(Math.random() * 45) + 1
            router.push(`/mock-test/${n}`)
          }}
          weakChapters={CHAPTERS
            .filter(ch => wrongByChapter[ch.id] > 0)
            .sort((a, b) => (wrongByChapter[b.id] ?? 0) - (wrongByChapter[a.id] ?? 0))
            .map(ch => ({ id: ch.id, title: ch.title, colour: ch.colour, wrong: wrongByChapter[ch.id] }))}
          isExam
        />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <BadgeUnlock />
      <div className="mb-6">
        <TimerBar secondsRemaining={timeLeft} totalSeconds={EXAM_DURATION_SECONDS} />
      </div>
      <QuestionCard
        question={questions[index]}
        questionNumber={index + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
        countForStreak={false}
      />
    </div>
  )
}
