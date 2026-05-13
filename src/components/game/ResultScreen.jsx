'use client'

import Link from 'next/link'
import { Target } from 'lucide-react'
import Button from '@/components/ui/Button'
import ProgressRing from '@/components/ui/ProgressRing'
import dynamic from 'next/dynamic'

const ConfettiBlast = dynamic(() => import('./ConfettiBlast'), { ssr: false })

export default function ResultScreen({ score, total, xpEarned, onRetry, onHome, onDifferentTest, onChangeChapter, weakChapters = [], isExam = false, footer, wrongQuestions = [] }) {
  const pct     = Math.round((score / total) * 100)
  const passed  = isExam ? score >= 18 : pct >= 70
  const colour  = passed ? '#22d07a' : '#ff4d6d'

  return (
    <div className="flex flex-col items-center text-center gap-6 py-8 animate-fade-in">
      <ConfettiBlast trigger={passed} />

      <ProgressRing value={pct} size={120} strokeWidth={10} colour={colour} ariaLabel={`Score: ${score} out of ${total} (${pct}%)`}>
        <span className="font-display font-bold text-2xl" style={{ color: colour }}>
          {score}/{total}
        </span>
      </ProgressRing>

      <div>
        <h2 className="text-3xl font-display font-bold text-ink mb-1">
          {isExam
            ? (passed ? '🎉 You passed!' : 'Keep going!')
            : (pct >= 80 ? 'Well done!' : pct >= 50 ? 'Good effort!' : 'Keep practising!')}
        </h2>
        <p className="text-ink-muted">
          {isExam
            ? (passed ? `${pct}% — That's a pass! Book your real test.` : `${pct}% — Pass mark is 75% (18/24)`)
            : (passed ? `${pct}% — Great session!` : `${pct}% — Keep going, you'll get there!`)
          }
        </p>
      </div>

      {xpEarned > 0 && (
        <div className="flex items-center gap-2 bg-xp/10 border border-xp/30 rounded-xl px-4 py-2">
          <span className="text-xp font-mono font-bold text-lg">+{xpEarned} XP</span>
          <span className="text-ink-muted text-sm">earned</span>
        </div>
      )}

      {isExam && weakChapters.length > 0 && (
        <div className="w-full max-w-xs bg-card border border-border rounded-2xl p-4 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Target size={14} className="text-danger" />
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Weak spots — practise these</span>
          </div>
          <div className="space-y-2">
            {weakChapters.map(ch => (
              <Link
                key={ch.id}
                href={`/practice/${ch.id}`}
                className="flex items-center justify-between px-3 py-2 rounded-xl border transition-colors hover:opacity-80"
                style={{ borderColor: `${ch.colour}44`, backgroundColor: `${ch.colour}11` }}
              >
                <span className="text-sm font-medium text-ink">{ch.title}</span>
                <span className="text-xs font-mono font-bold" style={{ color: ch.colour }}>
                  {ch.wrong} wrong →
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 w-full max-w-xs">
        {onRetry && (
          <Button variant="primary" fullWidth onClick={onRetry}>
            {isExam ? 'Try Again' : 'New adaptive session'}
          </Button>
        )}
        {onChangeChapter && (
          <Button variant="secondary" fullWidth onClick={onChangeChapter}>
            Change chapter
          </Button>
        )}
        {onDifferentTest && (
          <Button variant="secondary" fullWidth onClick={onDifferentTest}>
            Try a Different Mock Test
          </Button>
        )}
        <Button variant="secondary" fullWidth onClick={onHome}>
          Back to Home
        </Button>
        {isExam && (
          <div className="flex gap-2 justify-center mt-2">
            <Link href="/cheat-sheet" className="px-4 py-2 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              Cheat Sheet
            </Link>
            <Link href="/faq" className="px-4 py-2 text-sm text-brand-400 hover:text-brand-300 active:opacity-70 rounded-lg hover:bg-brand-500/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500">
              FAQ
            </Link>
          </div>
        )}
      </div>

      {wrongQuestions.length > 0 && (
        <div className="w-full">
          <div className="bg-card rounded-2xl p-4 border border-border">
            <p className="font-semibold text-ink mb-0.5">Questions you got wrong ({wrongQuestions.length})</p>
            <p className="text-xs text-ink-muted mb-4">Review these before your next attempt</p>
            <div className="space-y-3 text-left">
              {wrongQuestions.map((q, i) => (
                <div key={q.id} className="bg-raised rounded-xl p-4 border border-border">
                  <p className="text-xs text-ink-muted font-mono mb-1.5">Question {i + 1}</p>
                  <p className="font-semibold text-ink text-sm mb-3">{q.q}</p>
                  <div className="bg-danger/10 border border-danger/20 rounded-xl px-3 py-2 mb-2">
                    <p className="text-xs text-danger font-semibold mb-0.5">✗ Your answer</p>
                    <p className="text-sm text-ink">{q.options[q.selectedIndex]}</p>
                  </div>
                  <div className="bg-success/10 border border-success/20 rounded-xl px-3 py-2 mb-3">
                    <p className="text-xs text-success font-semibold mb-0.5">✓ Correct answer</p>
                    <p className="text-sm text-ink">{q.options[q.answer]}</p>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">{q.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {footer && <div className="w-full">{footer}</div>}
    </div>
  )
}
