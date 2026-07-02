import { Link } from '@tanstack/react-router'
import { Instagram, MessageCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const quickLinks = [
  { to: '/', label: 'nav.beranda' },
  { to: '/profil', label: 'nav.profil' },
  { to: '/destinasi', label: 'nav.destinasi' },
  { to: '/paket-wisata', label: 'nav.paketWisata' },
  { to: '/penginapan', label: 'nav.penginapan' },
] as const

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer border-t border-neutral-100 pb-8 pt-16">
      <div className="page-wrap">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          {/* Logo + description + social */}
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 text-sm font-medium text-neutral-500">
              Logo
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-600">
              {t(
                'footer.description',
                'Desa Wisata XXX adalah desa wisata berbasis masyarakat di XXX yang menawarkan pengalaman budaya, alam, dan tradisi lokal secara otentik dan berkelanjutan.',
              )}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d="M16.6 5.82c-.9-.88-1.4-2.08-1.4-3.32h-3.14v13.44c0 1.55-1.26 2.8-2.8 2.8a2.8 2.8 0 0 1-2.8-2.8 2.8 2.8 0 0 1 2.8-2.8c.28 0 .55.04.8.12V10.1a6.1 6.1 0 0 0-.8-.05A5.95 5.95 0 0 0 3.4 16a5.95 5.95 0 0 0 5.95 5.95A5.95 5.95 0 0 0 15.3 16V8.6a8.15 8.15 0 0 0 4.76 1.53V7a5.02 5.02 0 0 1-3.46-1.18z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="display-title text-lg font-semibold text-neutral-900">
              Quick Links.
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-neutral-600 transition-colors hover:text-emerald-700"
                  >
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="display-title text-lg font-semibold text-neutral-900">
              Kontak.
            </h3>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Alamat
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  Desa Prenggan, Kab Sleman, DIYogyakarta
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Email
                </p>
                <a
                  href="mailto:prenggan@mail.com"
                  className="mt-1 block text-sm text-neutral-600 hover:text-emerald-700"
                >
                  prenggan@mail.com
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">
                  Telepon
                </p>
                <a
                  href="tel:+6281245678910"
                  className="mt-1 block text-sm text-neutral-600 hover:text-emerald-700"
                >
                  +62 812-4567-8910
                </a>
              </div>
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <h3 className="display-title text-lg font-semibold text-neutral-900">
              Lokasi.
            </h3>
            <div className="mt-4 overflow-hidden rounded-xl">
              <img
                src="/map-bg.png"
                alt="Peta lokasi Kampung Wisata Prenggan"
                className="h-32 w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-6 text-sm text-neutral-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Desa Wisata Prenggan. All
            rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <a href="#" className="hover:text-emerald-700">
              Kebijakan Privasi
            </a>
            <span>·</span>
            <a href="#" className="hover:text-emerald-700">
              Syarat &amp; Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}