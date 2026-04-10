'use client'

import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import { LEVELS } from '@/data/levels'
import ProgressBar from '@/components/ui/ProgressBar'

export default function XPPage() {
  const { xp, level, levelPct, xpToNext } = useProgress()

  const xpSources = [
    { action: 'Correct answer — first attempt',  xp: '+10 XP', colour: '#22d07a' },
    { action: 'Correct answer — after a wrong',  xp: '+5 XP',  colour: '#f59e0b' },
    { action: 'Complete a chapter session',       xp: '+25 XP', colour: '#3381ff' },
    { action: 'Pass a mock exam',                 xp: '+100 XP',colour: '#a855f7' },
    { action: 'Perfect mock exam (24/24)',         xp: '+200 XP',colour: '#f59e0b' },
    { action: 'Wrong answer',                     xp: '0 XP',   colour: '#ff4d6d' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <Link href="/progress" className="px-2 py-1 hover:text-ink rounded transition-colors">Progress</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">XP & Levels</span>
      </nav>

      <div>
        <h1 className="text-2xl font-display font-bold text-ink mb-1">XP & Levels</h1>
        <p className="text-ink-muted text-sm">Earn XP every time you answer correctly. Level up as you go.</p>
      </div>

      {/* Current level */}
      <div className="bg-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs text-ink-muted uppercase tracking-wide mb-0.5">Your level</p>
            <p className="font-display font-bold text-xl text-ink">Level {level.level} — {level.title}</p>
          </div>
          <p className="font-mono font-bold text-xp text-2xl">⚡{xp.toLocaleString()}</p>
        </div>
        <ProgressBar value={levelPct} colour="#f59e0b" height={8} ariaLabel="Level progress" />
        {xpToNext && <p className="text-xs text-ink-muted mt-1">{xpToNext} XP to Level {level.level + 1}</p>}
      </div>

      {/* How to earn XP */}
      <div className="bg-card rounded-2xl p-5 space-y-3">
        <h2 className="font-semibold text-ink">How to earn XP</h2>
        <div className="space-y-2">
          {xpSources.map(({ action, xp: amount, colour }) => (
            <div key={action} className="flex items-center justify-between gap-3">
              <p className="text-sm text-ink-muted">{action}</p>
              <span className="font-mono font-bold text-sm flex-shrink-0" style={{ color: colour }}>{amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* All levels */}
      <div className="bg-card rounded-2xl p-5 space-y-3">
        <h2 className="font-semibold text-ink">All 20 levels</h2>
        <div className="space-y-2">
          {LEVELS.map(lvl => (
            <div
              key={lvl.level}
              className={`flex items-center justify-between gap-3 py-1.5 px-3 rounded-xl ${lvl.level === level.level ? 'bg-brand-500/10 border border-brand-500/30' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-ink-muted w-6">{lvl.level}</span>
                <span className={`text-sm font-medium ${lvl.level === level.level ? 'text-brand-400' : 'text-ink'}`}>
                  {lvl.title} {lvl.level === level.level ? '← you' : ''}
                </span>
              </div>
              <span className="text-xs font-mono text-ink-muted">{lvl.xpRequired.toLocaleString()} XP</span>
            </div>
          ))}
        </div>
      </div>

      <Link href="/progress" className="block text-center py-3 bg-card border border-border font-semibold text-ink hover:bg-raised rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
        ← Back to progress
      </Link>
    </div>
  )
}
