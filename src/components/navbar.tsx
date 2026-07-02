import { Link, useMatchRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import LanguageToggle from './language-toggle'

const links = [
  { to: '/', label: 'nav.beranda' },
  { to: '/profil', label: 'nav.profil' },
  { to: '/destinasi', label: 'nav.destinasi' },
  { to: '/paket-wisata', label: 'nav.paketWisata' },
  { to: '/penginapan', label: 'nav.penginapan' },
] as const

export default function Navbar() {
  const { t } = useTranslation()
  const matchRoute = useMatchRoute()

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-header-bg backdrop-blur-md">
      <nav className="page-wrap flex h-16 items-center justify-between">
        <Link to="/" className="display-title text-forest text-xl font-bold tracking-tight">
          Localive
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = matchRoute({ to: link.to })
            return (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link text-sm font-medium ${isActive ? 'is-active' : ''}`}
                >
                  {t(link.label)}
                </Link>
              </li>
            )
          })}
        </ul>

        <LanguageToggle />
      </nav>
    </header>
  )
}
