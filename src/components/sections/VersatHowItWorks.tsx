import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, FileText, Rocket, Headphones, Check } from 'lucide-react'
import { VERSAT_STEPS } from '../../lib/versat.constants'
import { useCallback, useState } from 'react'
import { useVisibleInterval } from '../../hooks/useVisibleInterval'

const STEP_ICONS = [MessageSquare, FileText, Rocket, Headphones]
const STEP_COLORS = ['#00C2A8', '#60a5fa', '#a78bfa', '#f472b6']

export default function VersatHowItWorks() {
  return (
    <section id="como-funciona" className="relative bg-surface py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'repeating-linear-gradient(135deg, #00C2A8, #00C2A8 1px, transparent 1px, transparent 60px)',
      }} />
      <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-accent/[0.03] rounded-full blur-[80px] will-change-transform" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-[80px] will-change-transform" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <span className="text-accent font-mono text-[11px] uppercase tracking-[0.3em] mb-4 block">
            /proceso
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white">
            Cómo
            <br />
            trabajamos
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12 md:space-y-16">
          {VERSAT_STEPS.map((step, index) => {
            const Icon = STEP_ICONS[index]
            const color = STEP_COLORS[index]
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={`relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
                  isEven ? '' : 'md:text-right'
                }`}
              >
                {/* Giant background number */}
                <div
                  className={`absolute top-1/2 -translate-y-1/2 pointer-events-none select-none ${
                    isEven ? '-left-[5%]' : '-right-[5%]'
                  }`}
                >
                  <span
                    className="text-[14rem] md:text-[22rem] font-black leading-none"
                    style={{ color: `${color}10` }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Connection bridge between visual and content - desktop only */}
                <div
                  className={`hidden md:flex absolute top-1/2 -translate-y-1/2 z-20 items-center gap-3 ${
                    isEven ? 'left-[40%]' : 'right-[40%] flex-row-reverse'
                  }`}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                  <motion.div
                    className="h-px relative overflow-hidden"
                    style={{ background: `linear-gradient(${isEven ? 'to right' : 'to left'}, ${color}40, transparent)` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Traveling pulse along the line */}
                    <motion.div
                      className="absolute top-0 h-full w-4"
                      style={{ background: `linear-gradient(${isEven ? 'to right' : 'to left'}, transparent, ${color}, transparent)` }}
                      animate={{ x: isEven ? [-16, 96] : [96, -16] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: index * 0.5 }}
                    />
                  </motion.div>
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.3em] whitespace-nowrap"
                    style={{ color: `${color}80` }}
                  >
                    {index === 0 && 'discovery'}
                    {index === 1 && 'planning'}
                    {index === 2 && 'building'}
                    {index === 3 && 'launching'}
                  </span>
                </div>

                {/* Content */}
                <div className={`relative z-10 ${
                  isEven ? 'md:col-span-7' : 'md:col-span-7 md:col-start-6'
                }`}>
                  <div className={`flex items-center gap-4 mb-8 ${isEven ? '' : 'md:justify-end'}`}>
                    <motion.div
                      className="w-14 h-14 border-2 flex items-center justify-center"
                      style={{ borderColor: color }}
                      whileInView={{ rotate: [0, 5, 0] }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} strokeWidth={1.5} />
                    </motion.div>
                    <div className="h-px flex-1 max-w-[100px]" style={{ background: `linear-gradient(to right, ${color}60, transparent)` }} />
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color }}>
                      Paso {step.step}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-[0.85] mb-6">
                    {step.title}
                  </h3>

                  <p className={`text-zinc-200 text-lg md:text-xl leading-relaxed max-w-lg ${
                    isEven ? '' : 'md:ml-auto'
                  }`}>
                    {step.description}
                  </p>

                  <motion.div
                    className={`mt-8 h-[2px] origin-left ${isEven ? '' : 'md:origin-right md:ml-auto'}`}
                    style={{ background: `linear-gradient(to right, ${color}, transparent)` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                {/* Visual side - meaningful per step */}
                <div className={`flex items-center justify-center mt-8 md:mt-0 ${
                  isEven ? 'md:col-span-5' : 'md:col-span-5 md:col-start-1 md:row-start-1'
                }`}>
                  {index === 0 && <DiagnosticVisual color={color} />}
                  {index === 1 && <ProposalVisual color={color} />}
                  {index === 2 && <SprintVisual color={color} />}
                  {index === 3 && <DeployVisual color={color} />}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/**
 * Step 01 — DIAGNÓSTICO: Live discovery scanner.
 * Continuously cycles through operational areas, marking them as
 * "scanned" with a check, then resetting. Mimics a discovery in progress.
 */
function DiagnosticVisual({ color }: { color: string }) {
  const items = [
    { label: 'Canales de venta',  detail: '4 puntos detectados' },
    { label: 'Tiendas fisicas',   detail: '12 ubicaciones' },
    { label: 'Inventarios',       detail: '8.4k SKUs activos' },
    { label: 'Equipo & roles',    detail: '47 usuarios' },
    { label: 'Dolores actuales',  detail: '23 hallazgos' },
  ]
  const [progress, setProgress] = useState(0)

  const tick = useCallback(() => {
    setProgress((p) => (p + 1) % (items.length + 2))
  }, [items.length])

  const containerRef = useVisibleInterval(tick, 1100)

  return (
    <div ref={containerRef} className="w-full max-w-sm bg-[#0d1318]/80 backdrop-blur-sm border border-[#253038] p-5 relative overflow-hidden">
      {/* Scanning beam */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${color}, transparent)` }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1a2129]">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color }}>
            // mapeando operación
          </span>
        </div>
        <span className="text-zinc-500 font-mono text-[9px]">
          {Math.min(progress, items.length)}/{items.length}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {items.map((item, i) => {
          const isScanning = progress === i
          const isDone = progress > i

          return (
            <motion.div
              key={i}
              className="flex items-center gap-3 relative"
              animate={{
                opacity: isScanning || isDone ? 1 : 0.35,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Checkbox */}
              <div
                className="w-4 h-4 border flex items-center justify-center flex-shrink-0 relative"
                style={{
                  borderColor: isDone ? color : isScanning ? color : '#253038',
                  background: isDone ? color : 'transparent',
                }}
              >
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    >
                      <Check className="w-2.5 h-2.5 text-surface" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
                {isScanning && (
                  <motion.span
                    className="absolute inset-0 border"
                    style={{ borderColor: color }}
                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Label + detail */}
              <div className="flex-1 flex items-baseline justify-between gap-2 min-w-0">
                <span className={`text-sm font-medium truncate transition-colors ${
                  isDone ? 'text-zinc-200' : isScanning ? 'text-white' : 'text-zinc-500'
                }`}>
                  {item.label}
                </span>
                <AnimatePresence>
                  {(isDone || isScanning) && (
                    <motion.span
                      key={isScanning ? 'scan' : 'done'}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[9px] flex-shrink-0"
                      style={{ color: isScanning ? color : '#71717a' }}
                    >
                      {isScanning ? 'analizando...' : item.detail}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer status */}
      <div className="mt-4 pt-3 border-t border-[#1a2129] flex items-center justify-between">
        <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest">
          progreso
        </span>
        <div className="flex items-center gap-1 flex-1 mx-3 h-px bg-[#1a2129] relative">
          <motion.div
            className="absolute left-0 h-px"
            style={{ background: color, top: 0 }}
            animate={{ width: `${(Math.min(progress, items.length) / items.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="font-mono text-[9px] font-bold" style={{ color }}>
          {Math.round((Math.min(progress, items.length) / items.length) * 100)}%
        </span>
      </div>
    </div>
  )
}

/**
 * Step 02 — PROPUESTA: Document with line items being filled in continuously.
 * Each line gets typed in, then the price reveals, then the approval stamp,
 * then the cycle resets.
 */
function ProposalVisual({ color }: { color: string }) {
  const rows = [
    { label: 'Alcance',  value: '6 modulos' },
    { label: 'Timeline', value: '8 semanas' },
    { label: 'Entregas', value: 'Cada 2 semanas' },
    { label: 'Equipo',   value: '4 personas' },
  ]
  const [phase, setPhase] = useState(0)
  const totalPhases = rows.length + 3

  const tick = useCallback(() => {
    setPhase((p) => (p + 1) % totalPhases)
  }, [totalPhases])

  const containerRef = useVisibleInterval(tick, 900)

  const showRow = (i: number) => phase > i
  const showPrice = phase >= rows.length + 1
  const showStamp = phase >= rows.length + 2

  return (
    <div ref={containerRef} className="w-full max-w-sm bg-[#0d1318]/80 backdrop-blur-sm border border-[#253038] p-5 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 6px ${color}` }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color }}>
            propuesta_v3.pdf
          </span>
        </div>
        <span className="text-zinc-500 font-mono text-[9px]">borrador</span>
      </div>

      {/* Document */}
      <div className="bg-[#0a0f12] border border-[#1a2129] p-4 space-y-2 relative overflow-hidden">
        {/* Title bar (always visible) */}
        <div className="flex items-center justify-between pb-2 border-b border-[#1a2129]">
          <motion.div
            className="h-1.5 rounded-sm"
            style={{ background: color }}
            animate={{ width: phase === 0 ? '20%' : '60%' }}
            transition={{ duration: 0.5 }}
          />
          <span className="text-zinc-600 font-mono text-[8px]">v3.2</span>
        </div>

        {/* Rows fill in one by one, repeating */}
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between text-xs py-1 min-h-[20px] relative"
          >
            <span className="text-zinc-500 font-mono text-[10px]">{row.label}</span>
            <AnimatePresence mode="wait">
              {showRow(i) ? (
                <motion.span
                  key="filled"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-zinc-200 font-mono text-[11px]"
                >
                  {row.value}
                </motion.span>
              ) : (
                <motion.span
                  key="empty"
                  className="block w-16 h-px bg-[#253038]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Price line */}
        <div className="mt-2 pt-3 border-t border-[#1a2129] flex items-center justify-between min-h-[24px]">
          <span className="text-zinc-400 text-xs font-medium">Inversion</span>
          <AnimatePresence>
            {showPrice && (
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="font-mono font-bold text-base"
                style={{ color }}
              >
                confirmado
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Approval stamp */}
      <div className="mt-3 h-7 flex items-start">
        <AnimatePresence>
          {showStamp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4, rotate: -25 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              exit={{ opacity: 0, scale: 0.4, rotate: -25 }}
              transition={{ type: 'spring', stiffness: 220, damping: 14 }}
              className="inline-flex items-center gap-2 px-3 py-1 border-2"
              style={{ borderColor: color, color }}
            >
              <Check className="w-3 h-3" strokeWidth={3} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                aprobada
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/**
 * Step 03 — SPRINTS: Kanban board with cards animating between columns.
 */
function SprintVisual({ color }: { color: string }) {
  const [phase, setPhase] = useState(0)

  const tick = useCallback(() => {
    setPhase((p) => (p + 1) % 3)
  }, [])

  const containerRef = useVisibleInterval(tick, 2000)

  // Cards distribution per phase
  const phases = [
    { todo: ['CRM', 'Pagos', 'BI'], doing: ['Auth'], done: [] as string[] },
    { todo: ['CRM', 'BI'], doing: ['Pagos'], done: ['Auth'] },
    { todo: ['BI'], doing: ['CRM'], done: ['Auth', 'Pagos'] },
  ]
  const current = phases[phase]

  const columns: { key: 'todo' | 'doing' | 'done'; label: string; tint: string }[] = [
    { key: 'todo', label: 'Por hacer', tint: '#52525b' },
    { key: 'doing', label: 'En curso', tint: color },
    { key: 'done', label: 'Hecho', tint: '#34d399' },
  ]

  return (
    <div ref={containerRef} className="w-full max-w-sm bg-[#0d1318]/80 backdrop-blur-sm border border-[#253038] p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1a2129]">
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color }}>
          sprint_07 / dia 09
        </span>
        <div className="flex items-center gap-1">
          <motion.span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: color }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-zinc-500 font-mono text-[9px]">live</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {columns.map((col) => (
          <div key={col.key}>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-1 h-1 rounded-full" style={{ background: col.tint }} />
              <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500">
                {col.label}
              </span>
            </div>
            <div className="space-y-1.5 min-h-[100px]">
              <AnimatePresence mode="popLayout">
                {current[col.key].map((card) => (
                  <motion.div
                    key={card}
                    layout
                    layoutId={card}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                    className="bg-[#0a0f12] border border-[#1a2129] px-2 py-1.5"
                  >
                    <div className="text-zinc-200 text-[10px] font-medium">{card}</div>
                    <motion.div
                      className="h-0.5 mt-1.5"
                      style={{ background: col.tint, opacity: 0.4 }}
                      initial={{ width: 0 }}
                      animate={{ width: col.key === 'done' ? '100%' : col.key === 'doing' ? '60%' : '20%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-[#1a2129] flex items-center justify-between">
        <span className="text-zinc-500 font-mono text-[9px]">progreso</span>
        <span className="font-mono text-[10px] font-bold" style={{ color }}>
          {Math.round(((current.done.length) / 4) * 100)}%
        </span>
      </div>
    </div>
  )
}

/**
 * Step 04 — DEPLOY & SOPORTE: Live production monitor with metrics.
 */
function DeployVisual({ color }: { color: string }) {
  const [tick, setTick] = useState(0)

  const tickFn = useCallback(() => setTick((t) => t + 1), [])
  const containerRef = useVisibleInterval(tickFn, 1500)

  // Sliding values
  const latency = 38 + (tick % 4) * 3
  const requests = 1247 + tick * 17

  return (
    <div ref={containerRef} className="w-full max-w-sm bg-[#0d1318]/80 backdrop-blur-sm border border-[#253038] p-5">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#1a2129]">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ boxShadow: '0 0 6px #34d399' }}
          />
          <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-400">
            en producción
          </span>
        </div>
        <span className="text-zinc-500 font-mono text-[9px]">v2.4.1</span>
      </div>

      {/* Metrics row */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="bg-[#0a0f12] border border-[#1a2129] p-2.5">
          <div className="text-zinc-500 font-mono text-[8px] uppercase tracking-widest mb-1">Uptime</div>
          <div className="text-white font-mono font-bold text-base">99.9%</div>
        </div>
        <div className="bg-[#0a0f12] border border-[#1a2129] p-2.5">
          <div className="text-zinc-500 font-mono text-[8px] uppercase tracking-widest mb-1">Latencia</div>
          <motion.div
            key={latency}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="text-white font-mono font-bold text-base"
          >
            {latency}ms
          </motion.div>
        </div>
      </div>

      {/* Live request graph */}
      <div className="bg-[#0a0f12] border border-[#1a2129] p-3 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest">Requests / min</span>
          <motion.span
            key={requests}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[10px] font-bold"
            style={{ color }}
          >
            {requests.toLocaleString()}
          </motion.span>
        </div>
        <div className="flex items-end gap-[2px] h-10">
          {Array.from({ length: 24 }).map((_, i) => {
            const h = 30 + Math.abs(Math.sin((tick + i) * 0.5)) * 65
            return (
              <motion.div
                key={i}
                className="flex-1 rounded-t-[1px]"
                style={{ background: color, opacity: 0.7 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            )
          })}
        </div>
      </div>

      {/* Support status */}
      <div className="flex items-center gap-2 text-[10px] font-mono">
        <Headphones className="w-3 h-3" style={{ color }} />
        <span className="text-zinc-300">soporte activo &middot; 24/7</span>
      </div>
    </div>
  )
}
