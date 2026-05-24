import { motion } from 'framer-motion'
import { Cloud, Plus, ArrowRight, CheckCircle2, Clock, HardDrive } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const providers = [
  {
    name: 'Google Drive',
    description: 'Connect your Google Drive account to sync and manage files seamlessly.',
    icon: '🟦',
    storage: '15 GB Free',
    status: 'available',
    gradient: 'from-blue-500 to-blue-600',
    hoverBorder: 'hover:border-blue-300',
  },
  {
    name: 'OneDrive',
    description: 'Link your Microsoft OneDrive for unified cloud storage access.',
    icon: '🔷',
    storage: '5 GB Free',
    status: 'available',
    gradient: 'from-sky-500 to-sky-600',
    hoverBorder: 'hover:border-sky-300',
  },
  {
    name: 'Dropbox',
    description: 'Dropbox integration for file syncing and collaboration.',
    icon: '📦',
    storage: '2 GB Free',
    status: 'coming_soon',
    gradient: 'from-indigo-500 to-indigo-600',
    hoverBorder: 'hover:border-indigo-300',
  },
  {
    name: 'iCloud',
    description: 'Apple iCloud integration for seamless cross-device access.',
    icon: '☁️',
    storage: '5 GB Free',
    status: 'coming_soon',
    gradient: 'from-slate-500 to-slate-600',
    hoverBorder: 'hover:border-slate-300',
  },
]

export default function LinkNewDrive() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" id="linknewdrive-page">
      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-prive-50 flex items-center justify-center">
            <Plus size={20} className="text-prive-600" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Connect a New Drive</h1>
        </div>
        <p className="text-slate-500 ml-[52px]">
          Link your cloud storage providers to unify all your files in one secure place.
        </p>
      </motion.div>

      {/* Connected Drives Summary */}
      <motion.div variants={item} className="mb-8">
        <div className="stat-card flex items-center gap-6 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">2 Drives Connected</p>
              <p className="text-xs text-slate-500">Google Drive, OneDrive</p>
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-prive-50 flex items-center justify-center">
              <HardDrive size={20} className="text-prive-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">10 GB Total</p>
              <p className="text-xs text-slate-500">Combined storage capacity</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Provider Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {providers.map((provider, i) => {
          const isComingSoon = provider.status === 'coming_soon'
          return (
            <motion.div key={i} variants={item}>
              <motion.div
                whileHover={isComingSoon ? {} : { y: -4, boxShadow: '0 10px 25px -5px rgba(37,99,235,0.1)' }}
                whileTap={isComingSoon ? {} : { scale: 0.99 }}
                className={`stat-card relative overflow-hidden group
                  ${isComingSoon ? 'opacity-60' : 'cursor-pointer'}
                  ${provider.hoverBorder}
                `}
                id={`provider-${provider.name.toLowerCase().replace(/\s/g, '-')}`}
              >
                {/* Coming soon badge */}
                {isComingSoon && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 
                                  bg-slate-100 text-slate-500 text-xs font-medium 
                                  px-3 py-1 rounded-full">
                    <Clock size={12} />
                    Coming Soon
                  </div>
                )}

                {/* Provider icon & info */}
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${provider.gradient}
                                  flex items-center justify-center text-2xl shadow-soft
                                  ${!isComingSoon ? 'group-hover:shadow-card-hover' : ''}
                                  transition-shadow duration-300`}>
                    <Cloud size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-900">{provider.name}</h3>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                      {provider.description}
                    </p>
                  </div>
                </div>

                {/* Storage info */}
                <div className="flex items-center gap-2 mb-5 text-sm">
                  <Cloud size={14} className="text-slate-400" />
                  <span className="text-slate-500">{provider.storage}</span>
                </div>

                {/* Action */}
                {isComingSoon ? (
                  <button
                    disabled
                    className="w-full py-2.5 rounded-xl border border-slate-200 
                               text-slate-400 text-sm font-medium cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-2.5"
                  >
                    Connect {provider.name}
                    <ArrowRight size={16} />
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Bottom info */}
      <motion.div variants={item} className="mt-8">
        <div className="rounded-2xl bg-gradient-to-r from-prive-50 to-blue-50 
                        border border-prive-100 p-6 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-prive-100 flex items-center justify-center flex-shrink-0">
            <Cloud size={20} className="text-prive-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-1">Need another provider?</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              We're constantly adding new cloud storage integrations. 
              Stay tuned for Dropbox, iCloud, and more coming soon.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
