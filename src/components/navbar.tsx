import { Link, useMatchRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
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

				<LanguageToggle />
			</nav>
		</header>
	);
}
