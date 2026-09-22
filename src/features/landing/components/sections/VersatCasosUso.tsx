import { useReveal } from '../../hooks/useReveal';
import { useCases } from '../../lib/datos';

type UseCase = (typeof useCases)[number];

function MotifChain({ flow }: { flow: string[] }) {
  return (
    <div className="case-motif case-motif--chain">
      {flow.map((step, i) => (
        <span key={step}>
          <span className={`chain-node${i === flow.length - 1 ? ' is-end' : ''}`}>
            <i className="chain-dot" aria-hidden="true"></i>{step}
          </span>
          {i < flow.length - 1 && <i className="chain-link" aria-hidden="true"></i>}
        </span>
      ))}
    </div>
  );
}

function MotifTimeline({ flow }: { flow: string[] }) {
  return (
    <ol className="case-motif case-motif--timeline">
      {flow.map((step, i) => (
        <li className="tl-step" style={{ ['--tl' as any]: i }} key={step}>
          <span className="tl-num">{String(i + 1).padStart(2, '0')}</span>
          <span className="tl-label">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function MotifLoop({ flow, closing }: { flow: string[]; closing: string }) {
  return (
    <div className="case-motif case-motif--loop">
      <div className="loop-row">
        {flow.map((step, i) => (
          <span key={step}>
            <span className="loop-step">{step}</span>
            {i < flow.length - 1 && <i className="loop-link" aria-hidden="true"></i>}
          </span>
        ))}
      </div>
      <div className="loop-return" aria-hidden="true"></div>
      <span className="loop-label">↺ {closing}</span>
    </div>
  );
}

function renderMotif(c: UseCase) {
  switch (c.motif) {
    case 'timeline':
      return <MotifTimeline flow={c.flow} />;
    case 'loop':
      return <MotifLoop flow={c.flow} closing={c.aside || 'y el ciclo vuelve a empezar'} />;
    case 'speed':
      return null;
    default:
      return <MotifChain flow={c.flow} />;
  }
}

function CaseCard({ c, i }: { c: UseCase; i: number }) {
  const { ref, visible } = useReveal<HTMLElement>();
  const idx = String(i + 1).padStart(2, '0');
  return (
    <article
      className={`case case--${c.motif} reveal${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${(i % 2) * 0.08}s` }}
      ref={ref as any}
    >
      <div className="case-body">
        <div className="case-head">
          <span className="case-idx">{idx}</span>
          <span className="case-tag">{c.tag}{c.example ? ` · ${c.example}` : ''}</span>
        </div>
        <h3 className="case-title">{c.title}</h3>
        <p className="case-text">{c.text}</p>
        {renderMotif(c)}
      </div>
      <div className="case-media">
        <div className="case-screen">
          <div className="case-screen-view">
            {c.video ? (
              <video
                className="case-video"
                src={c.video}
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                disableRemotePlayback
                controlsList="nodownload noplaybackrate nofullscreen"
              />
            ) : (
              <div className="case-video-empty"><span>Video demostrativo</span></div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function VersatCasosUso() {
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();
  return (
    <section className="casos-uso" id="casos-uso">
      <div className="section-inner">
        <div className={`casos-uso-head reveal${headVisible ? ' visible' : ''}`} ref={headRef}>
          <span className="section-tag">Casos de uso</span>
          <h2 className="section-title">La IA en acción,<br />en escenarios reales</h2>
          <p className="section-sub">Ejemplos concretos de cómo Versat trabaja dentro del proceso real de nuestros clientes.</p>
        </div>
        <div className="casos-uso-grid" id="casos-uso-grid">
          {useCases.map((c, i) => (
            <CaseCard c={c} i={i} key={c.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
