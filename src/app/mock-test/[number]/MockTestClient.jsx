'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { EXAM_DURATION_SECONDS } from '@/data/mockTests'
import { useGame } from '@/context/GameContext'
import QuestionCard from '@/components/game/QuestionCard'
import TimerBar from '@/components/game/TimerBar'
import ResultScreen from '@/components/game/ResultScreen'
import PrintTest from '@/components/game/PrintTest'
import BadgeUnlock from '@/components/game/BadgeUnlock'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ConfettiBlast = dynamic(() => import('@/components/game/ConfettiBlast'), { ssr: false })

export default function MockTestClient({ testNumber, questions }) {
  const router = useRouter()
  const { completeExam } = useGame()

  const [index, setIndex]           = useState(0)
  const [correct, setCorrect]       = useState(0)
  const correctRef                  = useRef(0)
  const [wrongQuestions, setWrongQuestions] = useState([])
  const [timeLeft, setTimeLeft]     = useState(EXAM_DURATION_SECONDS)
  const [started, setStarted]       = useState(false)
  const [done, setDone]             = useState(false)

  // Timer — handleFinish intentionally excluded: useRef pattern avoids stale closure
  useEffect(() => {
    if (!started || done) return
    if (timeLeft <= 0) { handleFinish(correctRef.current); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [started, done, timeLeft]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFinish = useCallback((finalCorrect) => {
    setDone(true)
    completeExam(finalCorrect, questions.length, timeLeft, testNumber)
  }, [questions.length, timeLeft, completeExam, testNumber])

  function handleAnswer(isCorrect, selectedIndex) {
    if (isCorrect) {
      setCorrect(c => { correctRef.current = c + 1; return c + 1 })
    } else {
      setWrongQuestions(wq => [...wq, { ...questions[index], selectedIndex }])
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
        <p className="text-5xl">📋</p>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink mb-1">Mock Test {testNumber}</h1>
          <p className="text-ink-muted">24 questions · 45 minutes · Pass mark: 18/24</p>
        </div>
        <div className="flex gap-3 w-full max-w-xs">
          <button
            onClick={() => setStarted(true)}
            className="flex-1 py-4 bg-brand-500 text-white font-bold rounded-2xl hover:bg-brand-600 active:opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          >
            Start Test
          </button>
          <Link
            href="/mock-test"
            className="px-4 py-4 bg-card text-ink font-semibold rounded-2xl hover:bg-raised active:opacity-70 transition-colors text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Other Tests
          </Link>
        </div>
        <div className="flex gap-2">
          <Link href="/cheat-sheet" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Cheat Sheet</Link>
          <Link href="/faq" className="px-4 py-3 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-xl hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">FAQ</Link>
        </div>
      </div>
    )
  }

  if (done) {
    const prevTest = testNumber > 1  ? testNumber - 1 : null
    const nextTest = testNumber < 45 ? testNumber + 1 : null

    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <ConfettiBlast trigger={correct >= 18} />
        <ResultScreen
          score={correct}
          total={questions.length}
          xpEarned={correct === questions.length ? 200 : correct >= 18 ? 100 : 0}
          wrongQuestions={wrongQuestions}
          onRetry={() => { setIndex(0); setCorrect(0); setWrongQuestions([]); setDone(false); setStarted(false); setTimeLeft(EXAM_DURATION_SECONDS) }}
          onHome={() => router.push('/')}
          onDifferentTest={() => {
            let n
            do { n = Math.floor(Math.random() * 45) + 1 } while (n === testNumber)
            router.push(`/mock-test/${n}`)
          }}
          isExam
          footer={
            <div className="bg-card rounded-2xl p-4 mt-2 space-y-3">
              <p className="text-sm font-semibold text-ink">Try Another Mock Test</p>
              <div className="flex flex-wrap gap-2">
                {prevTest && (
                  <Link href={`/mock-test/${prevTest}`} className="flex-1 py-3 bg-raised border border-border rounded-xl text-sm font-medium text-ink text-center hover:border-brand-500/40 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    ← Test {prevTest}
                  </Link>
                )}
                {nextTest && (
                  <Link href={`/mock-test/${nextTest}`} className="flex-1 py-3 bg-brand-500/10 border border-brand-500/30 rounded-xl text-sm font-medium text-brand-400 text-center hover:bg-brand-500/20 active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    Test {nextTest} →
                  </Link>
                )}
                <Link href="/mock-test" className="w-full py-3 bg-raised border border-border rounded-xl text-sm text-ink-muted text-center hover:text-ink hover:border-brand-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                  All 45 Mock Tests
                </Link>
              </div>
              <div className="pt-1 border-t border-border">
                <p className="text-xs text-ink-muted mb-2">What to do next</p>
                <div className="grid grid-cols-3 gap-2">
                  <Link href="/cheat-sheet" className="py-2.5 bg-raised rounded-xl text-xs text-ink-muted text-center hover:text-ink hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    📄 Cheat Sheet
                  </Link>
                  <Link href="/practice" className="py-2.5 bg-raised rounded-xl text-xs text-ink-muted text-center hover:text-ink hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    📚 Revise
                  </Link>
                  <Link href="/weak-spots" className="py-2.5 bg-raised rounded-xl text-xs text-ink-muted text-center hover:text-ink hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
                    🎯 Weak Spots
                  </Link>
                </div>
              </div>
            </div>
          }
        />

        <div className="mt-4 flex justify-center">
          <PrintTest testNumber={testNumber} score={correct} total={questions.length} questions={questions} />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <BadgeUnlock />
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-ink-muted">Mock Test {testNumber}</span>
      </div>
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
