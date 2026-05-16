import { X, User, Bell, Moon, Sun, Shield, HelpCircle, LogOut, ChevronRight, Mail, Camera, Check, Monitor } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

// ── Tabs ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'profile',       label: 'Profile',       icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance',    label: 'Appearance',    icon: Moon },
  { id: 'security',      label: 'Security',      icon: Shield },
  { id: 'help',          label: 'Help',          icon: HelpCircle },
]

// ── Helpers ───────────────────────────────────────────────────────────
function SettingRow({ label, sub, children }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-forge-border last:border-0">
      <div>
        <p className="text-sm font-semibold text-forge-text">{label}</p>
        {sub && <p className="text-[11px] text-forge-dim mt-0.5">{sub}</p>}
      </div>
      <div className="flex-shrink-0 ml-4">{children}</div>
    </div>
  )
}

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none
        ${value ? 'bg-forge-orange' : 'bg-forge-card border border-forge-border'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm
        transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

function Field({ label, type = 'text', value, onChange, placeholder, readOnly }) {
  return (
    <div>
      <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full px-3 py-2 rounded-lg border text-sm text-forge-text
          bg-forge-card border-forge-border
          focus:outline-none focus:border-forge-orange/60 focus:ring-1 focus:ring-forge-orange/20
          placeholder:text-forge-dim transition-colors
          ${readOnly ? 'opacity-60 cursor-not-allowed' : ''}`}
      />
    </div>
  )
}

function SectionHeader({ title, sub }) {
  return (
    <div className="mb-1">
      <h3 className="font-display text-xl tracking-[0.06em] text-forge-text">{title}</h3>
      <p className="text-xs text-forge-dim mt-0.5">{sub}</p>
    </div>
  )
}

function InfoRow({ icon, label, value, accent }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="flex items-center gap-1.5 text-forge-dim">{icon} {label}</span>
      <span className={`font-semibold ${accent ? 'text-forge-orange' : 'text-forge-text'}`}>{value}</span>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════
export default function SettingsModal({ onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('profile')

  // ── Avatar / Photo ────────────────────────────────────────────────
  // Hidden file input — clicking Camera button triggers it programmatically
  const fileInputRef = useRef(null)
  const [avatarSrc, setAvatarSrc] = useState(
    () => localStorage.getItem('ff_avatar') || null
  )
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'

  const handleAvatarClick = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      setAvatarSrc(dataUrl)
      localStorage.setItem('ff_avatar', dataUrl)
    }
    reader.readAsDataURL(file)
    e.target.value = '' // reset so same file can be picked again
  }

  const removeAvatar = () => {
    setAvatarSrc(null)
    localStorage.removeItem('ff_avatar')
  }

  // ── Theme / Dark mode ─────────────────────────────────────────────
  // Reads the current html class on mount so the UI reflects the real state
  const getInitialTheme = () => localStorage.getItem('ff_theme') || 'dark'

  const [theme, setThemeState] = useState(getInitialTheme)

  const applyTheme = (newTheme) => {
    const html = document.documentElement
    if (newTheme === 'dark') {
      html.classList.add('dark')
      html.classList.remove('light')
    } else if (newTheme === 'light') {
      html.classList.remove('dark')
      html.classList.add('light')
    } else {
      // system — follow OS preference
      html.classList.remove('dark', 'light')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      html.classList.add(prefersDark ? 'dark' : 'light')
    }
    localStorage.setItem('ff_theme', newTheme)
    setThemeState(newTheme)
  }

  // Apply saved theme on mount
  useEffect(() => { applyTheme(getInitialTheme()) }, []) // eslint-disable-line

  // ── Profile ───────────────────────────────────────────────────────
  const [profile, setProfile] = useState({
    name:  user?.name  || '',
    email: user?.email || '',
    phone: localStorage.getItem('ff_phone') || '',
    bio:   localStorage.getItem('ff_bio')   || '',
    goal:  localStorage.getItem('ff_goal')  || 'Muscle Gain',
  })
  const [profileSaved, setProfileSaved] = useState(false)
  const GOALS = ['Muscle Gain', 'Fat Loss', 'Endurance', 'Strength', 'Maintenance']

  const saveProfile = () => {
    const stored = JSON.parse(localStorage.getItem('ff_user') || '{}')
    localStorage.setItem('ff_user', JSON.stringify({ ...stored, name: profile.name, email: profile.email }))
    localStorage.setItem('ff_phone', profile.phone)
    localStorage.setItem('ff_bio',   profile.bio)
    localStorage.setItem('ff_goal',  profile.goal)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2500)
  }

  // ── Notifications ─────────────────────────────────────────────────
  const [notifs, setNotifs] = useState({
    workoutReminders: true,
    progressUpdates:  true,
    dietTips:         false,
    weeklyReport:     true,
    achievements:     true,
  })

  // ── Appearance extras ─────────────────────────────────────────────
  const [compactMode, setCompactMode] = useState(false)
  const [animations,  setAnimations]  = useState(true)

  // ── Security ──────────────────────────────────────────────────────
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' })
  const [pwMsg,  setPwMsg]  = useState(null)
  const [twoFA,  setTwoFA]  = useState(false)

  const changePassword = (e) => {
    e.preventDefault()
    if (pwForm.next.length < 6)        { setPwMsg({ ok: false, text: 'Password must be at least 6 characters.' }); return }
    if (pwForm.next !== pwForm.confirm) { setPwMsg({ ok: false, text: 'Passwords do not match.' }); return }
    setPwMsg({ ok: true, text: 'Password updated successfully.' })
    setPwForm({ current: '', next: '', confirm: '' })
    setTimeout(() => setPwMsg(null), 3000)
  }

  const handleLogout   = () => { logout(); navigate('/login') }
  const handleBackdrop = (e) => { if (e.target === e.currentTarget) onClose() }

  // ─────────────────────────────────────────────────────────────────
  return (
    <div
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center
                 bg-black/60 backdrop-blur-sm px-4"
    >
      {/* Hidden file input — triggered by camera button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Modal shell */}
      <div className="w-full max-w-[720px] max-h-[90vh] rounded-2xl flex flex-col
                      bg-forge-bg border border-forge-border
                      shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-forge-border flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-forge-orange rounded-md flex items-center justify-center
                            font-display text-xs text-white">FF</div>
            <h2 className="font-display text-lg tracking-[0.08em] text-forge-text">SETTINGS</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center
                       text-forge-muted hover:text-forge-text hover:bg-forge-card transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* Sidebar */}
          <aside className="w-[180px] flex-shrink-0 border-r border-forge-border
                            flex flex-col py-3 gap-1 bg-forge-surface/50">

            {/* Avatar */}
            <div className="px-3 pb-3 mb-1 border-b border-forge-border">
              <div className="flex flex-col items-center gap-2 py-3">
                <div className="relative">
                  {/* Clicking avatar or camera icon opens file picker */}
                  <div
                    onClick={handleAvatarClick}
                    className="w-14 h-14 rounded-full overflow-hidden cursor-pointer
                               ring-2 ring-forge-orange/30 hover:ring-forge-orange/60 transition-all"
                    title="Click to change photo"
                  >
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-forge-orange to-orange-400
                                      flex items-center justify-center text-white font-bold text-lg">
                        {initials}
                      </div>
                    )}
                  </div>

                  {/* Camera badge */}
                  <button
                    type="button"
                    onClick={handleAvatarClick}
                    title="Upload photo"
                    className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full z-10
                               bg-forge-orange flex items-center justify-center
                               hover:bg-orange-400 active:scale-90 transition-all shadow-md"
                  >
                    <Camera className="w-2.5 h-2.5 text-white" />
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-xs font-bold text-forge-text truncate max-w-[140px]">{user?.name}</p>
                  <p className="text-[10px] text-forge-dim truncate max-w-[140px]">{user?.email}</p>
                </div>

                {/* Remove photo — only visible when a photo is set */}
                {avatarSrc && (
                  <button
                    onClick={removeAvatar}
                    className="text-[10px] text-red-400 hover:text-red-300 underline transition-colors"
                  >
                    Remove photo
                  </button>
                )}
              </div>
            </div>

            {/* Nav */}
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-xs font-semibold
                            tracking-wide transition-colors text-left
                            ${tab === id
                              ? 'bg-forge-orange/10 text-forge-orange'
                              : 'text-forge-muted hover:text-forge-text hover:bg-forge-card'
                            }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                {label}
              </button>
            ))}

            {/* Logout */}
            <div className="mt-auto px-2 pb-2 pt-3 border-t border-forge-border">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs font-semibold
                           text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">

            {/* ── Profile ── */}
            {tab === 'profile' && (
              <div className="flex flex-col gap-5">
                <SectionHeader title="Personal Details" sub="Manage your profile information" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your name" />
                  <Field label="Email Address" type="email" value={profile.email}
                    onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                    placeholder="you@example.com" />
                  <Field label="Phone Number" type="tel" value={profile.phone}
                    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000" />
                  <div>
                    <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted mb-1.5">
                      Fitness Goal
                    </label>
                    <select
                      value={profile.goal}
                      onChange={e => setProfile(p => ({ ...p, goal: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border text-sm text-forge-text
                                 bg-forge-card border-forge-border
                                 focus:outline-none focus:border-forge-orange/60
                                 focus:ring-1 focus:ring-forge-orange/20 transition-colors"
                    >
                      {GOALS.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted mb-1.5">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                    placeholder="Tell us about your fitness journey…"
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border text-sm text-forge-text resize-none
                               bg-forge-card border-forge-border
                               focus:outline-none focus:border-forge-orange/60
                               focus:ring-1 focus:ring-forge-orange/20
                               placeholder:text-forge-dim transition-colors"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={saveProfile}
                    className="px-5 py-2 rounded-lg bg-forge-orange text-white text-sm font-bold
                               hover:bg-orange-400 transition-colors"
                  >
                    Save Changes
                  </button>
                  {profileSaved && (
                    <span className="flex items-center gap-1.5 text-xs text-forge-green font-semibold">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>

                <div className="mt-2 p-4 rounded-xl border border-forge-border bg-forge-card/50">
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-forge-dim mb-3">
                    Account Info
                  </p>
                  <div className="flex flex-col gap-2">
                    <InfoRow icon={<Mail className="w-3.5 h-3.5" />} label="Account ID" value={user?._id || '—'} />
                    <InfoRow icon={<User className="w-3.5 h-3.5" />} label="Member Since" value="May 2025" />
                    <InfoRow icon={<Shield className="w-3.5 h-3.5" />} label="Plan" value="Free" accent />
                  </div>
                </div>
              </div>
            )}

            {/* ── Notifications ── */}
            {tab === 'notifications' && (
              <div className="flex flex-col gap-5">
                <SectionHeader title="Notifications" sub="Choose what alerts you receive" />
                <div className="rounded-xl border border-forge-border bg-forge-card/40 px-4 divide-y divide-forge-border">
                  {[
                    { key: 'workoutReminders', label: 'Workout Reminders', sub: 'Daily push notification to train' },
                    { key: 'progressUpdates',  label: 'Progress Updates',  sub: 'Weekly body & strength progress' },
                    { key: 'dietTips',         label: 'AI Diet Tips',      sub: 'Personalized nutrition nudges' },
                    { key: 'weeklyReport',     label: 'Weekly Report',     sub: 'Summary of your training week' },
                    { key: 'achievements',     label: 'Achievements',      sub: 'Celebrate milestones & PRs' },
                  ].map(({ key, label, sub }) => (
                    <SettingRow key={key} label={label} sub={sub}>
                      <Toggle value={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
                    </SettingRow>
                  ))}
                </div>
              </div>
            )}

            {/* ── Appearance ── */}
            {tab === 'appearance' && (
              <div className="flex flex-col gap-5">
                <SectionHeader title="Appearance" sub="Personalise your visual experience" />

                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted mb-3">
                    Theme
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'dark',   label: 'Dark',   icon: Moon,    swatch: 'bg-gray-900' },
                      { id: 'light',  label: 'Light',  icon: Sun,     swatch: 'bg-gray-100 border border-gray-300' },
                      { id: 'system', label: 'System', icon: Monitor, swatch: 'bg-gradient-to-r from-gray-900 to-gray-200' },
                    ].map(({ id, label, icon: Icon, swatch }) => (
                      <button
                        key={id}
                        onClick={() => applyTheme(id)}
                        className={`flex flex-col items-center gap-2 py-4 rounded-xl border-2 transition-all
                          ${theme === id
                            ? 'border-forge-orange bg-forge-orange/5 text-forge-orange'
                            : 'border-forge-border text-forge-muted hover:border-forge-borderLight hover:text-forge-text'
                          }`}
                      >
                        <div className={`w-9 h-5 rounded ${swatch}`} />
                        <Icon className="w-4 h-4" />
                        <span className="text-xs font-bold">{label}</span>
                        {theme === id && <span className="w-1.5 h-1.5 rounded-full bg-forge-orange" />}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-forge-dim mt-2 leading-relaxed">
                    {theme === 'dark'   && '🌙 Dark mode is active — easier on the eyes at night.'}
                    {theme === 'light'  && '☀️ Light mode is active — bright and clean.'}
                    {theme === 'system' && '🖥️ Follows your device system preference automatically.'}
                  </p>
                </div>

                <div className="rounded-xl border border-forge-border bg-forge-card/40 px-4 divide-y divide-forge-border">
                  <SettingRow label="Compact Mode" sub="Tighter spacing throughout the app">
                    <Toggle value={compactMode} onChange={setCompactMode} />
                  </SettingRow>
                  <SettingRow label="Animations" sub="Motion and transition effects">
                    <Toggle value={animations} onChange={setAnimations} />
                  </SettingRow>
                </div>
              </div>
            )}

            {/* ── Security ── */}
            {tab === 'security' && (
              <div className="flex flex-col gap-5">
                <SectionHeader title="Security" sub="Protect your account" />

                <div className="p-4 rounded-xl border border-forge-border bg-forge-card/40">
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-forge-dim mb-4">
                    Change Password
                  </p>
                  <form onSubmit={changePassword} className="flex flex-col gap-3">
                    <Field label="Current Password" type="password" value={pwForm.current}
                      onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))}
                      placeholder="Current password" />
                    <Field label="New Password" type="password" value={pwForm.next}
                      onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))}
                      placeholder="Min. 6 characters" />
                    <Field label="Confirm New Password" type="password" value={pwForm.confirm}
                      onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))}
                      placeholder="Repeat new password" />
                    {pwMsg && (
                      <p className={`text-xs font-semibold ${pwMsg.ok ? 'text-forge-green' : 'text-red-400'}`}>
                        {pwMsg.text}
                      </p>
                    )}
                    <button type="submit"
                      className="self-start px-5 py-2 rounded-lg bg-forge-orange text-white text-sm font-bold
                                 hover:bg-orange-400 transition-colors">
                      Update Password
                    </button>
                  </form>
                </div>

                <div className="rounded-xl border border-forge-border bg-forge-card/40 px-4 divide-y divide-forge-border">
                  <SettingRow label="Two-Factor Authentication" sub="Add an extra layer of account security">
                    <Toggle value={twoFA} onChange={setTwoFA} />
                  </SettingRow>
                </div>

                <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5">
                  <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-red-400 mb-3">
                    Danger Zone
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-forge-text">Delete Account</p>
                      <p className="text-[11px] text-forge-dim mt-0.5">Permanently remove your data</p>
                    </div>
                    <button className="px-4 py-1.5 rounded-lg border border-red-500/40 text-red-400 text-xs font-bold
                                       hover:bg-red-500/10 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── Help ── */}
            {tab === 'help' && (
              <div className="flex flex-col gap-5">
                <SectionHeader title="Help & Support" sub="Resources and contact options" />
                <div className="flex flex-col gap-2">
                  {[
                    { icon: '📖', label: 'Documentation',   sub: 'Learn how to use FitForge' },
                    { icon: '💬', label: 'Contact Support',  sub: 'Chat with our team' },
                    { icon: '🐛', label: 'Report a Bug',     sub: 'Help us improve the app' },
                    { icon: '⭐', label: 'Leave a Review',   sub: 'Share your experience' },
                    { icon: '📋', label: 'Privacy Policy',   sub: 'How we handle your data' },
                    { icon: '📄', label: 'Terms of Service', sub: 'Usage agreement' },
                  ].map(({ icon, label, sub }) => (
                    <button key={label}
                      className="flex items-center gap-3 p-3.5 rounded-xl border border-forge-border
                                 bg-forge-card/40 hover:border-forge-borderLight hover:bg-forge-card
                                 transition-colors text-left group">
                      <span className="text-xl">{icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-forge-text">{label}</p>
                        <p className="text-[11px] text-forge-dim">{sub}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-forge-dim group-hover:text-forge-orange transition-colors" />
                    </button>
                  ))}
                </div>
                <div className="p-4 rounded-xl border border-forge-border bg-forge-card/40 text-center">
                  <p className="text-[10px] text-forge-dim font-mono tracking-widest uppercase mb-1">
                    FitForge v2.1.0
                  </p>
                  <p className="text-[11px] text-forge-dim">Built with ❤️ for athletes who never quit.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}