'use client'

import { useState, useRef } from 'react'
import { ChevronDown, ChevronUp, Loader2, CheckCircle } from 'lucide-react'
import clsx from 'clsx'

const WORD_TARGETS = { 1: 150, 2: 250 }

function wordCount(text) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

function FeedbackText({ text }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, li) => {
        const isPass = /^PASS\s*—/.test(line.trim())
        const isFail = /^FAIL\s*—/.test(line.trim())
        if (isPass || isFail) {
          return (
            <div key={li} className={`flex items-center gap-2 my-3 px-4 py-3 rounded-xl font-semibold text-sm ${isPass ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'}`}>
              <span className="text-lg">{isPass ? '✓' : '✗'}</span>
              {line.trim()}
            </div>
          )
        }
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <span key={li}>
            {parts.map((part, i) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={i} className="text-ink font-semibold">{part.slice(2, -2)}</strong>
                : <span key={i}>{part}</span>
            )}
            {'\n'}
          </span>
        )
      })}
    </>
  )
}

export default function B2WritingCard({ task, onNext, isLast }) {
  const [userText, setUserText]         = useState('')
  const [feedback, setFeedback]         = useState('')
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)
  const [modelOpen, setModelOpen]       = useState(false)
  const [submitted, setSubmitted]       = useState(false)
  const feedbackRef                     = useRef(null)
  const words                           = wordCount(userText)
  const target                          = WORD_TARGETS[task.task]
  const atTarget                        = words >= target

  async function getFeedback() {
    if (!userText.trim() || loading) return
    setLoading(true)
    setError(null)
    setFeedback('')
    setSubmitted(true)

    try {
      const res = await fetch('/api/b2-writing-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userText,
          taskPrompt: task.prompt,
          taskType: task.task,
          keyPoints: task.keyPoints,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Feedback unavailable.')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setFeedback(prev => prev + decoder.decode(value))
      }

      // Scroll feedback into view
      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const typeLabel = {
    'formal-letter': 'Formal Letter',
    'semi-formal-letter': 'Semi-formal Letter',
    'informal-letter': 'Informal Letter',
    'opinion-essay': 'Opinion Essay',
    'discuss-essay': 'Discuss Both Views',
    'problem-solution': 'Problem & Solution',
    'advantages-disadvantages': 'Advantages & Disadvantages',
  }[task.type] ?? task.type

  return (
    <div className="flex flex-col gap-4">
      {/* Task header */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-400 font-semibold">Task {task.task}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-raised border border-border text-ink-muted font-medium">{typeLabel}</span>
        </div>
        <h2 className="font-semibold text-ink text-base mb-3">{task.title}</h2>
        <p className="text-sm text-ink leading-relaxed whitespace-pre-line">{task.prompt}</p>
        <p className="text-xs text-ink-muted mt-3">Write at least {target} words.</p>
      </div>

      {/* Textarea */}
      {!submitted && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <textarea
            value={userText}
            onChange={e => setUserText(e.target.value)}
            placeholder="Write your response here..."
            className="w-full bg-transparent text-ink text-sm leading-relaxed p-5 resize-none outline-none placeholder:text-ink-muted/50 min-h-[220px]"
            rows={10}
          />
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <span className={clsx('text-xs font-mono transition-colors', atTarget ? 'text-success' : 'text-ink-muted')}>
              {words} / {target} words {atTarget && '✓'}
            </span>
            <button
              onClick={getFeedback}
              disabled={words < 10 || loading}
              className="px-4 py-2 bg-brand-500 hover:bg-brand-600 active:opacity-70 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              {loading ? 'Analysing...' : 'Get feedback →'}
            </button>
          </div>
        </div>
      )}

      {/* Show submitted text (read-only) after submission */}
      {submitted && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Your response</p>
            <span className="text-xs font-mono text-ink-muted">{words} words</span>
          </div>
          <p className="text-sm text-ink leading-relaxed whitespace-pre-line">{userText}</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-danger/10 border border-danger/30 rounded-2xl p-4">
          <p className="text-sm text-danger">{error}</p>
          <button onClick={() => { setSubmitted(false); setError(null) }} className="text-xs text-danger/70 hover:text-danger mt-2 underline">Try again</button>
        </div>
      )}

      {/* Feedback */}
      {(feedback || loading) && (
        <div ref={feedbackRef} className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            {loading
              ? <Loader2 size={14} className="animate-spin text-brand-400" />
              : <CheckCircle size={14} className="text-success" />
            }
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {loading ? 'Reviewing your response...' : 'Examiner Feedback'}
            </p>
          </div>
          <div className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
            <FeedbackText text={feedback} />
            {loading && <span className="inline-block w-1.5 h-4 bg-brand-400 animate-pulse ml-0.5 align-middle" />}
          </div>
        </div>
      )}

      {/* Model answer — collapsible */}
      {feedback && !loading && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setModelOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-raised transition-colors"
          >
            <span className="text-sm font-semibold text-ink">Model answer (Band 7)</span>
            {modelOpen ? <ChevronUp size={16} className="text-ink-muted" /> : <ChevronDown size={16} className="text-ink-muted" />}
          </button>
          {modelOpen && (
            <div className="px-5 pb-5">
              <div className="h-px bg-border mb-4" />
              <p className="text-sm text-ink leading-relaxed whitespace-pre-line mb-4">{task.modelAnswer}</p>
              <div className="bg-raised rounded-xl p-3 border border-border">
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Examiner notes</p>
                <p className="text-xs text-ink-muted leading-relaxed">{task.examinerNotes}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Next task */}
      {feedback && !loading && (
        <button
          onClick={onNext}
          className="w-full py-3 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold rounded-xl transition-colors"
        >
          {isLast ? 'Finish session →' : 'Next task →'}
        </button>
      )}
    </div>
  )
}
