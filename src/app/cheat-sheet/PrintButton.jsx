'use client'

import { Printer } from 'lucide-react'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-4 py-3 bg-card rounded-xl text-sm font-semibold text-ink hover:bg-raised active:opacity-70 transition-colors print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <Printer size={16} />
      Print / Save PDF
    </button>
  )
}
