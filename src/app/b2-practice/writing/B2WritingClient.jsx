'use client'

import { useState } from 'react'
import Link from 'next/link'
import B2WritingCard from '@/components/game/B2WritingCard'
import { B2_WRITING_TASKS } from '@/data/b2Writing'

const SESSION_SIZE = 2

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
    ? B2_WRITING_TASKS
    : filter === 1
    ? B2_WRITING_TASKS.filter(t => t.task === 1)
    : B2_WRITING_TASKS.filter(t => t.task === 2)
  return shuffle(pool).slice(0, SESSION_SIZE)
}

export default function B2WritingClient() {
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleNext() {
    if (taskIndex + 1 >= session.length) {
      setDone(true)
    } else {
      setTaskIndex(i => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (done) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="bg-card rounded-2xl p-6 text-center mb-6">
          <div className="text-3xl mb-2">✍️</div>
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
              Change task type
            </button>
            <Link href="/b2-practice" className="w-full py-3 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink rounded-xl text-sm font-medium transition-colors text-center">
              ← B2 Practice hub
            </Link>
          </div>
        </div>
        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Also practise</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Vocabulary</Link>
            <Link href="/b2-practice/grammar" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Grammar</Link>
            <Link href="/b2-practice/reading" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">B2 Reading</Link>
          </div>
        </div>
      </div>
    )
  }

  if (!started) {
    const task1Count = B2_WRITING_TASKS.filter(t => t.task === 1).length
    const task2Count = B2_WRITING_TASKS.filter(t => t.task === 2).length

    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-1">B2 Writing Practice</h1>
        <p className="text-ink-muted mb-2">Write your response — get instant examiner feedback.</p>
        <p className="text-sm text-ink-muted mb-6">
          Feedback covers task achievement, vocabulary, grammar and band score.
        </p>

        <div className="bg-card rounded-2xl p-5 mb-5">
          <p className="font-semibold text-ink mb-3">Choose a task type</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => startNew('all')}
              className="flex items-center justify-between px-4 py-3 bg-raised border border-border hover:border-brand-500/40 rounded-xl transition-colors group"
            >
              <div className="text-left">
                <div className="font-medium text-ink text-sm">Both Tasks</div>
                <div className="text-xs text-ink-muted">{B2_WRITING_TASKS.length} prompts — 1 Task 1 + 1 Task 2 per session</div>
              </div>
              <span className="text-brand-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
            <button
              onClick={() => startNew(1)}
              className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:opacity-80"
              style={{ borderColor: '#3381ff44', backgroundColor: '#3381ff11' }}
            >
              <div className="text-left">
                <div className="font-medium text-sm text-brand-400">Task 1 — Letter Writing</div>
                <div className="text-xs text-ink-muted">{task1Count} prompts · 150+ words · formal, semi-formal, informal</div>
              </div>
              <span className="text-xs font-mono text-brand-400">→</span>
            </button>
            <button
              onClick={() => startNew(2)}
              className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:opacity-80"
              style={{ borderColor: '#a855f744', backgroundColor: '#a855f711' }}
            >
              <div className="text-left">
                <div className="font-medium text-sm" style={{ color: '#a855f7' }}>Task 2 — Essay Writing</div>
                <div className="text-xs text-ink-muted">{task2Count} prompts · 250+ words · opinion, discuss, problem/solution</div>
              </div>
              <span className="text-xs font-mono" style={{ color: '#a855f7' }}>→</span>
            </button>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 mb-5">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">How feedback works</p>
          <ul className="text-sm text-ink-muted space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Write your response in the text box</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Hit &ldquo;Get feedback&rdquo; — results appear in ~3 seconds</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Feedback covers task achievement, vocabulary, grammar, estimated band</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Compare with the model Band 7 answer</li>
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Related</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/articles/b2-english-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Test Guide</Link>
            <Link href="/articles/b2-vs-b1-english" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 vs B1</Link>
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
          <h1 className="font-display font-bold text-ink text-base">B2 Writing</h1>
          <p className="text-xs text-ink-muted">Task {taskIndex + 1} of {session.length}</p>
        </div>
        <button
          onClick={() => setStarted(false)}
          className="text-xs text-ink-muted hover:text-ink transition-colors px-3 py-1.5 rounded-lg hover:bg-raised"
        >
          Change type
        </button>
      </div>

      <B2WritingCard
        task={currentTask}
        onNext={handleNext}
        isLast={taskIndex + 1 >= session.length}
      />
    </div>
  )
}
