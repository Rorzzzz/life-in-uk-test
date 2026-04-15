'use client'

import { m, AnimatePresence } from 'framer-motion'

export default function Toast({ message, type = 'info', visible }) {
  const colours = {
    success: 'bg-success text-white',
    error:   'bg-danger text-white',
    info:    'bg-brand-500 text-white',
    xp:      'bg-xp text-white',
  }

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className={`fixed bottom-24 left-1/2 z-50 flex items-center gap-2 rounded-xl px-5 py-3 shadow-lg font-semibold text-sm ${colours[type]}`}
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          transition={{ duration: 0.25 }}
        >
          {message}
        </m.div>
      )}
    </AnimatePresence>
  )
}
