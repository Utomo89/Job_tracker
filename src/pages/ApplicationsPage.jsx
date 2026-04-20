import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Plus, Trash2, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'
import { useApplicationFilter } from '../hooks/useApplicationFilter'
import FilterBar from '../components/FilterBar'
import ApplicationCard from '../components/ApplicationCard'
import EmptyState from '../components/EmptyState'
import DeleteDialog from '../components/DeleteDialog'
import Button from '../components/ui/Button'
import StatusBadge from '../components/ui/StatusBadge'
import { formatDate } from '../utils'
import { JOB_TYPES } from '../constants'

function getJobTypeLabel(val) {
  return JOB_TYPES.find((t) => t.value === val)?.label ?? val
}

function SortIcon({ col, sortBy, sortDir }) {
  if (sortBy !== col) return <ChevronsUpDown size={13} className="text-[var(--color-surface-300)]" />
  return sortDir === 'asc'
    ? <ChevronUp size={13} className="text-[var(--color-brand-500)]" />
    : <ChevronDown size={13} className="text-[var(--color-brand-500)]" />
}

// ─── View mode toggle ────────────────────────────────────────────────────────
const VIEW_MODES = [
  { key: 'card', icon: '⊞', label: 'Kartu' },
  { key: 'table', icon: '☰', label: 'Tabel' },
]

