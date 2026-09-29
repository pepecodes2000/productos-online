"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Check,
  CircleDollarSign,
  Clock3,
  Flame,
  Gift,
  GraduationCap,
  HeartHandshake,
  Laptop,
  PackageCheck,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const config = {
  price: 35,
  checkoutUrl:
    process.env.NEXT_PUBLIC_VELAS_CHECKOUT_URL ||
    "https://go.hotmart.com/W107414277M?ap=c56e&utm_source=landing_velas",
  whatsappUrl: process.env.NEXT_PUBLIC_VELAS_WHATSAPP_URL || "https://wa.me/593988342363?text=Hola%2C+quiero+recibir+informaci%C3%B3n+sobre+el+curso+de+Velas+Artesanales+como+Negocio+Creativo.+%C2%BFMe+pueden+enviar+los+detalles%2C+precio+y+todo+lo+que+incluye%3F&utm_source=chatgpt.com",
  youtubeEmbedUrl: "https://www.youtube.com/embed/FtA6FukLdhY?rel=0",
};

const assets = {
  hero: "/velas-artesanales/material/mockup-principal.png",
  projects: "/velas-artesanales/material/proyectos-curso.png",
  collection: "/velas-artesanales/material/coleccion-velas.png",
  instructor: "/velas-artesanales/material/instructora-andrea.png",
  certificate: "/velas-artesanales/material/bonus-certificado.jpg",
};

const fitItems = [
  "Te apasionan las velas artesanales y quieres aprender con una ruta clara.",
  "Te gustan las manualidades y buscas una formación práctica, explicada paso a paso.",
  "Quieres comenzar desde cero, aunque todavía no conozcas ceras, pabilos o temperaturas.",
  "Te interesa crear productos artesanales para uso personal, regalos o un catálogo propio.",
  "Quieres entender también costos, empaque y herramientas digitales para presentar tu trabajo.",
];

const opportunityCards = [
  {
    icon: PackageCheck,
    title: "Empaque y presentación",
    text: "Aprende ideas para empacar y presentar mejor tus velas cuando quieras convertirlas en un producto.",
  },
  {
    icon: Flame,
    title: "Técnica y variedad",
    text: "Trabaja con diferentes ceras, recipientes, moldes, pabilos, fragancias, acabados y estilos de vela.",
  },
  {
    icon: Sparkles,
    title: "Resina como complemento",
    text: "Amplía tus posibilidades creativas con proyectos complementarios de manualidades en resina.",
  },
  {
    icon: Gift,
    title: "Jabones de glicerina",
    text: "Incluye un módulo para aprender materiales, aromas, exfoliantes y proyectos de jabones artesanales.",
  },
  {
    icon: CircleDollarSign,
    title: "Costos y presupuestos",
    text: "Recibe un Excel para organizar costos y presupuestos de manera más clara al planificar tus productos.",
  },
  {
    icon: PlayCircle,
    title: "+135 clases grabadas",
    text: "Accede a una biblioteca amplia de clases en video para avanzar a tu ritmo y volver a consultar cuando lo necesites.",
  },
];

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

const courseBenefits = [
  {
    icon: Laptop,
    title: "Estudia desde donde estés",
    text: "Accede a las clases online desde dispositivos compatibles y vuelve a revisarlas cuando lo necesites.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento",
    text: "El programa incluye un grupo privado de alumnos para resolver dudas durante tu proceso de aprendizaje.",
  },
  {
    icon: Clock3,
    title: "Acceso de por vida",
    text: "Realizas un único pago y conservas el acceso al curso y a sus actualizaciones incluidas.",
  },
  {
    icon: ShieldCheck,
    title: "Garantía de 7 días",
    text: "La página oficial informa una garantía de 7 días gestionada dentro de la plataforma de Hotmart.",
  },
];

