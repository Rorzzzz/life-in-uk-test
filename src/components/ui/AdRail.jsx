'use client'

import AdSlot from '@/components/ui/AdSlot'
import { AD_SLOTS } from '@/data/ads'

// Desktop (≥1024px): content column + sticky 300×600 ad rail.
// Mobile: single column, rail not rendered (no ad requested).
export default function AdRail({ children }) {
  return (
    <div className="max-w-2xl lg:max-w-[1040px] mx-auto px-4 py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
      <div className="min-w-0">{children}</div>
      <div className="hidden lg:block">
        <div className="sticky top-24">
          <AdSlot slot={AD_SLOTS.sidebar} heightClass="h-[600px]" minWidth={1024} />
        </div>
      </div>
    </div>
  )
}
