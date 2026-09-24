import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface NavigationButtonProps {
  to: string
  label: string
  variant?: 'primary' | 'secondary'
  className?: string
}

/**
 * Shared navigation button component with magnetic effect
 * Uses Versat brand colors and design system
 */
export default function NavigationButton({ 
  to, 
  label, 
  variant = 'primary',
  className = '' 
}: NavigationButtonProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const x = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const y = useSpring(mouseY, { stiffness: 150, damping: 15 })
  const textX = useTransform(x, (v) => v * 0.5)
  const textY = useTransform(y, (v) => v * 0.5)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    mouseX.set((e.clientX - centerX) * 0.3)
    mouseY.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const baseClasses = "relative px-6 py-2.5 font-bold text-xs uppercase tracking-wider overflow-hidden group inline-flex items-center"
  const variantClasses = variant === 'primary' 
    ? "bg-accent text-surface hover:bg-accent-deep" 
    : "bg-surface-raised text-accent border border-accent/30 hover:bg-accent/10"

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className="inline-block"
    >
      <Link
        to={to}
        className={`${baseClasses} ${variantClasses} ${className}`}
      >
        <motion.span 
          style={{ x: textX, y: textY }} 
          className="relative z-10 flex items-center gap-2"
        >
          {label}
          <span className="font-mono">&rarr;</span>
        </motion.span>
        <motion.div
          className={variant === 'primary' ? "absolute inset-0 bg-accent-deep" : "absolute inset-0 bg-accent/20"}
          initial={{ y: '100%' }}
          whileHover={{ y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </Link>
    </motion.div>
  )
}
