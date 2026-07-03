import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import UMKMCard from '../components/umkm-card'
import umkmData from '#/lib/umkm.json'

export const Route = createFileRoute('/umkm')({ component: UMKM })

const tabs = [
  { slug: 'all', labelKey: 'umkm.filter.all', labelEn: 'All' },
  { slug: 'makanan', labelKey: 'umkm.filter.makanan', labelEn: 'Food' },
  { slug: 'produk', labelKey: 'umkm.filter.produk', labelEn: 'Products' },
  { slug: 'jasa', labelKey: 'umkm.filter.jasa', labelEn: 'Services' },
]

function UMKM() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredList = activeFilter === 'all'
    ? umkmData.items
    : umkmData.items.filter((item) => item.category === activeFilter)

  return (
    <div className="page-wrap py-16">
      <div className="rise-in">
        <span className="island-kicker">{t('nav.umkm')}</span>
        <h1 className="display-title text-forest mt-2 text-4xl font-bold">
          {t('page.umkm.title')}
        </h1>
      </div>

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            onClick={() => setActiveFilter(tab.slug)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              activeFilter === tab.slug
                ? 'bg-amber-700 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {t(tab.labelKey, tab.labelEn)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredList.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredList.map((item) => (
            <UMKMCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-neutral-500">
            {t('umkm.empty', 'Belum ada data UMKM')}
          </p>
        </div>
      )}
    </div>
  )
}
