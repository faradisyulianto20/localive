import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { readData, writeData } from '#/lib/data-utils'

export const lemahAsriSchema = z.object({
  namaUsaha: z.object({
    id: z.string().min(1, 'Nama usaha (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Business name (English) wajib diisi'),
  }),
  pemilik: z.string().min(1, 'Pemilik usaha wajib diisi'),
  tahunBerdiri: z.string().min(1, 'Tahun berdiri wajib diisi'),
  lokasi: z.string().min(1, 'Lokasi wajib diisi'),
  noTelp: z.string().min(1, 'No telepon wajib diisi'),
  email: z.string().email('Email tidak valid'),
  instagram: z.string().min(1, 'Akun Instagram wajib diisi'),
  youtube: z.string().min(1, 'Akun YouTube wajib diisi'),
  visi: z.object({
    id: z.string().min(1, 'Visi (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Vision (English) wajib diisi'),
  }),
  misi: z.object({
    id: z.string().min(1, 'Misi (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Mission (English) wajib diisi'),
  }),
  strukturOrganisasi: z.array(z.object({
    jabatan: z.string().min(1, 'Jabatan wajib diisi'),
    nama: z.string().min(1, 'Nama wajib diisi'),
  })),
  trackRecord: z.array(z.string()),
})

export type LemahAsriForm = z.infer<typeof lemahAsriSchema>
export type LemahAsriType = LemahAsriForm & {
  updatedAt: string
}

export const getLemahAsri = createServerFn({ method: 'GET' })
  .handler(async () => {
    return readData<LemahAsriType>('lemah-asri.json')
  })

export const updateLemahAsri = createServerFn({ method: 'POST' })
  .validator((data: unknown) => lemahAsriSchema.parse(data))
  .handler(async ({ data }) => {
    const updated: LemahAsriType = {
      ...data,
      updatedAt: new Date().toISOString(),
    }
    await writeData('lemah-asri.json', updated)
    return updated
  })
