import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { useAuth } from '../hooks/use-auth'

export const Route = createFileRoute('/login')({ component: Login })

function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError(t('page.login.error', 'Email dan password wajib diisi'))
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      navigate({ to: '/admin' })
    } catch (err) {
      setError(t('page.login.error', 'Email atau password salah'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
              L
            </div>
            <h1 className="display-title mt-4 text-2xl font-bold text-neutral-900">
              {t('page.login.title', 'Login Admin')}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <Label htmlFor="email">{t('page.login.email', 'Email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
                placeholder="admin@localive.id"
                autoComplete="email"
              />
            </div>

            <div>
              <Label htmlFor="password">{t('page.login.password', 'Password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
                placeholder="••••••"
                autoComplete="current-password"
              />
            </div>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '...' : t('page.login.submit', 'Masuk')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
