import { Link, useMatchRoute } from '@tanstack/react-router'
import {
  LayoutDashboard,
  Mountain,
  Store,
  FileText,
  Leaf,
  UserCircle,
} from 'lucide-react'

const menu = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/wisata', label: 'Wisata', icon: Mountain },
  { to: '/admin/umkm', label: 'UMKM', icon: Store },
  { to: '/admin/artikel', label: 'Artikel', icon: FileText },
  { to: '/admin/lemah-asri', label: 'Lemah Asri', icon: Leaf },
  { to: '/admin/profil', label: 'Profil', icon: UserCircle },
]

export default function AdminSidebar() {
  const matchRoute = useMatchRoute()

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
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#EAEAEC] bg-white md:hidden">
        <div className="flex items-center justify-around px-2 py-1">
          {menu.map((item) => {
            const isActive = matchRoute({ to: item.to })
            const Icon = item.icon
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-2 text-[11px] font-medium transition-colors min-w-0 flex-1 ${
                  isActive
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
    </>
  )
}
