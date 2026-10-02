"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CircleDollarSign,
  Clock3,
  Flame,
  GraduationCap,
  Laptop,
  PackageCheck,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

const config = {
  price: 35,
  checkoutUrl:
    process.env.NEXT_PUBLIC_VELAS_CHECKOUT_URL ||
    "https://go.hotmart.com/W107414277M?ap=c56e",
  whatsappUrl: process.env.NEXT_PUBLIC_VELAS_WHATSAPP_URL || "https://wa.me/593988342363?text=Hola%2C+quiero+recibir+informaci%C3%B3n+sobre+el+curso+de+Velas+Artesanales+como+Negocio+Creativo.+%C2%BFMe+pueden+enviar+los+detalles%2C+precio+y+todo+lo+que+incluye%3F&utm_source=chatgpt.com",
  youtubeEmbedUrl: "https://www.youtube.com/embed/FtA6FukLdhY?rel=0",
};

const assets = {
  hero: "/velas-artesanales/material/mockup-principal.webp",
  collection: "/velas-artesanales/material/coleccion-velas.webp",
  instructor: "/velas-artesanales/material/instructora-andrea.webp",
};

const modules = [
  {
    number: "01",
    title: "Bienvenida",
    topics: ["Grupo de soporte para alumnos", "Lista de materiales", "Lista de proveedores de moldes e insumos"],
  },
  {
    number: "02",
    title: "Recomendaciones y solución de problemas",
    topics: [
      "Cambios bruscos de temperatura y corrientes de aire",
      "Vertido, curado y exposición a la luz",
      "Manchas blancas, rechupe y velas partidas",
      "Superficies lisas e imperfecciones frecuentes",
    ],
  },
  {
    number: "03",
    title: "Teoría de las ceras",
    topics: [
      "Ceras vegetales, animales y minerales",
      "Puntos de fusión",
      "Ceras de alto y bajo punto de fusión",
      "Numeración y selección de ceras",
    ],
  },
  {
    number: "04",
    title: "Pabilos",
    topics: [
      "Pabilos de algodón y madera",
      "Encerado y armado de mechas",
      "Diámetros de quemado",
      "Sujetadores, pegatinas y pruebas de quemado",
    ],
  },
  {
    number: "05",
    title: "Otros materiales",
    topics: [
      "Colorantes en polvo, micas, pastillas y líquidos",
      "Fragancias, esencias y aceites esenciales",
      "Recipientes, moldes, aditivos, endurecedores y desmoldantes",
    ],
  },
  {
    number: "06",
    title: "Elementos de seguridad",
    topics: [
      "Utensilios indispensables",
      "Medidas preventivas",
      "Calentamiento de moldes y recipientes",
      "Limpieza de utensilios y moldes",
    ],
  },
  {
    number: "07",
    title: "Práctica con ceras de bajo punto de fusión",
    topics: [
      "Soja tradicional y soja con endurecedor",
      "Efecto galleta, crema chantillí y dos colores",
      "Wax melts, velas horneables, en capas y marmoleadas",
      "Coco, yogurt, masaje, cupcake, malteada y capuchino",
      "Terrarios, recordatorios, sprinkles y recipientes de yeso",
    ],
  },
  {
    number: "08",
    title: "Práctica con ceras de alto punto de fusión",
    topics: [
      "Soja en moldes, palma, abeja y parafina",
      "Velas de gel: fondo del mar, sin burbujas y tipo coctel",
      "Velones y combinaciones de ceras",
      "Decoración con servilleta, papel oro y figuras",
    ],
  },
  {
    number: "09",
    title: "Velas navideñas y Halloween",
    topics: [
      "Hombre de nieve, Papá Noel, venado y copos de nieve",
      "Árbol de Navidad y velas de dos colores",
      "Velas infinitas, flotantes y proyectos de Halloween",
    ],
  },
  {
    number: "10",
    title: "Manualidades en resina",
    topics: ["Peine de resina", "Esfero de resina", "Portavelas de resina", "Aretes de resina"],
  },
  {
    number: "11",
    title: "Jabones con glicerina",
    topics: [
      "Materiales, aromas, colorantes y exfoliantes",
      "Derretido, curado y presentación",
      "Aloe vera, lufa, avena con miel y café",
    ],
  },
  {
    number: "12",
    title: "Emprendimiento",
    topics: [
      "Cómo sacar costos de tus velas",
      "Cómo hacer un logo",
      "Empaque y decoración",
      "Facebook, TikTok y WhatsApp Business",
      "Cómo crear videos para tus páginas",
    ],
  },
  {
    number: "13",
    title: "Portavelas",
    topics: [
      "Lista de materiales y recomendaciones",
      "Color de mezclas",
      "Yeso, cemento, marmolina y resina",
    ],
  },
  {
    number: "14",
    title: "Actualizaciones",
    topics: [
      "Ramo de flores con palillos y flores secas",
      "Vela tipo postre, flor gigante y base de cemento",
      "Vela tipo torta",
      "Vinilos adhesivos y etiquetas",
    ],
  },
  {
    number: "15",
    title: "Moldes de silicona",
    topics: ["Replica una figura", "Crea tu primer molde", "Moldes con color", "Moldes con recipiente desechable"],
  },
];

