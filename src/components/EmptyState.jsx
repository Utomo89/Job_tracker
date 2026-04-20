import { useNavigate } from 'react-router-dom'
import { ClipboardList, SearchX } from 'lucide-react'
import Button from './ui/Button'

export default function EmptyState({ hasFilters, onReset }) {
  const navigate = useNavigate()

  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[var(--color-surface-100)] flex items-center justify-center mb-4">
          <SearchX size={24} className="text-[var(--color-surface-400)]" />
        </div>
        <p className="font-bold text-[var(--color-surface-700)] text-[15px]">
          Tidak ada hasil
        </p>
        <p className="text-sm text-[var(--color-surface-500)] mt-1 max-w-xs">
          Coba ubah kata kunci atau filter yang digunakan
        </p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={onReset}>
          Reset Filter
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center mb-4">
        <ClipboardList size={28} className="text-[var(--color-brand-400)]" />
      </div>
      <p
        className="font-bold text-[var(--color-surface-900)] text-[16px]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Belum ada lamaran
      </p>
      <p className="text-sm text-[var(--color-surface-500)] mt-1.5 max-w-xs leading-relaxed">
        Mulai catat lamaran kerja pertamamu dan lacak progresnya dari sini.
      </p>
      <Button className="mt-5" onClick={() => navigate('/applications/new')}>
        + Tambah Lamaran Pertama
      </Button>
    </div>
  )
}