export default function ApplicationsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { applications, deleteApplications } = useApplications()

  const {
    filtered,
    search, setSearch,
    filterStatus, setFilterStatus,
    filterType, setFilterType,
    sortBy, sortDir, toggleSort,
    resetFilters, hasActiveFilters,
  } = useApplicationFilter(applications)

  // Apply ?status= from URL (e.g. from sidebar quick links)
  useEffect(() => {
    const s = searchParams.get('status')
    if (s) setFilterStatus(s)
  }, [searchParams])

  const [viewMode, setViewMode] = useState('card')
  const [selected, setSelected] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const toggleSelect = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  const toggleSelectAll = () => {
    if (selected.length === filtered.length) setSelected([])
    else setSelected(filtered.map((a) => a.id))
  }

  const handleDelete = () => {
    deleteApplications(selected)
    setSelected([])
    setShowDeleteDialog(false)
  }

  const allSelected = filtered.length > 0 && selected.length === filtered.length
  const someSelected = selected.length > 0

  return (
    <div className="space-y-4 max-w-5xl">

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Bulk action or view toggle */}
        <div className="flex items-center gap-2">
          {someSelected ? (
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 size={14} />
              Hapus {selected.length} Dipilih
            </Button>
          ) : (
            <div className="flex rounded-xl overflow-hidden border border-[var(--color-surface-200)] bg-white">
              {VIEW_MODES.map(({ key, icon, label }) => (
                <button
                  key={key}
                  onClick={() => setViewMode(key)}
                  title={label}
                  className={`
                    px-3 py-2 text-sm transition-colors
                    ${viewMode === key
                      ? 'bg-[var(--color-brand-500)] text-white'
                      : 'text-[var(--color-surface-600)] hover:bg-[var(--color-surface-50)]'
                    }
                  `}
                >
                  {icon}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button size="sm" onClick={() => navigate('/applications/new')}>
          <Plus size={15} />
          Tambah Lamaran
        </Button>
      </div>

      {/* Filter bar */}
      <FilterBar
        search={search} onSearch={setSearch}
        filterStatus={filterStatus} onFilterStatus={setFilterStatus}
        filterType={filterType} onFilterType={setFilterType}
        hasActiveFilters={hasActiveFilters} onReset={resetFilters}
        total={applications.length} filtered={filtered.length}
      />

      {/* Content */}
      {filtered.length === 0 ? (
        <EmptyState hasFilters={hasActiveFilters} onReset={resetFilters} />
      ) : viewMode === 'card' ? (
        /* ── CARD VIEW ── */
        <div>
          {/* Select all bar */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <button
              onClick={toggleSelectAll}
              className={`
                w-4 h-4 rounded-md border-2 flex items-center justify-center
                transition-all duration-150 flex-shrink-0
                ${allSelected
                  ? 'bg-[var(--color-brand-500)] border-[var(--color-brand-500)]'
                  : 'border-[var(--color-surface-300)] hover:border-[var(--color-brand-400)]'
                }
              `}
            >
              {allSelected && (
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                  <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
            <span className="text-[12px] text-[var(--color-surface-600)]">
              {someSelected ? `${selected.length} dipilih` : 'Pilih semua'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                selected={selected.includes(app.id)}
                onSelect={toggleSelect}
              />
            ))}
          </div>
        </div>
      ) : (
        /* ── TABLE VIEW ── */
        <div className="bg-white border border-[var(--color-surface-200)] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="border-b border-[var(--color-surface-100)] bg-[var(--color-surface-50)]">
                  <th className="w-10 px-4 py-3 text-left">
                    <button
                      onClick={toggleSelectAll}
                      className={`
                        w-4 h-4 rounded-md border-2 flex items-center justify-center
                        transition-all duration-150
                        ${allSelected
                          ? 'bg-[var(--color-brand-500)] border-[var(--color-brand-500)]'
                          : 'border-[var(--color-surface-300)] hover:border-[var(--color-brand-400)]'
                        }
                      `}
                    >
                      {allSelected && (
                        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </th>
                  {[
                    { col: 'company', label: 'Perusahaan' },
                    { col: 'position', label: 'Posisi' },
                    { col: 'location', label: 'Lokasi' },
                    { col: 'appliedDate', label: 'Tgl Lamar' },
                    { col: 'status', label: 'Status' },
                  ].map(({ col, label }) => (
                    <th
                      key={col}
                      onClick={() => toggleSort(col)}
                      className="px-4 py-3 text-left font-semibold text-[var(--color-surface-600)] uppercase tracking-wider text-[11px] cursor-pointer select-none hover:text-[var(--color-surface-900)] transition-colors"
                    >
                      <span className="flex items-center gap-1">
                        {label}
                        <SortIcon col={col} sortBy={sortBy} sortDir={sortDir} />
                      </span>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left font-semibold text-[var(--color-surface-600)] uppercase tracking-wider text-[11px]">
                    Tipe
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-surface-100)]">
                {filtered.map((app) => (
                  <tr
                    key={app.id}
                    onClick={() => navigate(`/applications/${app.id}`)}
                    className={`
                      cursor-pointer transition-colors
                      ${selected.includes(app.id)
                        ? 'bg-[var(--color-brand-50)]'
                        : 'hover:bg-[var(--color-surface-50)]'
                      }
                    `}
                  >
                    <td className="px-4 py-3" onClick={(e) => { e.stopPropagation(); toggleSelect(app.id) }}>
                      <div
                        className={`
                          w-4 h-4 rounded-md border-2 flex items-center justify-center
                          transition-all duration-150
                          ${selected.includes(app.id)
                            ? 'bg-[var(--color-brand-500)] border-[var(--color-brand-500)]'
                            : 'border-[var(--color-surface-300)]'
                          }
                        `}
                      >
                        {selected.includes(app.id) && (
                          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                            <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center flex-shrink-0">
                          <span className="text-[11px] font-bold text-[var(--color-brand-600)]">
                            {app.company?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                        <span className="font-semibold text-[var(--color-surface-900)] truncate max-w-[120px]">
                          {app.company}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[var(--color-surface-700)] truncate max-w-[140px]">
                      {app.position}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-surface-600)]">
                      {app.location ?? '-'}
                    </td>
                    <td className="px-4 py-3 text-[var(--color-surface-600)]">
                      {formatDate(app.appliedDate)}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-4 py-3 text-[var(--color-surface-600)]">
                      {app.jobType ? getJobTypeLabel(app.jobType) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete dialog */}
      {showDeleteDialog && (
        <DeleteDialog
          count={selected.length}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  )
}
