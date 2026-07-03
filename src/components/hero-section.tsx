import { ArrowRight, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function HeroSection() {
	const { t } = useTranslation();

	return (
		<section className="relative flex min-h-screen items-end overflow-hidden -mt-20">
			<img
				src="/hero.png"
				alt="Tamanan"
				className="absolute inset-0 h-full w-full object-cover"
			/>

			<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
			<div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

			<div className="page-wrap relative z-10 w-full pb-20 pt-24 my-auto">
				<div className="max-w-2xl">
					<p className="text-sm font-semibold uppercase tracking-wide text-emerald-400 animate-fade-in-up">
						{t(
							"page.beranda.kicker",
							"LEMAH ASRI · TAMANAN, KALASAN, SLEMAN",
						)}
					</p>

					<h1 className="display-title mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-white animate-fade-in-up" style={{ animationDelay: '150ms' }}>
						{t(
							"page.beranda.title",
							"Rasakan Keindahan dan Keautentikan Pedukuhan Tamanan",
						)}
					</h1>

					<p className="mt-5 max-w-lg text-sm sm:text-[15px] leading-relaxed text-white/85 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
						{t(
							"page.beranda.description",
							"Tamanan adalah pedukuhan di Kalasan, Sleman yang kaya akan potensi wisata, budaya, dan UMKM.",
						)}
					</p>

					<div className="mt-7 flex flex-wrap items-center gap-3 animate-fade-in-up" style={{ animationDelay: '450ms' }}>
						<a
							href="/wisata"
							className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
						>
							{t("page.beranda.ctaPrimary", "Pesan Paket Wisata")}
							<ArrowRight className="h-4 w-4" />
						</a>
						<a
							href="https://wa.me/6285876270545"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
						>
							<MessageCircle className="h-4 w-4" />
							{t("page.beranda.ctaSecondary", "Hubungi Kami")}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