const bonuses = [
  { number: "01", title: "Excel de costos y presupuestos", image: "/velas-artesanales/material/bonus-costos.jpg", text: "Deja de calcular a ojo: organiza materiales, gastos y presupuestos para entender mejor cuánto te cuesta elaborar tus productos.", benefit: "Más claridad al momento de pensar en precios.", priority: true },
  { number: "02", title: "Lista de proveedores", image: "/velas-artesanales/material/bonus-proveedores.jpg", text: "Empieza con una referencia organizada de proveedores de moldes e insumos en lugar de buscar todo desde cero.", benefit: "Ahorra tiempo buscando dónde conseguir materiales.", priority: true },
  { number: "03", title: "Guía de empaquetado", image: "/velas-artesanales/material/bonus-empaquetado.jpg", text: "Aprende ideas para mejorar la presentación de tus creaciones y darles una apariencia más cuidada cuando quieras ofrecerlas.", benefit: "Mayor sensación de producto terminado.", priority: true },
  { number: "04", title: "Grupo de apoyo", image: "/velas-artesanales/material/bonus-soporte.jpg", text: "Forma parte del espacio de apoyo para alumnos y consulta dudas mientras avanzas con tu aprendizaje.", benefit: "Acompañamiento durante el proceso.", priority: true },
  { number: "05", title: "Módulo de portavelas", image: "/velas-artesanales/material/bonus-portavelas.jpg", text: "Aprende proyectos complementarios utilizando materiales como yeso, cemento, marmolina y resina.", benefit: "Más posibilidades para complementar una colección." },
  { number: "06", title: "Jabones artesanales en glicerina", image: "/velas-artesanales/material/bonus-jabones.jpg", text: "Conoce materiales, aromas, colorantes, exfoliantes y preparaciones prácticas para crear jabones de glicerina.", benefit: "Posibilidad de ampliar tu catálogo artesanal." },
  { number: "07", title: "Manualidades en resina", image: "/velas-artesanales/material/bonus-resina.jpg", text: "Explora proyectos sencillos de resina que pueden ampliar tus posibilidades creativas más allá de las velas.", benefit: "Mayor variedad de productos." },
  { number: "08", title: "Módulo de actualizaciones", image: "/velas-artesanales/material/bonus-actualizaciones.webp", text: "Accede a proyectos y técnicas que se añaden dentro de las actualizaciones incluidas en el programa.", benefit: "Seguir encontrando nuevas ideas sin empezar desde cero." },
  { number: "09", title: "Certificado de finalización", image: "/velas-artesanales/material/bonus-certificado.jpg", text: "Al completar el programa, el productor informa que tendrás disponible un certificado de finalización.", benefit: "Cierre y reconocimiento del proceso realizado." },
];

