import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Shield,
  Bell,
  HardDrive,
  Mail,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Save,
  Cloud,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const tabs = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'storage', label: 'Storage Preferences', icon: HardDrive },
]

function ToggleSwitch({ enabled, onToggle, id }) {
  return (
    <button
      id={id}
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200
        ${enabled ? 'bg-prive-600' : 'bg-slate-200'}`}
    >
      <motion.div
        layout
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-soft"
        style={{ left: enabled ? '24px' : '4px' }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  )
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    uploads: true,
    security: true,
  })
  const [storagePrefs, setStoragePrefs] = useState({
    defaultProvider: 'google-drive',
    autoSync: true,
    autoEncrypt: true,
  })

  return (
    <motion.div variants={container} initial="hidden" animate="show" id="settings-page">
      {/* Header */}
      <motion.div variants={item} className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account preferences and storage configuration.</p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tab Navigation */}
        <motion.div variants={item} className="lg:w-56 flex-shrink-0">
          <div className="stat-card p-2 lg:p-3 flex lg:flex-col gap-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  id={`settings-tab-${tab.id}`}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 whitespace-nowrap relative
                    ${isActive
                      ? 'text-prive-600 bg-prive-50'
                      : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.2 : 1.8} />
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="settings-tab-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 
                                 bg-prive-600 rounded-r-full hidden lg:block"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div variants={item} className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="stat-card"
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Account Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-5 mb-8 pb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-2xl gradient-blue flex items-center justify-center
                                  shadow-card text-white text-xl font-bold">
                    P
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Prive User</p>
                    <p className="text-sm text-slate-500">Free Plan</p>
                  </div>
                  <button className="ml-auto btn-secondary text-sm py-2 px-4">
                    Change Avatar
                  </button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Display Name</label>
                    <input type="text" defaultValue="Prive User" className="input-field" id="settings-name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        defaultValue="user@prive.io"
                        className="input-field pl-11"
                        id="settings-email"
                        readOnly
                      />
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5">Email cannot be changed.</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-primary flex items-center gap-2"
                    id="settings-save-account"
                  >
                    <Save size={16} />
                    Save Changes
                  </motion.button>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="stat-card"
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Security Settings</h2>

                {/* Change Password */}
                <div className="mb-8 pb-6 border-b border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-800 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter current password"
                          className="input-field pl-11 pr-11"
                          id="settings-current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 
                                     hover:text-slate-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="password"
                          placeholder="Enter new password"
                          className="input-field pl-11"
                          id="settings-new-password"
                        />
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="btn-primary text-sm"
                      id="settings-update-password"
                    >
                      Update Password
                    </motion.button>
                  </div>
                </div>

                {/* 2FA */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                        <Smartphone size={18} className="text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-slate-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="stat-card"
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Notification Preferences</h2>

                <div className="space-y-5">
                  {[
                    {
                      key: 'email',
                      label: 'Email Notifications',
                      desc: 'Receive updates and alerts via email',
                      icon: Mail,
                    },
                    {
                      key: 'push',
                      label: 'Push Notifications',
                      desc: 'Browser push notifications for real-time alerts',
                      icon: Bell,
                    },
                    {
                      key: 'uploads',
                      label: 'Upload Alerts',
                      desc: 'Get notified when uploads complete or fail',
                      icon: Cloud,
                    },
                    {
                      key: 'security',
                      label: 'Security Alerts',
                      desc: 'Notifications for login attempts and security events',
                      icon: Shield,
                    },
                  ].map((n) => {
                    const Icon = n.icon
                    return (
                      <div
                        key={n.key}
                        className="flex items-center justify-between py-4 
                                   border-b border-slate-100 last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                            <Icon size={18} className="text-slate-500" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">{n.label}</p>
                            <p className="text-xs text-slate-500">{n.desc}</p>
                          </div>
                        </div>
                        <ToggleSwitch
                          id={`notification-${n.key}`}
                          enabled={notifications[n.key]}
                          onToggle={() =>
                            setNotifications((prev) => ({
                              ...prev,
                              [n.key]: !prev[n.key],
                            }))
                          }
                        />
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'storage' && (
              <motion.div
                key="storage"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="stat-card"
              >
                <h2 className="text-lg font-semibold text-slate-900 mb-6">Storage Preferences</h2>

                <div className="space-y-6">
                  {/* Default Provider */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Default Upload Provider
                    </label>
                    <select
                      value={storagePrefs.defaultProvider}
                      onChange={(e) =>
                        setStoragePrefs((prev) => ({
                          ...prev,
                          defaultProvider: e.target.value,
                        }))
                      }
                      className="input-field cursor-pointer"
                      id="settings-default-provider"
                    >
                      <option value="google-drive">Google Drive</option>
                      <option value="onedrive">OneDrive</option>
                    </select>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between py-4 border-b border-slate-100">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Auto-Sync</p>
                        <p className="text-xs text-slate-500">
                          Automatically sync files across all connected drives
                        </p>
                      </div>
                      <ToggleSwitch
                        id="settings-auto-sync"
                        enabled={storagePrefs.autoSync}
                        onToggle={() =>
                          setStoragePrefs((prev) => ({
                            ...prev,
                            autoSync: !prev.autoSync,
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-medium text-slate-900 text-sm">Auto-Encrypt</p>
                        <p className="text-xs text-slate-500">
                          Encrypt files automatically before uploading
                        </p>
                      </div>
                      <ToggleSwitch
                        id="settings-auto-encrypt"
                        enabled={storagePrefs.autoEncrypt}
                        onToggle={() =>
                          setStoragePrefs((prev) => ({
                            ...prev,
                            autoEncrypt: !prev.autoEncrypt,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="btn-primary flex items-center gap-2"
                    id="settings-save-storage"
                  >
                    <Save size={16} />
                    Save Preferences
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}
