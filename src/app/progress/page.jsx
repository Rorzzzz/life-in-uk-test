'use client'

import { useProgress } from '@/hooks/useProgress'
import { useStreak } from '@/hooks/useStreak'
import { useReadiness } from '@/hooks/useReadiness'
import { useBadges } from '@/hooks/useBadges'
import { CHAPTERS } from '@/data/questions'
import ProgressBar from '@/components/ui/ProgressBar'
import ProgressRing from '@/components/ui/ProgressRing'
import Link from 'next/link'

const STAT_LINKS = [
  { key: 'answered', label: 'Questions Answered', icon: '📝', href: '/mastery'   },
  { key: 'correct',  label: 'Correct Answers',    icon: '✅', href: '/mastery'   },
  { key: 'accuracy', label: 'Accuracy',           icon: '🎯', href: '/readiness' },
  { key: 'streak',   label: 'Current Streak',     icon: '🔥', href: '/readiness' },
]

export default function ProgressPage() {
  const { xp, level, levelPct, xpToNext, totalAnswered, totalCorrect, accuracy, chapterMastery, unlockedBadges } = useProgress()
  const { streak, questionsToday, streakThreshold } = useStreak()
  const { score: readiness, tier } = useReadiness()
  const { unlockedBadges: badges, lockedBadges, totalBadges } = useBadges()

  const statValues = {
    answered: totalAnswered,
    correct:  totalCorrect,
    accuracy: `${accuracy}%`,
    streak:   `${streak} days`,
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      <h1 className="text-2xl font-display font-bold text-ink">Your Progress</h1>

      {/* Readiness */}
      <Link href="/readiness" className="bg-card rounded-2xl p-5 flex items-center gap-5 hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 block">
        <ProgressRing value={readiness} size={90} strokeWidth={8} colour={tier.colour} ariaLabel={`Readiness score: ${readiness}%`}>
          <span className="font-display font-bold text-xl" style={{ color: tier.colour }}>{readiness}%</span>
        </ProgressRing>
        <div className="flex-1">
          <p className="text-xs text-ink-muted uppercase tracking-wide mb-1">Readiness Score →</p>
          <p className="font-display font-bold text-xl text-ink">{tier.label} {tier.emoji}</p>
          <p className="text-xs text-ink-muted">Based on mastery, coverage & streak</p>
        </div>
      </Link>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {STAT_LINKS.map(({ key, label, icon, href }) => (
          <Link key={key} href={href} className="bg-card rounded-2xl p-4 hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
            <p className="text-2xl mb-1">{icon}</p>
            <p className="font-mono font-bold text-xl text-ink">{statValues[key]}</p>
            <p className="text-xs text-ink-muted">{label} →</p>
          </Link>
        ))}
      </div>

      {/* Level */}
      <Link href="/xp" className="bg-card rounded-2xl p-5 block hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-display font-bold text-ink">Level {level.level} →</p>
            <p className="text-sm text-ink-muted">{level.title}</p>
          </div>
          <div className="text-right">
            <p className="font-mono font-bold text-xp text-lg">⚡{xp.toLocaleString()}</p>
            {xpToNext && <p className="text-xs text-ink-muted">{xpToNext} to next</p>}
          </div>
        </div>
        <ProgressBar value={levelPct} colour="#f59e0b" height={8} ariaLabel={`Level ${level.level} progress`} />
      </Link>

      {/* Chapter mastery */}
      <div className="bg-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <Link href="/mastery" className="font-semibold text-ink hover:text-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
            Chapter Mastery →
          </Link>
        </div>
        <div className="space-y-4">
          {CHAPTERS.map(ch => {
            const mastery = chapterMastery(ch.id)
            return (
              <div key={ch.id}>
                <div className="flex items-center justify-between mb-1">
                  <Link href={`/practice/${ch.id}`} className="text-base font-medium text-ink hover:text-brand-400 active:opacity-70 transition-colors py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
                    {ch.title}
                  </Link>
                  <span className="text-xs font-mono text-ink-muted">{mastery}%</span>
                </div>
                <ProgressBar value={mastery} colour={ch.colour} height={6} animated={false} ariaLabel={`${ch.title} mastery: ${mastery}%`} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Badges */}
      <div className="bg-card rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <Link href="/badges" className="font-semibold text-ink hover:text-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
            Badges →
          </Link>
          <span className="text-xs text-ink-muted">{badges.length}/{totalBadges}</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {badges.map(b => (
            <Link key={b.id} href="/badges" className="flex flex-col items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl" title={b.name}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl hover:opacity-80 transition-opacity"
                style={{ backgroundColor: `${b.colour}22` }}>
                {b.icon}
              </div>
              <p className="text-[9px] text-ink-muted text-center leading-tight">{b.name}</p>
            </Link>
          ))}
          {lockedBadges.map(b => (
            <Link key={b.id} href="/badges" className="flex flex-col items-center gap-1 opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-xl" title={`Locked: ${b.description}`}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-border">
                🔒
              </div>
              <p className="text-[9px] text-ink-muted text-center leading-tight">{b.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
