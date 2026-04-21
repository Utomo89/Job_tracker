import { useNavigate } from 'react-router-dom'
import { APPLICATION_STATUS, STATUS_LABELS } from '../../constants'

const STATUS_META = [
  { key: APPLICATION_STATUS.APPLIED,   color: '#60a5fa', bg: 'bg-blue-400' },
  { key: APPLICATION_STATUS.REVIEW,    color: '#fbbf24', bg: 'bg-amber-400' },
  { key: APPLICATION_STATUS.INTERVIEW, color: '#34d399', bg: 'bg-green-400' },
  { key: APPLICATION_STATUS.OFFER,     color: '#a78bfa', bg: 'bg-purple-400' },
  { key: APPLICATION_STATUS.REJECTED,  color: '#f87171', bg: 'bg-red-400' },
  { key: APPLICATION_STATUS.WITHDRAWN, color: '#9ca3af', bg: 'bg-gray-400' },
]

export default function StatusBreakdown({ byStatus, total }) {
  const navigate = useNavigate()

  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-24 text-[var(--color-surface-300)] text-sm">
        Belum ada data
      </div>
    )
  }

  return (
    <div className="space-y-2.5">
      {STATUS_META.map(({ key, color, bg }) => {
        const count = byStatus[key] ?? 0
        const pct = total > 0 ? Math.round((count / total) * 100) : 0

        return (
          <button
            key={key}
            onClick={() => navigate(`/applications?status=${key}`)}
            className="w-full flex items-center gap-3 group"
          >
            {/* Label + count */}
            <div className="flex items-center gap-2 w-32 flex-shrink-0">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${bg}`} />
              <span className="text-[12px] font-semibold text-[var(--color-surface-700)] group-hover:text-[var(--color-surface-900)] transition-colors truncate">
                {STATUS_LABELS[key]}
              </span>
            </div>

            {/* Bar */}
            <div className="flex-1 h-2 bg-[var(--color-surface-100)] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>

            {/* Count + pct */}
            <div className="flex items-center gap-1.5 w-16 flex-shrink-0 justify-end">
              <span className="text-[13px] font-bold text-[var(--color-surface-900)]">{count}</span>
              <span className="text-[11px] text-[var(--color-surface-400)]">({pct}%)</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}
