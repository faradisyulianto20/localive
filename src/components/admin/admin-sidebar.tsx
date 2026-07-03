import { Link, useMatchRoute, useNavigate } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Mountain,
  Store,
  FileText,
  Leaf,
  LogOut,
} from 'lucide-react'

const menu = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/wisata', label: 'Wisata', icon: Mountain },
  { to: '/admin/umkm', label: 'UMKM', icon: Store },
  { to: '/admin/artikel', label: 'Artikel', icon: FileText },
  { to: '/admin/lemah-asri', label: 'Lemah Asri', icon: Leaf },
]

export default function AdminSidebar() {
  const matchRoute = useMatchRoute()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate({ to: '/login' })
  }

  return (
    <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-neutral-200 bg-white">
      <div className="flex h-16 items-center gap-2 border-b border-neutral-100 px-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-sm font-bold text-white">
          L
        </div>
        <span className="text-base font-bold text-neutral-900">Admin</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {menu.map((item) => {
          const isActive = matchRoute({ to: item.to })
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 hover:cursor-pointer'
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-neutral-100 p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-red-50 hover:text-red-600 hover:cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
