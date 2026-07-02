import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Landmark, UtensilsCrossed } from 'lucide-react'

type Destinasi = {
  icon: React.ReactNode
  title: string
  description: string
  image: string
}

const destinasiList: Destinasi[] = [
  {
    icon: <Landmark className="h-5 w-5" />,
    title: 'Pagelaran Kesenian',
    description:
      'Menikmati pertunjukan seni tradisi seperti Ketoprak Mataram, Gedhok Lesung, Jathilan, dan Karawitan yang sarat nilai budaya Jawa',
    image: '/hero.png',
  },
  {
    icon: <Landmark className="h-5 w-5" />,
    title: 'Pagelaran Kesenian',
    description:
      'Menikmati pertunjukan seni tradisi seperti Ketoprak Mataram, Gedhok Lesung, Jathilan, dan Karawitan yang sarat nilai budaya Jawa',
    image: '/hero.png',
  },
  {
    icon: <UtensilsCrossed className="h-5 w-5" />,
    title: 'Kuliner Tradisional',
    description:
      'Mencicipi kuliner khas Kotagede seperti sate klathak yang legendaris di Lapangan Karang serta kipo, jajanan tradisional yang autentik',
    image: '/hero.png',
  },
]

const CARDS_PER_VIEW = 3

export default function DestinasiSection() {
  const { t } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)

  const totalDots = Math.max(destinasiList.length, 5)

  return (
    <section className="page-wrap py-16">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            {t('nav.destinasi')} &amp; Atraksi
          </p>
          <h2 className="display-title text-forest mt-2 max-w-xl text-3xl font-bold leading-tight md:text-4xl">
            {t('section.destinasi.title', 'Jelajahi Keunikan Setiap Sudut Prenggan')}
          </h2>
        </div>

        <a
          href="/destinasi"
          className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
        >
          {t('section.destinasi.cta', 'Lihat Selengkapnya')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Cards */}
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {destinasiList.map((item, i) => (
          <div
            key={i}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <div className="flex items-center gap-2">
                {item.icon}
                <h3 className="text-lg font-bold">{item.title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {Array.from({ length: totalDots }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setActiveIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i < CARDS_PER_VIEW
                ? 'w-2 bg-emerald-600'
                : 'w-2 bg-neutral-200'
            }`}
          />
        ))}
      </div>
    </section>
  )
}