const testimonials = [
  "/velas-artesanales/material/testimonio-1.jpg",
  "/velas-artesanales/material/testimonio-2.jpg",
  "/velas-artesanales/material/testimonio-3.jpg",
  "/velas-artesanales/material/testimonio-4.jpg",
  "/velas-artesanales/material/testimonio-5.jpg",
  "/velas-artesanales/material/testimonio-6.webp",
];

const faqs = [
  { q: "¿Necesito experiencia previa para comenzar?", a: "No. El programa está pensado para que puedas comenzar desde cero. Primero conocerás materiales, ceras, pabilos, seguridad y conceptos fundamentales antes de avanzar hacia técnicas y proyectos más completos." },
  { q: "¿Cómo recibo el curso después de realizar la compra?", a: "Una vez que Hotmart confirme tu pago, recibirás en el correo utilizado durante la compra las instrucciones para ingresar al área privada de alumnos donde se encuentra el contenido del curso." },
  { q: "¿Cuándo puedo empezar a ver las clases?", a: "Podrás comenzar cuando tu compra sea confirmada y recibas tus datos de acceso. Al tratarse de una formación digital, no necesitas esperar el envío de ningún producto físico." },
  { q: "¿Por cuánto tiempo tendré acceso?", a: "La información actual del programa indica que el acceso es de por vida, por lo que podrás avanzar a tu ritmo y volver a consultar las clases cuando lo necesites." },
  { q: "¿Qué métodos de pago puedo utilizar?", a: "La compra se procesa mediante Hotmart. En el checkout se mostrarán los medios de pago disponibles según tu país y las condiciones aplicables a tu compra." },
  { q: "¿Desde qué dispositivo puedo estudiar?", a: "El curso es digital y se encuentra alojado en Hotmart. Podrás consultar las clases desde dispositivos compatibles con la plataforma y avanzar desde donde te resulte más cómodo." },
  { q: "¿Qué pasa si compro y luego veo que no es para mí?", a: "La información actual del programa indica una garantía de 7 días. Si necesitas solicitar un reembolso dentro de ese periodo, el proceso se gestiona mediante Hotmart conforme a las condiciones aplicables." },
];

