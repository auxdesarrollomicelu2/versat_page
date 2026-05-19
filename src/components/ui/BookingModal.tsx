import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, User, Mail, Phone, Building2,
  Briefcase, Calendar, Clock, MessageSquare,
  CheckCircle2, ArrowRight, ArrowLeft, Loader2,
  AlertCircle, MapPin,
} from 'lucide-react'
import { SERVICES, TIME_SLOTS } from '../../hooks/useBooking'
import type { BookingStep, BookingForm, BookingFormField } from '../../hooks/useBooking'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  step: BookingStep
  form: BookingForm
  onFieldChange: (field: BookingFormField, value: string) => void
  onNext: () => void
  onBack: () => void
  onSubmit: () => void
  isStep1Valid: boolean
  isStep2Valid: boolean
  loading: boolean
  error: string | null
}

const STEP_CONFIG: Record<Exclude<BookingStep, 'success'>, {
  num: string; kicker: string; title: string; highlight: string; subtitle: string; contextTitle: string; context: string
}> = {
  info: {
    num: '01',
    kicker: '/info',
    title: 'Hablemos',
    highlight: 'de ti',
    subtitle: 'Queremos entender quien eres antes de hablar.',
    contextTitle: 'Que esperar',
    context: 'Responderemos en menos de 24h. No vendemos, escuchamos. Esta conversacion es gratis y sin compromiso.',
  },
  schedule: {
    num: '02',
    kicker: '/tiempo',
    title: 'Elige',
    highlight: 'cuando',
    subtitle: 'Un horario c�modo hace la diferencia.',
    contextTitle: 'La reuni�n',
    context: 'Duraci�n: 30-45 min. Formato: video llamada o presencial en Medell�n. Idioma: espa�ol.',
  },
  confirm: {
    num: '03',
    kicker: '/confirmar',
    title: 'Revisa',
    highlight: 'y envia',
    subtitle: 'Verifica los datos antes del envio.',
    contextTitle: 'Que sigue',
    context: 'Recibiras un correo de confirmacion. Nos pondremos en contacto para ajustar detalles o proponer alternativas si hace falta.',
  },
}

// ─── Input field ──────────────────────────────────────────────────────────────

