import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { User, Lock, LogOut } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { useAuth } from '../../hooks/use-auth'
import { api, csrf, ApiError } from '../../lib/api'

export const Route = createFileRoute('/admin/profil')({ component: AdminProfil })

function AdminProfil() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [loading, setLoading] = useState(false)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage('Semua field harus diisi')
      setMessageType('error')
      return
    }

    if (newPassword !== confirmPassword) {
      setMessage('Password baru tidak cocok')
      setMessageType('error')
      return
    }

    setLoading(true)
    try {
      await csrf()
      await api.post('/change-password', {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: confirmPassword,
      })
      setMessage('Password berhasil diubah')
      setMessageType('success')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      if (err instanceof ApiError) {
        const msg = Object.values(err.errors).flat().join(', ')
        setMessage(msg || 'Gagal mengubah password')
      } else {
        setMessage('Gagal mengubah password')
      }
      setMessageType('error')
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await logout()
    navigate({ to: '/login' })
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-[#111214] mb-8">Profil Admin</h1>

      {user && (
        <div className="rounded-xl border border-[#EAEAEC] bg-white p-6 mb-6">
          <h2 className="text-base font-semibold text-[#111214] mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-[#10B981]" />
            Informasi Akun
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-[#8B8D98]">Nama</p>
              <p className="text-sm font-medium text-[#111214]">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-[#8B8D98]">Email</p>
              <p className="text-sm font-medium text-[#111214]">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-[#8B8D98]">Role</p>
              <p className="text-sm font-medium text-[#111214]">{user.role === 'super_admin' ? 'Super Admin' : 'Admin'}</p>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-[#EAEAEC] bg-white p-6 mb-6">
        <h2 className="text-base font-semibold text-[#111214] mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-[#10B981]" />
          Ganti Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Password Saat Ini</Label>
            <Input
              id="currentPassword"
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="newPassword">Password Baru</Label>
            <Input
              id="newPassword"
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <Input
              id="confirmPassword"
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
            <input type="checkbox" checked={showPasswords} onChange={() => setShowPasswords(!showPasswords)} className="rounded" />
            Tampilkan password
          </label>

          {message && (
            <p className={`text-sm font-medium ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? '...' : 'Simpan Password'}
          </Button>
        </form>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-6 py-3 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  )
}
