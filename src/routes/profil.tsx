import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { Building2 } from 'lucide-react'
import { SafeImage } from '../components/ui/safe-image'
import profilData from '#/data/profil.json'
import { chunkArray } from '../lib/utils'
import { fetchVillagePotentials, fetchPartners } from '../lib/api-endpoints'
import type { PotensiDesaItem, PartnerItem } from '../lib/api-transformers'

export const Route = createFileRoute('/profil')({ component: Profil })

type LocalizedText = { id: string; en: string }

function Profil() {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const data = profilData
  const [potensiItems, setPotensiItems] = useState<PotensiDesaItem[]>([])
  const [mitraItems, setMitraItems] = useState<PartnerItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      fetchVillagePotentials(),
      fetchPartners(),
    ])
      .then(([potensi, mitra]) => {
        setPotensiItems(potensi)
        setMitraItems(mitra)
        if (potensi.length > 0) setActiveId(potensi[0].id)
      })
      .catch(() => {})
  }, [])

  const displayPotensi = potensiItems.length > 0 ? potensiItems : (data.potensiDesa?.items ?? []) as any
  const displayMitra = mitraItems.length > 0 ? mitraItems : (data.mitra?.items ?? []) as any
  const currentActive = activeId ?? displayPotensi[0]?.id ?? null

  return (
    <div>
      {/* Hero */}
      <section className="relative flex items-center justify-center min-h-[50vh] overflow-hidden -mt-20 text-center">
        <img
          src="/images/hero.png"
          alt={data.hero.title[lang] ?? data.hero.title.id}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/20 to-transparent" />
        <div className="page-wrap relative z-10 flex flex-col items-center rise-in">
          <span className="inline-block rounded-full bg-terracotta px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white">
            {data.hero.badge[lang] ?? data.hero.badge.id}
          </span>
          <h1 className="display-title mt-4 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {data.hero.title[lang] ?? data.hero.title.id}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-white/80">
            {data.hero.subtitle[lang] ?? data.hero.subtitle.id}
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="rise-in page-wrap py-12 md:py-16" style={{ animationDelay: '100ms' }}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-brown">
            {data.intro.eyebrow[lang] ?? data.intro.eyebrow.id}
          </p>
          <h2 className="display-title text-forest mt-3 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
            {data.intro.heading[lang] ?? data.intro.heading.id}
          </h2>
          {data.intro.description.map((paragraph: LocalizedText, i: number) => (
            <p key={i} className="mt-4 text-sm sm:text-[15px] leading-relaxed text-brown/80">
              {paragraph[lang] ?? paragraph.id}
            </p>
          ))}
        </div>
      </section>

      {/* Potensi Desa */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-olive/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-olive/10 to-transparent" />
        <div className="page-wrap relative z-10">
          <div className="rise-in text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-brown">
              {data.potensiDesa.eyebrow[lang] ?? data.potensiDesa.eyebrow.id}
            </p>
            <h2 className="display-title text-forest mt-2 text-2xl md:text-3xl lg:text-4xl font-bold">
              {data.potensiDesa.heading[lang] ?? data.potensiDesa.heading.id}
            </h2>
          </div>

          {chunkArray(displayPotensi, 4).map((chunk, rowIdx) => (
            <div key={rowIdx} className="rise-in mt-10 flex flex-col gap-4 md:h-96 md:flex-row" style={{ animationDelay: '100ms' }}>
              {chunk.map((item: any) => {
                const isActive = currentActive === item.id
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveId(item.id)}
                    className={`relative isolate flex h-64 flex-col items-start overflow-hidden rounded-2xl border-2 bg-forest/50 p-5 text-left transition-all duration-500 ease-out cursor-pointer md:h-full ${
                      isActive
                        ? 'md:flex-[3] justify-end border-olive shadow-xl'
                        : 'md:flex-[1] justify-start border-transparent'
                    }`}
                  >
                    <SafeImage
                      src={item.image}
                      alt={item.title[lang] ?? item.title.id}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out ${
                        isActive ? 'opacity-100' : 'opacity-10'
                      }`}
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-forest/95 via-forest/40 to-transparent transition-opacity duration-500 ${
                        isActive ? 'opacity-60' : 'opacity-100'
                      }`}
                    />
                    <div className="relative z-10">
                      {item.badge && (
                        <span className="mb-2 inline-block rounded-full bg-olive px-3 py-1 text-xs font-semibold text-white">
                          {item.badge[lang] ?? item.badge.id}
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-white transition-all duration-500">
                        {item.title[lang] ?? item.title.id}
                      </h3>
                      <p className="mt-2 text-sm text-white/80">
                        {item.description[lang] ?? item.description.id}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </section>

      {/* Mitra */}
      <section className="rise-in page-wrap overflow-hidden py-12 md:py-16" style={{ animationDelay: '200ms' }}>
        <div className="text-center">
          <h2 className="display-title text-forest text-2xl md:text-3xl lg:text-4xl font-bold">
            {data.mitra.heading[lang] ?? data.mitra.heading.id}
          </h2>
        </div>

        <div className="mt-10 marquee-row">
          <div className="marquee-track marquee-left">
            {[...displayMitra, ...displayMitra].map((mitra: any, i: number) => (
              <MitraLogo key={`${mitra.id}-${i}`} mitra={mitra} />
            ))}
          </div>
        </div>

        <style>{`
          .marquee-row { overflow: hidden; width: 100%; }
          .marquee-track { display: flex; width: max-content; gap: 4rem; align-items: center; animation-duration: 30s; animation-timing-function: linear; animation-iteration-count: infinite; }
          .marquee-row:hover .marquee-track { animation-play-state: paused; }
          .marquee-left { animation-name: marquee-left; }
          @keyframes marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>
      </section>
    </div>
  )
}

function MitraLogo({ mitra }: { mitra: any }) {
  return (
    <div className="flex w-48 shrink-0 flex-col items-center gap-3">
      {mitra.logo ? (
        <SafeImage src={mitra.logo} alt={mitra.nama} className="h-20 w-full object-contain" />
      ) : (
        <Building2 className="h-16 w-16 text-brown/60" />
      )}
      <span className="block max-w-[12rem] truncate text-center text-sm font-medium text-brown" title={mitra.nama}>
        {mitra.nama}
      </span>
    </div>
  )
}
