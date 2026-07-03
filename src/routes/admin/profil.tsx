import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { User, Lock, LogOut } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'

export const Route = createFileRoute('/admin/profil')({ component: AdminProfil })

function AdminProfil() {
  const navigate = useNavigate()

  const stored = JSON.parse(localStorage.getItem('admin_token') || '{}')
  const [username] = useState(stored.username || 'admin')

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleChangePassword = (e: React.FormEvent) => {
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

    if (newPassword.length < 6) {
      setMessage('Password baru minimal 6 karakter')
      setMessageType('error')
      return
    }

    setMessage('Password berhasil diubah (simulasi)')
    setMessageType('success')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate({ to: '/login' })
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-[#111214] mb-8">
        Profil Admin
      </h1>

      <div className="rounded-xl border border-[#EAEAEC] bg-white p-6 mb-6">
        <h2 className="text-base font-semibold text-[#111214] mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-[#10B981]" />
          Informasi Akun
        </h2>
        <div>
          <p className="text-sm text-[#8B8D98]">Username</p>
          <p className="text-sm font-medium text-[#111214]">{username}</p>
        </div>
        <p className="text-xs text-[#8B8D98] mt-4">
          Email dan password saat ini hanya dapat diubah melalui pengaturan sistem.
        </p>
      </div>

      <div className="rounded-xl border border-[#EAEAEC] bg-white p-6 mb-6">
        <h2 className="text-base font-semibold text-[#111214] mb-4 flex items-center gap-2">
          <Lock className="h-5 w-5 text-[#10B981]" />
          Ganti Password
        </h2>

        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <Label htmlFor="currentPassword">Password Saat Ini</Label>
            <div className="relative mt-1.5">
              <Input
                id="currentPassword"
                type={showPasswords ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="newPassword">Password Baru</Label>
            <div className="relative mt-1.5">
              <Input
                id="newPassword"
                type={showPasswords ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="confirmPassword">Konfirmasi Password Baru</Label>
            <div className="relative mt-1.5">
              <Input
                id="confirmPassword"
                type={showPasswords ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={() => setShowPasswords(!showPasswords)}
              className="rounded"
            />
            Tampilkan password
          </label>

          {message && (
            <p className={`text-sm font-medium ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <Button type="submit" className="w-full">
            Simpan Password
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
