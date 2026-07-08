import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { api } from '../../../lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/admin/mitra/')({ component: MitraList })

interface Item {
  id: number
  name: { id: string; en: string }
  logo: string | null
  logo_url: string | null
  status: 'draft' | 'published'
}

function MitraList() {
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['partners'],
    queryFn: () => api.get<{ data: Item[] }>('/partners'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/partners/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partners'] }),
  })

  const publishMutation = useMutation({
    mutationFn: (id: number) => api.post(`/partners/${id}/publish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partners'] }),
  })

  const unpublishMutation = useMutation({
    mutationFn: (id: number) => api.post(`/partners/${id}/unpublish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['partners'] }),
  })

  const items = data?.data ?? []

  const handleDelete = (id: number, name: string) => {
    if (!window.confirm(`Hapus "${name}"?`)) return
    deleteMutation.mutate(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div><h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">Mitra</h1><p className="mt-1 text-sm text-[#8B8D98]">Kelola mitra desa</p></div>
        <Link to="/admin/mitra/new"><Button><Plus className="h-4 w-4" />Tambah</Button></Link>
      </div>

      {isLoading && <div className="mt-10 flex justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>}
      {isError && <div className="mt-10 text-center text-sm text-red-600">Gagal memuat data.</div>}
      {!isLoading && !isError && items.length === 0 && <div className="mt-10 text-center text-sm text-[#8B8D98]">Belum ada data mitra</div>}

      {!isLoading && items.length > 0 && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#EAEAEC] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#EAEAEC] bg-[#F7F7F8]">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Logo</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Nama</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Status</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#EAEAEC] hover:bg-[#F7F7F8]">
                  <td className="px-5 py-3.5">
                    {item.logo_url ? <img src={item.logo_url} alt="" className="h-9 w-9 rounded-lg object-cover" /> : <div className="h-9 w-9 rounded-lg bg-[#F3F4F6]" />}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#111214]">{item.name.id}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {item.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      {item.status === 'draft' ? (
                        <Button variant="ghost" size="icon-xs" onClick={() => publishMutation.mutate(item.id)} title="Publish"><Eye className="h-3.5 w-3.5 text-emerald-600" /></Button>
                      ) : (
                        <Button variant="ghost" size="icon-xs" onClick={() => unpublishMutation.mutate(item.id)} title="Unpublish"><EyeOff className="h-3.5 w-3.5 text-amber-600" /></Button>
                      )}
                      <Link to="/admin/mitra/$id/edit" params={{ id: String(item.id) }}><Button variant="ghost" size="icon-xs"><Pencil className="h-3.5 w-3.5" /></Button></Link>
                      <Button variant="ghost" size="icon-xs" className="text-[#EF4444] hover:text-[#DC2626]" onClick={() => handleDelete(item.id, item.name.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
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
