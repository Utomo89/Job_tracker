import { Trash2, X } from 'lucide-react'
import Button from './ui/Button'

export default function DeleteDialog({ count, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 z-10">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-[var(--color-surface-400)] hover:text-[var(--color-surface-700)] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center mb-4">
          <Trash2 size={22} className="text-red-500" />
        </div>

        <h3
          className="font-bold text-[16px] text-[var(--color-surface-900)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Hapus {count} lamaran?
        </h3>
        <p className="text-sm text-[var(--color-surface-600)] mt-1.5 leading-relaxed">
          Data yang dihapus tidak dapat dikembalikan. Pastikan kamu sudah yakin sebelum melanjutkan.
        </p>

        <div className="flex gap-3 mt-5">
          <Button variant="secondary" className="flex-1" onClick={onCancel}>
            Batal
          </Button>
          <Button variant="danger" className="flex-1" onClick={onConfirm}>
            Ya, Hapus
          </Button>
        </div>
      </div>
    </div>
  )
}
