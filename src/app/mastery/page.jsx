'use client'

import Link from 'next/link'
import { useProgress } from '@/hooks/useProgress'
import { CHAPTERS } from '@/data/questions'
import ProgressBar from '@/components/ui/ProgressBar'

export default function MasteryPage() {
  const { chapterMastery } = useProgress()

  const levels = [
    { name: 'Unseen',    colour: '#6b7280', description: 'You have never attempted this question.' },
    { name: 'Attempted', colour: '#ff4d6d', description: 'Answered at least once but not yet consistently correct.' },
    { name: 'Familiar',  colour: '#f59e0b', description: 'Getting there — right sometimes, wrong sometimes.' },
    { name: 'Learned',   colour: '#3381ff', description: 'Consistently correct. The algorithm is spacing out reviews.' },
    { name: 'Mastered',  colour: '#22d07a', description: 'Fully retained. You rarely see this question now.' },
  ]

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-ink-muted">
        <Link href="/" className="px-2 py-1 hover:text-ink rounded transition-colors">Home</Link>
        <span>/</span>
        <Link href="/progress" className="px-2 py-1 hover:text-ink rounded transition-colors">Progress</Link>
        <span>/</span>
        <span className="px-2 py-1 text-ink">Chapter Mastery</span>
      </nav>

      <div>
        <h1 className="text-2xl font-display font-bold text-ink mb-1">Chapter Mastery</h1>
        <p className="text-ink-muted text-sm">Every question has its own mastery level, tracked individually.</p>
      </div>

      {/* Your chapter mastery */}
      <div className="bg-card rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-ink">Your mastery by chapter</h2>
        <div className="space-y-4">
          {CHAPTERS.map(ch => {
            const mastery = chapterMastery(ch.id)
            return (
              <div key={ch.id}>
                <div className="flex items-center justify-between mb-1">
                  <Link href={`/practice/${ch.id}`} className="text-sm font-medium text-ink hover:text-brand-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded">
                    {ch.title}
                  </Link>
                  <span className="text-xs font-mono text-ink-muted">{mastery}%</span>
                </div>
                <ProgressBar value={mastery} colour={ch.colour} height={6} animated={false} ariaLabel={`${ch.title} mastery`} />
              </div>
            )
          })}
        </div>
      </div>

      {/* Mastery levels explained */}
      <div className="bg-card rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold text-ink">The 5 mastery levels</h2>
        <p className="text-sm text-ink-muted">Each question moves through these levels as you answer it correctly over time.</p>
        <div className="space-y-3">
          {levels.map(({ name, colour, description }) => (
            <div key={name} className="flex gap-3 items-start">
              <div
                className="w-20 text-center text-xs font-bold py-1 rounded-lg flex-shrink-0"
                style={{ backgroundColor: `${colour}22`, color: colour }}
              >
                {name}
              </div>
              <p className="text-sm text-ink-muted pt-0.5">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-card rounded-2xl p-5 space-y-2">
        <h2 className="font-semibold text-ink">How questions move up</h2>
        <p className="text-sm text-ink-muted leading-relaxed">
          The platform uses spaced repetition — the same method used by medical students. Answer a question correctly and it moves up a level. Answer incorrectly and it drops back. Questions at lower mastery levels appear in your sessions more often; mastered questions appear rarely.
        </p>
        <p className="text-sm text-ink-muted leading-relaxed">
          Your chapter mastery % is a weighted average across all questions in that chapter.
        </p>
      </div>

      <div className="flex gap-3">
        <Link href="/practice" className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          Practise now →
        </Link>
        <Link href="/progress" className="flex-1 py-3 bg-card border border-border font-semibold text-ink hover:bg-raised rounded-xl text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
          ← Back to progress
        </Link>
      </div>
    </div>
  )
}
