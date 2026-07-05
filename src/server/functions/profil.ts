import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { readData, writeData } from '#/lib/data-utils'

export const potensiDesaSchema = z.object({
  id: z.string().optional(),
  image: z.string().min(1, 'Gambar wajib diisi'),
  title: z.object({
    id: z.string().min(1, 'Judul Indonesia wajib diisi'),
    en: z.string().min(1, 'Title English wajib diisi'),
  }),
  description: z.object({
    id: z.string().min(1, 'Deskripsi Indonesia wajib diisi'),
    en: z.string().min(1, 'Description English wajib diisi'),
  }),
  badge: z.object({ id: z.string(), en: z.string() }).nullable().optional(),
  color: z.string().default('forest'),
  icon: z.string().nullable().optional(),
})

export type PotensiDesaForm = z.infer<typeof potensiDesaSchema>
export type PotensiDesaItem = PotensiDesaForm & { id: string }

export const mitraSchema = z.object({
  id: z.string().optional(),
  logo: z.string().min(1, 'Logo wajib diisi'),
  nama: z.string().min(1, 'Nama perusahaan wajib diisi'),
  url: z.string().nullable().optional(),
})

export type MitraForm = z.infer<typeof mitraSchema>
export type MitraItem = MitraForm & { id: string }

// ── Potensi Desa ──

export const getPotensiDesa = createServerFn({ method: 'GET' })
  .handler(async () => {
    const profil = await readData<any>('profil.json')
    return (profil.potensiDesa?.items ?? []) as PotensiDesaItem[]
  })

export const createPotensiDesa = createServerFn({ method: 'POST' })
  .validator((data: unknown) => potensiDesaSchema.parse(data))
  .handler(async ({ data }) => {
    const profil = await readData<any>('profil.json')
    const item: PotensiDesaItem = {
      ...data,
      id: data.id || crypto.randomUUID(),
    }
    if (!profil.potensiDesa) profil.potensiDesa = { items: [] }
    profil.potensiDesa.items.push(item)
    await writeData('profil.json', profil)
    return item
  })

export const updatePotensiDesa = createServerFn({ method: 'POST' })
  .validator((data: unknown) =>
    z.object({ id: z.string(), data: potensiDesaSchema.partial() }).parse(data),
  )
  .handler(async ({ data }) => {
    const profil = await readData<any>('profil.json')
    const items = profil.potensiDesa?.items ?? []
    const index = items.findIndex((i: any) => i.id === data.id)
    if (index === -1) throw new Error('Potensi Desa tidak ditemukan')
    items[index] = { ...items[index], ...data.data }
    await writeData('profil.json', profil)
    return items[index]
  })

export const deletePotensiDesa = createServerFn({ method: 'POST' })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const profil = await readData<any>('profil.json')
    if (profil.potensiDesa?.items) {
      profil.potensiDesa.items = profil.potensiDesa.items.filter(
        (i: any) => i.id !== data.id,
      )
    }
    await writeData('profil.json', profil)
    return { success: true }
  })

// ── Mitra ──

export const getMitra = createServerFn({ method: 'GET' })
  .handler(async () => {
    const profil = await readData<any>('profil.json')
    return (profil.mitra?.items ?? []) as MitraItem[]
  })

export const createMitra = createServerFn({ method: 'POST' })
  .validator((data: unknown) => mitraSchema.parse(data))
  .handler(async ({ data }) => {
    const profil = await readData<any>('profil.json')
    const item: MitraItem = {
      ...data,
      id: data.id || crypto.randomUUID(),
    }
    if (!profil.mitra) profil.mitra = { items: [] }
    profil.mitra.items.push(item)
    await writeData('profil.json', profil)
    return item
  })

export const updateMitra = createServerFn({ method: 'POST' })
  .validator((data: unknown) =>
    z.object({ id: z.string(), data: mitraSchema.partial() }).parse(data),
  )
  .handler(async ({ data }) => {
    const profil = await readData<any>('profil.json')
    const items = profil.mitra?.items ?? []
    const index = items.findIndex((i: any) => i.id === data.id)
    if (index === -1) throw new Error('Mitra tidak ditemukan')
    items[index] = { ...items[index], ...data.data }
    await writeData('profil.json', profil)
    return items[index]
  })

export const deleteMitra = createServerFn({ method: 'POST' })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const profil = await readData<any>('profil.json')
    if (profil.mitra?.items) {
      profil.mitra.items = profil.mitra.items.filter(
        (i: any) => i.id !== data.id,
      )
    }
    await writeData('profil.json', profil)
    return { success: true }
  })
