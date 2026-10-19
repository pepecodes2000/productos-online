"use client";

import { useEffect, useRef, useState } from "react";

// Cambia este enlace una sola vez para actualizar todos los botones.
const WHATSAPP_URL = "https://chat.whatsapp.com/BVriBLILopfFiv7Lcmh29K";

function Icon({ name = "arrow", ...props }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 11h18" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    command: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3m6 0h4" /></>,
    layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5" /></>,
    scale: <><path d="m3 17 14-14 4 4L7 21H3v-4Zm5-5 3 3m1-7 3 3" /></>,
    print: <><path d="M6 9V3h12v6M6 18H3V9h18v9h-3" /><path d="M6 14h12v7H6zM17 11h1" /></>,
    plan: <><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M3 10h18M10 10v11m5-18v7" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    whatsapp: <><path d="M20.5 11.5a8.5 8.5 0 0 1-12.8 7.3L3 20l1.3-4.5A8.5 8.5 0 1 1 20.5 11.5Z" /><path d="M8 7.5c-1 2.8 2.5 6.5 5.5 7.5.9.3 2-.3 2.5-1.5l-2.6-1.3-1 1c-1.5-.8-2.4-1.8-3-3l.8-.9L9 7.5H8Z" /></>,
  };
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name]}</svg>;
}

function trackClick(placement) {
  // Un clic no confirma que la persona haya entrado al grupo.
  const parameters = new URLSearchParams(window.location.search);
  const campaign = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
    const value = parameters.get(key);
    if (value) campaign[key] = value.slice(0, 200);
  });
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "whatsapp_click", placement, ...campaign });
  if (typeof window.fbq === "function") {
    window.fbq("trackCustom", "WhatsAppClick", { placement, ...campaign });
  }
  // No se añaden UTM al enlace de invitación: se conservan en el evento.
}

function JoinButton({ placement, children = "Unirme gratis al grupo", className = "" }) {
  return <a className={`button ${className}`} href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackClick(placement)}><Icon name="whatsapp" /><span>{children}</span><Icon name="arrow" /></a>;
}

const problems = [
  ["clock", "Los planos te toman horas", "Una tarea que parecía sencilla termina ocupando toda la tarde."],
  ["command", "Te detienes en los comandos", "Recuerdas lo que quieres hacer, pero no qué herramienta usar."],
  ["layers", "Las capas se vuelven un lío", "Organizar, corregir y encontrar elementos te quita más tiempo."],
  ["scale", "Dudas con escalas y layouts", "No siempre tienes claro cómo preparar la presentación del plano."],
  ["print", "Imprimir se vuelve otra tarea", "Lo que ves en pantalla no siempre queda como esperabas en papel."],
  ["plan", "Falta ese acabado profesional", "El dibujo está hecho, pero su presentación aún puede mejorar."],
];
const faqs = [
  ["¿Unirme al grupo de WhatsApp tiene algún costo?", "No. Unirte al grupo para recibir la información del lanzamiento es gratis. Esto no implica que el curso completo sea gratuito."],
  ["¿Cuándo se realizará el entrenamiento?", "Los días 26 y 27 de octubre de 2026. Los horarios y demás detalles se comunicarán en el grupo de WhatsApp."],
  ["¿Qué recibiré en el grupo?", "Información sobre el lanzamiento de AutoCAD Master, los detalles del entrenamiento especial y las novedades que se compartan en el grupo."],
  ["¿Necesito dominar AutoCAD?", "La propuesta se dirige a personas interesadas en mejorar su forma de trabajar con AutoCAD. El nivel recomendado y los requisitos específicos se comunicarán en el grupo."],
  ["¿Entrar al grupo me obliga a comprar?", "No. El grupo es para recibir la información del lanzamiento. Podrás conocer los detalles y decidir si la propuesta encaja contigo."],
];

