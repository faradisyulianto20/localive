import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const WA_NUMBER = '6285876270545'
const WA_URL = `https://wa.me/${WA_NUMBER}`

export default function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="bg-gradient-to-r from-emerald-800 to-emerald-950 py-16">
      <div className="page-wrap text-center">
        <h2 className="display-title text-3xl font-bold text-white md:text-4xl">
          {t('section.cta.title', 'Hubungi Kami')}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80">
          {t('section.cta.description', 'Punya pertanyaan atau ingin memesan paket wisata? Hubungi kami langsung via WhatsApp')}
        </p>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-green-500 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-green-600"
        >
          <MessageCircle className="h-6 w-6" />
          Hubungi Via WhatsApp
        </a>
      </div>
    </section>
  )
}
