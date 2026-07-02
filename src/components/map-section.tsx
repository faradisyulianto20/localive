import { useTranslation } from 'react-i18next'
import { Star, Info, MapPin, Minus, Plus } from 'lucide-react'

export default function MapSection() {
  const { t } = useTranslation()

  return (
    <section className="grid grid-cols-1 overflow-hidden md:grid-cols-2">
      {/* Left image */}
      <div className="relative min-h-[420px] md:min-h-[620px]">
        <img
          src="/hero.png"
          alt="Kirab budaya Kampung Wisata Prenggan"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-950/20 to-emerald-950 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-emerald-950" />
      </div>

      {/* Right panel */}
      <div className="bg-emerald-950 px-6 py-14 md:px-14 md:py-20">
        <h2 className="display-title text-2xl font-semibold leading-snug text-white md:text-3xl">
          {t(
            'section.map.title',
            'Temukan restoran, toko souvenir, dan atraksi di sekitarmu!',
          )}
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
          {t(
            'section.map.description',
            'Gunakan fitur Near Me untuk menemukan destinasi, kuliner, dan fasilitas terdekat dari lokasi Anda saat ini.',
          )}
        </p>

        {/* Map mockup */}
        <div className="relative mt-8 aspect-[4/3] w-full overflow-hidden rounded-2xl">
          <img
            src="/map.png"
            alt="Peta lokasi"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Zoom controls */}
          <div className="absolute bottom-4 right-4 flex flex-col overflow-hidden rounded-lg bg-white shadow-md">
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center border-b border-neutral-200 text-neutral-600 hover:bg-neutral-50"
            >
              <Plus className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center text-neutral-600 hover:bg-neutral-50"
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>

          {/* Location dot */}
          <div className="absolute bottom-16 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md">
            <MapPin className="h-4 w-4 text-emerald-700" />
          </div>

          {/* Place popup card */}
          <div className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-3 shadow-xl sm:w-[300px]">
            <p className="text-xs font-bold uppercase tracking-wide text-neutral-800">
              Rumah Makan Jos Tenan
            </p>

            <div className="mt-2 aspect-[16/9] overflow-hidden rounded-lg">
              <img
                src="/hero.png"
                alt="Rumah Makan Jos Tenan"
                className="h-full w-full object-cover"
              />
            </div>

            <p className="mt-2 text-xs leading-relaxed text-neutral-600">
              Restoran yang menyediakan beragam masakan khas Jogja dan Jawa
              Tengah
            </p>

            <div className="mt-3 rounded-lg bg-neutral-50 p-2.5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-neutral-700">
                  Details from Google Maps
                </p>
                <button
                  type="button"
                  className="text-[11px] text-neutral-400 hover:text-neutral-600"
                >
                  Remove
                </button>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                Jl. Boulevard Diponegoro No.105, Bencongan, Kecamatan Kelapa
                Dua, Kabupaten Tangerang, Banten 15810
              </p>
              <a
                href="#"
                className="mt-1 block text-[11px] font-medium text-blue-600 hover:underline"
              >
                supermalkarawaci.com
              </a>
              <p className="mt-0.5 text-[11px] text-neutral-500">
                +62 21 5466666
              </p>

              <div className="mt-1.5 flex items-center gap-1.5">
                <span className="text-[11px] font-semibold text-neutral-700">
                  4.6
                </span>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3"
                      fill={i < 4 ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
                <Info className="h-3 w-3 text-neutral-400" />
                <a
                  href="#"
                  className="ml-auto text-[11px] font-medium text-blue-600 hover:underline"
                >
                  View in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}