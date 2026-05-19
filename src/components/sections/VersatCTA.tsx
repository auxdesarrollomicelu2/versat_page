import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import { WhatsappLogo } from '@phosphor-icons/react'
import { VERSAT_CONFIG } from '../../lib/versat.constants'
import { useBooking } from '../../hooks/useBooking'
import BookingModal from '../ui/BookingModal'
import { useRef } from 'react'

export default function VersatCTA() {
  const booking = useBooking()
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"]
  })

  const lineWidth = useTransform(scrollYProgress, [0, 0.6], ['0%', '100%'])

  return (
    <>
      <section ref={sectionRef} id="contacto" className="relative py-12 md:py-20 overflow-hidden bg-surface">
        {/* Subtle teal glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/[0.04] rounded-full blur-[80px] pointer-events-none will-change-transform" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'linear-gradient(to right, #00C2A8 1px, transparent 1px), linear-gradient(to bottom, #00C2A8 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
          {/* Animated top line */}
          <motion.div
            className="h-px bg-gradient-to-r from-accent via-accent/50 to-transparent mb-20 md:mb-28"
            style={{ width: lineWidth }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-accent font-mono text-[11px] uppercase tracking-[0.3em] mb-6 block">
                /contacto
              </span>
              <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white mb-8">
                Hablemos de
                <br />
                <span className="text-accent">tu proyecto.</span>
              </h2>
              <p className="text-xl text-zinc-200 leading-relaxed max-w-lg mb-10">
                Una conversación de 30 minutos para entender tu operación y ver cómo podemos ayudarte. Sin compromiso, respuesta en menos de 24 horas.
              </p>
              <div className="text-zinc-400 font-mono text-sm">
                {VERSAT_CONFIG.email}
              </div>
            </motion.div>

            {/* Right - CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5"
            >
              {/* Primary - opens booking modal */}
              <motion.button
                onClick={booking.openModal}
                className="group w-full bg-accent text-surface font-black text-xl md:text-2xl py-8 md:py-10 px-8 md:px-12 text-left relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="relative z-10 flex items-center justify-between gap-4">
                  <span className="flex items-center gap-3 md:gap-4">
                    <CalendarCheck className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" strokeWidth={2.2} />
                    <span>{VERSAT_CONFIG.cta}</span>
                  </span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-accent-deep"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.button>

              {/* Secondary - WhatsApp */}
              <motion.a
                href="https://wa.me/573135012082?text=Hola%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20Versat"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full border border-surface-border text-white font-bold text-xl md:text-2xl py-8 md:py-10 px-8 md:px-12 text-left flex items-center justify-between gap-4 hover:border-accent/50 transition-colors duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="flex items-center gap-3 md:gap-4">
                  <WhatsappLogo size={28} weight="fill" className="text-accent flex-shrink-0" />
                  <span>Contáctanos</span>
                </span>
                <ArrowRight className="w-6 h-6 text-accent group-hover:translate-x-3 transition-transform duration-300" />
              </motion.a>

              <p className="text-zinc-400 text-xs font-mono pt-4">
                Sin compromisos. Respuesta en menos de 24 horas.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Corner frames */}
        <div className="absolute top-8 left-8 w-12 h-12 border-t border-l border-accent/20 pointer-events-none" />
        <div className="absolute bottom-8 right-8 w-12 h-12 border-b border-r border-accent/20 pointer-events-none" />
      </section>

      <BookingModal
        isOpen={booking.isOpen}
        onClose={booking.closeModal}
        step={booking.step}
        form={booking.form}
        onFieldChange={booking.updateField}
        onNext={booking.goNext}
        onBack={booking.goBack}
        onSubmit={booking.submit}
        isStep1Valid={booking.isStep1Valid}
        isStep2Valid={booking.isStep2Valid}
        loading={booking.loading}
        error={booking.error}
      />
    </>
  )
}
