const variants = {
  primary: `
    bg-[var(--color-brand-500)] text-white
    hover:bg-[var(--color-brand-600)] active:bg-[var(--color-brand-700)]
    shadow-sm shadow-brand-500/20
  `,
  secondary: `
    bg-white text-[var(--color-surface-700)] border border-[var(--color-surface-200)]
    hover:bg-[var(--color-surface-50)] active:bg-[var(--color-surface-100)]
  `,
  danger: `
    bg-red-500 text-white
    hover:bg-red-600 active:bg-red-700
  `,
  ghost: `
    bg-transparent text-[var(--color-surface-600)]
    hover:bg-[var(--color-surface-100)] active:bg-[var(--color-surface-200)]
  `,
}

const sizes = {
  sm: 'px-3 py-1.5 text-[13px]',
  md: 'px-4 py-2.5 text-[14px]',
  lg: 'px-5 py-3 text-[15px]',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled,
  loading,
  children,
  ...props
}) {
  return (
    <button
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold rounded-xl
        transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}
