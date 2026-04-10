import { motion } from 'framer-motion'
import { Monitor, Settings, Zap, BarChart, Database, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { VERSAT_FEATURES } from '../../lib/versat.constants'
import { useState } from 'react'

const ICONS: Record<string, React.ElementType> = {
  Monitor, Settings, Zap, BarChart, Database, ShoppingBag,
}

export default function VersatFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="servicios" className="bg-dark py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest inline-block"
          >
            Nuestros servicios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl md:text-5xl font-black text-white mt-3 mb-4"
            style={{
              textShadow: '0 0 40px rgba(255, 255, 255, 0.1)'
            }}
          >
            Todo lo que tu empresa necesita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            Soluciones completas para llevar tu negocio al siguiente nivel.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERSAT_FEATURES.map((feature, index) => {
            const Icon = ICONS[feature.icon]
            const isHovered = hoveredIndex === index
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden group cursor-pointer h-[320px] transition-all duration-500"
              >
                {/* Imagen de fondo con overlay */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/90 to-dark/70 z-10" />
                  <div className="w-full h-full bg-accent/10 flex items-center justify-center">
                    <Icon size={120} className="text-accent/20" />
                  </div>
                </div>

                {/* Contenido */}
                <div className="relative z-20 p-6 h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      isHovered ? 'bg-accent/20 scale-110' : 'bg-accent/10'
                    }`}>
                      <Icon size={22} className="text-accent" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>

                  <div className={`flex items-center gap-2 text-accent font-semibold text-sm transition-all duration-300 ${
                    isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    Ver más
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Borde animado en hover */}
                <div className={`absolute inset-0 border-2 border-accent rounded-2xl transition-opacity duration-300 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
