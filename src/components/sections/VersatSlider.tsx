import { motion } from 'framer-motion'
import { Code, Database, Globe, Layers, Server, Zap } from 'lucide-react'
import { VERSAT_SLIDER } from '../../lib/versat.constants'

// Iconos usando Lucide React
const TechIcons: Record<string, React.ReactNode> = {
  react: <Code className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />,
  typescript: <Code className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />,
  nodedotjs: <Server className="w-6 h-6 md:w-8 md:h-8 text-green-500" />,
  python: <Zap className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />,
  postgresql: <Database className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />,
  mongodb: <Database className="w-6 h-6 md:w-8 md:h-8 text-green-600" />,
  nextdotjs: <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />,
  tailwindcss: <Layers className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />,
}

export default function VersatSlider() {
  return (
    <section className="bg-dark py-16 md:py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-card/20 to-dark pointer-events-none" />
      
      <div className="max-w-7xl mx-auto mb-12 px-6 relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center text-white text-xl md:text-2xl font-bold mb-2"
        >
          {VERSAT_SLIDER.title}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
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
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {[...VERSAT_SLIDER.items, ...VERSAT_SLIDER.items].map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="relative flex items-center justify-center gap-2 min-w-[140px] md:min-w-[160px] h-12 md:h-14 px-4 md:px-6 bg-dark-card rounded-full shadow-lg group overflow-hidden"
              >
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-accent/40 via-accent/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-full h-full bg-dark-card rounded-full" />
                </div>
                
                <div className="relative z-10 flex items-center gap-2">
                  {TechIcons[item.icon]}
                  <span className="text-gray-300 group-hover:text-white font-semibold text-sm md:text-base whitespace-nowrap transition-colors duration-200">
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