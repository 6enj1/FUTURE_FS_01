const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
  _honey?: string
}

interface ApiResponse {
  success: boolean
  message: string
}

export async function sendContactForm(data: ContactPayload): Promise<ApiResponse> {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Something went wrong' }))
    throw new Error(err.message || `Request failed (${res.status})`)
  }

  return res.json()
}
