import { ArrowRight, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
	const { t } = useTranslation();

	return (
		<section className="relative flex min-h-screen items-end overflow-hidden -mt-20">
			{/* Background image */}
			<img
				src="/hero.png"
				alt="Kampung Prenggan"
				className="absolute inset-0 h-full w-full object-cover"
			/>

			{/* Gradient overlay for text legibility */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

			{/* Content */}
			<div className="page-wrap relative z-10 w-full pb-20 pt-24 my-auto">
				<div className="max-w-2xl">
					<p className="text-sm font-semibold uppercase tracking-wide text-emerald-400">
						{t(
							"page.beranda.kicker",
							"KAMPUNG WISATA PRENGGAN · KOTAGEDE, YOGYAKARTA",
						)}
					</p>

					<h1 className="display-title mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
						{t(
							"page.beranda.title",
							"Rasakan Keindahan dan Keautentikan Yogyakarta di Jantung Kampung Prenggan",
						)}
					</h1>

					<p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/85">
						{t(
							"page.beranda.description",
							"Kampung Prenggan adalah jantung budaya Kotagede — tempat di mana tradisi batik, kerajinan perak, kuliner turun-temurun, dan kehangatan warga lokal berpadu menjadi pengalaman wisata yang tidak akan Anda temukan di tempat lain.",
						)}
					</p>

					<div className="mt-7 flex flex-wrap items-center gap-3">
						<a
							href="#paket-wisata"
							className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
						>
							{t("page.beranda.ctaPrimary", "Pesan Paket Wisata")}
							<ArrowRight className="h-4 w-4" />
						</a>
						<a
							href="#destinasi"
							className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
						>
							<Phone className="h-4 w-4" />
							{t("page.beranda.ctaSecondary", "Jelajahi Destinasi")}
						</a>
					</div>
				</div>
			</div>

			{/* Certification badge */}
			<div className="absolute bottom-8 right-16 z-10 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-lg md:flex">
				<img
					src="/penghargaan.png"
					alt="Anugerah Desa Wisata Indonesia 300 Besar"
					className="h-52 w-64 object-contain"
				/>
			</div>
		</section>
	);
}
