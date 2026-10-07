'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'passtheuktest_v1'
const MASTERY_LABELS = ['New', 'Attempted', 'Familiar', 'Learned', 'Mastered']
const MASTERY_STYLES = [
  '',
  'bg-xp/10 text-xp',
  'bg-brand-500/10 text-brand-400',
  'bg-purple-500/10 text-purple-400',
  'bg-success/10 text-success',
]

export default function QuestionStatsBadge({ questionId }) {
  const [stats, setStats] = useState(undefined)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) { setStats(null); return }
      const state = JSON.parse(raw)
      setStats(state.progress?.[questionId] ?? null)
    } catch {
      setStats(null)
    }
  }, [questionId])

  // undefined = loading (server-render gap), null = no data
  if (stats === undefined) return null
  if (!stats || stats.totalAnswered === 0) {
    return (
      <span className="text-xs px-2 py-0.5 rounded-full bg-border text-ink-muted flex-shrink-0">
        New
      </span>
    )
  }

  const mastery = stats.mastery ?? 0
  const isWeak = stats.totalAnswered > 0 && stats.totalCorrect / stats.totalAnswered < 0.6

  return (
    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
      <span className={`text-xs font-mono ${isWeak ? 'text-danger' : 'text-success'}`}>
        {isWeak ? '✗' : '✓'} {stats.totalCorrect}/{stats.totalAnswered}
      </span>
      <span className={`text-xs px-1.5 py-0.5 rounded-full ${MASTERY_STYLES[mastery] || MASTERY_STYLES[1]}`}>
        {MASTERY_LABELS[mastery]}
      </span>
    </div>
  )
}
