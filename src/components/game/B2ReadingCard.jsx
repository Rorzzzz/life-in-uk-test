'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'
import clsx from 'clsx'
import AnswerButton from './AnswerButton'
import ExplanationPanel from './ExplanationPanel'
import XPPopup from './XPPopup'

export default function B2ReadingCard({
  passage,          // { id, title, passage, questions }
  questionIndex,    // which question within this passage
  totalQuestions,   // total questions across all passages
  globalIndex,      // overall question number (for progress bar)
  onAnswer,
  onNext,
}) {
  const question = passage.questions[questionIndex]

  const [selected, setSelected]       = useState(null)
  const [answered, setAnswered]       = useState(false)
  const [passageOpen, setPassageOpen] = useState(true)
  const [xpGained, setXpGained]       = useState(0)
  const [showXP, setShowXP]           = useState(false)
  const explanationRef                = useRef(null)

  // Reset state when question changes
  useEffect(() => {
    setSelected(null)
    setAnswered(false)
    setXpGained(0)
    setShowXP(false)
    setPassageOpen(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [passage.id, questionIndex])

  // Scroll explanation into view after answering
  useEffect(() => {
    if (answered && explanationRef.current) {
      setTimeout(() => {
        const el = explanationRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const scrollBy = rect.bottom - window.innerHeight + 72
        if (scrollBy > 0) window.scrollBy({ top: scrollBy, behavior: 'smooth' })
      }, 150)
    }
  }, [answered])

  function handleAnswer(index) {
    if (answered) return
    const isCorrect = index === question.answer
    const xp = isCorrect ? 10 : 0
    setSelected(index)
    setAnswered(true)
    setXpGained(xp)
    if (xp > 0) setShowXP(true)
    onAnswer?.(isCorrect, index)
  }

  function getButtonState(index) {
    if (!answered) return null
    if (index === question.answer) return 'correct'
    if (index === selected) return 'incorrect'
    return null
  }

  const isFirstQuestionOfPassage = questionIndex === 0

  return (
    <div className="flex flex-col gap-4">
      <XPPopup amount={xpGained} visible={showXP} onHide={() => setShowXP(false)} />

      {/* Progress bar */}
      {totalQuestions > 1 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 flex gap-0.5" aria-hidden="true">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <div
                key={i}
                className={clsx(
                  'h-1 flex-1 rounded-full transition-colors',
                  i < globalIndex ? 'bg-success' :
                  i === globalIndex ? 'bg-brand-500' :
                  'bg-border'
                )}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-ink-muted whitespace-nowrap">
            {globalIndex + 1}/{totalQuestions}
          </span>
        </div>
      )}

      {/* Passage — collapsible after first question */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <button
          onClick={() => setPassageOpen(o => !o)}
          className="w-full flex items-center justify-between px-5 py-3 hover:bg-raised transition-colors"
        >
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-brand-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-ink">{passage.title}</span>
            {!isFirstQuestionOfPassage && (
              <span className="text-xs text-ink-muted">{passageOpen ? 'Hide' : 'Show'} passage</span>
            )}
          </div>
          {passageOpen
            ? <ChevronUp size={16} className="text-ink-muted flex-shrink-0" />
            : <ChevronDown size={16} className="text-ink-muted flex-shrink-0" />
          }
        </button>

        {passageOpen && (
          <div className="px-5 pb-5">
            <div className="h-px bg-border mb-4" />
            <p className="text-sm text-ink leading-relaxed whitespace-pre-line">{passage.passage}</p>
          </div>
        )}
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        {passage.questions.length > 1 && (
          <p className="text-xs font-mono text-ink-muted mb-2">
            Question {questionIndex + 1} of {passage.questions.length}
          </p>
        )}
        <h2 className="text-base font-semibold text-ink leading-snug mb-5">{question.q}</h2>
        <div className="flex flex-col gap-2">
          {question.options.map((opt, i) => (
            <AnswerButton
              key={i}
              option={opt}
              index={i}
              state={getButtonState(i)}
              onClick={handleAnswer}
              disabled={answered}
            />
          ))}
        </div>
      </div>

      {/* Explanation */}
      {answered && (
        <div ref={explanationRef}>
          <ExplanationPanel
            isCorrect={selected === question.answer}
            explanation={question.explanation}
            xpGained={xpGained}
            questionId={`${passage.id}-${question.id}`}
            onNext={onNext}
          />
        </div>
      )}
    </div>
  )
}
