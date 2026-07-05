import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "#/hooks/use-in-view.ts";

export default function ProfilSection() {
	const { t } = useTranslation();
	const { ref, inView } = useInView();

	return (
		<section ref={ref} className={`page-wrap py-12 md:py-16 transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
			<div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
				<div className="relative overflow-hidden rounded-lg">
					<img
						src="/hero.png"
						alt={t("section.profil.title", "Desa Tamanan")}
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-emerald-800/60 via-emerald-800/20 to-transparent" />
				</div>

				<div>
					<p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
						{t("section.profil.kicker", "TENTANG PADUKUHAN TAMANAN")}
					</p>

					<h2 className="display-title text-forest mt-3 text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
						{t("section.profil.title", "Harmoni Tradisi, Alam, dan  Gotong Royong di Sleman")}
					</h2>

					<p className="mt-5 text-sm sm:text-[15px] leading-relaxed text-neutral-600">
						{t(
							"section.profil.description",
							"Padukuhan Tamanan merupakan kawasan wisata budaya dan edukasi yang berada di Kelurahan Tamanmartani, Kapanewon Kalasan, Kabupaten Sleman. Padukuhan Tamanan menawarkan keindahan budaya, edukasi, dan kearifan lokal yang sudah diwariskan turun temurun. Tempat yang sempurna untuk menggali lebih dalam secuil kekayaan budaya di Sleman.",
						)}
					</p>

					<a
						href="/profil"
						className="mt-7 inline-flex items-center gap-2 rounded-full border-2 border-amber-700 px-6 py-3 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
					>
						{t("section.profil.cta", "Lihat Profil Lengkap")}
						<ArrowRight className="h-4 w-4" />
					</a>
				</div>
			</div>
		</section>
	);
}
