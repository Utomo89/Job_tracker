import { TrendingUp } from 'lucide-react'

export default function StatCard({ label, value, sub, icon: Icon, accent = 'brand', onClick }) {
  const accents = {
    brand:  { bg: 'bg-[var(--color-brand-50)]',   icon: 'text-[var(--color-brand-500)]',   ring: 'hover:ring-[var(--color-brand-200)]' },
    green:  { bg: 'bg-green-50',   icon: 'text-green-500',   ring: 'hover:ring-green-200' },
    amber:  { bg: 'bg-amber-50',   icon: 'text-amber-500',   ring: 'hover:ring-amber-200' },
    purple: { bg: 'bg-purple-50',  icon: 'text-purple-500',  ring: 'hover:ring-purple-200' },
    red:    { bg: 'bg-red-50',     icon: 'text-red-400',     ring: 'hover:ring-red-200' },
  }
  const a = accents[accent] ?? accents.brand

  return (
    <div
      onClick={onClick}
      className={`
        bg-[var(--color-card)] border border-[var(--color-surface-200)] rounded-2xl p-5
        transition-all duration-150
        ${onClick ? `cursor-pointer hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5 ring-2 ring-transparent ${a.ring}` : ''}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-[var(--color-surface-500)] uppercase tracking-widest">
            {label}
          </p>
          <p
            className="text-[32px] font-bold text-[var(--color-surface-900)] leading-none mt-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {value}
          </p>
          {sub && (
            <p className="text-[12px] text-[var(--color-surface-500)] mt-1.5 leading-snug">
              {sub}
            </p>
          )}
        </div>
        <div className={`w-10 h-10 rounded-xl ${a.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon size={18} className={a.icon} />
        </div>
      </div>
    </div>
  )
}
