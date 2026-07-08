import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { api } from '../../../lib/api'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const Route = createFileRoute('/admin/kategori/')({ component: KategoriPage })

interface Category {
  id: number
  slug: string
  name: { id: string; en: string }
}

type Tab = 'artikel' | 'umkm' | 'wisata'

const endpoints: Record<Tab, string> = { artikel: 'article-categories', umkm: 'umkm-categories', wisata: 'tour-categories' }
const labels: Record<Tab, string> = { artikel: 'Artikel', umkm: 'UMKM', wisata: 'Wisata' }
const tabs: Tab[] = ['artikel', 'umkm', 'wisata']

function KategoriPage() {
  const [tab, setTab] = useState<Tab>('artikel')
  const [modal, setModal] = useState<{ type: 'create' | 'edit'; id?: number } | null>(null)
  const [form, setForm] = useState({ id: '', en: '', slug: '' })
  const [error, setError] = useState('')

  const queryClient = useQueryClient()
  const endpoint = endpoints[tab]

  const { data, isLoading } = useQuery({
    queryKey: [endpoint],
    queryFn: () => api.get<{ data: Category[] }>(`/${endpoint}`),
  })

  const items = data?.data ?? []
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [endpoint] })

  const createMutation = useMutation({
    mutationFn: (body: { name: { id: string; en: string }; slug: string }) => api.post(`/${endpoint}`, body),
    onSuccess: () => { invalidate(); closeModal() },
    onError: () => setError('Gagal menyimpan'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, ...body }: { id: number; name: { id: string; en: string }; slug: string }) =>
      api.put(`/${endpoint}/${id}`, body),
    onSuccess: () => { invalidate(); closeModal() },
    onError: () => setError('Gagal menyimpan'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/${endpoint}/${id}`),
    onSuccess: () => invalidate(),
  })

  const openCreate = () => {
    setModal({ type: 'create' })
    setForm({ id: '', en: '', slug: '' })
    setError('')
  }

  const openEdit = (item: Category) => {
    setModal({ type: 'edit', id: item.id })
    setForm({ id: item.name.id, en: item.name.en, slug: item.slug })
    setError('')
  }

  const closeModal = () => setModal(null)

  const handleSave = () => {
    if (!form.id || !form.slug) { setError('Nama ID dan slug wajib diisi'); return }
    const body = { name: { id: form.id, en: form.en }, slug: form.slug }
    if (modal?.type === 'create') createMutation.mutate(body)
    else if (modal?.id) updateMutation.mutate({ id: modal.id, ...body })
  }

  const saving = createMutation.isPending || updateMutation.isPending

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">Kategori</h1>
        <Button onClick={openCreate}><Plus className="h-4 w-4" />Tambah</Button>
      </div>

      <div className="mt-4 flex gap-2 border-b border-[#EAEAEC]">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => { setTab(t); closeModal() }}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
              tab === t ? 'border-[#10B981] text-[#111214]' : 'border-transparent text-[#8B8D98] hover:text-[#111214]'
            }`}
          >
            {labels[t]}
          </button>
        ))}
      </div>

      {isLoading && <div className="mt-10 flex justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" /></div>}

      {!isLoading && (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#EAEAEC] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#EAEAEC] bg-[#F7F7F8]">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Nama (ID)</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">English</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Slug</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider w-[100px]">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#EAEAEC] hover:bg-[#F7F7F8]">
                  <td className="px-5 py-3.5 text-sm text-[#111214]">{item.name.id}</td>
                  <td className="px-5 py-3.5 text-sm text-[#8B8D98]">{item.name.en || '-'}</td>
                  <td className="px-5 py-3.5 text-xs text-[#8B8D98] font-mono">{item.slug}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon-xs" onClick={() => openEdit(item)}><Pencil className="h-3.5 w-3.5" /></Button>
                      <Button variant="ghost" size="icon-xs" className="text-[#EF4444] hover:text-[#DC2626]" onClick={() => { if (window.confirm('Hapus kategori ini?')) deleteMutation.mutate(item.id) }}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-sm text-[#8B8D98]">Belum ada kategori</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={closeModal}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-[#111214] mb-4">
              {modal.type === 'create' ? 'Tambah Kategori' : 'Edit Kategori'}
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="modal-name">Nama (Indonesia)</Label>
                <Input id="modal-name" className="mt-1.5 rounded-lg border-[#EAEAEC]" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} placeholder="Nama kategori..." />
              </div>
              <div>
                <Label htmlFor="modal-en">English</Label>
                <Input id="modal-en" className="mt-1.5 rounded-lg border-[#EAEAEC]" value={form.en} onChange={(e) => setForm({ ...form, en: e.target.value })} placeholder="Opsional..." />
              </div>
              <div>
                <Label htmlFor="modal-slug">Slug</Label>
                <Input id="modal-slug" className="mt-1.5 rounded-lg border-[#EAEAEC]" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="nama-kategori" />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
            <div className="mt-6 flex gap-3">
              <Button onClick={handleSave} disabled={saving} className="flex-1">{saving ? '...' : 'Simpan'}</Button>
              <Button variant="outline" onClick={closeModal} className="flex-1">Batal</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
