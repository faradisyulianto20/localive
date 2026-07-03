import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { readData, writeData } from '#/lib/data-utils'

export const wisataSchema = z.object({
  category: z.enum(['destinasi', 'atraksi', 'aktivitas']),
  title: z.object({
    id: z.string().min(1, 'Judul Indonesia wajib diisi'),
    en: z.string().min(1, 'Title English wajib diisi'),
  }),
  description: z.object({
    id: z.string().min(1, 'Deskripsi Indonesia wajib diisi'),
    en: z.string().min(1, 'Description English wajib diisi'),
  }),
  image: z.string().url('URL gambar tidak valid'),
})

export type WisataForm = z.infer<typeof wisataSchema>
export type WisataItem = WisataForm & {
  id: string
  createdAt: string
  updatedAt: string
}

export const getWisataList = createServerFn({ method: 'GET' })
  .handler(async () => {
    return readData<WisataItem[]>('wisata.json')
  })

export const createWisata = createServerFn({ method: 'POST' })
  .validator((data: unknown) => wisataSchema.parse(data))
  .handler(async ({ data }) => {
    const list = await readData<WisataItem[]>('wisata.json')
    const newItem: WisataItem = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    list.push(newItem)
    await writeData('wisata.json', list)
    return newItem
  })

export const updateWisata = createServerFn({ method: 'POST' })
  .validator((data: unknown) => z.object({
    id: z.string(),
    data: wisataSchema.partial(),
  }).parse(data))
  .handler(async ({ data }) => {
    const list = await readData<WisataItem[]>('wisata.json')
    const index = list.findIndex((item) => item.id === data.id)
    if (index === -1) throw new Error('Wisata tidak ditemukan')
    list[index] = { ...list[index], ...data.data, updatedAt: new Date().toISOString() }
    await writeData('wisata.json', list)
    return list[index]
  })

export const deleteWisata = createServerFn({ method: 'POST' })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const list = await readData<WisataItem[]>('wisata.json')
    const filtered = list.filter((item) => item.id !== data.id)
    await writeData('wisata.json', filtered)
    return { success: true }
  })
