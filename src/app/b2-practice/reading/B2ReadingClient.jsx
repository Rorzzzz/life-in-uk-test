'use client'

import { useState } from 'react'
import Link from 'next/link'
import B2ReadingCard from '@/components/game/B2ReadingCard'
import B2ResultScreen from '@/components/game/B2ResultScreen'
import { B2_READING_PASSAGES, B2_READING_SECTIONS } from '@/data/b2Reading'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildSession(sectionId) {
  const pool = sectionId === 'all'
    ? B2_READING_PASSAGES
    : B2_READING_PASSAGES.filter(p => p.section === sectionId)
  // Pick 3 passages, up to 20 questions total
  const picked = shuffle(pool).slice(0, 3)
  return picked
}

// Flatten passages into a list of {passage, questionIndex} steps
function flattenSession(passages) {
  const steps = []
  passages.forEach(passage => {
    passage.questions.forEach((_, qi) => {
      steps.push({ passage, questionIndex: qi })
    })
  })
  return steps
}

export default function B2ReadingClient() {
  const [activeSection, setActiveSection] = useState('all')
  const [session, setSession]             = useState(null)
  const [steps, setSteps]                 = useState([])
  const [stepIndex, setStepIndex]         = useState(0)
  const [correct, setCorrect]             = useState(0)
  const [wrongQuestions, setWrongQuestions] = useState([])
  const [done, setDone]                   = useState(false)
  const [started, setStarted]             = useState(false)

  function startNew(sectionId) {
    const sec = sectionId ?? activeSection
    setActiveSection(sec)
    const passages = buildSession(sec)
    const flat = flattenSession(passages)
    setSession(passages)
    setSteps(flat)
    setStepIndex(0)
    setCorrect(0)
    setWrongQuestions([])
    setDone(false)
    setStarted(true)
    window.scrollTo(0, 0); document.body.scrollTop = 0; document.documentElement.scrollTop = 0
  }

  function handleAnswer(isCorrect, selectedIndex) {
    if (isCorrect) {
      setCorrect(c => c + 1)
    } else {
      const { passage, questionIndex } = steps[stepIndex]
      const q = passage.questions[questionIndex]
      setWrongQuestions(prev => [...prev, {
        ...q,
        q: q.q,
        options: q.options,
        answer: q.answer,
        explanation: q.explanation,
        selectedIndex,
      }])
    }
  }

  function handleNext() {
    if (stepIndex + 1 >= steps.length) {
      setDone(true)
    } else {
      setStepIndex(i => i + 1)
    }
  }

  const totalQuestions = steps.length

  if (done) {
    return (
      <B2ResultScreen
        score={correct}
        total={totalQuestions}
        wrongQuestions={wrongQuestions}
        onRetry={() => startNew(activeSection)}
        onChangeCategory={() => { setDone(false); setStarted(false) }}
      />
    )
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-1">B2 Reading Practice</h1>
        <p className="text-ink-muted mb-6">
          Passages with comprehension questions — aligned to IELTS General Training format.
        </p>

        <div className="bg-card rounded-2xl p-5 mb-5">
          <p className="font-semibold text-ink mb-3">Choose a section</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => startNew('all')}
              className="flex items-center justify-between px-4 py-3 bg-raised border border-border hover:border-brand-500/40 rounded-xl transition-colors group"
            >
              <div className="text-left">
                <div className="font-medium text-ink text-sm">All Sections</div>
                <div className="text-xs text-ink-muted">{B2_READING_PASSAGES.length} passages · mix of all types</div>
              </div>
              <span className="text-brand-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
            {B2_READING_SECTIONS.map(sec => {
              const count = B2_READING_PASSAGES.filter(p => p.section === sec.id).length
              const colours = { 1: '#3381ff', 2: '#a855f7', 3: '#22d07a' }
              const colour = colours[sec.id]
              return (
                <button
                  key={sec.id}
                  onClick={() => startNew(sec.id)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:opacity-80"
                  style={{ borderColor: `${colour}44`, backgroundColor: `${colour}11` }}
                >
                  <div className="text-left">
                    <div className="font-medium text-sm" style={{ color: colour }}>{sec.title}</div>
                    <div className="text-xs text-ink-muted">{sec.description}</div>
                    <div className="text-xs text-ink-muted mt-0.5">{count} passages</div>
                  </div>
                  <span className="text-xs font-mono" style={{ color: colour }}>→</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 mb-5">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">How it works</p>
          <ul className="text-sm text-ink-muted space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Read the passage — tap to collapse it while answering</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> All answers come directly from the text — no outside knowledge needed</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Each session: 3 passages, ~15 questions</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Wrong answers reviewed at the end with passage evidence</li>
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Related</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Vocabulary</Link>
            <Link href="/b2-practice/grammar" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Grammar</Link>
            <Link href="/articles/b2-english-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Test Guide</Link>
          </div>
        </div>
      </div>
    )
  }

  const { passage, questionIndex } = steps[stepIndex]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display font-bold text-ink text-base">B2 Reading</h1>
          <p className="text-xs text-ink-muted">
            {activeSection === 'all'
              ? 'All Sections'
              : B2_READING_SECTIONS.find(s => s.id === activeSection)?.title
            } · {totalQuestions} questions
          </p>
        </div>
        <button
          onClick={() => setStarted(false)}
          className="text-xs text-ink-muted hover:text-ink transition-colors px-3 py-1.5 rounded-lg hover:bg-raised"
        >
          Change section
        </button>
      </div>

      <B2ReadingCard
        passage={passage}
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        globalIndex={stepIndex}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  )
}
