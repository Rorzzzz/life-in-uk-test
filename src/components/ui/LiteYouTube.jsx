'use client'

import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

export default function LiteYouTube({ videoId, title, className = '' }) {
  const [activated, setActivated] = useState(false)

  if (activated) {
    return (
      <div className={clsx('relative w-full aspect-video rounded-2xl overflow-hidden', className)}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setActivated(true)}
      className={clsx(
        'relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500',
        className
      )}
      aria-label={`Play ${title}`}
    >
      <Image
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 672px"
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 bg-red-600 group-hover:bg-red-500 rounded-full flex items-center justify-center shadow-xl transition-transform duration-200 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white ml-1" aria-hidden="true">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </button>
  )
}
