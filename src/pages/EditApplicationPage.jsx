import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'
import ApplicationForm from '../components/ApplicationForm'
import Button from '../components/ui/Button'

export default function EditApplicationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, updateApplication } = useApplications()

  const app = applications.find((a) => a.id === id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-[var(--color-surface-600)] font-medium">Lamaran tidak ditemukan.</p>
        <Button variant="secondary" size="sm" onClick={() => navigate('/applications')}>
          ← Kembali ke Daftar
        </Button>
      </div>
    )
  }

  const handleSubmit = (data) => {
    setIsSubmitting(true)
    setTimeout(() => {
      updateApplication({ ...data, id: app.id })
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => navigate(`/applications/${app.id}`), 900)
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
            Perubahan disimpan!
          </p>
          <p className="text-sm text-[var(--color-surface-600)] mt-0.5">
            Mengarahkan ke halaman detail…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      {/* Back nav */}
      <button
        onClick={() => navigate(`/applications/${id}`)}
        className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-surface-600)] hover:text-[var(--color-surface-900)] transition-colors mb-5"
      >
        <ArrowLeft size={15} />
        Kembali ke Detail
      </button>

      {/* Context info */}
      <div className="flex items-center gap-3 bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] rounded-xl px-4 py-3 mb-6">
        <div className="w-9 h-9 rounded-xl bg-[var(--color-card)] border border-[var(--color-brand-200)] flex items-center justify-center flex-shrink-0">
          <span className="text-[13px] font-bold text-[var(--color-brand-600)]">
            {app.company?.charAt(0)?.toUpperCase()}
          </span>
        </div>
        <div>
          <p className="text-[14px] font-bold text-[var(--color-brand-900)]">{app.position}</p>
          <p className="text-[12px] text-[var(--color-brand-600)]">{app.company}</p>
        </div>
      </div>

      <ApplicationForm
        defaultValues={app}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}
