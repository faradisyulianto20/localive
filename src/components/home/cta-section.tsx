import { MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useInView } from '#/hooks/use-in-view.ts'

const WA_NUMBER = '6285876270545'
const WA_URL = `https://wa.me/${WA_NUMBER}`

export default function CTASection() {
  const { t } = useTranslation()
  const { ref, inView } = useInView()

  return (
    <section ref={ref} className={`relative overflow-hidden py-12 transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
      <div className="absolute inset-0">
        <img
          src="/images/cta.png"
          alt=""
          className="h-full w-full object-cover"
        />
        {/* overlay hitam tipis untuk kesan redup */}
		<div className="absolute inset-0 bg-forest/35" />
      </div>

      <div className="page-wrap relative z-10 text-left">
        <h2 className="display-title text-2xl md:text-3xl lg:text-4xl leading-tight text-white">
          {t('section.cta.titleLight', 'Siap Merasakan Pengalaman')}
          <br />
          <span className="font-bold">
            {t('section.cta.titleBold', 'Autentik di Padukuhan Tamanan?')}
          </span>
        </h2>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
          {t(
            'section.cta.description',
            'Bawa institusi dan rombongan Anda untuk merasakan keramahan dan kekayaan budaya kami secara langsung',
          )}
        </p>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-full border-2 border-olive/60 px-6 py-3 text-sm font-bold bg-forest/30 text-white cursor-pointer transition-all duration-300 hover:border-olive hover:bg-forest/10 md:text-base"
        >
          <MessageCircle className="h-5 w-5" />
          {t('section.cta.button', 'Hubungi Kami via WhatsApp')}
        </a>
      </div>
    </section>
  )
}