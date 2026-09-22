import { useEffect, useRef, useState } from 'react';

// Fade-up al entrar en pantalla: agrega "visible" una sola vez y no la quita.
// Equivalente React de createRevealObserver en ayudas.ts.
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true);
        });
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// Variante que sí repite (usada por el badge "Más popular" de pricing).
export function useRepeatingReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.4) {
  const ref = useRef<T | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setActive(entry.isIntersecting));
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, active };
}

// Magnetismo: el elemento se desplaza levemente hacia el cursor al pasar cerca.
export function useMagnetic<T extends HTMLElement = HTMLButtonElement>({ radius = 70, strength = 0.3 } = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    function onMove(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < radius) {
        el!.style.setProperty('--mx', `${dx * strength}px`);
        el!.style.setProperty('--my', `${dy * strength}px`);
      } else {
        el!.style.setProperty('--mx', '0px');
        el!.style.setProperty('--my', '0px');
      }
    }
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [radius, strength]);

  return ref;
}

// Envuelve cada palabra de un título en su propio <span class="stw"> para animarlas una a una.
export function splitWords(text: string) {
  return text.split(/(\s+)/).map((chunk, i) => {
    if (!chunk) return null;
    if (/^\s+$/.test(chunk)) return chunk;
    return (
      <span className="stw" style={{ ['--i' as any]: i }} key={i}>
        {chunk}
      </span>
    );
  });
}
