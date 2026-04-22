import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup, loading } = useAuth()
  const navigate = useNavigate()
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6)        { setError('Password must be at least 6 characters'); return }
    const res = await signup(form.name, form.email, form.password)
    if (res.success) navigate('/dashboard')
    else setError(res.message)
  }

  return (
    <div className="min-h-screen flex bg-forge-bg">

      {/* ── Left Hero ── */}
      <div className="hidden lg:flex flex-col flex-1 relative overflow-hidden
                      bg-gradient-to-br from-forge-bg via-[#001008] to-forge-bg
                      border-r border-forge-border px-12 py-10">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full
                        bg-forge-green/5 blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-forge-orange rounded-lg flex items-center justify-center
                          font-display text-lg text-white shadow-orange">FF</div>
          <span className="font-display text-2xl tracking-[0.1em] text-forge-text">FitForge</span>
        </div>

        <div className="flex-1 flex flex-col justify-center relative z-10 max-w-md">
          <h1 className="font-display text-[90px] leading-[0.88] tracking-tight text-forge-text mb-6">
            START<br />
            <span className="text-forge-orange">BUILDING</span><br />
            TODAY.
          </h1>
          <p className="text-forge-muted text-base leading-relaxed mb-10">
            Join thousands of athletes using FitForge to push past their limits.
            Your transformation starts right here.
          </p>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            {[
              ['26+', 'Exercises', '◈'],
              ['4',   'Programs',  '⬡'],
              ['AI',  'Diet Coach','◎'],
              ['∞',   'Routines',  '⊕'],
            ].map(([num, label, icon]) => (
              <div key={label}
                className="bg-forge-card border border-forge-border rounded-xl p-4
                           flex flex-col gap-1 animate-fade-up">
                <div className="flex items-center gap-2">
                  <span className="text-forge-orange text-lg">{icon}</span>
                  <span className="font-display text-3xl text-forge-orange tracking-wider">{num}</span>
                </div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-forge-dim">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Form ── */}
      <div className="flex-1 lg:max-w-[460px] flex items-center justify-center px-6 py-10 relative">

        {/* Mobile logo */}
        <div className="lg:hidden absolute top-6 left-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-forge-orange rounded-md flex items-center justify-center
                          font-display text-sm text-white">FF</div>
          <span className="font-display text-xl tracking-[0.1em] text-forge-text">FitForge</span>
        </div>

        <div className="w-full max-w-sm animate-fade-up">
          <h2 className="font-display text-4xl tracking-[0.05em] text-forge-text mb-1">
            CREATE ACCOUNT
          </h2>
          <p className="text-forge-muted text-sm mb-8">Begin your transformation today</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg bg-forge-redDim border border-forge-red/30
                            text-forge-red text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {[
              { label: 'Full Name',        name: 'name',     type: 'text',     placeholder: 'Alex Johnson',      auto: 'name' },
              { label: 'Email Address',    name: 'email',    type: 'email',    placeholder: 'you@example.com',   auto: 'email' },
              { label: 'Password',         name: 'password', type: 'password', placeholder: 'Minimum 6 characters', auto: 'new-password' },
              { label: 'Confirm Password', name: 'confirm',  type: 'password', placeholder: '••••••••',          auto: 'new-password' },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-forge-muted mb-1.5">
                  {field.label}
                </label>
                <input
                  className="ff-input"
                  type={field.type} name={field.name} autoComplete={field.auto}
                  value={form[field.name]} onChange={handleChange}
                  placeholder={field.placeholder} required
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="ff-btn-primary ff-btn-lg w-full mt-2"
            >
              {loading ? <span className="ff-spinner" /> : 'Create Account →'}
            </button>
          </form>

          <p className="text-center text-forge-dim text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-forge-orange font-semibold hover:underline">
              Sign in
            </Link>
          </p>
          <p className="text-center text-forge-dim text-[11px] mt-4 leading-relaxed">
            By creating an account you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}