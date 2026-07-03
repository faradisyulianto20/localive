import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useInView } from "#/hooks/use-in-view.ts";

export default function ProfilSection() {
	const { t } = useTranslation();
	const { ref, inView } = useInView();

	return (
		<section ref={ref} className={`page-wrap py-16 transition-all duration-700 ${inView ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
			<div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
				<div className="relative overflow-hidden rounded-xl">
					<img
						src="/hero.png"
						alt={t("section.profil.title", "Desa Tamanan")}
						className="h-full w-full object-cover"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-emerald-800/60 via-emerald-800/20 to-transparent" />
				</div>

				<div>
					<p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
						{t("section.profil.kicker", "TENTANG KAMI")}
					</p>

					<h2 className="display-title text-forest mt-3 text-3xl font-bold leading-tight md:text-4xl">
						{t("section.profil.title", "Desa Tamanan")}
					</h2>

					<p className="mt-5 text-[15px] leading-relaxed text-neutral-600">
						{t(
							"section.profil.description",
							"Tamanan adalah pedukuhan yang terletak di Kalasan, Sleman, Daerah Istimewa Yogyakarta.",
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
