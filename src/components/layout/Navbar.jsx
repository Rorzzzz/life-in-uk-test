'use client'

import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import { useStreak } from '@/hooks/useStreak'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/ui/ThemeToggle'
import ProgressBar from '@/components/ui/ProgressBar'

export default function Navbar() {
  const { xp, level, levelPct } = useProgress()
  const { streak } = useStreak()
  const pathname = usePathname()

  return (
    <header className="hidden md:block fixed top-0 inset-x-0 z-30 bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-auto">
          <span className="text-xl font-display font-bold text-ink">
            Pass<span className="text-brand-500">TheUKTest</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav aria-label="Main navigation" className="flex items-center gap-1 text-sm">
          {[
            { href: '/',          label: 'Home' },
            { href: '/practice',  label: 'Practice' },
            { href: '/study',     label: 'Study' },
            { href: '/exam',      label: 'Mock Exam' },
            { href: '/articles',  label: 'Articles' },
            { href: '/progress',  label: 'Progress' },
          ].map(({ href, label }) => {
            const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className="px-3 py-2 rounded-lg text-ink-muted hover:text-ink hover:bg-raised transition-colors font-medium"
              >
                {label}
              </Link>
            )
          })}
        </nav>

        {/* XP + Streak + Level */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="flex flex-col items-end w-24">
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs text-ink-muted font-mono">Lv{level.level}</span>
              <span className="text-xs text-xp font-mono font-medium" aria-label={`${xp.toLocaleString()} XP`}>⚡{xp.toLocaleString()}</span>
            </div>
            <ProgressBar value={levelPct} animated={false} height={4} ariaLabel={`Level ${level.level} progress`} />
          </div>
          <span className="text-sm font-mono font-medium text-white flex items-center gap-1" aria-label={`${streak} day streak`}>
            {streak > 3 ? '🔥' : '○'}{streak}
          </span>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
