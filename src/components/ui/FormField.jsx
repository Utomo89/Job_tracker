/**
 * Reusable form primitives — semua pakai forwardRef agar kompatibel
 * dengan react-hook-form register().
 */

export function Label({ children, required, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-[13px] font-semibold text-[var(--color-surface-700)] mb-1.5"
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}

export function FieldError({ message }) {
  if (!message) return null
  return (
    <p className="mt-1.5 text-[12px] text-red-500 font-medium flex items-center gap-1">
      <span>⚠</span> {message}
    </p>
  )
}

export function FieldHint({ children }) {
  return (
    <p className="mt-1 text-[11px] text-[var(--color-surface-600)]">{children}</p>
  )
}

const inputBase = `
  w-full px-3 py-2.5 rounded-xl text-[14px] text-[var(--color-surface-900)]
  bg-[var(--color-input-bg)] border border-[var(--color-surface-200)]
  placeholder:text-[var(--color-surface-300)]
  focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/30
  focus:border-[var(--color-brand-500)]
  transition-all duration-150
  disabled:bg-[var(--color-surface-100)] disabled:text-[var(--color-surface-600)]
`.trim()

const inputError = `border-red-400 focus:ring-red-400/30 focus:border-red-400`

export function Input({ error, className = '', ...props }) {
  return (
    <input
      className={`${inputBase} ${error ? inputError : ''} ${className}`}
      {...props}
    />
  )
}

export function Textarea({ error, rows = 3, className = '', ...props }) {
  return (
    <textarea
      rows={rows}
      className={`${inputBase} resize-none ${error ? inputError : ''} ${className}`}
      {...props}
    />
  )
}

export function Select({ error, children, className = '', ...props }) {
  return (
    <select
      className={`${inputBase} cursor-pointer ${error ? inputError : ''} ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

export function FormGroup({ children, className = '' }) {
  return <div className={`flex flex-col ${className}`}>{children}</div>
}