function CTA({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <a
      className={`primary-cta ${className}`.trim()}
      href={config.checkoutUrl}
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

export default function VelasArtesanalesPage() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showMobileBuyBar, setShowMobileBuyBar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWhatsApp(true), 10000);
    const trigger = document.getElementById("cta-principal");
    if (!trigger) return () => clearTimeout(timer);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowMobileBuyBar(true);
      },
      { threshold: 0.25 }
    );
    observer.observe(trigger);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <main className="velas-page">
      <section className="hero" id="inicio">
        <div className="hero-glow hero-glow-one" /><div className="hero-glow hero-glow-two" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <span className="hero-kicker">VELAS ARTESANALES COMO NEGOCIO CREATIVO</span>
            <h1>Empieza a crear <mark>Velas a tu Ritmo</mark> con una ruta clara y evita frustarte.</h1>
            <p className="hero-lead">Sigue una ruta organizada para descubrir qué materiales usar y avanzar desde cero con proyectos prácticos hasta crear velas que te sientas orgullosa de mostrar y presentar como productos.</p>
            <div className="hero-badges" aria-label="Resumen del curso">
              <span><PlayCircle /> +135 clases grabadas</span><span><BookOpenCheck /> 15 módulos</span><span><Clock3 /> Acceso de por vida</span>
            </div>
          </div>
          <div className="hero-media"><div className="hero-mockup"><Image src={assets.hero} alt="Curso Velas Artesanales como Negocio Creativo" fill priority sizes="(max-width: 900px) 94vw, 48vw" /></div><div className="hero-float hero-float-top"><BadgeCheck /><span><b>Desde cero</b> paso a paso</span></div><div className="hero-float hero-float-bottom"><GraduationCap /><span><b>15 módulos</b> ruta organizada</span></div></div>
        </div>
      </section>

      <section className="section problem-section" id="problema"><div className="shell narrow-copy"><span className="section-kicker">¿TE SUENA FAMILIAR?</span><h2>¿Te gustaría empezar a crear velas para vender, pero no sabes realmente por dónde comenzar?</h2><p>Quizás has visto tutoriales, guardado ideas o comprado algunos materiales, pero sigues teniendo dudas sobre qué cera usar, qué pabilo elegir, cuánto aroma añadir o qué necesitas para obtener un buen resultado.</p><p>Y mientras sigues buscando información por separado, pasa el tiempo, aumenta la confusión y ese proyecto de crear algo propio sigue quedando para “después”.</p><div className="transition-note">Ahí es donde tener una ruta clara puede cambiar completamente la forma de empezar.</div></div></section>

      <section className="video-section" aria-labelledby="video-title">
        <div className="shell video-shell">
          <div className="section-intro centered compact">
            <span className="section-kicker">CONOCE EL PROGRAMA</span>
            <h2 id="video-title">Mira la presentación del curso</h2>
          </div>
          <div className="youtube-frame">
            <iframe
              src={config.youtubeEmbedUrl}
              title="Velas Artesanales Actualización - presentación del curso"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="section solution-section" id="solucion"><div className="shell solution-grid"><div className="solution-copy"><span className="section-kicker">UNA RUTA CLARA</span><h2>Aprende siguiendo un proceso organizado desde los fundamentos hasta tus propios proyectos</h2><p><strong>Velas Artesanales como Negocio Creativo</strong> reúne en una misma formación lo que necesitas para comenzar desde cero: materiales, ceras, pabilos, fragancias, seguridad, técnicas y proyectos prácticos.</p><p>En lugar de intentar unir información dispersa, puedes avanzar paso a paso, volver a consultar las clases cuando lo necesites y aprender a tu propio ritmo mientras conviertes la teoría en práctica.</p><div className="transition-note">Pero aprender la técnica es solo una parte: lo importante es lo que podrás hacer con ella.</div></div><div className="solution-image panel-image"><Image src={assets.collection} alt="Colección de velas artesanales" fill sizes="(max-width: 900px) 92vw, 42vw" /></div></div></section>

      <section className="section benefits-simple" id="beneficios"><div className="shell"><div className="section-intro centered"><span className="section-kicker">MÁS QUE HACER VELAS</span><h2>No se trata solamente de aprender a hacer velas</h2><p>Desarrolla seguridad para escoger materiales, entender procesos, evitar errores comunes y comenzar a pensar tus creaciones con una visión de producto.</p></div><div className="benefit-story-grid"><article><Flame /><h3>Técnica y variedad</h3><p>Aprende distintos estilos y presentaciones mientras comprendes ceras, pabilos, fragancias, moldes y procesos.</p></article><article><CircleDollarSign /><h3>Costos con más claridad</h3><p>Conoce bases para organizar costos y presupuestos cuando quieras pensar en precios para tus productos.</p></article><article><PackageCheck /><h3>Presentación cuidada</h3><p>Trabaja empaque y presentación para que tus creaciones transmitan una mayor sensación de producto terminado.</p></article><article><Laptop /><h3>Herramientas para mostrarte</h3><p>El temario incluye elementos básicos de marca y uso de Facebook, TikTok y WhatsApp Business.</p></article></div></div></section>

      <section className="curriculum-section section" id="temario"><div className="shell curriculum-grid"><aside className="curriculum-heading"><span className="section-kicker">QUÉ INCLUYE</span><h2>Una formación que avanza contigo desde cero</h2><p>15 módulos y más de 135 clases grabadas: fundamentos, proyectos, técnicas complementarias y contenidos para el lado práctico del emprendimiento.</p><div className="curriculum-mini-card"><BookOpenCheck /><div><strong>Vista resumida primero</strong><span>Abre solo el módulo que quieras consultar.</span></div></div></aside><div className="module-list">{modules.map((module, index) => (<details key={module.number} open={index === 0}><summary><span className="module-number">{module.number}</span><span className="module-title">{module.title}</span><span className="module-plus">+</span></summary><ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></details>))}</div></div></section>

      <section className="testimonials-section section" id="testimonios"><div className="shell"><div className="section-intro centered light"><span className="section-kicker">PRUEBA SOCIAL</span><h2>Mira la experiencia de personas que ya han pasado por el programa</h2><p>Capturas de testimonios compartidos dentro del material del curso.</p></div><div className="testimonials-grid">{testimonials.map((src, index) => (<figure key={src} className="testimonial-card"><Image src={src} alt={`Testimonio de estudiante ${index + 1}`} fill sizes="(max-width: 680px) 88vw, (max-width: 1000px) 43vw, 30vw" /></figure>))}</div><div className="instructor-inline"><div className="instructor-inline-photo panel-image"><Image src={assets.instructor} alt="Andrea, instructora del programa" fill sizes="160px" /></div><div><span>¿CON QUIÉN APRENDERÁS?</span><h3>Conoce a Andrea</h3><p>Soy una emprendedora colombiana con más de 3 años de 
