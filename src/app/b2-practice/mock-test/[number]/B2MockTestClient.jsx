'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Play, Volume2 } from 'lucide-react'
import clsx from 'clsx'
import B2WritingCard from '@/components/game/B2WritingCard'
import B2SpeakingCard from '@/components/game/B2SpeakingCard'

const PASS_MARK = 14
const TOTAL_MCQ = 20
const TIME_SECONDS = 25 * 60

const SECTION_INFO = {
  listening:  { label: 'Listening',  colour: '#22d07a', questions: 4 },
  reading:    { label: 'Reading',    colour: '#06b6d4', questions: 4 },
  vocabulary: { label: 'Vocabulary', colour: '#3381ff', questions: 6 },
  grammar:    { label: 'Grammar',    colour: '#a855f7', questions: 6 },
  writing:    { label: 'Writing',    colour: '#f59e0b', questions: null },
  speaking:   { label: 'Speaking',   colour: '#ff4d6d', questions: null },
}

const MCQ_ORDER = ['listening', 'reading', 'vocabulary', 'grammar']
const ALL_ORDER = ['listening', 'reading', 'vocabulary', 'grammar', 'writing', 'speaking']
const MCQ_SIZES = { listening: 4, reading: 4, vocabulary: 6, grammar: 6 }

function formatTime(s) {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

function scrollTop() {
  window.scrollTo(0, 0)
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
}

// ─── Listening step ────────────────────────────────────────────────────────

function ListeningStep({ clip, questionIndex, onAnswer }) {
  const [phase, setPhase]       = useState('ready')
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const q = clip.questions[questionIndex]

  useEffect(() => { return () => window.speechSynthesis?.cancel() }, [])
  useEffect(() => { setSelected(null); setRevealed(false) }, [questionIndex])

  function playAudio() {
    window.speechSynthesis?.cancel()
    const clean = clip.audioScript.replace(/^[A-C]:\s*/gm, '').replace(/\n/g, ' ')
    const utt = new SpeechSynthesisUtterance(clean)
    utt.rate = 0.92; utt.lang = 'en-GB'
    utt.onend = () => setPhase('questions')
    utt.onerror = () => setPhase('questions')
    setPhase('playing')
    window.speechSynthesis.speak(utt)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card rounded-2xl p-4 border border-border">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Listening — Question {questionIndex + 1} of 4</p>
        <p className="font-semibold text-ink text-sm">{clip.title}</p>
      </div>

      {(phase === 'ready' || phase === 'playing') && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-3">
            <Volume2 size={16} className="text-brand-400" />
            <p className="text-sm font-semibold text-ink">Audio clip</p>
          </div>
          {phase === 'playing' ? (
            <div className="flex items-center gap-3 py-2">
              <div className="flex gap-1">
                {[0,1,2,3,4].map(i => (
                  <div key={i} className="w-1 bg-brand-400 rounded-full animate-pulse" style={{ height: `${12 + (i%3)*8}px`, animationDelay: `${i*0.15}s` }} />
                ))}
              </div>
              <span className="text-sm text-ink-muted">Playing...</span>
            </div>
          ) : (
            <button onClick={playAudio} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold rounded-xl transition-colors">
              <Play size={14} />{questionIndex === 0 ? 'Play audio' : 'Play again'}
            </button>
          )}
        </div>
      )}

      {phase === 'questions' && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <p className="text-sm font-semibold text-ink mb-4">{q.q}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, i) => {
              let style = 'bg-raised border-border text-ink-muted hover:border-brand-500/40 hover:text-ink'
              if (revealed) {
                if (q.answer === i) style = 'bg-success/15 border-success/50 text-success'
                else if (selected === i) style = 'bg-danger/15 border-danger/50 text-danger'
                else style = 'bg-raised border-border text-ink-muted opacity-40'
              }
              return (
                <button key={i} onClick={() => { if (!revealed) { setSelected(i); setRevealed(true) } }} disabled={revealed}
                  className={clsx('w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors', style)}>
                  <span className="font-mono text-xs mr-2 opacity-60">{String.fromCharCode(65+i)}</span>{opt}
                </button>
              )
            })}
          </div>
          {!revealed && (
            <button onClick={() => setPhase('ready')} className="mt-3 text-xs text-ink-muted hover:text-ink transition-colors underline">
              Listen again
            </button>
          )}
        </div>
      )}

      {revealed && (
        <>
          <div className={clsx('rounded-2xl border p-4', selected === q.answer ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30')}>
            <p className={clsx('text-sm font-semibold mb-1', selected === q.answer ? 'text-success' : 'text-danger')}>
              {selected === q.answer ? '✓ Correct' : `✗ Correct: ${q.options[q.answer]}`}
            </p>
            <p className="text-xs text-ink-muted">{q.explanation}</p>
          </div>
          <button onClick={() => onAnswer(selected === q.answer)}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors">
            Next →
          </button>
        </>
      )}
    </div>
  )
}

