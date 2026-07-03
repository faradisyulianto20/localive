import { createRootRouteWithContext, redirect, Outlet } from '@tanstack/react-router'
import AdminSidebar from '../components/admin/admin-sidebar'

export const Route = createRootRouteWithContext()({
  beforeLoad: () => {
    if (typeof window === 'undefined') return
    const token = localStorage.getItem('admin_token')
    if (!token) {
      throw redirect({ to: '/login' })
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-[#F7F7F8] p-4 md:p-8 pb-20 md:pb-8">
        <Outlet />
      </main>
    </div>
  )
}