experiencia en la creación, producción y venta de velas artesanales. He creado 
este curso online, para compartir lo que esté lindo arte de las velas artesanales  
me ha enseñado con el fin de que más y más personas aprendan y emprendan 
sus propios negocios desde casa, te guiaré desde cero para que puedas crear 
tus velas de forma fácil y divertida como todo un profesional  y así puedas 
emprender desde casa como yo..</p></div></div></div></section>

      <section className="section first-offer-section" id="cta-inicial"><div className="shell"><div className="decision-card"><span className="section-kicker">TU PRIMER PASO</span><h2>Ya no necesitas seguir preguntándote por dónde empezar</h2><p>Si quieres aprender a crear velas siguiendo una ruta organizada y comenzar a desarrollar una habilidad que puedas transformar en tus propios productos, puedes dar el primer paso hoy.</p><div className="decision-price"><small>ACCESO COMPLETO AL PROGRAMA</small><strong>${config.price} USD</strong></div><CTA>QUIERO EMPEZAR A CREAR MIS VELAS POR ${config.price} USD</CTA><div className="trust-line"><ShieldCheck /> Acceso digital · Pago gestionado por Hotmart · Garantía informada de 7 días</div></div></div></section>

      <section className="bonuses-section section" id="bonos"><div className="shell"><div className="section-intro centered"><span className="section-kicker">🎁 REGALOS ESPECIALES</span><h2>Para que no tengas que descubrir todo por tu cuenta</h2><p>Aprender a crear una vela es solo una parte. También necesitas saber cuánto te cuesta, dónde conseguir materiales, cómo presentarla y qué hacer cuando aparezcan dudas.</p></div><div className="bonus-grid">{bonuses.map((bonus) => (<article className={`bonus-card ${bonus.priority ? "bonus-priority" : ""}`} key={bonus.number}><div className="bonus-image"><Image src={bonus.image} alt={bonus.title} fill sizes="(max-width: 680px) 88vw, (max-width: 1050px) 42vw, 29vw" /></div><div className="bonus-copy"><span>REGALO ESPECIAL {bonus.number}</span><h3>{bonus.title}</h3><p>{bonus.text}</p><b>{bonus.benefit}</b></div></article>))}</div><div className="value-summary"><h3>No estás recibiendo solamente un curso de velas</h3><p>Estás accediendo a una ruta completa para aprender desde cero, practicar diferentes técnicas y comenzar a entender también el lado de costos, proveedores, presentación y emprendimiento.</p><div className="value-pills"><span>+135 clases grabadas</span><span>15 módulos</span><span>Proyectos prácticos</span><span>Emprendimiento</span><span>Grupo de apoyo</span><span>Acceso de por vida</span><span>Certificado</span><span>9 regalos especiales</span></div><strong>Todo está pensado para que dejes de acumular información y empieces a convertir lo que aprendes en algo que realmente puedas crear.</strong></div></div></section>

      <section className="main-cta-section section" id="cta-principal"><div className="shell"><div className="main-decision-card"><Flame className="final-flame" /><span className="section-kicker">ACCESO COMPLETO</span><h2>Puedes seguir guardando ideas y pensando “algún día empiezo”… o comenzar hoy con una ruta clara.</h2><p>No necesitas saberlo todo antes de empezar. Aprende desde cero, practica a tu ritmo y construye las bases para crear velas que puedas comenzar a presentar como tus propios productos.</p><div className="main-price"><small>ACCESO COMPLETO · PAGO ÚNICO</small><strong>${config.price} USD</strong></div><CTA>QUIERO EMPEZAR MI CAMINO CON LAS VELAS POR ${config.price} USD</CTA><div className="trust-line light-trust"><ShieldCheck /> Acceso digital · Pago gestionado por Hotmart · Acceso de por vida · Garantía informada de 7 días</div></div></div></section>

      <section className="faq-section section" id="faq"><div className="shell faq-grid"><div className="faq-heading"><span className="section-kicker">PREGUNTAS FRECUENTES</span><h2>Resuelve las últimas dudas antes de comenzar</h2><p>Abre únicamente la pregunta que necesites consultar.</p></div><div className="faq-list">{faqs.map((faq) => (<details key={faq.q}><summary>{faq.q}<span>+</span></summary><p>{faq.a}</p></details>))}</div></div></section>

      <section className="final-cta-section"><div className="shell final-cta-inner"><Flame className="final-flame" /><h2>Tu idea de empezar con las velas puede quedarse para después… o puede comenzar hoy.</h2><p>No necesitas tener experiencia ni saberlo todo. Solo necesitas dar el primer paso y seguir una ruta clara.</p><div className="final-price">Acceso completo: <strong>${config.price} USD</strong></div><CTA>QUIERO EMPEZAR HOY POR ${config.price} USD</CTA><div className="final-trust">Acceso digital · Pago gestionado por Hotmart · Acceso de por vida · Garantía informada de 7 días</div><small>Los resultados comerciales dependen de la práctica, aplicación, producto, mercado y circunstancias de cada persona.</small></div></section>

      <footer className="site-footer"><div className="shell footer-inner"><div className="footer-brand"><Flame /><span><strong>VELAS ARTESANALES</strong><small>NEGOCIO CREATIVO</small></span></div><p>Meta Ads (Facebook e Instagram) únicamente muestra este anuncio. La decisión de compra depende exclusivamente del valor de esta página y de si esta solución es adecuada para ti.</p></div></footer>

      {showMobileBuyBar ? <div className="mobile-buy-bar"><div><small>ACCESO COMPLETO</small><strong>${config.price} USD</strong></div><a href={config.checkoutUrl} target="_blank" rel="noreferrer">EMPEZAR HOY</a></div> : null}
      {config.whatsappUrl && showWhatsApp ? <div className="whatsapp-support"><div className="whatsapp-message"><strong>¿Necesitas información? 👋</strong><span>Escríbenos y te contamos todo sobre el curso.</span></div><a className="whatsapp-float" href={config.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Consultar información del curso por WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true" className="whatsapp-icon"><path fill="currentColor" transform="translate(2 0.5)" d="M19.11 17.23c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.45 1.55.57.65.21 1.24.18 1.71.11.52-.08 1.58-.65 1.8-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" /><path fill="currentColor" d="M16.03 3.2c-7.08 0-12.84 5.76-12.84 12.84 0 2.26.59 4.47 1.72 6.42L3.1 28.8l6.5-1.71a12.8 12.8 0 0 0 6.43 1.73h.01c7.08 0 12.84-5.76 12.84-12.84S23.11 3.2 16.03 3.2zm0 23.43h-.01a10.57 10.57 0 0 1-5.39-1.47l-.39-.23-3.86 1.01 1.03-3.76-.25-.39a10.58 10.58 0 1 1 8.87 4.84z" /></svg></a></div> : null}
    </main>
  );
}

