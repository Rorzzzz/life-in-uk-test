'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { QUESTIONS } from '@/data/questions'

const STORAGE_KEY = 'passtheuktest_v1'

export default function SmartExamCard() {
  const router = useRouter()
  const [stats, setStats] = useState({ unseen: 0, weak: 0, total: QUESTIONS.length })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const progress = JSON.parse(raw)?.progress ?? {}
      const unseen = QUESTIONS.filter(q => !progress[q.id] || progress[q.id].totalAnswered === 0).length
      const weak   = QUESTIONS.filter(q => {
        const p = progress[q.id]
        if (!p || p.totalAnswered === 0) return false
        return p.totalCorrect / p.totalAnswered < 0.6
      }).length
      setStats({ unseen, weak, total: QUESTIONS.length })
    } catch {}
  }, [])

  return (
    <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 mb-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-2xl">🧠</span>
        <div>
          <p className="font-bold text-ink mb-1">Smart Mock Exam</p>
          <p className="text-sm text-ink-muted leading-snug">
            Adapts to your gaps — prioritises your{' '}
            <span className="text-success font-medium">{stats.unseen} unseen</span>
            {stats.weak > 0 && (
              <> and <span className="text-danger font-medium">{stats.weak} weak</span> questions</>
            )}
            {stats.weak === 0 && <> questions</>}.
            Same 24-question format, same 45-minute timer.
          </p>
        </div>
      </div>
      <button
        onClick={() => router.push('/exam')}
        className="w-full py-3.5 bg-brand-500 hover:bg-brand-400 active:opacity-80 text-white text-sm font-bold rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        Start Smart Exam →
      </button>
    </div>
  )
}
