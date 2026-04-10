'use client'

import Link from 'next/link'
import { useReadiness } from '@/hooks/useReadiness'
import ProgressRing from '@/components/ui/ProgressRing'

export default function ReadinessPage() {
  const { score, tier } = useReadiness()

  const components = [
    {
      label: 'Mastery',
      weight: '50%',
      colour: '#3381ff',
      description: 'How well you know the questions you have attempted. Questions are scored from Unseen → Attempted → Familiar → Learned → Mastered. The more questions you master, the higher this climbs.',
    },
    {
      label: 'Coverage',
      weight: '30%',
      colour: '#a855f7',
      description: 'How many of the 570 questions you have attempted at least once. Full coverage is benchmarked at 200 questions — a strong sample across all chapters.',
    },
    {
      label: 'Streak',
      weight: '20%',
      colour: '#ff4d6d',
      description: 'How consistently you are practising. A 7-day streak gives you the full 20% from this component. Daily practice keeps your knowledge fresh.',
    },
  ]

  const tiers = [
    { range: '80–100%', label: 'Ready to book!',       colour: '#22d07a', emoji: '🎓', description: 'Strong mastery, good coverage, consistent practice. Book your test.' },
    { range: '60–79%',  label: 'Almost ready',         colour: '#3381ff', emoji: '📚', description: 'Good foundation. Keep practising your weak areas.' },
    { range: '50–59%',  label: 'Making good progress', colour: '#f59e0b', emoji: '⚡', description: 'Halfway there. Focus on chapters with low mastery.' },
    { range: '25–49%',  label: 'Keep practising',      colour: '#a855f7', emoji: '💪', description: 'More work needed. Aim for daily sessions.' },
    { range: '0–24%',   label: 'Just getting started', colour: '#ff4d6d', emoji: '🌱', description: 'Early days — work through each chapter in order.' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <Link href="/progress" className="px-2 py-1 hover:text-ink rounded transition-colors">Progress</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">Readiness</span>
      </nav>

      <div>
        <h1 className="text-2xl font-display font-bold text-ink mb-1">Your Readiness Score</h1>
        <p className="text-ink-muted text-sm">A single number that tells you how prepared you are for the real test.</p>
      </div>

      {/* Current score */}
      <div className="bg-card rounded-2xl p-5 flex items-center gap-5">
        <ProgressRing value={score} size={90} strokeWidth={8} colour={tier.colour} ariaLabel={`Readiness score: ${score}%`}>
          <span className="font-display font-bold text-xl" style={{ color: tier.colour }}>{score}%</span>
        </ProgressRing>
        <div>
          <p className="text-xs text-ink-muted uppercase tracking-wide mb-1">Your score right now</p>
          <p className="font-display font-bold text-xl text-ink">{tier.label} {tier.emoji}</p>
          <p className="text-xs text-ink-muted">Practise daily to move this up</p>
        </div>
      </div>

      {/* How it's calculated */}
      <div className="bg-card rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-ink">How it&apos;s calculated</h2>
        <p className="text-sm text-ink-muted">Your readiness score is made up of three components:</p>
        <div className="space-y-4">
          {components.map(({ label, weight, colour, description }) => (
            <div key={label} className="flex gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: `${colour}22`, color: colour }}
              >
                {weight}
              </div>
              <div>
                <p className="font-semibold text-ink text-sm">{label} <span className="text-ink-muted font-normal">· {weight} of score</span></p>
                <p className="text-sm text-ink-muted mt-0.5">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score tiers */}
      <div className="bg-card rounded-2xl p-5 space-y-3">
        <h2 className="font-semibold text-ink">Score tiers</h2>
        <div className="space-y-3">
          {tiers.map(({ range, label, colour, emoji, description }) => (
            <div key={range} className="flex gap-3 items-start">
              <div
                className="w-16 text-center text-xs font-mono font-bold py-1 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${colour}22`, color: colour }}
              >
                {range}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{emoji} {label}</p>
                <p className="text-xs text-ink-muted">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3">
        <Link
          href="/practice"
          className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Practise now →
        </Link>
        <Link
          href="/progress"
          className="flex-1 py-3 bg-card border border-border font-semibold text-ink hover:bg-raised rounded-xl text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Full progress
        </Link>
      </div>
    </div>
  )
}
