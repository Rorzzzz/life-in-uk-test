'use client'

import Link from 'next/link'
import { BookOpen, Layers, ClipboardList, Star, ChevronRight, Target, Calculator, Languages, Plane, ShieldCheck, ClipboardCheck, CalendarDays, Scale, AlertTriangle, PoundSterling } from 'lucide-react'
import { useProgress } from '@/hooks/useProgress'
import { useStreak } from '@/hooks/useStreak'
import { useReadiness } from '@/hooks/useReadiness'
import { useWeakSpots } from '@/hooks/useWeakSpots'
import ProgressBar from '@/components/ui/ProgressBar'
import BadgeUnlock from '@/components/game/BadgeUnlock'
import LiteYouTube from '@/components/ui/LiteYouTube'

const QUICK_LINKS = [
  { href: '/practice',   label: 'Practice',    icon: Layers,        colour: '#3381ff', desc: 'Adaptive questions', subDesc: 'Questions adapt to your performance every session' },
  { href: '/exam',       label: 'Mock Exam',   icon: ClipboardList, colour: '#22d07a', desc: '24 Qs · 45 mins',    subDesc: 'Full mock test conditions' },
  { href: '/study',      label: 'Study Guide', icon: BookOpen,      colour: '#a855f7', desc: 'All 5 chapters'      },
  { href: '/flashcards', label: 'Flashcards',  icon: Star,          colour: '#f59e0b', desc: 'Flip to revise'      },
]

const TOOL_LINKS = [
  { href: '/ilr-calculator',       label: 'ILR Calculator',      desc: 'Eligibility & costs',   colour: '#06b6d4', icon: Calculator    },
  { href: '/absence-calculator',   label: 'Absence Checker',     desc: '180-day rule',          colour: '#f59e0b', icon: Plane         },
  { href: '/test-exempt',          label: 'Exempt Checker',      desc: 'Do you need the test?', colour: '#22d07a', icon: ShieldCheck   },
  { href: '/ilr-checklist',        label: 'ILR Checklist',       desc: 'Documents needed',      colour: '#a855f7', icon: ClipboardCheck },
  { href: '/study-plan-generator', label: 'Study Planner',       desc: 'Personalised plan',     colour: '#3381ff', icon: CalendarDays  },
  { href: '/citizenship-planner',  label: 'Citizenship Planner', desc: 'Timeline & costs',      colour: '#f43f5e', icon: Star          },
  { href: '/b1-check',             label: 'B1 Level Check',      desc: 'English level quiz',    colour: '#8b5cf6', icon: Languages     },
  { href: '/good-character-check', label: 'Good Character',      desc: 'ILR & citizenship check', colour: '#10b981', icon: Scale         },
  { href: '/ilr-risk-check',       label: 'ILR Risk Check',      desc: 'Refusal risk assessment', colour: '#f97316', icon: AlertTriangle  },
  { href: '/true-cost-calculator', label: 'True Cost',           desc: 'Full journey to citizenship', colour: '#e11d48', icon: PoundSterling  },
]

