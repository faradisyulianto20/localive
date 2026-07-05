import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import artikelData from "#/data/artikel.json";
import ArtikelCard from "../components/artikel-card";

export const Route = createFileRoute("/artikel")({ component: Artikel });

function Artikel() {
	const { t } = useTranslation();
	const matches = useMatches();
	const isChildRoute = matches.some((m) => m.routeId === "/artikel/$id");

	if (isChildRoute) {
		return <Outlet />;
	}

	return (
		<div className="page-wrap py-12 md:py-16">
			<div className="rise-in">
				<span className="island-kicker">{t("nav.artikel")}</span>
				<h1 className="display-title text-forest mt-2 text-3xl md:text-4xl font-bold">
					{t("page.artikel.title")}
				</h1>
			</div>

			{artikelData.length > 0 ? (
				<div className="mt-10 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{artikelData.map((item) => (
						<ArtikelCard key={item.id} item={item} />
					))}
				</div>
			) : (
				<div className="mt-16 text-center">
					<p className="text-neutral-500">
						{t("artikel.empty", "Belum ada artikel")}
					</p>
				</div>
			)}
		</div>
	);
}
