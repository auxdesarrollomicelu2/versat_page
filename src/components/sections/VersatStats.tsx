import { motion } from 'framer-motion'
import { VERSAT_STATS } from '../../lib/versat.constants'

export default function VersatStats() {
  return (
    <section className="bg-dark py-20 md:py-28 px-6 border-t border-b border-dark-border/40">
      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 leading-tight"
          >
            {VERSAT_STATS.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {VERSAT_STATS.description}
          </motion.p>
        </div>

        {/* Cards de métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-16">
          {VERSAT_STATS.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="relative flex flex-col items-center justify-center p-8 md:p-12 rounded-3xl md:rounded-[2rem] border border-accent/20 bg-dark-card hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 text-center group"
            >
              {/* Glow suave en hover */}
              <div className="absolute inset-0 rounded-3xl md:rounded-[2rem] bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <span
                className="text-5xl md:text-6xl lg:text-7xl font-black text-accent mb-3 md:mb-4 relative z-10"
                style={{ textShadow: '0 0 20px rgba(0, 194, 168, 0.3)' }}
              >
                {stat.value}
              </span>
              <span className="text-gray-400 text-base md:text-lg font-medium relative z-10">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="#contacto"
            className="inline-block bg-accent text-dark font-bold px-8 py-4 rounded-full hover:bg-accent/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-accent/20 text-base md:text-lg"
          >
            {VERSAT_STATS.cta}
          </a>
        </motion.div>

      </div>
    </section>
  )
}