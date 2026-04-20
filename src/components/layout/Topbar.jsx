import { Menu, Bell } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/applications': 'Daftar Lamaran',
  '/applications/new': 'Tambah Lamaran',
}

function getTitle(pathname) {
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]
  if (pathname.endsWith('/edit')) return 'Edit Lamaran'
  if (/^\/applications\/[^/]+$/.test(pathname)) return 'Detail Lamaran'
  return 'JobTracker'
}

export default function Topbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const title = getTitle(pathname)

  const today = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())

  return (
    <header className="h-14 bg-white border-b border-[var(--color-surface-200)] flex items-center px-4 gap-4 sticky top-0 z-10">
      {/* Mobile menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-1.5 rounded-lg text-[var(--color-surface-600)] hover:bg-[var(--color-surface-100)] transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h1
          className="text-[15px] font-bold text-[var(--color-surface-900)] truncate"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h1>
        <p className="text-[11px] text-[var(--color-surface-600)] hidden sm:block leading-none mt-0.5">
          {today}
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        <button className="relative p-2 rounded-lg text-[var(--color-surface-600)] hover:bg-[var(--color-surface-100)] transition-colors">
          <Bell size={17} />
        </button>

        {/* Avatar placeholder */}
        <div className="w-8 h-8 rounded-full bg-[var(--color-brand-500)] flex items-center justify-center text-white text-xs font-bold select-none">
          JT
        </div>
      </div>
    </header>
  )
}
