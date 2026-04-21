import { useMemo } from 'react'
import { APPLICATION_STATUS } from '../constants'

export function useDashboardStats(applications) {
  return useMemo(() => {
    const total = applications.length

    // --- Per-status counts ---
    const byStatus = Object.values(APPLICATION_STATUS).reduce((acc, s) => {
      acc[s] = applications.filter((a) => a.status === s).length
      return acc
    }, {})

    // --- Active (not rejected/withdrawn) ---
    const active = total - byStatus[APPLICATION_STATUS.REJECTED] - byStatus[APPLICATION_STATUS.WITHDRAWN]

    // --- Response rate (anything past APPLIED) ---
    const responded =
      byStatus[APPLICATION_STATUS.REVIEW] +
      byStatus[APPLICATION_STATUS.INTERVIEW] +
      byStatus[APPLICATION_STATUS.OFFER] +
      byStatus[APPLICATION_STATUS.REJECTED]
    const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0

    // --- Offer rate ---
    const offerRate = total > 0 ? Math.round((byStatus[APPLICATION_STATUS.OFFER] / total) * 100) : 0

    // --- Monthly trend (last 6 months) ---
    const now = new Date()
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      return {
        label: d.toLocaleString('id-ID', { month: 'short' }),
        year: d.getFullYear(),
        month: d.getMonth(),
        count: 0,
      }
    })

    applications.forEach((app) => {
      if (!app.appliedDate) return
      const d = new Date(app.appliedDate)
      const slot = months.find(
        (m) => m.year === d.getFullYear() && m.month === d.getMonth()
      )
      if (slot) slot.count++
    })

    // --- Latest 5 applications ---
    const latest = [...applications]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)

    // --- Upcoming deadlines (next 7 days) ---
    const in7Days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const upcomingDeadlines = applications
      .filter((a) => {
        if (!a.deadlineDate) return false
        const d = new Date(a.deadlineDate)
        return d >= now && d <= in7Days
      })
      .sort((a, b) => new Date(a.deadlineDate) - new Date(b.deadlineDate))

    // --- Top sources ---
    const sourceCounts = {}
    applications.forEach((a) => {
      if (a.source) sourceCounts[a.source] = (sourceCounts[a.source] || 0) + 1
    })
    const topSources = Object.entries(sourceCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }))

    return {
      total,
      active,
      byStatus,
      responseRate,
      offerRate,
      monthlyTrend: months,
      latest,
      upcomingDeadlines,
      topSources,
    }
  }, [applications])
}
