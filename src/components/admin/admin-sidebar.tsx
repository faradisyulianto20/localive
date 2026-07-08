import { Link, useMatchRoute } from '@tanstack/react-router'
import { useState } from 'react'
import {
  LayoutDashboard,
  Mountain,
  Store,
  FileText,
  Leaf,
  Lamp,
  Handshake,
  Lock,
  LogOut,
  Shield,
  Tags,
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useAuth } from '../../hooks/use-auth'
import { api, csrf, ApiError } from '../../lib/api'
import { useMemo } from 'react'

const baseMainMenu = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/wisata', label: 'Wisata', icon: Mountain },
  { to: '/admin/umkm', label: 'UMKM', icon: Store },
  { to: '/admin/artikel', label: 'Artikel', icon: FileText },
  { to: '/admin/lemah-asri', label: 'Lemah Asri', icon: Leaf },
]

const adminOnlyMenu = [
  { to: '/admin/admins', label: 'Admin', icon: Shield },
]

const kategoriMenu = [
  { to: '/admin/kategori', label: 'Kategori', icon: Tags },
]

const profilMenu = [
  { to: '/admin/potensi-desa', label: 'Potensi Desa', icon: Lamp },
  { to: '/admin/mitra', label: 'Mitra', icon: Handshake },
]

export default function AdminSidebar() {
  const matchRoute = useMatchRoute()
  const { user, logout } = useAuth()
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  const mainMenu = useMemo(() => {
    if (user?.role === 'super_admin') return [...baseMainMenu, ...adminOnlyMenu, ...kategoriMenu]
    return [...baseMainMenu, ...kategoriMenu]
  }, [user])

  const allMenu = useMemo(() => [...mainMenu, ...profilMenu], [mainMenu])

  const handleLogout = async () => {
    await logout()
    window.location.href = '/login'
  }

  const isActive = (to: string) => matchRoute({ to })

  return (
    <>
      <aside className="hidden md:flex sticky top-0 h-screen w-60 flex-col border-r border-[#EAEAEC] bg-white">
        <div className="flex h-16 items-center gap-3 border-b border-[#EAEAEC] px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10B981] text-sm font-bold text-white">
            L
          </div>
          <span className="text-lg font-bold text-[#111214]">Admin</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-[#9CA0AC]">
            Menu
          </p>
          {mainMenu.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                  isActive(item.to)
                    ? 'bg-[#F3F4F6] text-[#111214]'
                    : 'text-[#8B8D98] hover:bg-[#F3F4F6] hover:text-[#111214]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}

          <p className="mt-4 px-3 pb-1 text-[11px] font-medium uppercase tracking-wider text-[#9CA0AC]">
            Profil Desa
          </p>
          {profilMenu.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer pl-10 ${
                  isActive(item.to)
                    ? 'bg-[#F3F4F6] text-[#111214]'
                    : 'text-[#8B8D98] hover:bg-[#F3F4F6] hover:text-[#111214]'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-[#EAEAEC] p-3 space-y-1">
          <button
            type="button"
            onClick={() => setShowPasswordModal(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#8B8D98] hover:bg-[#F3F4F6] hover:text-[#111214] transition-colors cursor-pointer"
          >
            <Lock className="h-4 w-4 shrink-0" />
            Change Password
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EAEAEC] bg-white md:hidden">
        <div className="flex items-center justify-around px-2 py-1">
          {allMenu.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors min-w-0 flex-1 cursor-pointer ${
                  isActive(item.to)
                    ? 'text-[#111214]'
                    : 'text-[#8B8D98] hover:text-[#111214]'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>

      {showPasswordModal && (
        <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
      )}
    </>
  )
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
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
      setTimeout(onClose, 1500)
    } catch (err) {
      if (err instanceof ApiError) {
        setMessage(err.message || 'Gagal mengubah password')
      } else {
        setMessage('Gagal mengubah password')
      }
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-[#111214] mb-4">Ganti Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="modal-current-password">Password Saat Ini</Label>
            <Input
              id="modal-current-password"
              type={showPasswords ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1.5 rounded-lg border-[#EAEAEC]"
            />
          </div>

          <div>
            <Label htmlFor="modal-new-password">Password Baru</Label>
            <Input
              id="modal-new-password"
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1.5 rounded-lg border-[#EAEAEC]"
            />
          </div>

          <div>
            <Label htmlFor="modal-confirm-password">Konfirmasi Password Baru</Label>
            <Input
              id="modal-confirm-password"
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1.5 rounded-lg border-[#EAEAEC]"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-neutral-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={() => setShowPasswords(!showPasswords)}
              className="rounded cursor-pointer"
            />
            Tampilkan password
          </label>

          {message && (
            <p className={`text-sm font-medium ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 cursor-pointer">
              Simpan Password
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="cursor-pointer">
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
