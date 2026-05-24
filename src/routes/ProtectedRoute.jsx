import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  // Display a loading state while context initialized state from localStorage
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50">
        <div className="relative flex flex-col items-center">
          {/* Outer glowing pulsing background */}
          <div className="absolute -inset-4 rounded-full bg-prive-100/50 blur-xl animate-pulse" />
          
          <div className="relative bg-white/70 backdrop-blur-md border border-slate-200/60
                          p-8 rounded-3xl shadow-soft flex flex-col items-center min-w-[240px]">
            <Loader2 className="animate-spin text-prive-600 mb-4" size={32} />
            <p className="text-slate-900 font-semibold text-sm tracking-wide">
              Securing connection
            </p>
            <p className="text-slate-400 text-xs mt-1">
              Verifying session validity...
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to login if user session is invalid/expired
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
