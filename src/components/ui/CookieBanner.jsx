'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const CONSENT_KEY = 'ptukt_consent'

export function updateConsent(granted) {
  if (typeof window === 'undefined' || !window.gtag) return
  const value = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  })
}

export function resetConsent() {
  try { localStorage.removeItem(CONSENT_KEY) } catch {}
  window.dispatchEvent(new CustomEvent('show-cookie-banner'))
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function show() { setVisible(true) }
    window.addEventListener('show-cookie-banner', show)
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
    return () => window.removeEventListener('show-cookie-banner', show)
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
        <p className="text-sm font-bold text-ink mb-1">Ads keep this site completely free</p>
        <p className="text-xs text-ink-muted leading-relaxed mb-3">
          Accepting personalised ads helps us stay free — no sign-up, no paywall, ever.
          We don&apos;t sell your data. Google serves the ads.{' '}
          <Link href="/privacy-policy" className="text-brand-400 underline">Privacy policy</Link>
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={accept}
            className="flex-1 py-2.5 bg-brand-500 hover:bg-brand-400 active:opacity-70 text-white text-xs font-bold rounded-xl transition-colors"
          >
            Accept — keep it free
          </button>
          <button
            type="button"
            onClick={reject}
            className="flex-1 py-2.5 bg-raised hover:bg-border active:opacity-70 text-ink-muted text-xs rounded-xl transition-colors border border-border"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}
