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
    <footer className="site-footer border-t border-neutral-100 pb-8 pt-16">
      <div className="page-wrap">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.3fr_0.8fr_1fr_1fr]">
          <div>
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-200 text-sm font-medium text-neutral-500">
              Logo
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-neutral-600">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/6285876270545"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com/@TamananTV"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700 text-emerald-700 transition-colors hover:bg-emerald-50"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

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

          <div>
            <h3 className="display-title text-lg font-semibold text-neutral-900">
              Kontak.
            </h3>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-sm font-semibold text-neutral-900">Alamat</p>
                <p className="mt-1 text-sm text-neutral-600">
                  Tamanan, Tamanmartani, Kalasan, Sleman, DIY
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Email</p>
                <a
                  href="mailto:tamanan.media@gmail.com"
                  className="mt-1 block text-sm text-neutral-600 hover:text-emerald-700"
                >
                  tamanan.media@gmail.com
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Telepon</p>
                <a
                  href="tel:+62882705012212"
                  className="mt-1 block text-sm text-neutral-600 hover:text-emerald-700"
                >
                  0882-0050-12212
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="display-title text-lg font-semibold text-neutral-900">
              Lokasi.
            </h3>
            <div className="mt-4 overflow-hidden rounded-xl">
              <img
                src="/map.png"
                alt="Peta lokasi Tamanan"
                className="h-32 w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-neutral-100 pt-6 text-sm text-neutral-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Desa Wisata Tamanan. All
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