export default function HomeDashboard({ chapters }) {
  const { xp, level, levelPct, xpToNext, streak, totalAnswered, accuracy } = useProgress()
  const { count: weakCount } = useWeakSpots()
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
        <Link href="/readiness" className="text-right group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1">
          <p className="text-xs text-ink-muted">Readiness</p>
          <p className="text-2xl font-display font-bold group-hover:opacity-80 transition-opacity" style={{ color: tier.colour }}>
            {readiness}%
          </p>
          <p className="text-[10px] text-ink-muted leading-tight mt-0.5">How prepared you are for the real test</p>
        </Link>
      </div>

      {/* Weak spots alert — only shown when user has questions to drill */}
      {weakCount > 0 && (
        <Link href="/weak-spots" className="block mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
          <div className="bg-card border border-border rounded-2xl p-4 flex items-center justify-between gap-3 active:scale-[0.98] transition-transform">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-danger/20">
                <Target size={20} className="text-danger" />
              </div>
              <div>
                <p className="font-semibold text-ink text-base">Weak Spots</p>
                <p className="text-sm text-ink-muted">{weakCount} question{weakCount !== 1 ? 's' : ''} to drill</p>
              </div>
            </div>
            <ChevronRight size={16} className="text-ink-muted flex-shrink-0" />
          </div>
        </Link>
      )}

      {/* Quick links */}
      {totalAnswered === 0 ? (
        <div className="space-y-3">
          {/* New user — Practice is the dominant CTA */}
          <Link href="/practice" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
            <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 flex items-center justify-between gap-4 active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-brand-500/20">
                  <Layers size={24} className="text-brand-400" />
                </div>
                <div>
                  <p className="font-display font-bold text-ink text-lg">Start Practising</p>
                  <p className="text-sm text-ink-muted">570 questions · adaptive · free</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-brand-400 flex-shrink-0" />
            </div>
          </Link>
          {/* Secondary options */}
          <div className="grid grid-cols-3 gap-3">
            {QUICK_LINKS.filter(l => l.href !== '/practice').map(({ href, label, icon: Icon, colour, desc }) => (
              <Link key={href} href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
                <div className="bg-card rounded-2xl p-3 flex flex-col gap-2 h-full active:scale-[0.98] transition-transform">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${colour}22` }}>
                    <Icon size={16} style={{ color: colour }} />
                  </div>
                  <p className="font-semibold text-ink text-sm">{label}</p>
                  <p className="text-xs text-ink-muted">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {QUICK_LINKS.map(({ href, label, icon: Icon, colour, desc, subDesc }) => (
            <Link key={href} href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
              <div className="bg-card rounded-2xl p-4 flex flex-col gap-2 h-full active:scale-[0.98] transition-transform">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colour}22` }}>
                  <Icon size={20} style={{ color: colour }} />
                </div>
                <p className="font-semibold text-ink text-base">{label}</p>
                <p className="text-sm text-ink-muted">{desc}</p>
                {subDesc && <p className="text-[11px] text-ink-muted/70 leading-tight">{subDesc}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'XP',        value: xp.toLocaleString(),  className: 'text-xp',      icon: '⚡' },
          { label: 'Streak',    value: `${streak}d`,          className: 'text-danger',  icon: streak > 3 ? '🔥' : '○' },
          { label: 'Accuracy',  value: `${accuracy}%`,        className: 'text-success', icon: '🎯' },
        ].map(({ label, value, className, icon }) => (
          <Link key={label} href="/progress" className="bg-card rounded-2xl p-4 text-center hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
            <p className="text-xl mb-0.5">{icon}</p>
            <p className={`font-mono font-bold text-lg ${className}`}>{value}</p>
            <p className="text-[10px] text-ink-muted uppercase tracking-wide">{label}</p>
          </Link>
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

      {/* Immigration tools */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wider">Free Tools</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {TOOL_LINKS.map(({ href, label, desc, colour, icon: Icon }) => (
            <Link key={href} href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl">
              <div className="bg-card rounded-2xl p-4 flex flex-col gap-2 h-full active:scale-[0.98] transition-transform">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${colour}22` }}>
                  <Icon size={18} style={{ color: colour }} />
                </div>
                <p className="font-semibold text-ink text-sm">{label}</p>
                <p className="text-xs text-ink-muted">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* YouTube section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wider">Watch & Learn</h2>
          <a
            href="https://www.youtube.com/@PasstheUKTest"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-brand-400 hover:text-brand-300 transition-colors font-medium"
          >
            Subscribe →
          </a>
        </div>
        <LiteYouTube
          videoId="4XKqOlGB3Bg"
          title="Free Life in the UK Test Practice 2026 + Mock Exams"
        />
        <p className="text-xs text-ink-muted mt-2 text-center">
          Free Life in the UK Test Practice 2026 + Mock Exams
        </p>
      </div>

      {/* Popular guides */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-ink-muted font-medium uppercase tracking-wide">Popular guides</p>
          <Link href="/articles" className="text-xs text-brand-400 hover:text-brand-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">View all →</Link>
        </div>
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
