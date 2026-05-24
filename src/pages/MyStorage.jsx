import { motion } from 'framer-motion'
import {
  HardDrive,
  Cloud,
  FileText,
  Image,
  Film,
  Archive,
  Upload,
  FolderSync,
  Lock,
  ArrowUpRight,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const providerBreakdown = [
  { name: 'Google Drive', used: 2.8, total: 5, color: 'bg-blue-500', lightBg: 'bg-blue-50', textColor: 'text-blue-600' },
  { name: 'OneDrive', used: 1.7, total: 5, color: 'bg-sky-500', lightBg: 'bg-sky-50', textColor: 'text-sky-600' },
]

const fileTypes = [
  { name: 'Documents', count: 124, size: '1.2 GB', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50', percent: 27 },
  { name: 'Images', count: 89, size: '0.9 GB', icon: Image, color: 'text-green-500', bg: 'bg-green-50', percent: 20 },
  { name: 'Videos', count: 23, size: '1.8 GB', icon: Film, color: 'text-purple-500', bg: 'bg-purple-50', percent: 40 },
  { name: 'Other', count: 56, size: '0.6 GB', icon: Archive, color: 'text-slate-500', bg: 'bg-slate-50', percent: 13 },
]

const quickActions = [
  { label: 'Upload Files', icon: Upload, desc: 'Add new files to your storage', gradient: 'from-prive-500 to-prive-600' },
  { label: 'Organize', icon: FolderSync, desc: 'Sort and manage your files', gradient: 'from-violet-500 to-violet-600' },
  { label: 'Encrypt', icon: Lock, desc: 'Secure sensitive files', gradient: 'from-emerald-500 to-emerald-600' },
]

export default function MyStorage() {
  const totalUsed = 4.5
  const totalCapacity = 10
  const usedPercent = (totalUsed / totalCapacity) * 100

  return (
    <motion.div variants={container} initial="hidden" animate="show" id="mystorage-page">
      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">My Combined Storage</h1>
        <p className="text-slate-500 mt-1">Overview of all your unified cloud storage.</p>
      </motion.div>

      {/* Total Storage Meter */}
      <motion.div variants={item} className="mb-8">
        <div className="stat-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center shadow-card">
                <Cloud size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Total Unified Storage</h2>
                <p className="text-sm text-slate-500">Across all connected providers</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-slate-900">
                {totalUsed} <span className="text-lg text-slate-400 font-normal">GB</span>
              </p>
              <p className="text-sm text-slate-500">of {totalCapacity} GB used</p>
            </div>
          </div>

          {/* Large progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-4 mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${usedPercent}%` }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="h-4 rounded-full gradient-blue relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-soft" />
            </motion.div>
          </div>

          {/* Provider segments */}
          <div className="flex items-center gap-6 flex-wrap">
            {providerBreakdown.map((p, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${p.color}`} />
                <span className="text-sm text-slate-600">{p.name}</span>
                <span className="text-sm text-slate-400">({p.used} GB)</span>
              </div>
            ))}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm font-medium text-slate-500">
                {(totalCapacity - totalUsed).toFixed(1)} GB free
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-8">
        {/* Provider Breakdown */}
        <motion.div variants={item} className="lg:col-span-3">
          <div className="stat-card h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-slate-900">Storage by Provider</h2>
              <button className="text-sm text-prive-600 hover:text-prive-700 font-medium 
                                 flex items-center gap-1 transition-colors">
                Details <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="space-y-6">
              {providerBreakdown.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${p.lightBg} flex items-center justify-center`}>
                        <HardDrive size={18} className={p.textColor} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">{p.name}</p>
                        <p className="text-xs text-slate-500">
                          {p.used} GB of {p.total} GB used
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-slate-900">
                      {Math.round((p.used / p.total) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(p.used / p.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: 'easeOut' }}
                      className={`h-2.5 rounded-full ${p.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* File Type Distribution */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="stat-card h-full">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">File Types</h2>

            <div className="space-y-4">
              {fileTypes.map((ft, i) => {
                const Icon = ft.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-9 h-9 rounded-lg ${ft.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={16} className={ft.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-700">{ft.name}</span>
                        <span className="text-xs text-slate-500">{ft.size}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${ft.percent}%` }}
                          transition={{ duration: 0.8, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                          className={`h-1.5 rounded-full ${ft.color.replace('text-', 'bg-')}`}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 flex-shrink-0 w-12 text-right">
                      {ft.count} files
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div variants={item}>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon
            return (
              <motion.button
                key={i}
                whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(37,99,235,0.12)' }}
                whileTap={{ scale: 0.98 }}
                className="stat-card text-left group cursor-pointer"
                id={`action-${action.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient}
                                flex items-center justify-center shadow-soft mb-4
                                group-hover:shadow-card-hover transition-shadow duration-300`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{action.label}</h3>
                <p className="text-xs text-slate-500">{action.desc}</p>
              </motion.button>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
