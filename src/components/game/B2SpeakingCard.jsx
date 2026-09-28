'use client'

import { useState, useRef, useEffect } from 'react'
import { Mic, MicOff, ChevronDown, ChevronUp, Loader2 } from 'lucide-react'
import clsx from 'clsx'

const PART_LABELS = { 1: 'Part 1 — Interview', 2: 'Part 2 — Long Turn', 3: 'Part 3 — Discussion' }

function FeedbackText({ text }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, li) => {
        const isPass = /^PASS\s*—/.test(line.trim())
        const isFail = /^FAIL\s*—/.test(line.trim())
        if (isPass || isFail) {
          return (
            <div key={li} className={`flex items-center gap-2 my-3 px-4 py-3 rounded-xl font-semibold text-sm ${isPass ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'}`}>
              <span className="text-lg">{isPass ? '✓' : '✗'}</span>
              {line.trim()}
            </div>
          )
        }
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <span key={li}>
            {parts.map((part, i) =>
              part.startsWith('**') && part.endsWith('**')
                ? <strong key={i} className="text-ink font-semibold">{part.slice(2, -2)}</strong>
                : <span key={i}>{part}</span>
            )}
            {'\n'}
          </span>
        )
      })}
    </>
  )
}

function PrepTimer({ seconds, onDone }) {
  const [remaining, setRemaining] = useState(seconds)

  useEffect(() => {
    if (remaining <= 0) { onDone(); return }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000)
    return () => clearTimeout(t)
  }, [remaining, onDone])

  return (
    <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-5 text-center">
      <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-2">Preparation time</p>
      <div className="text-4xl font-mono font-bold text-ink mb-2">{remaining}s</div>
      <p className="text-sm text-ink-muted">Read the question and plan your answer</p>
      <button
        onClick={onDone}
        className="mt-4 px-4 py-2 text-sm text-brand-400 hover:text-brand-300 underline"
      >
        Start recording now
      </button>
    </div>
  )
}

