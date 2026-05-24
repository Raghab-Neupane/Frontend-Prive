import { motion } from 'framer-motion'
import {
  HardDrive,
  Cloud,
  Shield,
  Upload,
  FileText,
  Image,
  Film,
  ArrowUpRight,
  TrendingUp,
  Lock,
  CheckCircle2,
  Clock,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

/* ---------- Mock Data ---------- */
const stats = [
  {
    label: 'Total Storage Used',
    value: '4.5 GB',
    sub: 'of 10 GB',
    percent: 45,
    icon: HardDrive,
    color: 'text-prive-600',
    bg: 'bg-prive-50',
    ring: 'stroke-prive-500',
  },
  {
    label: 'Available Storage',
    value: '5.5 GB',
    sub: 'remaining',
    percent: 55,
    icon: Cloud,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    ring: 'stroke-emerald-500',
  },
  {
    label: 'Connected Drives',
    value: '2',
    sub: 'providers',
    icon: CheckCircle2,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    label: 'Encryption Status',
    value: 'Active',
    sub: 'AES-256',
    icon: Shield,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
]

const providerData = [
  {
    name: 'Google Drive',
    used: 2.8,
    total: 5,
    color: 'from-blue-500 to-blue-600',
    barColor: 'bg-blue-500',
    icon: '🟦',
  },
  {
    name: 'OneDrive',
    used: 1.7,
    total: 5,
    color: 'from-sky-500 to-sky-600',
    barColor: 'bg-sky-500',
    icon: '🔷',
  },
]

const recentFiles = [
  { name: 'Project_Report_Q4.pdf', size: '2.4 MB', provider: 'Google Drive', date: '2 hours ago', type: 'pdf' },
  { name: 'team_photo.jpg', size: '5.1 MB', provider: 'OneDrive', date: '5 hours ago', type: 'image' },
  { name: 'presentation_final.pptx', size: '12.3 MB', provider: 'Google Drive', date: '1 day ago', type: 'doc' },
  { name: 'demo_video.mp4', size: '45.2 MB', provider: 'Google Drive', date: '2 days ago', type: 'video' },
  { name: 'budget_2025.xlsx', size: '1.8 MB', provider: 'OneDrive', date: '3 days ago', type: 'doc' },
]

const uploadActivity = [30, 45, 25, 60, 40, 75, 55, 85, 65, 45, 70, 90]

function FileIcon({ type }) {
  const map = {
    pdf: <FileText size={16} className="text-red-500" />,
    image: <Image size={16} className="text-green-500" />,
    video: <Film size={16} className="text-purple-500" />,
    doc: <FileText size={16} className="text-blue-500" />,
  }
  return map[type] || <FileText size={16} className="text-slate-400" />
}

/* ---------- Circular Progress Ring ---------- */
function ProgressRing({ percent, strokeClass }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <svg width="72" height="72" className="-rotate-90">
      <circle cx="36" cy="36" r={radius} fill="none" stroke="#E2E8F0" strokeWidth="6" />
      <motion.circle
        cx="36" cy="36" r={radius} fill="none"
        className={strokeClass}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
      />
    </svg>
  )
}

/* ---------- Component ---------- */
export default function Dashboard() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" id="dashboard-page">
      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back — here's your storage overview.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div key={i} variants={item}>
              <motion.div
                whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(37,99,235,0.1)' }}
                className="stat-card"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center`}>
                    <Icon size={20} className={s.color} />
                  </div>
                  {s.percent !== undefined && (
                    <ProgressRing percent={s.percent} strokeClass={s.ring} />
                  )}
                </div>
                <p className="text-sm text-slate-500 font-medium mb-1">{s.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-slate-900">{s.value}</span>
                  <span className="text-sm text-slate-400">{s.sub}</span>
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Middle Row — Usage Chart + Upload Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Storage by Provider */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Storage by Provider</h2>
                <p className="text-sm text-slate-500">Usage breakdown across connected drives</p>
              </div>
              <div className="flex items-center gap-1 text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                <TrendingUp size={14} />
                <span>Healthy</span>
              </div>
            </div>

            <div className="space-y-5">
              {providerData.map((p, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{p.icon}</span>
                      <span className="text-sm font-medium text-slate-700">{p.name}</span>
                    </div>
                    <span className="text-sm text-slate-500">
                      {p.used} GB / {p.total} GB
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(p.used / p.total) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: 'easeOut' }}
                      className={`h-3 rounded-full ${p.barColor}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Total bar */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-800">Total Combined</span>
                <span className="text-sm font-semibold text-prive-600">4.5 GB / 10 GB</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
                  className="h-3 rounded-full gradient-blue"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Upload Activity */}
        <motion.div variants={item}>
          <div className="stat-card h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Upload Activity</h2>
                <p className="text-sm text-slate-500">Last 12 hours</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-prive-50 flex items-center justify-center">
                <Upload size={18} className="text-prive-600" />
              </div>
            </div>

            {/* Mini bar chart */}
            <div className="flex-1 flex items-end gap-1.5 pt-4">
              {uploadActivity.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.05, ease: 'easeOut' }}
                  className="flex-1 rounded-t-md bg-prive-200 hover:bg-prive-400 
                             transition-colors duration-200 min-h-[4px] cursor-pointer"
                />
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Clock size={14} />
                <span>Last upload: 2h ago</span>
              </div>
              <span className="text-sm font-semibold text-prive-600">47 files</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Row — Recent Files + Provider Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Files */}
        <motion.div variants={item} className="lg:col-span-2">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-slate-900">Recent Files</h2>
              <button className="text-sm text-prive-600 hover:text-prive-700 font-medium 
                                 flex items-center gap-1 transition-colors">
                View all <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full" id="recent-files-table">
                <thead>
                  <tr className="text-left text-xs text-slate-400 font-medium uppercase tracking-wider">
                    <th className="pb-3 pr-4">File</th>
                    <th className="pb-3 pr-4 hidden sm:table-cell">Size</th>
                    <th className="pb-3 pr-4 hidden md:table-cell">Provider</th>
                    <th className="pb-3">Uploaded</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentFiles.map((file, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 + i * 0.1 }}
                      className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 
                                          flex items-center justify-center flex-shrink-0">
                            <FileIcon type={file.type} />
                          </div>
                          <span className="text-sm font-medium text-slate-700 truncate max-w-[200px]">
                            {file.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 pr-4 hidden sm:table-cell">
                        <span className="text-sm text-slate-500">{file.size}</span>
                      </td>
                      <td className="py-3.5 pr-4 hidden md:table-cell">
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 
                                         px-2.5 py-1 rounded-full">
                          {file.provider}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <span className="text-sm text-slate-400">{file.date}</span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Provider Cards */}
        <motion.div variants={item} className="space-y-5">
          {providerData.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -2 }}
              className="stat-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} 
                                flex items-center justify-center text-white shadow-soft`}>
                  <Cloud size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{p.name}</p>
                  <p className="text-xs text-slate-400">Connected</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs text-emerald-600 font-medium">Active</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(p.used / p.total) * 100}%` }}
                  transition={{ duration: 1, delay: 0.8 + i * 0.2, ease: 'easeOut' }}
                  className={`h-2 rounded-full ${p.barColor}`}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">{p.used} GB used</span>
                <span className="text-xs text-slate-400">{p.total} GB total</span>
              </div>

              <button className="mt-4 w-full btn-secondary text-sm py-2.5" id={`manage-${p.name.toLowerCase().replace(/\s/g, '-')}`}>
                Manage
              </button>
            </motion.div>
          ))}

          {/* Encryption Card */}
          <motion.div whileHover={{ y: -2 }} className="stat-card bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Lock size={18} className="text-emerald-400" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm">Encryption</p>
                <p className="text-xs text-slate-400">AES-256 Enabled</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              All files are encrypted end-to-end before upload. Your keys, your data.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
