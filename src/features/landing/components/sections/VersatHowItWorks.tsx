import { useEffect, useRef, useState, type ReactElement } from 'react';
import { howSteps } from '../../lib/datos';
import { useReveal } from '../../hooks/useReveal';

const ICONS: Record<string, ReactElement> = {
  connect: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M8 12h8M12 4v4M12 16v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="6" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="12" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M9 4.5a3 3 0 00-3 3v.3A3 3 0 004 10.5v1a3 3 0 002 2.83V16a3 3 0 003 3h.5M15 4.5a3 3 0 013 3v.3a3 3 0 012 2.7v1a3 3 0 01-2 2.83V16a3 3 0 01-3 3h-.5M9 4.5h6M9 19.5h6M9 4.5v15M15 4.5v15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  rocket: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2.5c2.6 1.8 4 4.7 4 8.3 0 2-.5 3.7-1.3 5.1L12 18l-2.7-2.1C8.5 14.5 8 12.8 8 10.8c0-3.6 1.4-6.5 4-8.3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 15.5l-2.2 1.6.6-2.6M15 15.5l2.2 1.6-.6-2.6M10.3 18l-.8 3M13.7 18l.8 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function VersatHowItWorks() {
  const total = howSteps.length;
  const [currentStep, setCurrentStep] = useState(0);
  const [typing, setTyping] = useState(true);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref: introRef, visible: introVisible } = useReveal<HTMLDivElement>();

  function setStep(i: number) {
    const next = ((i % total) + total) % total;
    setCurrentStep(next);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    setTyping(true);
    typingTimer.current = setTimeout(() => setTyping(false), 900);
    window.dispatchEvent(new CustomEvent('versat:step', { detail: { step: next } }));
  }

  useEffect(() => {
    setTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setTyping(false), 900);
    return () => {
      if (typingTimer.current) clearTimeout(typingTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="how" id="como-funciona">
      <div className="section-inner">
        <div className={`how-intro${introVisible ? ' visible' : ''}`} id="how-intro" style={{ textAlign: 'center' }} ref={introRef}>
          <span className="section-tag how-intro-stagger" style={{ ['--hi' as any]: 0 }}>Así de fácil</span>
          <h2 className="section-title how-intro-stagger" style={{ ['--hi' as any]: 1 }}>
            Empieza en minutos,<br />resultados desde el día 1
          </h2>
          <p className="section-sub how-intro-stagger" style={{ margin: '0 auto', ['--hi' as any]: 2 }}>
            Sin instalaciones complejas, sin capacitaciones eternas. Versat se adapta a ti.
          </p>
        </div>

        <div className="how-steps" id="how-steps">
          <div className="how-tabs" id="how-tabs" role="tablist">
            {howSteps.map((step, i) => (
              <button
                type="button"
                key={step.num}
                className={`how-tab${i === currentStep ? ' is-active' : ''}`}
                data-step={i}
                role="tab"
                onClick={() => setStep(i)}
              >
                <span className="how-tab-n" aria-hidden="true">{String(step.num).padStart(2, '0')}</span>
                <span className="how-tab-icon">{ICONS[step.icon]}</span>
                <span className="how-tab-label">{step.tag}</span>
              </button>
            ))}
          </div>

          <div className="how-panels is-open" id="how-panels">
            {howSteps.map((step, i) => (
              <div
                className={`how-panel${i === currentStep ? ' is-active panel-in' : ''}`}
                data-step={i}
                key={step.num}
                onClick={() => setStep(currentStep + 1)}
              >
                <div className="how-panel-left">
                  <div className="how-step-marker">
                    <span className="how-step-icon">{ICONS[step.icon]}</span>
                    <span className="how-step-line"></span>
                    <span className="how-eyebrow">Paso {String(step.num).padStart(2, '0')}</span>
                  </div>
                  <h3 className="how-big-title">
                    {step.titleA}
                    <br />
                    <span className="how-grad">{step.titleB}</span>
                  </h3>
                  <p className="how-panel-text">{step.text}</p>
                  <ul className="how-feature-list">
                    {step.features.map((f) => (
                      <li key={f.label}>
                        <span className="how-feature-icon">{ICONS[step.icon]}</span>
                        <span>
                          <strong>{f.label}</strong>
                          <small>{f.sub}</small>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="how-panel-right">
                  <div className="how-assistant-card">
                    <div className="how-assistant-header">
                      <span className="how-assistant-dot"></span>
                      <span className="how-assistant-name">VERSAT</span>
                      <span className="how-assistant-tag">ASISTENTE</span>
                    </div>
                    <div className={`how-assistant-body${i === currentStep ? (typing ? ' is-typing' : ' msg-in') : ''}`}>
                      <div className="how-assistant-avatar">
                        <span className="how-assistant-eye"></span>
                        <span className="how-assistant-eye"></span>
                      </div>
                      <div className="how-assistant-msg">
                        ¡Hola! Soy Versat. Estoy aquí para guiarte en {howSteps.length} pasos y activar tu automatización. ¿Lista para empezar?
                      </div>
                      <div className="how-typing" aria-hidden="true"><span></span><span></span><span></span></div>
                      <div className="how-assistant-msg how-assistant-msg--highlight">
                        <span className="how-assistant-msg-tag">Paso {String(step.num).padStart(2, '0')}</span>
                        <strong>{step.title}</strong>
                        <p>{step.text}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
