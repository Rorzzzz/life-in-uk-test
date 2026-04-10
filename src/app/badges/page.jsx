'use client'

import Link from 'next/link'
import { useBadges } from '@/hooks/useBadges'
import { BADGES } from '@/data/badges'

const CATEGORIES = [
  { id: 'milestone', label: 'Milestones' },
  { id: 'streak',    label: 'Streaks'    },
  { id: 'chapter',   label: 'Chapters'   },
  { id: 'exam',      label: 'Exams'      },
  { id: 'accuracy',  label: 'Accuracy'   },
]

export default function BadgesPage() {
  const { unlockedBadges } = useBadges()
  const unlockedIds = new Set(unlockedBadges.map(b => b.id))

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <Link href="/progress" className="px-2 py-1 hover:text-ink rounded transition-colors">Progress</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">Badges</span>
      </nav>

      <div>
        <h1 className="text-2xl font-display font-bold text-ink mb-1">Badges</h1>
        <p className="text-ink-muted text-sm">{unlockedIds.size} of {BADGES.length} unlocked</p>
      </div>

      {CATEGORIES.map(cat => {
        const catBadges = BADGES.filter(b => b.category === cat.id)
        return (
          <div key={cat.id} className="bg-card rounded-2xl p-5 space-y-3">
            <h2 className="font-semibold text-ink">{cat.label}</h2>
            <div className="space-y-3">
              {catBadges.map(badge => {
                const unlocked = unlockedIds.has(badge.id)
                return (
                  <div
                    key={badge.id}
                    className={`flex items-center gap-4 p-3 rounded-xl ${unlocked ? '' : 'opacity-40'}`}
                    style={{ backgroundColor: unlocked ? `${badge.colour}11` : undefined }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ backgroundColor: `${badge.colour}22` }}
                    >
                      {unlocked ? badge.icon : '🔒'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-ink text-sm">{badge.name}</p>
                      <p className="text-xs text-ink-muted">{badge.description}</p>
                    </div>
                    {unlocked && (
                      <span className="text-xs font-medium text-success flex-shrink-0">Unlocked</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <Link href="/progress" className="block text-center py-3 bg-card border border-border font-semibold text-ink hover:bg-raised rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
        ← Back to progress
      </Link>
    </div>
  )
}