export default function B2SpeakingCard({ task, onNext, isLast }) {
  const [phase, setPhase]           = useState('ready')   // ready | prep | recording | transcribing | review | feedback
  const [transcript, setTranscript] = useState('')
  const [recordingTime, setRecordingTime] = useState(0)
  const [feedback, setFeedback]     = useState('')
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState(null)
  const [modelOpen, setModelOpen]   = useState(false)
  const mediaRecorderRef            = useRef(null)
  const chunksRef                   = useRef([])
  const timerRef                    = useRef(null)
  const feedbackRef                 = useRef(null)

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  async function startRecording() {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      // Pick a MIME type Whisper accepts
      const mimeType = ['audio/webm', 'audio/mp4', 'audio/ogg'].find(m => MediaRecorder.isTypeSupported(m)) || ''
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})
      chunksRef.current = []

      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop())
        handleTranscribe(chunksRef.current, recorder.mimeType)
      }

      recorder.start(250)
      mediaRecorderRef.current = recorder
      setPhase('recording')
      setRecordingTime(0)
      timerRef.current = setInterval(() => setRecordingTime(t => t + 1), 1000)
    } catch {
      setError('Microphone access denied. Please allow microphone access in your browser settings.')
    }
  }

  function stopRecording() {
    clearInterval(timerRef.current)
    mediaRecorderRef.current?.stop()
    setPhase('transcribing')
  }

  async function handleTranscribe(chunks, mimeType) {
    try {
      const ext = mimeType.includes('mp4') ? 'mp4' : mimeType.includes('ogg') ? 'ogg' : 'webm'
      const blob = new Blob(chunks, { type: mimeType })
      const file = new File([blob], `recording.${ext}`, { type: mimeType })

      const formData = new FormData()
      formData.append('audio', file)

      const res = await fetch('/api/b2-speaking-transcribe', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error ?? 'Transcription failed.')
      setTranscript(data.text)
      setPhase('review')
    } catch (err) {
      setError(err.message)
      setPhase('ready')
    }
  }

  async function getFeedback() {
    setLoading(true)
    setError(null)
    setFeedback('')
    setPhase('feedback')

    try {
      const res = await fetch('/api/b2-speaking-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          transcript,
          question: task.question,
          part: task.part,
          promptPoints: task.promptPoints,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Feedback unavailable.')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        setFeedback(prev => prev + decoder.decode(value))
      }

      setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div className="flex flex-col gap-4">
      {/* Task header */}
      <div className="bg-card rounded-2xl p-5 border border-border">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-400 font-semibold">{PART_LABELS[task.part]}</span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-raised border border-border text-ink-muted font-medium">{task.topic}</span>
        </div>
        <h2 className="font-semibold text-ink text-base mb-3">{task.question}</h2>
        {task.promptPoints.length > 0 && (
          <ul className="space-y-1 mb-3">
            {task.promptPoints.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-ink">
                <span className="text-brand-400 mt-0.5">•</span>{p}
              </li>
            ))}
          </ul>
        )}
        <p className="text-xs text-ink-muted">
          {task.part === 2 ? 'Speak for 1–2 minutes' : task.part === 1 ? 'Speak for 20–30 seconds' : 'Speak for 40–60 seconds'}
        </p>
      </div>

      {/* Prep timer (Part 2 only) */}
      {phase === 'prep' && (
        <PrepTimer seconds={task.prepTime} onDone={startRecording} />
      )}

      {/* Recording controls */}
      {(phase === 'ready' || phase === 'recording') && (
        <div className="bg-card rounded-2xl border border-border p-5">
          {phase === 'ready' && (
            <button
              onClick={() => task.part === 2 ? setPhase('prep') : startRecording()}
              className="w-full flex items-center justify-center gap-3 py-4 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold rounded-xl transition-colors"
            >
              <Mic size={18} />
              {task.part === 2 ? 'Start preparation (1 min)' : 'Start recording'}
            </button>
          )}
          {phase === 'recording' && (
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse" />
                <span className="font-mono text-ink font-semibold">{formatTime(recordingTime)}</span>
                <span className="text-xs text-ink-muted">Recording...</span>
              </div>
              <button
                onClick={stopRecording}
                className="w-full flex items-center justify-center gap-3 py-4 bg-danger hover:bg-danger/80 active:opacity-70 text-white font-semibold rounded-xl transition-colors"
              >
                <MicOff size={18} />
                Stop recording
              </button>
            </div>
          )}
        </div>
      )}

      {/* Transcribing */}
      {phase === 'transcribing' && (
        <div className="bg-card rounded-2xl border border-border p-5 flex items-center gap-3">
          <Loader2 size={16} className="animate-spin text-brand-400" />
          <p className="text-sm text-ink-muted">Transcribing your response...</p>
        </div>
      )}

      {/* Transcript review */}
      {(phase === 'review' || phase === 'feedback') && transcript && (
        <div className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">Your response</p>
            {phase === 'review' && (
              <button
                onClick={() => { setTranscript(''); setPhase('ready') }}
                className="text-xs text-ink-muted hover:text-ink underline"
              >
                Re-record
              </button>
            )}
          </div>
          <p className="text-sm text-ink leading-relaxed">{transcript}</p>
          {phase === 'review' && (
            <button
              onClick={getFeedback}
              className="w-full mt-4 py-3 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold rounded-xl transition-colors"
            >
              Get feedback →
            </button>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-danger/10 border border-danger/30 rounded-2xl p-4">
          <p className="text-sm text-danger">{error}</p>
          <button onClick={() => { setError(null); setPhase('ready') }} className="text-xs text-danger/70 hover:text-danger mt-2 underline">Try again</button>
        </div>
      )}

      {/* Feedback */}
      {(feedback || (loading && phase === 'feedback')) && (
        <div ref={feedbackRef} className="bg-card rounded-2xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            {loading && <Loader2 size={14} className="animate-spin text-brand-400" />}
            <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide">
              {loading ? 'Reviewing your response...' : 'Examiner Feedback'}
            </p>
          </div>
          <div className="text-sm text-ink-muted leading-relaxed whitespace-pre-line">
            <FeedbackText text={feedback} />
            {loading && <span className="inline-block w-1.5 h-4 bg-brand-400 animate-pulse ml-0.5 align-middle" />}
          </div>
        </div>
      )}

      {/* Model answer */}
      {feedback && !loading && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button
            onClick={() => setModelOpen(o => !o)}
            className="w-full flex items-center justify-between px-5 py-3 hover:bg-raised transition-colors"
          >
            <span className="text-sm font-semibold text-ink">Model answer (Band 7)</span>
            {modelOpen ? <ChevronUp size={16} className="text-ink-muted" /> : <ChevronDown size={16} className="text-ink-muted" />}
          </button>
          {modelOpen && (
            <div className="px-5 pb-5">
              <div className="h-px bg-border mb-4" />
              <p className="text-sm text-ink leading-relaxed mb-4">{task.modelAnswer}</p>
              <div className="bg-raised rounded-xl p-3 border border-border">
                <p className="text-xs font-semibold text-ink-muted uppercase tracking-wide mb-1.5">Examiner notes</p>
                <p className="text-xs text-ink-muted leading-relaxed">{task.examinerNotes}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Next */}
      {feedback && !loading && (
        <button
          onClick={onNext}
          className="w-full py-3 bg-brand-500 hover:bg-brand-600 active:opacity-70 text-white font-semibold rounded-xl transition-colors"
        >
          {isLast ? 'Finish session →' : 'Next task →'}
        </button>
      )}
    </div>
  )
}
