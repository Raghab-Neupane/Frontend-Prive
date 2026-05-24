import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, ArrowRight, Cloud, FolderSync, Globe, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react'

export default function CreateUser() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Client-side password match validation
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create account')
        setLoading(false)
        return
      }

      setSuccess('Account created successfully! Redirecting to login...')
      setLoading(false)

      // Redirect to login after short delay
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError('Unable to connect to server')
      setLoading(false)
    }
  }

  const features = [
    { icon: FolderSync, label: 'Unified Storage', desc: 'All drives in one place' },
    { icon: ShieldCheck, label: 'End-to-End Encryption', desc: 'Your files, your privacy' },
    { icon: Globe, label: 'Access Anywhere', desc: 'Web, desktop, and mobile' },
  ]

  return (
    <div className="min-h-screen flex" id="createuser-page">
      {/* Left — Illustration Side */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center"
           style={{
             background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 40%, #3B82F6 70%, #60A5FA 100%)',
           }}>
        {/* Background orbs */}
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-prive-300/20 rounded-full blur-3xl animate-pulse-soft"
             style={{ animationDelay: '2s' }} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 px-12 max-w-lg"
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-white/15 backdrop-blur-sm 
                          border border-white/20 flex items-center justify-center shadow-glow-lg">
            <Cloud size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 text-center">
            Start your secure<br />cloud journey
          </h2>
          <p className="text-blue-100 text-center text-lg mb-10">
            Join thousands who trust PRIVE with their cloud storage.
          </p>

          {/* Feature list */}
          <div className="space-y-4">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl 
                             bg-white/10 backdrop-blur-md border border-white/15"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{f.label}</p>
                    <p className="text-blue-200 text-xs">{f.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* Right — Form Side */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/login" className="flex items-center gap-2.5 mb-12 group" id="createuser-logo">
            <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center
                            shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              <Cloud size={22} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">PRIVE</span>
          </Link>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Create your account</h1>
          <p className="text-slate-500 mb-8">
            Get started with PRIVE in seconds
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" id="createuser-form">
            <div>
              <label htmlFor="create-username" className="block text-sm font-medium text-slate-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="create-username"
                  type="text"
                  value={form.username}
                  onChange={update('username')}
                  placeholder="johndoe"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="create-email" className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="create-email"
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="create-password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="create-password"
                  type="password"
                  value={form.password}
                  onChange={update('password')}
                  placeholder="Create a strong password"
                  className="input-field pl-11"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="create-confirm-password" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="create-confirm-password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                  placeholder="Re-enter your password"
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
                id="createuser-error"
              >
                {error}
              </motion.div>
            )}

            {/* Success message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm font-medium flex items-center gap-2"
                id="createuser-success"
              >
                <CheckCircle2 size={16} />
                {success}
              </motion.div>
            )}

            <motion.button
              whileHover={loading ? {} : { scale: 1.01 }}
              whileTap={loading ? {} : { scale: 0.99 }}
              type="submit"
              disabled={loading}
              id="createuser-submit"
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 !mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Login redirect */}
          <p className="text-center text-slate-500 mt-8">
            Already have an account?{' '}
            <Link
              to="/login"
              id="createuser-login-link"
              className="text-prive-600 hover:text-prive-700 font-semibold 
                         transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
