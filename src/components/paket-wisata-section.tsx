import { ArrowRight, CheckCircle2, Clock, Users } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type Paket = {
	category: string;
	title: string;
	description: string;
	duration: string;
	minPax: string;
	facilities: string;
	image: string;
};

const paketList: Paket[] = [
	{
		category: "Edukasi Sejarah",
		title: "Jelajah Jejak Mataram",
		description:
			"Menelusuri jejak sejarah Kerajaan Mataram Islam melalui kunjungan ke situs bersejarah Kotagede, lengkap dengan pemandu wisata, sajian kuliner khas, dan suasana budaya yang autentik.",
		duration: "4 Jam",
		minPax: "Min. 10 pax",
		facilities: "6 fasilitas",
		image: "/hero.png",
	},
	{
		category: "Edukasi Sejarah",
		title: "Jelajah Omah Kalang",
		description:
			"Menelusuri jejak sejarah Kerajaan Mataram Islam melalui kunjungan ke situs bersejarah Kotagede, lengkap dengan pemandu wisata, sajian kuliner khas, dan suasana budaya yang autentik.",
		duration: "4 Jam",
		minPax: "Min. 10 pax",
		facilities: "6 fasilitas",
		image: "/hero.png",
	},
	{
		category: "Seni & Budaya",
		title: "Kelas Menari",
		description:
			"Belajar dan berlatih tari tradisional Jawa bersama penari lokal, mengenal makna gerak dan filosofi di balik setiap tariannya.",
		duration: "3 Jam",
		minPax: "Min. 8 pax",
		facilities: "5 fasilitas",
		image: "/hero.png",
	},
];

export default function PaketWisataSection() {
	const { t } = useTranslation();
	const [activeIndex, setActiveIndex] = useState(1);

	return (
		<section className="page-wrap py-16">
			{/* Header */}
			<div className="mx-auto max-w-2xl text-center">
				<p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
					{t("section.paketWisata.kicker", "Paket Wisata Unggulan")}
				</p>
				<h2 className="display-title text-forest mt-2 text-3xl font-bold leading-tight md:text-4xl">
					{t(
						"section.paketWisata.title",
						"Pilih Pengalaman yang Paling Sesuai dengan Anda",
					)}
				</h2>
			</div>

			{/* Cards */}
			<div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
				{paketList.map((item, i) => {
					const isActive = i === activeIndex;

					return (
						<div
							key={i}
							onMouseEnter={() => setActiveIndex(i)}
							className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl"
						>
							<img
								src={item.image}
								alt={item.title}
								className="absolute inset-0 h-full w-full object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/10 to-transparent" />

							{!isActive && (
								<>
									{/* Collapsed state: badge top, title bar bottom */}
									<span className="absolute left-4 top-4 rounded-md bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
										{item.category}
									</span>
									<div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/95 px-4 py-3">
										<h3 className="text-base font-bold text-neutral-900">
											{item.title}
										</h3>
									</div>
								</>
							)}

							{isActive && (
								<>
									<span className="absolute left-4 top-4 z-10 rounded-md bg-emerald-700 px-3 py-1 text-xs font-semibold text-white">
										{item.category}
									</span>

									{/* Expanded detail panel */}
									<div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/95 p-5 backdrop-blur-sm">
										<h3 className="text-lg font-bold text-neutral-900">
											{item.title}
										</h3>
										<p className="mt-2 text-sm leading-relaxed text-neutral-600">
											{item.description}
										</p>

										<div className="mt-4 space-y-1.5 text-sm text-neutral-700">
											<div className="flex items-center gap-2">
												<Clock className="h-4 w-4 text-emerald-700" />
												{item.duration}
											</div>
											<div className="flex items-center gap-2">
												<Users className="h-4 w-4 text-emerald-700" />
												{item.minPax}
											</div>
											<div className="flex items-center gap-2">
												<CheckCircle2 className="h-4 w-4 text-emerald-700" />
												{item.facilities}
											</div>
										</div>

										<button
											type="button"
											className="mt-4 w-full rounded-full bg-amber-700 py-3 text-sm font-semibold text-white transition-colors hover:bg-amber-800"
										>
											Pesan Sekarang
										</button>
									</div>
								</>
							)}
						</div>
					);
				})}
			</div>

			{/* CTA */}
			<div className="mt-10 flex justify-center">
				<a
					href="/paket-wisata"
					className="inline-flex items-center gap-2 rounded-full border border-amber-700/60 px-6 py-3 text-sm font-semibold text-amber-700 transition-colors hover:bg-amber-50"
				>
					{t("section.paketWisata.cta", "Lihat Semua Paket Wisata")}
					<ArrowRight className="h-4 w-4" />
				</a>
			</div>
		</section>
	);
}
