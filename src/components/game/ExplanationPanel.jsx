'use client'

import { motion } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ExplanationPanel({ isCorrect, explanation, xpGained, questionId, onNext }) {
  return (
    <motion.div
      className={`rounded-2xl p-5 border-2 ${isCorrect ? 'border-success/30 bg-success/5' : 'border-danger/30 bg-danger/5'}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
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
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex gap-1">
          {[
            { href: '/cheat-sheet', label: 'Cheat Sheet' },
            { href: '/faq',         label: 'FAQ' },
            { href: `/questions/${questionId}`, label: 'View page' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 text-xs text-brand-400 hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {label}
            </Link>
          ))}
        </div>
        {onNext && (
          <button
            onClick={onNext}
            className="flex items-center gap-2 px-5 py-3 text-base font-semibold bg-brand-500 text-white hover:bg-brand-600 active:opacity-70 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            Next <ChevronRight size={18} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
