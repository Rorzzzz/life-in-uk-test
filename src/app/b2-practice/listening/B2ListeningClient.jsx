'use client'

import { useState } from 'react'
import Link from 'next/link'
import B2ListeningCard from '@/components/game/B2ListeningCard'
import B2ResultScreen from '@/components/game/B2ResultScreen'
import { B2_LISTENING_TASKS } from '@/data/b2Listening'

const SESSION_SIZE = 2  // passages per session (8 questions)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildSession(filter) {
  const pool = filter === 'all'
    ? B2_LISTENING_TASKS
    : B2_LISTENING_TASKS.filter(t => t.section === parseInt(filter))
  return shuffle(pool).slice(0, SESSION_SIZE)
}

function buildSteps(passages) {
  return passages.flatMap(passage =>
    passage.questions.map((_, qi) => ({ passage, questionIndex: qi }))
  )
}

export default function B2ListeningClient() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [steps, setSteps]               = useState(null)
  const [stepIndex, setStepIndex]       = useState(0)
  const [wrongQuestions, setWrongQuestions] = useState([])
  const [done, setDone]                 = useState(false)
  const [started, setStarted]           = useState(false)
  const [score, setScore]               = useState(0)
  const [total, setTotal]               = useState(0)

  function startNew(filter) {
    const f = filter ?? activeFilter
    const passages = buildSession(f)
    const s = buildSteps(passages)
    setActiveFilter(f)
    setSteps(s)
    setStepIndex(0)
    setWrongQuestions([])
    setScore(0)
    setTotal(s.length)
    setDone(false)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleAnswer(isCorrect, selectedIndex) {
    const step = steps[stepIndex]
    const q = step.passage.questions[step.questionIndex]

    if (!isCorrect) {
      setWrongQuestions(prev => [...prev, {
        q: q.q,
        options: q.options,
        yourAnswer: selectedIndex,
        correctAnswer: q.answer,
        explanation: q.explanation,
      }])
    } else {
      setScore(s => s + 1)
    }

    if (stepIndex + 1 >= steps.length) {
      setDone(true)
    } else {
      setStepIndex(i => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <B2ResultScreen
          score={score}
          total={total}
          wrongQuestions={wrongQuestions}
          onRetry={() => startNew(activeFilter)}
          onChangeCategory={() => { setDone(false); setStarted(false) }}
          hubHref="/b2-practice"
        />
        <div className="bg-card rounded-2xl p-4 mt-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Also practise</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/b2-practice/speaking" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Speaking</Link>
            <Link href="/b2-practice/reading" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Reading</Link>
            <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Writing</Link>
          </div>
        </div>
      </div>
    )
  }

  const s1Count = B2_LISTENING_TASKS.filter(t => t.section === 1).length
  const s2Count = B2_LISTENING_TASKS.filter(t => t.section === 2).length
  const s3Count = B2_LISTENING_TASKS.filter(t => t.section === 3).length
  const s4Count = B2_LISTENING_TASKS.filter(t => t.section === 4).length

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-1">B2 Listening Practice</h1>
        <p className="text-ink-muted mb-2">Listen to the audio clip — then answer the questions.</p>
        <p className="text-sm text-ink-muted mb-6">
          Audio plays in your browser. Text is hidden while you listen.
        </p>

        <div className="bg-card rounded-2xl p-5 mb-5">
          <p className="font-semibold text-ink mb-3">Choose a section</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => startNew('all')}
              className="flex items-center justify-between px-4 py-3 bg-raised border border-border hover:border-brand-500/40 rounded-xl transition-colors group"
            >
              <div className="text-left">
                <div className="font-medium text-ink text-sm">All sections</div>
                <div className="text-xs text-ink-muted">{B2_LISTENING_TASKS.length} clips — 2 random clips per session</div>
              </div>
              <span className="text-brand-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
            {[
              { val: '1', label: 'Section 1 — Everyday conversation', count: s1Count, color: '#3381ff' },
              { val: '2', label: 'Section 2 — Monologue', count: s2Count, color: '#22d07a' },
              { val: '3', label: 'Section 3 — Academic discussion', count: s3Count, color: '#a855f7' },
              { val: '4', label: 'Section 4 — Academic lecture', count: s4Count, color: '#f59e0b' },
            ].map(({ val, label, count, color }) => (
              <button
                key={val}
                onClick={() => startNew(val)}
                className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:opacity-80"
                style={{ borderColor: `${color}44`, backgroundColor: `${color}11` }}
              >
                <div className="text-left">
                  <div className="font-medium text-sm" style={{ color }}>{label}</div>
                  <div className="text-xs text-ink-muted">{count} clips · 4 questions each</div>
                </div>
                <span className="text-xs font-mono" style={{ color }}>→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 mb-5">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">How it works</p>
          <ul className="text-sm text-ink-muted space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Press play — audio reads the clip aloud</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Text stays hidden while you listen</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Answer comprehension questions after the clip</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> You can replay as many times as you need</li>
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Related</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/articles/b2-english-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Test Guide</Link>
            <Link href="/b2-practice/speaking" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">Speaking Practice</Link>
          </div>
        </div>
      </div>
    )
  }

  const currentStep = steps[stepIndex]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display font-bold text-ink text-base">B2 Listening</h1>
          <p className="text-xs text-ink-muted">Question {stepIndex + 1} of {steps.length}</p>
        </div>
        <button
          onClick={() => { window.speechSynthesis?.cancel(); setStarted(false) }}
          className="text-xs text-ink-muted hover:text-ink transition-colors px-3 py-1.5 rounded-lg hover:bg-raised"
        >
          Change section
        </button>
      </div>

      <B2ListeningCard
        key={`${stepIndex}-${currentStep.passage.id}-${currentStep.questionIndex}`}
        task={currentStep.passage}
        questionIndex={currentStep.questionIndex}
        totalQuestions={steps.length}
        globalIndex={stepIndex}
        onAnswer={handleAnswer}
      />
    </div>
  )
}
