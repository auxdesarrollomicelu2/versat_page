// src/components/ui/BookingModal.tsx
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, User, Mail, Phone, Building2,
  Briefcase, Calendar, Clock, MessageSquare,
  CheckCircle2, ArrowRight, ArrowLeft, Loader2,
  AlertCircle,
} from 'lucide-react'
import { SERVICES, TIME_SLOTS } from '../../hooks/useBooking'
import type { BookingStep, BookingForm, BookingFormField } from '../../hooks/useBooking'

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface BookingModalProps {
  isOpen:        boolean
  onClose:       () => void
  step:          BookingStep
  form:          BookingForm
  onFieldChange: (field: BookingFormField, value: string) => void
  onNext:        () => void
  onBack:        () => void
  onSubmit:      () => void
  isStep1Valid:  boolean
  isStep2Valid:  boolean
  loading:       boolean
  error:         string | null
}

// ─── Subcomponentes ───────────────────────────────────────────────────────────

function InputField({
  icon: Icon, label, type = 'text', value, onChange, placeholder, required, fieldType,
}: {
  icon: React.ElementType
  label: string
  type?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  fieldType?: 'name' | 'email' | 'phone' | 'text'
}) {
  const [error, setError] = useState<string>('')

  const handleChange = (newValue: string) => {
    setError('')

    // Validación según tipo de campo
    if (fieldType === 'name') {
      // Solo letras, espacios y acentos
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/
      if (!nameRegex.test(newValue)) {
        setError('Solo se permiten letras')
        return
      }
    }

    if (fieldType === 'phone') {
      // Solo números, espacios, + y guiones
      const phoneRegex = /^[\d\s+()-]*$/
      if (!phoneRegex.test(newValue)) {
        setError('Solo se permiten números')
        return
      }
    }

    onChange(newValue)
  }

  const handleBlur = () => {
    // Validación completa al salir del campo
    if (fieldType === 'email' && value) {
      // Debe contener @ y terminar en un dominio válido (.com, .co, .net, etc)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
      if (!emailRegex.test(value)) {
        setError('Ingresa un correo válido (ej: usuario@empresa.com)')
      } else if (!value.includes('@')) {
        setError('El correo debe contener @')
      } else if (!value.match(/\.[a-zA-Z]{2,}$/)) {
        setError('El correo debe terminar en un dominio válido')
      }
    }

    if (fieldType === 'phone' && value) {
      const digitsOnly = value.replace(/\D/g, '')
      if (digitsOnly.length < 10) {
        setError('Ingresa un teléfono válido (mínimo 10 dígitos)')
      }
    }

    if (fieldType === 'name' && value && required) {
      if (value.trim().length < 3) {
        setError('Ingresa tu nombre completo')
      }
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs md:text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div>
        <div className="relative">
          <Icon size={18} className={`absolute left-4 top-4 transition-colors ${
            error ? 'text-red-500' : 'text-gray-600'
          }`} />
          <input
            type={type}
            value={value}
            onChange={e => handleChange(e.target.value)}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`w-full bg-[#1a1a1a] border text-white placeholder-gray-600
                       rounded-xl pl-12 pr-4 py-4 text-base
                       focus:outline-none focus:bg-[#1f1f1f]
                       transition-all duration-200 ${
                         error 
                           ? 'border-red-500 focus:border-red-500' 
                           : 'border-gray-800 focus:border-accent'
                       }`}
          />
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        )}
      </div>
    </div>
  )
}

