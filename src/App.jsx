import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ApplicationProvider } from './context/ApplicationContext'
import { AppLayout } from './components/layout'
import NewApplicationPage from './pages/NewApplicationPage'
import ApplicationsPage from './pages/ApplicationsPage'

function ComingSoon({ name }) {
  return (
    <div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-[var(--color-surface-200)]">
      <div className="text-center">
        <p className="text-[var(--color-surface-600)] font-medium">{name}</p>
        <p className="text-[var(--color-surface-300)] text-sm mt-1">Coming soon</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <ApplicationProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<ComingSoon name="Dashboard" />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/applications/new" element={<NewApplicationPage />} />
            <Route path="/applications/:id" element={<ComingSoon name="Detail Lamaran" />} />
            <Route path="/applications/:id/edit" element={<ComingSoon name="Edit Lamaran" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ApplicationProvider>
  )
}
