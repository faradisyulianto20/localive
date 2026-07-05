import { Link } from '@tanstack/react-router'
import { Instagram, MessageCircle, Youtube } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const quickLinks = [
  { to: '/', label: 'nav.beranda' },
  { to: '/profil', label: 'nav.profil' },
  { to: '/wisata', label: 'nav.wisata' },
  { to: '/umkm', label: 'nav.umkm' },
  { to: '/artikel', label: 'nav.artikel' },
  { to: '/lemah-asri', label: 'nav.lemahAsri' },
] as const

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer border-t border pb-8 pt-12 md:pt-16">
      <div className="page-wrap">
        <div className="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream text-sm font-medium text-gray-600">
              Logo
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-gray-600">
              {t(
                'footer.description',
                'Desa Wisata Tamanan adalah desa wisata berbasis masyarakat di Kalasan, Sleman yang dikelola oleh Lemah Asri.',
              )}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/Tamanan.Media"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 cursor-pointer items-center justify-center  transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/6285876270545"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 cursor-pointer items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com/@TamananTV"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 cursor-pointer items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="display-title text-lg font-semibold text-foreground">
              {t('footer.quickLinks', 'Quick Links.')}
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-600 transition-all duration-300 hover:text-forest"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="display-title text-lg font-semibold text-foreground">
              {t('footer.kontak', 'Kontak.')}
            </h3>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">{t('footer.alamat', 'Alamat')}</p>
                <p className="mt-1 text-sm text-gray-600">
                  Tamanan, Tamanmartani, Kalasan, Sleman, DIY
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t('footer.email', 'Email')}</p>
                <a
                  href="mailto:tamanan.media@gmail.com"
                  className="mt-1 block cursor-pointer text-sm text-gray-600 transition-all duration-300 hover:text-forest"
                >
                  tamanan.media@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t('footer.telepon', 'Telepon')}</p>
                <a
                  href="tel:+62882705012212"
                  className="mt-1 block cursor-pointer text-sm text-gray-600 transition-all duration-300 hover:text-forest"
                >
                  0882-0050-12212
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="display-title text-lg font-semibold text-foreground">
              {t('footer.lokasi', 'Lokasi.')}
            </h3>
            <div className="mt-4 overflow-hidden rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2!2d110.456!3d-7.789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwNDcnMjAuNCJTIDExMMKwMjcnMjEuNiJF!5e0!3m2!1sen!2sid!4v1"
                width="100%"
                height="160"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Lokasi Tamanan"
                className="h-40 md:h-48 w-full rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border pt-6 text-sm text-gray-600 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Desa Wisata Tamanan. All
            rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <a href="#" className="cursor-pointer transition-all duration-300 hover:text-forest">
              {t('footer.privacy', 'Kebijakan Privasi')}
            </a>
            <span>·</span>
            <a href="#" className="cursor-pointer transition-all duration-300 hover:text-forest">
              {t('footer.terms', 'Syarat & Ketentuan')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
