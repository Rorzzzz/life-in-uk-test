'use client'

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import clsx from 'clsx'
import AnswerButton from './AnswerButton'
import ExplanationPanel from './ExplanationPanel'
import XPPopup from './XPPopup'
import { useAudioNarration } from '@/hooks/useAudioNarration'
import { useGame } from '@/context/GameContext'
import AdSlot from '@/components/ui/AdSlot'
import { AD_SLOTS, INLINE_AD_MIN_WIDTH, QUIZ_MOBILE_AD_ENABLED } from '@/data/ads'

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onNext,
  onAnswer,             // optional: called with (isCorrect) after answer selected
  showProgress = true,
  showMobileAd = false,   // phones only: ad after answering (main quiz flows only)
  countForStreak = true, // false during exams — exam answers don't count toward daily streak
}) {
  const [selected, setSelected]     = useState(null)
  const [answered, setAnswered]     = useState(false)
  const [startTime, setStartTime]   = useState(null)
  const [xpGained, setXpGained]     = useState(0)
  const [showXP, setShowXP]         = useState(false)
  const { recordAnswer, state }     = useGame()
  const { toggle, isSpeaking, isSupported } = useAudioNarration()
  const explanationRef              = useRef(null)
  const topRef                      = useRef(null)
  const mobileAdRef                 = useRef(null)

  // Reset on new question and scroll back to top
  useEffect(() => {
    setSelected(null)
    setAnswered(false)
    setStartTime(Date.now())
    setXpGained(0)
    setShowXP(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur() }, 50)
  }, [question?.id])

  // Scroll explanation + Next button into view on mobile when answer is revealed
  // Extra offset accounts for the 64px fixed BottomNav
  useEffect(() => {
    if (answered && explanationRef.current) {
      setTimeout(() => {
        const el = explanationRef.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const bottomNavHeight = 72 // h-16 (64px) + a little breathing room
        let scrollBy = rect.bottom - window.innerHeight + bottomNavHeight
        // Never scroll the phone quiz ad up into the top-anchor zone (an ad must
        // not touch or sit under another ad). If Next doesn't fit, the user scrolls.
        const ad = mobileAdRef.current?.getBoundingClientRect()
        const ANCHOR_ZONE = 110
        if (ad && ad.height > 0) scrollBy = Math.min(scrollBy, ad.top - ANCHOR_ZONE)
        if (scrollBy > 0) {
          window.scrollBy({ top: scrollBy, behavior: 'smooth' })
        }
      }, 150)
    }
  }, [answered])

  function handleAnswer(index) {
    if (answered) return
    const responseMs = Date.now() - (startTime ?? Date.now())
    const isCorrect  = index === question.answer
    const isFirstTry = !(state.progress?.[question.id]?.totalAnswered > 0)
    const xp         = isCorrect ? (isFirstTry ? 10 : 5) : 0

    setSelected(index)
    setAnswered(true)
    setXpGained(xp)
    if (xp > 0) setShowXP(true)

    recordAnswer(question.id, isCorrect, responseMs, question.chapter, countForStreak)
    onAnswer?.(isCorrect, index)
  }

  function getButtonState(index) {
    if (!answered) return null
    if (index === question.answer)      return 'correct'
    if (index === selected)             return 'incorrect'
    return null
  }

  if (!question) return null

  return (
    <div ref={topRef} className="flex flex-col gap-4">
      <XPPopup amount={xpGained} visible={showXP} onHide={() => setShowXP(false)} />

      {/* Progress */}
      {showProgress && totalQuestions > 1 && (
        <div className="flex items-center gap-2">
          <div className="flex-1 flex gap-1" aria-hidden="true">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <div
                key={i}
                className={clsx(
                  'h-1 flex-1 rounded-full transition-colors',
                  i < (questionNumber - 1) ? 'bg-success' :
                  i === (questionNumber - 1) ? 'bg-brand-500' :
                  'bg-border'
                )}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-ink-muted whitespace-nowrap">
            {questionNumber}/{totalQuestions}
          </span>
        </div>
      )}

      {/* Question */}
        <div
          key={question.id}
          className="bg-card rounded-2xl p-5 border border-border animate-slide-up"
        >
          <div className="flex items-start justify-between gap-3 mb-5">
            <h2 className="text-base font-semibold text-ink leading-snug flex-1">
              {question.q}
            </h2>
            {isSupported && (
              <button
                onClick={() => toggle(question.q)}
                className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-raised text-ink-muted hover:text-ink active:opacity-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                aria-label={isSpeaking ? 'Stop audio' : 'Read question aloud'}
              >
                {isSpeaking
                  ? <VolumeX size={16} />
                  : <Volume2 size={16} />
                }
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {question.options.map((opt, i) => (
              <AnswerButton
                key={i}
                option={opt}
                index={i}
                state={getButtonState(i)}
                onClick={handleAnswer}
                disabled={answered}
              />
            ))}
          </div>
        </div>

      {/* Phones only: one ad per question, shown from the start (user's choice,
          2026-11-04, overriding the policy-officer veto). A non-clickable info strip
          keeps it >=150px below the answer buttons (16 gap + 134 strip + 16 gap), and
          after answering the explanation appears below it with Next >=150px further
          down (keepNextClearOfAd). Kill switch: QUIZ_MOBILE_AD_ENABLED in data/ads.js. */}
      {showMobileAd && QUIZ_MOBILE_AD_ENABLED && (
        <>
          <div className="md:hidden min-h-[134px] flex flex-col items-center justify-center gap-1 text-center select-none" aria-hidden="true">
            <p className="text-xs font-mono text-ink-muted">Chapter {question.chapter} · Life in the UK handbook</p>
            <p className="text-xs text-ink-muted">{answered ? 'Read the explanation below' : 'Tap an answer above to see the explanation'}</p>
          </div>
          <div ref={mobileAdRef}>
            <AdSlot
              slot={AD_SLOTS.quizMobile}
              refreshKey={question.id}
              maxWidth={INLINE_AD_MIN_WIDTH - 1}
              heightClass="h-[100px]"
            />
          </div>
        </>
      )}

      {/* Explanation */}
      {answered && (
        <div ref={explanationRef}>
          <ExplanationPanel
            isCorrect={selected === question.answer}
            explanation={question.explanation}
            xpGained={xpGained}
            questionId={question.id}
            onNext={onNext}
            keepNextClearOfAd={showMobileAd && QUIZ_MOBILE_AD_ENABLED}
          />
        </div>
      )}
    </div>
  )
}