const bonuses = [
  {
    number: "01",
    title: "Módulo de portavelas",
    image: "/velas-artesanales/material/bonus-portavelas.jpg",
    text: "Proyectos con yeso, cemento, marmolina y resina.",
  },
  {
    number: "02",
    title: "Jabones artesanales en glicerina",
    image: "/velas-artesanales/material/bonus-jabones.jpg",
    text: "Materiales, aromas, colorantes, exfoliantes y preparaciones prácticas.",
  },
  {
    number: "03",
    title: "Manualidades en resina",
    image: "/velas-artesanales/material/bonus-resina.jpg",
    text: "Complementa tu formación con proyectos sencillos de resina.",
  },
  {
    number: "04",
    title: "Lista de proveedores",
    image: "/velas-artesanales/material/bonus-proveedores.jpg",
    text: "Referencia de proveedores de moldes e insumos organizada por país.",
  },
  {
    number: "05",
    title: "Grupo de apoyo",
    image: "/velas-artesanales/material/bonus-soporte.jpg",
    text: "Espacio privado para alumnos y acompañamiento durante el aprendizaje.",
  },
  {
    number: "06",
    title: "Guía de empaquetado",
    image: "/velas-artesanales/material/bonus-empaquetado.jpg",
    text: "Ideas para mejorar la presentación de tus velas y preparar productos más cuidados.",
  },
  {
    number: "07",
    title: "Certificado",
    image: "/velas-artesanales/material/bonus-certificado.jpg",
    text: "Certificado de finalización al completar el programa, según lo informado por el productor.",
  },
  {
    number: "08",
    title: "Excel de costos y presupuestos",
    image: "/velas-artesanales/material/bonus-costos.jpg",
    text: "Herramienta de apoyo para organizar costos y presupuestos de tus productos.",
  },
  {
    number: "09",
    title: "Módulo de actualizaciones",
    image: "/velas-artesanales/material/bonus-actualizaciones.png",
    text: "Nuevos proyectos y técnicas añadidas al contenido del programa.",
  },
];

const testimonials = [
  "/velas-artesanales/material/testimonio-1.jpg",
  "/velas-artesanales/material/testimonio-2.jpg",
  "/velas-artesanales/material/testimonio-3.jpg",
  "/velas-artesanales/material/testimonio-4.jpg",
  "/velas-artesanales/material/testimonio-5.jpg",
  "/velas-artesanales/material/testimonio-6.png",
];