function SelectField({
  icon: Icon, label, value, onChange, options, placeholder, required,
}: {
  icon: React.ElementType
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs md:text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <div className="relative">
        <Icon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none z-10" />
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-gray-800 text-white
                     rounded-xl pl-12 pr-4 py-4 text-base appearance-none cursor-pointer
                     focus:outline-none focus:border-accent focus:bg-[#1f1f1f]
                     transition-all duration-200"
        >
          <option value="" className="text-gray-500">{placeholder}</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  )
}

// Indicador de progreso
function StepIndicator({ step }: { step: BookingStep }) {
  const steps: { key: BookingStep; label: string }[] = [
    { key: 'info',     label: 'Información' },
    { key: 'schedule', label: 'Horario'     },
    { key: 'confirm',  label: 'Confirmar'   },
  ]
  const activeIdx = steps.findIndex(s => s.key === step)

  if (step === 'success') return null

  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((s, i) => (
        <div key={s.key} className="flex items-center flex-1">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
              ${i < activeIdx  ? 'bg-accent text-dark'
              : i === activeIdx ? 'bg-accent text-dark ring-4 ring-accent/20'
              : 'bg-dark-border text-gray-500'}`}>
              {i < activeIdx ? <CheckCircle2 size={14} /> : i + 1}
            </div>
            <span className={`text-[11px] md:text-[10px] font-semibold uppercase tracking-wider
              ${i === activeIdx ? 'text-accent' : 'text-gray-600'}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px flex-1 mx-2 mb-4 transition-all duration-500
              ${i < activeIdx ? 'bg-accent' : 'bg-dark-border'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Pasos ────────────────────────────────────────────────────────────────────

function Step1Info({ form, onChange }: { form: BookingForm; onChange: (field: BookingFormField, value: string) => void }) {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-5"
    >
      <div className="mb-2">
        <h3 className="text-xl md:text-2xl font-black text-white">Tu información</h3>
        <p className="text-gray-500 text-sm md:text-base mt-2">Cuéntanos quién eres para preparar la cita.</p>
      </div>

      <InputField icon={User}      label="Nombre completo" value={form.client_name}    onChange={v => onChange('client_name', v)}    placeholder="Juan Pérez"                required fieldType="name" />
      <InputField icon={Mail}      label="Correo"          value={form.client_email}   onChange={v => onChange('client_email', v)}   placeholder="juan@empresa.com" type="email" required fieldType="email" />
      <InputField icon={Phone}     label="Teléfono"        value={form.client_phone}   onChange={v => onChange('client_phone', v)}   placeholder="+57 300 000 0000" type="tel" fieldType="phone" />
      <InputField icon={Building2} label="Empresa"         value={form.client_company} onChange={v => onChange('client_company', v)} placeholder="Mi Empresa S.A." fieldType="text" />
      <SelectField
        icon={Briefcase} label="Servicio de interés" value={form.service}
        onChange={v => onChange('service', v)}
        options={SERVICES} placeholder="Selecciona un servicio" required
      />
    </motion.div>
  )
}

function Step2Schedule({ form, onChange }: { form: BookingForm; onChange: (field: BookingFormField, value: string) => void }) {
  // Mínimo: mañana
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-5"
    >
      <div className="mb-2">
        <h3 className="text-xl md:text-2xl font-black text-white">Elige tu horario</h3>
        <p className="text-gray-500 text-sm md:text-base mt-2">¿Cuándo te queda mejor para hablar?</p>
      </div>

      {/* Fecha */}
      <div className="flex flex-col gap-2">
        <label className="text-xs md:text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          Fecha preferida <span className="text-accent">*</span>
        </label>
        <div className="relative">
          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="date"
            min={minDate}
            value={form.preferred_date}
            onChange={e => onChange('preferred_date', e.target.value)}
            className="w-full bg-[#1a1a1a] border border-gray-800 text-white
                       rounded-xl pl-12 pr-4 py-4 text-base
                       focus:outline-none focus:border-accent focus:bg-[#1f1f1f]
                       transition-all duration-200 [color-scheme:dark]"
          />
        </div>
      </div>

      {/* Slots de hora */}
      <div className="flex flex-col gap-2">
        <label className="text-xs md:text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <Clock size={13} /> Hora preferida <span className="text-accent">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {TIME_SLOTS.map(slot => (
            <button
              key={slot}
              type="button"
              onClick={() => onChange('preferred_time', slot)}
              className={`py-3 md:py-3 rounded-xl text-sm font-semibold border transition-all duration-200
                ${form.preferred_time === slot
                  ? 'bg-accent text-dark border-accent'
                  : 'bg-[#1a1a1a] border-gray-800 text-gray-400 hover:border-accent/50 hover:text-white'}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Mensaje */}
      <div className="flex flex-col gap-2">
        <label className="text-xs md:text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare size={13} /> Mensaje (opcional)
        </label>
        <textarea
          value={form.message}
          onChange={e => onChange('message', e.target.value)}
          placeholder="Cuéntanos brevemente sobre tu proyecto..."
          rows={3}
          className="w-full bg-[#1a1a1a] border border-gray-800 text-white placeholder-gray-600
                     rounded-xl px-4 py-4 text-base resize-none
                     focus:outline-none focus:border-accent focus:bg-[#1f1f1f]
                     transition-all duration-200"
        />
      </div>
    </motion.div>
  )
}

function Step3Confirm({ form }: { form: BookingForm }) {
  const rows = [
    { label: 'Nombre',   value: form.client_name },
    { label: 'Correo',   value: form.client_email },
    { label: 'Teléfono', value: form.client_phone  || '—' },
    { label: 'Empresa',  value: form.client_company || '—' },
    { label: 'Servicio', value: form.service },
    { label: 'Fecha',    value: form.preferred_date },
    { label: 'Hora',     value: form.preferred_time },
    { label: 'Mensaje',  value: form.message || '—' },
  ]

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-5"
    >
      <div className="mb-2">
        <h3 className="text-xl md:text-2xl font-black text-white">Confirma tu cita</h3>
        <p className="text-gray-500 text-sm md:text-base mt-2">Revisa los datos antes de enviar.</p>
      </div>

      <div className="bg-[#1a1a1a] border border-gray-800 rounded-2xl overflow-hidden">
        {rows.map((r, i) => (
          <div key={r.label} className={`flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-4 px-4 sm:px-5 py-3 sm:py-4 ${i < rows.length - 1 ? 'border-b border-gray-800' : ''}`}>
            <span className="text-[11px] text-gray-500 uppercase tracking-wider font-bold sm:w-28 shrink-0">{r.label}</span>
            <span className="text-sm sm:text-base text-white sm:text-right break-all">{r.value}</span>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-600 text-center leading-relaxed">
        Al confirmar, recibiremos tu solicitud y nos pondremos en contacto a la brevedad.
      </p>
    </motion.div>
  )
}

function StepSuccess({ onClose, form }: { onClose: () => void; form: BookingForm }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center text-center gap-6 py-8"
    >
      <motion.div
        initial={{ scale: 0 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center"
      >
        <CheckCircle2 size={40} className="text-accent" />
      </motion.div>

      <div>
        <h3 className="text-xl md:text-2xl font-black text-white">¡Solicitud enviada!</h3>
        <p className="text-gray-400 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
          Hemos recibido tu solicitud, <span className="text-white font-semibold">{form.client_name.split(' ')[0]}</span>. Nos comunicaremos contigo pronto para confirmar tu cita.
        </p>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-2xl px-6 py-4 w-full text-left">
        <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-1">Resumen</p>
        <p className="text-sm text-white">{form.service}</p>
        <p className="text-xs text-accent mt-0.5">{form.preferred_date} · {form.preferred_time}</p>
      </div>

      <button
        onClick={onClose}
        className="w-full bg-accent text-dark font-bold py-3.5 rounded-xl text-sm uppercase tracking-widest
                   hover:bg-accent/90 transition-all duration-200 active:scale-95"
      >
        Cerrar
      </button>
    </motion.div>
  )
}

// ─── Modal principal ──────────────────────────────────────────────────────────

export default function BookingModal({
  isOpen, onClose, step,
  form, onFieldChange,
  onNext, onBack, onSubmit,
  isStep1Valid, isStep2Valid,
  loading, error,
}: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const canGoNext = step === 'info' ? isStep1Valid : step === 'schedule' ? isStep2Valid : true

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={e => { if (e.target === overlayRef.current) onClose() }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Panel */}
          <motion.div
            className="relative z-10 w-full max-w-lg bg-dark border border-dark-border rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[95vh] flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: 20, scale: 0.95  }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Accent top line */}
            <div className="h-1 w-full bg-gradient-to-r from-accent via-accent/60 to-transparent" />

            {/* Header */}
            <div className="flex items-start justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
              <div>
                <p className="text-accent text-xs font-bold uppercase tracking-widest">Versat</p>
                <h2 className="text-base sm:text-lg font-black text-white mt-0.5">Agendar cita</h2>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-white transition-colors p-1.5 hover:bg-dark-border rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-4 overflow-y-auto flex-1">
              <StepIndicator step={step} />

              <AnimatePresence mode="wait">
                {step === 'info'     && <Step1Info     form={form} onChange={onFieldChange} />}
                {step === 'schedule' && <Step2Schedule form={form} onChange={onFieldChange} />}
                {step === 'confirm'  && <Step3Confirm  form={form} />}
                {step === 'success'  && <StepSuccess   form={form} onClose={onClose} />}
              </AnimatePresence>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3"
                >
                  <AlertCircle size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <p className="text-red-400 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Footer de navegación */}
              {step !== 'success' && (
                <div className="flex gap-2 sm:gap-3 mt-6">
                  {(step === 'schedule' || step === 'confirm') && (
                    <button
                      onClick={onBack}
                      className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-xl border border-dark-border text-gray-400
                                 hover:text-white hover:border-gray-500 transition-all duration-200 text-sm font-semibold"
                    >
                      <ArrowLeft size={16} /> <span className="hidden sm:inline">Atrás</span>
                    </button>
                  )}

                  {step !== 'confirm' ? (
                    <button
                      onClick={onNext}
                      disabled={!canGoNext}
                      className="flex-1 flex items-center justify-center gap-2 bg-accent text-dark font-bold
                                 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-widest
                                 hover:bg-accent/90 transition-all duration-200 active:scale-[0.98]
                                 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Continuar <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={onSubmit}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 bg-accent text-dark font-bold
                                 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm uppercase tracking-widest
                                 hover:bg-accent/90 transition-all duration-200 active:scale-[0.98]
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading
                        ? <><Loader2 size={16} className="animate-spin" /> Enviando...</>
                        : <><CheckCircle2 size={16} /> Confirmar cita</>}
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}