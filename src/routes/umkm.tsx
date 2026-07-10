import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import UMKMCard from '../components/umkm/umkm-card'
import UMKMDetailDialog from '../components/umkm/umkm-detail-dialog'
import Pagination from '../components/shared/pagination'
import umkmData from '#/lib/umkm.json'
import { fetchUmkmList, fetchUmkmCategories } from '../lib/api-endpoints'
import type { UMKMItem } from '../lib/api-transformers'

export const Route = createFileRoute('/umkm')({ component: UMKM })

function UMKM() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 8
  const [items, setItems] = useState<UMKMItem[]>(umkmData.items as any)
  const [selectedItem, setSelectedItem] = useState<UMKMItem | null>(null)
  const [categories, setCategories] = useState<{ slug: string; name: string | { id: string; en: string } }[]>([])

  useEffect(() => {
    fetchUmkmList()
      .then(setItems)
      .catch(() => console.error('Failed to fetch UMKM from API, using fallback data'))
  }, [])

  useEffect(() => {
    fetchUmkmCategories()
      .then((cats) => setCategories(cats))
      .catch(() => {})
  }, [])

  const allTabs = [
    { slug: 'all', label: t('umkm.filter.all', 'Semua') },
    ...categories
      .filter((c) => c && c.slug)
      .map((c) => {
        const name = c.name
        const label = typeof name === 'string'
          ? name
          : (name && typeof name === 'object')
            ? name[lang] || name.id || ''
            : ''
        return { slug: c.slug, label }
      }),
  ]

  const filteredList = activeFilter === 'all'
    ? items
    : items.filter((item) => item.category === activeFilter)

  const paginatedItems = filteredList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  return (
    <div className="page-wrap py-12 md:py-16">
      <div className="rise-in text-center">
        <span className="island-kicker">{t('nav.umkm')}</span>
        <h1 className="display-title text-forest mt-2 text-3xl md:text-4xl font-bold">
          {t('page.umkm.title')}
        </h1>
      </div>

      <div className="rise-in mt-8 flex flex-wrap justify-center gap-2" style={{ animationDelay: '100ms' }}>
        {allTabs.map((tab) => (
          <button
            key={tab.slug}
            type="button"
            onClick={() => setActiveFilter(tab.slug)}
            className={`cursor-pointer rounded-full px-4 md:px-5 py-1.5 md:py-2 text-sm font-semibold transition-all duration-300 ${
              activeFilter === tab.slug
                ? 'bg-terracotta text-white'
                : 'bg-cream text-brown hover:bg-cream/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredList.length > 0 ? (
        <>
          <div className="rise-in mt-8 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ animationDelay: '200ms' }}>
            {paginatedItems.map((item) => (
              <UMKMCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-brown/70">
            {t('umkm.empty', 'Belum ada data UMKM')}
          </p>
        </div>
      )}

      {selectedItem && <UMKMDetailDialog item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </div>
  )
}
