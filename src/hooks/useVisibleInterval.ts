import { useEffect, useRef } from 'react'

/**
 * Runs a setInterval-style tick ONLY while the component is visible
 * in the viewport. Saves CPU by pausing perpetual animations off-screen.
 * Also respects `prefers-reduced-motion`.
 *
 * Usage:
 *   const ref = useVisibleInterval(() => setTick(t => t + 1), 1500)
 *   return <div ref={ref}>...</div>
 */
export function useVisibleInterval<T extends HTMLElement = HTMLDivElement>(
  callback: () => void,
  delay: number,
) {
  const ref = useRef<T | null>(null)
  const cbRef = useRef(callback)

  useEffect(() => {
    cbRef.current = callback
  }, [callback])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const prefersReduced = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const start = () => {
      if (intervalId == null) {
        intervalId = setInterval(() => cbRef.current(), delay)
      }
    }
    const stop = () => {
      if (intervalId != null) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start()
        else stop()
      },
      { threshold: 0.1 },
    )

    observer.observe(node)

    const handleVisibility = () => {
      if (document.hidden) stop()
      else if (node.getBoundingClientRect().top < window.innerHeight && node.getBoundingClientRect().bottom > 0) {
        start()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', handleVisibility)
      stop()
    }
  }, [delay])

  return ref
}
