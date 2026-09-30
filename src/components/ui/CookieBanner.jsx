'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'ptukt_consent'

function updateConsent(granted) {
  if (typeof window === 'undefined' || !window.gtag) return
  const value = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  })
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (!stored) {
        setVisible(true)
      } else {
        updateConsent(stored === 'accepted')
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try { localStorage.setItem(CONSENT_KEY, 'accepted') } catch {}
    updateConsent(true)
    setVisible(false)
  }

  function reject() {
    try { localStorage.setItem(CONSENT_KEY, 'rejected') } catch {}
    updateConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-16 md:bottom-4 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-sm mx-auto md:mx-0 md:ml-4 bg-card border border-border rounded-2xl p-4 shadow-2xl pointer-events-auto">
        <p className="text-sm font-semibold text-ink mb-1">This site uses cookies</p>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">
          We use analytics and advertising cookies to keep the site free.{' '}
          <Link href="/privacy-policy" className="text-brand-400 underline">Privacy policy</Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={accept}
            className="flex-1 py-2.5 bg-brand-500 hover:bg-brand-400 active:opacity-70 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Accept all
          </button>
          <button
            type="button"
            onClick={reject}
            className="flex-1 py-2.5 bg-raised hover:bg-border active:opacity-70 text-ink-muted text-sm rounded-xl transition-colors border border-border"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}
