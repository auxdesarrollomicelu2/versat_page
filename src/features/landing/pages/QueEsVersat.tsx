import PageLayout, { DocH } from './PageLayout';

export default function QueEsVersat() {
  return (
    <PageLayout
      tag="Fundamentos"
      title="¿Qué es Versat?"
      lede="Versat es una IA que centraliza tu mensajería y tus aplicaciones de uso diario en un solo lugar, entiende cómo funciona tu proceso comercial y queda trabajando dentro de él."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <ellipse cx="70" cy="42" rx="60" ry="24" stroke="currentColor" strokeWidth="1" opacity=".28" />
          <ellipse cx="70" cy="42" rx="38" ry="36" stroke="currentColor" strokeWidth="1" opacity=".18" />
          <circle cx="70" cy="42" r="9" fill="currentColor" opacity=".16" />
          <circle cx="70" cy="42" r="4" fill="currentColor" />
          <circle cx="130" cy="42" r="3.2" fill="currentColor" opacity=".75" />
          <circle cx="10" cy="42" r="2.6" fill="currentColor" opacity=".45" />
          <circle cx="70" cy="6" r="2.6" fill="currentColor" opacity=".45" />
        </svg>
      }
    >
      <DocH n="01">Un solo lugar para lo que hoy está disperso</DocH>
      <p className="doc-p">
        La mayoría de los negocios atiende por WhatsApp, por Instagram y, además, trabaja con un puñado de herramientas
        sueltas para vender y hacer seguimiento. Versat junta esas conversaciones y esas aplicaciones en un mismo lugar,
        para que nadie tenga que ir revisando cada canal por su cuenta.
      </p>
      <p className="doc-p">
        No se trata sólo de mensajería: Versat centraliza también las aplicaciones de uso diario de tu negocio, no
        únicamente el correo.
      </p>
      <DocH n="02">No entregamos una herramienta: entregamos una IA funcionando</DocH>
      <p className="doc-p">
        Esta es la diferencia principal. No compras la tecnología y quedas solo para implementarla. Un{' '}
        <strong>equipo especializado</strong>, sin costo adicional, entiende tu proceso y te ayuda a ponerlo a funcionar.
      </p>
      <ol className="doc-steps">
        <li className="doc-step">
          <span className="doc-step-n">01</span>
          <h3 className="doc-step-h">Identificación del problema</h3>
          <p className="doc-step-p">
            Entendemos cómo funciona hoy el proceso de tu empresa y detectamos dónde están los problemas: tareas
            repetitivas, tiempos de respuesta lentos, oportunidades perdidas.
          </p>
        </li>
        <li className="doc-step">
          <span className="doc-step-n">02</span>
          <h3 className="doc-step-h">Solución</h3>
          <p className="doc-step-p">
            Con base en ese diagnóstico, configuramos la solución de acuerdo al proceso real de tu empresa — no una
            plantilla genérica.
          </p>
        </li>
        <li className="doc-step">
          <span className="doc-step-n">03</span>
          <h3 className="doc-step-h">IA funcionando</h3>
          <p className="doc-step-p">
            Versat entrega una IA funcionando, adaptada a tu proceso, lista para atender desde el primer día.
          </p>
        </li>
      </ol>
      <DocH n="03">Qué hace la IA en el día a día</DocH>
      <p className="doc-p">
        Identifica de qué se trata cada mensaje, responde al instante las preguntas que puede resolver, califica y
        prioriza los leads, y da seguimiento 24/7. Tu equipo aparece para cerrar, o cuando la conversación necesita a
        una persona.
      </p>
      <div className="doc-note">
        Versat cumple con estándares de seguridad de la industria. Tu información y la de tus clientes está encriptada
        y nunca es compartida con terceros.
      </div>
    </PageLayout>
  );
}
