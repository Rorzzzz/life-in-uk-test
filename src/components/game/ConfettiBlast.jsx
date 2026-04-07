'use client'

import { useEffect } from 'react'

export default function ConfettiBlast({ trigger }) {
  useEffect(() => {
    if (!trigger) return
    import('canvas-confetti').then(({ default: confetti }) => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3381ff', '#22d07a', '#f59e0b', '#ff4d6d', '#a855f7'],
      })
    })
  }, [trigger])

  return null
}
