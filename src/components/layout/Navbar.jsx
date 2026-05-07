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
            { href: '/videos',    label: 'Videos' },
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

        {/* YouTube icon link */}
        <a
          href="https://www.youtube.com/@PasstheUKTest"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="PassTheUKTest on YouTube"
          className="p-2 rounded-lg text-ink-muted hover:text-red-500 hover:bg-raised transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
          </svg>
        </a>

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
