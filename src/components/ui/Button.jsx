import clsx from 'clsx'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'

  const variants = {
    primary:   'bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500',
    secondary: 'bg-card border border-border text-ink hover:bg-raised focus-visible:ring-brand-500',
    success:   'bg-success text-white hover:bg-green-600 focus-visible:ring-success',
    danger:    'bg-danger text-white hover:bg-red-600 focus-visible:ring-danger',
    ghost:     'bg-transparent text-ink-muted hover:text-ink hover:bg-raised focus-visible:ring-brand-500',
    xp:        'bg-xp text-white hover:bg-amber-500 focus-visible:ring-xp',
  }

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-11 px-6 text-base',
    lg: 'h-13 px-8 text-lg',
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  )
}
