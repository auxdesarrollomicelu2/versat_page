// src/components/sections/VersatCTA.tsx
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { VERSAT_CONFIG } from '../../lib/versat.constants'
import BookingModal from '../ui/BookingModal'
import { useBooking } from '../../hooks/useBooking'

export default function VersatCTA() {
  const booking = useBooking()

  return (
    <>
      <section id="contacto" className="bg-dark py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-dark-card border border-dark-border rounded-3xl p-12 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
            <div className="relative z-10">
              <span className="text-accent text-sm font-semibold uppercase tracking-widest">
                Hablemos
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-6">
                ¿Listo para transformar tu negocio?
              </h2>
              <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                Cuéntanos tu idea y te ayudamos a convertirla en realidad. Sin compromisos.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                <button
                  onClick={booking.openModal}
                  className="flex items-center gap-2 bg-accent text-dark font-bold px-8 py-4 rounded-full
                             hover:bg-accent/90 transition-all duration-200 text-base active:scale-95"
                >
                  {VERSAT_CONFIG.cta}
                  <ArrowRight size={18} />
                </button>

                <a
                  href={`mailto:${VERSAT_CONFIG.email}`}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {VERSAT_CONFIG.email}
                </a>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal de agendamiento — fuera del section para evitar problemas de z-index */}
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