import { motion } from 'framer-motion'

interface AnimatedTitleProps {
  children: React.ReactNode
  className?: string
  delay?: number
  glowColor?: string
}

export default function AnimatedTitle({ 
  children, 
  className = '', 
  delay = 0,
  glowColor = 'rgba(0, 194, 168, 0.5)'
}: AnimatedTitleProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
      style={{
        textShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}`
      }}
    >
      {children}
    </motion.h2>
  )
}
