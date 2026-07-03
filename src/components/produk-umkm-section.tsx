import { useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useInView } from '#/hooks/use-in-view.ts'
import UMKMCard from './umkm-card'
import umkmData from '#/lib/umkm.json'

export default function ProdukUMKMSection() {
  const { t } = useTranslation()
  const items = umkmData.items.slice(0, 6)
  const scrollRef = useRef<HTMLDivElement>(null)
  const { ref, inView } = useInView()

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return
    const scrollAmount = 240
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section id="umkm" ref={ref} className={`page-wrap py-16 transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
          {t('section.umkm.kicker')}
        </p>
        <h2 className="display-title text-forest mt-2 text-3xl font-bold leading-tight md:text-4xl">
          {t('section.umkm.title', 'Produk Unggulan UMKM Tamanan')}
        </h2>
      </div>

      <div className="relative mt-10">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`snap-start shrink-0 w-[220px] transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <UMKMCard item={item} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => scroll('left')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 text-white transition-colors hover:bg-amber-800"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 text-white transition-colors hover:bg-amber-800"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
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
  )
}
