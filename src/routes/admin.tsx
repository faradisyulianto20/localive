import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import AdminSidebar from '../components/admin/admin-sidebar'
import { useAuth } from '../hooks/use-auth'

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context }) => {
    // Allow initial render; actual guard runs in component via checkAuth
  },
  component: AdminLayout,
})

function AdminLayout() {
  const { user, checkAuth, logout } = useAuth()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    checkAuth().finally(() => setChecked(true))
  }, [])

  if (!checked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    window.location.href = '/login'
    return null
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-[#F7F7F8] p-4 md:p-8 pb-20 md:pb-8">
        <Outlet />
      </main>
    </div>
  )
}
