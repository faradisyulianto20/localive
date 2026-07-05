import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import WisataCard from '../components/wisata-card'
import Pagination from '../components/pagination'
import wisataData from '#/lib/wisata.json'

export const Route = createFileRoute('/wisata')({ component: Wisata })

const tabs = [
  { slug: 'all', labelKey: 'wisata.filter.all', labelEn: 'All' },
  { slug: 'destinasi', labelKey: 'wisata.filter.destinasi', labelEn: 'Destinations' },
  { slug: 'atraksi', labelKey: 'wisata.filter.atraksi', labelEn: 'Attractions' },
  { slug: 'aktivitas', labelKey: 'wisata.filter.aktivitas', labelEn: 'Activities' },
]

// ID item yang ingin ditonjolkan sebagai sorotan utama (bisa diganti manual sesuai kebutuhan admin)
const FEATURED_ID = 'destinasi-cagar-budaya-ndokteran'
// ID item pendukung yang tampil di samping hero (terbaru/terpopuler kedua & ketiga)
const HIGHLIGHT_IDS = ['atraksi-macapat-triwiji', 'aktivitas-jelajah-desa-sepeda']

const categoryLabel: Record<string, string> = {
  destinasi: 'Destinasi',
  atraksi: 'Atraksi',
  aktivitas: 'Aktivitas',
}

function Wisata() {
  const { t, i18n } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('all')
  const lang = i18n.language?.startsWith('en') ? 'en' : 'id'
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  const featuredItem = wisataData.items.find((item) => item.id === FEATURED_ID)
  const highlightItems = HIGHLIGHT_IDS
    .map((id) => wisataData.items.find((item) => item.id === id))
    .filter(Boolean) as typeof wisataData.items

  const excludedIds = new Set([FEATURED_ID, ...HIGHLIGHT_IDS])

  const filteredList = (
    activeFilter === 'all'
      ? wisataData.items
      : wisataData.items.filter((item) => item.category === activeFilter)
  ).filter((item) => !excludedIds.has(item.id))

  const paginatedItems = filteredList.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE)

  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter])

  return (
    <div className="page-wrap py-12 md:py-16">
      <div className="rise-in">
        <span className="island-kicker">{t('nav.wisata')}</span>
        <h1 className="display-title text-forest mt-2 text-3xl md:text-4xl font-bold">
          {t('page.wisata.title')}
        </h1>
      </div>

      {/* Sorotan Utama / Featured */}
      {featuredItem && (
        <div className="rise-in mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5" style={{ animationDelay: '100ms' }}>
          {/* Hero besar */}
          <Link
            to="/wisata/$slug"
            params={{ slug: featuredItem.id }}
            className="lg:col-span-2 group relative overflow-hidden rounded-3xl min-h-[380px] md:min-h-[440px] flex items-end p-6 md:p-8 cursor-pointer"
          >
            <img
              src={featuredItem.image}
              alt={featuredItem.title[lang]}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />

            <div className="relative z-10 text-white">
              <span className="inline-block rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wide mb-3">
                {t(`wisata.filter.${featuredItem.category}`, categoryLabel[featuredItem.category])}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
                {featuredItem.title[lang]}
              </h2>
              <p className="text-sm md:text-base text-white/85 max-w-xl line-clamp-2">
                {featuredItem.description[lang]}
              </p>
            </div>

            <span className="absolute right-3 top-3 rounded-full bg-olive px-2 py-0.5 text-[10px] font-semibold text-white">
              {t('wisata.tersedia', 'Tersedia')}
            </span>
          </Link>

          {/* Highlight kecil */}
          <div className="flex flex-col gap-4 md:gap-5">
            {highlightItems.map((item) => (
              <Link
                key={item.id}
                to="/wisata/$slug"
                params={{ slug: item.id }}
                className="group relative overflow-hidden rounded-2xl flex-1 min-h-[170px] flex items-end p-5 cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.title[lang]}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="inline-block rounded-full bg-white/15 backdrop-blur px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide mb-2">
                    {t(`wisata.filter.${item.category}`, categoryLabel[item.category])}
                  </span>
                  <h3 className="text-base md:text-lg font-bold leading-snug line-clamp-2">
                    {item.title[lang]}
                  </h3>
                </div>

                <span className="absolute right-2 top-2 rounded-full bg-olive px-2 py-0.5 text-[10px] font-semibold text-white">
                  {t('wisata.tersedia', 'Tersedia')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="rise-in mt-10 flex flex-wrap gap-1.5 md:gap-2" style={{ animationDelay: '200ms' }}>
        {tabs.map((tab) => (
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
            {t(tab.labelKey, tab.labelEn)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredList.length > 0 ? (
        <>
          <div className="rise-in mt-8 grid grid-cols-1 gap-4 md:gap-5 md:grid-cols-3" style={{ animationDelay: '300ms' }}>
            {paginatedItems.map((item) => (
              <WisataCard key={item.id} item={item} />
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-brown/70">
            {t('wisata.empty.filtered', 'Tidak ada wisata dengan kategori ini')}
          </p>
        </div>
      )}
    </div>
  )
}