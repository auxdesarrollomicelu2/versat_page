import { useEffect, useRef, useState } from 'react';

const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'como-funciona', label: 'Proceso' },
  { id: 'casos-uso', label: 'Casos' },
  { id: 'por-que-versat', label: 'Soluciones' },
  { id: 'clientes', label: 'Testimonios' },
  { id: 'planes', label: 'Planes' },
  { id: 'preguntas', label: 'Preguntas' },
];

export default function LineSidebar() {
  const [show, setShow] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const fillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function updateScroll() {
      const sy = window.scrollY;
      setShow(sy > 200);

      let cur = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) cur = i;
      });
      setActiveIdx(cur);

      if (fillRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? Math.min(1, sy / max) : 0;
        fillRef.current.style.transform = `scaleY(${pct})`;
      }
    }
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll, { passive: true });
    updateScroll();
    return () => {
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
    };
  }, []);

  return (
    <div id="line-sidebar" className={show ? 'show' : ''}>
      <span id="ls-index-label">Índice</span>
      <ul id="ls-list">
        {SECTIONS.map((s, i) => (
          <li
            key={s.id}
            className={i === activeIdx ? 'is-active' : ''}
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <span className="ls-text">{s.label}</span>
            <span className="ls-line"></span>
          </li>
        ))}
      </ul>
      <div id="ls-scroll">
        <div id="ls-scroll-track">
          <div id="ls-scroll-fill" ref={fillRef}></div>
        </div>
        <span id="ls-scroll-label">scroll</span>
      </div>
    </div>
  );
}
