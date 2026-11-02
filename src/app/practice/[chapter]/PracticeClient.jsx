'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { buildAdaptiveSession } from '@/algorithms/sessionBuilder'
import { useGame } from '@/context/GameContext'
import QuestionCard from '@/components/game/QuestionCard'
import ResultScreen from '@/components/game/ResultScreen'
import BadgeUnlock from '@/components/game/BadgeUnlock'
import AdSlot from '@/components/ui/AdSlot'
import WithAdRail from '@/components/ui/AdRail'
import { AD_SLOTS, EXAM_AD_REFRESH_EVERY, INLINE_AD_MIN_WIDTH } from '@/data/ads'

export default function PracticeClient({ chapter }) {
  const { state, completeChapter } = useGame()
  const router = useRouter()

  const [started, setStarted]       = useState(false)
  const [session, setSession]       = useState(() => buildAdaptiveSession(state.progress, { chapterId: chapter.id }))
  const [index, setIndex]           = useState(0)
  const [correct, setCorrect]       = useState(0)
  const [done, setDone]             = useState(false)

  const current = session[index]

  function handleAnswer(isCorrect) {
    if (isCorrect) setCorrect(c => c + 1)
  }

  function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }) }

  function handleNext() {
    if (index + 1 >= session.length) {
      completeChapter(chapter.id, correct, session.length)
      setDone(true)
    } else {
      setIndex(i => i + 1)
      // QuestionCard's useEffect handles scrollTop on question change
    }
  }

  function handleNewSession() {
    setSession(buildAdaptiveSession(state.progress, { chapterId: chapter.id }))
    setIndex(0)
    setCorrect(0)
    setDone(false)
    scrollTop()
  }

  if (done) {
    return (
      <WithAdRail>
        <ResultScreen
          showAds
          score={correct}
          total={session.length}
          xpEarned={correct * 10 + 25}
          onRetry={handleNewSession}
          onHome={() => router.push('/')}
          onChangeChapter={() => router.push('/practice')}
        />
      </WithAdRail>
    )
  }

  if (!started) {
    return (
      <WithAdRail>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono"
            style={{ backgroundColor: `${chapter.colour}22`, color: chapter.colour }}
          >
            {chapter.id}
          </div>
          <div>
            <h1 className="font-display font-bold text-ink leading-tight">{chapter.title}</h1>
            <p className="text-xs text-ink-muted">{session.length} questions · Adaptive</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-5 mb-6 space-y-3">
          <p className="font-semibold text-ink">How adaptive learning works</p>
          <p className="text-sm text-ink-muted leading-relaxed">
            This session is built around <em>you</em>. Questions you find difficult will appear more
            often. Questions you have already mastered are shown less. The more you practise, the
            smarter your sessions become.
          </p>
          <ul className="text-sm text-ink-muted space-y-1.5 pl-1">
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Get it right first time — <span className="text-xp font-medium">+10 XP</span></li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Get it right after a hint — <span className="text-xp font-medium">+5 XP</span></li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Every question has a full explanation</li>
          </ul>
        </div>

        <button
          onClick={() => { setStarted(true); scrollTop() }}
          className="w-full py-4 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          Start session →
        </button>
        {/* Intro ad: extra gap from the full-width Start button, all screen sizes */}
        <AdSlot slot={AD_SLOTS.examInline} refreshKey="practice-intro" className="mt-12" />
      </WithAdRail>
    )
  }

  return (
    <WithAdRail>
      <BadgeUnlock />

      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono"
          style={{ backgroundColor: `${chapter.colour}22`, color: chapter.colour }}
        >
          {chapter.id}
        </div>
        <div>
          <h1 className="font-display font-bold text-ink leading-tight">{chapter.title}</h1>
          <p className="text-xs text-ink-muted">{session.length} questions · Adaptive</p>
        </div>
      </div>

      {current && (
        <QuestionCard
          question={current}
          questionNumber={index + 1}
          totalQuestions={session.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      )}
      {/* New ad every EXAM_AD_REFRESH_EVERY questions, only on the user's Next click */}
      <AdSlot
        slot={AD_SLOTS.examInline} minWidth={INLINE_AD_MIN_WIDTH}
        refreshKey={Math.floor(index / EXAM_AD_REFRESH_EVERY)}
        className="mt-12"
      />
    </WithAdRail>
  )
}
