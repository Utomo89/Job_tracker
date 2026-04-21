import { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { APPLICATION_STATUS, STATUS_LABELS, STATUS_COLORS } from '../../constants'

export default function QuickStatusUpdate({ currentStatus, onUpdate }) {
  const [open, setOpen] = useState(false)

  const handleSelect = (status) => {
    if (status !== currentStatus) onUpdate(status)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`
          inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[13px] font-semibold
          border-2 border-transparent cursor-pointer transition-all duration-150
          hover:opacity-80 focus:outline-none
          ${STATUS_COLORS[currentStatus]}
        `}
      >
        {STATUS_LABELS[currentStatus]}
        <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-1.5 z-20 bg-[var(--color-card)] border border-[var(--color-surface-200)] rounded-xl shadow-lg py-1 min-w-[160px] overflow-hidden">
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <button
                key={value}
                onClick={() => handleSelect(value)}
                className={`
                  w-full flex items-center justify-between gap-3
                  px-3 py-2 text-[13px] font-medium text-left
                  hover:bg-[var(--color-surface-50)] transition-colors
                  ${value === currentStatus ? 'text-[var(--color-brand-500)]' : 'text-[var(--color-surface-700)]'}
                `}
              >
                <span className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${STATUS_COLORS[value].split(' ')[0].replace('bg-', 'bg-').replace('100', '400')}`} />
                  {label}
                </span>
                {value === currentStatus && <Check size={13} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
