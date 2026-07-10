import { apiGet, apiPost, apiPatch, apiDelete } from './api-client'
import {
  transformArtikel,
  transformWisata,
  transformUmkm,
  transformPartner,
  transformPotensi,
  transformOrgMember,
  type ArtikelItem,
  type WisataItem,
  type UMKMItem,
  type PartnerItem,
  type PotensiDesaItem,
  type LemahAsriType,
} from './api-transformers'

// ── Articles ──

export async function fetchArticles(): Promise<ArtikelItem[]> {
  const json = await apiGet<any>('/api/articles')
  return (json.data || []).map(transformArtikel)
}

export async function fetchArticle(id: string): Promise<ArtikelItem | null> {
  const items = await fetchArticles()
  return items.find((a) => a.id === id) || null
}

// ── Article Categories ──

export async function fetchArticleCategories(): Promise<any[]> {
  const json = await apiGet<any>('/api/article-categories')
  return json.data || []
}

// ── Wisata (Tour Packages) ──

export async function fetchWisataList(): Promise<WisataItem[]> {
  const json = await apiGet<any>('/api/tour-packages')
  return (json.data || []).map(transformWisata)
}

export async function fetchTourCategories(): Promise<any[]> {
  const json = await apiGet<any>('/api/tour-categories')
  return json.data || []
}

// ── UMKM ──

export async function fetchUmkmList(): Promise<UMKMItem[]> {
  const json = await apiGet<any>('/api/umkm')
  return (json.data || [])
    .filter((item: any) => item.status === 'published')
    .map(transformUmkm)
}

export async function fetchUmkmCategories(): Promise<any[]> {
  const json = await apiGet<any>('/api/umkm-categories')
  return json.data || []
}

// ── Partners ──

export async function fetchPartners(): Promise<PartnerItem[]> {
  const json = await apiGet<any>('/api/partners')
  return (json.data || []).map(transformPartner)
}

// ── Village Potentials ──

export async function fetchVillagePotentials(): Promise<PotensiDesaItem[]> {
  const json = await apiGet<any>('/api/village-potentials')
  return (json.data || []).map(transformPotensi)
}

// ── Profile ──

export async function fetchProfile(): Promise<any> {
  return apiGet<any>('/api/profile')
}

// ── Village Info ──

export async function fetchVillageInfo(): Promise<any> {
  return apiGet<any>('/api/village-info')
}

// ── Track Records ──

export async function fetchTrackRecords(): Promise<string[]> {
  const json = await apiGet<any>('/api/track-records')
  return (json.data || []).map((t: any) => t.content?.id || '')
}

// ── Organization Members ──

export async function fetchOrgMembers(): Promise<{ jabatan: string; nama: string }[]> {
  const json = await apiGet<any>('/api/organization-members')
  return (json.data || []).map(transformOrgMember)
}

// ── WhatsApp Numbers ──

export async function fetchWhatsappNumbers(): Promise<any[]> {
  const json = await apiGet<any>('/api/whatsapp-numbers')
  return json.data || []
}

// ── Lemah Asri (composite from multiple endpoints) ──

export async function fetchLemahAsri(): Promise<LemahAsriType> {
  const [profileResp, villageInfoResp, orgMembers, trackRecords] = await Promise.all([
    fetchProfile(),
    fetchVillageInfo(),
    fetchOrgMembers(),
    fetchTrackRecords(),
  ])

  const profile = profileResp.data || profileResp
  const villageInfo = villageInfoResp.data || villageInfoResp

  return {
    namaUsaha: profile.business_name || { id: '', en: '' },
    pemilik: profile.owner?.id || '',
    tahunBerdiri: profile.founded_date?.split('-')[0] || '',
    lokasi: profile.location?.id || '',
    noTelp: profile.phone || '',
    email: profile.email || '',
    instagram: profile.ig_url || '',
    youtube: profile.yt_url || '',
    visi: villageInfo.vision || { id: '', en: '' },
    misi: villageInfo.mission || { id: '', en: '' },
    sejarah: villageInfo.background || { id: '', en: '' },
    strukturOrganisasi: orgMembers,
    trackRecord: trackRecords,
    updatedAt: profile.updated_at || '',
  }
}

// ── Auth ──

export async function loginApi(
  email: string,
  password: string,
): Promise<{ token?: string; message: string }> {
  return apiPost<any>('/api/login', { email, password })
}

// ── Admin CRUD ──

export async function adminCreateArticle(data: any): Promise<any> {
  return apiPost<any>('/api/articles', data)
}

export async function adminUpdateArticle(id: number | string, data: any): Promise<any> {
  return apiPatch<any>(`/api/articles/${id}`, data)
}

export async function adminDeleteArticle(id: number | string): Promise<any> {
  return apiDelete<any>(`/api/articles/${id}`)
}

export async function adminCreateUmkm(data: any): Promise<any> {
  return apiPost<any>('/api/umkm', data)
}

export async function adminUpdateUmkm(id: number | string, data: any): Promise<any> {
  return apiPatch<any>(`/api/umkm/${id}`, data)
}

export async function adminDeleteUmkm(id: number | string): Promise<any> {
  return apiDelete<any>(`/api/umkm/${id}`)
}

export async function adminCreateTourPackage(data: any): Promise<any> {
  return apiPost<any>('/api/tour-packages', data)
}

export async function adminUpdateTourPackage(id: number | string, data: any): Promise<any> {
  return apiPatch<any>(`/api/tour-packages/${id}`, data)
}

export async function adminDeleteTourPackage(id: number | string): Promise<any> {
  return apiDelete<any>(`/api/tour-packages/${id}`)
}

export async function adminCreatePartner(data: any): Promise<any> {
  return apiPost<any>('/api/partners', data)
}

export async function adminUpdatePartner(id: number | string, data: any): Promise<any> {
  return apiPatch<any>(`/api/partners/${id}`, data)
}

export async function adminDeletePartner(id: number | string): Promise<any> {
  return apiDelete<any>(`/api/partners/${id}`)
}

export async function adminCreateVillagePotential(data: any): Promise<any> {
  return apiPost<any>('/api/village-potentials', data)
}

export async function adminUpdateVillagePotential(id: number | string, data: any): Promise<any> {
  return apiPatch<any>(`/api/village-potentials/${id}`, data)
}

export async function adminDeleteVillagePotential(id: number | string): Promise<any> {
  return apiDelete<any>(`/api/village-potentials/${id}`)
}

export async function adminCreateTrackRecord(data: any): Promise<any> {
  return apiPost<any>('/api/track-records', data)
}

export async function adminUpdateTrackRecord(id: number | string, data: any): Promise<any> {
  return apiPatch<any>(`/api/track-records/${id}`, data)
}

export async function adminDeleteTrackRecord(id: number | string): Promise<any> {
  return apiDelete<any>(`/api/track-records/${id}`)
}

export async function adminCreateOrgMember(data: any): Promise<any> {
  return apiPost<any>('/api/organization-members', data)
}

export async function adminUpdateOrgMember(id: number | string, data: any): Promise<any> {
  return apiPatch<any>(`/api/organization-members/${id}`, data)
}

export async function adminDeleteOrgMember(id: number | string): Promise<any> {
  return apiDelete<any>(`/api/organization-members/${id}`)
}

export async function adminUpdateProfile(data: any): Promise<any> {
  return apiPatch<any>('/api/profile', data)
}

export async function adminUpdateVillageInfo(data: any): Promise<any> {
  return apiPatch<any>('/api/village-info', data)
}
