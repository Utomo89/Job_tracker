export const APPLICATION_STATUS = {
  APPLIED:   'applied',
  REVIEW:    'review',
  INTERVIEW: 'interview',
  OFFER:     'offer',
  REJECTED:  'rejected',
  WITHDRAWN: 'withdrawn',
}

export const STATUS_LABELS = {
  [APPLICATION_STATUS.APPLIED]:   'Dilamar',
  [APPLICATION_STATUS.REVIEW]:    'Dalam Review',
  [APPLICATION_STATUS.INTERVIEW]: 'Interview',
  [APPLICATION_STATUS.OFFER]:     'Penawaran',
  [APPLICATION_STATUS.REJECTED]:  'Ditolak',
  [APPLICATION_STATUS.WITHDRAWN]: 'Ditarik',
}

// Tailwind classes with dark: variants for badge backgrounds
export const STATUS_COLORS = {
  [APPLICATION_STATUS.APPLIED]:
    'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  [APPLICATION_STATUS.REVIEW]:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  [APPLICATION_STATUS.INTERVIEW]:
    'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  [APPLICATION_STATUS.OFFER]:
    'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  [APPLICATION_STATUS.REJECTED]:
    'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
  [APPLICATION_STATUS.WITHDRAWN]:
    'bg-gray-100 text-gray-600 dark:bg-gray-800/60 dark:text-gray-400',
}

export const JOB_TYPES = [
  { value: 'fulltime',   label: 'Full Time' },
  { value: 'parttime',   label: 'Part Time' },
  { value: 'contract',   label: 'Kontrak' },
  { value: 'internship', label: 'Magang' },
  { value: 'freelance',  label: 'Freelance' },
]

export const JOB_SOURCES = [
  'LinkedIn',
  'JobStreet',
  'Glints',
  'Indeed',
  'Kalibrr',
  'Website Perusahaan',
  'Referral',
  'Lainnya',
]

export const STORAGE_KEY = 'job_tracker_applications'
