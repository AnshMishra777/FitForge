import { createContext, useContext, useState, useCallback } from 'react'
import api from '../api'

const AuthContext = createContext(null)

// ─── Demo user factory ────────────────────────────────────────────────────────
const DEMO_EMAIL    = 'demo@fitforge.app'
const DEMO_PASSWORD = 'demo123'

const makeDemoUser = (name = 'Demo Athlete', email = DEMO_EMAIL) => ({
  _id:    'demo',
  name,
  email,
  avatar: localStorage.getItem('ff_avatar') || '',
})

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ff_user')) }
    catch { return null }
  })
  const [loading, setLoading] = useState(false)

  // ── persist helpers ──────────────────────────────────────────────────────
  const persistUser = (token, userData) => {
    localStorage.setItem('ff_token', token)
    localStorage.setItem('ff_user',  JSON.stringify(userData))
    setUser(userData)
  }

  // ── login ────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    // Demo shortcut — never hits the network
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const demo = makeDemoUser()
      persistUser('demo_token', demo)
      return { success: true }
    }

    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })

      // Merge avatar from localStorage if backend doesn't have one yet
      const savedAvatar = localStorage.getItem('ff_avatar')
      const userData    = data.user.avatar
        ? data.user
        : savedAvatar
          ? { ...data.user, avatar: savedAvatar }
          : data.user

      persistUser(data.token, userData)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.'
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ── signup ───────────────────────────────────────────────────────────────
  // FIX: was calling /auth/signup — backend route is /auth/register
  const signup = useCallback(async (name, email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/register', { name, email, password })
      persistUser(data.token, data.user)
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed. Please try again.'
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ── logout ───────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('ff_token')
    localStorage.removeItem('ff_user')
    // Intentionally keep ff_avatar — survives logout/login cycle
    setUser(null)
  }, [])

  // ── updateUser — called after profile / avatar changes ───────────────────
  const updateUser = useCallback((changes) => {
    setUser(prev => {
      const updated = { ...prev, ...changes }
      localStorage.setItem('ff_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)