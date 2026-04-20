import { STORAGE_KEY } from '../constants'

export const storage = {
  getAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch {
      return []
    }
  },

  save(applications) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(applications))
      return true
    } catch {
      return false
    }
  },

  clear() {
    localStorage.removeItem(STORAGE_KEY)
  },
}

export const generateId = () =>
  `app_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`

export const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(dateString))
}

export const isDeadlineSoon = (deadline) => {
  if (!deadline) return false
  const diff = new Date(deadline) - new Date()
  return diff > 0 && diff <= 3 * 24 * 60 * 60 * 1000 // 3 hari
}

export const isDeadlinePassed = (deadline) => {
  if (!deadline) return false
  return new Date(deadline) < new Date()
}
