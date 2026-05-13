'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, Layers, ClipboardList, TrendingUp, Home, Sun, Moon } from 'lucide-react'
import clsx from 'clsx'
import { useTheme } from '@/context/ThemeContext'

const NAV_ITEMS = [
  { href: '/',          label: 'Home',     icon: Home          },
  { href: '/practice',  label: 'Practice', icon: Layers        },
  { href: '/study',     label: 'Study',    icon: BookOpen      },
  { href: '/mock-test', label: 'Exam',     icon: ClipboardList },
  { href: '/progress',  label: 'Progress', icon: TrendingUp    },
]

export default function BottomNav() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav aria-label="Mobile navigation" className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-surface/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-stretch h-16">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={clsx(
                'flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors min-w-0',
                'active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset',
                active ? 'text-brand-500' : 'text-ink-muted'
              )}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 1.75} />
              <span>{label}</span>
            </Link>
          )
        })}
        <button
          onClick={toggleTheme}
          className="flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-ink-muted transition-colors min-w-0 active:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark'
            ? <Sun size={20} className="text-xp" />
            : <Moon size={20} className="text-brand-400" />
          }
          <span>Theme</span>
        </button>
      </div>
    </nav>
  )
}
