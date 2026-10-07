'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { getMockTest, EXAM_DURATION_SECONDS, MOCK_TEST_COUNT } from '@/data/mockTests'
import { CHAPTERS, QUESTIONS } from '@/data/questions'
import { useGame } from '@/context/GameContext'
import QuestionCard from '@/components/game/QuestionCard'
import TimerBar from '@/components/game/TimerBar'
import ResultScreen from '@/components/game/ResultScreen'
import BadgeUnlock from '@/components/game/BadgeUnlock'
import dynamic from 'next/dynamic'

const ConfettiBlast = dynamic(() => import('@/components/game/ConfettiBlast'), { ssr: false })

// Chapter distribution mirrors the real exam
const DISTRIBUTION = { 1: 2, 2: 3, 3: 10, 4: 5, 5: 4 }

function buildAdaptiveTest(progress) {
  const result = []
  for (let ch = 1; ch <= 5; ch++) {
    const chQs = QUESTIONS.filter(q => q.chapter === ch)
    const count = DISTRIBUTION[ch]

    const scored = chQs.map(q => {
      const p = progress[q.id]
      if (!p || p.totalAnswered === 0) return { q, score: Math.random() * 0.9 } // unseen = top priority
      const accuracy = p.totalCorrect / p.totalAnswered
      if (accuracy < 0.5) return { q, score: 1 + Math.random() * 0.9 } // weak
      if (p.mastery <= 1)  return { q, score: 2 + Math.random() * 0.9 }
      if (p.mastery <= 2)  return { q, score: 3 + Math.random() * 0.9 }
      return { q, score: 4 + Math.random() * 0.9 } // mastered = lowest priority
    })

    scored.sort((a, b) => a.score - b.score)
    result.push(...scored.slice(0, count).map(s => s.q))
  }
  // Final shuffle preserves chapter distribution but randomises order
  return result.sort(() => Math.random() - 0.5)
}

export default function ExamPage() {
  const router = useRouter()
  const { state, completeExam } = useGame()

  const [mode, setMode]             = useState(null) // null = pick mode, 'random' | 'adaptive'
  const [questions, setQuestions]   = useState([])
  const [index, setIndex]           = useState(0)
  const [correct, setCorrect]       = useState(0)
  const correctRef                  = useRef(0)
  const [wrongByChapter, setWrongByChapter] = useState({})
  const [timeLeft, setTimeLeft]     = useState(EXAM_DURATION_SECONDS)
  const [started, setStarted]       = useState(false)
  const [done, setDone]             = useState(false)

  // Adaptive stats for display on start screen
  const [adaptiveStats, setAdaptiveStats] = useState({ unseen: 0, weak: 0 })

  useEffect(() => {
    const progress = state.progress ?? {}
    const unseen = QUESTIONS.filter(q => !progress[q.id] || progress[q.id].totalAnswered === 0).length
    const weak   = QUESTIONS.filter(q => {
      const p = progress[q.id]
      if (!p || p.totalAnswered === 0) return false
      return p.totalCorrect / p.totalAnswered < 0.6
    }).length
    setAdaptiveStats({ unseen, weak })
  }, [state.progress])

  function startMode(m) {
    const qs = m === 'adaptive'
      ? buildAdaptiveTest(state.progress ?? {})
      : getMockTest(Math.floor(Math.random() * MOCK_TEST_COUNT) + 1)
    setMode(m)
    setQuestions(qs)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Timer
  useEffect(() => {
    if (!started || done) return
    if (timeLeft <= 0) { handleFinish(correctRef.current); return }
    const t = setTimeout(() => setTimeLeft(s => s - 1), 1000)
    return () => clearTimeout(t)
  }, [started, done, timeLeft]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleFinish = useCallback((finalCorrect) => {
    setDone(true)
    completeExam(finalCorrect, questions.length, timeLeft)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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

  function handleRetry() {
    // Restart in the same mode — no need to go back through the picker
    const qs = mode === 'adaptive'
      ? buildAdaptiveTest(state.progress ?? {})
      : getMockTest(Math.floor(Math.random() * MOCK_TEST_COUNT) + 1)
    setQuestions(qs)
    setIndex(0); setCorrect(0); correctRef.current = 0
    setWrongByChapter({}); setDone(false)
    setTimeLeft(EXAM_DURATION_SECONDS)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleChangMode() {
    setIndex(0); setCorrect(0); correctRef.current = 0
    setWrongByChapter({}); setDone(false); setStarted(false)
    setTimeLeft(EXAM_DURATION_SECONDS); setMode(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // ── Mode picker ──────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col items-center text-center gap-6">
        <p className="text-5xl">🎓</p>
        <div>
          <h1 className="text-2xl font-display font-bold text-ink mb-2">Mock Exam</h1>
          <p className="text-ink-muted text-sm">24 questions · 45 minutes · Pass mark: 18/24</p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          {/* Smart Exam */}
          <button
            onClick={() => startMode('adaptive')}
            className="w-full text-left bg-brand-500/10 border border-brand-500/30 hover:bg-brand-500/20 active:opacity-80 rounded-2xl p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">🧠</span>
              <div>
                <p className="font-bold text-ink mb-1">Smart Exam</p>
                <p className="text-sm text-ink-muted leading-snug">
                  Prioritises your {adaptiveStats.unseen} unseen questions and {adaptiveStats.weak} weak spots.
                  Best for filling gaps.
                </p>
              </div>
            </div>
          </button>

          {/* Random Exam */}
          <button
            onClick={() => startMode('random')}
            className="w-full text-left bg-card border border-border hover:bg-raised active:opacity-80 rounded-2xl p-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">🎲</span>
              <div>
                <p className="font-bold text-ink mb-1">Random Exam</p>
                <p className="text-sm text-ink-muted leading-snug">
                  Picks any 24 questions at random — same as the real test. Good for exam simulation.
                </p>
              </div>
            </div>
          </button>
        </div>

        <p className="text-xs text-ink-muted">
          For fixed numbered tests, use{' '}
          <a href="/mock-test" className="text-brand-400 hover:underline">Mock Tests 1–60</a>
        </p>
      </div>
    )
  }

  // ── Results ──────────────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <ConfettiBlast trigger={correct >= 18} />
        <ResultScreen
          score={correct}
          total={questions.length}
          xpEarned={correct === questions.length ? 200 : correct >= 18 ? 100 : 0}
          onRetry={handleRetry}
          retryLabel={mode === 'adaptive' ? '🧠 Another Smart Exam' : '🎲 Another Random Exam'}
          onHome={() => router.push('/')}
          onDifferentTest={handleChangMode}
          differentTestLabel="Change mode"
          weakChapters={CHAPTERS
            .filter(ch => wrongByChapter[ch.id] > 0)
            .sort((a, b) => (wrongByChapter[b.id] ?? 0) - (wrongByChapter[a.id] ?? 0))
            .map(ch => ({ id: ch.id, title: ch.title, colour: ch.colour, wrong: wrongByChapter[ch.id] }))}
          isExam
        />
      </div>
    )
  }

  // ── Active exam ───────────────────────────────────────────────────────────────
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
