import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, User, Share2, Link2, ChevronRight, Check } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '#/lib/api'

export const Route = createFileRoute('/artikel/$id')({ component: ArtikelDetail })

interface ArticleItem {
  id: number
  slug: string
  title: { id: string; en: string }
  content: { id: string; en: string }
  image_url: string | null
  date: string
  category?: { name: { id: string; en: string }; slug: string }
  author?: { name: string }
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '')

function ArtikelDetail() {
  const { id } = Route.useParams()
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const [copied, setCopied] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => api.get<{ data: ArticleItem }>(`/articles/${id}`),
  })

  const artikel = data?.data

  if (isLoading) {
    return (
      <div className="page-wrap py-16 text-center">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-forest border-t-transparent" />
      </div>
    )
  }

  if (!artikel) {
    return (
      <div className="page-wrap py-16 text-center">
        <p className="text-muted-foreground">{t('artikel.notFound', 'Artikel tidak ditemukan')}</p>
        <Link to="/artikel" className="mt-4 inline-flex items-center gap-2 text-forest hover:underline">
          <ArrowLeft className="h-4 w-4" />
          {t('artikel.back', 'Kembali ke daftar artikel')}
        </Link>
      </div>
    )
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: artikel.title[lang] ?? artikel.title.id, url: window.location.href })
      } catch { /* cancelled */ }
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* unavailable */ }
  }

  return (
    <div className="page-wrap py-10 md:py-12">
      <nav className="animate-fade-in-up flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
        <Link to="/" className="hover:text-forest cursor-pointer transition-all duration-300">{t('nav.home', 'Home')}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/artikel" className="hover:text-forest cursor-pointer transition-all duration-300">{t('artikel.listTitle', 'Artikel')}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="max-w-[220px] truncate text-gray-600">{artikel.title[lang] ?? artikel.title.id}</span>
      </nav>

      <div className="animate-fade-in-up relative mt-4 overflow-hidden rounded-2xl" style={{ animationDelay: '100ms' }}>
        {artikel.image_url && (
          <>
            <img src={artikel.image_url} alt={artikel.title[lang] ?? artikel.title.id} className="aspect-[16/8] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
          </>
        )}
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          {artikel.category && (
            <span className="inline-block rounded-full bg-lagoon px-3 py-1 text-xs font-semibold text-white">
              {artikel.category.name[lang] ?? artikel.category.name.id}
            </span>
          )}
          <h1 className="display-title mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {artikel.title[lang] ?? artikel.title.id}
          </h1>
        </div>
      </div>

      <div className="animate-fade-in-up mt-5 flex flex-wrap items-center gap-4 border-b border-border pb-5 text-sm text-gray-600" style={{ animationDelay: '100ms' }}>
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(artikel.date)}</span>
        {artikel.author && <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{artikel.author.name}</span>}
      </div>

      <div className="mt-8">
        <article className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div
            className="prose prose-forest prose-lg max-w-none prose-headings:font-bold prose-headings:text-forest"
            dangerouslySetInnerHTML={{ __html: artikel.content[lang] ?? artikel.content.id }}
          />
        </article>
      </div>

      <div className="mt-10 flex items-center gap-3 border-t border-border pt-6">
        <span className="text-sm font-medium text-gray-600">{t('artikel.share', 'Bagikan')}:</span>
        <button type="button" onClick={handleShare} aria-label="Share" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-forest/10 text-forest transition-all duration-300 hover:bg-forest/20">
          <Share2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={handleCopyLink} aria-label="Copy link" className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-forest/10 text-forest transition-all duration-300 hover:bg-forest/20">
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        </button>
        {copied && <span className="text-xs font-medium text-forest">{t('artikel.linkCopied', 'Tautan disalin')}</span>}
      </div>
    </div>
  )
}
