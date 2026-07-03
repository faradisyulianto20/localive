import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { readData, writeData } from '#/lib/data-utils'

export const umkmSchema = z.object({
  category: z.enum(['makanan', 'produk', 'jasa']),
  title: z.object({
    id: z.string().min(1, 'Nama UMKM (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Name (English) wajib diisi'),
  }),
  description: z.object({
    id: z.string().min(1, 'Deskripsi (Indonesia) wajib diisi'),
    en: z.string().min(1, 'Description (English) wajib diisi'),
  }),
  image: z.string().url('URL gambar tidak valid'),
  noTelp: z.string().min(8, 'No telepon minimal 8 digit'),
  waUrl: z.string().url('URL WhatsApp tidak valid').optional().or(z.literal('')),
  mapsUrl: z.string().url('URL Maps tidak valid').optional().or(z.literal('')),
})

export type UMKMForm = z.infer<typeof umkmSchema>
export type UMKMItem = UMKMForm & {
  id: string
  createdAt: string
  updatedAt: string
}

export const getUMKMList = createServerFn({ method: 'GET' })
  .handler(async () => {
    return readData<UMKMItem[]>('umkm.json')
  })

export const createUMKM = createServerFn({ method: 'POST' })
  .validator((data: unknown) => umkmSchema.parse(data))
  .handler(async ({ data }) => {
    const list = await readData<UMKMItem[]>('umkm.json')
    const newItem: UMKMItem = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    list.push(newItem)
    await writeData('umkm.json', list)
    return newItem
  })

export const updateUMKM = createServerFn({ method: 'POST' })
  .validator((data: unknown) => z.object({
    id: z.string(),
    data: umkmSchema.partial(),
  }).parse(data))
  .handler(async ({ data }) => {
    const list = await readData<UMKMItem[]>('umkm.json')
    const index = list.findIndex((item) => item.id === data.id)
    if (index === -1) throw new Error('UMKM tidak ditemukan')
    list[index] = { ...list[index], ...data.data, updatedAt: new Date().toISOString() }
    await writeData('umkm.json', list)
    return list[index]
  })

export const deleteUMKM = createServerFn({ method: 'POST' })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const list = await readData<UMKMItem[]>('umkm.json')
    const filtered = list.filter((item) => item.id !== data.id)
    await writeData('umkm.json', filtered)
    return { success: true }
  })
