import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { readData, writeData } from '#/lib/data-utils'

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

export const artikelSchema = z.object({
  title: z.object({
    id: z.string().min(1, 'Judul Indonesia wajib diisi'),
    en: z.string().min(1, 'Title English wajib diisi'),
  }),
  content: z.object({
    id: z.string().min(1, 'Konten Indonesia wajib diisi'),
    en: z.string().min(1, 'Content English wajib diisi'),
  }),
  image: z.string().url('URL gambar tidak valid'),
  category: z.enum(['berita', 'kegiatan', 'pengumuman']),
  penulis: z.string().min(1, 'Penulis wajib diisi'),
  tanggal: z.string().regex(dateRegex, 'Format tanggal YYYY-MM-DD'),
})

export type ArtikelForm = z.infer<typeof artikelSchema>
export type ArtikelItem = ArtikelForm & {
  id: string
  createdAt: string
  updatedAt: string
}

export const getArtikelList = createServerFn({ method: 'GET' })
  .handler(async () => {
    return readData<ArtikelItem[]>('artikel.json')
  })

export const createArtikel = createServerFn({ method: 'POST' })
  .validator((data: unknown) => artikelSchema.parse(data))
  .handler(async ({ data }) => {
    const list = await readData<ArtikelItem[]>('artikel.json')
    const newItem: ArtikelItem = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    list.push(newItem)
    await writeData('artikel.json', list)
    return newItem
  })

export const updateArtikel = createServerFn({ method: 'POST' })
  .validator((data: unknown) => z.object({
    id: z.string(),
    data: artikelSchema.partial(),
  }).parse(data))
  .handler(async ({ data }) => {
    const list = await readData<ArtikelItem[]>('artikel.json')
    const index = list.findIndex((item) => item.id === data.id)
    if (index === -1) throw new Error('Artikel tidak ditemukan')
    list[index] = { ...list[index], ...data.data, updatedAt: new Date().toISOString() }
    await writeData('artikel.json', list)
    return list[index]
  })

export const deleteArtikel = createServerFn({ method: 'POST' })
  .validator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const list = await readData<ArtikelItem[]>('artikel.json')
    const filtered = list.filter((item) => item.id !== data.id)
    await writeData('artikel.json', filtered)
    return { success: true }
  })
