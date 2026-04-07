'use client'

import { useProgress } from '@/hooks/useProgress'

export default function XPBadge({ className = '' }) {
  const { xp } = useProgress()
  return (
    <span className={`inline-flex items-center gap-1 font-mono text-sm font-medium text-xp ${className}`}>
      <span className="text-base">⚡</span>
      {xp.toLocaleString()} XP
    </span>
  )
}
