import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  Settings,
  Briefcase,
  X,
} from 'lucide-react'
import { useApplications } from '../../context/ApplicationContext'
import { APPLICATION_STATUS } from '../../constants'

const NAV_ITEMS = [
  {
    to: '/',
    icon: LayoutDashboard,
    label: 'Dashboard',
    end: true,
  },
  {
    to: '/applications',
    icon: ClipboardList,
    label: 'Lamaran',
    end: false,
  },
]

function StatusDot({ status }) {
  const colors = {
    [APPLICATION_STATUS.APPLIED]: 'bg-blue-400',
    [APPLICATION_STATUS.REVIEW]: 'bg-amber-400',
    [APPLICATION_STATUS.INTERVIEW]: 'bg-green-400',
    [APPLICATION_STATUS.OFFER]: 'bg-purple-400',
    [APPLICATION_STATUS.REJECTED]: 'bg-red-400',
    [APPLICATION_STATUS.WITHDRAWN]: 'bg-gray-400',
  }
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[status] ?? 'bg-gray-300'}`} />
  )
}

export default function Sidebar({ isOpen, onClose }) {
  const { applications } = useApplications()

  const statusCounts = Object.values(APPLICATION_STATUS).reduce((acc, s) => {
    acc[s] = applications.filter((a) => a.status === s).length
    return acc
  }, {})

  const activeCount = applications.filter(
    (a) =>
      a.status !== APPLICATION_STATUS.REJECTED &&
      a.status !== APPLICATION_STATUS.WITHDRAWN
  ).length

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 lg:hidden backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col
          w-[var(--sidebar-width)] bg-[var(--color-surface-900)]
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-500)] flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Briefcase size={15} className="text-white" />
            </div>
            <span
              className="text-white text-[15px] font-bold tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              JobTracker
            </span>
          </div>
          {/* Close button mobile */}
          <button
            onClick={onClose}
            className="lg:hidden text-white/40 hover:text-white transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick stats strip */}
        <div className="mx-4 mt-4 rounded-xl bg-white/5 px-4 py-3">
          <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-2">
            Aktif
          </p>
          <div className="flex items-end gap-1.5">
            <span
              className="text-white text-2xl font-bold leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {activeCount}
            </span>
            <span className="text-white/40 text-xs mb-0.5">
              / {applications.length} total
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">
            Menu
          </p>

          {NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${
                  isActive
                    ? 'bg-[var(--color-brand-500)] text-white shadow-md shadow-brand-500/20'
                    : 'text-white/50 hover:text-white hover:bg-white/8'
                }`
              }
            >
              <Icon size={16} strokeWidth={2} />
              {label}
            </NavLink>
          ))}

          {/* Add new shortcut */}
          <NavLink
            to="/applications/new"
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
              ${
                isActive
                  ? 'bg-[var(--color-brand-500)] text-white shadow-md shadow-brand-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/8'
              }`
            }
          >
            <PlusCircle size={16} strokeWidth={2} />
            Tambah Lamaran
          </NavLink>

          {/* Status breakdown */}
          <div className="pt-4">
            <p className="text-white/30 text-[10px] font-semibold uppercase tracking-widest px-3 mb-2">
              Status
            </p>
            <div className="space-y-0.5">
              {[
                { key: APPLICATION_STATUS.APPLIED, label: 'Dilamar' },
                { key: APPLICATION_STATUS.REVIEW, label: 'Dalam Review' },
                { key: APPLICATION_STATUS.INTERVIEW, label: 'Interview' },
                { key: APPLICATION_STATUS.OFFER, label: 'Penawaran' },
                { key: APPLICATION_STATUS.REJECTED, label: 'Ditolak' },
                { key: APPLICATION_STATUS.WITHDRAWN, label: 'Ditarik' },
              ].map(({ key, label }) => (
                <NavLink
                  key={key}
                  to={`/applications?status=${key}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-150 group"
                >
                  <span className="flex items-center gap-2">
                    <StatusDot status={key} />
                    {label}
                  </span>
                  <span className="text-white/25 group-hover:text-white/50 font-semibold">
                    {statusCounts[key] || 0}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-3 pb-4 border-t border-white/8 pt-3">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/40 hover:text-white/70 hover:bg-white/8 transition-all duration-150">
            <Settings size={16} strokeWidth={2} />
            Pengaturan
          </button>
        </div>
      </aside>
    </>
  )
}
