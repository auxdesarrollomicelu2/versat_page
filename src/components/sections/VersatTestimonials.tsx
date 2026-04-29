import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { VERSAT_TESTIMONIALS } from '../../lib/versat.constants'
import { useState } from 'react'

// Colores de acento para los avatares de cada cliente
const AVATAR_COLORS = [
  { bg: 'bg-teal-900/50',   border: 'border-teal-500/40',   text: 'text-teal-400'   },
  { bg: 'bg-blue-900/50',   border: 'border-blue-500/40',   text: 'text-blue-400'   },
  { bg: 'bg-purple-900/50', border: 'border-purple-500/40', text: 'text-purple-400' },
]

export default function VersatTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-dark-card py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Encabezado */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest"
          >
            Testimonios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-black text-white mt-3 mb-4"
          >
            {VERSAT_TESTIMONIALS.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            {VERSAT_TESTIMONIALS.subtitle}
          </motion.p>
        </div>

        {/* Cards de testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {VERSAT_TESTIMONIALS.testimonials.map((testimonial, index) => {
            const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
            const isActive = activeIndex === index

            return (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setActiveIndex(index)}
                className={`relative bg-dark border rounded-2xl p-8 transition-all duration-300 cursor-pointer group overflow-hidden ${
                  isActive
                    ? 'border-accent shadow-lg shadow-accent/20 scale-105'
                    : 'border-dark-border hover:border-accent/30'
                }`}
              >
                {/* Ícono de comilla decorativa */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={48} className="text-accent" />
                </div>

                <div className="relative z-10">
                  {/* Estrellas */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Contenido */}
                  <p className="text-gray-300 text-base leading-relaxed mb-6 min-h-[120px]">
                    "{testimonial.content}"
                  </p>

                  {/* Avatar + nombre */}
                  <div className="flex items-center gap-4 pt-4 border-t border-dark-border">
                    {/*
                      👉 ACCIÓN REQUERIDA (opcional pero recomendado):
                      Si tienes foto real del cliente, reemplaza este div por:
                        <img
                          src={clientPhoto}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
                        />
                      Las fotos reales aumentan mucho la confianza del visitante.
                    */}
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${color.bg} ${color.border}`}
                    >
                      <span className={`font-black text-lg ${color.text}`}>
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                      <p className="text-gray-400 text-xs">{testimonial.role}</p>
                      <p className={`text-xs font-semibold ${color.text}`}>{testimonial.company}</p>
                    </div>
                  </div>
                </div>

                {/* Glow interior en hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            )
          })}
        </div>

        {/* Indicadores de paginación */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="flex justify-center gap-2"
        >
          {VERSAT_TESTIMONIALS.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'bg-accent w-8'
                  : 'bg-gray-600 w-2 hover:bg-gray-500'
              }`}
              aria-label={`Ver testimonio ${index + 1}`}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}