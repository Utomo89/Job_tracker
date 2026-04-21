import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ApplicationProvider } from './context/ApplicationContext'
import { ThemeProvider } from './context/ThemeContext'
import { AppLayout } from './components/layout'
import DashboardPage from './pages/DashboardPage'
import NewApplicationPage from './pages/NewApplicationPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ApplicationDetailPage from './pages/ApplicationDetailPage'
import EditApplicationPage from './pages/EditApplicationPage'

export default function App() {
  return (
    <ThemeProvider>
      <ApplicationProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/applications" element={<ApplicationsPage />} />
              <Route path="/applications/new" element={<NewApplicationPage />} />
              <Route path="/applications/:id" element={<ApplicationDetailPage />} />
              <Route path="/applications/:id/edit" element={<EditApplicationPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ApplicationProvider>
    </ThemeProvider>
  )
}
