import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

function getDataDir() {
  return path.resolve(import.meta.dirname, '../data')
}

export async function readData<T>(filename: string): Promise<T> {
  const filePath = path.join(getDataDir(), filename)
  const raw = await readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

export async function writeData<T>(filename: string, data: T): Promise<void> {
  const filePath = path.join(getDataDir(), filename)
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}
