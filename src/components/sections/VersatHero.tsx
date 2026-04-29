import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { VERSAT_CONFIG } from '../../lib/versat.constants'
import { useBooking } from '../../hooks/useBooking'
import BookingModal from '../ui/BookingModal'
import imagen1 from '../../assets/images/imagen1.png'

export default function VersatHero() {
  const booking = useBooking()

  return (
    <>
      <section
        id="inicio"
        className="relative min-h-screen flex items-center overflow-hidden bg-dark"
      >
        {/* ── Fondos decorativos - reducidos ── */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none opacity-50" />

        {/* ── Grid principal ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-28 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── Columna izquierda: texto ── */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black tracking-tight leading-tight mb-5 md:mb-6"
            >
              <span className="text-white">
                Transforma tu
              </span>
              <br />
              <span
                className="text-accent"
                style={{
                  textShadow: '0 0 30px rgba(0, 194, 168, 0.4)',
                }}
              >
                negocio digital
              </span>
              <br />
              <span className="text-white">
                con Versat
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 max-w-md lg:max-w-lg mb-8 md:mb-10 leading-relaxed"
            >
              {VERSAT_CONFIG.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 w-full sm:w-auto"
            >
              {/* CTA principal */}
              <motion.button
                onClick={booking.openModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent text-dark font-bold px-7 py-4 rounded-full hover:bg-accent/90 transition-all duration-200 text-base relative overflow-hidden group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Comenzar ahora</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {/* CTA secundario */}
              <motion.a
                href="#servicios"
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-dark-border text-white font-semibold px-7 py-4 rounded-full hover:border-gray-500 transition-all duration-200 text-base"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Play size={16} className="text-accent" />
                {VERSAT_CONFIG.ctaSecondary}
              </motion.a>
            </motion.div>
          </div>

          {/* ── Columna derecha: imagen ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg lg:max-w-none">
              <div className="absolute -inset-3 lg:-inset-4 bg-accent/10 blur-2xl rounded-2xl lg:rounded-3xl pointer-events-none" />
              <div className="absolute -inset-px rounded-xl lg:rounded-2xl border border-accent/20 pointer-events-none z-20" />
              <img
                src={imagen1}
                alt="Equipo Versat trabajando en soluciones digitales"
                className="relative z-10 w-full rounded-xl lg:rounded-2xl object-cover object-center shadow-xl lg:shadow-2xl shadow-black/40 lg:shadow-black/50"
                style={{ aspectRatio: '16/10' }}
                fetchPriority="high"
              />
            </div>
          </motion.div>

        </div>
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