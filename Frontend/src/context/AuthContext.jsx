import { createContext, useContext, useState, useCallback } from 'react'
import api from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ff_user')) }
    catch { return null }
  })
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('ff_token', data.token)
      localStorage.setItem('ff_user', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true }
    } catch (err) {
      // Demo mode: accept demo@fitforge.app / demo123
      if (email === 'demo@fitforge.app' && password === 'demo123') {
        const demoUser = { _id: 'demo', name: 'Demo Athlete', email }
        localStorage.setItem('ff_token', 'demo_token')
        localStorage.setItem('ff_user', JSON.stringify(demoUser))
        setUser(demoUser)
        return { success: true }
      }
      return { success: false, message: err.response?.data?.message || 'Invalid credentials' }
    } finally {
      setLoading(false)
    }
  }, [])

  const signup = useCallback(async (name, email, password) => {
    setLoading(true)
    try {
      const { data } = await api.post('/auth/signup', { name, email, password })
      localStorage.setItem('ff_token', data.token)
      localStorage.setItem('ff_user', JSON.stringify(data.user))
      setUser(data.user)
      return { success: true }
    } catch (err) {
      // Demo fallback
      const demoUser = { _id: Date.now().toString(), name, email }
      localStorage.setItem('ff_token', 'demo_token_' + Date.now())
      localStorage.setItem('ff_user', JSON.stringify(demoUser))
      setUser(demoUser)
      return { success: true }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('ff_token')
    localStorage.removeItem('ff_user')
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)