import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, ArrowRight, Cloud, Shield, Zap, HardDrive, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Redirect to dashboard if user is already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      // Store JWT token in global context and redirect
      login(data.token)
      navigate('/dashboard')
    } catch (err) {
      setError('Unable to connect to server')
      setLoading(false)
    }
  }

  const floatingCards = [
    { icon: Shield, label: 'Encrypted', delay: 0, className: 'top-[15%] right-[8%]' },
    { icon: Zap, label: 'Fast Sync', delay: 0.3, className: 'top-[45%] right-[15%]' },
    { icon: HardDrive, label: '10 GB Free', delay: 0.6, className: 'bottom-[20%] right-[5%]' },
  ]

  return (
    <div className="min-h-screen flex" id="login-page">
      {/* Left — Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/login" className="flex items-center gap-2.5 mb-12 group" id="login-logo">
            <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center
                            shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              <Cloud size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">PRIVE</span>
          </Link>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500 mb-8">
            Sign in to access your unified cloud storage
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5" id="login-form">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <button type="button" className="text-sm text-prive-600 hover:text-prive-700 font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-medium"
                id="login-error"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={loading ? {} : { scale: 1.01 }}
              whileTap={loading ? {} : { scale: 0.99 }}
              type="submit"
              disabled={loading}
              id="login-submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Create Account */}
          <p className="text-center text-slate-500">
            Don't have an account?{' '}
            <Link
              to="/createuser"
              id="login-create-link"
              className="text-prive-600 hover:text-prive-700 font-semibold 
                         transition-colors duration-200"
            >
              Create account
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right — Illustration Side */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden gradient-blue items-center justify-center">
        {/* Background orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-prive-400/20 rounded-full blur-3xl animate-pulse-soft" 
             style={{ animationDelay: '2s' }} />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        />

        {/* Central illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-white/15 backdrop-blur-sm 
                          border border-white/20 flex items-center justify-center
                          shadow-glow-lg">
            <Cloud size={48} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            All your cloud storage,<br />unified & encrypted
          </h2>
          <p className="text-blue-100 text-lg max-w-md mx-auto">
            Connect Google Drive, OneDrive, and more — access everything from one secure dashboard.
          </p>
        </motion.div>

        {/* Floating cards */}
        {floatingCards.map((card, i) => {
          const Icon = card.icon
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + card.delay }}
              className={`absolute ${card.className} animate-float`}
              style={{ animationDelay: `${card.delay}s` }}
            >
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl 
                              bg-white/15 backdrop-blur-md border border-white/20
                              shadow-glow">
                <Icon size={18} className="text-white" />
                <span className="text-white text-sm font-medium">{card.label}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
