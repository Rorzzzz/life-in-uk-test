'use client'

import { useState } from 'react'
import Link from 'next/link'
import QuestionCard from '@/components/game/QuestionCard'
import B2ResultScreen from '@/components/game/B2ResultScreen'
import { B2_GRAMMAR_QUESTIONS, B2_GRAMMAR_CATEGORIES } from '@/data/b2Grammar'

const SESSION_SIZE = 20

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildSession(categoryId) {
  const pool = categoryId === 'all'
    ? B2_GRAMMAR_QUESTIONS
    : B2_GRAMMAR_QUESTIONS.filter(q => q.category === categoryId)
  return shuffle(pool).slice(0, SESSION_SIZE).map(q => ({ ...q, chapter: null }))
}

export default function B2GrammarClient() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [session, setSession]               = useState(() => buildSession('all'))
  const [index, setIndex]                   = useState(0)
  const [correct, setCorrect]               = useState(0)
  const [wrongQuestions, setWrongQuestions] = useState([])
  const [done, setDone]                     = useState(false)
  const [started, setStarted]               = useState(false)

  const current = session[index]

  function handleAnswer(isCorrect, selectedIndex) {
    if (isCorrect) {
      setCorrect(c => c + 1)
    } else {
      setWrongQuestions(prev => [...prev, { ...session[index], selectedIndex }])
    }
  }

  function handleNext() {
    if (index + 1 >= session.length) {
      setDone(true)
    } else {
      setIndex(i => i + 1)
    }
  }

  function startNew(catId) {
    const cat = catId ?? activeCategory
    setActiveCategory(cat)
    setSession(buildSession(cat))
    setIndex(0)
    setCorrect(0)
    setWrongQuestions([])
    setDone(false)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (done) {
    return (
      <B2ResultScreen
        score={correct}
        total={session.length}
        wrongQuestions={wrongQuestions}
        onRetry={() => startNew(activeCategory)}
        onChangeCategory={() => { setDone(false); setStarted(false) }}
      />
    )
  }

  if (!started) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-display font-bold text-ink mb-1">B2 Grammar Practice</h1>
        <p className="text-ink-muted mb-6">200 IELTS-style questions. Choose a grammar area or mix all.</p>

        <div className="bg-card rounded-2xl p-5 mb-5">
          <p className="font-semibold text-ink mb-3">Choose a grammar area</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => startNew('all')}
              className="flex items-center justify-between px-4 py-3 bg-raised border border-border hover:border-brand-500/40 rounded-xl transition-colors group"
            >
              <div className="text-left">
                <div className="font-medium text-ink text-sm">All Grammar</div>
                <div className="text-xs text-ink-muted">{B2_GRAMMAR_QUESTIONS.length} questions</div>
              </div>
              <span className="text-brand-400 text-sm group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
            {B2_GRAMMAR_CATEGORIES.map(cat => {
              const count = B2_GRAMMAR_QUESTIONS.filter(q => q.category === cat.id).length
              return (
                <button
                  key={cat.id}
                  onClick={() => startNew(cat.id)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl border transition-colors hover:opacity-80"
                  style={{ borderColor: `${cat.colour}44`, backgroundColor: `${cat.colour}11` }}
                >
                  <div className="text-left">
                    <div className="font-medium text-sm" style={{ color: cat.colour }}>{cat.title}</div>
                    <div className="text-xs text-ink-muted">{count} questions</div>
                  </div>
                  <span className="text-xs font-mono" style={{ color: cat.colour }}>→</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 mb-5">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">What this tests</p>
          <ul className="text-sm text-ink-muted space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Conditionals — zero, first, second, third, mixed; wish; inverted</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Passive voice — all tenses, causative have/get, reporting verbs</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Reported speech — backshift, say/tell, reporting verbs + patterns</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Modal verbs — deduction, probability, obligation, ability</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Linking words — contrast, addition, cause/effect, purpose, concession</li>
          </ul>
        </div>

        <div className="bg-card rounded-2xl p-4">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Related</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Vocabulary</Link>
            <Link href="/articles/b2-english-test" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 Test Guide</Link>
            <Link href="/articles/b2-vs-b1-english" className="px-3 py-1.5 text-sm text-brand-400 hover:text-brand-300 rounded-lg hover:bg-brand-500/10 transition-colors">B2 vs B1</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display font-bold text-ink text-base">B2 Grammar</h1>
          <p className="text-xs text-ink-muted">
            {B2_GRAMMAR_CATEGORIES.find(c => c.id === activeCategory)?.title ?? 'All Grammar'} · {session.length} questions
          </p>
        </div>
        <button
          onClick={() => setStarted(false)}
          className="text-xs text-ink-muted hover:text-ink transition-colors px-3 py-1.5 rounded-lg hover:bg-raised"
        >
          Change area
        </button>
      </div>

      {current && (
        <QuestionCard
          question={current}
          questionNumber={index + 1}
          totalQuestions={session.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
          countForStreak={false}
        />
      )}
    </div>
  )
}
