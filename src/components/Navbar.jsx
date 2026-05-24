import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Cloud } from 'lucide-react'

export default function Navbar({ onToggleSidebar, sidebarOpen }) {
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Storage', path: '/mystorage' },
    { label: 'Settings', path: '/settings' },
  ]

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-16 
                 bg-white/80 backdrop-blur-xl border-b border-slate-200/60"
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left: Logo + Mobile Menu */}
        <div className="flex items-center gap-4">
          <button
            id="sidebar-toggle"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 
                       transition-colors duration-200"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/dashboard" className="flex items-center gap-2.5 group" id="nav-logo">
            <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center
                            shadow-soft group-hover:shadow-glow transition-shadow duration-300">
              <Cloud size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              PRIVE
            </span>
          </Link>
        </div>

        {/* Center: Nav Links (desktop) */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                id={`nav-${item.label.toLowerCase()}`}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'text-prive-600' 
                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                  }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-prive-50 rounded-xl -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Right: User Avatar */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl gradient-blue flex items-center justify-center
                       cursor-pointer shadow-soft hover:shadow-card-hover transition-shadow duration-300"
            id="nav-avatar"
          >
            <span className="text-white text-sm font-semibold">P</span>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}
