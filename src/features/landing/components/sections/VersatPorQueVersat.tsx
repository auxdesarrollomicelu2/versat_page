import { useReveal } from '../../hooks/useReveal';
import { porQueVersat } from '../../lib/datos';

function Step({ step, i, total }: { step: (typeof porQueVersat)[number]; i: number; total: number }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const isLast = i === total - 1;
  return (
    <article
      className={`pqv-step reveal${visible ? ' visible' : ''}${isLast ? ' is-final' : ''}`}
      style={{ ['--s' as any]: i, transitionDelay: `${i * 0.1}s` }}
      ref={ref as any}
    >
      <span className="pqv-ghost" aria-hidden="true">{step.num}</span>
      <span className="pqv-node" aria-hidden="true"><i></i></span>
      <span className="pqv-num">{step.num}</span>
      <h3 className="pqv-title">{step.title}</h3>
      <p className="pqv-text">{step.text}</p>
    </article>
  );
}

export default function VersatPorQueVersat() {
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();
  const total = porQueVersat.length;
  return (
    <section className="por-que-versat" id="por-que-versat">
      <div className="section-inner">
        <div className={`pqv-head reveal${headVisible ? ' visible' : ''}`} ref={headRef}>
          <span className="section-tag">¿Por qué elegir Versat?</span>
          <h2 className="section-title">No entregamos una herramienta.<br />Entregamos una IA funcionando</h2>
        </div>
        <p className="pqv-claim">Versat entiende tu proceso y te entrega una IA funcionando.</p>
        <div className="pqv-grid" id="pqv-grid">
          {porQueVersat.map((s, i) => (
            <Step step={s} i={i} total={total} key={s.num} />
          ))}
        </div>
        <p className="pqv-footnote">
          Todo esto lo hace un <strong>equipo especializado</strong>, sin costo adicional — no compras la tecnología y quedas
          solo para implementarla: nuestro equipo entiende tu proceso y te ayuda a ponerlo a funcionar.
        </p>
      </div>
    </section>
  );
}
