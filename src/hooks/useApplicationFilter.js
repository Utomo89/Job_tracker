import { useState, useMemo } from 'react'

export function useApplicationFilter(applications) {
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterType, setFilterType] = useState('')
  const [sortBy, setSortBy] = useState('appliedDate')
  const [sortDir, setSortDir] = useState('desc')

  const filtered = useMemo(() => {
    let list = [...applications]

    // Search — perusahaan atau posisi
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) =>
          a.company?.toLowerCase().includes(q) ||
          a.position?.toLowerCase().includes(q) ||
          a.location?.toLowerCase().includes(q)
      )
    }

    // Filter status
    if (filterStatus) {
      list = list.filter((a) => a.status === filterStatus)
    }

    // Filter tipe pekerjaan
    if (filterType) {
      list = list.filter((a) => a.jobType === filterType)
    }

    // Sort
    list.sort((a, b) => {
      let valA = a[sortBy] ?? ''
      let valB = b[sortBy] ?? ''

      // Date comparison
      if (sortBy === 'appliedDate' || sortBy === 'deadlineDate') {
        valA = valA ? new Date(valA).getTime() : 0
        valB = valB ? new Date(valB).getTime() : 0
      } else {
        valA = valA.toString().toLowerCase()
        valB = valB.toString().toLowerCase()
      }

      if (valA < valB) return sortDir === 'asc' ? -1 : 1
      if (valA > valB) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return list
  }, [applications, search, filterStatus, filterType, sortBy, sortDir])

  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortBy(col)
      setSortDir('desc')
    }
  }

  const resetFilters = () => {
    setSearch('')
    setFilterStatus('')
    setFilterType('')
  }

  const hasActiveFilters = !!(search || filterStatus || filterType)

  return {
    filtered,
    search, setSearch,
    filterStatus, setFilterStatus,
    filterType, setFilterType,
    sortBy, sortDir, toggleSort,
    resetFilters,
    hasActiveFilters,
  }
}
