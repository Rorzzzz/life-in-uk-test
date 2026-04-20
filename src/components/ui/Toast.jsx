'use client'

export default function Toast({ message, type = 'info', visible }) {
  const colours = {
    success: 'bg-success text-white',
    error:   'bg-danger text-white',
    info:    'bg-brand-500 text-white',
    xp:      'bg-xp text-white',
  }

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-xl px-5 py-3 shadow-lg font-semibold text-sm animate-slide-up ${colours[type]}`}
    >
      {message}
    </div>
  )
}
