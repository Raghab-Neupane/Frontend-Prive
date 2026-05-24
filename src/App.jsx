import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'
import Dashboard from './pages/Dashboard'
import LinkNewDrive from './pages/LinkNewDrive'
import Settings from './pages/Settings'
import MyStorage from './pages/MyStorage'
import DashboardLayout from './components/DashboardLayout'
import ProtectedRoute from './routes/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes — no navbar/sidebar */}
        <Route path="/login" element={<Login />} />
        <Route path="/createuser" element={<CreateUser />} />

        {/* Authenticated routes — protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/linknewdrive" element={<LinkNewDrive />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/mystorage" element={<MyStorage />} />
          </Route>
        </Route>

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
