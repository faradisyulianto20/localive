import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SafeImage } from '../ui/safe-image'
import type { WisataItem } from './wisata-card'

const categoryLabel: Record<string, { id: string; en: string }> = {
  destinasi: { id: 'Destinasi', en: 'Destination' },
  atraksi: { id: 'Atraksi', en: 'Attraction' },
  aktivitas: { id: 'Aktivitas', en: 'Activity' },
}

function tval(v: string | { id: string; en: string }, lang: string) {
  return typeof v === 'string' ? v : v[lang as 'id' | 'en'] || v.id
}

export default function WisataDetailDialog({ item, onClose }: { item: WisataItem; onClose: () => void }) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const cat = categoryLabel[item.category]

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
          <div className="mb-2">
            <span className="inline-block rounded-md bg-olive px-3 py-1 text-xs font-semibold text-white">
              {cat[lang] ?? cat.id}
            </span>
            {item.paket && (
              <span className="ml-2 inline-block rounded-full bg-olive/80 px-2 py-0.5 text-[10px] font-semibold text-white">
                {t('wisata.tersedia', 'Tersedia')}
              </span>
            )}
          </div>

          <h2 className="text-xl font-bold text-neutral-900 mb-3">
            {tval(item.title, lang)}
          </h2>

          <p className="text-sm leading-relaxed text-neutral-600 whitespace-pre-line">
            {tval(item.description, lang)}
          </p>
        </div>
      </div>
    </div>
  )
}
