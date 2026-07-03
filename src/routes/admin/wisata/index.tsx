import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { deleteWisata } from '../../../server/functions/wisata'
import wisataData from '#/lib/wisata.json'

export const Route = createFileRoute('/admin/wisata/')({ component: WisataList })

const categoryLabel: Record<string, string> = {
  destinasi: 'Destinasi',
  atraksi: 'Atraksi',
  aktivitas: 'Aktivitas',
}

function WisataList() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState<string | null>(null)
  const items = wisataData.items

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus "${title}"?`)) return
    setDeleting(id)
    try {
      await deleteWisata({ data: { id } })
      navigate({ to: '/admin/wisata', replace: true })
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
            {t('admin.wisata.title', 'Wisata')}
          </h1>
          <p className="mt-1 text-sm text-[#8B8D98]">Kelola data wisata</p>
        </div>
        <Link to="/admin/wisata/new">
          <Button>
            <Plus className="h-4 w-4" />
            {t('admin.wisata.add', 'Tambah Wisata')}
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 text-center text-sm text-[#8B8D98]">
          {t('admin.wisata.empty', 'Belum ada data wisata')}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#EAEAEC] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#EAEAEC] bg-[#F7F7F8]">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Gambar</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">{t('admin.wisata.field.titleId', 'Judul')}</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">{t('admin.wisata.field.category', 'Kategori')}</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">ID</th>
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
                      {categoryLabel[item.category] ?? item.category}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-[#8B8D98]">{item.id.slice(0, 12)}...</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link to="/admin/wisata/$id/edit" params={{ id: item.id }}>
                        <Button variant="ghost" size="icon-xs">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => handleDelete(item.id, item.title.id)}
                        className="text-[#EF4444] hover:text-[#DC2626]"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                      <a href={`/wisata`} target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="icon-xs">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </a>
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
