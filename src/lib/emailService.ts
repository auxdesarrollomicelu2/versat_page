// src/lib/emailService.ts
// Servicio de envío de correo con Azure Communication Services (Backend)

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export interface BookingPayload {
  client_name: string
  client_email: string
  client_phone: string
  client_company?: string
  service: string
  preferred_date?: string
  preferred_time?: string
  message: string
}

/**
 * Envía la solicitud de contacto al backend
 * El backend se encarga de enviar el correo usando Azure Communication Services
 */
export async function sendBookingEmail(payload: BookingPayload): Promise<void> {
  const response = await fetch(`${API_URL}/api/email/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Error al enviar el correo')
  }

  const result = await response.json()
  return result
}