export default function Home() {
  const heroCta = useRef(null);
  const [showSticky, setShowSticky] = useState(false);
  useEffect(() => {
    const node = heroCta.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setShowSticky(!entry.isIntersecting && entry.boundingClientRect.bottom < 0);
    }, { threshold: 0 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="announcement"><span className="status-dot" /> ENTRENAMIENTO ESPECIAL <span className="announcement-date">26 Y 27 OCT · 2026</span></div>
    <header className="site-header wrap">
      <a href="#inicio" className="brand" aria-label="AutoCAD Master, inicio"><span className="brand-mark">A<span /></span><span>AUTOCAD <b>MASTER</b><small>DIBUJA CON CRITERIO.</small></span></a>
      <div className="header-note"><span className="status-dot" /> Grupo de información gratuito</div>
    </header>
    <main id="contenido">
      <section id="inicio" className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">MENOS PRUEBA Y ERROR. MÁS DIRECCIÓN.</p>
            <h1>¿AutoCAD te está <span>frenando?</span></h1>
            <p className="hero-intro">Llevas tiempo usándolo, pero un plano todavía te toma más horas de las que quisieras.</p>
            <p className="muted hero-description">Descubre cómo avanzar hacia una forma de trabajar más ordenada, ágil y con criterio profesional.</p>
            <div className="date-line"><Icon name="calendar" /><div><strong>26 y 27 de octubre de 2026</strong><span>Entrenamiento especial · AutoCAD Master</span></div></div>
            <div ref={heroCta} className="hero-action"><JoinButton placement="hero" /><p className="microcopy"><Icon name="check" /> Acceso gratis al grupo de información</p></div>
          </div>
          <div className="hero-visual">
            <div className="image-topline"><span><i /> ESPACIO DE TRABAJO / CAD</span><span>01 — 03</span></div>
            <img className="hero-image" src="/autocad/estudio-cad.webp" width="1200" height="800" alt="Profesional trabajando frente a un monitor con un plano arquitectónico CAD" fetchPriority="high" />
            <div className="image-caption"><span className="crosshair">+</span><p>Tu siguiente plano empieza<br /><strong>con una forma distinta de trabajar.</strong></p><span className="caption-code">X 026<br />Y 027</span></div>
            <span className="vertical-label" aria-hidden="true">PRECISIÓN / ORDEN / CRITERIO</span>
          </div>
        </div>
      </section>
      <div className="discipline-strip"><div className="wrap"><span>ARQUITECTURA</span><i /><span>INGENIERÍA</span><i /><span>DIBUJO TÉCNICO</span><i /><span>DISEÑO</span></div></div>
      <section className="section wrap" aria-labelledby="problemas">
        <div className="section-heading"><div><p className="eyebrow">01 / EL PUNTO DE PARTIDA</p><h2 id="problemas">Sabes lo que quieres dibujar.<br /><span className="muted">Pero el proceso te detiene.</span></h2></div><p className="heading-description">Si ya usas AutoCAD, es posible que alguna de estas situaciones te resulte familiar.</p></div>
        <div className="problem-grid">{problems.map(([icon, title, text], index) => <article className="problem-card" key={icon}><div className="card-top"><Icon name={icon} /><span>0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>
      <section className="process-section">
        <div className="wrap split-grid">
          <figure className="photo-frame"><img src="/autocad/planos-proceso.webp" width="1200" height="800" loading="lazy" alt="Mano revisando planos arquitectónicos junto a una estación de dibujo CAD" /><figcaption>DEL COMANDO AISLADO AL PROCESO COMPLETO.</figcaption></figure>
          <div><p className="eyebrow">02 / CAMBIA EL ENFOQUE</p><h2>Practicar más ayuda.<br /><span>Trabajar con orden<br />marca la diferencia.</span></h2><p className="body-copy">Conocer herramientas sueltas no siempre significa tener un flujo de trabajo eficiente. Si resuelves cada plano sobre la marcha, es fácil repetir errores y perder tiempo.</p><p className="pull-quote">No se trata solo de saber qué comando usar. También de entender cuándo y para qué.</p><div className="process-tags"><span>01 · Orden</span><span>02 · Proceso</span><span>03 · Criterio</span></div></div>
        </div>
      </section>
      <section className="section wrap" id="entrenamiento">
        <div className="training-panel"><div className="training-copy"><p className="eyebrow">03 / TU SIGUIENTE PASO</p><h2>Conoce <span>AutoCAD Master.</span></h2><p className="body-copy">Los días <strong>26 y 27 de octubre de 2026</strong> se realizará un entrenamiento especial para quienes quieren mejorar su manera de trabajar con AutoCAD.</p><p className="body-copy">Únete al grupo gratuito de WhatsApp para conocer la propuesta y recibir la información del lanzamiento.</p><JoinButton placement="training" /><p className="microcopy">Unirte al grupo es gratis.</p></div><div className="calendar-card"><div>ENTRENAMIENTO ESPECIAL</div><p>26<span> / </span>27</p><strong>OCTUBRE 2026</strong><span className="calendar-line" /><small>Guarda las fechas.<br />Recibe los detalles en WhatsApp.</small></div></div>
        <div className="group-section"><div><p className="eyebrow">DENTRO DEL GRUPO</p><h2>La información,<br />en un solo lugar.</h2></div><ol className="group-list">{[["Información del lanzamiento", "Conoce la propuesta de AutoCAD Master."], ["Detalles del entrenamiento", "Entérate de las indicaciones para el 26 y 27 de octubre."], ["Novedades del evento", "Recibe las actualizaciones que se compartan en el grupo."]].map(([title, text], i) => <li key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div><Icon name="arrow" /></li>)}</ol></div>
      </section>
      <section className="audience-section"><div className="wrap split-grid"><div><p className="eyebrow">04 / PARA QUIENES QUIEREN AVANZAR</p><h2>Tu profesión puede variar.<br /><span>Las ganas de mejorar,<br />se comparten.</span></h2><p className="body-copy">Si dibujas, estudias o trabajas con AutoCAD y quieres ordenar mejor tu proceso, esta propuesta puede interesarte.</p><div className="audience-tags">{["Estudiantes", "Arquitectos", "Ingenieros", "Dibujantes", "Diseñadores", "Delineantes"].map(label => <span key={label}>{label}</span>)}</div></div><figure className="photo-frame"><img src="/autocad/equipo-arquitectura.webp" width="1200" height="800" loading="lazy" alt="Dos profesionales colaborando en un proyecto arquitectónico frente a un portátil" /><figcaption>UN NUEVO PUNTO DE PARTIDA PARA TU PROCESO.</figcaption></figure></div></section>
      <section className="section wrap faq-section"><div><p className="eyebrow">05 / ANTES DE UNIRTE</p><h2>Resolvamos<br /><span>tus dudas.</span></h2><p className="body-copy">Un paso sencillo.<br />Con la información clara.</p></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>
      <section className="final-section"><div className="wrap final-content"><p className="eyebrow">26 Y 27 DE OCTUBRE DE 2026</p><h2>Que tu próximo paso<br />tenga <span>más dirección.</span></h2><p>Deja de resolverlo todo sobre la marcha.<br />Conoce el entrenamiento y decide cómo quieres avanzar.</p><JoinButton placement="final">Unirme gratis a WhatsApp</JoinButton><span className="microcopy">Recibe la información del lanzamiento en el grupo.</span></div></section>
    </main>
    <footer className="wrap footer"><span className="footer-brand">AUTOCAD <b>MASTER</b></span><p>© 2026 · Página informativa de difusión del entrenamiento.<br />AutoCAD es una marca de Autodesk. Esta página no está afiliada a Autodesk ni a Meta. Imágenes ilustrativas.</p></footer>
    {showSticky && <aside className="mobile-sticky" aria-label="Acceso al grupo"><JoinButton placement="mobile-sticky" /></aside>}
  </>;
}
