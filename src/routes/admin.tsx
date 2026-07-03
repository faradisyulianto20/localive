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
      <main className="flex-1 bg-neutral-50 p-8">
        <Outlet />
      </main>
    </div>
  )
}
