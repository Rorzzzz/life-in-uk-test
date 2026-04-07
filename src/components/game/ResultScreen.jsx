'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import ProgressRing from '@/components/ui/ProgressRing'
import dynamic from 'next/dynamic'

const ConfettiBlast = dynamic(() => import('./ConfettiBlast'), { ssr: false })

export default function ResultScreen({ score, total, xpEarned, onRetry, onHome, onDifferentTest, isExam = false, footer }) {
  const pct     = Math.round((score / total) * 100)
  const passed  = !isExam || score >= 18
  const colour  = passed ? '#22d07a' : '#ff4d6d'

  return (
    <motion.div
      className="flex flex-col items-center text-center gap-6 py-8"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <ConfettiBlast trigger={passed} />

      <ProgressRing value={pct} size={120} strokeWidth={10} colour={colour} ariaLabel={`Score: ${score} out of ${total} (${pct}%)`}>
        <span className="font-display font-bold text-2xl" style={{ color: colour }}>
          {score}/{total}
        </span>
      </ProgressRing>

      <div>
        <h2 className="text-3xl font-display font-bold text-ink mb-1">
          {passed ? (isExam ? '🎉 You passed!' : 'Well done!') : 'Keep going!'}
        </h2>
        <p className="text-ink-muted">
          {passed
            ? `${pct}% — ${isExam ? 'That\'s a pass! Book your real test.' : 'Great work!'}`
            : `${pct}% — ${isExam ? `Pass mark is 75% (18/24)` : 'Keep practising!'}`
          }
        </p>
      </div>

      {xpEarned > 0 && (
        <div className="flex items-center gap-2 bg-xp/10 border border-xp/30 rounded-xl px-4 py-2">
          <span className="text-xp font-mono font-bold text-lg">+{xpEarned} XP</span>
          <span className="text-ink-muted text-sm">earned</span>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {onRetry && (
          <Button variant="primary" fullWidth onClick={onRetry}>
            Try Again
          </Button>
        )}
        {onDifferentTest && (
          <Button variant="secondary" fullWidth onClick={onDifferentTest}>
            Try a Different Mock Test
          </Button>
        )}
        <Button variant="secondary" fullWidth onClick={onHome}>
          Back to Home
        </Button>
        {isExam && (
          <div className="flex gap-2 justify-center mt-2">
            <Link href="/cheat-sheet" className="px-4 py-2 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              Cheat Sheet
            </Link>
            <Link href="/faq" className="px-4 py-2 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              FAQ
            </Link>
          </div>
        )}
      </div>
      {footer && <div className="w-full">{footer}</div>}
    </motion.div>
  )
}
