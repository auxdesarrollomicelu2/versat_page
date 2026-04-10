import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { VERSAT_CONFIG, VERSAT_STATS } from '../../lib/versat.constants'
import { useBooking } from '../../hooks/useBooking'
import BookingModal from '../ui/BookingModal'

export default function VersatHero() {
  const booking = useBooking()

  return (
    <>
      <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6"
          >
            <motion.span 
              className="text-white inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Transforma tu
            </motion.span>
            <br />
            <motion.span 
              className="text-accent inline-block relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                textShadow: '0 0 40px rgba(0, 194, 168, 0.5), 0 0 80px rgba(0, 194, 168, 0.3)'
              }}
            >
              negocio digital
            </motion.span>
            <br />
            <motion.span 
              className="text-white inline-block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              con Versat
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {VERSAT_CONFIG.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.button 
              onClick={booking.openModal}
              className="flex items-center gap-2 bg-accent text-dark font-bold px-8 py-4 rounded-full hover:bg-accent/90 transition-all duration-200 text-base relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Comenzar ahora</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.5 }}
              />
            </motion.button>
            <motion.a 
              href="#servicios" 
              className="flex items-center gap-2 border border-dark-border text-white font-semibold px-8 py-4 rounded-full hover:border-gray-500 transition-all duration-200 text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={16} className="text-accent" />
              {VERSAT_CONFIG.ctaSecondary}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto border-t border-dark-border pt-12"
          >
            {VERSAT_STATS.stats.map((stat, index) => (
              <motion.div 
                key={stat.label} 
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.p 
                  className="text-3xl md:text-4xl font-black text-accent mb-1"
                  style={{
                    textShadow: '0 0 20px rgba(0, 194, 168, 0.4)'
                  }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
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