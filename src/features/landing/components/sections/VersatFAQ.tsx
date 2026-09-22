import { useState } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { faqItems } from '../../lib/datos';

export default function VersatFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const { ref: headRef, visible: headVisible } = useReveal<HTMLDivElement>();

  return (
    <section className="faq" id="preguntas">
      <div className="faq-inner">
        <div className={`faq-head reveal${headVisible ? ' visible' : ''}`} ref={headRef}>
          <span className="section-tag">Preguntas frecuentes</span>
          <h2 className="section-title">¿Tienes dudas?<br />Las respondemos</h2>
        </div>
        <div className="faq-list" id="faq-list">
          {faqItems.map((item, i) => (
            <div className={`faq-item${openIdx === i ? ' is-open' : ''}`} data-i={i} key={item.q}>
              <button
                type="button"
                className="faq-item-q"
                id={`faq-q-${i}`}
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="faq-item-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-item-label">{item.q}</span>
                <span className="faq-item-icon" aria-hidden="true"></span>
              </button>
              <div className="faq-item-a">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
