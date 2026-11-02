
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react'

import api from '../api'

const AuthContext = createContext(null)

// ─── Demo user ────────────────────────────────────────────────────────────────
const DEMO_EMAIL = 'demo@fitforge.app'
const DEMO_PASSWORD = 'demo123'

const makeDemoUser = (name = 'Demo Athlete', email = DEMO_EMAIL) => ({
  _id: 'demo',
  name,
  email,
  avatar: localStorage.getItem('ff_avatar') || '',
})

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ── Restore session when app loads or refreshes ───────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      // Restore the frontend-only demo session
      if (localStorage.getItem('ff_demo_mode') === 'true') {
        try {
          const savedUser = JSON.parse(localStorage.getItem('ff_user'))
          setUser(savedUser || makeDemoUser())
        } catch {
          setUser(makeDemoUser())
        }

        setLoading(false)
        return
      }

      // Restore a real session using the HTTP-only cookie
      try {
        const { data } = await api.get('/auth/me')
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    restoreSession()
  }, [])

  // ── Login ─────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    // Demo shortcut — does not authenticate with the backend
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      const demo = makeDemoUser()
      localStorage.setItem('ff_demo_mode', 'true')
      localStorage.setItem('ff_user', JSON.stringify(demo))
      setUser(demo)
      return { success: true }
    }

    setLoading(true)

    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      })

      localStorage.removeItem('ff_demo_mode')

      const savedAvatar = localStorage.getItem('ff_avatar')
      const userData = data.user.avatar
        ? data.user
        : savedAvatar
          ? { ...data.user, avatar: savedAvatar }
          : data.user

      localStorage.setItem('ff_user', JSON.stringify(userData))
      setUser(userData)

      return { success: true }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login failed. Please try again.'

      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Signup ────────────────────────────────────────────────────────────────
  const signup = useCallback(async (name, email, password) => {
    setLoading(true)

    try {
      const { data } = await api.post('/auth/register', {
        name,
        email,
        password,
      })

      localStorage.removeItem('ff_demo_mode')
      localStorage.setItem('ff_user', JSON.stringify(data.user))
      setUser(data.user)

      return { success: true }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        'Registration failed. Please try again.'

      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }, [])

  // ── Logout ────────────────────────────────────────────────────────────────
  
const logout = useCallback(async () => {
  try {
    await api.post('/auth/logout')
  } catch (err) {
    console.error('Logout request failed:', err)
  } finally {
    localStorage.removeItem('ff_demo_mode')
    localStorage.removeItem('ff_user')
    localStorage.removeItem('ff_avatar')
    setUser(null)
  }
}, [])


  // ── Update user ──────────────────────────────────────────────────────────
  const updateUser = useCallback((changes) => {
    setUser((prev) => {
      if (!prev) return prev

      const updated = { ...prev, ...changes }
      localStorage.setItem('ff_user', JSON.stringify(updated))

      return updated
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
