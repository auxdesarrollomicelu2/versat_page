import PageLayout, { DocH } from './PageLayout';

export default function Terminos() {
  return (
    <PageLayout
      tag="Legal"
      title="Términos"
      lede="Condiciones generales del servicio de Versat."
      visual={
        <svg viewBox="0 0 140 84" fill="none" aria-hidden="true">
          <rect x="38" y="8" width="64" height="68" rx="7" stroke="currentColor" strokeWidth="1.3" opacity=".55" />
          <path d="M52 26h36M52 38h36M52 50h24" stroke="currentColor" strokeWidth="1.1" opacity=".4" strokeLinecap="round" />
          <circle cx="88" cy="60" r="9" fill="currentColor" opacity=".12" />
          <circle cx="88" cy="60" r="9" stroke="currentColor" strokeWidth="1.3" />
          <path d="M84.5 60l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      }
    >
      <div className="doc-note">
        <strong>Documento preliminar.</strong> Este es un resumen provisional de las condiciones con las que hoy
        trabajamos. El texto legal definitivo será publicado por Versat en esta misma página. Para cualquier duda
        sobre condiciones antes de contratar, escríbenos por WhatsApp y te respondemos con claridad.
      </div>
      <DocH n="01">El servicio</DocH>
      <p className="doc-p">
        Versat presta un servicio de automatización de atención y proceso comercial con IA, que incluye la conexión de
        canales de mensajería y aplicaciones de uso diario, la configuración del CRM y —según el plan— el entrenamiento
        del agente de IA.
      </p>
      <DocH n="02">Planes y facturación</DocH>
      <p className="doc-p">
        Los planes se facturan mensualmente en pesos colombianos a la TRM del día 30 de cada mes, más IVA (19%). El
        Plan Estándar y el Plan Pro tienen precio publicado; el plan Empresa se define directamente con nuestro equipo
        según el volumen y el proceso real de cada negocio.
      </p>
      <ul className="doc-defs">
        <li><span className="doc-def-k">Periodicidad</span><span className="doc-def-v">Mensual. No hay contratos de permanencia larga.</span></li>
        <li><span className="doc-def-k">Moneda</span><span className="doc-def-v">Pesos colombianos, a la TRM del día 30.</span></li>
        <li><span className="doc-def-k">Impuestos</span><span className="doc-def-v">Más IVA (19%).</span></li>
        <li><span className="doc-def-k">Cambio de plan</span><span className="doc-def-v">Puedes escalar de Estándar a Pro cuando quieras.</span></li>
      </ul>
      <DocH n="03">Alcance de la implementación</DocH>
      <p className="doc-p">
        La configuración y la puesta en marcha están a cargo del equipo de Versat, sin costo adicional. Los límites de
        leads y de canales de cada plan son los publicados en la página de planes.
      </p>
      <DocH n="04">Contacto</DocH>
      <p className="doc-p">
        El canal de contacto de Versat es WhatsApp. No operamos líneas telefónicas de atención ni otros canales de
        soporte formal.
      </p>
    </PageLayout>
  );
}
