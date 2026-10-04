'use client'

import { useState, useRef, useEffect } from 'react'
import { Play, RotateCcw, Volume2, SkipForward } from 'lucide-react'
import clsx from 'clsx'

const SECTION_LABELS = {
  1: 'Section 1 — Everyday conversation',
  2: 'Section 2 — Monologue',
  3: 'Section 3 — Academic discussion',
  4: 'Section 4 — Academic lecture',
}

export default function B2ListeningCard({ task, onAnswer, questionIndex, totalQuestions, globalIndex }) {
  const [phase, setPhase]         = useState('ready')   // ready | playing | questions
  const [replaying, setReplaying] = useState(false)
  const [playCount, setPlayCount] = useState(0)
  const [selected, setSelected]   = useState(null)
  const [revealed, setRevealed]   = useState(false)
  const utteranceRef              = useRef(null)
  const answerRef                 = useRef(null)

  const question = task.questions[questionIndex]
  const isCorrect = selected === question.answer

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  // Cancel speech when question changes
  useEffect(() => {
    window.speechSynthesis?.cancel()
    setSelected(null)
    setRevealed(false)
    setReplaying(false)
  }, [questionIndex])

  function playAudio() {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()

    // Strip speaker labels for cleaner TTS (replace "A: " "B: " etc with a pause)
    const cleanScript = task.audioScript
      .replace(/^[A-C]:\s*/gm, '')
      .replace(/\n/g, ' ')

    const utterance = new SpeechSynthesisUtterance(cleanScript)
    utterance.rate = 0.92
    utterance.pitch = 1
    utterance.lang = 'en-GB'

    utterance.onend = () => {
      setPhase('questions')
      setReplaying(false)
      setPlayCount(c => c + 1)
    }
    utterance.onerror = () => { setPhase('questions'); setReplaying(false) }

    utteranceRef.current = utterance
    setPhase('playing')
    window.speechSynthesis.speak(utterance)
  }

  function listenAgain() {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const cleanScript = task.audioScript
      .replace(/^[A-C]:\s*/gm, '')
      .replace(/\n/g, ' ')
    const utterance = new SpeechSynthesisUtterance(cleanScript)
    utterance.rate = 0.92
    utterance.pitch = 1
    utterance.lang = 'en-GB'
    utterance.onend  = () => { setReplaying(false); setPlayCount(c => c + 1) }
    utterance.onerror = () => setReplaying(false)
    utteranceRef.current = utterance
    setReplaying(true)
    window.speechSynthesis.speak(utterance)
  }

  function skipReplay() {
    window.speechSynthesis?.cancel()
    setReplaying(false)
  }

  function handleSelect(idx) {
    if (revealed) return
    setSelected(idx)
    setRevealed(true)
    setTimeout(() => answerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100)
  }

  function handleNext() {
    onAnswer(selected === question.answer, selected)
  }

  const isFirstQuestion = questionIndex === 0
  const showAudioControls = isFirstQuestion || phase === 'ready'

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-400 font-semibold">
            {SECTION_LABELS[task.section]}
          </span>
        </div>
        <h2 className="font-semibold text-ink text-base">{task.title}</h2>
        <p className="text-xs text-ink-muted mt-1">
          Question {globalIndex + 1} of {totalQuestions}
        </p>
      </div>

      {/* Audio player */}
      {(phase === 'ready' || phase === 'playing' || (phase === 'questions' && questionIndex === 0)) && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 size={16} className="text-brand-400" />
            <p className="text-sm font-semibold text-ink">Audio clip</p>
            {playCount > 0 && (
              <span className="text-xs text-ink-muted ml-auto">Played {playCount}×</span>
            )}
          </div>

          {phase === 'playing' ? (
            <div className="flex items-center justify-between gap-3 py-3">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {[0,1,2,3,4].map(i => (
                    <div
                      key={i}
                      className="w-1 bg-brand-400 rounded-full animate-pulse"
                      style={{ height: `${12 + (i % 3) * 8}px`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span className="text-sm text-ink-muted">Playing...</span>
              </div>
              <button
                onClick={() => { window.speechSynthesis?.cancel(); setPhase('questions'); setPlayCount(c => c + 1) }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink text-xs rounded-xl transition-colors"
              >
                <SkipForward size={13} />
                Skip
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={playAudio}
                className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white text-sm font-semibold rounded-xl transition-colors"
              >
                <Play size={14} />
                {playCount === 0 ? 'Play audio' : 'Play again'}
              </button>
              {phase === 'questions' && (
                <button
                  onClick={() => setPhase('questions')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink text-sm rounded-xl transition-colors"
                >
                  Answer questions →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Questions — only show after audio played */}
      {phase === 'questions' && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <p className="text-sm font-semibold text-ink mb-4">{question.q}</p>
          <div className="flex flex-col gap-2">
            {question.options.map((opt, i) => {
              const isSelected = selected === i
              const correct = question.answer === i
              let style = 'bg-raised border-border text-ink-muted hover:border-brand-500/40 hover:text-ink'
              if (revealed) {
                if (correct) style = 'bg-success/15 border-success/50 text-success'
                else if (isSelected) style = 'bg-danger/15 border-danger/50 text-danger'
                else style = 'bg-raised border-border text-ink-muted opacity-50'
              }
              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={revealed}
                  className={clsx('w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors', style)}
                >
                  <span className="font-mono text-xs mr-2 opacity-60">{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              )
            })}
          </div>

          {/* Listen again — keeps questions visible */}
          {!revealed && (
            replaying ? (
              <div className="flex items-center justify-between mt-3 px-3 py-2 bg-raised rounded-xl border border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[0,1,2,3,4].map(i => (
                      <div key={i} className="w-0.5 bg-brand-400 rounded-full animate-pulse"
                        style={{ height: `${8 + (i % 3) * 5}px`, animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                  <span className="text-xs text-ink-muted">Playing again...</span>
                </div>
                <button onClick={skipReplay} className="flex items-center gap-1 text-xs text-ink-muted hover:text-ink transition-colors">
                  <SkipForward size={12} /> Skip
                </button>
              </div>
            ) : (
              <button
                onClick={listenAgain}
                className="flex items-center gap-1.5 mt-3 text-xs text-ink-muted hover:text-ink transition-colors"
              >
                <RotateCcw size={12} />
                Listen again
              </button>
            )
          )}
        </div>
      )}

      {/* Explanation */}
      {revealed && (
        <div ref={answerRef} className={clsx('rounded-2xl border p-4', isCorrect ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30')}>
          <p className={clsx('text-sm font-semibold mb-1', isCorrect ? 'text-success' : 'text-danger')}>
            {isCorrect ? '✓ Correct' : `✗ Correct answer: ${question.options[question.answer]}`}
          </p>
          <p className="text-xs text-ink-muted leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {revealed && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold rounded-xl transition-colors"
        >
          Next →
        </button>
      )}
    </div>
  )
}
