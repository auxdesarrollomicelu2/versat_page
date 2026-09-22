import { useEffect, useRef, useState } from 'react';
import { testimonials } from '../../lib/datos';
import { useReveal } from '../../hooks/useReveal';

const AUTO_DELAY = 30000;
const MAX_VISIBLE = 2;

function getSpread() {
  return window.innerWidth < 640 ? 130 : window.innerWidth < 900 ? 200 : 300;
}
function getDepth() {
  return window.innerWidth < 900 ? 140 : 220;
}

export default function VersatTestimonials() {
  const total = testimonials.length;
  const [current, setCurrent] = useState(0);
  const pausedRef = useRef(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const dragStartX = useRef<number | null>(null);
  const dragMoved = useRef(false);
  const prevOffsetRef = useRef<number[]>([]);
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();

  function go(i: number) {
    setCurrent(((i % total) + total) % total);
  }

  function layout() {
    const SPREAD = getSpread();
    const DEPTH = getDepth();
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      let offset = i - current;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      const abs = Math.abs(offset);
      const visible = abs <= MAX_VISIBLE;

      const prev = prevOffsetRef.current[i];
      // al cruzar el punto opuesto del anillo, el offset salta de lado (ej. -1 a +2); se desactiva la transición para que no cruce el escenario animando
      if (prev !== undefined && Math.abs(offset - prev) > total / 2 + 0.5) {
        card.style.transition = 'none';
        void card.offsetWidth;
        requestAnimationFrame(() => { card.style.transition = ''; });
      }
      prevOffsetRef.current[i] = offset;

      const x = offset * SPREAD;
      const z = -abs * DEPTH;
      const scale = 1 - Math.min(abs * 0.18, 0.5);
      const rotate = offset * -8;
      const opacity = visible ? 1 - abs * 0.38 : 0;
      const blur = abs * 2.2;

      card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${rotate}deg) scale(${scale})`;
      card.style.opacity = opacity.toFixed(2);
      card.style.filter = blur > 0.1 ? `blur(${blur.toFixed(1)}px)` : 'none';
      card.style.zIndex = String(100 - abs);
      card.style.pointerEvents = abs === 0 ? 'none' : visible ? 'auto' : 'none';
      card.classList.toggle('is-front', offset === 0);
    });
  }

  useEffect(() => {
    layout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    window.addEventListener('resize', layout, { passive: true });
    return () => window.removeEventListener('resize', layout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) go(current + 1);
    }, AUTO_DELAY);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    function onGoto(e: Event) {
      const idx = testimonials.findIndex((t) => t.tabName === (e as CustomEvent).detail);
      if (idx !== -1) go(idx);
    }
    window.addEventListener('versat:goto-testimonial', onGoto as EventListener);
    return () => window.removeEventListener('versat:goto-testimonial', onGoto as EventListener);
  }, []);

  function handleCardClick(i: number) {
    if (dragMoved.current) {
      dragMoved.current = false;
      return;
    }
    let offset = i - current;
    if (offset > total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    if (offset === 0) return;
    go(current + (offset > 0 ? 1 : -1));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartX.current = e.clientX;
    dragMoved.current = false;
    pausedRef.current = true;
    ringRef.current?.classList.add('is-dragging');
    ringRef.current?.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    if (Math.abs(e.clientX - dragStartX.current) > 5) {
      dragMoved.current = true;
    }
  }
  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (dragStartX.current === null) return;
    const dx = e.clientX - dragStartX.current;
    dragStartX.current = null;
    pausedRef.current = false;
    ringRef.current?.classList.remove('is-dragging');
    const DRAG_THRESHOLD = 60;
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      go(current + (dx < 0 ? 1 : -1));
    }
  }

  return (
    <section className="testimonials" id="clientes">
      <div className="nv-ts">
        <div className={`nv-ts-header reveal${headVisible ? ' visible' : ''}`} ref={headRef}>
          <div className="nv-ts-eyebrow">/ Casos de éxito</div>
          <h2 className="nv-ts-h">Resultados <em>reales.</em></h2>
        </div>

        <div
          className="nv-ts-ringstage"
          id="nvtsRingstage"
          ref={stageRef}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          <button type="button" className="nv-ts-arrow nv-ts-arrow-prev" id="nvtsPrev" aria-label="Testimonio anterior" onClick={() => go(current - 1)}>
            <svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div
            className="nv-ts-ring"
            id="nvtsRing"
            ref={ringRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {testimonials.map((t, i) => (
              <div
                className="nv-ts-card"
                data-name={t.tabName}
                key={t.tabName}
                ref={(el) => { cardRefs.current[i] = el; }}
                onClick={() => handleCardClick(i)}
              >
                <p className="nv-ts-quote">{t.quote}</p>
                <div className="nv-ts-stage-footer">
                  <div className="nv-ts-author">
                    <div className="nv-ts-avatar">{t.av}</div>
                    <div>
                      <div className="nv-ts-author-name">{t.name}</div>
                      <div className="nv-ts-author-meta">{t.role}<span className="nv-ts-dot-sep">·</span>{t.type}</div>
                    </div>
                  </div>
                  <div className="nv-ts-kpis">
                    {t.kpis.map((k) => (
                      <div className="nv-ts-kpi" key={k.l}>
                        <span className="nv-ts-kpi-n">{k.n}</span>
                        <span className="nv-ts-kpi-l">{k.l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="nv-ts-arrow nv-ts-arrow-next" id="nvtsNext" aria-label="Siguiente testimonio" onClick={() => go(current + 1)}>
            <svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
