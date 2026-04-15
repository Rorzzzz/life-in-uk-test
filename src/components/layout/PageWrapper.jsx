'use client'

import { m } from 'framer-motion'

export default function PageWrapper({ children, className = '' }) {
  return (
    <m.div
      className={`max-w-2xl mx-auto px-4 py-6 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </m.div>
  )
}
