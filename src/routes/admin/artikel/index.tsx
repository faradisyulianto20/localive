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
        <div>
          <h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">
            {t('admin.artikel.title', 'Artikel')}
          </h1>
          <p className="mt-1 text-sm text-[#8B8D98]">Kelola data artikel</p>
        </div>
        <Link to="/admin/artikel/new">
          <Button>
            <Plus className="h-4 w-4" />
            {t('admin.artikel.add', 'Tambah Artikel')}
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 text-center text-sm text-[#8B8D98]">
          {t('admin.artikel.empty', 'Belum ada data artikel')}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#EAEAEC] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#EAEAEC] bg-[#F7F7F8]">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Gambar</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Judul</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Kategori</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Penulis</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Tanggal</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-[#EAEAEC] hover:bg-[#F7F7F8]">
                  <td className="px-5 py-3.5">
                    <img src={item.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#111214] max-w-[200px] truncate">
                    {item.title.id}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-xs font-medium text-[#8B8D98]">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-[#8B8D98]">{item.penulis}</td>
                  <td className="px-5 py-3.5 text-sm text-[#8B8D98]">{formatDate(item.tanggal)}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link to="/admin/artikel/$id/edit" params={{ id: item.id }}>
                        <Button variant="ghost" size="icon-xs"><Pencil className="h-3.5 w-3.5" /></Button>
                      </Link>
                      <Button variant="ghost" size="icon-xs" className="text-[#EF4444] hover:text-[#DC2626]" disabled={deleting === item.id} onClick={() => handleDelete(item.id, item.title.id)}>
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
