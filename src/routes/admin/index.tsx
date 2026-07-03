import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Mountain, Store, FileText, Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'
import wisataData from '#/lib/wisata.json'
import umkmData from '#/lib/umkm.json'
import artikelData from '#/data/artikel.json'

export const Route = createFileRoute('/admin/')({ component: Dashboard })

function Dashboard() {
  const { t } = useTranslation()

  const stats = [
    { label: t('admin.dashboard.totalWisata', 'Total Wisata'), value: wisataData.items.length, icon: Mountain, link: '/admin/wisata' },
    { label: t('admin.dashboard.totalUMKM', 'Total UMKM'), value: umkmData.items.length, icon: Store, link: '/admin/umkm' },
    { label: t('admin.dashboard.totalArtikel', 'Total Artikel'), value: artikelData.length, icon: FileText, link: '/admin/artikel' },
  ]

  return (
    <div>
      <h1 className="display-title text-2xl md:text-3xl font-bold text-[#111214]">
        {t('admin.dashboard.title', 'Dashboard')}
      </h1>
      <p className="mt-1 text-sm text-[#8B8D98]">
        {t('admin.dashboard.subtitle', 'Kelola konten website Localive')}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Link
              key={i}
              to={stat.link}
              className="rounded-2xl border border-[#EAEAEC] bg-white p-6 transition-colors hover:border-[#d4d4d6]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#8B8D98]">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-[#111214]">{stat.value}</span>
              </div>
              <p className="mt-4 text-sm text-[#8B8D98]">{stat.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-8">
        <h2 className="text-base font-semibold text-[#111214]">
          {t('admin.dashboard.quickActions', 'Aksi Cepat')}
        </h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/admin/wisata/new">
            <Button>
              <Plus className="h-4 w-4" />
              {t('admin.dashboard.addWisata', 'Tambah Wisata')}
            </Button>
          </Link>
          <Link to="/admin/umkm/new">
            <Button variant="secondary">
              <Plus className="h-4 w-4" />
              {t('admin.dashboard.addUMKM', 'Tambah UMKM')}
            </Button>
          </Link>
          <Link to="/admin/artikel/new">
            <Button variant="secondary">
              <Plus className="h-4 w-4" />
              {t('admin.dashboard.addArtikel', 'Tambah Artikel')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
