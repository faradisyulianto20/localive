let token: string | null = null

export function setAuthToken(t: string | null) {
  token = t
}

export function getAuthToken(): string | null {
  return token
}

export async function apiGet<T>(path: string): Promise<T> {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${base}${path}`, { headers })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.message || `API error: ${res.status}`)
  }
  return res.json()
}

export async function apiPost<T>(path: string, body?: unknown): Promise<T> {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.message || `API error: ${res.status}`)
  }
  return res.json()
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${base}${path}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.message || `API error: ${res.status}`)
  }
  return res.json()
}

export async function apiDelete<T>(path: string): Promise<T> {
  const base = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${base}${path}`, { method: 'DELETE', headers })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.message || `API error: ${res.status}`)
  }
  return res.json()
}
