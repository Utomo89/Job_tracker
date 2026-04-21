import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  Settings,
  TrendingUp,
  ChevronRight,
} from 'lucide-react'
import { useApplications } from '../../context/ApplicationContext'
import { APPLICATION_STATUS, STATUS_LABELS } from '../../constants'

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/applications', icon: BriefcaseBusiness, label: 'Lamaran Saya', end: false },
]

const STATUS_SUMMARY = [
  { key: APPLICATION_STATUS.APPLIED,   label: 'Dilamar',      dot: 'bg-blue-400'   },
  { key: APPLICATION_STATUS.REVIEW,    label: 'Dalam Review', dot: 'bg-amber-400'  },
  { key: APPLICATION_STATUS.INTERVIEW, label: 'Interview',    dot: 'bg-emerald-400'},
  { key: APPLICATION_STATUS.OFFER,     label: 'Penawaran',    dot: 'bg-violet-400' },
]

export default function Sidebar({ isOpen, onClose }) {
  const { applications } = useApplications()

  const counts = STATUS_SUMMARY.reduce((acc, s) => {
    acc[s.key] = applications.filter((a) => a.status === s.key).length
    return acc
  }, {})

  const activeCount = applications.filter(
    (a) => a.status !== APPLICATION_STATUS.REJECTED && a.status !== APPLICATION_STATUS.WITHDRAWN
  ).length

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/25 backdrop-blur-sm z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          'fixed top-0 left-0 h-full z-30 w-64 flex flex-col select-none',
          'bg-[--color-surface] border-r border-[--color-border]',
          'transition-transform duration-200 ease-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* ── Brand ─────────────────────────────── */}
        <div className="flex items-center gap-3 px-5 h-16 border-b border-[--color-border] shrink-0">
          <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center shadow-sm">
            <TrendingUp size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold text-[--color-text-primary] tracking-tight">
              JobTracker
            </p>
            <p className="text-[11px] text-[--color-text-muted]">Riwayat Lamaran</p>
          </div>
        </div>

        {/* ── CTA ───────────────────────────────── */}
        <div className="px-4 pt-4 shrink-0">
          <NavLink
            to="/applications/new"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl
              bg-brand-600 hover:bg-brand-700 active:bg-brand-700
              text-white text-[13px] font-semibold
              transition-colors duration-150 shadow-sm"
          >
            <PlusCircle size={14} strokeWidth={2.5} />
            Tambah Lamaran
          </NavLink>
        </div>

        {/* ── Nav ───────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto px-3 pt-5 pb-3">
          <p className="px-3 mb-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase text-[--color-text-muted]">
            Menu
          </p>
          <ul className="space-y-0.5">
            {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150',
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-[--color-text-secondary] hover:bg-[--color-surface-tertiary] hover:text-[--color-text-primary]',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={16}
                        strokeWidth={isActive ? 2.2 : 1.8}
                        className={isActive ? 'text-brand-600' : 'text-[--color-text-muted]'}
                      />
                      <span className="flex-1">{label}</span>
                      {to === '/applications' && activeCount > 0 && (
                        <span className="text-[11px] font-bold bg-brand-500 text-white rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                          {activeCount > 99 ? '99+' : activeCount}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Status quick-filter */}
          {applications.length > 0 && (
            <div className="mt-5">
              <p className="px-3 mb-1.5 text-[10px] font-semibold tracking-[0.08em] uppercase text-[--color-text-muted]">
                Status Aktif
              </p>
              <div className="rounded-xl border border-[--color-border] bg-[--color-surface-secondary] overflow-hidden">
                {STATUS_SUMMARY.map(({ key, label, dot }, i) => (
                  <NavLink
                    key={key}
                    to={`/applications?status=${key}`}
                    onClick={onClose}
                    className={[
                      'flex items-center gap-2.5 px-3 py-2.5 text-[12px] transition-colors duration-100',
                      'hover:bg-[--color-surface-tertiary]',
                      i < STATUS_SUMMARY.length - 1 ? 'border-b border-[--color-border]' : '',
                    ].join(' ')}
                  >
                    <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
                    <span className="flex-1 text-[--color-text-secondary]">{label}</span>
                    <span className="font-semibold text-[--color-text-primary]">
                      {counts[key] ?? 0}
                    </span>
                  </NavLink>
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>
    </>
  )
}
