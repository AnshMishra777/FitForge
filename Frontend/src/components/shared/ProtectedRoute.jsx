
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  // Wait until the backend session check finishes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-forge-bg">
        <p className="text-forge-muted">Restoring your session...</p>
      </div>
    )
  }

  // Redirect only after session verification
  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}
