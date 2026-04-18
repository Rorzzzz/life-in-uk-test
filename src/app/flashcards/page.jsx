'use client'

import { useState } from 'react'
import { QUESTIONS } from '@/data/questions'
import FlashCard from '@/components/game/FlashCard'
import { ChevronRight } from 'lucide-react'

export default function FlashcardsPage() {
  const [deck] = useState(() => [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 50))
  const [index, setIndex] = useState(0)

  const isLast = index === deck.length - 1

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-ink">Life in the UK Test Flashcards</h1>
        <span className="text-sm font-mono text-ink-muted">{index + 1}/{deck.length}</span>
      </div>

      <FlashCard key={index} question={deck[index]} />

      <div className="flex gap-1 justify-center mt-4" aria-hidden="true">
        {deck.slice(Math.max(0, index - 2), index + 3).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i + Math.max(0, index - 2) === index ? 'bg-brand-500' : 'bg-border'}`}
          />
        ))}
      </div>

      <button
        onClick={() => !isLast && setIndex(i => i + 1)}
        disabled={isLast}
        className="w-full mt-4 py-4 flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 active:opacity-70 disabled:opacity-40 text-white font-semibold rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      >
        {isLast ? 'All done!' : <>Next Card <ChevronRight size={18} /></>}
      </button>
    </div>
  )
}
