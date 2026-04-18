'use client'

import { CheckCircle, XCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ExplanationPanel({ isCorrect, explanation, xpGained, questionId, onNext }) {
  return (
    <div
      className={`rounded-2xl p-5 border-2 animate-slide-up ${isCorrect ? 'border-success/30 bg-success/5' : 'border-danger/30 bg-danger/5'}`}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Result */}
      <div className="flex items-center gap-2 mb-3">
        {isCorrect
          ? <CheckCircle size={20} className="text-success flex-shrink-0" />
          : <XCircle    size={20} className="text-danger flex-shrink-0" />
        }
        <span className={`font-bold ${isCorrect ? 'text-success' : 'text-danger'}`}>
          {isCorrect ? 'Correct!' : 'Not quite'}
        </span>
        {xpGained > 0 && (
          <span className="ml-auto text-xp font-mono font-semibold text-sm">+{xpGained} XP</span>
        )}
      </div>

      {/* Explanation */}
      <p className="text-base text-ink-muted leading-relaxed mb-4">{explanation}</p>

      {/* Links + Next */}
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/cheat-sheet"
          className="px-3 py-2 text-xs text-brand-400 hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Cheat Sheet
        </Link>
        {onNext && (
          <button
            onClick={onNext}
            className="flex items-center gap-1 px-5 py-2.5 text-base font-semibold text-white bg-brand-500 hover:bg-brand-600 active:opacity-70 rounded-lg border border-brand-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Next <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}
