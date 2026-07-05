import { useTranslation } from 'react-i18next'

export interface WisataItem {
  id: string
  category: 'destinasi' | 'atraksi' | 'aktivitas'
  title: string | { id: string; en: string }
  description: string | { id: string; en: string }
  image: string
  paket?: boolean
  createdAt?: string
  updatedAt?: string
}

interface WisataCardProps {
  item: WisataItem
}

const categoryLabel: Record<string, { id: string; en: string }> = {
  destinasi: { id: 'Destinasi', en: 'Destination' },
  atraksi: { id: 'Atraksi', en: 'Attraction' },
  aktivitas: { id: 'Aktivitas', en: 'Activity' },
}

function tval(v: string | { id: string; en: string }, lang: string) {
  return typeof v === 'string' ? v : v[lang as 'id' | 'en'] || v.id
}

export default function WisataCard({ item }: WisataCardProps) {
  const { i18n, t } = useTranslation()
  const lang = i18n.language
  const cat = categoryLabel[item.category]

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer">
      <img
        src={item.image}
        alt={tval(item.title, lang)}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />

      <span className="absolute left-4 top-4 rounded-md bg-olive px-3 py-1 text-xs font-semibold text-white">
        {cat[lang] ?? cat.id}
      </span>

      {item.paket && (
        <span className="absolute right-2 top-2 rounded-full bg-olive px-2 py-0.5 text-[10px] font-semibold text-white">
          {t('wisata.tersedia', 'Tersedia')}
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        <h3 className="text-lg font-bold">{tval(item.title, lang)}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/85 line-clamp-2">
          {tval(item.description, lang)}
        </p>
      </div>
    </div>
  )
}