const faqs = [
  {
    q: "¿Necesito experiencia previa?",
    a: "No. El curso parte desde materiales, seguridad, ceras y pabilos, y después avanza hacia técnicas y proyectos prácticos.",
  },
  {
    q: "¿Cómo recibo el curso después de comprar?",
    a: "Según la información oficial, después de que Hotmart confirma el pago recibes en el correo utilizado en la compra las instrucciones para acceder al área privada de alumnos.",
  },
  {
    q: "¿El acceso tiene límite de tiempo?",
    a: "La página del productor indica que el curso se entrega con acceso de por vida y acceso a las actualizaciones incluidas.",
  },
  {
    q: "¿Dónde veo las clases?",
    a: "El curso es digital y se encuentra alojado en Hotmart. Las clases se consultan dentro del área de alumnos.",
  },
  {
    q: "¿Incluye ayuda para emprender?",
    a: "Sí. El temario incluye costos, logo, empaque, Facebook, TikTok, WhatsApp Business y creación de videos para redes.",
  },
  {
    q: "¿Tiene garantía?",
    a: "Sí. La página oficial informa una garantía de 7 días. Las condiciones y el proceso de reembolso se gestionan según las políticas aplicables en Hotmart.",
  },
  {
    q: "¿Qué medios de pago puedo usar?",
    a: "Hotmart mostrará en el checkout los medios de pago disponibles para tu país y tu compra.",
  },
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsApp(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="velas-page">
      <section className="hero" id="inicio">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <h1>
              Aprende a crear <mark>velas artesanales</mark> desde cero, aunque no tengas experiencia
            </h1>
            <p className="hero-lead">
              Conoce materiales, ceras, pabilos, fragancias, técnicas decorativas y proyectos prácticos, además de contenidos para organizar costos, empaque y presencia digital.
            </p>
            <div className="hero-badges" aria-label="Resumen del curso">
              <span><PlayCircle /> +135 clases grabadas</span>
              <span><BookOpenCheck /> 15 módulos</span>
              <span><Gift /> 9 bonos destacados</span>
            </div>
            <div className="hero-offer-row">
              <CTA>INSCRIPCIONES POR EL 50% DE DESCUENTO</CTA>
            </div>
            <p className="secure-copy"><ShieldCheck /> Compra procesada a través de Hotmart.</p>
          </div>
          <div className="hero-media">
            <div className="hero-mockup">
              <Image
                src={assets.hero}
                alt="Mockup del curso de velas artesanales con certificado, materiales y bonos"
                fill
                priority
                sizes="(max-width: 900px) 94vw, 48vw"
              />
            </div>
            <div className="hero-float hero-float-top"><BadgeCheck /><span><b>Desde cero</b> paso a paso</span></div>
            <div className="hero-float hero-float-bottom"><GraduationCap /><span><b>Certificado</b> al finalizar</span></div>
          </div>
        </div>
      </section>

      <section className="video-section" aria-labelledby="video-title">
        <div className="shell video-shell">
          <div className="section-intro centered compact">
            <span className="section-kicker">CONOCE EL PROGRAMA</span>
            <h2 id="video-title">Mira la presentación del curso</h2>
            <p>Este es el video que el productor utiliza actualmente en la página oficial del programa.</p>
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

      <section className="fit-section section" id="para-ti">
        <div className="shell fit-grid">
          <div className="fit-image panel-image">
            <Image
              src={assets.collection}
              alt="Colección de diferentes estilos de velas artesanales"
              fill
              sizes="(max-width: 900px) 92vw, 42vw"
            />
          </div>
          <div className="fit-copy">
            <span className="section-kicker">ESTE CURSO ES PARA TI SI...</span>
            <h2>Quieres dejar de aprender con información dispersa y seguir una ruta práctica</h2>
            <div className="fit-list">
              {fitItems.map((item) => (
                <div key={item}><Check /><p>{item}</p></div>
              ))}
            </div>
            <CTA>QUIERO EMPEZAR POR ${config.price} USD</CTA>
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="shell statement-inner">
          <Flame />
          <p>NO SOLO APRENDES A HACER VELAS: <strong>APRENDES UNA HABILIDAD CREATIVA Y LAS BASES PARA PRESENTARLA COMO PRODUCTO.</strong></p>
        </div>
      </section>

      <section className="section opportunity-section" id="beneficios">
        <div className="shell">
          <div className="section-intro centered">
            <span className="section-kicker">UNA FORMACIÓN MÁS COMPLETA</span>
            <h2>Lo que encontrarás dentro del programa</h2>
            <p>La estructura conserva los pilares que el productor destaca en su página: técnica, variedad de proyectos, materiales complementarios y emprendimiento.</p>
          </div>
          <div className="opportunity-grid">
            {opportunityCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="opportunity-card" key={card.title}>
                  <div className="opportunity-icon"><Icon /></div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="projects-section section" id="proyectos">
        <div className="shell">
          <div className="section-intro centered light">
            <span className="section-kicker">PROYECTOS DEL CURSO</span>
            <h2>Explora diferentes estilos, ceras y presentaciones</h2>
            <p>Desde velas tipo postre y recipientes hasta gel, parafina, masaje y diseños en tendencia.</p>
          </div>
          <div className="projects-showcase">
            <div className="project-main panel-image">
              <Image src={assets.projects} alt="Ejemplos de proyectos incluidos en el curso de velas" fill sizes="(max-width: 900px) 94vw, 64vw" />
            </div>
            <div className="project-side">
              <div className="mini-stat"><strong>15</strong><span>módulos organizados</span></div>
              <div className="mini-stat"><strong>+135</strong><span>clases grabadas</span></div>
              <div className="mini-stat"><strong>9</strong><span>bonos destacados</span></div>
              <div className="mini-stat"><strong>1</strong><span>pago de ${config.price} USD</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="curriculum-section section" id="temario">
        <div className="shell curriculum-grid">
          <aside className="curriculum-heading">
            <span className="section-kicker">TEMARIO DEL CURSO</span>
            <h2>Una ruta que va de los fundamentos a la práctica</h2>
            <p>Abre cada módulo para revisar sus temas principales.</p>
            <div className="curriculum-mini-card">
              <BookOpenCheck />
              <div><strong>15 módulos</strong><span>incluyendo práctica, emprendimiento y actualizaciones.</span></div>
            </div>
          </aside>
          <div className="module-list">
            {modules.map((module, index) => (
              <details key={module.number} open={index === 0}>
                <summary>
                  <span className="module-number">{module.number}</span>
                  <span className="module-title">{module.title}</span>
                  <span className="module-plus">+</span>
                </summary>
                <ul>
                  {module.topics.map((topic) => <li key={topic}>{topic}</li>)}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="course-benefits section">
        <div className="shell">
          <div className="section-intro centered light compact">
            <span className="section-kicker">BENEFICIOS DEL CURSO</span>
            <h2>Formación online pensada para que avances a tu ritmo</h2>
          </div>
          <div className="benefits-grid">
            {courseBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title}>
                  <Icon />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="offer-section section" id="oferta">
        <div className="shell offer-grid">
          <div className="offer-visual">
            <div className="offer-image panel-image">
              <Image src={assets.hero} alt="Contenido y materiales del curso de velas artesanales" fill sizes="(max-width: 900px) 92vw, 47vw" />
            </div>
          </div>
          <div className="offer-card">
            <span className="section-kicker">ACCESO AL PROGRAMA</span>
            <h2>Empieza tu formación completa en velas artesanales</h2>
            <p className="offer-description">Un único acceso reúne clases, proyectos, emprendimiento, materiales complementarios, soporte y bonos.</p>
            <div className="offer-includes">
              <span><Check /> +135 clases grabadas en video</span>
              <span><Check /> 15 módulos de formación</span>
              <span><Check /> 9 bonos destacados</span>
              <span><Check /> Grupo de apoyo para alumnos</span>
              <span><Check /> Acceso de por vida</span>
              <span><Check /> Certificado al finalizar</span>
              <span><Check /> Garantía informada de 7 días</span>
            </div>
            <div className="price-block">
              <small>PRECIO DEL ACCESO</small>
              <div className="price-line"><span>$</span><strong>{config.price}</strong><b>USD</b></div>
              <p>Hotmart puede mostrar el valor equivalente y los medios de pago disponibles según tu país.</p>
            </div>
            <CTA className="offer-cta">QUIERO ACCEDER POR ${config.price} USD</CTA>
            <div className="payment-note"><ShieldCheck /><span>Pago gestionado en Hotmart</span></div>
          </div>
        </div>
      </section>

      <section className="bonuses-section section" id="bonos">
        <div className="shell">
          <div className="section-intro centered">
            <span className="section-kicker">BONOS INCLUIDOS</span>
            <h2>Material complementario para ampliar tu aprendizaje</h2>
            <p>Estos son los bonos y recursos destacados actualmente por el productor.</p>
          </div>
          <div className="bonus-grid">
            {bonuses.map((bonus) => (
              <article className="bonus-card" key={bonus.number}>
                <div className="bonus-image">
                  <Image src={bonus.image} alt={bonus.title} fill sizes="(max-width: 680px) 88vw, (max-width: 1050px) 42vw, 29vw" />
                </div>
                <div className="bonus-copy">
                  <span>BONO {bonus.number}</span>
                  <h3>{bonus.title}</h3>
                  <p>{bonus.text}</p>
                  <b>INCLUIDO CON TU ACCESO</b>
                </div>
              </article>
            ))}
          </div>
          <div className="bonuses-cta"><CTA>QUIERO EL CURSO + BONOS POR ${config.price} USD</CTA></div>
        </div>
      </section>

      <section className="instructor-section section" id="instructora">
        <div className="shell instructor-grid">
          <div className="instructor-photo panel-image">
            <Image src={assets.instructor} alt="Andrea, instructora del curso de velas artesanales" fill sizes="(max-width: 900px) 88vw, 38vw" />
          </div>
          <div className="instructor-copy">
            <span className="section-kicker">¿CON QUIÉN APRENDERÁS?</span>
            <h2>Conoce a Andrea</h2>
            <p>Andrea es una emprendedora colombiana con más de tres años de experiencia en la creación, producción y venta de velas artesanales, según su presentación oficial.</p>
            <p>El curso reúne lo que ha aprendido trabajando este oficio para guiar desde los conceptos básicos hasta proyectos, presentación de productos y contenidos de emprendimiento.</p>
            <div className="instructor-points">
              <span><BadgeCheck /> Experiencia práctica en velas artesanales</span>
              <span><Users /> Acompañamiento a través del grupo de alumnos</span>
              <span><PlayCircle /> Clases grabadas para avanzar a tu ritmo</span>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section section" id="testimonios">
        <div className="shell">
          <div className="section-intro centered light">
            <span className="section-kicker">TESTIMONIOS REALES</span>
            <h2>Mensajes compartidos por estudiantes del curso</h2>
            <p>Mostramos capturas del material proporcionado, sin reescribir ni inventar resultados.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((src, index) => (
              <figure key={src} className="testimonial-card">
                <Image src={src} alt={`Testimonio de estudiante ${index + 1}`} fill sizes="(max-width: 680px) 88vw, (max-width: 1000px) 43vw, 30vw" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="certificate-section section">
        <div className="shell certificate-grid">
          <div>
            <span className="section-kicker">AL FINALIZAR TU APRENDIZAJE</span>
            <h2>El programa incluye certificado de finalización</h2>
            <p>El certificado aparece como parte del material oficial del curso y también está incluido dentro de los bonos destacados por el productor.</p>
            <CTA>QUIERO COMENZAR POR ${config.price} USD</CTA>
          </div>
          <div className="certificate-image panel-image">
            <Image src={assets.certificate} alt="Mockup del certificado del curso de velas artesanales" fill sizes="(max-width: 900px) 88vw, 42vw" />
          </div>
        </div>
      </section>

      <section className="faq-section section" id="faq">
        <div className="shell faq-grid">
          <div className="faq-heading">
            <span className="section-kicker">PREGUNTAS FRECUENTES</span>
            <h2>Resuelve tus dudas antes de inscribirte</h2>
            <p>La información de esta sección fue adaptada del contenido publicado por el productor y del funcionamiento de la compra en Hotmart.</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.q}>
                <summary>{faq.q}<span>+</span></summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="guarantee-section">
        <div className="shell guarantee-card">
          <div className="guarantee-icon"><ShieldCheck /></div>
          <div>
            <span className="section-kicker">GARANTÍA INFORMADA POR EL PRODUCTOR</span>
            <h2>7 días para revisar tu compra</h2>
            <p>La página oficial indica una garantía de 7 días. Si necesitas solicitar un reembolso dentro de ese periodo, el proceso se gestiona mediante Hotmart según sus condiciones aplicables.</p>
          </div>
        </div>
      </section>

      <section className="final-cta-section">
        <div className="shell final-cta-inner">
          <Flame className="final-flame" />
          <span className="section-kicker">VELAS ARTESANALES COMO NEGOCIO CREATIVO</span>
          <h2>Empieza a aprender una habilidad creativa con una ruta completa</h2>
          <p>Accede al curso, sus módulos prácticos, contenidos de emprendimiento y bonos por <strong>${config.price} USD</strong>.</p>
          <CTA>QUIERO INSCRIBIRME POR ${config.price} USD</CTA>
          <small>Los resultados comerciales dependen de la práctica, la aplicación y el contexto de cada persona.</small>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="footer-brand"><Flame /><span><strong>VELAS ARTESANALES</strong><small>NEGOCIO CREATIVO</small></span></div>
          <p>Producto digital de formación online. Compra y acceso gestionados mediante Hotmart.</p>
        </div>
      </footer>

      <div className="mobile-buy-bar" aria-label="Acceso rápido a la compra">
        <div><small>ACCESO COMPLETO</small><strong>${config.price} USD</strong></div>
        <a href={config.checkoutUrl} target="_blank" rel="noreferrer">INSCRIBIRME</a>
      </div>

      {config.whatsappUrl && showWhatsApp ? (
        <div className="whatsapp-support">
          <div className="whatsapp-message">
            <strong>¿Necesitas información? 👋</strong>
            <span>Escríbenos y te contamos todo sobre el curso.</span>
          </div>

          <a
            className="whatsapp-float"
            href={config.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar información del curso por WhatsApp"
          >
            <svg
              viewBox="0 0 32 32"
              aria-hidden="true"
              className="whatsapp-icon"
            >
              <path
                fill="currentColor"
                transform="translate(2 0.5)"
                d="M19.11 17.23c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.45 1.55.57.65.21 1.24.18 1.71.11.52-.08 1.58-.65 1.8-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z"
              />
              <path
                fill="currentColor"
                d="M16.03 3.2c-7.08 0-12.84 5.76-12.84 12.84 0 2.26.59 4.47 1.72 6.42L3.1 28.8l6.5-1.71a12.8 12.8 0 0 0 6.43 1.73h.01c7.08 0 12.84-5.76 12.84-12.84S23.11 3.2 16.03 3.2zm0 23.43h-.01a10.57 10.57 0 0 1-5.39-1.47l-.39-.23-3.86 1.01 1.03-3.76-.25-.39a10.58 10.58 0 1 1 8.87 4.84z"
              />
            </svg>
          </a>
        </div>
      ) : null}
    </main>
  );
}
