export function DetailSection({ title, icon: Icon, children }) {
  return (
    <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-surface-200)] overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[var(--color-surface-100)]">
        <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-50)] flex items-center justify-center">
          <Icon size={14} className="text-[var(--color-brand-500)]" />
        </div>
        <h3 className="text-[13px] font-bold text-[var(--color-surface-700)] uppercase tracking-widest">
          {title}
        </h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

export function DetailGrid({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {children}
    </div>
  )
}

export function DetailRow({ label, value, span = 1, className = '' }) {
  return (
    <div className={span === 2 ? 'sm:col-span-2' : ''}>
      <p className="text-[11px] font-semibold text-[var(--color-surface-400)] uppercase tracking-widest mb-1">
        {label}
      </p>
      <p className={`text-[14px] text-[var(--color-surface-900)] font-medium ${className}`}>
        {value || <span className="text-[var(--color-surface-300)] font-normal italic">—</span>}
      </p>
    </div>
  )
}
