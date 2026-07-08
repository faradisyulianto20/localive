const API_BASE = import.meta.env.VITE_API_URL ?? '/api'

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  params?: Record<string, string>
}

class ApiError extends Error {
  status: number
  errors: Record<string, string[]>

  constructor(status: number, message: string, errors: Record<string, string[]> = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.errors = errors
  }
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[1]) : null
}

async function request<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { body, params, headers, ...init } = options

  let url = `${API_BASE}${endpoint}`
  if (params) {
    const search = new URLSearchParams(params).toString()
    url += `?${search}`
  }

  const xsrfToken = getCookie('XSRF-TOKEN')
  const isFormData = body instanceof FormData

  const res = await fetch(url, {
    ...init,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(!isFormData && body ? { 'Content-Type': 'application/json' } : {}),
      ...(xsrfToken ? { 'X-XSRF-TOKEN': xsrfToken } : {}),
      ...headers,
    },
    body: isFormData ? body : (body ? JSON.stringify(body) : undefined),
  })

  if (res.status === 204) return undefined as T

  const json = await res.json().catch(() => ({})) as Record<string, unknown>

  if (!res.ok) {
    const message = (json.message as string) ?? 'Terjadi kesalahan pada server'
    const errors = (json.errors as Record<string, string[]>) ?? {}
    throw new ApiError(res.status, message, errors)
  }

  return json as T
}

export async function csrf(): Promise<void> {
  await fetch('/sanctum/csrf-cookie', {
    credentials: 'include',
  })
}

export { request, ApiError, API_BASE }
export const api = {
  get: <T>(endpoint: string, opts?: RequestOptions) => request<T>(endpoint, { ...opts, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(endpoint, { ...opts, method: 'POST', body }),
  patch: <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(endpoint, { ...opts, method: 'PATCH', body }),
  put: <T>(endpoint: string, body?: unknown, opts?: RequestOptions) =>
    request<T>(endpoint, { ...opts, method: 'PUT', body }),
  delete: <T>(endpoint: string, opts?: RequestOptions) => request<T>(endpoint, { ...opts, method: 'DELETE' }),
  upload: <T>(endpoint: string, formData: FormData, method: 'POST' | 'PATCH' = 'POST') =>
    request<T>(endpoint, { method, body: formData }),
}
