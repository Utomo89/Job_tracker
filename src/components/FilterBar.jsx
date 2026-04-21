import { Search, X, SlidersHorizontal } from 'lucide-react'
import { APPLICATION_STATUS, STATUS_LABELS, JOB_TYPES } from '../constants'

export default function FilterBar({
  search, onSearch,
  filterStatus, onFilterStatus,
  filterType, onFilterType,
  hasActiveFilters, onReset,
  total, filtered,
}) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-surface-200)] rounded-2xl p-4 space-y-3">
      {/* Row 1 — search + reset */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-300)] pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Cari perusahaan, posisi, atau lokasi…"
            className="
              w-full pl-9 pr-4 py-2.5 rounded-xl text-[14px]
              bg-[var(--color-surface-50)] border border-[var(--color-surface-200)]
              placeholder:text-[var(--color-surface-300)]
              focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]/30
              focus:border-[var(--color-brand-500)] transition-all duration-150
            "
          />
          {search && (
            <button
              onClick={() => onSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-400)] hover:text-[var(--color-surface-700)]"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
          >
            <X size={13} />
            Reset
          </button>
        )}
      </div>

      {/* Row 2 — filter chips */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="flex items-center gap-1.5 text-[12px] text-[var(--color-surface-600)] font-medium">
          <SlidersHorizontal size={12} />
          Filter:
        </span>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => onFilterStatus(e.target.value)}
          className={`
            px-3 py-1.5 rounded-full text-[12px] font-semibold cursor-pointer
            border transition-all duration-150 focus:outline-none
            ${filterStatus
              ? 'bg-[var(--color-brand-500)] text-white border-[var(--color-brand-500)]'
              : 'bg-[var(--color-surface-100)] text-[var(--color-surface-700)] border-[var(--color-surface-200)] hover:border-[var(--color-surface-300)]'
            }
          `}
        >
          <option value="">Semua Status</option>
          {Object.entries(STATUS_LABELS).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>

        {/* Tipe pekerjaan filter */}
        <select
          value={filterType}
          onChange={(e) => onFilterType(e.target.value)}
          className={`
            px-3 py-1.5 rounded-full text-[12px] font-semibold cursor-pointer
            border transition-all duration-150 focus:outline-none
            ${filterType
              ? 'bg-[var(--color-brand-500)] text-white border-[var(--color-brand-500)]'
              : 'bg-[var(--color-surface-100)] text-[var(--color-surface-700)] border-[var(--color-surface-200)] hover:border-[var(--color-surface-300)]'
            }
          `}
        >
          <option value="">Semua Tipe</option>
          {JOB_TYPES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Result count */}
        <span className="ml-auto text-[12px] text-[var(--color-surface-600)]">
          {filtered !== total
            ? <><strong className="text-[var(--color-surface-900)]">{filtered}</strong> dari {total} lamaran</>
            : <><strong className="text-[var(--color-surface-900)]">{total}</strong> lamaran</>
          }
        </span>
      </div>
    </div>
  )
}
