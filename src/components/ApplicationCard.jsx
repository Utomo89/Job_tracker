import { useNavigate } from 'react-router-dom'
import { MapPin, Calendar, ExternalLink, AlertTriangle, Clock, Briefcase } from 'lucide-react'
import StatusBadge from './ui/StatusBadge'
import { formatDate, isDeadlineSoon, isDeadlinePassed } from '../utils'
import { JOB_TYPES } from '../constants'

function getJobTypeLabel(val) {
  return JOB_TYPES.find((t) => t.value === val)?.label ?? val
}

export default function ApplicationCard({ app, selected, onSelect }) {
  const navigate = useNavigate()
  const deadlineSoon = isDeadlineSoon(app.deadlineDate)
  const deadlinePassed = isDeadlinePassed(app.deadlineDate)

  return (
    <div
      onClick={() => navigate(`/applications/${app.id}`)}
      className={`
        group relative bg-white rounded-2xl border transition-all duration-150 cursor-pointer
        hover:shadow-md hover:shadow-black/5 hover:-translate-y-0.5
        ${selected
          ? 'border-[var(--color-brand-500)] ring-2 ring-[var(--color-brand-500)]/20'
          : 'border-[var(--color-surface-200)] hover:border-[var(--color-surface-300)]'
        }
      `}
    >
      {/* Deadline warning strip */}
      {(deadlineSoon || deadlinePassed) && (
        <div className={`
          absolute top-0 left-0 right-0 h-1 rounded-t-2xl
          ${deadlinePassed ? 'bg-red-400' : 'bg-amber-400'}
        `} />
      )}

      <div className="p-4 pt-5">
        {/* Header row */}
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <div
            onClick={(e) => { e.stopPropagation(); onSelect(app.id) }}
            className={`
              mt-0.5 w-4 h-4 rounded-md border-2 flex-shrink-0 flex items-center justify-center
              transition-all duration-150 cursor-pointer
              ${selected
                ? 'bg-[var(--color-brand-500)] border-[var(--color-brand-500)]'
                : 'border-[var(--color-surface-300)] group-hover:border-[var(--color-brand-400)]'
              }
            `}
          >
            {selected && (
              <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>

          {/* Company avatar */}
          <div className="w-9 h-9 rounded-xl bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center flex-shrink-0">
            <span
              className="text-[13px] font-bold text-[var(--color-brand-600)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {app.company?.charAt(0)?.toUpperCase() ?? '?'}
            </span>
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-[14px] text-[var(--color-surface-900)] truncate leading-tight">
              {app.position}
            </p>
            <p className="text-[13px] text-[var(--color-surface-600)] truncate mt-0.5">
              {app.company}
            </p>
          </div>

          {/* Status badge */}
          <StatusBadge status={app.status} className="flex-shrink-0" />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 ml-7 pl-3">
          {app.location && (
            <span className="flex items-center gap-1 text-[12px] text-[var(--color-surface-600)]">
              <MapPin size={11} className="text-[var(--color-surface-400)]" />
              {app.location}
            </span>
          )}
          <span className="flex items-center gap-1 text-[12px] text-[var(--color-surface-600)]">
            <Calendar size={11} className="text-[var(--color-surface-400)]" />
            {formatDate(app.appliedDate)}
          </span>
          {app.jobType && (
            <span className="flex items-center gap-1 text-[12px] text-[var(--color-surface-600)]">
              <Briefcase size={11} className="text-[var(--color-surface-400)]" />
              {getJobTypeLabel(app.jobType)}
            </span>
          )}
          {app.source && (
            <span className="text-[12px] text-[var(--color-surface-400)] italic">
              via {app.source}
            </span>
          )}
        </div>

        {/* Deadline warning */}
        {app.deadlineDate && (
          <div className={`
            flex items-center gap-1.5 mt-2.5 ml-7 pl-3 text-[12px] font-medium
            ${deadlinePassed ? 'text-red-500' : deadlineSoon ? 'text-amber-600' : 'text-[var(--color-surface-500)]'}
          `}>
            {(deadlineSoon || deadlinePassed) ? (
              <AlertTriangle size={11} />
            ) : (
              <Clock size={11} />
            )}
            Deadline: {formatDate(app.deadlineDate)}
            {deadlinePassed && ' · Lewat!'}
            {deadlineSoon && !deadlinePassed && ' · Segera!'}
          </div>
        )}

        {/* Footer — URL shortcut */}
        {app.jobUrl && (
          <div className="mt-3 ml-7 pl-3">
            <a
              href={app.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[12px] text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)] transition-colors"
            >
              <ExternalLink size={11} />
              Lihat lowongan
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
