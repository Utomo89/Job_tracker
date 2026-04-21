import { useNavigate } from 'react-router-dom'
import {
  ClipboardList, Activity, TrendingUp, Trophy,
  Clock, Plus, ArrowRight, AlertTriangle, Zap,
} from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'
import { useDashboardStats } from '../hooks/useDashboardStats'
import { useTheme } from '../context/ThemeContext'
import StatCard from '../components/ui/StatCard'
import StatusBadge from '../components/ui/StatusBadge'
import StatusBreakdown from '../components/ui/StatusBreakdown'
import MonthlyChart from '../components/MonthlyChart'
import Button from '../components/ui/Button'
import { formatDate, isDeadlinePassed } from '../utils'

// ─── Section wrapper ────────────────────────────────────────────────────────
function Panel({ title, action, children }) {
  return (
    <div className="bg-[var(--color-card)] border border-[var(--color-surface-200)] rounded-2xl overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-surface-100)]">
          <h2
            className="text-[13px] font-bold text-[var(--color-surface-700)] uppercase tracking-widest"
          >
            {title}
          </h2>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

// ─── Empty dashboard CTA ────────────────────────────────────────────────────
function EmptyDashboard({ onAdd }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center col-span-full">
      <div className="w-20 h-20 rounded-3xl bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center mb-5 shadow-sm">
        <Zap size={32} className="text-[var(--color-brand-400)]" />
      </div>
      <h2
        className="text-[20px] font-bold text-[var(--color-surface-900)] mb-2"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Dashboard siap digunakan
      </h2>
      <p className="text-sm text-[var(--color-surface-500)] max-w-xs leading-relaxed mb-6">
        Tambahkan lamaran pertama dan statistik akan muncul otomatis di sini.
      </p>
      <Button onClick={onAdd}>
        <Plus size={15} />
        Tambah Lamaran Pertama
      </Button>
    </div>
  )
}

// ─── Main component ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const navigate = useNavigate()
  const { applications } = useApplications()
  const { dark } = useTheme()
  const stats = useDashboardStats(applications)

  if (stats.total === 0) {
    return (
      <div className="max-w-5xl">
        <EmptyDashboard onAdd={() => navigate('/applications/new')} />
      </div>
    )
  }

  return (
    <div className="max-w-5xl space-y-5">

      {/* ── Row 1: Stat cards ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Lamaran"
          value={stats.total}
          sub={`${stats.active} masih aktif`}
          icon={ClipboardList}
          accent="brand"
          onClick={() => navigate('/applications')}
        />
        <StatCard
          label="Interview"
          value={stats.byStatus.interview}
          sub="Tahap wawancara"
          icon={Activity}
          accent="green"
          onClick={() => navigate('/applications?status=interview')}
        />
        <StatCard
          label="Response Rate"
          value={`${stats.responseRate}%`}
          sub="Dari total lamaran"
          icon={TrendingUp}
          accent="amber"
        />
        <StatCard
          label="Penawaran"
          value={stats.byStatus.offer}
          sub={stats.offerRate > 0 ? `${stats.offerRate}% offer rate` : 'Terus semangat!'}
          icon={Trophy}
          accent="purple"
          onClick={() => navigate('/applications?status=offer')}
        />
      </div>

      {/* ── Row 2: Chart + Status breakdown ───────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Monthly trend chart */}
        <div className="lg:col-span-3">
          <Panel
            title="Tren Lamaran (6 Bulan)"
            action={
              <span className="text-[11px] text-[var(--color-surface-400)]">
                per bulan
              </span>
            }
          >
            <MonthlyChart data={stats.monthlyTrend} dark={dark} />
          </Panel>
        </div>

        {/* Status breakdown */}
        <div className="lg:col-span-2">
          <Panel title="Breakdown Status">
            <StatusBreakdown byStatus={stats.byStatus} total={stats.total} />
          </Panel>
        </div>
      </div>

      {/* ── Row 3: Latest + Deadlines ──────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Latest applications */}
        <div className="lg:col-span-3">
          <Panel
            title="Lamaran Terbaru"
            action={
              <button
                onClick={() => navigate('/applications')}
                className="flex items-center gap-1 text-[12px] font-semibold text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)] transition-colors"
              >
                Lihat semua <ArrowRight size={12} />
              </button>
            }
          >
            {stats.latest.length === 0 ? (
              <p className="text-sm text-[var(--color-surface-400)] text-center py-4">
                Belum ada lamaran
              </p>
            ) : (
              <div className="space-y-0.5">
                {stats.latest.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => navigate(`/applications/${app.id}`)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--color-surface-50)] transition-colors text-left group"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-bold text-[var(--color-brand-600)]">
                        {app.company?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[var(--color-surface-900)] truncate">
                        {app.position}
                      </p>
                      <p className="text-[11px] text-[var(--color-surface-500)] truncate">
                        {app.company} · {formatDate(app.appliedDate)}
                      </p>
                    </div>

                    {/* Status */}
                    <StatusBadge status={app.status} className="flex-shrink-0" />
                  </button>
                ))}
              </div>
            )}
          </Panel>
        </div>

        {/* Right column: deadlines + sources */}
        <div className="lg:col-span-2 space-y-4">

          {/* Upcoming deadlines */}
          <Panel
            title="Deadline Mendatang"
            action={<Clock size={14} className="text-[var(--color-surface-400)]" />}
          >
            {stats.upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-[var(--color-surface-400)] text-center py-2">
                Tidak ada deadline dalam 7 hari
              </p>
            ) : (
              <div className="space-y-2">
                {stats.upcomingDeadlines.map((app) => {
                  const passed = isDeadlinePassed(app.deadlineDate)
                  return (
                    <button
                      key={app.id}
                      onClick={() => navigate(`/applications/${app.id}`)}
                      className="w-full flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-colors text-left"
                    >
                      <AlertTriangle size={13} className="text-amber-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-semibold text-[var(--color-surface-800)] truncate">
                          {app.position}
                        </p>
                        <p className="text-[11px] text-amber-700">
                          {formatDate(app.deadlineDate)}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </Panel>

          {/* Top sources */}
          {stats.topSources.length > 0 && (
            <Panel title="Sumber Terbanyak">
              <div className="space-y-2">
                {stats.topSources.map(({ name, count }, i) => (
                  <div key={name} className="flex items-center gap-2.5">
                    <span
                      className="text-[11px] font-bold text-[var(--color-surface-400)] w-4 text-right flex-shrink-0"
                    >
                      {i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[12px] font-semibold text-[var(--color-surface-700)] truncate">
                          {name}
                        </span>
                        <span className="text-[12px] font-bold text-[var(--color-surface-900)] ml-2 flex-shrink-0">
                          {count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[var(--color-surface-100)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-brand-400)] rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.round((count / stats.topSources[0].count) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  )
}
