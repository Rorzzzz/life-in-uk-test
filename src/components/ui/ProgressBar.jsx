'use client'

import clsx from 'clsx'

export default function ProgressBar({
  value = 0,
  max = 100,
  colour = '#3381ff',
  height = 8,
  showLabel = false,
  label = '',
  animated = true,
  className = '',
  ariaLabel = '',
}) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100)

  return (
    <div className={clsx('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-ink-muted">{label}</span>
          <span className="text-xs font-mono text-ink-muted">{Math.round(pct)}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel || label || 'Progress'}
        className="w-full bg-border rounded-full overflow-hidden"
        style={{ height }}
      >
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: colour,
            width: `${pct}%`,
            transition: animated ? 'width 0.6s ease-out' : 'none',
          }}
        />
      </div>
    </div>
  )
}
