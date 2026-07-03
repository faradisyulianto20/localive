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
    {
      label: t('admin.dashboard.totalWisata', 'Total Wisata'),
      value: wisataData.items.length,
      icon: Mountain,
      color: 'bg-amber-100 text-amber-700',
      link: '/admin/wisata',
    },
    {
      label: t('admin.dashboard.totalUMKM', 'Total UMKM'),
      value: umkmData.items.length,
      icon: Store,
      color: 'bg-blue-100 text-blue-700',
      link: '/admin/umkm',
    },
    {
      label: t('admin.dashboard.totalArtikel', 'Total Artikel'),
      value: artikelData.length,
      icon: FileText,
      color: 'bg-green-100 text-green-700',
      link: '/admin/artikel',
    },
  ]

  return (
    <div>
      <h1 className="display-title text-2xl font-bold text-neutral-900">
        {t('admin.dashboard.title', 'Dashboard')}
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <Link
              key={i}
              to={stat.link}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-bold text-neutral-900">{stat.value}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-neutral-600">{stat.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="mt-10">
        <h2 className="display-title text-lg font-semibold text-neutral-900">
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
