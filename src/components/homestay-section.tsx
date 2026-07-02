import { useTranslation } from 'react-i18next'
import { ArrowRight, Check, Wifi, Snowflake, Coffee } from 'lucide-react'

type Homestay = {
  name: string
  amenities: { icon: React.ReactNode; label: string }[]
  price: string
  image: string
}

const homestayList: Homestay[] = [
  {
    name: 'Omah Prenggan 1',
    amenities: [
      { icon: <Wifi className="h-3.5 w-3.5" />, label: 'Free WiFi' },
      { icon: <Snowflake className="h-3.5 w-3.5" />, label: 'Non AC' },
    ],
    price: 'Rp 120.000',
    image: '/hero.png',
  },
  {
    name: 'Homestay Prenggan',
    amenities: [
      { icon: <Wifi className="h-3.5 w-3.5" />, label: 'Free WiFi' },
      { icon: <Snowflake className="h-3.5 w-3.5" />, label: 'AC/Non AC' },
      { icon: <Coffee className="h-3.5 w-3.5" />, label: 'Sarapan' },
    ],
    price: 'Rp 250.000',
    image: '/hero.png',
  },
  {
    name: 'Omah Prenggan 2',
    amenities: [
      { icon: <Wifi className="h-3.5 w-3.5" />, label: 'WiFi' },
      { icon: <Snowflake className="h-3.5 w-3.5" />, label: 'AC' },
      { icon: <Coffee className="h-3.5 w-3.5" />, label: 'Sarapan' },
    ],
    price: 'Rp 250.000',
    image: '/hero.png',
  },
  {
    name: 'Homestay Bu Rini',
    amenities: [
      { icon: <Wifi className="h-3.5 w-3.5" />, label: 'WiFi' },
      { icon: <Snowflake className="h-3.5 w-3.5" />, label: 'AC/non AC' },
      { icon: <Coffee className="h-3.5 w-3.5" />, label: 'Sarapan' },
    ],
    price: 'Rp 250.000',
    image: '/hero.png',
  },
]

const highlights = ['Suasana Asli Desa', 'Harga Terjangkau', 'Keramahan Warga Lokal']

export default function HomestaySection() {
  const { t } = useTranslation()

  return (
    <section className="page-wrap py-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-12">
        {/* Left column */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
            {t('nav.penginapan')}
          </p>
          <h2 className="display-title text-forest mt-3 text-4xl font-bold leading-tight">
            {t('section.homestay.title', 'Istirahat di Prenggan')}
          </h2>

          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-full bg-emerald-50 py-2.5 pl-2.5 pr-5"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-800 text-white">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-emerald-900">
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="/penginapan"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
          >
            {t('section.homestay.cta', 'Lihat Semua Homestay')}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Right grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {homestayList.map((item) => (
            <div
              key={item.name}
              className="overflow-hidden rounded-2xl border border-neutral-100 shadow-sm"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-base font-bold text-neutral-900">
                  {item.name}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-500">
                  {item.amenities.map((a, i) => (
                    <span key={i} className="flex items-center gap-1">
                      {a.icon}
                      {a.label}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-neutral-100 pt-3">
                  <p className="text-base font-bold text-red-600">
                    {item.price}
                    <span className="text-xs font-normal text-neutral-500">
                      /malam
                    </span>
                  </p>
                  <button
                    type="button"
                    className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    Hubungi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}