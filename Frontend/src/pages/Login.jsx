import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FEATURES = [
  { icon: '◈', text: '26+ exercises with guided form cues' },
  { icon: '◎', text: 'AI-powered nutrition & diet analysis' },
  { icon: '⬡', text: '4 science-based training programs' },
  { icon: '⊕', text: 'Build unlimited custom routines' },
]

export default function Login() {
  const { login, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    const res = await login(form.email, form.password)
    if (res.success) navigate('/dashboard')
    else setError(res.message)
  }

  const fillDemo = () => setForm({ email: 'demo@fitforge.app', password: 'demo123' })

  return (
    <div className="min-h-screen flex bg-forge-bg">

      {/* ── Left Hero Panel ── */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden
                      bg-gradient-to-br from-forge-bg via-[#0f0800] to-forge-bg
                      border-r border-forge-border px-12 py-10">

        {/* Background glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full
                        bg-forge-orange/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full
                        bg-forge-orange/3 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-forge-orange rounded-lg flex items-center justify-center
                          font-display text-lg text-white shadow-orange">FF</div>
          <span className="font-display text-2xl tracking-[0.1em] text-forge-text">FitForge</span>
        </div>

        {/* Headline */}
        <div className="flex-1 flex flex-col justify-center relative z-10 max-w-md">
          <h1 className="font-display text-[90px] leading-[0.88] tracking-tight text-forge-text mb-6">
            FORGE<br />
            <span className="text-forge-orange">YOUR</span><br />
            BEST<br />
            SELF.
          </h1>
          <p className="text-forge-muted text-base leading-relaxed mb-10">
            Science-based training programs, real-time session tracking,
            and AI nutrition coaching — all in one relentless app.
          </p>
          <div className="flex flex-col gap-3">
            {FEATURES.map((f, i) => (
              <div key={i}
                className="flex items-center gap-3 animate-fade-up"
                style={{ animationDelay: `${i * 75}ms` }}>
                <span className="w-7 h-7 rounded-md bg-forge-orange/10 border border-forge-orange/20
                                 flex items-center justify-center text-forge-orange text-sm flex-shrink-0">
                  {f.icon}
                </span>
                <span className="text-sm text-forge-muted/80">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="flex gap-6 relative z-10">
          {[['26+','Exercises'],['4','Programs'],['AI','Diet Coach']].map(([num, label]) => (
            <div key={label}>
              <p className="font-display text-3xl text-forge-orange tracking-wide">{num}</p>
              <p className="text-[10px] text-forge-dim font-semibold tracking-widest uppercase mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Form Panel ── */}
      <div className="flex-1 lg:max-w-[460px] flex items-center justify-center
                      px-6 py-10 relative">

        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-forge-orange rounded-md flex items-center justify-center
                          font-display text-sm text-white">FF</div>
          <span className="font-display text-xl tracking-[0.1em] text-forge-text">FitForge</span>
        </div>

        <div className="w-full max-w-sm animate-fade-up">
          <h2 className="font-display text-4xl tracking-[0.05em] text-forge-text mb-1">
            WELCOME BACK
          </h2>
          <p className="text-forge-muted text-sm mb-8">
            Sign in to continue your journey
          </p>

          {/* Error */}
          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-forge-redDim border border-forge-red/30
                            text-forge-red text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[10px] font-bold tracking-[0.1em] uppercase
                                text-forge-muted mb-1.5">
                Email Address
              </label>
              <input
                className="ff-input"
                type="email" name="email" autoComplete="email"
                value={form.email} onChange={handleChange}
                placeholder="you@example.com" required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted">
                  Password
                </label>
              </div>
              <input
                className="ff-input"
                type="password" name="password" autoComplete="current-password"
                value={form.password} onChange={handleChange}
                placeholder="••••••••" required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="ff-btn-primary ff-btn-lg w-full mt-2"
            >
              {loading
                ? <span className="ff-spinner" />
                : 'Sign In →'
              }
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-forge-border" />
            <span className="text-[11px] text-forge-dim tracking-wider">OR</span>
            <div className="flex-1 h-px bg-forge-border" />
          </div>

          {/* Demo */}
          <button
            onClick={fillDemo}
            className="ff-btn-secondary w-full"
          >
            <span>🎯</span> Use Demo Account
          </button>

          <p className="text-center text-forge-dim text-sm mt-6">
            New to FitForge?{' '}
            <Link to="/signup" className="text-forge-orange font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}