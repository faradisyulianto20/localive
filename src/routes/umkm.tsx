// wisata... eh, umkm.tsx (route file)
import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { LayoutGrid, UtensilsCrossed, Package, Wrench } from 'lucide-react'
import UMKMCard from '../components/umkm-card'
import Pagination from '../components/pagination'
import umkmData from '#/lib/umkm.json'

export const Route = createFileRoute('/umkm')({ component: UMKM })

const tabs = [
  { slug: 'all', labelKey: 'umkm.filter.all', labelEn: 'All', icon: LayoutGrid },
  { slug: 'makanan', labelKey: 'umkm.filter.makanan', labelEn: 'Food', icon: UtensilsCrossed },
  { slug: 'produk', labelKey: 'umkm.filter.produk', labelEn: 'Products', icon: Package },
  { slug: 'jasa', labelKey: 'umkm.filter.jasa', labelEn: 'Services', icon: Wrench },
]

function UMKM() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 8
  const activeIndex = tabs.findIndex((tab) => tab.slug === activeFilter)

  const filteredList = activeFilter === 'all'
    ? umkmData.items
    : umkmData.items.filter((item) => item.category === activeFilter)

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

      {/* Segmented Filter */}
      <div className="rise-in mt-8 flex justify-center" style={{ animationDelay: '100ms' }}>
        <div className="relative grid grid-cols-4 rounded-full bg-cream p-1 gap-1 w-full max-w-xs sm:max-w-sm">
          {/* Sliding indicator */}
          <div
            className="absolute top-1 bottom-1 rounded-full bg-terracotta shadow-sm transition-transform duration-300 ease-out"
            style={{
              width: `calc(25% - 4px)`,
              transform: `translateX(calc(${activeIndex} * 100% + ${activeIndex} * 4px))`,
              left: '2px',
            }}
          />

          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeFilter === tab.slug
            return (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setActiveFilter(tab.slug)}
                title={t(tab.labelKey, tab.labelEn)}
                aria-label={t(tab.labelKey, tab.labelEn)}
                aria-pressed={isActive}
                className="relative z-10 flex cursor-pointer items-center justify-center rounded-full py-2 transition-all duration-300"
              >
                <Icon
                  className={`h-4 w-4 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-brown'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      {filteredList.length > 0 ? (
        <>
          <div className="rise-in mt-8 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ animationDelay: '200ms' }}>
            {paginatedItems.map((item) => (
              <UMKMCard key={item.id} item={item} />
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
    </div>
  )
}