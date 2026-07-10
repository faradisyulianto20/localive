export interface ArtikelItem {
  id: string
  title: { id: string; en: string }
  content: { id: string; en: string }
  image: string
  category: string
  penulis: string
  tanggal: string
  createdAt: string
  updatedAt: string
}

export function transformArtikel(be: any): ArtikelItem {
  return {
    id: String(be.id),
    title: be.title || { id: '', en: '' },
    content: be.content || { id: '', en: '' },
    image: be.image_url || '/images/placeholder-img-not-found.jpg',
    category: be.category?.slug || 'berita-desa',
    penulis: be.author?.name || 'Admin',
    tanggal: be.date || '',
    createdAt: be.created_at || '',
    updatedAt: be.updated_at || '',
  }
}

export interface WisataItem {
  id: string
  category: string
  title: { id: string; en: string }
  description: { id: string; en: string }
  image: string
}

export function transformWisata(be: any): WisataItem {
  return {
    id: String(be.id),
    category: be.category?.slug || '',
    title: be.title || { id: '', en: '' },
    description: be.description || { id: '', en: '' },
    image: be.image_url || '/images/placeholder-img-not-found.jpg',
  }
}

export interface UMKMItem {
  id: string
  category: string
  title: { id: string; en: string }
  description: { id: string; en: string }
  image: string
  noTelp: string
  waUrl: string
  mapsUrl: string
}

export function transformUmkm(be: any): UMKMItem {
  return {
    id: String(be.id),
    category: (be.category?.slug || be.category || '').toLowerCase(),
    title: be.title || { id: '', en: '' },
    description: be.description || { id: '', en: '' },
    image: be.image_url || be.image || '/images/placeholder-img-not-found.jpg',
    noTelp: be.no_telp || be.noTelp || '',
    waUrl: be.wa_url || be.waUrl || '',
    mapsUrl: be.maps_link || be.mapsUrl || '',
  }
}

export interface PartnerItem {
  id: string
  logo: string
  nama: string
  url: string | null
}

export function transformPartner(be: any): PartnerItem {
  return {
    id: String(be.id),
    logo: be.logo_url || '/images/placeholder-img-not-found.jpg',
    nama: be.name?.id || be.name?.en || '',
    url: null,
  }
}

export interface PotensiDesaItem {
  id: string
  image: string
  title: { id: string; en: string }
  description: { id: string; en: string }
  badge: { id: string; en: string } | null
  color: string
  icon: string | null
}

export function transformPotensi(be: any): PotensiDesaItem {
  return {
    id: String(be.id),
    image: be.image_url || '/images/placeholder-img-not-found.jpg',
    title: be.title || { id: '', en: '' },
    description: be.description || { id: '', en: '' },
    badge: null,
    color: 'forest',
    icon: null,
  }
}

export interface OrgMemberItem {
  jabatan: string
  nama: string
  foto?: string
}

const jabatanHardcode: Record<string, string> = {
  'Head of Financial Affairs': 'Keuangan',
  'Chairman of Pokdarwis': 'Kepala',
  'Chairperson of PKK': 'Kesejahteraan',
  'Head of Government Affairs': 'Umum',
  'Head of Development Affairs': 'Pembangunan',
  'Village Head': 'Sekretaris',
}

export function transformOrgMember(be: any): OrgMemberItem {
  return {
    jabatan: jabatanHardcode[be.name?.en] || be.name?.id || be.name?.en || '',
    nama: be.name?.id || '',
    foto: be.image_url || undefined,
  }
}

export interface LemahAsriType {
  namaUsaha: { id: string; en: string }
  pemilik: string
  tahunBerdiri: string
  lokasi: string
  noTelp: string
  email: string
  instagram: string
  youtube: string
  visi: { id: string; en: string }
  misi: { id: string; en: string }
  sejarah: { id: string; en: string }
  strukturOrganisasi: OrgMemberItem[]
  trackRecord: string[]
  updatedAt: string
}
