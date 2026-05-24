import { createContext, useContext, useState, useEffect } from 'react'
import { getToken, setToken, removeToken, decodeToken, isTokenExpired } from '../utils/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setTokenState] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from local storage on mount
  useEffect(() => {
    const initAuth = () => {
      const storedToken = getToken()
      if (storedToken) {
        if (!isTokenExpired(storedToken)) {
          setTokenState(storedToken)
          const decoded = decodeToken(storedToken)
          setUser(decoded || { email: 'user@prive.com' })
        } else {
          removeToken()
        }
      }
      setLoading(false)
    }

    initAuth()

    // Handle incoming automatic unauth notifications (e.g. from api.js fetch helper)
    const handleUnauthorized = () => {
      logout()
    }
    window.addEventListener('auth-unauthorized', handleUnauthorized)
    return () => window.removeEventListener('auth-unauthorized', handleUnauthorized)
  }, [])

  const login = (jwtToken) => {
    setToken(jwtToken)
    setTokenState(jwtToken)
    const decoded = decodeToken(jwtToken)
    setUser(decoded || { email: 'user@prive.com' })
  }

  const logout = () => {
    removeToken()
    setTokenState(null)
    setUser(null)
  }

  const value = {
    token,
    user,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
