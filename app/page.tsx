import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Coffee,
  Cookie,
  Download,
  Droplets,
  Gift,
  Heart,
  MonitorSmartphone,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Utensils,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const checkoutUrl = process.env.NEXT_PUBLIC_CHECKOUT_URL || "#oferta";

const contentCards = [
  {
    title: "Bebidas frías",
    description:
      "Opciones refrescantes, frappés y mezclas cremosas para disfrutar en cualquier momento.",
    image: "/images/bebidas-frias.webp",
    alt: "Tres bebidas frías de café con crema y caramelo",
    icon: Snowflake,
  },
  {
    title: "Bebidas calientes",
    description:
      "Lattes, macchiatos y cafés reconfortantes explicados de manera sencilla.",
    image: "/images/bebidas-calientes.webp",
    alt: "Selección de bebidas calientes de café y chocolate",
    icon: Coffee,
  },
  {
    title: "Postres y pastelería",
    description:
      "Preparaciones dulces para acompañar tu café y convertir una tarde común en un momento especial.",
    image: "/images/pasteleria.webp",
    alt: "Pasteles, galletas y productos de cafetería sobre una mesa",
    icon: Cookie,
  },
  {
    title: "Salsas y complementos",
    description:
      "Bases y acabados para personalizar sabores, decorar y dar un toque de cafetería a cada preparación.",
    image: "/images/ingredientes.webp",
    alt: "Ingredientes y utensilios para preparar café en casa",
    icon: Droplets,
  },
];

const faqs = [
  {
    question: "¿Qué recibo exactamente con mi compra?",
    answer:
      "Recibes Cafetería en Casa, un ebook digital en PDF de 42 páginas con bebidas, postres, pastelería y salsas, más dos bonos digitales complementarios.",
  },
  {
    question: "¿Necesito experiencia preparando café?",
    answer:
      "No. El contenido está pensado para personas que disfrutan el café y quieren preparar opciones especiales en casa, aunque estén comenzando.",
  },
  {
    question: "¿Es un libro físico?",
    answer:
      "No. Es un producto 100% digital en formato PDF. Puedes consultarlo desde tu celular, tablet o computadora.",
  },
  {
    question: "¿Cuándo recibo los bonos?",
    answer:
      "Los dos bonos se desbloquean 6 días después de tu compra para ayudarte a avanzar paso a paso después de explorar el recetario principal.",
  },
  {
    question: "¿Este producto pertenece a Starbucks?",
    answer:
      "No. Es un recetario independiente con preparaciones inspiradas en el estilo de cafeterías reconocidas. No está afiliado ni patrocinado por Starbucks.",
  },
  {
    question: "¿Cómo accedo al ebook?",
    answer:
      "Después de completar tu compra recibirás las instrucciones de acceso digital en el correo utilizado durante el pago.",
  },
];

