'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { AD_CLIENT, AD_SLOTS } from '@/data/ads'

const IS_DEV = process.env.NODE_ENV === 'development'

/**
 * AdSense Multiplex unit (grid of native-style ads) for the END of content:
 * after an article, the cheat sheet, or a mock-test review. Never mid-content
 * and never next to buttons. Lazy-loaded like AdSlot; a new ad per real page.
 * Renders nothing until AD_SLOTS.multiplex is set.
 */
export default function MultiplexAd({ id = 'end', className }) {
  const pathname = usePathname()
  const boxRef = useRef(null)
  const slot = AD_SLOTS.multiplex
  const key = `${pathname}#${id}`

  useEffect(() => {
    if (!slot) return
    let loaded = false
    const load = () => {
      if (loaded) return
      loaded = true
      try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch (err) { if (IS_DEV) console.warn('[MultiplexAd]', err) }
    }
    const box = boxRef.current
    if (!box || typeof IntersectionObserver === 'undefined') { load(); return }
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); load() } }, { rootMargin: '500px 0px' })
    io.observe(box)
    return () => io.disconnect()
  }, [slot, key])

  if (!slot) return null
  return (
    <aside aria-label="Advertisements" className={clsx('w-full print:hidden', className)}>
      <p className="text-[10px] uppercase tracking-wider text-ink-muted text-center mb-1 select-none">Advertisements</p>
      {/* min-height reserves space so the page doesn't jump when the grid loads */}
      <div ref={boxRef} className="w-full min-h-[300px]">
        <ins key={key} className="adsbygoogle block w-full" data-ad-client={AD_CLIENT} data-ad-slot={slot} data-ad-format="autorelaxed" />
      </div>
    </aside>
  )
}
