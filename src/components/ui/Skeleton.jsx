import clsx from 'clsx'

export default function Skeleton({ className = '', height = 'h-4', rounded = 'rounded-lg' }) {
  return (
    <div className={clsx('animate-pulse bg-border', height, rounded, className)} />
  )
}
