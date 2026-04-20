import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'
import ApplicationForm from '../components/ApplicationForm'

export default function NewApplicationPage() {
  const { addApplication } = useApplications()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (data) => {
    setIsSubmitting(true)

    // Simulasi tiny delay agar loading state terasa
    setTimeout(() => {
      addApplication(data)
      setIsSubmitting(false)
      setSuccess(true)

      // Redirect ke daftar lamaran setelah 1 detik
      setTimeout(() => navigate('/applications'), 1000)
    }, 400)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={28} className="text-green-500" />
        </div>
        <div>
          <p className="font-bold text-[var(--color-surface-900)] text-[15px]">
            Lamaran berhasil disimpan!
          </p>
          <p className="text-sm text-[var(--color-surface-600)] mt-0.5">
            Mengarahkan ke daftar lamaran…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Page intro */}
      <div className="mb-6">
        <p className="text-[var(--color-surface-600)] text-sm">
          Isi detail lamaran kerja yang ingin kamu catat. Field bertanda{' '}
          <span className="text-red-500 font-semibold">*</span> wajib diisi.
        </p>
      </div>

      <ApplicationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}
