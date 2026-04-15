'use client'

import { m } from 'framer-motion'
import clsx from 'clsx'

export default function AnswerButton({ option, index, state, onClick, disabled }) {
  // state: null | 'correct' | 'incorrect' | 'missed'
  const letters = ['A', 'B', 'C', 'D']

  const stateClasses = {
    correct:   'border-success bg-success/10 text-success',
    incorrect: 'border-danger bg-danger/10 text-danger',
    missed:    'border-success/50 bg-success/5 text-success/70',
    null:      'border-border bg-card text-ink hover:border-brand-500 hover:bg-brand-500/5',
  }

  return (
    <m.button
      onClick={() => !disabled && onClick(index)}
      disabled={disabled && !state}
      className={clsx(
        'w-full flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-150 font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        stateClasses[state ?? 'null'],
        !state && !disabled && 'active:scale-[0.99]'
      )}
      whileTap={!state && !disabled ? { scale: 0.99 } : {}}
    >
      <span className={clsx(
        'flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold font-mono',
        state === 'correct'   ? 'bg-success text-white' :
        state === 'incorrect' ? 'bg-danger text-white'  :
        state === 'missed'    ? 'bg-success/30 text-success' :
        'bg-raised text-ink-muted'
      )}>
        {letters[index]}
      </span>
      <span className="text-base leading-snug mt-0.5">
        {option}
        {state === 'correct'   && <span className="sr-only"> — correct answer</span>}
        {state === 'incorrect' && <span className="sr-only"> — incorrect</span>}
        {state === 'missed'    && <span className="sr-only"> — correct answer (not selected)</span>}
      </span>
    </m.button>
  )
}
