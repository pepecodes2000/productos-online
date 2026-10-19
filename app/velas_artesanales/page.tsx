import Image from "next/image";
import VelasClientUI from "./VelasClientUI";
import styles from "./VelasNuevasSecciones.module.css";
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
  projects: "/velas-artesanales/material/proyectos-velas.png",
};

const audiencePoints = [
  "Quieres aprender a crear velas artesanales aunque nunca hayas hecho una.",
  "Te gustan las manualidades y quieres convertir tu creatividad en algo que también puedas vender.",
  "Buscas una idea para empezar desde casa sin necesitar un local o una gran estructura.",
  "Has visto tutoriales, pero todavía te confunden las ceras, pabilos, aromas, temperaturas y materiales.",
  "Quieres aprender paso a paso y, además, entender cómo calcular costos, presentar tus productos y comenzar a ofrecerlos.",
];

const opportunityItems = [
  {
    title: "Aprende a presentar y vender tus creaciones",
    text: "Descubre ideas de empaque y presentación para que tus velas se vean más cuidadas y listas para ofrecer.",
    image: "/velas-artesanales/material/oportunidad-empaque.png",
  },
  {
    title: "Crea velas con diferentes acabados y presentaciones",
    text: "Aprende técnicas, recipientes, moldes y combinaciones para desarrollar productos con una presentación más profesional.",
    image: "/velas-artesanales/material/oportunidad-envases.png",
  },
  {
    title: "Amplía tu catálogo con resina",
    text: "Aprende proyectos complementarios en resina y crea más posibilidades para tu emprendimiento artesanal.",
    image: "/velas-artesanales/material/oportunidad-resina.png",
  },
  {
    title: "Aprende también jabones artesanales",
    text: "Crea jabones de glicerina utilizando aromas, colorantes, exfoliantes y diferentes presentaciones.",
    image: "/velas-artesanales/material/oportunidad-jabones.png",
  },
  {
    title: "Aprende a calcular tus costos",
    text: "Recibe un Excel para organizar materiales, gastos y presupuestos y tener mayor claridad al momento de definir tus precios.",
    image: "/velas-artesanales/material/oportunidad-costos.png",
  },
  {
    title: "Más de 135 clases grabadas",
    text: "Aprende a tu ritmo y vuelve a consultar las clases cuando lo necesites.",
    image: "/velas-artesanales/material/oportunidad-clases.png",
  },
];

