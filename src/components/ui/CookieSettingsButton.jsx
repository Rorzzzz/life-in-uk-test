'use client'

import { resetConsent } from './CookieBanner'

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-xs text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
    >
      Cookie settings
    </button>
  )
}
