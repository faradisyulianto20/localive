import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useInView } from '#/hooks/use-in-view.ts'
import UMKMCard from '../umkm/umkm-card'
import UMKMDetailDialog from '../umkm/umkm-detail-dialog'
import { fetchUmkmList, fetchUmkmCategories } from '../../lib/api-endpoints'
import umkmData from '#/lib/umkm.json'
import type { UMKMItem } from '../umkm/umkm-card'

export default function ProdukUMKMSection() {
  const { t } = useTranslation()
  const [items, setItems] = useState<UMKMItem[]>((umkmData.items as UMKMItem[]).slice(0, 6))
  const scrollRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView()
  const [selectedItem, setSelectedItem] = useState<UMKMItem | null>(null)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    fetchUmkmList()
      .then((list) => {
        if (list.length > 0) setItems(list.slice(0, 6))
      })
      .catch(() => console.error('Failed to fetch UMKM from API, using fallback data'))
  }, [])

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [items.length])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 240
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <>
    <section id="umkm" ref={ref} className={`page-wrap py-12 md:py-16 transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          {t('section.umkm.kicker')}
        </p>
        <h2 className="display-title text-forest mt-2 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
          {t('section.umkm.title', 'Produk Unggulan UMKM Tamanan')}
        </h2>
      </div>

      <div className="relative mt-10">
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-3 md:-translate-x-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-900 shadow-md ring-1 ring-black/5 transition-colors hover:bg-emerald-50"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        >
          {items.map((item, index) => (
              <div
              key={item.id}
              className={`snap-start shrink-0 w-60 sm:w-75 transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <UMKMCard item={item} onClick={() => setSelectedItem(item)} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-3 md:translate-x-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-emerald-900 shadow-md ring-1 ring-black/5 transition-colors hover:bg-emerald-50"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="/umkm"
          className="inline-flex items-center gap-2 rounded-full border border-amber-700/60 px-6 py-3 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
        >
          {t('section.umkm.cta', 'Lihat Semua UMKM')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>

    {selectedItem && <UMKMDetailDialog item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </>
  )
}
