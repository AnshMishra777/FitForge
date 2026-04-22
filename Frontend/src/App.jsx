import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute  from './components/shared/ProtectedRoute'
import AppLayout       from './components/shared/AppLayout'
import Login           from './pages/Login'
import Signup          from './pages/Signup'
import Dashboard       from './pages/Dashboard'
import Workouts        from './pages/Workouts'
import Diet            from './pages/Diet'
import CustomWorkout   from './pages/CustomWorkout'
import SettingsPage from "./components/shared/Settingspage"
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<Login />}  />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route index              element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"  element={<Dashboard />}      />
            <Route path="workouts"   element={<Workouts />}       />
            <Route path="diet"       element={<Diet />}           />
            <Route path="custom"     element={<CustomWorkout />}  />
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}