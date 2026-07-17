'use client'

import { Download } from 'lucide-react'

export default function DownloadPdfButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-4 py-3 bg-brand-500 hover:bg-brand-400 rounded-xl text-sm font-semibold text-white active:opacity-70 transition-colors print:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    >
      <Download size={16} />
      Download PDF
    </button>
  )
}
