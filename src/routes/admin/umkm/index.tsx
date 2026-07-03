import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { deleteUMKM } from '../../../server/functions/umkm'
import umkmData from '#/lib/umkm.json'

export const Route = createFileRoute('/admin/umkm/')({ component: UMKMList })

const categoryLabel: Record<string, string> = {
  makanan: 'Makanan',
  produk: 'Produk',
  jasa: 'Jasa',
}

function UMKMList() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState<string | null>(null)
  const items = umkmData.items

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Hapus "${title}"?`)) return
    setDeleting(id)
    try {
      await deleteUMKM({ data: { id } })
      navigate({ to: '/admin/umkm', replace: true })
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
            {t('admin.umkm.title', 'UMKM')}
          </h1>
          <p className="mt-1 text-sm text-[#8B8D98]">Kelola data UMKM</p>
        </div>
        <Link to="/admin/umkm/new">
          <Button>
            <Plus className="h-4 w-4" />
            {t('admin.umkm.add', 'Tambah UMKM')}
          </Button>
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-10 text-center text-sm text-[#8B8D98]">
          {t('admin.umkm.empty', 'Belum ada data UMKM')}
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-[#EAEAEC] bg-white">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[#EAEAEC] bg-[#F7F7F8]">
              <tr>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Gambar</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">{t('admin.umkm.field.titleId', 'Nama')}</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">Kategori</th>
                <th className="px-5 py-3.5 text-xs font-semibold text-[#8B8D98] uppercase tracking-wider">No Telepon</th>
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
                  <td className="px-5 py-3.5 text-sm text-[#8B8D98]">{item.noTelp}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1">
                      <Link to="/admin/umkm/$id/edit" params={{ id: item.id }}>
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
