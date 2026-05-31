const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/api'

export const API_BASE_URL = rawApiBaseUrl.replace(/\/+$/, '')
export const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER || '51977545862').replace(/\D/g, '')
export const PUBLIC_WHATSAPP = import.meta.env.VITE_PUBLIC_WHATSAPP || '+51 977 545 862'
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'hola@maceli.pe'

export function apiUrl(path) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${normalizedPath}`
}

export function mediaUrl(url) {
  if (!url) return ''
  if (/^https?:\/\//i.test(url)) return url

  if (url.startsWith('/') && /^https?:\/\//i.test(API_BASE_URL)) {
    const apiOrigin = new URL(API_BASE_URL).origin
    return `${apiOrigin}${url}`
  }

  return url
}

export function whatsappLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export async function apiFetch(path, options = {}) {
  const controller = new AbortController()
  const timeoutMs = options.timeoutMs || 8000
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    return await fetch(apiUrl(path), {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...options.headers,
      },
    })
  } finally {
    window.clearTimeout(timeoutId)
  }
}
