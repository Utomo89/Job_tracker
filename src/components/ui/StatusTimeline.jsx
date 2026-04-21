import { Check, X } from 'lucide-react'
import { APPLICATION_STATUS, STATUS_LABELS } from '../../constants'

// Urutan alur normal (bukan rejected/withdrawn)
const FLOW = [
  APPLICATION_STATUS.APPLIED,
  APPLICATION_STATUS.REVIEW,
  APPLICATION_STATUS.INTERVIEW,
  APPLICATION_STATUS.OFFER,
]

export default function StatusTimeline({ status }) {
  const isTerminal =
    status === APPLICATION_STATUS.REJECTED ||
    status === APPLICATION_STATUS.WITHDRAWN

  const currentIdx = FLOW.indexOf(status)

  return (
    <div className="w-full">
      {/* Flow steps */}
      <div className="flex items-center gap-0">
        {FLOW.map((step, idx) => {
          const isDone = isTerminal ? false : idx < currentIdx
          const isActive = !isTerminal && idx === currentIdx
          const isFuture = isTerminal ? true : idx > currentIdx

          return (
            <div key={step} className="flex items-center flex-1 min-w-0">
              {/* Node */}
              <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    border-2 transition-all duration-200
                    ${isDone
                      ? 'bg-[var(--color-brand-500)] border-[var(--color-brand-500)]'
                      : isActive
                        ? 'bg-[var(--color-card)] border-[var(--color-brand-500)] shadow-md shadow-brand-500/20'
                        : 'bg-[var(--color-card)] border-[var(--color-surface-200)]'
                    }
                  `}
                >
                  {isDone ? (
                    <Check size={13} className="text-white" strokeWidth={2.5} />
                  ) : (
                    <span
                      className={`text-[11px] font-bold ${
                        isActive
                          ? 'text-[var(--color-brand-500)]'
                          : 'text-[var(--color-surface-300)]'
                      }`}
                    >
                      {idx + 1}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-semibold text-center leading-tight whitespace-nowrap
                    ${isDone
                      ? 'text-[var(--color-brand-500)]'
                      : isActive
                        ? 'text-[var(--color-surface-900)]'
                        : 'text-[var(--color-surface-300)]'
                    }
                  `}
                >
                  {STATUS_LABELS[step]}
                </span>
              </div>

              {/* Connector line (not after last) */}
              {idx < FLOW.length - 1 && (
                <div
                  className={`
                    flex-1 h-0.5 mx-1 mb-5 rounded-full transition-all duration-300
                    ${isDone ? 'bg-[var(--color-brand-500)]' : 'bg-[var(--color-surface-200)]'}
                  `}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Terminal state badge */}
      {isTerminal && (
        <div className={`
          mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-semibold
          ${status === APPLICATION_STATUS.REJECTED
            ? 'bg-red-100 text-red-700'
            : 'bg-[var(--color-surface-100)] text-[var(--color-surface-700)]'
          }
        `}>
          <X size={12} strokeWidth={2.5} />
          {STATUS_LABELS[status]}
        </div>
      )}
    </div>
  )
}
