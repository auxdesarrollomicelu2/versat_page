import { motion } from 'framer-motion'
import { Monitor, Settings, Zap, BarChart, Database, ShoppingBag, ArrowUpRight } from 'lucide-react'
import { VERSAT_FEATURES } from '../../lib/versat.constants'
import { useState } from 'react'

// Importar las imágenes disponibles
import imgAutomatizacion from '../../assets/images/automatizacion.png'
import imgConsultoria from '../../assets/images/consultoria.png'
import imgAnalisisDatos from '../../assets/images/analisis.png'
import imgDesarrolloWeb from '../../assets/images/web.png'
import imgSistemasMedida from '../../assets/images/medida.png'
import imgRetail from '../../assets/images/retail.png'

const ICONS: Record<string, React.ElementType> = {
  Monitor, Settings, Zap, BarChart, Database, ShoppingBag,
}

const FEATURE_IMAGES: Record<string, string> = {
  'desarrollo-web.jpg': imgDesarrolloWeb,
  'sistemas-medida.jpg': imgSistemasMedida,
  'automatizacion.jpg': imgAutomatizacion,
  'consultoria.jpg': imgConsultoria,
  'analisis-datos.jpg': imgAnalisisDatos,
  'retail.jpg': imgRetail,
}

export default function VersatFeatures() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="servicios" className="bg-dark py-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Encabezado */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-accent text-sm font-semibold uppercase tracking-widest inline-block"
          >
            Nuestros servicios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-5xl font-black text-white mt-3 mb-4"
          >
            Todo lo que tu empresa necesita
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-gray-400 max-w-xl mx-auto text-lg"
          >
            Soluciones completas para llevar tu negocio al siguiente nivel.
          </motion.p>
        </div>

        {/* Grid de cards - 2 por fila */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
          {VERSAT_FEATURES.map((feature, index) => {
            const Icon = ICONS[feature.icon]
            const isHovered = hoveredIndex === index
            const bgImage = FEATURE_IMAGES[feature.image]

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative bg-dark-card border border-dark-border rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group hover:shadow-xl hover:shadow-accent/10 aspect-[16/10] md:aspect-[16/9]"
              >
                {/* Imagen de fondo - visible en móvil con opacidad baja, full en hover desktop */}
                {bgImage && (
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isHovered ? 'opacity-100' : 'opacity-30 md:opacity-0'
                    }`}
                  >
                    <img 
                      src={bgImage} 
                      alt={feature.title}
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60" />
                  </div>
                )}

                {/* Gradiente de fondo para cards sin imagen */}
                {!bgImage && (
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-accent/5 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card/95 via-dark-card/60 to-transparent" />
                  </div>
                )}

                {/* Borde teal en hover */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 border-accent transition-opacity duration-200 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Contenido */}
                <div className="relative z-20 p-6 md:p-8 h-full flex flex-col justify-between">

                  <div className="flex flex-col gap-3 md:gap-4">
                    {/* Ícono */}
                    <div
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all duration-200 ${
                        isHovered ? 'bg-accent/40 scale-105' : 'bg-accent/20'
                      }`}
                    >
                      <Icon size={20} className="text-accent drop-shadow-lg md:w-6 md:h-6" />
                    </div>

                    {/* Texto */}
                    <div>
                      <h3 className="text-white font-black text-xl md:text-2xl lg:text-3xl mb-2 md:mb-3 leading-tight drop-shadow-lg uppercase tracking-tight">
                        {feature.title}
                      </h3>
                      <p className={`text-sm md:text-base lg:text-lg leading-relaxed transition-colors duration-300 ${
                        isHovered ? 'text-gray-200' : 'text-gray-400'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  {/* CTA — aparece en hover */}
                  <div
                    className={`flex items-center gap-2 text-accent font-semibold text-sm transition-all duration-300 drop-shadow-lg ${
                      isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'
                    }`}
                  >
                    Ver más
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}