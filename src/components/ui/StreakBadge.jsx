'use client'

import { useStreak } from '@/hooks/useStreak'

export default function StreakBadge({ className = '' }) {
  const { streak } = useStreak()
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-sm font-medium text-white ${className}`}>
      <span className="text-base">🔥</span>
      {streak}
    </span>
  )
}
