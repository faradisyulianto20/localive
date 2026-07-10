import { useEffect, useRef, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Calendar, User, Share2, Link2, ChevronRight, Check } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { api } from '#/lib/api'
import { SafeImage } from '../../components/ui/safe-image'

export const Route = createFileRoute('/artikel/$id')({ component: ArtikelDetail })

interface ArticleItem {
  id: number
  slug: string
  title: { id: string; en: string }
  content: { id: string; en: string }
  image_url: string | null
  image?: string | null
  date: string
  tanggal?: string
  penulis?: string
  category?: { name: { id: string; en: string }; slug: string }
  author?: { name: string }
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '')

function ArtikelDetail() {
  const { id } = Route.useParams()
  const { i18n, t } = useTranslation()
  const lang = i18n.language as 'id' | 'en'
  const [copied, setCopied] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => api.get<{ data: ArticleItem }>(`/articles/${id}`),
  })

  // Also fetch all articles for related sidebar
  const { data: allData } = useQuery({
    queryKey: ['articles'],
    queryFn: () => api.get<{ data: ArticleItem[] }>('/articles'),
  })

  const article = data?.data
  const allArticles = allData?.data ?? []

  useEffect(() => {
    const container = contentRef.current
    if (!container) return
    const imgs = container.querySelectorAll<HTMLImageElement>('img')
    imgs.forEach((img) => {
      img.addEventListener('error', function handler() {
        if (this.src !== '/images/placeholder-img-not-found.jpg') {
          this.src = '/images/placeholder-img-not-found.jpg'
        }
      })
    })
  }, [article?.content])

  if (isLoading) {
    return (
      <div className="page-wrap py-16 text-center">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-forest border-t-transparent" />
      </div>
    )
  }

  if (!article) {
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

  const related = allArticles.filter((a) => a.id !== article.id).slice(0, 3)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title[lang] ?? article.title.id, url: window.location.href })
      } catch { /* ignore */ }
    } else {
      handleCopyLink()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  const articleImage = article.image_url || article.image || '/images/placeholder-img-not-found.jpg'
  const articleDate = article.date || article.tanggal || ''
  const articleAuthor = article.author?.name || article.penulis || null
  const categoryName = article.category?.name?.[lang] ?? article.category?.name?.id ?? null

  return (
    <div className="page-wrap py-10 md:py-12">
      <nav className="animate-fade-in-up flex flex-wrap items-center gap-1.5 text-xs text-gray-600">
        <Link to="/" className="hover:text-forest cursor-pointer transition-all duration-300">{t('nav.home', 'Home')}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/artikel" className="hover:text-forest cursor-pointer transition-all duration-300">{t('artikel.listTitle', 'Artikel')}</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="max-w-[220px] truncate text-gray-600">{article.title[lang] ?? article.title.id}</span>
      </nav>

      <div className="animate-fade-in-up relative mt-4 overflow-hidden rounded-2xl" style={{ animationDelay: '100ms' }}>
        <SafeImage
          src={articleImage}
          alt={article.title[lang] ?? article.title.id}
          className="aspect-[16/8] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          {categoryName && (
            <span className="inline-block rounded-full bg-lagoon px-3 py-1 text-xs font-semibold text-white">
              {categoryName}
            </span>
          )}
          <h1 className="display-title mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {article.title[lang] ?? article.title.id}
          </h1>
        </div>
      </div>

      <div className="animate-fade-in-up mt-5 flex flex-wrap items-center gap-4 border-b border-border pb-5 text-sm text-gray-600" style={{ animationDelay: '100ms' }}>
        <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formatDate(articleDate)}</span>
        {articleAuthor && <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{articleAuthor}</span>}
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <article className="animate-fade-in-up lg:col-span-2" style={{ animationDelay: '100ms' }}>
          <div
            ref={contentRef}
            className="prose prose-forest prose-lg max-w-none prose-headings:font-bold prose-headings:text-forest"
            dangerouslySetInnerHTML={{ __html: article.content[lang] ?? article.content.id }}
          />
        </article>

        <aside className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="feature-card rounded-2xl p-6">
            <h2 className="display-title text-lg font-bold text-forest">
              {t('artikel.related', 'Artikel Lainnya')}
            </h2>
            <div className="mt-5 space-y-4">
              {related.map((item) => {
                const image = item.image_url || item.image || '/images/placeholder-img-not-found.jpg'
                const date = item.date || item.tanggal || ''
                return (
                  <Link
                    key={item.id}
                    to="/artikel/$id"
                    params={{ id: String(item.id) }}
                    className="group flex items-start gap-3 cursor-pointer transition-all duration-300"
                  >
                    <SafeImage
                      src={image}
                      alt={item.title[lang] ?? item.title.id}
                      className="h-16 w-16 shrink-0 rounded-lg object-cover transition-all duration-300"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-snug text-foreground line-clamp-2 text-ellipsis group-hover:text-terracotta transition-all duration-300">
                        {item.title[lang] ?? item.title.id}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-600 line-clamp-2">
                        {stripHtml(item.content[lang] ?? item.content.id)}
                      </p>
                      <p className="mt-1 text-xs text-gray-600">{formatDate(date)}</p>
                    </div>
                  </Link>
                )
              })}
              {related.length === 0 && (
                <p className="text-sm text-gray-600">{t('artikel.noRelated', 'Belum ada artikel lainnya.')}</p>
              )}
            </div>
          </div>
        </aside>
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
