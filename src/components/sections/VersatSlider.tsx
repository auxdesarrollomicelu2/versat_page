import { motion } from 'framer-motion'
import { VERSAT_SLIDER } from '../../lib/versat.constants'

// Iconos SVG de tecnologías (desde simpleicons.org)
const TechIcons: Record<string, string> = {
  react: 'https://cdn.simpleicons.org/react/61DAFB',
  typescript: 'https://cdn.simpleicons.org/typescript/3178C6',
  nodedotjs: 'https://cdn.simpleicons.org/nodedotjs/339933',
  python: 'https://cdn.simpleicons.org/python/3776AB',
  amazonaws: 'https://cdn.simpleicons.org/amazonaws/FF9900',
  docker: 'https://cdn.simpleicons.org/docker/2496ED',
  postgresql: 'https://cdn.simpleicons.org/postgresql/4169E1',
  mongodb: 'https://cdn.simpleicons.org/mongodb/47A248',
  nextdotjs: 'https://cdn.simpleicons.org/nextdotjs/000000',
  tailwindcss: 'https://cdn.simpleicons.org/tailwindcss/06B6D4',
}

export default function VersatSlider() {
  return (
    <section className="bg-dark py-16 md:py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/30 to-dark pointer-events-none" />
      
      <div className="max-w-7xl mx-auto mb-12 px-6 relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-white text-xl md:text-2xl font-bold mb-2"
        >
          {VERSAT_SLIDER.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-gray-400 text-sm md:text-base"
        >
          {VERSAT_SLIDER.subtitle}
        </motion.p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-dark via-dark/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-dark via-dark/90 to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-4 md:gap-6">
          <motion.div
            className="flex gap-4 md:gap-6 flex-shrink-0"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...VERSAT_SLIDER.items, ...VERSAT_SLIDER.items].map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="relative flex items-center justify-center gap-3 min-w-[180px] md:min-w-[220px] h-16 md:h-20 px-6 md:px-10 bg-dark-card backdrop-blur-sm rounded-full shadow-lg group overflow-hidden"
              >
                {/* Borde con gradiente */}
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-accent/60 via-accent/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full bg-dark-card rounded-full" />
                </div>
                
                {/* Contenido */}
                <div className="relative z-10 flex items-center gap-3">
                  <img 
                    src={TechIcons[item.icon]} 
                    alt={item.name}
                    className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-gray-300 group-hover:text-white font-semibold text-base md:text-lg whitespace-nowrap transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex gap-4 md:gap-6 flex-shrink-0"
            animate={{
              x: [0, -1200],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 25,
                ease: "linear",
              },
            }}
          >
            {[...VERSAT_SLIDER.items, ...VERSAT_SLIDER.items].map((item, index) => (
              <div
                key={`${item.name}-duplicate-${index}`}
                className="relative flex items-center justify-center gap-3 min-w-[180px] md:min-w-[220px] h-16 md:h-20 px-6 md:px-10 bg-dark-card backdrop-blur-sm rounded-full shadow-lg group overflow-hidden"
              >
                {/* Borde con gradiente */}
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-accent/60 via-accent/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-full bg-dark-card rounded-full" />
                </div>
                
                {/* Contenido */}
                <div className="relative z-10 flex items-center gap-3">
                  <img 
                    src={TechIcons[item.icon]} 
                    alt={item.name}
                    className="w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span className="text-gray-300 group-hover:text-white font-semibold text-base md:text-lg whitespace-nowrap transition-colors duration-300">
                    {item.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
