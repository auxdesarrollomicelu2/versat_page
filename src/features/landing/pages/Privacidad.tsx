import PageLayout, { DocH } from './PageLayout';

export default function Privacidad() {
  return (
    <PageLayout
      tag="Legal"
      title="Política de privacidad"
      lede="Cómo tratamos tu información y la de tus clientes."
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
        <strong>Documento preliminar.</strong> Este resumen describe la práctica actual de Versat. La política de
        tratamiento de datos definitiva será publicada por Versat en esta misma página. Si necesitas detalle sobre el
        manejo de datos antes de contratar, escríbenos por WhatsApp.
      </div>
      <DocH n="01">Qué información se trata</DocH>
      <p className="doc-p">
        Para prestar el servicio, Versat procesa las conversaciones de los canales que conectas y la información de
        negocio con la que se entrena el agente: productos, precios y preguntas frecuentes.
      </p>
      <DocH n="02">Cómo se protege</DocH>
      <p className="doc-p">
        Versat cumple con estándares de seguridad de la industria. Tu información y la de tus clientes está{' '}
        <strong>encriptada</strong> y <strong>nunca es compartida con terceros</strong>.
      </p>
      <ul className="doc-defs">
        <li><span className="doc-def-k">Cifrado</span><span className="doc-def-v">La información se almacena y transmite encriptada.</span></li>
        <li><span className="doc-def-k">Terceros</span><span className="doc-def-v">No se comparte información con terceros.</span></li>
        <li><span className="doc-def-k">Finalidad</span><span className="doc-def-v">Únicamente prestar y mejorar el servicio contratado.</span></li>
      </ul>
      <DocH n="03">Tus datos siguen siendo tuyos</DocH>
      <p className="doc-p">
        La información de tu negocio y la de tus clientes es tuya. Versat la trata para operar el servicio que
        contrataste, no para otros fines.
      </p>
      <DocH n="04">Contacto</DocH>
      <p className="doc-p">Para cualquier solicitud sobre tus datos, escríbenos por WhatsApp — es el canal de contacto de Versat.</p>
    </PageLayout>
  );
}
