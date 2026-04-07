'use client'

import { useState } from 'react'
import { QUESTIONS } from '@/data/questions'
import FlashCard from '@/components/game/FlashCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DECK = [...QUESTIONS].sort(() => Math.random() - 0.5).slice(0, 50)

export default function FlashcardsPage() {
  const [index, setIndex] = useState(0)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold text-ink">Flashcards</h1>
        <span className="text-sm font-mono text-ink-muted">{index + 1}/{DECK.length}</span>
      </div>

      <FlashCard key={index} question={DECK[index]} />

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          disabled={index === 0}
          aria-label="Previous card"
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-card disabled:opacity-30 hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-1" aria-hidden="true">
          {DECK.slice(Math.max(0, index - 2), index + 3).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i + Math.max(0, index - 2) === index ? 'bg-brand-500' : 'bg-border'}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIndex(i => Math.min(DECK.length - 1, i + 1))}
          disabled={index === DECK.length - 1}
          aria-label="Next card"
          className="w-12 h-12 flex items-center justify-center rounded-xl bg-card disabled:opacity-30 hover:bg-raised active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}
