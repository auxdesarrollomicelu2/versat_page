// src/hooks/useBooking.ts
import { useState, useCallback } from 'react'
import { sendBookingEmail, type BookingPayload } from '../lib/emailService'

export type BookingStep = 'info' | 'schedule' | 'confirm' | 'success'

export interface BookingForm {
  // Paso 1 – Información
  client_name:    string
  client_email:   string
  client_phone:   string
  client_company: string
  service:        string
  // Paso 2 – Horario
  preferred_date: string
  preferred_time: string
  message:        string
}

export type BookingFormField = keyof BookingForm

const INITIAL_FORM: BookingForm = {
  client_name:    '',
  client_email:   '',
  client_phone:   '',
  client_company: '',
  service:        '',
  preferred_date: '',
  preferred_time: '',
  message:        '',
}

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
]

export const SERVICES = [
  'Desarrollo Web',
  'Sistemas a medida',
  'Automatización',
  'Consultoría digital',
  'Análisis de datos',
  'Soluciones para retail',
]

export function useBooking() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [step,     setStep]     = useState<BookingStep>('info')
  const [form,     setForm]     = useState<BookingForm>(INITIAL_FORM)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  // ── Helpers ──────────────────────────────────────────────────────────────
  const openModal  = useCallback(() => { setIsOpen(true);  setStep('info'); setForm(INITIAL_FORM); setError(null) }, [])
  const closeModal = useCallback(() => { setIsOpen(false); setStep('info'); setForm(INITIAL_FORM); setError(null) }, [])

  const updateField = useCallback(
    (field: BookingFormField, value: string) =>
      setForm(prev => ({ ...prev, [field]: value })),
    [],
  )

  // ── Validaciones por paso ────────────────────────────────────────────────
  const isStep1Valid = Boolean(
    form.client_name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.client_email) &&
    form.service,
  )

  const isStep2Valid = Boolean(form.preferred_date && form.preferred_time)

  // ── Navegación ───────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (step === 'info')     setStep('schedule')
    if (step === 'schedule') setStep('confirm')
  }, [step])

  const goBack = useCallback(() => {
    if (step === 'schedule') setStep('info')
    if (step === 'confirm')  setStep('schedule')
  }, [step])

  // ── Envío ────────────────────────────────────────────────────────────────
  const submit = useCallback(async () => {
    setLoading(true)
    setError(null)

    const payload: BookingPayload = {
      client_name: form.client_name,
      client_email: form.client_email,
      client_phone: form.client_phone,
      client_company: form.client_company,
      service: form.service,
      preferred_date: form.preferred_date,
      preferred_time: form.preferred_time,
      message: form.message,
    }

    try {
      await sendBookingEmail(payload)
      setStep('success')
    } catch {
      setError('No pudimos enviar tu solicitud. Por favor intenta de nuevo o escríbenos directamente.')
    } finally {
      setLoading(false)
    }
  }, [form])

  return {
    isOpen, openModal, closeModal,
    step, goNext, goBack,
    form, updateField,
    isStep1Valid, isStep2Valid,
    loading, error, submit,
  }
}