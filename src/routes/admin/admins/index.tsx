import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, Pencil, Trash2, Shield } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { api } from '../../../lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/admin/admins/')({ component: AdminList })

interface Admin {
  id: number
  name: string
  email: string
  role: 'super_admin' | 'admin'
}

function AdminList() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admins'],
    queryFn: () => api.get<{ data: Admin[] }>('/admins'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/admins/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admins'] }),
  })

  const items = data?.data ?? []

  const handleDelete = (id: number, name: string) => {
    if (!window.confirm(`Hapus akun "${name}"?`)) return
    deleteMutation.mutate(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">Admin</h1><p className="mt-1 text-sm text-[#8B8D98]">Kelola akun admin</p></div>
        <Link to="/admin/admins/new"><Button><Plus className="h-4 w-4" />Tambah Admin</Button></Link>
      </div>

      {isLoading && <div className="mt-10 flex justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>}
      {isError && <div className="mt-10 text-center text-sm text-red-600">Gagal memuat data.</div>}

      {!isLoading && items.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#EAEAEC] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#EAEAEC] bg-[#F7F7F8]">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Nama</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Email</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Role</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#EAEAEC] hover:bg-[#F7F7F8]">
                  <td className="px-5 py-3.5 text-sm text-[#111214]">{item.name}</td>
                  <td className="px-5 py-3.5 text-sm text-[#8B8D98]">{item.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${item.role === 'super_admin' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                      <Shield className="h-3 w-3" />{item.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link to="/admin/admins/$id/edit" params={{ id: String(item.id) }}><Button variant="ghost" size="icon-xs"><Pencil className="h-3.5 w-3.5" /></Button></Link>
                      <Button variant="ghost" size="icon-xs" className="text-[#EF4444] hover:text-[#DC2626]" onClick={() => handleDelete(item.id, item.name)}><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
