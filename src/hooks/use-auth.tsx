import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { api, csrf, ApiError } from '#/lib/api'

interface User {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'admin'
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      await csrf()
      const res = await api.post<{ data: User }>('/login', { email, password })
      setUser(res.data)
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      await api.post('/logout')
    } catch {
      // ignore
    } finally {
      setUser(null)
      setLoading(false)
    }
  }, [])

  const checkAuth = useCallback(async () => {
    try {
      const res = await api.get<{ data: User }>('/me')
      setUser(res.data)
    } catch {
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
