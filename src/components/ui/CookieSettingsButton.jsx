'use client'

// Re-opens the Google Funding Choices consent message so UK/EEA visitors can
// change or withdraw their choice as easily as they gave it (ICO guidance).
function openConsentSettings() {
  window.googlefc = window.googlefc || {}
  window.googlefc.callbackQueue = window.googlefc.callbackQueue || []
  window.googlefc.callbackQueue.push(() => window.googlefc.showRevocationMessage())
}

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={openConsentSettings}
      className="text-xs text-ink-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded"
    >
      Cookie settings
    </button>
  )
}
