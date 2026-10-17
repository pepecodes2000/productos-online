"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CircleDollarSign,
  Flame,
  GraduationCap,
  Laptop,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";

const config = {
  originalPrice: 70,
  price: 21,
  checkoutUrl:
    process.env.NEXT_PUBLIC_VELAS_CHECKOUT_URL ||
    "https://go.hotmart.com/W107414277M?ap=c3a0",
  whatsappUrl:
    process.env.NEXT_PUBLIC_VELAS_WHATSAPP_URL ||
    "https://wa.me/593988342363?text=Hola%2C+quiero+recibir+informaci%C3%B3n+sobre+el+curso+de+Velas+Artesanales+como+Negocio+Creativo.+%C2%BFMe+pueden+enviar+los+detalles%2C+precio+y+todo+lo+que+incluye%3F",
  // Configura este texto solo si existe una fecha limite real y verificada.
  promoDeadline: process.env.NEXT_PUBLIC_VELAS_PROMO_DEADLINE || "",
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
    topics: [
      "Grupo de soporte para alumnos",
      "Lista de materiales",
      "Lista de proveedores de moldes e insumos",
    ],
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
    topics: [
      "Replica una figura",
      "Crea tu primer molde",
      "Moldes con color",
      "Moldes con recipiente desechable",
    ],
  },
];

