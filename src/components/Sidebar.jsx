import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Link2,
  HardDrive,
  Settings,
  LogOut,
  ChevronLeft,
  Cloud,
} from 'lucide-react'

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Link2, label: 'Link New Drive', path: '/linknewdrive' },
  { icon: HardDrive, label: 'My Combined Storage', path: '/mystorage' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  const sidebarVariants = {
    open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
  }

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg gradient-blue flex items-center justify-center">
            <Cloud size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">PRIVE</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl text-slate-400 hover:bg-slate-100 transition-colors"
          aria-label="Close sidebar"
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6 space-y-1">
        <p className="px-4 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Navigation
        </p>
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.path
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              id={`sidebar-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="block"
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.2 : 1.8} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 
                               bg-prive-600 rounded-r-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Storage Summary */}
      <div className="px-4 pb-4">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-prive-50 to-prive-100/50 
                        border border-prive-200/40">
          <div className="flex items-center gap-2 mb-3">
            <Cloud size={16} className="text-prive-600" />
            <span className="text-xs font-semibold text-prive-700">Storage</span>
          </div>
          <div className="w-full bg-prive-200/50 rounded-full h-2 mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '45%' }}
              transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
              className="h-2 rounded-full gradient-blue"
            />
          </div>
          <p className="text-xs text-prive-600">
            <span className="font-semibold">4.5 GB</span> of 10 GB used
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="px-3 pb-4">
        <motion.button
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          id="sidebar-logout"
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl
                     text-slate-400 font-medium text-sm
                     transition-all duration-200 ease-out
                     hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={18} strokeWidth={1.8} />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-16 bottom-0 w-[260px] 
                        bg-white border-r border-slate-200/60 z-40 overflow-y-auto">
        {SidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-white z-50 
                         shadow-xl lg:hidden overflow-y-auto"
            >
              {SidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
