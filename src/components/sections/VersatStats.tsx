import { motion } from 'framer-motion'
import { VERSAT_STATS } from '../../lib/versat.constants'

export default function VersatStats() {
  return (
    <section className="bg-accent py-20 md:py-28 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black text-dark mb-4 md:mb-6 leading-tight"
          >
            {VERSAT_STATS.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-dark/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
          >
            {VERSAT_STATS.description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-12 mb-12 md:mb-16 max-w-5xl mx-auto">
          {VERSAT_STATS.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              className="flex justify-center"
            >
              <div className="w-52 h-52 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full bg-dark border-4 border-dark/10 flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
                  {stat.value}
                </span>
                <span className="text-gray-400 text-sm md:text-base font-medium px-4 text-center">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <a
            href="#contacto"
            className="inline-block bg-dark text-white font-bold px-8 py-4 rounded-full hover:bg-dark/90 hover:scale-105 transition-all duration-300 shadow-lg text-base md:text-lg"
          >
            {VERSAT_STATS.cta}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
