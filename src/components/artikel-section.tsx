// artikel-section.tsx
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { useInView } from '#/hooks/use-in-view.ts'
import ArtikelCardList from './artikel-card-list.tsx'
import ArtikelCardFeatured from './artikel-card-featured.tsx'
import type { ArtikelItem } from './artikel-card-list.tsx'

interface ArtikelSectionProps {
  items: ArtikelItem[]
}

export default function ArtikelSection({ items }: ArtikelSectionProps) {
  const { t } = useTranslation()
  const latest = items.slice(0, 4)
  const listItems = latest.slice(0, 3)
  const featuredItem = latest[0]
  const { ref, inView } = useInView()

  if (latest.length === 0) return null

  return (
    <section id="artikel" ref={ref} className={`page-wrap py-12 md:py-16 transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="display-title text-forest text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {t('section.artikel.title', 'Artikel & Berita')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('section.artikel.subtitle', 'Informasi terbaru seputar Tamanan dan Lemah Asri')}
          </p>
        </div>

        <a
          href="/artikel"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-brown/60 px-6 py-3 text-sm font-semibold text-brown cursor-pointer transition-all duration-300 hover:bg-muted"
        >
          {t('nav.artikel')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Kolom kiri: list artikel horizontal */}
        <div className="flex flex-col gap-5">
          {listItems.map((item, index) => (
            <div
              key={item.id}
              className={`transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ArtikelCardList item={item} />
            </div>
          ))}
        </div>

        {/* Kolom kanan: heading + featured card */}
        <div>
          <h3 className="display-title text-forest text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
            {t('section.artikel.featuredTitle', 'Tumbuhkan Wawasanmu')}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">
            {t(
              'section.artikel.featuredSubtitle',
              'Simak informasi, kreasi warga, dan pencapaian Padukuhan Tamanan untuk terus berkembang bersama.'
            )}
          </p>
          

          {featuredItem && (
            <div
              className={`mt-6 transition-all duration-500 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}
              style={{ animationDelay: '300ms' }}
            >
              <ArtikelCardFeatured item={featuredItem} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}