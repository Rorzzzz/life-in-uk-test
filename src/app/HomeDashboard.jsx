'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Layers, ClipboardList, TrendingUp, Zap, Star, ChevronRight } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { useStreak } from '@/hooks/useStreak'
import { useReadiness } from '@/hooks/useReadiness'
import ProgressRing from '@/components/ui/ProgressRing'
import ProgressBar from '@/components/ui/ProgressBar'
import BadgeUnlock from '@/components/game/BadgeUnlock'

const QUICK_LINKS = [
  { href: '/practice',   label: 'Practice',   icon: Layers,        colour: '#3381ff', desc: 'Adaptive questions', subDesc: 'Questions adapt to your performance every session' },
  { href: '/exam',       label: 'Mock Exam',  icon: ClipboardList, colour: '#22d07a', desc: '24 Qs · 45 mins'    },
  { href: '/study',      label: 'Study Guide',icon: BookOpen,      colour: '#a855f7', desc: 'All 5 chapters'     },
  { href: '/flashcards', label: 'Flashcards', icon: Star,          colour: '#f59e0b', desc: 'Flip to revise'     },
]

export default function HomeDashboard({ chapters }) {
  const { xp, level, levelPct, xpToNext, streak, totalAnswered, accuracy } = useProgress()
  const { questionsToday, streakThreshold } = useStreak()
  const { score: readiness, tier } = useReadiness()

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <BadgeUnlock />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-ink">
            Free Life in the UK Test Practice <span className="text-brand-500">2026</span>
          </h1>
          <p className="text-base text-ink-muted">Pass first time — 570 questions, mock exams, adaptive learning</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-ink-muted">Readiness</p>
          <p className="text-2xl font-display font-bold" style={{ color: tier.colour }}>
            {readiness}%
          </p>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        {QUICK_LINKS.map(({ href, label, icon: Icon, colour, desc, subDesc }) => (
          <Link key={href} href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
            <motion.div
              className="bg-card rounded-2xl p-4 flex flex-col gap-2 h-full"
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colour}22` }}>
                <Icon size={20} style={{ color: colour }} />
              </div>
              <p className="font-semibold text-ink text-base">{label}</p>
              <p className="text-sm text-ink-muted">{desc}</p>
              {subDesc && <p className="text-[11px] text-ink-muted/70 leading-tight">{subDesc}</p>}
            </motion.div>
          </Link>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'XP',        value: xp.toLocaleString(),  colour: '#f59e0b', icon: '⚡' },
          { label: 'Streak',    value: `${streak}d`,          colour: '#ff4d6d', icon: streak > 3 ? '🔥' : '○' },
          { label: 'Accuracy',  value: `${accuracy}%`,        colour: '#22d07a', icon: '🎯' },
        ].map(({ label, value, colour, icon }) => (
          <div key={label} className="bg-card rounded-2xl p-4 text-center">
            <p className="text-xl mb-0.5">{icon}</p>
            <p className="font-mono font-bold text-lg" style={{ color: colour }}>{value}</p>
            <p className="text-[10px] text-ink-muted uppercase tracking-wide">{label}</p>
          </div>
        ))}
      </div>

      {/* Level progress */}
      <div className="bg-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-ink">Level {level.level} — {level.title}</span>
          {xpToNext && (
            <span className="text-xs text-ink-muted font-mono">{xpToNext} XP to Lv{level.level + 1}</span>
          )}
        </div>
        <ProgressBar value={levelPct} animated colour="#3381ff" height={8} ariaLabel={`Level ${level.level} progress`} />
      </div>

      {/* Today's goal */}
      <div className="bg-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-ink">Today&apos;s goal</span>
          <span className="text-xs text-ink-muted font-mono">{Math.min(questionsToday, streakThreshold)}/{streakThreshold} questions</span>
        </div>
        <ProgressBar
          value={Math.min((questionsToday / streakThreshold) * 100, 100)}
          colour={questionsToday >= streakThreshold ? '#22d07a' : '#f59e0b'}
          height={8}
          animated={false}
          ariaLabel={`Daily goal: ${questionsToday} of ${streakThreshold} questions`}
        />
        {questionsToday >= streakThreshold
          ? <p className="text-xs text-success mt-1">🎉 Streak safe for today!</p>
          : <p className="text-xs text-ink-muted mt-1">Answer {streakThreshold - questionsToday} more to secure your streak</p>
        }
      </div>

      {/* Chapter progress */}
      <div className="bg-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-ink">Chapters</h2>
          <Link href="/practice" className="px-3 py-2 text-xs text-brand-400 font-medium hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">Practice all →</Link>
        </div>
        <div className="space-y-3">
          {chapters.map(ch => (
            <Link
              key={ch.id}
              href={`/practice/${ch.id}`}
              className="flex items-center gap-3 group min-h-[44px] active:opacity-70 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                style={{ backgroundColor: `${ch.colour}22`, color: ch.colour }}>
                {ch.id}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-base font-medium text-ink truncate group-hover:text-brand-400 transition-colors">
                  {ch.title}
                </p>
              </div>
              <ChevronRight size={14} className="text-ink-muted flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* Popular guides */}
      <div className="mb-4">
        <p className="text-xs text-ink-muted font-medium uppercase tracking-wide mb-2">Popular guides</p>
        <div className="space-y-1.5">
          {[
            { href: '/articles/what-is-the-life-in-the-uk-test',            label: 'What is the Life in the UK test?' },
            { href: '/articles/how-to-pass-the-life-in-the-uk-test-first-time', label: 'How to pass first time' },
            { href: '/articles/how-much-does-the-life-in-the-uk-test-cost', label: 'How much does the test cost?' },
            { href: '/articles/how-to-book-the-life-in-the-uk-test',        label: 'How to book the test' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-ink hover:bg-raised transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              <span>{label}</span>
              <ChevronRight size={14} className="text-ink-muted flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>

      {/* SEO text links */}
      <div className="flex flex-wrap justify-center gap-1 pb-2">
        {[
          { href: '/faq',               label: 'FAQ' },
          { href: '/cheat-sheet',       label: 'Cheat Sheet' },
          { href: '/test-centres',      label: 'Test Centres' },
          { href: '/how-to-pass',       label: 'How to Pass' },
          { href: '/exam-format',       label: 'Exam Format' },
          { href: '/pass-rate',         label: 'Pass Rates' },
          { href: '/hardest-questions', label: 'Hardest Questions' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="px-3 py-2 text-xs text-brand-400 hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}