// ─── Reading step ──────────────────────────────────────────────────────────

function ReadingStep({ passage, questionIndex, onAnswer }) {
  const [passageOpen, setPassageOpen] = useState(true)
  const [selected, setSelected]       = useState(null)
  const [revealed, setRevealed]       = useState(false)
  const q = passage.questions[questionIndex]

  useEffect(() => { setSelected(null); setRevealed(false) }, [questionIndex])

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card rounded-2xl p-4 border border-border">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">Reading — Question {questionIndex + 1} of 4</p>
        <p className="font-semibold text-ink text-sm">{passage.title}</p>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <button onClick={() => setPassageOpen(o => !o)}
          className="w-full flex items-center justify-between px-5 py-3 hover:bg-raised transition-colors">
          <span className="text-sm font-semibold text-ink">{passageOpen ? 'Hide passage' : 'Show passage'}</span>
          <span className="text-xs text-ink-muted">{passageOpen ? '▲' : '▼'}</span>
        </button>
        {passageOpen && (
          <div className="px-5 pb-5 border-t border-border">
            <p className="text-sm text-ink leading-relaxed whitespace-pre-line pt-4">{passage.passage}</p>
          </div>
        )}
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <p className="text-sm font-semibold text-ink mb-4">{q.q}</p>
        <div className="flex flex-col gap-2">
          {q.options.map((opt, i) => {
            let style = 'bg-raised border-border text-ink-muted hover:border-brand-500/40 hover:text-ink'
            if (revealed) {
              if (q.answer === i) style = 'bg-success/15 border-success/50 text-success'
              else if (selected === i) style = 'bg-danger/15 border-danger/50 text-danger'
              else style = 'bg-raised border-border text-ink-muted opacity-40'
            }
            return (
              <button key={i} onClick={() => { if (!revealed) { setSelected(i); setRevealed(true) } }} disabled={revealed}
                className={clsx('w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors', style)}>
                <span className="font-mono text-xs mr-2 opacity-60">{String.fromCharCode(65+i)}</span>{opt}
              </button>
            )
          })}
        </div>
      </div>

      {revealed && (
        <>
          <div className={clsx('rounded-2xl border p-4', selected === q.answer ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30')}>
            <p className={clsx('text-sm font-semibold mb-1', selected === q.answer ? 'text-success' : 'text-danger')}>
              {selected === q.answer ? '✓ Correct' : `✗ Correct: ${q.options[q.answer]}`}
            </p>
            <p className="text-xs text-ink-muted">{q.explanation}</p>
          </div>
          <button onClick={() => onAnswer(selected === q.answer)}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors">
            Next →
          </button>
        </>
      )}
    </div>
  )
}

// ─── MCQ step (vocab / grammar) ────────────────────────────────────────────

function MCQStep({ question, sectionLabel, questionIndex, total, onAnswer }) {
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-card rounded-2xl p-4 border border-border">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1">{sectionLabel} — Question {questionIndex + 1} of {total}</p>
        <p className="font-semibold text-ink text-sm leading-relaxed">{question.q}</p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex flex-col gap-2">
          {question.options.map((opt, i) => {
            let style = 'bg-raised border-border text-ink-muted hover:border-brand-500/40 hover:text-ink'
            if (revealed) {
              if (question.answer === i) style = 'bg-success/15 border-success/50 text-success'
              else if (selected === i) style = 'bg-danger/15 border-danger/50 text-danger'
              else style = 'bg-raised border-border text-ink-muted opacity-40'
            }
            return (
              <button key={i} onClick={() => { if (!revealed) { setSelected(i); setRevealed(true) } }} disabled={revealed}
                className={clsx('w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors', style)}>
                <span className="font-mono text-xs mr-2 opacity-60">{String.fromCharCode(65+i)}</span>{opt}
              </button>
            )
          })}
        </div>
      </div>

      {revealed && (
        <>
          <div className={clsx('rounded-2xl border p-4', selected === question.answer ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30')}>
            <p className={clsx('text-sm font-semibold mb-1', selected === question.answer ? 'text-success' : 'text-danger')}>
              {selected === question.answer ? '✓ Correct' : `✗ Correct: ${question.options[question.answer]}`}
            </p>
            <p className="text-xs text-ink-muted">{question.explanation}</p>
          </div>
          <button onClick={() => onAnswer(selected === question.answer)}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors">
            Next →
          </button>
        </>
      )}
    </div>
  )
}

// ─── Results screen ────────────────────────────────────────────────────────

function ResultsScreen({ score, sectionScores, testNumber, onRetry }) {
  const passed = score >= PASS_MARK
  const pct = Math.round((score / TOTAL_MCQ) * 100)

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className={clsx('rounded-2xl p-6 text-center mb-5 border', passed ? 'bg-success/10 border-success/30' : 'bg-danger/10 border-danger/30')}>
        <div className="text-4xl mb-2">{passed ? '✓' : '✗'}</div>
        <h2 className={clsx('text-2xl font-display font-bold mb-1', passed ? 'text-success' : 'text-danger')}>
          {passed ? 'PASS' : 'FAIL'}
        </h2>
        <p className="text-3xl font-mono font-bold text-ink mb-1">{score}/{TOTAL_MCQ}</p>
        <p className="text-sm text-ink-muted mb-1">{pct}% — pass mark is {Math.round((PASS_MARK/TOTAL_MCQ)*100)}%</p>
        <p className="text-xs text-ink-muted">{passed ? 'You meet the B2 threshold for UK settlement.' : `You need ${PASS_MARK - score} more correct to reach B2 level.`}</p>
      </div>

      <div className="bg-card rounded-2xl p-5 border border-border mb-5">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Section breakdown</p>
        <div className="space-y-3">
          {Object.entries(sectionScores).map(([section, { correct, total }]) => {
            const info = SECTION_INFO[section]
            const sectionPct = Math.round((correct/total)*100)
            return (
              <div key={section}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-ink">{info.label}</span>
                  <span className="text-sm font-mono text-ink-muted">{correct}/{total}</span>
                </div>
                <div className="h-2 bg-raised rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${sectionPct}%`, backgroundColor: info.colour }} />
                </div>
              </div>
            )
          })}
          <div className="pt-2 border-t border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink">Writing</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">Completed ✓</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink">Speaking</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-success/15 text-success font-medium">Completed ✓</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <button onClick={onRetry}
          className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors">
          Retry Mock Test {testNumber} →
        </button>
        {testNumber < 10 && (
          <Link href={`/b2-practice/mock-test/${testNumber + 1}`}
            className="w-full py-3 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink rounded-xl text-sm font-medium transition-colors text-center">
            Next: Mock Test {testNumber + 1} →
          </Link>
        )}
        <Link href="/b2-practice/mock-test"
          className="w-full py-3 bg-raised border border-border hover:border-brand-500/40 text-ink-muted hover:text-ink rounded-xl text-sm font-medium transition-colors text-center">
          ← All B2 mock tests
        </Link>
      </div>

      <div className="bg-card rounded-2xl p-4 border border-border">
        <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Also practise</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/b2-practice/writing" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">Writing</Link>
          <Link href="/b2-practice/speaking" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">Speaking</Link>
          <Link href="/b2-practice/vocabulary" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">Vocabulary</Link>
          <Link href="/b2-practice/grammar" className="px-3 py-1.5 text-sm bg-raised border border-border rounded-lg text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors">Grammar</Link>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

export default function B2MockTestClient({ testData, listeningClip, readingPassage, vocabQuestions, grammarQuestions, writingTask, speakingTask }) {
  const [phase, setPhase]           = useState('intro')   // intro | test | done
  const [section, setSection]       = useState('listening')
  const [stepIndex, setStepIndex]   = useState(0)
  const [score, setScore]           = useState(0)
  const [timeLeft, setTimeLeft]     = useState(TIME_SECONDS)
  const [timerActive, setTimerActive] = useState(false)
  const [sectionScores, setSectionScores] = useState({
    listening:  { correct: 0, total: 4 },
    reading:    { correct: 0, total: 4 },
    vocabulary: { correct: 0, total: 6 },
    grammar:    { correct: 0, total: 6 },
  })
  const timerRef = useRef(null)

  useEffect(() => {
    return () => { clearInterval(timerRef.current); window.speechSynthesis?.cancel() }
  }, [])

  function startTest() {
    setPhase('test')
    setSection('listening')
    setStepIndex(0)
    setScore(0)
    setTimeLeft(TIME_SECONDS)
    setTimerActive(true)
    setSectionScores({ listening: { correct: 0, total: 4 }, reading: { correct: 0, total: 4 }, vocabulary: { correct: 0, total: 6 }, grammar: { correct: 0, total: 6 } })
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setSection('writing'); setStepIndex(0); setTimerActive(false); return 0 }
        return t - 1
      })
    }, 1000)
    scrollTop()
  }

  function handleMCQAnswer(isCorrect) {
    if (isCorrect) {
      setScore(s => s + 1)
      setSectionScores(prev => ({
        ...prev,
        [section]: { ...prev[section], correct: prev[section].correct + 1 },
      }))
    }

    const currentSize = MCQ_SIZES[section]
    const nextStep = stepIndex + 1

    if (nextStep >= currentSize) {
      const currentIdx = MCQ_ORDER.indexOf(section)
      if (currentIdx + 1 >= MCQ_ORDER.length) {
        // MCQ done — stop timer, move to writing
        clearInterval(timerRef.current)
        setTimerActive(false)
        window.speechSynthesis?.cancel()
        setSection('writing')
        setStepIndex(0)
      } else {
        setSection(MCQ_ORDER[currentIdx + 1])
        setStepIndex(0)
      }
    } else {
      setStepIndex(nextStep)
    }
    scrollTop()
  }

  function retry() {
    clearInterval(timerRef.current)
    window.speechSynthesis?.cancel()
    setPhase('intro')
  }

  const isMCQSection = MCQ_ORDER.includes(section)
  const globalQ = MCQ_ORDER.slice(0, MCQ_ORDER.indexOf(section)).reduce((a, s) => a + MCQ_SIZES[s], 0) + stepIndex + 1
  const timerWarning = timeLeft < 300

  if (phase === 'done') {
    return <ResultsScreen score={score} sectionScores={sectionScores} testNumber={testData.number} onRetry={retry} />
  }

  // ── Writing section ──
  if (phase === 'test' && section === 'writing') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              {ALL_ORDER.map((s) => (
                <div key={s} className={clsx('h-1.5 rounded-full transition-all',
                  s === 'writing' ? 'w-8 bg-amber-400' :
                  MCQ_ORDER.includes(s) ? 'w-3 bg-success' :
                  'w-3 bg-raised border border-border'
                )} />
              ))}
            </div>
            <p className="text-xs text-ink-muted mt-1">Writing — untimed</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-400 font-semibold">Untimed</span>
        </div>
        <B2WritingCard
          key={`writing-${testData.number}`}
          task={writingTask}
          onNext={() => { setSection('speaking'); setStepIndex(0); scrollTop() }}
          isLast={false}
        />
      </div>
    )
  }

  // ── Speaking section ──
  if (phase === 'test' && section === 'speaking') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              {ALL_ORDER.map((s) => (
                <div key={s} className={clsx('h-1.5 rounded-full transition-all',
                  s === 'speaking' ? 'w-8 bg-red-400' :
                  s === 'writing' ? 'w-3 bg-success' :
                  MCQ_ORDER.includes(s) ? 'w-3 bg-success' :
                  'w-3 bg-raised border border-border'
                )} />
              ))}
            </div>
            <p className="text-xs text-ink-muted mt-1">Speaking — untimed</p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-red-400/15 text-red-400 font-semibold">Untimed</span>
        </div>
        <B2SpeakingCard
          key={`speaking-${testData.number}`}
          task={speakingTask}
          onNext={() => { setPhase('done'); scrollTop() }}
          isLast={true}
        />
      </div>
    )
  }

  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="mb-2">
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-400 font-semibold">B2 English</span>
        </div>
        <h1 className="text-2xl font-display font-bold text-ink mb-1">Mock Test {testData.number}</h1>
        <p className="text-ink-muted text-sm mb-6">{testData.focus}</p>

        <div className="bg-card rounded-2xl p-5 border border-border mb-5">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-3">Test format</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {Object.entries(SECTION_INFO).map(([key, info]) => (
              <div key={key} className="bg-raised rounded-xl p-3 border border-border">
                <p className="text-xs font-semibold mb-0.5" style={{ color: info.colour }}>{info.label}</p>
                <p className="text-sm font-mono text-ink">
                  {info.questions ? `${info.questions} questions` : '1 task — untimed'}
                </p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div><p className="text-xl font-mono font-bold text-ink">{TOTAL_MCQ}</p><p className="text-xs text-ink-muted">MCQ questions</p></div>
            <div><p className="text-xl font-mono font-bold text-ink">25</p><p className="text-xs text-ink-muted">Min (MCQ)</p></div>
            <div><p className="text-xl font-mono font-bold text-success">70%</p><p className="text-xs text-ink-muted">Pass mark</p></div>
          </div>
        </div>

        <div className="bg-card rounded-2xl p-4 border border-border mb-5">
          <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-2">Before you start</p>
          <ul className="text-sm text-ink-muted space-y-1.5">
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> 25-minute timer covers the MCQ sections — Writing starts automatically as soon as you finish all questions, even if time remains</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Writing and Speaking are untimed — take as long as you need for instant examiner feedback</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Listening: press Play, then answer after the audio ends</li>
            <li className="flex items-start gap-2"><span className="text-brand-400 mt-0.5">→</span> Speaking: you will need a microphone to record your answer</li>
          </ul>
        </div>

        <button onClick={startTest}
          className="w-full py-4 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-bold rounded-xl transition-colors text-lg">
          Start Mock Test {testData.number} →
        </button>
      </div>
    )
  }

  // ── MCQ test in progress ──
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {ALL_ORDER.map((s) => (
            <div key={s} className={clsx('h-1.5 rounded-full transition-all',
              s === section ? 'w-8' : 'w-3',
              MCQ_ORDER.indexOf(s) < MCQ_ORDER.indexOf(section) ? 'bg-success' :
              s === section ? 'bg-brand-500' :
              'bg-raised border border-border'
            )} />
          ))}
          <span className="text-xs text-ink-muted ml-1">Q{globalQ}/{TOTAL_MCQ}</span>
        </div>
        <span className={clsx('text-sm font-mono font-bold', timerWarning ? 'text-danger animate-pulse' : 'text-ink')}>
          {formatTime(timeLeft)}
        </span>
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: SECTION_INFO[section].colour }}>
        {SECTION_INFO[section].label}
      </p>

      {section === 'listening' && (
        <ListeningStep key={`l-${stepIndex}`} clip={listeningClip} questionIndex={stepIndex} onAnswer={handleMCQAnswer} />
      )}
      {section === 'reading' && (
        <ReadingStep key={`r-${stepIndex}`} passage={readingPassage} questionIndex={stepIndex} onAnswer={handleMCQAnswer} />
      )}
      {section === 'vocabulary' && (
        <MCQStep key={`v-${stepIndex}`} question={vocabQuestions[stepIndex]} sectionLabel="Vocabulary" questionIndex={stepIndex} total={6} onAnswer={handleMCQAnswer} />
      )}
      {section === 'grammar' && (
        <MCQStep key={`g-${stepIndex}`} question={grammarQuestions[stepIndex]} sectionLabel="Grammar" questionIndex={stepIndex} total={6} onAnswer={handleMCQAnswer} />
      )}
    </div>
  )
}
