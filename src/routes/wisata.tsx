import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import WisataCard from '../components/wisata-card'
import wisataData from '#/lib/wisata.json'

export const Route = createFileRoute('/wisata')({ component: Wisata })

const tabs = [
  { slug: 'all', labelKey: 'wisata.filter.all', labelEn: 'All' },
  { slug: 'destinasi', labelKey: 'wisata.filter.destinasi', labelEn: 'Destinations' },
  { slug: 'atraksi', labelKey: 'wisata.filter.atraksi', labelEn: 'Attractions' },
  { slug: 'aktivitas', labelKey: 'wisata.filter.aktivitas', labelEn: 'Activities' },
]

function Wisata() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredList = activeFilter === 'all'
    ? wisataData.items
    : wisataData.items.filter((item) => item.category === activeFilter)

  return (
    <div className="page-wrap py-16">
      <div className="rise-in">
        <span className="island-kicker">{t('nav.wisata')}</span>
        <h1 className="display-title text-forest mt-2 text-4xl font-bold">
          {t('page.wisata.title')}
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
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {filteredList.map((item) => (
            <WisataCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-neutral-500">
            {t('wisata.empty.filtered', 'Tidak ada wisata dengan kategori ini')}
          </p>
        </div>
      )}
    </div>
  )
}