function InputField({
  icon: Icon, label, type = 'text', value, onChange, placeholder, required, fieldType,
}: {
  icon: React.ElementType; label: string; type?: string; value: string
  onChange: (v: string) => void; placeholder?: string; required?: boolean
  fieldType?: 'name' | 'email' | 'phone' | 'text'
}) {
  const [error, setError] = useState('')
  const [focused, setFocused] = useState(false)

  const handleChange = (newValue: string) => {
    setError('')
    if (fieldType === 'name' && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(newValue)) { setError('Solo letras'); return }
    if (fieldType === 'phone' && !/^[\d\s+()-]*$/.test(newValue)) { setError('Solo n�meros'); return }
    onChange(newValue)
  }

  const handleBlur = () => {
    setFocused(false)
    if (fieldType === 'email' && value && !/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(value)) setError('Correo invalido')
    if (fieldType === 'phone' && value && value.replace(/\D/g, '').length < 10) setError('Minimo 10 digitos')
    if (fieldType === 'name' && value && required && value.trim().length < 3) setError('Nombre completo')
  }

  const underlineColor = error ? 'bg-red-500' : focused ? 'bg-accent' : 'bg-[#253038]'

  return (
    <div className="flex flex-col gap-2 group">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
          {label} {required && <span className="text-accent">*</span>}
        </label>
        {value && !error && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-emerald-400"
          >
            <CheckCircle2 size={12} strokeWidth={2.5} />
          </motion.span>
        )}
      </div>
      <div className="relative">
        <Icon size={14} className={`absolute left-0 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-400' : focused ? 'text-accent' : 'text-zinc-500'}`} />
        <input
          type={type}
          value={value}
          onChange={e => handleChange(e.target.value)}
          onBlur={handleBlur}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          style={{
            WebkitBoxShadow: '0 0 0 30px #0b1013 inset',
            WebkitTextFillColor: '#f4f4f5',
          }}
          className="w-full bg-transparent text-zinc-100 placeholder-zinc-600 pl-7 pr-2 py-3 text-base focus:outline-none"
        />
        {/* Animated underline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1a2129]" />
        <motion.div
          className={`absolute bottom-0 left-0 h-px ${underlineColor}`}
          initial={{ width: '0%' }}
          animate={{ width: focused || value ? '100%' : '0%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-[11px] flex items-center gap-1 font-mono">
          <AlertCircle size={11} /> {error}
        </motion.p>
      )}
    </div>
  )
}

function SelectField({
  icon: Icon, label, value, onChange, options, placeholder, required,
}: {
  icon: React.ElementType; label: string; value: string; onChange: (v: string) => void
  options: string[]; placeholder?: string; required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">
          {label} {required && <span className="text-accent">*</span>}
        </label>
        {value && (
          <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="text-emerald-400">
            <CheckCircle2 size={12} strokeWidth={2.5} />
          </motion.span>
        )}
      </div>
      <div className="relative">
        <Icon size={14} className={`absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 transition-colors ${focused ? 'text-accent' : 'text-zinc-500'}`} />
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-zinc-100 pl-7 pr-6 py-3 text-base appearance-none cursor-pointer focus:outline-none"
        >
          <option value="" className="bg-[#0b1013] text-zinc-500">{placeholder}</option>
          {options.map(o => <option key={o} value={o} className="bg-[#0b1013]">{o}</option>)}
        </select>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1a2129]" />
        <motion.div
          className={`absolute bottom-0 left-0 h-px ${focused ? 'bg-accent' : 'bg-[#253038]'}`}
          initial={{ width: '0%' }}
          animate={{ width: focused || value ? '100%' : '0%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1Info({ form, onChange }: { form: BookingForm; onChange: (field: BookingFormField, value: string) => void }) {
  return (
    <motion.div key="step1" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6">
      <InputField icon={User} label="Nombre completo" value={form.client_name} onChange={v => onChange('client_name', v)} placeholder="Tu nombre" required fieldType="name" />
      <InputField icon={Mail} label="Correo" value={form.client_email} onChange={v => onChange('client_email', v)} placeholder="tu@empresa.com" type="email" required fieldType="email" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField icon={Phone} label="Tel�fono" value={form.client_phone} onChange={v => onChange('client_phone', v)} placeholder="+57 300 000 0000" type="tel" fieldType="phone" />
        <InputField icon={Building2} label="Empresa" value={form.client_company} onChange={v => onChange('client_company', v)} placeholder="Nombre empresa" fieldType="text" />
      </div>
      <SelectField icon={Briefcase} label="Servicio de interes" value={form.service} onChange={v => onChange('service', v)} options={SERVICES} placeholder="Selecciona un servicio" required />
    </motion.div>
  )
}

function Step2Schedule({ form, onChange }: { form: BookingForm; onChange: (field: BookingFormField, value: string) => void }) {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <motion.div key="step2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6">
      {/* Date */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em]">Fecha <span className="text-accent">*</span></label>
          {form.preferred_date && (
            <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="text-emerald-400">
              <CheckCircle2 size={12} strokeWidth={2.5} />
            </motion.span>
          )}
        </div>
        <div className="relative">
          <Calendar size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
          <input
            type="date"
            min={minDate}
            value={form.preferred_date}
            onChange={e => onChange('preferred_date', e.target.value)}
            className="w-full bg-transparent text-zinc-100 pl-7 pr-4 py-3 text-base focus:outline-none [color-scheme:dark]"
          />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#1a2129]" />
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-accent"
            initial={{ width: '0%' }}
            animate={{ width: form.preferred_date ? '100%' : '0%' }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Time slots grid */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
            <Clock size={10} /> Hora <span className="text-accent">*</span>
          </label>
          {form.preferred_time && (
            <span className="text-accent font-mono text-xs font-bold">{form.preferred_time}</span>
          )}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {TIME_SLOTS.map(slot => {
            const isSelected = form.preferred_time === slot
            return (
              <motion.button
                key={slot}
                type="button"
                onClick={() => onChange('preferred_time', slot)}
                className={`relative py-3 text-xs font-mono font-bold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-accent text-[#0b1013] border-accent'
                    : 'bg-transparent border-[#253038] text-zinc-300 hover:border-accent/50 hover:text-white'
                }`}
                whileTap={{ scale: 0.96 }}
              >
                {slot}
                {isSelected && (
                  <motion.div
                    layoutId="time-selector"
                    className="absolute -top-1 -right-1 w-2 h-2 bg-accent"
                    style={{ boxShadow: '0 0 6px #00C2A8' }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
          <MessageSquare size={10} /> Mensaje <span className="text-zinc-600 normal-case tracking-normal font-normal">(opcional)</span>
        </label>
        <div className="relative">
          <textarea
            value={form.message}
            onChange={e => onChange('message', e.target.value)}
            placeholder="Cu�ntanos brevemente sobre tu proyecto..."
            rows={3}
            className="w-full bg-transparent text-zinc-100 placeholder-zinc-600 px-0 py-3 text-base resize-none focus:outline-none border-b border-[#1a2129] focus:border-accent transition-colors"
          />
        </div>
      </div>
    </motion.div>
  )
}

function Step3Confirm({ form }: { form: BookingForm }) {
  const rows = [
    { label: 'Nombre', value: form.client_name, icon: User },
    { label: 'Correo', value: form.client_email, icon: Mail },
    { label: 'Tel�fono', value: form.client_phone || '—', icon: Phone },
    { label: 'Empresa', value: form.client_company || '—', icon: Building2 },
    { label: 'Servicio', value: form.service, icon: Briefcase },
  ]

  return (
    <motion.div key="step3" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }} className="flex flex-col gap-6">
      {/* Reservation card - ticket style */}
      <div className="relative bg-[#0f1519] border border-[#253038]">
        {/* Ticket perforation - between top and bottom halves */}
        <div className="absolute top-[140px] -left-2 w-4 h-4 rounded-full bg-[#0b1013] z-10" />
        <div className="absolute top-[140px] -right-2 w-4 h-4 rounded-full bg-[#0b1013] z-10" />

        {/* Top half */}
        <div className="p-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-accent font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
              RESERVA
            </span>
            <span className="text-zinc-600 font-mono text-[10px]">
              #{String(Date.now()).slice(-6)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block mb-1">
                Fecha
              </span>
              <span className="text-white font-bold text-lg font-mono">
                {form.preferred_date}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block mb-1">
                Hora
              </span>
              <span className="text-accent font-bold text-lg font-mono">
                {form.preferred_time}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom half */}
        <div className="border-t border-dashed border-[#253038] mx-4" />
        <div className="p-5 pt-4 space-y-3">
          {rows.map((r) => {
            const RowIcon = r.icon
            return (
              <div key={r.label} className="flex items-center gap-3">
                <RowIcon size={12} className="text-accent flex-shrink-0" />
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono font-bold w-16 shrink-0">
                  {r.label}
                </span>
                <span className="text-sm text-zinc-200 text-right flex-1 break-all">
                  {r.value}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {form.message && (
        <div className="bg-[#0f1519] border-l-2 border-accent p-4">
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono font-bold block mb-2">Mensaje</span>
          <p className="text-sm text-zinc-200 leading-relaxed">{form.message}</p>
        </div>
      )}
    </motion.div>
  )
}

function StepSuccess({ onClose, form }: { onClose: () => void; form: BookingForm }) {
  return (
    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="flex flex-col items-center text-center gap-6 py-6">
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="relative w-24 h-24 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-accent/10 border-2 border-accent" />
        <motion.div
          className="absolute inset-0 border-2 border-accent"
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-accent"
          animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
        />
        <CheckCircle2 size={42} className="text-accent relative z-10" strokeWidth={1.5} />
      </motion.div>

      <div>
        <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-3 block font-bold">
          /solicitud.enviada
        </span>
        <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-[0.95]">
          Todo listo,
          <br />
          <span className="text-accent">{form.client_name.split(' ')[0]}</span>
        </h3>
        <p className="text-zinc-400 text-sm mt-4 max-w-sm mx-auto leading-relaxed">
          Recibimos tu solicitud. Te contactaremos en menos de 24 horas para confirmar los detalles.
        </p>
      </div>

      <div className="w-full bg-[#0f1519] border-l-2 border-accent px-5 py-4 text-left">
        <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono font-bold mb-2">Tu cita</p>
        <p className="text-white font-medium text-sm mb-1">{form.service}</p>
        <p className="text-accent font-mono text-sm">{form.preferred_date} &middot; {form.preferred_time}</p>
      </div>

      <button onClick={onClose} className="w-full bg-accent text-[#0b1013] font-bold py-4 text-xs uppercase tracking-[0.2em] hover:bg-accent-dim transition-all duration-200 active:scale-[0.98]">
        Cerrar
      </button>
    </motion.div>
  )
}

// ─── Main Modal ───────────────────────────────────────────────────────────────

export default function BookingModal({
  isOpen, onClose, step, form, onFieldChange,
  onNext, onBack, onSubmit, isStep1Valid, isStep2Valid, loading, error,
}: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const canGoNext = step === 'info' ? isStep1Valid : step === 'schedule' ? isStep2Valid : true
  const isSuccess = step === 'success'
  const currentConfig = !isSuccess ? STEP_CONFIG[step] : null

  const activeStepIndex = step === 'info' ? 0 : step === 'schedule' ? 1 : step === 'confirm' ? 2 : 3

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={e => { if (e.target === overlayRef.current) onClose() }}
        >
          {/* Backdrop with animated noise */}
          <div className="absolute inset-0 bg-[#050709]/95 backdrop-blur-xl" />

          {/* Modal container - expansive split layout */}
          <motion.div
            className="relative z-10 w-full max-w-6xl h-full md:h-[90vh] md:max-h-[800px] bg-[#0b1013] border border-[#253038] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >

            {/* ═══ LEFT PANEL — Branding + Timeline ═══ */}
            <div className="relative w-full md:w-[40%] bg-[#080c0f] border-b md:border-b-0 md:border-r border-[#1a2129] flex flex-col overflow-hidden">
              {/* Ambient teal glow */}
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent/[0.06] rounded-full blur-[80px] pointer-events-none will-change-transform" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/[0.03] rounded-full blur-[80px] pointer-events-none will-change-transform" />

              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(to right, #00C2A8 1px, transparent 1px), linear-gradient(to bottom, #00C2A8 1px, transparent 1px)',
                backgroundSize: '48px 48px'
              }} />

              {/* Corner frame */}
              <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-accent/30 pointer-events-none" />

              {/* Top bar - brand */}
              <div className="relative z-10 p-6 md:p-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-accent"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ boxShadow: '0 0 6px #00C2A8' }}
                  />
                  <span className="text-accent font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
                    VERSAT / BOOKING
                  </span>
                </div>
              </div>

              {/* Center content - step narrative */}
              <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-8 pb-6 md:pb-8">
                <AnimatePresence mode="wait">
                  {currentConfig ? (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {/* Massive step number */}
                      <div className="relative mb-6 md:mb-10">
                        <span
                          className="block text-[6rem] md:text-[10rem] font-black leading-[0.8] tracking-tighter text-transparent select-none pointer-events-none"
                          style={{ WebkitTextStroke: '1px rgba(0, 194, 168, 0.25)' }}
                        >
                          {currentConfig.num}
                        </span>
                        <motion.div
                          className="absolute top-1/2 left-0 h-px bg-accent"
                          initial={{ width: 0 }}
                          animate={{ width: '40px' }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>

                      {/* Kicker */}
                      <span className="text-accent font-mono text-[10px] uppercase tracking-[0.3em] mb-3 block">
                        {currentConfig.kicker}
                      </span>

                      {/* Title - editorial large */}
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9] mb-4">
                        {currentConfig.title}
                        <br />
                        <span className="text-zinc-500">{currentConfig.highlight}</span>
                      </h2>

                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
                        {currentConfig.subtitle}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-side"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <span className="text-emerald-400 font-mono text-[10px] uppercase tracking-[0.3em] mb-3 block">
                        /completado
                      </span>
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.9]">
                        Enviado
                        <br />
                        <span className="text-zinc-500">con exito</span>
                      </h2>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom - Timeline + meta */}
              <div className="relative z-10 p-6 md:p-8 border-t border-[#1a2129] space-y-5">
                {/* Vertical step timeline */}
                {!isSuccess && (
                  <div className="space-y-3">
                    {(['info', 'schedule', 'confirm'] as const).map((s, i) => {
                      const config = STEP_CONFIG[s]
                      const isActive = activeStepIndex === i
                      const isDone = activeStepIndex > i
                      return (
                        <div key={s} className="flex items-center gap-3">
                          <motion.div
                            className={`w-5 h-5 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                              isDone ? 'bg-accent text-[#0b1013]' :
                              isActive ? 'bg-accent text-[#0b1013]' :
                              'bg-[#0b1013] border border-[#253038] text-zinc-500'
                            }`}
                            animate={{ scale: isActive ? 1.1 : 1 }}
                          >
                            {isDone ? (
                              <CheckCircle2 size={11} strokeWidth={2.5} />
                            ) : (
                              <span className="text-[9px] font-mono font-bold">{config.num}</span>
                            )}
                          </motion.div>
                          <div className="flex-1 flex items-center gap-3">
                            <div className={`h-px flex-1 transition-colors duration-300 ${
                              isDone ? 'bg-accent' : 'bg-[#253038]'
                            }`} />
                            <span className={`text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                              isActive ? 'text-accent font-bold' :
                              isDone ? 'text-zinc-400' :
                              'text-zinc-600'
                            }`}>
                              {s === 'info' ? 'Info' : s === 'schedule' ? 'Horario' : 'Confirmar'}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Location meta */}
                <div className="flex items-center gap-2 text-zinc-600 font-mono text-[9px] uppercase tracking-widest pt-4 border-t border-[#1a2129]">
                  <MapPin size={10} />
                  <span>Medellin &middot; Colombia</span>
                  <span className="ml-auto text-accent">v.2026</span>
                </div>
              </div>

              {/* Corner frame bottom */}
              <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-accent/30 pointer-events-none" />
            </div>

            {/* ═══ RIGHT PANEL — Form ═══ */}
            <div className="relative flex-1 flex flex-col overflow-hidden">
              {/* Accent bar */}
              <div className="h-0.5 w-full bg-accent" />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-20 w-10 h-10 border border-[#253038] text-zinc-400 hover:text-white hover:border-accent/50 transition-colors flex items-center justify-center"
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>

              {/* Form content */}
              <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 md:py-12">
                <AnimatePresence mode="wait">
                  {step === 'info' && <Step1Info form={form} onChange={onFieldChange} />}
                  {step === 'schedule' && <Step2Schedule form={form} onChange={onFieldChange} />}
                  {step === 'confirm' && <Step3Confirm form={form} />}
                  {step === 'success' && <StepSuccess form={form} onClose={onClose} />}
                </AnimatePresence>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 flex items-start gap-3 bg-red-500/10 border-l-2 border-red-500 px-4 py-3"
                  >
                    <AlertCircle size={14} className="text-red-400 mt-0.5 shrink-0" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </motion.div>
                )}
              </div>

              {/* Navigation bar */}
              {!isSuccess && (
                <div className="border-t border-[#1a2129] bg-[#0b1013] px-6 md:px-10 py-5 flex items-center justify-between gap-3">
                  {(step === 'schedule' || step === 'confirm') ? (
                    <button
                      onClick={onBack}
                      className="flex items-center gap-2 px-4 py-3 text-zinc-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-[0.2em]"
                    >
                      <ArrowLeft size={14} />
                      <span>Atras</span>
                    </button>
                  ) : (
                    <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                      Paso {activeStepIndex + 1} de 3
                    </span>
                  )}

                  {step !== 'confirm' ? (
                    <motion.button
                      onClick={onNext}
                      disabled={!canGoNext}
                      className="group flex items-center gap-3 bg-accent text-[#0b1013] font-bold px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-accent-dim transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-accent"
                      whileHover={{ x: 4 }}
                    >
                      <span>Continuar</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  ) : (
                    <motion.button
                      onClick={onSubmit}
                      disabled={loading}
                      className="group flex items-center gap-3 bg-accent text-[#0b1013] font-bold px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-accent-dim transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                      whileHover={{ x: 4 }}
                    >
                      {loading ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Enviando</span>
                        </>
                      ) : (
                        <>
                          <span>Confirmar cita</span>
                          <CheckCircle2 size={14} />
                        </>
                      )}
                    </motion.button>
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


