import PageLayout, { DocH } from './PageLayout';

export default function PipelineDeVentas() {
  return (
    <PageLayout
      tag="Ventas"
      title="Seguimiento de tu pipeline"
      lede="Cada conversación que entra es una oportunidad en alguna etapa. Versat te ayuda a seguirla sin que se pierda en el camino."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <rect x="14" y="52" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="1.1" opacity=".35" />
          <rect x="46" y="42" width="22" height="30" rx="3" stroke="currentColor" strokeWidth="1.1" opacity=".5" />
          <rect x="78" y="30" width="22" height="42" rx="3" stroke="currentColor" strokeWidth="1.1" opacity=".7" />
          <rect x="110" y="18" width="22" height="54" rx="3" fill="currentColor" opacity=".12" />
          <rect x="110" y="18" width="22" height="54" rx="3" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="25" cy="44" r="2.6" fill="currentColor" opacity=".4" />
          <circle cx="57" cy="34" r="2.6" fill="currentColor" opacity=".6" />
          <circle cx="121" cy="10" r="3.4" fill="currentColor" />
        </svg>
      }
    >
      <DocH n="01">El problema no es recibir mensajes, es no perderlos</DocH>
      <p className="doc-p">
        Cuando el volumen sube, la dificultad no está en que lleguen conversaciones: está en saber cuáles están vivas,
        cuáles esperan respuesta y cuáles ya se enfriaron. Ese seguimiento hecho a mano es justo donde se caen las
        ventas.
      </p>
      <DocH n="02">La IA califica antes de que llegue a tu equipo</DocH>
      <p className="doc-p">
        Versat identifica de qué se trata cada conversación y prioriza sola: cada lead se califica según lo que
        realmente pidió. Tu equipo entra a las conversaciones que están listas para cerrar, en vez de revisar todo
        mensaje por mensaje.
      </p>
      <p className="doc-p">
        En el Plan Pro, la IA califica <strong>hasta 50 leads</strong> por ti. El Plan Estándar gestiona hasta 30.000
        leads en el CRM.
      </p>
      <ul className="doc-defs">
        <li><span className="doc-def-k">Plan Estándar</span><span className="doc-def-v">CRM completo, hasta 30.000 leads.</span></li>
        <li><span className="doc-def-k">Plan Pro</span><span className="doc-def-v">Todo lo anterior más automatizaciones de IA y hasta 50 leads calificados por IA.</span></li>
        <li><span className="doc-def-k">Plan Empresa</span><span className="doc-def-v">Sin los límites de los planes estándar: alcance definido con nuestro equipo según tu volumen real.</span></li>
      </ul>
      <DocH n="03">Seguimiento que no se detiene</DocH>
      <p className="doc-p">
        Versat da seguimiento 24/7: nadie se queda sin respuesta, ni de noche ni el fin de semana. Y cuando una
        conversación requiere atención humana, la escala a tu equipo.
      </p>
      <DocH n="04">Volumen real, no hipotético</DocH>
      <p className="doc-p">
        Micelu pautó con un influencer y recibió 2.000 mensajes en una hora. Con Versat pudieron atender ese volumen de
        conversaciones y aumentar la conversión de su publicidad.
      </p>
    </PageLayout>
  );
}
