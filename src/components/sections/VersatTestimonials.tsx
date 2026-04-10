import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { VERSAT_TESTIMONIALS } from '../../lib/versat.constants'
import { useState } from 'react'

export default function VersatTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="bg-dark-card py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-sm font-semibold uppercase tracking-widest"
          >
            Testimonios
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white mt-3 mb-4"
          >
            {VERSAT_TESTIMONIALS.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            {VERSAT_TESTIMONIALS.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {VERSAT_TESTIMONIALS.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              onMouseEnter={() => setActiveIndex(index)}
              className={`relative bg-dark border rounded-2xl p-8 transition-all duration-500 cursor-pointer group ${
                activeIndex === index 
                  ? 'border-accent shadow-lg shadow-accent/20 scale-105' 
                  : 'border-dark-border hover:border-accent/30'
              }`}
            >
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote size={48} className="text-accent" />
              </div>

              <div className="relative z-10">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-gray-300 text-base leading-relaxed mb-6 min-h-[120px]">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-dark-border">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-accent font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{testimonial.name}</h4>
                    <p className="text-gray-400 text-xs">{testimonial.role}</p>
                    <p className="text-accent text-xs font-semibold">{testimonial.company}</p>
                  </div>
                </div>
              </div>

              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2"
        >
          {VERSAT_TESTIMONIALS.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-accent w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Ver testimonio ${index + 1}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
