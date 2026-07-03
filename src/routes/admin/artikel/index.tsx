import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { deleteArtikel } from '../../../server/functions/artikel'
import artikelData from '#/data/artikel.json'

export const Route = createFileRoute('/admin/artikel/')({ component: ArtikelList })

function ArtikelList() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState<string | null>(null)
  const items = artikelData

  const formatDate = (d: string) => {
    const date = new Date(d)
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus "${title}"?`)) return
    setDeleting(id)
    try {
      await deleteArtikel({ data: { id } })
      navigate({ to: '/admin/artikel', replace: true })
    } catch {
      window.alert('Gagal menghapus')
    }
    setDeleting(null)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="display-title text-2xl font-bold text-neutral-900">
          {t('admin.artikel.title', 'Artikel')}
        </h1>
        <Link to="/admin/artikel/new">
          <Button>
            <Plus className="h-4 w-4" />
            {t('admin.artikel.add', 'Tambah Artikel')}
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 text-center text-neutral-500">
          {t('admin.artikel.empty', 'Belum ada data artikel')}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-neutral-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-neutral-600">Gambar</th>
                <th className="px-4 py-3 font-semibold text-neutral-600">Judul</th>
                <th className="px-4 py-3 font-semibold text-neutral-600">Kategori</th>
                <th className="px-4 py-3 font-semibold text-neutral-600">Penulis</th>
                <th className="px-4 py-3 font-semibold text-neutral-600">Tanggal</th>
                <th className="px-4 py-3 font-semibold text-neutral-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="px-4 py-3">
                    <img src={item.image} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  </td>
                  <td className="px-4 py-3 font-medium text-neutral-900 max-w-[200px] truncate">
                    {item.title.id}
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{item.penulis}</td>
                  <td className="px-4 py-3 text-neutral-600">{formatDate(item.tanggal)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link to="/admin/artikel/$id/edit" params={{ id: item.id }}>
                        <Button variant="ghost" size="icon-xs"><Pencil className="h-3.5 w-3.5" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon-xs" className="text-red-500 hover:text-red-700" disabled={deleting === item.id} onClick={() => handleDelete(item.id, item.title.id)}>
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
