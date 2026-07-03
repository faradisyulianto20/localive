// artikel-card-list.tsx
import { Link } from '@tanstack/react-router'
import { Calendar, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export interface ArtikelItem {
  id: string
  title: { id: string; en: string }
  content: { id: string; en: string }
  image: string
  category: string
  penulis: string
  tanggal: string
  createdAt?: string
  updatedAt?: string
}

interface ArtikelCardListProps {
  item: ArtikelItem
}

const categoryColor: Record<string, string> = {
  berita: 'bg-olive',
  kegiatan: 'bg-forest',
  pengumuman: 'bg-terracotta',
}

function stripHtml(html: string) {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.textContent || div.innerText || ''
}

export default function ArtikelCardList({ item }: ArtikelCardListProps) {
  const { i18n } = useTranslation()
  const lang = i18n.language as 'id' | 'en'

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const plainText = stripHtml(item.content[lang] ?? item.content.id)

  return (
    <Link
      to="/artikel/$id"
      params={{ id: item.id }}
      className="group flex gap-4 rounded-xl bg-white"
    >
      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-32 mx-auto my-auto">
        <img
          src={item.image}
          alt={item.title[lang] ?? item.title.id}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center p-3">
        <span className={`inline-block w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold text-white ${categoryColor[item.category] ?? 'bg-neutral-500'}`}>
          {item.category}
        </span>

        <h3 className="mt-1.5 text-sm font-bold leading-snug text-neutral-900 line-clamp-2 group-hover:text-emerald-700 sm:text-base">
          {item.title[lang] ?? item.title.id}
        </h3>

        <p className="mt-1 text-xs leading-relaxed text-neutral-500 line-clamp-2">
          {plainText}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-neutral-500">
          <span className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {item.penulis}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(item.tanggal)}
          </span>
        </div>
      </div>
    </Link>
  )
}