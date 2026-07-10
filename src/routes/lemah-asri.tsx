import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Leaf, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";
import lemahAsriData from "#/data/lemah-asri.json";
import { fetchLemahAsri } from "../lib/api-endpoints";
import { SafeImage } from "../components/ui/safe-image";
import type { LemahAsriType, OrgMemberItem } from "../lib/api-transformers";

export const Route = createFileRoute("/lemah-asri")({ component: LemahAsri });

function findByJabatan(list: OrgMemberItem[], keyword: string) {
  return list.find((item) => item.jabatan.toLowerCase().includes(keyword.toLowerCase()));
}

interface OrgNodeData {
  jabatan: string;
  nama: string;
  foto?: string;
}

function OrgCard({ jabatan, nama, foto }: OrgNodeData) {
  return (
    <div className="w-full max-w-[220px] overflow-hidden rounded-lg border border-forest/20 bg-white shadow-sm">
      <div className="bg-forest px-3 py-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-white text-center leading-tight">
          {jabatan}
        </p>
      </div>
      {(nama || foto) && (
        <div className="flex items-center gap-2.5 p-2.5 text-center justify-center">
          {foto && (
            <SafeImage
              src={foto}
              alt={nama}
              className="h-11 w-11 shrink-0 rounded object-cover border border-neutral-200"
            />
          )}
          {nama && <p className="text-sm font-bold leading-tight text-forest text-center">{nama}</p>}
        </div>
      )}
    </div>
  );
}

