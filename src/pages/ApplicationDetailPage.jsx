import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Pencil, Trash2, ExternalLink,
  Building2, Calendar, Tag, FileText, Clock,
} from 'lucide-react'
import { useApplications } from '../context/ApplicationContext'
import { formatDate, isDeadlineSoon, isDeadlinePassed } from '../utils'
import { JOB_TYPES } from '../constants'
import Button from '../components/ui/Button'
import StatusBadge from '../components/ui/StatusBadge'
import QuickStatusUpdate from '../components/ui/QuickStatusUpdate'
import StatusTimeline from '../components/ui/StatusTimeline'
import DeleteDialog from '../components/DeleteDialog'
import { DetailSection, DetailGrid, DetailRow } from '../components/ui/DetailRow'

function getJobTypeLabel(val) {
  return JOB_TYPES.find((t) => t.value === val)?.label ?? val
}

export default function ApplicationDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { applications, updateApplication, deleteApplications } = useApplications()

  const app = applications.find((a) => a.id === id)
  const [showDelete, setShowDelete] = useState(false)

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

  const handleStatusUpdate = (newStatus) => {
    updateApplication({ ...app, status: newStatus })
  }

  const handleDelete = () => {
    deleteApplications([app.id])
    navigate('/applications')
  }

  const deadlineSoon = isDeadlineSoon(app.deadlineDate)
  const deadlinePassed = isDeadlinePassed(app.deadlineDate)

  return (
    <div className="max-w-2xl space-y-4">

      {/* Back + actions toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          onClick={() => navigate('/applications')}
          className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-surface-600)] hover:text-[var(--color-surface-900)] transition-colors"
        >
          <ArrowLeft size={15} />
          Daftar Lamaran
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(`/applications/${id}/edit`)}
          >
            <Pencil size={13} />
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShowDelete(true)}
          >
            <Trash2 size={13} />
            Hapus
          </Button>
        </div>
      </div>

      {/* Hero card */}
      <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-surface-200)] p-5">
        {/* Top row */}
        <div className="flex items-start gap-4">
          {/* Company avatar */}
          <div className="w-14 h-14 rounded-2xl bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center flex-shrink-0 shadow-sm">
            <span
              className="text-2xl font-bold text-[var(--color-brand-600)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {app.company?.charAt(0)?.toUpperCase() ?? '?'}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h1
              className="text-[18px] font-bold text-[var(--color-surface-900)] leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {app.position}
            </h1>
            <p className="text-[var(--color-surface-600)] font-medium mt-0.5">{app.company}</p>

            <div className="flex flex-wrap items-center gap-3 mt-2 text-[12px] text-[var(--color-surface-500)]">
              {app.location && <span>📍 {app.location}</span>}
              {app.jobType && <span>💼 {getJobTypeLabel(app.jobType)}</span>}
              {app.source && <span>🔗 via {app.source}</span>}
            </div>
          </div>

          {/* Quick status update */}
          <QuickStatusUpdate
            currentStatus={app.status}
            onUpdate={handleStatusUpdate}
          />
        </div>

        {/* Timeline */}
        <div className="mt-5 pt-5 border-t border-[var(--color-surface-100)]">
          <p className="text-[11px] font-semibold text-[var(--color-surface-400)] uppercase tracking-widest mb-3">
            Progres Lamaran
          </p>
          <StatusTimeline status={app.status} />
        </div>
      </div>

      {/* Deadline alert */}
      {app.deadlineDate && (deadlineSoon || deadlinePassed) && (
        <div className={`
          flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-semibold
          ${deadlinePassed
            ? 'bg-red-50 border border-red-200 text-red-700'
            : 'bg-amber-50 border border-amber-200 text-amber-700'
          }
        `}>
          <Clock size={16} />
          {deadlinePassed
            ? `Deadline sudah lewat — ${formatDate(app.deadlineDate)}`
            : `Deadline mendekat — ${formatDate(app.deadlineDate)}`
          }
        </div>
      )}

      {/* Info sections */}
      <DetailSection title="Informasi Utama" icon={Building2}>
        <DetailGrid>
          <DetailRow label="Nama Perusahaan" value={app.company} />
          <DetailRow label="Posisi / Jabatan" value={app.position} />
          <DetailRow label="Lokasi" value={app.location} />
          <DetailRow label="Tipe Pekerjaan" value={app.jobType ? getJobTypeLabel(app.jobType) : null} />
        </DetailGrid>
      </DetailSection>

      <DetailSection title="Status & Tanggal" icon={Calendar}>
        <DetailGrid>
          <DetailRow
            label="Status Lamaran"
            value={<StatusBadge status={app.status} />}
          />
          <DetailRow label="Tanggal Melamar" value={formatDate(app.appliedDate)} />
          <DetailRow
            label="Tanggal Deadline"
            value={
              app.deadlineDate
                ? <span className={deadlinePassed ? 'text-red-600' : deadlineSoon ? 'text-amber-600' : ''}>
                    {formatDate(app.deadlineDate)}
                  </span>
                : null
            }
          />
          <DetailRow label="Tanggal Interview" value={formatDate(app.interviewDate)} />
        </DetailGrid>
      </DetailSection>

      <DetailSection title="Detail Tambahan" icon={Tag}>
        <DetailGrid>
          <DetailRow label="Sumber Lowongan" value={app.source} />
          <DetailRow label="Ekspektasi Gaji" value={app.salary} />
          <DetailRow label="Kontak Rekruter" value={app.recruiter} />
          <DetailRow
            label="URL Lowongan"
            value={
              app.jobUrl
                ? <a
                    href={app.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[var(--color-brand-500)] hover:text-[var(--color-brand-700)] font-medium transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={13} />
                    Buka lowongan
                  </a>
                : null
            }
          />
        </DetailGrid>
      </DetailSection>

      {app.notes && (
        <DetailSection title="Catatan" icon={FileText}>
          <p className="text-[14px] text-[var(--color-surface-700)] leading-relaxed whitespace-pre-wrap">
            {app.notes}
          </p>
        </DetailSection>
      )}

      {/* Metadata footer */}
      <div className="flex items-center gap-4 px-1 pb-4 text-[11px] text-[var(--color-surface-400)]">
        <span>Dibuat: {formatDate(app.createdAt)}</span>
        {app.updatedAt !== app.createdAt && (
          <span>Diperbarui: {formatDate(app.updatedAt)}</span>
        )}
        <span className="font-mono opacity-60">{app.id}</span>
      </div>

      {/* Delete dialog */}
      {showDelete && (
        <DeleteDialog
          count={1}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  )
}
