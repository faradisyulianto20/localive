import { Link, useMatchRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./language-toggle";

const links = [
	{ to: "/", label: "nav.beranda" },
	{ to: "/profil", label: "nav.profil" },
	{ to: "/destinasi", label: "nav.destinasi" },
	{ to: "/paket-wisata", label: "nav.paketWisata" },
	{ to: "/penginapan", label: "nav.penginapan" },
] as const;

export default function Navbar() {
	const { t } = useTranslation();
	const matchRoute = useMatchRoute();

	return (
		<header className="sticky top-0 z-50">
			<nav className="flex h-20 w-full items-center justify-between rounded-none rounded-b-3xl bg-white px-8 shadow-[0_20px_45px_-18px_rgba(0,0,0,0.18)]">
				{/* Logo */}
				<Link
					to="/"
					className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-200 text-sm font-medium text-neutral-500"
				>
					Logo
				</Link>

				{/* Nav links */}
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
