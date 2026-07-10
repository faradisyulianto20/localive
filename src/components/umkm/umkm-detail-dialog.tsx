import { MessageCircle, MapPin, UtensilsCrossed, Package, Wrench, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SafeImage } from '../ui/safe-image'
import type { UMKMItem } from './umkm-card'

const categoryLabel: Record<string, { id: string; en: string }> = {
  makanan: { id: 'Makanan', en: 'Food' },
  produk: { id: 'Produk', en: 'Product' },
  jasa: { id: 'Jasa', en: 'Service' },
}

const categoryIcon: Record<string, typeof UtensilsCrossed> = {
  makanan: UtensilsCrossed,
  produk: Package,
  jasa: Wrench,
}

function tval(v: string | { id: string; en: string }, lang: string) {
  return typeof v === 'string' ? v : v[lang as 'id' | 'en'] || v.id
}

export default function UMKMDetailDialog({ item, onClose }: { item: UMKMItem; onClose: () => void }) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const cat = categoryLabel[item.category] ?? { id: item.category, en: item.category }
  const CatIcon = categoryIcon[item.category] ?? UtensilsCrossed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl">
          <SafeImage
            src={item.image}
            alt={tval(item.title, lang)}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-forest/10">
              <CatIcon className="h-3 w-3 text-forest" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-forest">
              {cat[lang] ?? cat.id}
            </span>
          </div>

          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            {tval(item.title, lang)}
          </h2>

          <p className="text-sm leading-relaxed text-neutral-600 whitespace-pre-line">
            {tval(item.description, lang)}
          </p>

          <div className="mt-5 flex items-center gap-2">
            <a
              href={item.waUrl ?? (item.noTelp ? `https://wa.me/${item.noTelp.replace(/[^0-9]/g, '')}` : '#')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest/80"
            >
              <MessageCircle className="h-4 w-4" />
              {t('umkm.hubungi', 'WA')}
            </a>

            {item.mapsUrl && (
              <a
                href={item.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-forest/30 px-4 py-2 text-sm font-semibold text-forest transition-colors hover:bg-forest/5"
              >
                <MapPin className="h-4 w-4" />
                {t('umkm.maps', 'Maps')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
