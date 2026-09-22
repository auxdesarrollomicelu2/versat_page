import PageLayout, { DocH } from './PageLayout';

export default function AsistenteIA() {
  return (
    <PageLayout
      tag="Automatización"
      title="Tu asistente de IA"
      lede="Qué hace el agente cuando llega un mensaje: entiende de qué se trata, responde, califica el lead y sabe cuándo pasarle el caso a tu equipo."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <rect x="34" y="18" width="72" height="34" rx="10" stroke="currentColor" strokeWidth="1.3" />
          <path d="M48 52l-6 12 16-12" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
          <circle cx="56" cy="35" r="3.4" fill="currentColor" opacity=".45" />
          <circle cx="70" cy="35" r="3.4" fill="currentColor" opacity=".75" />
          <circle cx="84" cy="35" r="3.4" fill="currentColor" />
          <path d="M70 18V8M62 8h16" stroke="currentColor" strokeWidth="1.1" opacity=".4" strokeLinecap="round" />
        </svg>
      }
    >
      <DocH n="01">Entiende antes de responder</DocH>
      <p className="doc-p">
        El asistente identifica de qué se trata cada mensaje. Si un cliente pregunta por precio o disponibilidad,
        responde al instante, sin que el equipo tenga que revisar cada conversación una por una. Si se trata de una
        postventa, la reconoce y la atiende como tal.
      </p>
      <DocH n="02">Habla con la voz de tu marca</DocH>
      <p className="doc-p">
        El agente se entrena con la información real de tu negocio: productos, precios y preguntas frecuentes. Y se le
        define un tono de voz, para que Versat escriba como escribe tu marca — no como un robot genérico.
      </p>
      <ul className="doc-defs">
        <li><span className="doc-def-k">Base de conocimiento</span><span className="doc-def-v">Productos, precios y preguntas frecuentes de tu negocio.</span></li>
        <li><span className="doc-def-k">Tono de voz</span><span className="doc-def-v">Versat escribe como escribe tu marca.</span></li>
        <li><span className="doc-def-k">Calificación</span><span className="doc-def-v">Cada lead se prioriza solo, según lo que pidió.</span></li>
        <li><span className="doc-def-k">Seguimiento</span><span className="doc-def-v">24/7 — nadie se queda sin respuesta.</span></li>
      </ul>
      <DocH n="03">Sabe cuándo llamar a una persona</DocH>
      <p className="doc-p">
        La IA identifica cuándo una conversación requiere atención humana y puede escalarla a tu equipo en cualquier
        momento. Tú decides qué tanto automatizar y en qué casos interviene tu equipo.
      </p>
      <DocH n="04">Quién lo entrena</DocH>
      <p className="doc-p">
        No necesitas conocimientos técnicos. En el Plan Pro, el entrenamiento de la IA está a cargo de Versat: nuestro
        equipo trabaja contigo en sesiones dedicadas hasta que el agente responde como debe responder.
      </p>
    </PageLayout>
  );
}
