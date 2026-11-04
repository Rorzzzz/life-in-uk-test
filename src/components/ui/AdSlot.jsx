'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { AD_CLIENT } from '@/data/ads'

const IS_DEV = process.env.NODE_ENV === 'development'

// Lazy loading: request the ad only when its box is within this distance of the
// viewport. Fewer never-seen impressions -> higher viewability and price per
// impression (added 2026-11-04). Ads already on screen load immediately.
const LAZY_ROOT_MARGIN = '500px 0px'

/**
 * Manual AdSense unit with a fixed-height reserved box (zero CLS).
 *
 * - `refreshKey`: change it to request a NEW ad (remounts the <ins>). Only change
 *   it in response to a user action (e.g. Next click) — never on a timer.
 * - `minWidth`: only render when the viewport is at least this wide (e.g. 1024
 *   for the desktop sidebar), so we never request an ad into a hidden box.
 * - `maxWidth`: only render when the viewport is at most this wide (phones-only units).
 * - `heightClass`: Tailwind height for the reserved box + ad (fixed size).
 * - Lazy-loaded: the ad is requested when the box comes within LAZY_ROOT_MARGIN
 *   of the viewport (immediately if already visible, or if IntersectionObserver
 *   isn't supported).
 */
export default function AdSlot({ slot, refreshKey = 0, heightClass = 'h-[250px]', minWidth = 0, maxWidth = 0, showLabel = true, className }) {
  const responsive = minWidth > 0 || maxWidth > 0
  const [enabled, setEnabled] = useState(!responsive)
  const boxRef = useRef(null)

  useEffect(() => {
    if (!responsive) return
    const query = [minWidth > 0 && `(min-width: ${minWidth}px)`, maxWidth > 0 && `(max-width: ${maxWidth}px)`].filter(Boolean).join(' and ')
    const mq = window.matchMedia(query)
    setEnabled(mq.matches)
    const onChange = e => setEnabled(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [responsive, minWidth, maxWidth])

  useEffect(() => {
    if (!slot || !enabled) return
    let loaded = false
    const load = () => {
      if (loaded) return
      loaded = true
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        if (IS_DEV) console.warn('[AdSlot]', err)
      }
    }
    const box = boxRef.current
    if (!box || typeof IntersectionObserver === 'undefined') { load(); return }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { io.disconnect(); load() }
    }, { rootMargin: LAZY_ROOT_MARGIN })
    io.observe(box)
    return () => io.disconnect()
  }, [slot, enabled, refreshKey])

  if (!enabled) return null
  if (!slot && !IS_DEV) return null

  return (
    <aside aria-label="Advertisements" className={clsx('w-full print:hidden', className)}>
      {showLabel && (
        <p className="text-[10px] uppercase tracking-wider text-ink-muted text-center mb-1 select-none">
          Advertisements
        </p>
      )}
      <div ref={boxRef} className={clsx('w-full overflow-hidden rounded-xl', heightClass)}>
        {slot ? (
          <ins
            key={refreshKey}
            className={clsx('adsbygoogle block w-full', heightClass)}
            data-ad-client={AD_CLIENT}
            data-ad-slot={slot}
          />
        ) : (
          <div className="w-full h-full border-2 border-dashed border-border rounded-xl flex items-center justify-center text-xs text-ink-muted">
            Ad slot (dev placeholder) · refresh #{refreshKey}
          </div>
        )}
      </div>
    </aside>
  )
}
