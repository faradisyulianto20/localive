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
    <aside className="sticky top-0 flex h-screen w-60 flex-col border-r border-[#EAEAEC] bg-white">
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
        {menu.map((item) => {
          const isActive = matchRoute({ to: item.to })
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
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

      <div className="border-t border-[#EAEAEC] p-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#8B8D98] transition-colors hover:bg-[#F3F4F6] hover:text-[#EF4444]"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
