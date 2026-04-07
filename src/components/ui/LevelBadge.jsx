'use client'

import { useProgress } from '@/hooks/useProgress'

export default function LevelBadge({ className = '' }) {
  const { level } = useProgress()
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-semibold text-brand-400 ${className}`}>
      <span className="font-mono font-bold">Lv{level.level}</span>
    </span>
  )
}
