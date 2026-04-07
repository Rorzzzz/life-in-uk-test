'use client'

// useAudioNarration — Web Speech API wrapper
// Reads question text aloud in British English
// Gap 1: accessibility + study feature

import { useState, useCallback, useRef } from 'react'

export function useAudioNarration() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported] = useState(() => {
    if (typeof window === 'undefined') return false
    return 'speechSynthesis' in window
  })
  const utteranceRef = useRef(null)

  const speak = useCallback((text) => {
    if (!isSupported || !text) return

    // Stop any current speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang  = 'en-GB'
    utterance.rate  = 0.9
    utterance.pitch = 1.0
    utterance.volume = 1.0

    // Try to find a British English voice
    const voices = window.speechSynthesis.getVoices()
    const britishVoice = voices.find(v =>
      v.lang === 'en-GB' && v.localService
    ) || voices.find(v => v.lang === 'en-GB')
    if (britishVoice) utterance.voice = britishVoice

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend   = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [isSupported])

  const stop = useCallback(() => {
    if (!isSupported) return
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [isSupported])

  const toggle = useCallback((text) => {
    if (isSpeaking) {
      stop()
    } else {
      speak(text)
    }
  }, [isSpeaking, speak, stop])

  return { speak, stop, toggle, isSpeaking, isSupported }
}