function PurchaseButton({ label }: { label: string }) {
  const external = checkoutUrl.startsWith("http");

  return (
    <Button
      asChild
      size="lg"
      className="purchase-button h-auto rounded-full px-7 py-4 text-base font-bold"
    >
      <a
        href={checkoutUrl}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {label}
        <ArrowRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function SectionIntro({
  eyebrow,
  title,
  text,
  centered = true,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-intro ${centered ? "section-intro--center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <main>

      <section className="hero" id="inicio">
        <div className="hero-glow hero-glow--one" aria-hidden="true" />
        <div className="hero-glow hero-glow--two" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <span className="product-pill">
              <BookOpen aria-hidden="true" />
              EBOOK DIGITAL EN PDF · 42 PÁGINAS
            </span>
            <p className="hero-kicker">Tu cafetería favorita, ahora en tu cocina</p>
            <h1>
              Prepara bebidas y postres de cafetería <em>sin salir de casa</em>
            </h1>
            <p className="hero-lead">
              Descubre una selección de bebidas calientes y frías, frappés,
              lattes, macchiatos, postres, pastelería y salsas inspiradas en
              Starbucks, explicadas para disfrutar el proceso desde el primer día.
            </p>

            <ul className="hero-benefits" aria-label="Beneficios principales">
              <li>
                <Check aria-hidden="true" />
                Ideal si estás comenzando
              </li>
              <li>
                <Check aria-hidden="true" />
                Léelo desde cualquier dispositivo
              </li>
              <li>
                <Check aria-hidden="true" />
                Incluye 2 bonos complementarios
              </li>
            </ul>

            <div className="hero-action">
              <PurchaseButton label="QUIERO MI RECETARIO" />
              <div className="mini-price" aria-label="Oferta: antes 20 dólares, ahora 10 dólares con 99 centavos">
                <span>Antes $30.00</span>
                <strong>$10.99</strong>
              </div>
            </div>
            <p className="delivery-note">
              <Download aria-hidden="true" />
              Acceso digital después de confirmar tu compra
            </p>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <Image
                src="/images/ebook-mockup.webp"
                alt="Mockup del ebook Cafetería en Casa en una tablet y un teléfono"
                fill
                sizes="(max-width: 900px) 92vw, 45vw"
                priority
              />
            </div>
            <div className="floating-card floating-card--top">
              <Coffee aria-hidden="true" />
              <span>
                <strong>Sabores de cafetería</strong>
                preparados por ti
              </span>
            </div>
            <div className="floating-card floating-card--bottom">
              <Gift aria-hidden="true" />
              <span>
                <strong>2 bonos</strong>
                incluidos
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Resumen del producto">
        <div className="shell trust-grid">
          <div>
            <strong>42</strong>
            <span>páginas de contenido</span>
          </div>
          <div>
            <strong>3</strong>
            <span>colecciones: bebidas, postres y salsas</span>
          </div>
          <div>
            <strong>2</strong>
            <span>bonos para mejorar tu experiencia</span>
          </div>
          <div>
            <MonitorSmartphone aria-hidden="true" />
            <span>formato digital y fácil de consultar</span>
          </div>
        </div>
      </section>

      <section className="section problem-section">
        <div className="shell">
          <SectionIntro
            eyebrow="¿TE HA PASADO?"
            title="Quieres algo especial, pero terminas preparando el café de siempre"
            text="No necesitas convertirte en barista profesional. Necesitas una guía clara que reúna ideas atractivas, ordenadas y agradables de seguir."
          />

          <div className="problem-grid">
            <article>
              <span>01</span>
              <h3>Demasiadas ideas sueltas</h3>
              <p>
                Guardas videos y publicaciones, pero cuando quieres preparar algo no
                encuentras una ruta clara.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Preparaciones que intimidan</h3>
              <p>
                Algunos términos y presentaciones parecen reservados para personas
                con mucha experiencia.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>El antojo se queda pendiente</h3>
              <p>
                Quieres disfrutar una bebida o un postre diferente, pero terminas
                posponiéndolo por no saber cómo empezar.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section transformation-section">
        <div className="shell transformation-grid">
          <div className="transformation-image">
            <Image
              src="/images/momento-cafe.webp"
              alt="Mujer disfrutando una bebida fría de café en casa"
              fill
              sizes="(max-width: 900px) 92vw, 42vw"
            />
            <div className="image-caption">
              <Heart aria-hidden="true" />
              Un momento rico, preparado por ti
            </div>
          </div>

          <div className="transformation-copy">
            <SectionIntro
              eyebrow="UNA GUÍA PARA DISFRUTAR"
              title="Pasa de improvisar a preparar con confianza"
              text="Cafetería en Casa reúne inspiración y organización en un formato visual para que elegir, preparar y disfrutar se sienta mucho más sencillo."
              centered={false}
            />
            <div className="benefit-list">
              <div>
                <CheckCircle2 aria-hidden="true" />
                <span>
                  <strong>Encuentra ideas en un solo lugar</strong>
                  Explora bebidas, postres y complementos sin saltar entre decenas de fuentes.
                </span>
              </div>
              <div>
                <CheckCircle2 aria-hidden="true" />
                <span>
                  <strong>Elige según tu antojo y ocasión</strong>
                  Prepara algo frío, caliente o dulce cuando quieras crear un momento especial.
                </span>
              </div>
              <div>
                <CheckCircle2 aria-hidden="true" />
                <span>
                  <strong>Disfruta también la presentación</strong>
                  Inspírate para servir tus preparaciones con una apariencia más cuidada.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section content-section" id="contenido">
        <div className="shell">
          <SectionIntro
            eyebrow="LO QUE ENCONTRARÁS"
            title="Una colección para cada antojo"
            text="Contenido visualmente organizado para que puedas pasar de la idea a la preparación sin complicarte."
          />

          <div className="content-grid">
            {contentCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="content-card" key={card.title}>
                  <div className="content-card__image">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 720px) 92vw, (max-width: 1100px) 45vw, 25vw"
                    />
                  </div>
                  <div className="content-card__body">
                    <span className="content-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="inside-note">
            <Sparkles aria-hidden="true" />
            <p>
              <strong>No es una lista interminable de texto.</strong> Es un recetario
              de 42 páginas con una presentación cálida, ordenada y visual para que
              realmente te den ganas de preparar algo.
            </p>
          </div>
        </div>
      </section>

      <section className="section preview-section">
        <div className="shell preview-grid">
          <div className="preview-copy">
            <span className="eyebrow eyebrow--light">IMAGINA ESTE MOMENTO</span>
            <h2>Tu bebida favorita, un postre y una tarde sin prisas</h2>
            <p>
              El ebook está pensado para acompañar esos pequeños planes: una pausa
              para ti, una merienda en familia o una tarde de café con amigos.
            </p>
            <ul>
              <li><Check aria-hidden="true" /> Consulta rápida desde el celular</li>
              <li><Check aria-hidden="true" /> Ideas para bebidas frías y calientes</li>
              <li><Check aria-hidden="true" /> Opciones dulces para acompañar</li>
            </ul>
            <a href="#oferta" className="text-link">
              Ver todo lo que incluye <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="preview-collage" aria-label="Galería de preparaciones">
            <div className="preview-large">
              <Image
                src="/images/postres.webp"
                alt="Selección de postres de cafetería"
                fill
                sizes="(max-width: 900px) 92vw, 36vw"
              />
            </div>
            <div className="preview-small">
              <Image
                src="/images/bebidas-frias.webp"
                alt="Bebidas frías con café"
                fill
                sizes="(max-width: 900px) 44vw, 18vw"
              />
            </div>
            <div className="preview-small">
              <Image
                src="/images/bebidas-calientes.webp"
                alt="Bebidas calientes con café"
                fill
                sizes="(max-width: 900px) 44vw, 18vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bonuses-section" id="bonos">
        <div className="shell">
          <SectionIntro
            eyebrow="MÁS QUE UN RECETARIO"
            title="Dos bonos para aprovechar mejor cada preparación"
            text="Recursos complementarios para mejorar tu técnica y organizar tus próximos momentos de café, sin repetir las recetas del ebook principal."
          />

          <div className="bonus-hero">
            <Image
              src="/images/bonos.webp"
              alt="Presentación de los bonos Barista en Casa y Mi Momento Café"
              fill
              sizes="(max-width: 900px) 94vw, 1100px"
            />
          </div>

          <div className="bonus-grid">
            <article>
              <span className="bonus-number">BONO 1</span>
              <Coffee aria-hidden="true" />
              <h3>Barista en Casa</h3>
              <p>
                Técnicas sencillas para preparar cafés irresistibles: proporciones,
                café concentrado, leche, espuma, hielo y equilibrio de sabores.
              </p>
            </article>
            <article>
              <span className="bonus-number">BONO 2</span>
              <Utensils aria-hidden="true" />
              <h3>Mi Momento Café</h3>
              <p>
                Planificador imprimible con listas de compras, maridajes, fichas de
                seguimiento y espacios para registrar tus combinaciones favoritas.
              </p>
            </article>
          </div>

          <p className="unlock-note">
            <Gift aria-hidden="true" />
            Tus bonos se desbloquean 6 días después de la compra.
          </p>
        </div>
      </section>

      <section className="section steps-section">
        <div className="shell">
          <SectionIntro
            eyebrow="ASÍ DE FÁCIL"
            title="De la compra a tu primer momento café"
          />
          <ol className="steps-grid">
            <li>
              <span>1</span>
              <ShoppingBag aria-hidden="true" />
              <h3>Compra</h3>
              <p>Completa el pago en la plataforma segura.</p>
            </li>
            <li>
              <span>2</span>
              <Download aria-hidden="true" />
              <h3>Recibe</h3>
              <p>Accede al ebook digital desde tu correo.</p>
            </li>
            <li>
              <span>3</span>
              <BookOpen aria-hidden="true" />
              <h3>Elige</h3>
              <p>Busca la preparación que más se te antoje.</p>
            </li>
            <li>
              <span>4</span>
              <Coffee aria-hidden="true" />
              <h3>Disfruta</h3>
              <p>Crea tu propio momento de cafetería en casa.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section audience-section">
        <div className="shell audience-grid">
          <div>
            <span className="eyebrow">PENSADO PARA TI</span>
            <h2>Si amas el café, ya tienes lo más importante</h2>
            <p>
              No hace falta saber de barismo para empezar. Esta guía acompaña a
              personas curiosas que quieren disfrutar más sus pausas y compartir
              algo rico con quienes quieren.
            </p>
          </div>
          <div className="persona-cards">
            <article>
              <Image src="/people/mariana.jpeg" alt="Mujer sonriente" width={72} height={72} />
              <p>“Amo el café, pero quiero una guía que me ayude a empezar.”</p>
            </article>
            <article>
              <Image src="/people/daniel.jpeg" alt="Hombre sonriente" width={72} height={72} />
              <p>“Quiero preparar algo especial sin complicar toda la tarde.”</p>
            </article>
            <article>
              <Image src="/people/camila.jpeg" alt="Mujer sonriendo" width={72} height={72} />
              <p>“Me encanta recibir amigos y cuidar cada detalle de la mesa.”</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section offer-section" id="oferta">
        <div className="shell offer-wrap">
          <div className="offer-visual">
            <Image
              src="/images/oferta.webp"
              alt="Presentación del ebook Cafetería en Casa con bebidas y postres"
              fill
              sizes="(max-width: 980px) 94vw, 48vw"
            />
          </div>

          <div className="offer-card">
            <span className="offer-badge">OFERTA ACTUAL</span>
            <h2>Todo lo que necesitas para crear tu momento café</h2>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Ebook digital de 42 páginas</li>
              <li><CheckCircle2 aria-hidden="true" /> Bebidas frías y calientes</li>
              <li><CheckCircle2 aria-hidden="true" /> Postres, pastelería y salsas</li>
              <li><CheckCircle2 aria-hidden="true" /> Bono “Barista en Casa”</li>
              <li><CheckCircle2 aria-hidden="true" /> Bono “Mi Momento Café”</li>
            </ul>

            <div className="price-block">
              <span>Precio anterior <s>$30.00</s></span>
              <div>
                <small>HOY</small>
                <strong>$10.99</strong>
                <em>USD</em>
              </div>
            </div>

            <PurchaseButton label="QUIERO CAFETERÍA EN CASA" />
            <p className="offer-fineprint">
              <Download aria-hidden="true" /> Producto digital · No se envía ningún artículo físico
            </p>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="preguntas">
        <div className="shell faq-grid">
          <div className="faq-heading">
            <span className="eyebrow">ANTES DE COMENZAR</span>
            <h2>Preguntas frecuentes</h2>
            <p>
              Aquí tienes las respuestas esenciales para decidir con claridad.
            </p>
            <div className="faq-mini-card">
              <Coffee aria-hidden="true" />
              <span>
                <strong>¿Lista para tu próxima pausa?</strong>
                Tu recetario estará disponible en formato digital.
              </span>
            </div>
          </div>

          <Accordion className="faq-accordion" type="single" collapsible defaultValue="item-0">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-cta__inner">
          <span className="eyebrow eyebrow--light">TU MOMENTO EMPIEZA AQUÍ</span>
          <h2>Convierte una tarde cualquiera en una experiencia de cafetería</h2>
          <p>
            Llévate el ebook de 42 páginas y recibe los dos bonos complementarios.
          </p>
          <div className="final-action">
            <PurchaseButton label="OBTENER EL EBOOK POR $10.99" />
            <span>Antes $20.00 USD</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <a className="brand brand--footer" href="#inicio">
            <span className="brand-mark" aria-hidden="true"><Coffee /></span>
            <span><strong>CAFETERÍA</strong><small>EN CASA</small></span>
          </a>
          <p>
            Producto digital independiente. Starbucks® es una marca registrada de
            su respectivo titular. Este ebook no está afiliado, aprobado ni
            patrocinado por Starbucks.
          </p>
          <a href="#preguntas">Preguntas frecuentes</a>
        </div>
      </footer>

      <div className="mobile-offer-bar" aria-label="Acceso rápido a la oferta">
        <span>
          <small>Antes $20.00</small>
          <strong>$10.99</strong>
        </span>
        <a href="#oferta">Ver oferta <ArrowRight aria-hidden="true" /></a>
      </div>
    </main>
  );
}
