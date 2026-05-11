'use client'

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'
import clsx from 'clsx'

export default function ShareButton({ url, title, text, compact = false }) {
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = [
    {
      label: 'WhatsApp',
      icon: '💬',
      colour: '#25D366',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    },
    {
      label: 'X / Twitter',
      icon: '𝕏',
      colour: '#000000',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: 'Facebook',
      icon: 'f',
      colour: '#1877F2',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ]

  function handleCopy() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={clsx(
          'flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-raised',
          'text-sm font-medium text-ink-muted hover:text-ink hover:border-brand-500/40 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
          compact && 'px-2'
        )}
        aria-label="Share"
      >
        <Share2 size={15} />
        {!compact && <span>Share</span>}
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 bg-card border border-border rounded-2xl shadow-xl p-2 min-w-[180px]">
            {shareLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-raised transition-colors text-sm text-ink"
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: link.colour }}>
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
            <button
              onClick={handleCopy}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-raised transition-colors text-sm text-ink"
            >
              <span className="w-7 h-7 rounded-lg bg-raised border border-border flex items-center justify-center flex-shrink-0">
                {copied ? <Check size={13} className="text-success" /> : <Share2 size={13} className="text-ink-muted" />}
              </span>
              {copied ? 'Copied!' : 'Copy link'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}
