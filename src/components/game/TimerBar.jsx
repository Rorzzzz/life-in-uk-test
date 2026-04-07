'use client'

import { motion } from 'framer-motion'

export default function TimerBar({ secondsRemaining, totalSeconds }) {
  const pct = Math.max((secondsRemaining / totalSeconds) * 100, 0)
  const minutes = Math.floor(secondsRemaining / 60)
  const secs = secondsRemaining % 60
  const timeString = `${minutes}:${String(secs).padStart(2, '0')}`

  const colour = pct > 50 ? '#22d07a' : pct > 20 ? '#f59e0b' : '#ff4d6d'

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-ink-muted">Time remaining</span>
        <span className="text-sm font-mono font-bold" style={{ color: colour }} aria-hidden="true">
          {timeString}
        </span>
      </div>
      <div
        role="timer"
        aria-label={`Time remaining: ${timeString}`}
        aria-live="off"
        className="w-full h-2 bg-border rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: colour }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      {/* Announce urgent warnings to screen readers */}
      {secondsRemaining === 300 && (
        <p className="sr-only" aria-live="polite">5 minutes remaining</p>
      )}
      {secondsRemaining === 60 && (
        <p className="sr-only" aria-live="assertive">1 minute remaining</p>
      )}
    </div>
  )
}