const modules = [
  {
    number: "01",
    title: "Bienvenida y recursos para comenzar",
    topics: [
      "Bienvenida al curso",
      "Grupo de soporte para alumnos por WhatsApp",
      "Lista de proveedores de moldes e insumos",
      "Lista de materiales",
      "Recorrido por los módulos y lo que aprenderás",
    ],
  },
  {
    number: "02",
    title: "Fundamentos y teoría de las ceras",
    topics: [
      "Introducción al módulo",
      "Qué es el punto de fusión: alto, medio y bajo",
      "Porcentajes y temperaturas para añadir fragancias",
      "Temperaturas de vertido y vertidos finales",
      "Clasificación de las ceras vegetales, animales y minerales",
      "Preguntas frecuentes y respuestas aclaratorias",
    ],
  },
  {
    number: "03",
    title: "Materiales, aromas, colorantes, recipientes y moldes",
    topics: [
      "Introducción a los materiales",
      "Aditivos",
      "Fragancias o esencias y aceites esenciales",
      "Porcentajes para velas aromáticas y velas en molde",
      "Porcentajes para velas de masaje",
      "Tipos de colorantes: en polvo, líquidos, micas, escamas y bloques",
      "Tipos de recipientes y moldes",
      "Tipos de desmoldantes",
      "Materiales para decorar tus velas",
      "Cómo limpiar correctamente los moldes",
    ],
  },
  {
    number: "04",
    title: "Pabilos y pruebas de quemado",
    topics: [
      "Tipos de pabilos",
      "Pabilos de algodón",
      "Cómo encerar un pabilo de algodón",
      "Cómo armar un pabilo de algodón",
      "Pabilos de madera y cómo encerarlos",
      "Diámetros de quemado de los pabilos",
      "Cómo fijar las mechas con pegatinas",
      "Sujetadores de pabilo",
      "Pruebas de quemado",
    ],
  },
  {
    number: "05",
    title: "Utensilios, seguridad y limpieza",
    topics: [
      "Utensilios indispensables",
      "Medidas preventivas de seguridad",
      "Cómo calentar moldes y recipientes",
      "Cómo limpiar utensilios y moldes",
    ],
  },
  {
    number: "06",
    title: "Práctica con ceras de bajo punto de fusión",
    topics: [
      "Mentalidad de emprendedor",
      "Cómo calcular porcentajes de aroma y aditivos",
      "Vela con cera de soja tradicional y soja con endurecedor",
      "Efecto galleta con cera y efecto crema chantillí",
      "Velas de dos colores, en capas y marmoleadas",
      "Wax melts y vela horneable",
      "Vela aromática con cera de coco",
      "Vela tipo yogurt con cera de soja en vaso",
      "Vela de masaje con cera de palma corporal",
      "Vela tipo cupcake y tipo malteada con soja y coco",
      "Velas en vasos y recipientes metálicos",
      "Vela tipo flor con cera de vaso y soja de alto punto",
      "Velas tipo terrario o suculentas con cera de palma",
      "Velas tipo recordatorio y velas con sprinkles",
      "Vela en recipiente de yeso y vela tipo capuchino",
    ],
  },
  {
    number: "07",
    title: "Práctica con ceras de alto punto de fusión",
    topics: [
      "Vela con cera de soja en moldes y con aditivo",
      "Velas con cera de palma de alto punto de fusión",
      "Velas con cera de abeja",
      "Vela en gel con fondo del mar y gel sin burbujas",
      "Vela en gel tipo cóctel",
      "Vela en gel y palma tipo postre",
      "Velón de parafina y velón con cera de vaso y parafina",
      "Velón desde cero y decoración con papel servilleta",
      "Otra técnica para pegar papel servilleta",
      "Cómo pegar papel oro en velas",
      "Velas con figuras de alto punto de fusión",
    ],
  },
  {
    number: "08",
    title: "Bono de Navidad y Halloween",
    topics: [
      "Hombre de nieve y Papá Noel",
      "Vela de venado y vela de copos de nieve",
      "Vela en recipiente metálico y vela en recipiente",
      "Árbol de Navidad y vela en molde de dos colores",
      "Velas infinitas y velas flotantes",
      "Velas en moldes de Halloween",
      "Vela en recipiente con efecto sangre",
      "Vela tipo regalo",
    ],
  },
  {
    number: "09",
    title: "Actualizaciones y nuevas técnicas",
    topics: [
      "Vela moldeable",
      "Vela agitable con agua",
      "Ramo de flores con palillos y flores secas",
      "Vela de flor gigante con cera de palma y parafina",
      "Vela con base de cemento",
      "Vela tipo torta",
      "Cómo colocar nombres de vinilo adhesivo y etiquetas",
      "Velas con mensaje oculto",
      "Pastillas aromatizantes para clósets o guardarropas",
      "Vela con cera en arena",
      "Velas en porcelana",
    ],
  },
  {
    number: "10",
    title: "Recomendaciones y errores comunes",
    topics: [
      "Recomendaciones y recorrido por el módulo",
      "Choques de temperatura: cómo evitarlos y solucionarlos",
      "Cómo evitar la luz directa, los problemas de vertido y las corrientes de aire",
      "Tiempo de curado de las velas",
      "Qué es el frosting y cómo solucionarlo",
      "Por qué se hunden o suben las velas",
      "Por qué queda fragancia en el fondo",
      "Por qué se parten las velas",
      "Cómo conseguir superficies lisas",
      "Cómo solucionar el rechupe",
      "Por qué aparecen puntos en las velas de molde",
      "Desmoldado de las velas",
    ],
  },
  {
    number: "11",
    title: "Bono de manualidades con resina",
    topics: [
      "Bienvenida al módulo",
      "Peine de resina",
      "Esfero de resina",
      "Portavelas con resina",
      "Aretes de resina",
    ],
  },
  {
    number: "12",
    title: "Bono de jabones con glicerina",
    topics: [
      "Aditivos y lista de materiales",
      "Cómo derretir la glicerina",
      "Aromas y colorantes para los jabones",
      "Exfoliantes para los jabones",
      "Tiempo de curado",
      "Cómo envolver y presentar tus jabones",
      "Jabón de aloe vera y jabón con lufa",
      "Jabón de avena y miel",
      "Jabón exfoliante de café",
      "Resultado final",
    ],
  },
  {
    number: "13",
    title: "Emprendimiento y presentación de tus productos",
    topics: [
      "Cómo calcular los costos de tus velas",
      "Cómo crear un logo",
      "Empaque y decoración de tus velas",
      "Cómo crear una página en Facebook",
      "Cómo crear una página en TikTok",
      "Cómo crear una cuenta de empresa en WhatsApp Business",
      "Cómo crear un video desde cero para tus páginas",
    ],
  },
  {
    number: "14",
    title: "Bono: aprende a hacer tus portavelas",
    topics: [
      "Bienvenida al módulo",
      "Recomendaciones antes de empezar",
      "Lista de materiales",
      "Cómo dar color a la mezcla",
      "Portavelas de yeso",
      "Portavelas de cemento",
      "Portavelas de yeso y cemento",
      "Portavelas de cemento y marmolina",
      "Portavelas de resina",
      "Recomendaciones finales y resultado final",
    ],
  },
  {
    number: "15",
    title: "Bono de moldes de silicona",
    topics: [
      "Replicar una figura con resina de poliuretano",
      "Crear tu primer molde",
      "Molde con colorante",
      "Molde en vaso desechable",
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
    <div className="promo-bar" role="region" aria-label="Oferta especial">
      <div className="promo-track">
        <div className="promo-group">{message}</div>
        <div className="promo-group" aria-hidden="true">{message}</div>
        <div className="promo-group" aria-hidden="true">{message}</div>
        <div className="promo-group" aria-hidden="true">{message}</div>
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
  const priorityBonuses = bonuses.filter((bonus) => bonus.priority);
  const extraBonuses = bonuses.filter((bonus) => !bonus.priority);

  return (
    <main className="velas-page">
      <PromoBar />

      {/* 1. HERO */}
      <section className="hero" id="inicio" aria-labelledby="hero-title">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <h1 id="hero-title">
              Deja de posponer tu emprendimiento: <mark>Aprende a crear hermosas velas que puedas vender en menos de 15 días</mark> desde casa.
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

      {/* 2. NUEVA SECCIÓN: PARA QUIÉN ES */}
      <section className={`section ${styles.fitSection}`} id="para-ti" aria-labelledby="fit-title">
        <div className="shell">
          <div className="section-intro centered">
            <span className="section-kicker">¿ESTE CURSO ES PARA TI?</span>
            <h2 id="fit-title">Puede ser para ti si quieres aprender desde cero y convertir tu creatividad en una posibilidad de emprendimiento</h2>
          </div>

          <div className={styles.fitGrid}>
            {audiencePoints.map((point) => (
              <article className={styles.fitCard} key={point}>
                <BadgeCheck aria-hidden="true" />
                <p>{point}</p>
              </article>
            ))}
          </div>

          <p className={styles.fitClosing}>
            <strong>No necesitas experiencia previa.</strong> Empiezas desde cero y avanzas paso a paso.
          </p>
        </div>
      </section>

      {/* 3. NUEVA SECCIÓN: OPORTUNIDAD + PROYECTOS */}
      <section className={`section ${styles.opportunitySection}`} id="oportunidad" aria-labelledby="opportunity-title">
        <div className="shell">
          <div className="section-intro centered">
            <span className="section-kicker">MÁS QUE APRENDER UNA TÉCNICA</span>
            <h2 id="opportunity-title">No solo adquieres un curso, adquieres una oportunidad para aprender, crear y empezar a vender</h2>
            <p>
              Además de aprender a crear velas, conocerás herramientas para presentar tus productos, organizar costos y ampliar tu catálogo artesanal.
            </p>
          </div>

          <div className={styles.opportunityGrid}>
            {opportunityItems.map((item) => (
              <article className={styles.opportunityCard} key={item.title}>
                <div className={styles.opportunityImage}>
                  <Image src={item.image} alt={item.title} fill sizes="(max-width: 700px) 92vw, (max-width: 1050px) 46vw, 30vw" />
                </div>
                <div className={styles.opportunityCopy}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.projectsBlock}>
            <div className="section-intro centered">
              <span className="section-kicker">PROYECTOS QUE APRENDERÁS</span>
              <h2>Mira todo lo que podrás aprender a crear</h2>
              <p>
                Desde velas aromáticas y decorativas hasta diseños en gel, moldes, recipientes, velas tipo postre y muchas otras técnicas.
              </p>
            </div>

            <div className={styles.projectsImage}>
              <Image
                src={assets.projects}
                alt="Ejemplos de proyectos de velas artesanales incluidos en el curso"
                fill
                sizes="(max-width: 900px) 94vw, 980px"
              />
            </div>

            <p className={styles.projectsClosing}>Y esto es solo una parte de los proyectos incluidos en el programa.</p>
            <div className={styles.centerCta}><CTA>QUIERO APRENDER A CREARLAS POR US$21</CTA></div>
          </div>
        </div>
      </section>

      {/* 4. PROBLEMA */}
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

      {/* 5. SOLUCIÓN */}
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

      {/* 6. TEMARIO */}
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

      {/* 7. BENEFICIOS */}
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

      {/* 8. TESTIMONIOS + INSTRUCTORA */}
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

      {/* 9. OFERTA */}
      <section className="section conversion-offer" id="oferta" aria-labelledby="offer-title">
        <div className="shell conversion-offer-grid">
          <div className="offer-copy-block">
            <span className="section-kicker offer-kicker">TU OPORTUNIDAD PARA EMPEZAR DESDE CASA</span>

            <h2 id="offer-title">
              No necesitas tener un negocio para empezar. <mark>Puedes empezar aprendiendo una habilidad que puedas vender.</mark>
            </h2>

            <p className="offer-description">
              Aprende a crear diferentes estilos de velas artesanales mientras descubres cómo calcular costos, encontrar proveedores, presentar tus productos y dar forma a tu propio catálogo para comenzar a ofrecer tus primeras creaciones.
            </p>

            <div className="offer-benefit-heading">
              <span className="offer-benefit-icon"><CircleDollarSign aria-hidden="true" /></span>
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
              <p><strong>Empieza desde cero.</strong> Accede a las clases y avanza a tu propio ritmo.</p>
            </div>
          </div>

          <div className="conversion-price-card">
            <div className="price-card-top">
              <span className="price-card-label price-card-label-urgent">
                <Flame aria-hidden="true" />
                {config.promoDeadline ? "SOLO POR HOY · 70% OFF" : "OFERTA ACTIVA · 70% OFF"}
              </span>
              <span className="price-card-check"><BadgeCheck aria-hidden="true" /> Acceso completo</span>
            </div>

            <p className="price-card-before">Precio regular <s>US$70</s></p>

            <div className="big-price" aria-label="Precio especial: 21 dólares">
              <span>US$</span>
              <strong>21</strong>
            </div>

            <div className="price-saving">HOY AHORRAS US$49</div>

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

            <CTA className="offer-cta">SÍ, QUIERO APROVECHAR LOS US$21</CTA>

            <div className="payment-note"><ShieldCheck aria-hidden="true" /><span>Pago seguro gestionado por Hotmart</span></div>
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

      {/* 10. BONOS */}
      <section className="bonuses-section section" id="bonos" aria-labelledby="bonuses-title">
        <div className="shell">
          <div className="section-intro centered bonuses-intro">
            <span className="section-kicker">Y ADEMÁS RECIBES</span>
            <h2 id="bonuses-title">9 regalos que hacen que no tengas que descubrir todo por tu cuenta</h2>
            <p>
              Además de aprender a crear velas, tendrás recursos para organizar costos, encontrar materiales, mejorar la presentación de tus productos, resolver dudas y ampliar tus posibilidades creativas.
            </p>
          </div>

          <div className="bonus-feature-grid">
            {priorityBonuses.map((bonus) => <BonusCard bonus={bonus} featured key={bonus.number} />)}
          </div>

          <div className="bonus-divider-copy"><span>Y ADEMÁS RECIBES</span></div>

          <div className="bonus-grid">
            {extraBonuses.map((bonus) => <BonusCard bonus={bonus} key={bonus.number} />)}
          </div>

          <div className={styles.bonusOffer}>
            <OfferPrice compact />
            <CTA>QUIERO EL CURSO + LOS 9 REGALOS POR US$21</CTA>
          </div>
        </div>
      </section>

      {/* 11. GARANTÍA */}
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

      {/* 12. FAQ */}
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

      {/* 13. CIERRE */}
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

      <VelasClientUI checkoutUrl={config.checkoutUrl} whatsappUrl={config.whatsappUrl} />
    </main>
  );
}
