import { STATUS_LABELS, STATUS_COLORS } from '../../constants'

export default function StatusBadge({ status, className = '' }) {
  const label = STATUS_LABELS[status] ?? status
  const color = STATUS_COLORS[status] ?? 'bg-gray-100 text-gray-600'

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full
        text-[12px] font-semibold tracking-wide
        ${color} ${className}
      `}
    >
      {label}
    </span>
  )
}
