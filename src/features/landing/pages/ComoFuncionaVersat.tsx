import PageLayout, { DocH } from './PageLayout';

export default function ComoFuncionaVersat() {
  return (
    <PageLayout
      tag="Proceso"
      title="Cómo funciona Versat"
      lede="Tres pasos: conectas tus canales, entrenamos la IA con tu negocio, y queda atendiendo. Sin instalaciones complejas y sin capacitaciones eternas."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <path d="M22 42h96" stroke="currentColor" strokeWidth="1" opacity=".28" strokeDasharray="3 4" />
          <circle cx="22" cy="42" r="5" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
          <circle cx="70" cy="42" r="8" stroke="currentColor" strokeWidth="1.2" opacity=".75" />
          <circle cx="118" cy="42" r="11" fill="currentColor" opacity=".14" />
          <circle cx="118" cy="42" r="11" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="118" cy="42" r="3.4" fill="currentColor" />
        </svg>
      }
    >
      <DocH n="01">El proceso completo</DocH>
      <p className="doc-p">
        La configuración básica toma menos de una hora. Para el Plan Pro, con entrenamiento de IA, nuestro equipo trabaja
        contigo en sesiones dedicadas para que en pocos días tengas tu agente funcionando con tu voz y tu conocimiento de
        negocio.
      </p>
      <ol className="doc-steps">
        <li className="doc-step">
          <span className="doc-step-n">01</span>
          <h3 className="doc-step-h">Conecta tus canales</h3>
          <p className="doc-step-p">
            Conectas los canales y aplicaciones por donde quieres que Versat hable con tus clientes. Tu número de
            WhatsApp se conecta por medio de Meta Business, y sumas las aplicaciones de uso diario con las que ya
            trabajas.
          </p>
        </li>
        <li className="doc-step">
          <span className="doc-step-n">02</span>
          <h3 className="doc-step-h">Entrena tu asistente</h3>
          <p className="doc-step-p">
            Nuestro equipo entrena el agente con la información de tu negocio: productos, precios y preguntas
            frecuentes. También se define el tono de voz, para que Versat escriba como escribe tu marca.
          </p>
        </li>
        <li className="doc-step">
          <span className="doc-step-n">03</span>
          <h3 className="doc-step-h">Vende más, trabaja menos</h3>
          <p className="doc-step-p">
            Versat gestiona, califica y da seguimiento 24/7. Cada lead se prioriza solo y nadie se queda sin respuesta.
            Tu equipo sólo aparece para cerrar.
          </p>
        </li>
      </ol>
      <DocH n="02">Qué necesitas de tu lado</DocH>
      <p className="doc-p">
        No necesitas conocimientos técnicos. Nuestro equipo se encarga de la configuración, de la conexión de tus
        canales y del entrenamiento de la IA. Tú sólo necesitas contarnos cómo funciona tu negocio.
      </p>
      <ul className="doc-defs">
        <li><span className="doc-def-k">Configuración</span><span className="doc-def-v">Menos de 1 hora para la base.</span></li>
        <li><span className="doc-def-k">Entrenamiento IA</span><span className="doc-def-v">Sesiones dedicadas con nuestro equipo, pocos días.</span></li>
        <li><span className="doc-def-k">A tu cargo</span><span className="doc-def-v">Contarnos tu proceso, tus productos y tus preguntas frecuentes.</span></li>
        <li><span className="doc-def-k">A nuestro cargo</span><span className="doc-def-v">Conexión de canales, entrenamiento y puesta en marcha.</span></li>
      </ul>
      <DocH n="03">La automatización sigue creciendo contigo</DocH>
      <p className="doc-p">
        La atención no se queda estática: el proceso permite incorporar futuras automatizaciones a medida que tu
        operación evoluciona.
      </p>
    </PageLayout>
  );
}
