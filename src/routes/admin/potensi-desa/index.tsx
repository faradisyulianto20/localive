import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { getPotensiDesa, deletePotensiDesa } from '../../../server/functions/profil'
import type { PotensiDesaItem } from '../../../server/functions/profil'

export const Route = createFileRoute('/admin/potensi-desa/')({ component: PotensiDesaList })

function PotensiDesaList() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [items, setItems] = useState<PotensiDesaItem[]>([])
  const [deleting, setDeleting] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPotensiDesa()
      .then(setItems)
      .catch(() => window.alert('Gagal memuat data'))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus "${title}"?`)) return
    setDeleting(id)
    try {
      await deletePotensiDesa({ data: { id } })
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {
      window.alert('Gagal menghapus')
    }
    setDeleting(null)
  }

  if (loading) {
    return <div className="text-sm text-[#8B8D98] mt-10 text-center">Memuat...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">
            Potensi Desa
          </h1>
          <p className="mt-1 text-sm text-[#8B8D98]">Kelola potensi desa</p>
        </div>
        <Link to="/admin/potensi-desa/new">
          <Button>
            <Plus className="h-4 w-4" />
            Tambah Potensi Desa
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 text-center text-sm text-[#8B8D98]">
          Belum ada data potensi desa
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#EAEAEC] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#EAEAEC] bg-[#F7F7F8]">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Gambar</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Judul (ID)</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Warna</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#EAEAEC] hover:bg-[#F7F7F8]">
                  <td className="px-5 py-3.5">
                    <img src={item.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#111214]">{item.title.id}</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#8B8D98]">
                      {item.color}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link to="/admin/potensi-desa/$id/edit" params={{ id: item.id }}>
                        <Button variant="ghost" size="icon-xs">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => handleDelete(item.id, item.title.id)}
                        className="text-[#EF4444] hover:text-[#DC2626]"
                        disabled={deleting === item.id}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
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
