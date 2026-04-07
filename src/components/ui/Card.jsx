import clsx from 'clsx'

export default function Card({ children, className = '', raised = false, onClick, ...props }) {
  const base = 'rounded-2xl p-5 transition-colors'
  const bg   = raised ? 'bg-raised' : 'bg-card'
  const interactive = onClick ? 'cursor-pointer hover:bg-raised active:scale-[0.99]' : ''

  return (
    <div
      className={clsx(base, bg, interactive, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}