const bonuses = [
  {
    number: "01",
    title: "Excel de costos y presupuestos",
    image: "/velas-artesanales/material/bonus-costos.jpg",
    text: "Organiza materiales, gastos y presupuestos para entender mejor cuánto te cuesta elaborar tus productos.",
    benefit: "Beneficio: más claridad al momento de pensar en precios.",
    priority: true,
  },
  {
    number: "02",
    title: "Lista de proveedores",
    image: "/velas-artesanales/material/bonus-proveedores.jpg",
    text: "Empieza con una referencia organizada de proveedores de moldes e insumos en lugar de buscar todo desde cero.",
    benefit: "Beneficio: ahorra tiempo buscando dónde conseguir materiales.",
    priority: true,
  },
  {
    number: "03",
    title: "Guía de empaquetado",
    image: "/velas-artesanales/material/bonus-empaquetado.jpg",
    text: "Aprende ideas para mejorar la presentación de tus creaciones y darles una apariencia más cuidada.",
    benefit: "Beneficio: mayor sensación de producto terminado.",
    priority: true,
  },
  {
    number: "04",
    title: "Grupo de apoyo",
    image: "/velas-artesanales/material/bonus-soporte.jpg",
    text: "Forma parte del espacio de apoyo para alumnos y consulta dudas mientras avanzas con tu aprendizaje.",
    benefit: "Beneficio: acompañamiento durante el proceso.",
    priority: true,
  },
  {
    number: "05",
    title: "Módulo de portavelas",
    image: "/velas-artesanales/material/bonus-portavelas.jpg",
    text: "Aprende proyectos complementarios utilizando materiales como yeso, cemento, marmolina y resina.",
    benefit: "Beneficio: más posibilidades para complementar una colección.",
  },
  {
    number: "06",
    title: "Jabones artesanales en glicerina",
    image: "/velas-artesanales/material/bonus-jabones.jpg",
    text: "Conoce materiales, aromas, colorantes, exfoliantes y preparaciones prácticas para crear jabones de glicerina.",
    benefit: "Beneficio: posibilidad de ampliar tu catálogo artesanal.",
  },
  {
    number: "07",
    title: "Manualidades en resina",
    image: "/velas-artesanales/material/bonus-resina.jpg",
    text: "Explora proyectos sencillos de resina que amplían tus posibilidades creativas más allá de las velas.",
    benefit: "Beneficio: mayor variedad de productos.",
  },
  {
    number: "08",
    title: "Módulo de actualizaciones",
    image: "/velas-artesanales/material/bonus-actualizaciones.webp",
    text: "Accede a proyectos y técnicas que se añaden dentro de las actualizaciones incluidas en el programa.",
    benefit: "Beneficio: seguir encontrando nuevas ideas sin empezar desde cero.",
  },
  {
    number: "09",
    title: "Certificado de finalización",
    image: "/velas-artesanales/material/bonus-certificado.jpg",
    text: "Al completar el programa, el productor informa que tendrás disponible un certificado de finalización.",
    benefit: "Beneficio: cierre y reconocimiento del proceso realizado.",
  },
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
  {
    q: "¿Necesito experiencia previa para comenzar?",
    a: "No. El programa está pensado para que puedas comenzar desde cero. Primero conocerás materiales, ceras, pabilos, seguridad y conceptos fundamentales antes de avanzar hacia técnicas y proyectos más completos.",
  },
  {
    q: "¿Cómo recibo el curso después de realizar la compra?",
    a: "Una vez que Hotmart confirme tu pago, recibirás en el correo utilizado durante la compra las instrucciones para ingresar al área privada de alumnos donde se encuentra el contenido del curso.",
  },
  {
    q: "¿Cuándo puedo empezar a ver las clases?",
    a: "Podrás comenzar cuando tu compra sea confirmada y recibas tus datos de acceso. Al tratarse de una formación digital, no necesitas esperar el envío de ningún producto físico.",
  },
  {
    q: "¿Por cuánto tiempo tendré acceso?",
    a: "La información actual del programa indica que el acceso es de por vida, por lo que podrás avanzar a tu ritmo y volver a consultar las clases cuando lo necesites.",
  },
  {
    q: "¿Qué métodos de pago puedo utilizar?",
    a: "La compra se procesa mediante Hotmart. En el checkout se mostrarán los medios de pago disponibles según tu país y las condiciones aplicables a tu compra.",
  },
  {
    q: "¿Desde qué dispositivo puedo estudiar?",
    a: "El curso es digital y se encuentra alojado en Hotmart. Podrás consultar las clases desde dispositivos compatibles con la plataforma y avanzar desde donde te resulte más cómodo.",
  },
  {
    q: "¿Qué pasa si compro y luego veo que no es para mí?",
    a: "La información actual del programa indica una garantía de 7 días. Si necesitas solicitar un reembolso dentro de ese periodo, el proceso se gestiona mediante Hotmart conforme a las condiciones aplicables.",
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

function OfferPrice({ compact = false }: { compact?: boolean }) {
  const savings = config.originalPrice - config.price;
  const discount = Math.round((savings / config.originalPrice) * 100);

  return (
    <div className={`offer-price ${compact ? "offer-price-compact" : ""}`.trim()}>
      <span className="offer-price-badge">{discount}% DE DESCUENTO</span>
      <div className="offer-price-values">
        <span className="offer-price-before">
          Antes <s>US${config.originalPrice}</s>
        </span>
        <strong>Ahora US${config.price}</strong>
      </div>
      {!compact ? (
        <span className="offer-price-note">
          Ahorras US${savings} · Acceso completo · Pago único
        </span>
      ) : null}
    </div>
  );
}



function PromoBar() {
  const hasVerifiedDeadline = Boolean(config.promoDeadline);

  const message = (
    <>
      <Flame aria-hidden="true" />
      <span>
        <strong>{hasVerifiedDeadline ? "SOLO POR HOY:" : "OFERTA ESPECIAL ACTIVA:"}</strong>{" "}
        aprende a crear velas para vender con <b>70% DE DESCUENTO · SOLO POR HOY</b>
        {hasVerifiedDeadline ? ` · ${config.promoDeadline}` : ""}
      </span>
    </>
  );

  return (
    <div
      className="promo-bar"
      role="region"
      aria-label="Oferta especial"
    >
      <div className="promo-track">
        <div className="promo-group">{message}</div>
        <div className="promo-group" aria-hidden="true">
          {message}
        </div>
        <div className="promo-group" aria-hidden="true">
          {message}
        </div>
        <div className="promo-group" aria-hidden="true">
          {message}
        </div>
      </div>
    </div>
  );
}

function BonusCard({ bonus, featured = false }: { bonus: (typeof bonuses)[number]; featured?: boolean }) {
  return (
    <article className={`bonus-card ${featured ? "bonus-featured" : ""}`.trim()}>
      <div className="bonus-image">
        <Image
          src={bonus.image}
          alt={bonus.title}
          fill
          sizes={featured ? "(max-width: 720px) 92vw, 46vw" : "(max-width: 720px) 92vw, (max-width: 1050px) 45vw, 30vw"}
        />
      </div>
      <div className="bonus-copy">
        <span>REGALO ESPECIAL {bonus.number}</span>
        <h3>{bonus.title}</h3>
        <p>{bonus.text}</p>
        <b>{bonus.benefit}</b>
      </div>
    </article>
  );
}

export default function VelasArtesanalesPage() {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showMobileBuyBar, setShowMobileBuyBar] = useState(false);

  useEffect(() => {
  const timer = window.setTimeout(() => setShowWhatsApp(true), 60000);

  const firstCTA = document.querySelector(
    ".conversion-offer .offer-cta"
  ) as HTMLElement | null;

  if (!firstCTA) {
    return () => window.clearTimeout(timer);
  }

  const mediaQuery = window.matchMedia("(max-width: 720px)");

  const updateVisibility = () => {
    // Solo mostrar la barra en móvil
    if (!mediaQuery.matches) {
      setShowMobileBuyBar(false);
      return;
    }

    const ctaPosition = firstCTA.getBoundingClientRect();

    /*
      La barra aparece cuando el primer CTA
      entra por primera vez en la pantalla.

      Después permanece visible mientras
      el usuario continúa bajando.
    */
    const hasReachedFirstCTA =
      ctaPosition.top <= window.innerHeight;

    setShowMobileBuyBar(hasReachedFirstCTA);
  };

  window.addEventListener("scroll", updateVisibility, {
    passive: true,
  });

  window.addEventListener("resize", updateVisibility);
  mediaQuery.addEventListener("change", updateVisibility);

  updateVisibility();

  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("scroll", updateVisibility);
    window.removeEventListener("resize", updateVisibility);
    mediaQuery.removeEventListener("change", updateVisibility);
  };
}, []);



  const priorityBonuses = bonuses.filter((bonus) => bonus.priority);
  const extraBonuses = bonuses.filter((bonus) => !bonus.priority);

  return (
    <main className="velas-page">
      <PromoBar />

      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="shell hero-inner">
          <div className="hero-copy">

            <h1 id="hero-title">
              Deja de posponer tu emprendimiento: <mark>Aprende a crear velas que puedas vender</mark> desde casa.
            </h1>

            <p className="hero-lead">
              Aprende desde cero a crear velas hermosas, calcular tus costos y empezar a vender. No dejes pasar la oportunidad de transformar tu creatividad en ingresos extra.
            </p>

            <div className="hero-badges" aria-label="Beneficios principales">
              <span><BadgeCheck /> Empieza desde cero</span>
              <span><CircleDollarSign /> Aprende a calcular costos</span>
              <span><PackageCheck /> Crea productos para vender</span>
              <span><ShieldCheck /> 7 días de garantía</span>
            </div>
          </div>

          <div className="hero-media" aria-label="Vista del curso de Velas Artesanales">
            <div className="hero-mockup">
              <Image
                src={assets.hero}
                alt="Mockup del Curso de Velas Artesanales como Negocio Creativo"
                fill
                priority
                sizes="(max-width: 900px) 94vw, 48vw"
              />
            </div>
            <div className="hero-float hero-float-top"><BadgeCheck /><span><b>Desde cero</b> paso a paso</span></div>
            <div className="hero-float hero-float-bottom"><GraduationCap /><span><b>9 regalos</b> incluidos</span></div>
          </div>
        </div>
      </section>

      <section className="bonuses-section section bonuses-first" id="bonos" aria-labelledby="bonuses-title">
        <div className="shell">
          <div className="section-intro centered bonuses-intro">
            <h2 id="bonuses-title">9 regalos que hacen que no tengas que descubrir todo por tu cuenta</h2>
            <p>
              Además de aprender a crear velas, tendrás recursos para organizar costos, encontrar materiales, mejorar la presentación de tus productos, resolver dudas y ampliar tus posibilidades creativas.
            </p>
          </div>

          <div className="bonus-feature-grid">
            {priorityBonuses.map((bonus) => <BonusCard bonus={bonus} featured key={bonus.number} />)}
          </div>

          <div className="bonus-divider-copy">
            <span>Y ADEMÁS RECIBES</span>
          </div>

          <div className="bonus-grid">
            {extraBonuses.map((bonus) => <BonusCard bonus={bonus} key={bonus.number} />)}
          </div>
        </div>
      </section>

      <section className="testimonials-section section" id="testimonios" aria-labelledby="testimonials-title">
        <div className="shell">
          <div className="section-intro centered light">
            <h2 id="testimonials-title">Mira experiencias compartidas por personas que ya pasaron por el programa</h2>
            <p>Mostramos las capturas disponibles del material del curso, sin inventar testimonios ni resultados.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((src, index) => (
              <figure key={src} className="testimonial-card">
                <Image
                  src={src}
                  alt={`Captura de testimonio de estudiante ${index + 1}`}
                  fill
                  sizes="(max-width: 680px) 90vw, (max-width: 1000px) 44vw, 31vw"
                />
              </figure>
            ))}
          </div>

          <div className="instructor-inline">
            <div className="instructor-inline-photo panel-image">
              <Image src={assets.instructor} alt="Andrea, instructora del programa" fill sizes="160px" />
            </div>
            <div>
              <span>¿CON QUIÉN APRENDERÁS?</span>
              <h3>Conoce a Andrea</h3>
              <p>
                Andrea es una emprendedora colombiana con experiencia en creación, producción y venta de velas artesanales. En el programa comparte su proceso para guiar a personas que quieren aprender desde cero y explorar la posibilidad de desarrollar un proyecto artesanal desde casa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="course-stats-section" aria-label="Contenido principal del programa">
        <div className="shell course-stats-grid">
          <div className="course-stat"><strong>+5.000</strong><span>Estudiantes inscritos</span></div>
          <div className="course-stat"><strong>15</strong><span>Módulos de aprendizaje</span></div>
          <div className="course-stat"><strong>9</strong><span>Regalos especiales incluidos</span></div>
          <div className="course-stat"><strong>7 días</strong><span>Garantía informada por el programa</span></div>
        </div>
      </section>

      <section
        className="section conversion-offer"
        id="oferta"
        aria-labelledby="offer-title"
      >
        <div className="shell conversion-offer-grid">
          {/* Información y beneficios */}
          <div className="offer-copy-block">
            <span className="section-kicker offer-kicker">
              TU OPORTUNIDAD PARA EMPEZAR DESDE CASA
            </span>

            <h2 id="offer-title">
              No necesitas tener un negocio para empezar. <mark>Puedes empezar aprendiendo una habilidad que puedas vender.</mark>
            </h2>

            <p className="offer-description">
              Aprende a crear diferentes estilos de velas artesanales mientras descubres cómo calcular costos, encontrar proveedores, presentar tus productos y dar forma a tu propio catálogo para comenzar a ofrecer tus primeras creaciones.
            </p>

            <div className="offer-benefit-heading">
              <span className="offer-benefit-icon">
                <CircleDollarSign aria-hidden="true" />
              </span>
              <div>
                <strong>Más que un curso para hacer velas</strong>
                <span>Una ruta para aprender, crear productos atractivos y explorar tu propio emprendimiento artesanal.</span>
              </div>
            </div>

            <div className="offer-benefit-list">
              <span><BadgeCheck aria-hidden="true" /> 15 módulos paso a paso</span>
              <span><BadgeCheck aria-hidden="true" /> Más de 135 clases grabadas</span>
              <span><BadgeCheck aria-hidden="true" /> 9 regalos especiales</span>
              <span><BadgeCheck aria-hidden="true" /> Módulo de emprendimiento</span>
              <span><BadgeCheck aria-hidden="true" /> Grupo de apoyo</span>
              <span><BadgeCheck aria-hidden="true" /> Certificado</span>
              <span><BadgeCheck aria-hidden="true" /> Acceso de por vida</span>
              <span><BadgeCheck aria-hidden="true" /> Garantía de 7 días</span>
            </div>

            <div className="offer-reassurance">
              <ShieldCheck aria-hidden="true" />
              <p>
                <strong>Empieza desde cero.</strong>
                Accede a las clases y avanza a tu propio ritmo.
              </p>
            </div>
          </div>

          {/* Tarjeta de precio */}
          <div className="conversion-price-card">
            <div className="price-card-top">
              <span className="price-card-label price-card-label-urgent">
                <Flame aria-hidden="true" />
                {config.promoDeadline ? "SOLO POR HOY · 70% OFF" : "OFERTA ACTIVA · 70% OFF"}
              </span>
              <span className="price-card-check">
                <BadgeCheck aria-hidden="true" />
                Acceso completo
              </span>
            </div>

            <p className="price-card-before">
              Precio regular <s>US$70</s>
            </p>

            <div className="big-price" aria-label="Precio especial: 21 dólares">
              <span>US$</span>
              <strong>21</strong>
            </div>

            <div className="price-saving">
              HOY AHORRAS US$49
            </div>

            <p className="price-card-copy">
              Empieza con acceso al curso completo, más de 135 clases, 15 módulos y los 9 regalos incluidos. Un solo pago y acceso de por vida.
            </p>

            <div className="price-urgency-message">
              <Flame aria-hidden="true" />
              <span>
                <strong>{config.promoDeadline ? "Precio promocional disponible solo por hoy." : "Precio promocional actualmente disponible."}</strong>
                Aprovecha el 70% de descuento mientras esta promoción se encuentre activa.
                {config.promoDeadline ? ` ${config.promoDeadline}` : ""}
              </span>
            </div>

            <CTA className="offer-cta">
              SÍ, QUIERO APROVECHAR LOS US$21
            </CTA>

            <div className="payment-note">
              <ShieldCheck aria-hidden="true" />
              <span>Pago seguro gestionado por Hotmart</span>
            </div>

            <div className="price-card-divider" />

            <div className="price-card-details">
              <span><BadgeCheck aria-hidden="true" /> Acceso de por vida</span>
              <span><BadgeCheck aria-hidden="true" /> Clases a tu ritmo</span>
              <span><BadgeCheck aria-hidden="true" /> 9 regalos especiales</span>
              <span><BadgeCheck aria-hidden="true" /> Garantía de 7 días</span>
            </div>

            <p className="no-fake-urgency">
              {config.promoDeadline
                ? `Promoción vigente según las condiciones informadas: ${config.promoDeadline}.`
                : "El precio promocional puede cambiar. Revisa las condiciones vigentes antes de completar tu compra."}
            </p>
          </div>
        </div>
      </section>

      <section className="section problem-section" id="problema" aria-labelledby="problem-title">
        <div className="shell narrow-copy">
          <span className="section-kicker">¿TE SUENA FAMILIAR?</span>
          <h2 id="problem-title">Quieres empezar a crear velas, pero la información suelta termina generando más dudas</h2>
          <p>
            Quizás has visto tutoriales, guardado ideas o incluso comprado algunos materiales, pero todavía dudas sobre qué cera usar, qué pabilo elegir, cuánto aroma añadir o cómo conseguir un acabado más cuidado.
          </p>
          <p>
            Y si además quieres explorar la posibilidad de ofrecer tus creaciones, aparecen nuevas preguntas: cuánto cuesta producirlas, cómo presentarlas y dónde conseguir insumos.
          </p>
          <div className="transition-note">Una ruta ordenada reduce fricción: sabes qué aprender primero, qué practicar después y dónde volver cuando aparece una duda.</div>
        </div>
      </section>

      <section className="section solution-section" id="solucion" aria-labelledby="solution-title">
        <div className="shell solution-grid">
          <div className="solution-copy">
            <span className="section-kicker">UNA RUTA CLARA</span>
            <h2 id="solution-title">De los fundamentos a proyectos que puedas sentirte orgullosa de mostrar</h2>
            <p>
              <strong>Velas Artesanales como Negocio Creativo</strong> reúne materiales, ceras, pabilos, fragancias, seguridad, técnicas y proyectos prácticos en un mismo recorrido.
            </p>
            <p>
              Puedes avanzar a tu ritmo, volver a consultar las clases cuando lo necesites y acompañar la parte creativa con contenidos de costos, proveedores, empaque y presencia digital.
            </p>
            <CTA>QUIERO EMPEZAR MI RUTA POR US$21</CTA>
          </div>
          <div className="solution-image panel-image">
            <Image src={assets.collection} alt="Colección de velas artesanales que se pueden aprender en el curso" fill sizes="(max-width: 900px) 92vw, 42vw" />
          </div>
        </div>
      </section>

      <section className="section benefits-simple" id="beneficios" aria-labelledby="benefits-title">
        <div className="shell">
          <div className="section-intro centered">
            <span className="section-kicker">MÁS QUE HACER VELAS</span>
            <h2 id="benefits-title">Aprende la técnica y entiende mejor cómo convertirla en un producto</h2>
            <p>El valor no está solo en crear una vela: está en comprender el proceso, reducir errores y ganar claridad para presentar lo que haces.</p>
          </div>
          <div className="benefit-story-grid">
            <article><Flame /><h3>Técnica y variedad</h3><p>Trabaja distintos estilos mientras comprendes ceras, pabilos, fragancias, moldes y procesos.</p></article>
            <article><CircleDollarSign /><h3>Costos con más claridad</h3><p>Conoce bases para organizar costos y presupuestos cuando quieras pensar en precios para tus productos.</p></article>
            <article><PackageCheck /><h3>Presentación cuidada</h3><p>Aprende ideas de empaque y presentación para dar una apariencia más terminada a tus creaciones.</p></article>
            <article><Laptop /><h3>Herramientas para mostrarte</h3><p>El temario incluye elementos básicos de marca y uso de Facebook, TikTok y WhatsApp Business.</p></article>
          </div>
        </div>
      </section>

      <section className="curriculum-section section" id="temario" aria-labelledby="curriculum-title">
        <div className="shell curriculum-grid">
          <aside className="curriculum-heading">
            <span className="section-kicker">QUÉ INCLUYE</span>
            <h2 id="curriculum-title">Una formación que avanza contigo desde cero</h2>
            <p>Revisa el temario por módulos y abre únicamente lo que quieras consultar.</p>
            <div className="curriculum-mini-card"><BookOpenCheck /><div><strong>15 módulos organizados</strong><span>Fundamentos, práctica, complementos y emprendimiento.</span></div></div>
          </aside>

          <div className="module-list">
            {modules.map((module, index) => (
              <details key={module.number} open={index === 0}>
                <summary>
                  <span className="module-number">{module.number}</span>
                  <span className="module-title">{module.title}</span>
                  <span className="module-plus">+</span>
                </summary>
                <ul>{module.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="guarantee-section" aria-labelledby="guarantee-title">
        <div className="shell guarantee-card">
          <div className="guarantee-icon"><ShieldCheck /></div>
          <div>
            <span className="section-kicker">REDUCE TU RIESGO</span>
            <h2 id="guarantee-title">7 días de garantía informada por el programa</h2>
            <p>Si necesitas solicitar un reembolso dentro del periodo aplicable, el proceso se gestiona mediante Hotmart conforme a sus condiciones.</p>
          </div>
        </div>
      </section>

      <section className="faq-section section" id="faq" aria-labelledby="faq-title">
        <div className="shell faq-grid">
          <div className="faq-heading">
            <span className="section-kicker">PREGUNTAS FRECUENTES</span>
            <h2 id="faq-title">Resuelve las últimas dudas antes de comprar</h2>
            <p>Información práctica sobre acceso, experiencia previa, dispositivos, pagos y garantía.</p>
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

      <section className="final-cta-section" aria-labelledby="final-title">
        <div className="shell final-cta-inner">
          <Flame className="final-flame" />
          <span className="section-kicker">TU PRÓXIMO PASO</span>
          <h2 id="final-title">Tu idea de aprender velas puede seguir en “algún día”… o puedes empezar con una ruta clara</h2>
          <p>No necesitas tener experiencia previa. Empieza desde las bases, practica a tu ritmo y descubre cómo dar forma a tus propias creaciones.</p>
          <OfferPrice />
          <CTA>QUIERO APROVECHAR EL 70% Y EMPEZAR POR US$21</CTA>
          <div className="final-trust">Acceso digital · Pago gestionado por Hotmart · Acceso de por vida · Garantía informada de 7 días</div>
          <small>Los resultados comerciales dependen de la práctica, aplicación, producto, mercado y circunstancias de cada persona.</small>
        </div>
      </section>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="footer-brand"><Flame /><span><strong>VELAS ARTESANALES</strong><small>NEGOCIO CREATIVO</small></span></div>
          <p>Producto digital de formación. La compra se procesa mediante Hotmart. No se prometen ingresos ni resultados económicos garantizados.</p>
        </div>
      </footer>

      {showMobileBuyBar ? (
        <div className="mobile-buy-bar" aria-label="Acceso rápido a la oferta">
          <div><small>70% DE DESCUENTO</small><strong>US$21</strong></div>
          <a href={config.checkoutUrl} target="_blank" rel="noreferrer">APROVECHAR AHORA</a>
        </div>
      ) : null}

      {config.whatsappUrl && showWhatsApp ? (
        <div className="whatsapp-support">
          <div className="whatsapp-message"><strong>¿Necesitas información? 👋</strong><span>Escríbenos y te contamos qué incluye el curso.</span></div>
          <a className="whatsapp-float" href={config.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Consultar información del curso por WhatsApp">
            <svg viewBox="0 0 32 32" aria-hidden="true" className="whatsapp-icon">
              <path fill="currentColor" transform="translate(2 0.5)" d="M19.11 17.23c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27s.98 2.63 1.11 2.81c.14.18 1.92 2.93 4.65 4.11.65.28 1.15.45 1.55.57.65.21 1.24.18 1.71.11.52-.08 1.58-.65 1.8-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
              <path fill="currentColor" d="M16.03 3.2c-7.08 0-12.84 5.76-12.84 12.84 0 2.26.59 4.47 1.72 6.42L3.1 28.8l6.5-1.71a12.8 12.8 0 0 0 6.43 1.73h.01c7.08 0 12.84-5.76 12.84-12.84S23.11 3.2 16.03 3.2zm0 23.43h-.01a10.57 10.57 0 0 1-5.39-1.47l-.39-.23-3.86 1.01 1.03-3.76-.25-.39a10.58 10.58 0 1 1 8.87 4.84z" />
            </svg>
          </a>
        </div>
      ) : null}
    </main>
  );
}
