import { VERSAT_SLIDER } from '../../lib/versat.constants'

// Row 1: normal order, Row 2: offset by half so they don't align
const ROW_1_ITEMS = [...VERSAT_SLIDER.items, ...VERSAT_SLIDER.items]
const ROW_2_ITEMS = [
  ...VERSAT_SLIDER.items.slice(4),
  ...VERSAT_SLIDER.items.slice(0, 4),
  ...VERSAT_SLIDER.items.slice(4),
  ...VERSAT_SLIDER.items.slice(0, 4),
]

export default function VersatSlider() {
  return (
    <section className="relative py-8 md:py-10 overflow-hidden bg-surface-tinted border-y border-surface-border">
      {/* Row 1 - moves left */}
      <div className="relative overflow-hidden mb-2 md:mb-3">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface-tinted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface-tinted to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee">
          {ROW_1_ITEMS.map((item, index) => (
            <div
              key={`r1-${index}`}
              className="flex items-center gap-2.5 px-4 md:px-6 py-2.5 md:py-3 border border-surface-border bg-surface-raised whitespace-nowrap mx-1 md:mx-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-zinc-200 font-mono text-xs md:text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - moves right (offset content) */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-surface-tinted to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-surface-tinted to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee-reverse">
          {ROW_2_ITEMS.map((item, index) => (
            <div
              key={`r2-${index}`}
              className="flex items-center gap-2.5 px-4 md:px-6 py-2.5 md:py-3 border border-surface-border bg-surface-raised whitespace-nowrap mx-1 md:mx-1.5"
            >
              <span className="w-1.5 h-1.5 bg-accent" />
              <span className="text-zinc-200 font-mono text-xs md:text-sm">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