function LemahAsri() {
  const { i18n, t } = useTranslation();
  const lang = i18n.language as "id" | "en";
  const [data, setData] = useState<LemahAsriType>({
    namaUsaha: { id: '', en: '' },
    pemilik: '',
    tahunBerdiri: '',
    lokasi: '',
    noTelp: '',
    email: '',
    instagram: '',
    youtube: '',
    visi: { id: '', en: '' },
    misi: { id: '', en: '' },
    sejarah: { id: '', en: '' },
    strukturOrganisasi: [],
    trackRecord: [],
    updatedAt: '',
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchLemahAsri()
      .then((result) => {
        setData(result);
        setLoaded(true);
      })
      .catch(() => {
        // fallback to static
        const d = lemahAsriData as any;
        setData({
          namaUsaha: d.namaUsaha || { id: '', en: '' },
          pemilik: d.pemilik || '',
          tahunBerdiri: d.tahunBerdiri || '',
          lokasi: d.lokasi || '',
          noTelp: d.noTelp || '',
          email: d.email || '',
          instagram: d.instagram || '',
          youtube: d.youtube || '',
          visi: d.visi || { id: '', en: '' },
          misi: d.misi || { id: '', en: '' },
          sejarah: d.sejarah || { id: '', en: '' },
          strukturOrganisasi: d.strukturOrganisasi || [],
          trackRecord: d.trackRecord || [],
          updatedAt: d.updatedAt || '',
        });
        setLoaded(true);
      });
  }, []);

  const struktur = data.strukturOrganisasi as OrgMemberItem[];
  const ceo = findByJabatan(struktur, "kepala") ?? struktur[0];
  const coo = findByJabatan(struktur, "sekretaris");
  const finance = findByJabatan(struktur, "keuangan");
  const marketing = findByJabatan(struktur, "kesejahteraan");
  const product = findByJabatan(struktur, "pembangunan");
  const general = findByJabatan(struktur, "umum");

  const level2 = [coo, finance].filter(Boolean) as OrgMemberItem[];
  const level3 = [marketing, product, general].filter(Boolean) as OrgMemberItem[];

  return (
    <div>
      <section className="relative flex items-end min-h-[80vh] overflow-hidden -mt-20">
        <img
          src="/images/hero.png"
          alt="Lemah Asri"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-transparent" />
        <div className="page-wrap relative z-10 w-full pb-16">
          <Leaf className="h-12 w-12 text-olive" />
          <h1 className="display-title mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            {data.namaUsaha[lang] ?? data.namaUsaha.id}
          </h1>
          <p className="mt-2 text-lg text-white/80">
            {t("lemahAsri.tagline", "Lembaga Usaha Tamanan Sadar Wisata")}
          </p>
        </div>
      </section>

      <section className="page-wrap -mt-10 relative z-20 py-8 md:py-10 pt-16 md:pt-20 animate-fade-in-up">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <div>
              <h2 className="display-title text-xl md:text-2xl font-bold text-forest">
                {t("lemahAsri.sejarah", "Sejarah")}
              </h2>
              {(data.sejarah[lang] ?? data.sejarah.id).split("\n\n").map((paragraph, i) => (
                <p key={i} className="mt-4 text-sm sm:text-[15px] leading-relaxed text-gray-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <div>
              <h2 className="display-title text-xl md:text-2xl font-bold text-forest">
                {t("lemahAsri.visi", "Visi")}
              </h2>
              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-gray-600">
                {data.visi[lang] ?? data.visi.id}
              </p>
            </div>
            <div>
              <h2 className="display-title text-xl md:text-2xl font-bold text-forest">
                {t("lemahAsri.misi", "Misi")}
              </h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-gray-600">
                {(data.misi[lang] ?? data.misi.id).split("\n").map((item) => (
                  <li key={item} className="text-sm sm:text-[15px] leading-relaxed text-gray-600">
                    {item.replace(/^•\s*/, "")}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="feature-card rounded-lg p-6 md:p-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <h2 className="display-title text-lg md:text-xl font-bold text-forest">
              {t("lemahAsri.kontak", "Hubungi Kami")}
            </h2>
            <div className="mt-5 space-y-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive/10 text-olive transition-all duration-300">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                    {t("lemahAsri.lokasi", "Alamat")}
                  </p>
                  <p className="mt-1 text-sm font-medium text-forest">{data.lokasi}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive/10 text-olive transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                    {t("lemahAsri.noTelp", "Telepon")}
                  </p>
                  <a href={`tel:${data.noTelp}`} className="mt-1 block text-sm font-medium text-forest hover:text-olive transition-all duration-300 cursor-pointer">
                    {data.noTelp}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-olive/10 text-olive transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                    {t("lemahAsri.email", "Email")}
                  </p>
                  <a href={`mailto:${data.email}`} className="mt-1 block text-sm font-medium text-forest hover:text-olive transition-all duration-300 cursor-pointer">
                    {data.email}
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-olive/20 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                {t("lemahAsri.sosialMedia", "Sosial Media")}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={data.instagram || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={data.youtube || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                  aria-label="YouTube"
                >
                  <Youtube className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-12 md:py-16 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <div className="page-wrap">
          <h2 className="display-title text-forest text-center text-2xl md:text-3xl lg:text-4xl font-bold">
            {t("lemahAsri.strukturOrganisasi", "Struktur Organisasi")}
          </h2>
          {struktur.length > 0 && (
            <div className="mt-10 overflow-x-auto pb-2">
              <div className="mx-auto flex min-w-[640px] max-w-3xl flex-col items-center">
                {ceo && <OrgCard {...ceo} />}
                {level2.length > 0 && (
                  <>
                    <div className="h-6 w-px bg-forest/40" />
                    <div className="relative w-full flex justify-center">
                      <div className="absolute top-0 h-px bg-forest/40" style={{ left: `${100 / level2.length / 2}%`, right: `${100 / level2.length / 2}%` }} />
                      <div className="flex w-full justify-center gap-8 md:gap-16">
                        {level2.map((node) => (
                          <div key={node.jabatan} className="flex flex-col items-center">
                            <div className="h-6 w-px bg-forest/40" />
                            <OrgCard {...node} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {level3.length > 0 && (
                  <div className="mt-0 flex w-full flex-col items-center">
                    <div className="h-6 w-px bg-forest/40" />
                    <div className="relative w-full flex justify-center">
                      <div className="absolute top-0 h-px bg-forest/40" style={{ left: `${100 / level3.length / 2}%`, right: `${100 / level3.length / 2}%` }} />
                      <div className="flex w-full flex-wrap justify-center gap-6 md:gap-10">
                        {level3.map((node) => (
                          <div key={node.jabatan} className="flex flex-col items-center">
                            <div className="h-6 w-px bg-forest/40" />
                            <OrgCard {...node} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <p className="mt-8 text-center text-xs italic text-neutral-500">
            *Bagan ini disusun berdasarkan struktur organisasi resmi.
          </p>
        </div>
      </section>

      <section className="page-wrap py-12 md:py-16 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
        <h2 className="display-title text-forest text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          {t("lemahAsri.trackRecord", "Track Record")}
        </h2>
        <div className="flex flex-wrap gap-2 mt-10 justify-center">
          {data.trackRecord.map((item) => (
            <span
              key={item}
              className="inline-block rounded-full bg-gradient-to-r from-olive to-forest px-4 py-1.5 text-sm font-medium text-white shadow-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default LemahAsri;
