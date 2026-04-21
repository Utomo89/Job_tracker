import { useForm } from 'react-hook-form'
import {
  Building2, MapPin, Briefcase, Calendar, Link,
  DollarSign, User, FileText, Clock, Tag,
} from 'lucide-react'
import {
  Label, FieldError, FieldHint,
  Input, Textarea, Select, FormGroup,
} from './ui/FormField'
import Button from './ui/Button'
import {
  APPLICATION_STATUS,
  STATUS_LABELS,
  JOB_TYPES,
  JOB_SOURCES,
} from '../constants'

const today = () => new Date().toISOString().split('T')[0]

// --- Section wrapper ---
function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-surface-200)] overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-[var(--color-surface-100)]">
        <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-50)] flex items-center justify-center">
          <Icon size={14} className="text-[var(--color-brand-500)]" />
        </div>
        <h2 className="text-[13px] font-bold text-[var(--color-surface-700)] uppercase tracking-widest">
          {title}
        </h2>
      </div>
      <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}

// --- Field row yang bisa span full width ---
function Field({ span = 1, children }) {
  return (
    <FormGroup className={span === 2 ? 'sm:col-span-2' : ''}>
      {children}
    </FormGroup>
  )
}

export default function ApplicationForm({ defaultValues, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      status: APPLICATION_STATUS.APPLIED,
      appliedDate: today(),
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

      {/* SECTION 1 — Informasi Utama */}
      <Section title="Informasi Utama" icon={Building2}>
        <Field span={2}>
          <Label htmlFor="company" required>Nama Perusahaan</Label>
          <Input
            id="company"
            placeholder="cth. Google Indonesia"
            error={errors.company}
            {...register('company', { required: 'Nama perusahaan wajib diisi' })}
          />
          <FieldError message={errors.company?.message} />
        </Field>

        <Field span={2}>
          <Label htmlFor="position" required>Posisi / Jabatan</Label>
          <Input
            id="position"
            placeholder="cth. Frontend Developer"
            error={errors.position}
            {...register('position', { required: 'Posisi wajib diisi' })}
          />
          <FieldError message={errors.position?.message} />
        </Field>

        <Field>
          <Label htmlFor="location" required>Lokasi</Label>
          <div className="relative">
            <MapPin
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-300)] pointer-events-none"
            />
            <Input
              id="location"
              placeholder="cth. Jakarta / Remote"
              className="pl-8"
              error={errors.location}
              {...register('location', { required: 'Lokasi wajib diisi' })}
            />
          </div>
          <FieldError message={errors.location?.message} />
        </Field>

        <Field>
          <Label htmlFor="jobType">Tipe Pekerjaan</Label>
          <Select id="jobType" {...register('jobType')}>
            <option value="">— Pilih tipe —</option>
            {JOB_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
        </Field>
      </Section>

      {/* SECTION 2 — Status & Tanggal */}
      <Section title="Status & Tanggal" icon={Calendar}>
        <Field>
          <Label htmlFor="status" required>Status Lamaran</Label>
          <Select
            id="status"
            error={errors.status}
            {...register('status', { required: 'Status wajib dipilih' })}
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </Select>
          <FieldError message={errors.status?.message} />
        </Field>

        <Field>
          <Label htmlFor="appliedDate" required>Tanggal Melamar</Label>
          <div className="relative">
            <Clock
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-300)] pointer-events-none"
            />
            <Input
              id="appliedDate"
              type="date"
              className="pl-8"
              error={errors.appliedDate}
              {...register('appliedDate', { required: 'Tanggal melamar wajib diisi' })}
            />
          </div>
          <FieldError message={errors.appliedDate?.message} />
        </Field>

        <Field>
          <Label htmlFor="deadlineDate">Tanggal Deadline</Label>
          <div className="relative">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-300)] pointer-events-none"
            />
            <Input
              id="deadlineDate"
              type="date"
              className="pl-8"
              {...register('deadlineDate')}
            />
          </div>
          <FieldHint>Batas waktu pendaftaran (opsional)</FieldHint>
        </Field>

        <Field>
          <Label htmlFor="interviewDate">Tanggal Interview</Label>
          <div className="relative">
            <Calendar
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-300)] pointer-events-none"
            />
            <Input
              id="interviewDate"
              type="date"
              className="pl-8"
              {...register('interviewDate')}
            />
          </div>
          <FieldHint>Isi jika sudah ada jadwal (opsional)</FieldHint>
        </Field>
      </Section>

      {/* SECTION 3 — Detail Tambahan */}
      <Section title="Detail Tambahan" icon={Tag}>
        <Field>
          <Label htmlFor="source">Sumber Lowongan</Label>
          <Select id="source" {...register('source')}>
            <option value="">— Pilih sumber —</option>
            {JOB_SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label htmlFor="salary">Ekspektasi / Range Gaji</Label>
          <div className="relative">
            <DollarSign
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-300)] pointer-events-none"
            />
            <Input
              id="salary"
              placeholder="cth. 8 - 12 juta"
              className="pl-8"
              {...register('salary')}
            />
          </div>
        </Field>

        <Field span={2}>
          <Label htmlFor="jobUrl">URL Lowongan</Label>
          <div className="relative">
            <Link
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-300)] pointer-events-none"
            />
            <Input
              id="jobUrl"
              type="url"
              placeholder="https://..."
              className="pl-8"
              error={errors.jobUrl}
              {...register('jobUrl', {
                validate: (v) =>
                  !v || v.startsWith('http') || 'URL harus diawali http:// atau https://',
              })}
            />
          </div>
          <FieldError message={errors.jobUrl?.message} />
        </Field>

        <Field span={2}>
          <Label htmlFor="recruiter">Nama / Kontak Rekruter</Label>
          <div className="relative">
            <User
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-surface-300)] pointer-events-none"
            />
            <Input
              id="recruiter"
              placeholder="cth. Budi Santoso / hr@company.com"
              className="pl-8"
              {...register('recruiter')}
            />
          </div>
        </Field>
      </Section>

      {/* SECTION 4 — Catatan */}
      <Section title="Catatan" icon={FileText}>
        <Field span={2}>
          <Label htmlFor="notes">Catatan Tambahan</Label>
          <Textarea
            id="notes"
            rows={4}
            placeholder="Tulis catatan penting tentang lamaran ini..."
            {...register('notes')}
          />
          <FieldHint>Informasi tambahan seperti hasil interview, kesan, atau follow-up yang perlu dilakukan.</FieldHint>
        </Field>
      </Section>

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-3 pt-2 pb-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Batal
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Simpan Lamaran
        </Button>
      </div>
    </form>
  )
}
