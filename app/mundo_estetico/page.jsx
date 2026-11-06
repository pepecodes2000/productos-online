'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Se conservan el WhatsApp y las imágenes de los archivos originales.
// FECHAS: la web y la referencia actual indican 9 y 16; los PDF indican 2 y 16.
// Confirmar con producción antes de publicar. El horario se comunica por WhatsApp.
const EVENT = {
  dates: '9 y 16 de noviembre de 2026',
  firstDay: '09', secondDay: '16',
  firstISO: '2026-11-09', secondISO: '2026-11-16',
  whatsapp: 'https://chat.whatsapp.com/CxYf6g0RQVtI0DS7vR0WLN',
};
const IMAGES = {
  principal: '/mundo_estetico/portada.webp',
  dificultad: '/mundo_estetico/analisis-piel.webp',
  beneficios: '/mundo_estetico/criterio-profesional.webp',
  docente: '/mundo_estetico/dianela-draganov.avif',
  cierre: '/mundo_estetico/cuidado-profesional.webp',
};

function Arrow() { return <span aria-hidden="true">↗</span>; }
function Invitation({ compact = false, label = 'Quiero acceder gratis', source = 'contenido' }) {
  return <div className={`me-invitation${compact ? ' me-invitation--compact' : ''}`}>
    <a
      className="me-cta"
      href={EVENT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-location={source}
    >
      <span>{label}</span>
      <Arrow />
    </a>
    {!compact && <p className="me-cta-note">Acceso gratuito · Recibe el enlace y los recordatorios por WhatsApp</p>}
  </div>;
}
function Photo({ src, alt, className = '', priority = false }) {
  const [failed, setFailed] = useState(false);
  return <div className={`me-photo ${className}`}>
    {src && !failed ? <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 760px) 92vw, (max-width: 1100px) 48vw, 560px" className="me-photo-img" onError={() => setFailed(true)} /> : <div className="me-photo-fallback"><span>CE</span><p>Observar. Comprender. Decidir.</p></div>}
  </div>;
}
const benefits = [
  ['01', 'Mirar más allá de lo evidente', 'Dos pieles pueden presentar acné o manchas y necesitar estrategias diferentes. Amplía las preguntas que te haces antes de elegir un abordaje.'],
  ['02', 'Reconocer qué cambia el caso', 'Explora la importancia de la inflamación, la sensibilidad y el contexto de cada piel para comprender por qué una misma secuencia no siempre tiene sentido.'],
  ['03', 'Entender qué atender primero', 'Profundiza en los criterios para establecer prioridades: qué observar antes de actuar y por qué el orden de las decisiones importa.'],
];
const questions = [
  ['¿Las dos masterclasses son gratuitas?', 'Sí. El acceso a estas dos masterclasses es gratuito. El Bootcamp «¿Qué hago con esta piel?» es una formación de pago independiente; unirte a las clases no te obliga a comprarlo.'],
  ['¿Para quién está pensado el contenido?', 'Para cosmetólogas, cosmiatras y profesionales de la estética con conocimientos previos que quieren profundizar en el análisis de la piel. No es una formación inicial desde cero.'],
  ['¿Cómo recibo el acceso?', 'Haz clic en cualquiera de los botones y completa tu ingreso al grupo de WhatsApp. Allí se compartirán los enlaces y recordatorios. Abrir el enlace sin unirte al grupo no completa este paso.'],
  ['¿Cuándo y a qué hora serán?', `Las fechas anunciadas son el ${EVENT.dates}. Consulta el horario y las indicaciones actualizadas en WhatsApp antes de cada encuentro.`],
  ['¿Necesito tener una marca de productos o un equipo específico?', 'El enfoque de estas masterclasses es el análisis y el criterio profesional. Puedes aprovecharlas para reflexionar sobre tus decisiones sin comprar productos ni aparatología para asistir.'],
  ['¿Estas clases me habilitan para diagnosticar o tratar enfermedades?', 'No. Son encuentros educativos para profesionales de la estética. No sustituyen una formación habilitante ni la valoración médica. Cada profesional debe actuar dentro de sus competencias y derivar cuando corresponda.'],
];

export default function Home() {
  const root = useRef(null);
  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('me-enter'); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    root.current.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div className="me-site" ref={root}>
    <a className="me-skip" href="#contenido">Saltar al contenido</a>
    <div className="me-announcement"><span className="me-dot" aria-hidden="true" />2 MASTERCLASSES GRATUITAS <span className="me-announcement-date">· {EVENT.dates}</span></div>
    <main id="contenido">
      <section className="me-hero me-wrap" id="inicio" aria-labelledby="evento">
        <div className="me-hero-copy" data-reveal>
          <p className="me-eyebrow">ONLINE · PARA PROFESIONALES DE LA ESTÉTICA</p>
          <p className="me-event-name">Cada piel, una decisión</p>
          <h1 id="evento">Sabes de tratamientos.<br />Pero ante esta piel…<br /><em>¿qué va primero?</em></h1>
          <p className="me-hero-lead">Acné, manchas, sensibilidad. Cuando todo aparece a la vez, conocer técnicas es solo una parte de la respuesta.</p>
          <p className="me-muted">En estas dos masterclasses gratuitas, amplía tu criterio para analizar cada caso y comprender qué priorizar antes de elegir un abordaje.</p>
          <div className="me-date-chip"><span aria-hidden="true">◷</span><span><strong>{EVENT.dates}</strong><small>Con Dianela Draganov · Coach Estético</small></span></div>
          <Invitation source="hero" label="Quiero unirme a las clases gratuitas" />
          <a className="me-text-link" href="#agenda">Ver de qué trata cada encuentro <span aria-hidden="true">↓</span></a>
        </div>
        <div className="me-hero-visual" data-reveal>
          <Photo src={IMAGES.principal} alt="Análisis profesional de la piel en una cabina de estética" className="me-hero-photo" priority />
          <div className="me-visual-top"><span>UNA MIRADA MÁS ALLÁ<br />DEL PROTOCOLO</span><span aria-hidden="true">✳</span></div>
          <div className="me-floating"><span className="me-floating-icon" aria-hidden="true">◎</span><div><small>EL PUNTO DE PARTIDA</small><strong>Observar antes de actuar.</strong></div></div>
          <div className="me-visual-caption"><span>ACNÉ + MANCHAS</span><p>Una misma manifestación.<br /><em>Distintas decisiones.</em></p></div>
        </div>
      </section>
      <div className="me-facts"><div className="me-wrap"><span><strong>02</strong> encuentros gratuitos</span><span><strong>Online</strong> aprende desde donde estés</span><span><strong>Un enfoque</strong> analizar antes de actuar</span></div></div>

      <section className="me-section me-wrap me-split" aria-labelledby="dudas">
        <div data-reveal><p className="me-eyebrow">SI ALGUNA VEZ HAS DUDADO EN CABINA</p><h2 id="dudas">La piel no siempre sigue<br /><em>el protocolo que aprendiste.</em></h2><p className="me-section-intro">Conoces activos. Has estudiado técnicas. Pero una piel real puede plantearte preguntas que una receta no responde.</p><Photo src={IMAGES.dificultad} alt="Observación de la piel antes de seleccionar un abordaje estético" className="me-inline-photo" /></div>
        <div className="me-pain-list" data-reveal>
          {['«Tiene acné y manchas, pero también está sensibilizada. ¿Por dónde empiezo?»', '«En otras pieles funcionó. ¿Qué está cambiando en este caso?»', '«¿Necesito otra herramienta o entender mejor lo que estoy viendo?»', '«¿Cómo explico por qué elijo un paso antes que otro?»'].map((t, i) => <div className="me-pain" key={t}><span>0{i + 1}</span><p>{t}</p></div>)}
          <div className="me-insight"><p>Tal vez tu siguiente avance no empiece con otro producto.</p><strong>Puede empezar con una mejor pregunta.</strong></div>
        </div>
      </section>

      <section className="me-learning me-section" id="aprendizajes" aria-labelledby="beneficios"><div className="me-wrap">
        <div className="me-section-heading" data-reveal><p className="me-eyebrow">LO QUE VAS A EXPLORAR</p><h2 id="beneficios">Más claridad para pensar.<br /><em>Más criterio para decidir.</em></h2><p>Una primera aproximación a la forma de analizar la piel de Coach Estético.</p></div>
        <div className="me-benefit-grid">{benefits.map(([n, t, d]) => <article className="me-benefit" key={n} data-reveal><span className="me-number">{n}</span><h3>{t}</h3><p>{d}</p><span className="me-card-arrow" aria-hidden="true">↗</span></article>)}</div>
        <div className="me-learning-note"><span aria-hidden="true">✳</span><p>La pregunta que conecta ambos encuentros:<br /><strong>«¿Qué necesito comprender de esta piel antes de decidir qué hacer?»</strong></p></div>
      </div></section>

      <section className="me-section me-wrap" id="agenda" aria-labelledby="clases">
        <div className="me-section-heading me-heading-row" data-reveal><div><p className="me-eyebrow">TU AGENDA DE APRENDIZAJE</p><h2 id="clases">Dos clases.<br /><em>Una nueva perspectiva.</em></h2></div><p>Reserva un espacio para detenerte, revisar tus preguntas y ampliar tu mirada profesional.</p></div>
        <div className="me-agenda-grid">
          <article className="me-session" data-reveal><div className="me-session-top"><span>MASTERCLASS 01</span><span className="me-tag">ACNÉ</span></div><div className="me-session-date"><strong>{EVENT.firstDay}</strong><span>NOVIEMBRE<small>2026 · ONLINE · GRATIS</small></span></div><h3>¿Por qué este acné no mejora aunque estés haciendo todo “bien”?</h3><p>Explora qué puede estar sosteniendo el cuadro y qué variables conviene considerar antes de cambiar el abordaje.</p><ul className="me-check-list"><li>Por qué dos pieles con acné pueden necesitar decisiones distintas.</li><li>Qué preguntas hacerte cuando la evolución no es la esperada.</li><li>La importancia de observar el contexto antes de repetir una secuencia.</li></ul><div className="me-session-footer"><time dateTime={EVENT.firstISO}>9 de noviembre</time><a href={EVENT.whatsapp} target="_blank" rel="noopener noreferrer">Quiero asistir <Arrow /></a></div></article>
          <article className="me-session" data-reveal><div className="me-session-top"><span>MASTERCLASS 02</span><span className="me-tag">MANCHAS</span></div><div className="me-session-date"><strong>{EVENT.secondDay}</strong><span>NOVIEMBRE<small>2026 · ONLINE · GRATIS</small></span></div><h3>La mancha no es el diagnóstico: qué entender antes de despigmentar.</h3><p>Amplía tu mirada sobre la pigmentación y los factores que pueden cambiar las prioridades de un caso.</p><ul className="me-check-list"><li>Por qué una apariencia similar no implica una misma estrategia.</li><li>El papel de la inflamación y la sensibilidad en el análisis.</li><li>Qué comprender antes de decidir por dónde empezar.</li></ul><div className="me-session-footer"><time dateTime={EVENT.secondISO}>16 de noviembre</time><a href={EVENT.whatsapp} target="_blank" rel="noopener noreferrer">Quiero asistir <Arrow /></a></div></article>
        </div>
        <div className="me-center"><Invitation source="agenda" label="Quiero acceder a las dos masterclasses" /><p className="me-small">Consulta el horario actualizado de cada encuentro en WhatsApp.</p></div>
      </section>

      <section className="me-method me-section"><div className="me-wrap me-split">
        <Photo src={IMAGES.beneficios} alt="Profesional revisando la información de un caso de estética" className="me-method-photo" />
        <div data-reveal><p className="me-eyebrow">EL CAMBIO EMPIEZA EN TU FORMA DE MIRAR</p><h2>Antes de elegir<br />una técnica,<br /><em>entiende el caso.</em></h2><p className="me-section-intro">Una piel con acné, marcas y sensibilidad no plantea una sola pregunta. Plantea varias decisiones que necesitan un orden.</p><ol className="me-method-steps"><li><strong>Observar</strong><span>¿Qué estoy viendo y qué información me falta?</span></li><li><strong>Comprender</strong><span>¿Qué variables pueden modificar este caso?</span></li><li><strong>Priorizar</strong><span>¿Qué merece atención antes de elegir el siguiente paso?</span></li></ol><p className="me-small">El análisis y las decisiones siempre deben respetar el alcance de tu práctica profesional.</p></div>
      </div></section>

      <section className="me-section me-wrap me-teacher" id="docente" aria-labelledby="especialista"><div className="me-teacher-visual" data-reveal><Photo src={IMAGES.docente} alt="Dianela Draganov, cosmiatra profesional y dermatocosmiatra" className="me-teacher-photo" /><div className="me-teacher-label"><strong>Dianela Draganov</strong><span>COACH ESTÉTICO</span></div></div><div data-reveal><p className="me-eyebrow">APRENDE EL RAZONAMIENTO DETRÁS DE LA DECISIÓN</p><h2 id="especialista">Tu docente,<br /><em>Dianela Draganov.</em></h2><p className="me-teacher-role">Cosmiatra Profesional · Dermatocosmiatra</p><p>Fundadora, directora académica y docente principal de <strong>Coach Estético</strong>.</p><p>Su metodología parte de una realidad de la práctica estética: puedes conocer muchos tratamientos y aun así dudar frente a una piel real.</p><p>Por eso trabaja sobre la observación, las variables de cada caso y el razonamiento que orienta una elección. El objetivo es comprender por qué una decisión puede tener sentido antes de trasladarla a la práctica.</p><div className="me-teacher-principle">Conocer una herramienta es el comienzo.<br /><strong>Comprender cuándo considerarla amplía tu criterio.</strong></div><Invitation source="docente" label="Quiero aprender en estas clases" /></div></section>

      <section className="me-fit me-section"><div className="me-wrap"><div className="me-section-heading" data-reveal><p className="me-eyebrow">¿ES PARA TI?</p><h2>Si ya tienes conocimientos,<br /><em>da espacio a nuevas preguntas.</em></h2></div><div className="me-fit-grid"><article data-reveal><h3>Este encuentro tiene sentido para ti si…</h3><ul className="me-check-list"><li>Eres cosmetóloga, cosmiatra o profesional de la estética.</li><li>Quieres comprender mejor las diferencias entre casos que parecen similares.</li><li>Te cuesta establecer prioridades cuando conviven varias necesidades.</li><li>Buscas profundizar en el análisis, además de aprender técnicas.</li></ul></article><article className="me-expectation" data-reveal><p className="me-eyebrow">QUÉ PUEDES ESPERAR</p><h3>Formación para ampliar tu criterio.</h3><p>Dos encuentros introductorios sobre acné y manchas. Una oportunidad para conocer el enfoque de Coach Estético y revisar cómo piensas tus decisiones.</p><p>Las clases no sustituyen una formación profesional completa ni ofrecen una receta universal para todas las pieles.</p></article></div></div></section>

      <section className="me-section me-wrap" aria-labelledby="acceso"><div className="me-section-heading me-center" data-reveal><p className="me-eyebrow">TU SIGUIENTE PASO ES SENCILLO</p><h2 id="acceso">Únete hoy.<br /><em>Llega con tus preguntas.</em></h2></div><ol className="me-access-steps"><li><span>01</span><h3>Haz clic en el botón</h3><p>Se abrirá la invitación de WhatsApp.</p></li><li><span>02</span><h3>Completa tu ingreso</h3><p>Únete al grupo para recibir las comunicaciones del evento.</p></li><li><span>03</span><h3>Guarda las fechas</h3><p>Consulta allí el enlace y el horario antes de cada clase.</p></li></ol><div className="me-center"><Invitation source="pasos" label="Recibir mi acceso por WhatsApp" /></div></section>

      <section className="me-faq-section me-section" id="preguntas"><div className="me-wrap me-faq-layout"><div data-reveal><p className="me-eyebrow">ANTES DE UNIRTE</p><h2>Todo claro.<br /><em>Desde el inicio.</em></h2><p className="me-section-intro">Resuelve las dudas más frecuentes sobre el acceso y el enfoque de las clases.</p></div><div className="me-faq-list">{questions.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></section>

      <section className="me-closing me-wrap" aria-labelledby="cierre"><div className="me-closing-inner" data-reveal><Photo src={IMAGES.cierre} alt="Espacio de cuidado facial profesional" className="me-closing-photo" /><div className="me-closing-copy"><p className="me-eyebrow">2 MASTERCLASSES GRATUITAS · {EVENT.dates}</p><h2 id="cierre">La próxima piel<br />traerá nuevas preguntas.<br /><em>Amplía tu forma de responder.</em></h2><p>Empieza por comprender qué observar y qué priorizar.<br />Te esperamos en «Cada piel, una decisión».</p><Invitation source="cierre" label="Sí, quiero unirme gratis" /></div></div></section>
    </main>
    <footer className="me-footer me-wrap"><div><strong>MUNDO ESTÉTICO</strong><span>Cada piel, una decisión.</span></div><p>Difusión de las masterclasses de Coach Estético. Contenido educativo para profesionales de la estética. No sustituye la valoración médica ni amplía las competencias profesionales.</p><a href="#inicio">Volver arriba ↑</a></footer>
    <aside className="me-mobile-cta" aria-label="Acceso gratuito"><span>2 clases online<small>9 y 16 de noviembre</small></span><Invitation compact label="Acceder gratis" source="barra-movil" /></aside>
  </div>;
}
