import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useState } from 'react'
import { Settings } from 'lucide-react'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: '⬡' },
  { to: '/workouts',  label: 'Workouts',  icon: '◈' },
  { to: '/diet',      label: 'AI Diet',   icon: '◎' },
  { to: '/custom',    label: 'Custom',    icon: '⊕' },
]

export default function Navbar({ onSettingsClick }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleLogout = () => { logout(); navigate('/login') }
  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U'
  const avatarSrc = user?.avatar || localStorage.getItem('ff_avatar') || null

  return (
    <>
      {/* ── Desktop / Tablet Top Bar ── */}
      {/* bg-forge-bg/95 bypasses the CSS-var override in index.css, so we use
          inline style with color-mix so the background correctly adapts to light mode */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-xl border-b border-forge-border bg-forge-bg"
        style={{ backgroundColor: 'color-mix(in srgb, var(--forge-bg) 95%, transparent)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-3">

          {/* Logo */}
          <NavLink to="/dashboard" className="flex items-center gap-2.5 mr-3 flex-shrink-0">
            <div className="w-8 h-8 bg-forge-orange rounded-md flex items-center justify-center
                            font-display text-sm text-white tracking-widest shadow-orange">
              FF
            </div>
            <span className="font-display text-xl tracking-[0.1em] text-forge-text">FitForge</span>
          </NavLink>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV.map(({ to, label, icon }) => (
              <NavLink key={to} to={to} className={({ isActive }) =>
                `flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold
                 tracking-wide transition-all duration-150 font-body
                 ${isActive
                   ? 'bg-forge-orange/10 text-forge-orange'
                   : 'text-forge-muted hover:text-forge-text hover:bg-forge-card'
                 }`
              }>
                <span className="text-sm">{icon}</span>
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Avatar — shows uploaded photo or initials fallback */}
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-forge-orange/20 flex-shrink-0">
              {avatarSrc ? (
                <img src={avatarSrc} alt={user?.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-forge-orange to-orange-400
                                flex items-center justify-center text-xs font-bold text-white">
                  {initials}
                </div>
              )}
            </div>

            <span className="hidden lg:block text-xs text-forge-muted font-medium max-w-[120px] truncate">
              {user?.name}
            </span>

            <button onClick={onSettingsClick}>
              <Settings className="w-5 h-5 ml-7 text-forge-muted hover:text-forge-orange cursor-pointer transition" />
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenu(p => !p)}
              className="md:hidden ff-btn ff-btn-ghost ff-btn-icon"
            >
              {mobileMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenu && (
          <div className="md:hidden border-t border-forge-border bg-forge-surface px-4 pb-4 pt-2
                          flex flex-col gap-1 animate-fade-in">
            {NAV.map(({ to, label, icon }) => (
              <NavLink key={to} to={to}
                onClick={() => setMobileMenu(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold font-body
                   transition-colors ${isActive
                     ? 'bg-forge-orange/10 text-forge-orange'
                     : 'text-forge-muted hover:text-forge-text hover:bg-forge-card'
                   }`
                }
              >
                <span>{icon}</span>{label}
              </NavLink>
            ))}
            <div className="mt-2 pt-2 border-t border-forge-border">
              <button onClick={handleLogout} className="ff-btn ff-btn-ghost w-full text-sm">
                Sign out
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Mobile Bottom Nav Bar ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50
                   backdrop-blur-xl border-t border-forge-border bg-forge-surface flex pb-safe"
        style={{ backgroundColor: 'color-mix(in srgb, var(--forge-surface) 95%, transparent)' }}
      >
        {NAV.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) =>
            `flex-1 flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold
             tracking-wider font-body transition-colors
             ${isActive ? 'text-forge-orange' : 'text-forge-dim'}`
          }>
            <span className="text-lg leading-none">{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}