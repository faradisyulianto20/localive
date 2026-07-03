import { Link, useMatchRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./language-toggle";

const links = [
	{ to: "/", label: "nav.beranda" },
	{ to: "/profil", label: "nav.profil" },
	{ to: "/wisata", label: "nav.wisata" },
	{ to: "/umkm", label: "nav.umkm" },
	{ to: "/artikel", label: "nav.artikel" },
	{ to: "/lemah-asri", label: "nav.lemahAsri" },
] as const;

export default function Navbar() {
  const { t } = useTranslation();
  const matchRoute = useMatchRoute();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 50);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={`sticky z-50 transition-all duration-300 ${
				scrolled ? "top-2" : "top-0"
			}`}
		>
			<nav
				className={`flex h-20 items-center justify-between bg-white/90 px-8 transition-all duration-300 ${
					scrolled
						? "mx-auto w-[90%] rounded-2xl shadow-lg backdrop-blur-md"
						: "w-full rounded-none rounded-b-3xl shadow-[0_20px_45px_-18px_rgba(0,0,0,0.18)]"
				}`}
			>
				<Link
					to="/"
					className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-sm font-medium text-neutral-500"
				>
					Logo
				</Link>

				<ul className="hidden items-center gap-9 md:flex">
					{links.map((link) => {
						const isActive = matchRoute({ to: link.to });
						return (
							<li key={link.to}>
								<Link
									to={link.to}
									className={`text-[15px] font-semibold transition-colors ${
										isActive
											? "text-amber-700 underline decoration-2 underline-offset-[6px]"
											: "text-forest hover:text-amber-700"
									}`}
								>
									{t(link.label)}
								</Link>
							</li>
						);
					})}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex md:hidden items-center justify-center h-10 w-10 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-100">
          <span className="text-lg font-bold text-forest">Menu</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center h-9 w-9 rounded-lg text-neutral-500 hover:bg-neutral-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {links.map((link) => {
              const isActive = matchRoute({ to: link.to });
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-4 py-3 text-[15px] font-semibold transition-colors ${
                      isActive
                        ? "bg-amber-50 text-amber-700"
                        : "text-neutral-700 hover:bg-neutral-50 hover:text-amber-700"
                    }`}
                  >
                    {t(link.label)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="absolute bottom-6 left-0 w-full px-6">
          <LanguageToggle />
        </div>
      </aside>
		</header>
	);
}
