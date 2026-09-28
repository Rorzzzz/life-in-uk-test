'use client'

import { useState } from 'react'
import Link from 'next/link'
import B2SpeakingCard from '@/components/game/B2SpeakingCard'
import { B2_SPEAKING_TASKS } from '@/data/b2Speaking'

const SESSION_SIZE = 3

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildSession(filter) {
  if (filter === 'all') {
    const p1 = shuffle(B2_SPEAKING_TASKS.filter(t => t.part === 1)).slice(0, 1)
    const p2 = shuffle(B2_SPEAKING_TASKS.filter(t => t.part === 2)).slice(0, 1)
    const p3 = shuffle(B2_SPEAKING_TASKS.filter(t => t.part === 3)).slice(0, 1)
    return [...p1, ...p2, ...p3]
  }
  const part = parseInt(filter)
  return shuffle(B2_SPEAKING_TASKS.filter(t => t.part === part)).slice(0, SESSION_SIZE)
}

export default function B2SpeakingClient() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [session, setSession]           = useState(null)
  const [taskIndex, setTaskIndex]       = useState(0)
  const [done, setDone]                 = useState(false)
  const [started, setStarted]           = useState(false)

  function startNew(filter) {
    const f = filter ?? activeFilter
    setActiveFilter(f)
    setSession(buildSession(f))
    setTaskIndex(0)
    setDone(false)
    setStarted(true)
    window.scrollTo(0, 0); document.body.scrollTop = 0; document.documentElement.scrollTop = 0
  }

  function handleNext() {
    if (taskIndex + 1 >= session.length) {
      setDone(true)
    } else {
      setTaskIndex(i => i + 1)
      window.scrollTo(0, 0); document.body.scrollTop = 0; document.documentElement.scrollTop = 0
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-card rounded-2xl p-6 text-center mb-6">
          <div className="text-3xl mb-2">🎤</div>
          <h2 className="text-xl font-display font-bold text-ink mb-1">Session complete</h2>
          <p className="text-sm text-ink-muted mb-6">Review the feedback and model answers above before your next session.</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => startNew(activeFilter)}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold rounded-xl transition-colors"
            >
              New session →
            </button>
            <button
              onClick={() => { setDone(false); setStarted(false) }}
              className="w-full py-3 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink rounded-xl text-sm font-medium transition-colors"
            >
              Change part
            </button>
            <Link href="/b2-practice" className="w-full py-3 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink rounded-xl text-sm font-medium transition-colors text-center">
              ← B2 Practice hub
            </Link>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Also practise</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Writing</Link>
            <Link href="/b2-practice/reading" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Reading</Link>
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Vocabulary</Link>
          </div>
        </div>
      </div>
    )
  }

  const part1Count = B2_SPEAKING_TASKS.filter(t => t.part === 1).length
  const part2Count = B2_SPEAKING_TASKS.filter(t => t.part === 2).length
  const part3Count = B2_SPEAKING_TASKS.filter(t => t.part === 3).length

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-1">B2 Speaking Practice</h1>
        <p className="text-ink-muted mb-2">Record your response — get instant examiner feedback.</p>
        <p className="text-sm text-ink-muted mb-6">
          Feedback covers fluency, vocabulary, grammar and band score.
        </p>

        <div className="bg-card rounded-2xl p-5 mb-5">
          <p className="font-semibold text-ink mb-3">Choose a session type</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => startNew('all')}
              className="flex items-center justify-between px-4 py-3 bg-raised border border-border hover:border-brand-500/40 rounded-xl transition-colors group"
            >
              <div className="text-left">
                <div className="font-medium text-ink text-sm">Full mock speaking test</div>
                <div className="text-xs text-ink-muted">1 question from each part — Parts 1, 2 and 3</div>
              </div>
              <span className="text-brand-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
            <button
              onClick={() => startNew('1')}
              className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:opacity-80"
              style={{ borderColor: '#3381ff44', backgroundColor: '#3381ff11' }}
            >
              <div className="text-left">
                <div className="font-medium text-sm text-brand-400">Part 1 — Interview questions</div>
                <div className="text-xs text-ink-muted">{part1Count} questions · 20–30 seconds each · familiar topics</div>
              </div>
              <span className="text-xs font-mono text-brand-400">→</span>
            </button>
            <button
              onClick={() => startNew('2')}
              className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:opacity-80"
              style={{ borderColor: '#a855f744', backgroundColor: '#a855f711' }}
            >
              <div className="text-left">
                <div className="font-medium text-sm" style={{ color: '#a855f7' }}>Part 2 — Long turn (cue card)</div>
                <div className="text-xs text-ink-muted">{part2Count} topics · 1 min prep · speak for 1–2 minutes</div>
              </div>
              <span className="text-xs font-mono" style={{ color: '#a855f7' }}>→</span>
            </button>
            <button
              onClick={() => startNew('3')}
              className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:opacity-80"
              style={{ borderColor: '#06b6d444', backgroundColor: '#06b6d411' }}
            >
              <div className="text-left">
                <div className="font-medium text-sm" style={{ color: '#06b6d4' }}>Part 3 — Discussion</div>
                <div className="text-xs text-ink-muted">{part3Count} questions · 40–60 seconds · abstract topics</div>
              </div>
              <span className="text-xs font-mono" style={{ color: '#06b6d4' }}>→</span>
            </button>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 mb-5">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">How it works</p>
          <ul className="text-sm text-ink-muted space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Read the question and press record</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Speak your answer — works on all browsers</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Your speech is transcribed, then assessed by an examiner</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Feedback covers fluency, vocabulary, grammar and band score</li>
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Related</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/articles/b2-english-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Test Guide</Link>
            <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">Writing Practice</Link>
          </div>
        </div>
      </div>
    )
  }

  const currentTask = session[taskIndex]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display font-bold text-ink text-base">B2 Speaking</h1>
          <p className="text-xs text-ink-muted">Task {taskIndex + 1} of {session.length}</p>
        </div>
        <button
          onClick={() => setStarted(false)}
          className="text-xs text-ink-muted hover:text-ink transition-colors px-3 py-1.5 rounded-lg hover:bg-raised"
        >
          Change part
        </button>
      </div>

      <B2SpeakingCard
        key={`${taskIndex}-${currentTask.id}`}
        task={currentTask}
        onNext={handleNext}
        isLast={taskIndex + 1 >= session.length}
      />
    </div>
  )
}
