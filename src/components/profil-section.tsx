import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProfilSection() {
	const { t } = useTranslation();

	return (
		<section className="page-wrap py-16">
			<div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
				{/* Image */}
				<div className="overflow-hidden rounded-2xl">
					<img
						src="/hero.png"
						alt={t(
							"section.profil.imageAlt",
							"Kirab budaya Kampung Wisata Prenggan",
						)}
						className="h-full w-full object-cover"
					/>
				</div>

				{/* Text content */}
				<div>
					<p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
						{t("section.profil.kicker", "TENTANG KAMPUNG WISATA PRENGGAN")}
					</p>

					<h2 className="display-title text-forest mt-3 text-3xl font-bold leading-tight md:text-4xl">
						{t("section.profil.title", "Warisan Lima Abad di Jantung Kotagede")}
					</h2>

					<p className="mt-5 text-[15px] leading-relaxed text-neutral-600">
						{t(
							"section.profil.description",
							"Kampung Wisata Prenggan merupakan kawasan wisata budaya yang berada di Kecamatan Kotagede, sekitar 6 kilometer di sebelah tenggara pusat Kota Yogyakarta. Sebagai bagian dari Kawasan Cagar Budaya Kotagede, Prenggan menyimpan jejak sejarah peninggalan Kerajaan Mataram Islam yang menjadi cikal bakal Kasultanan Yogyakarta dan Kasunanan Surakarta.",
						)}
					</p>

					<a
						href="/profil"
						className="mt-7 inline-flex items-center gap-2 rounded-full bg-amber-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
					>
						{t("section.profil.cta", "Lihat Profil Kampung Wisata Prenggan")}
						<ArrowRight className="h-4 w-4" />
					</a>
				</div>
			</div>
		</section>
	);
}
