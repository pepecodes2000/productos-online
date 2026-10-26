import Image from 'next/image';

// Guarda tus fotos en public/images/ y cambia null por la ruta indicada.
// Ejemplo: principal: '/images/portada.webp',
// Mientras una entrada sea null, se muestra una composición CSS sin imagen rota.
const IMAGES = {
  principal: '/mundo_estetico/portada.webp',
  dificultad: '/mundo_estetico/analisis-piel.webp',
  beneficios: '/mundo_estetico/criterio-profesional.webp',
  agenda: '/mundo_estetico/masterclasses.webp',
  docente: '/mundo_estetico/dianela-draganov.avif',
  preguntas: '/mundo_estetico/cabina-estetica.webp',
  cierre: '/mundo_estetico/cuidado-profesional.webp'
};

function SectionImage({ src, alt, variant = '', priority = false, label = 'Cada piel, una decisión' }) {
  return (
    <div className={`section-image ${variant}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={variant === 'image-wide' ? '(max-width: 760px) calc(100vw - 40px), (max-width: 1276px) calc(100vw - 96px), 1180px' : '(max-width: 760px) calc(100vw - 40px), (max-width: 1000px) 45vw, 550px'}
          priority={priority}
          className="section-photo"
        />
      ) : (
        <div className="image-fallback" aria-hidden="true">
          <span className="fallback-orbit" />
          <span className="fallback-orbit fallback-orbit-second" />
          <span className="fallback-label">{label}</span>
        </div>
      )}
    </div>
  );
}

const WHATSAPP_URL = 'https://chat.whatsapp.com/CxYf6g0RQVtI0DS7vR0WLN';

function Invitation({ compact = false }) {
  return (
    <div className={`invitation${compact ? ' invitation--compact' : ''}`}>
      <a className="cta" href={WHATSAPP_URL}>
        <span>{compact ? 'Únete a las masterclasses gratuitas' : 'Quiero unirme a las masterclasses gratuitas'}</span>
        <span aria-hidden="true">↗</span>
      </a>
      <p className="cta-note">Recibe los accesos y recordatorios por WhatsApp</p>
    </div>
  );
}

const questions = [
  ['¿Para quién son estas masterclasses?', 'Para cosmetólogos, cosmiatras y profesionales de la estética con conocimientos previos que quieren profundizar en la observación de la piel y en sus criterios para establecer prioridades.'],
  ['¿Las dos masterclasses son gratuitas?', 'Sí. Puedes unirte gratuitamente a las masterclasses del 9 y 16 de noviembre de 2026.'],
  ['¿Cómo recibiré los accesos y recordatorios?', 'Pulsa el botón para unirte a las masterclasses gratuitas. Se abrirá WhatsApp, donde recibirás los accesos y recordatorios del evento.'],
  ['¿A qué hora serán?', 'El horario y las indicaciones de acceso se comunicarán por WhatsApp.'],
  ['¿Necesito experiencia previa?', 'Sí, el contenido está dirigido a profesionales con conocimientos previos en estética. El enfoque es fortalecer el análisis y la toma de decisiones dentro del alcance de tu práctica profesional.'],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <main id="contenido">
        <section className="hero wrap" aria-labelledby="evento">
          <div className="hero-copy">
            <p className="eyebrow"><span className="small-line" aria-hidden="true" />2 MASTERCLASSES GRATUITAS</p>
            <p className="hero-date">9 y 16 de noviembre de 2026</p>
            <h1 id="evento">Cada piel,<br />una decisión</h1>
            <p className="hero-question">¿Qué tratar primero?</p>
            <p className="promise">Aprende a identificar qué necesita cada piel y qué tratar primero, para tomar decisiones con más seguridad ante casos de acné y manchas, sin depender de protocolos genéricos.</p>
            <Invitation />
            <p className="audience">Para cosmetólogos, cosmiatras y profesionales de la estética con conocimientos previos.</p>
          </div>
          <SectionImage
            src={IMAGES.principal}
            alt="Profesional de la estética analizando la piel de una paciente en una cabina luminosa"
            variant="image-hero"
            priority
            label="Observar · Analizar · Priorizar"
          />
        </section>

        <section className="question-section" aria-labelledby="dificultad">
          <div className="wrap split">
            <div><p className="eyebrow">EL PUNTO DE PARTIDA</p><h2 id="dificultad">Conocer tratamientos<br />es solo el comienzo.</h2><SectionImage src={IMAGES.dificultad} alt="Observación profesional de la piel antes de seleccionar un tratamiento" variant="image-inline" label="El punto de partida" /></div>
            <div><p className="lead">Cuando una piel presenta varias necesidades, elegir por dónde empezar puede ser lo más difícil.</p><p>¿Qué observar? ¿Qué variables considerar? ¿Qué atender primero? Estas dos masterclasses te invitan a detenerte en el análisis antes de elegir un abordaje.</p><p className="underlined">La pregunta no es solo qué hacer, sino por qué hacerlo.</p></div>
          </div>
        </section>

        <section className="wrap section" aria-labelledby="beneficios">
          <div className="section-heading"><p className="eyebrow">DE LA OBSERVACIÓN A LA DECISIÓN</p><h2 id="beneficios">Tres claves para ampliar<br />tu mirada profesional.</h2></div>
          <SectionImage src={IMAGES.beneficios} alt="Profesional revisando sus observaciones y prioridades para un caso de estética" variant="image-wide" label="Una mirada con más criterio" />
          <div className="benefit-grid">
            {[
              ['01', 'Observar con intención', 'Aprende a dirigir tu atención a lo que cada piel necesita, más allá de la manifestación visible.'],
              ['02', 'Reconocer variables', 'Comprende la importancia del contexto y de los factores que pueden influir en el análisis de cada caso.'],
              ['03', 'Establecer prioridades', 'Refuerza tus criterios para pensar qué atender primero, sin depender de una misma secuencia para todas las pieles.'],
            ].map(([number, title, text]) => <article className="benefit" key={number}><span className="index">{number}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="agenda-section" aria-labelledby="agenda">
          <div className="wrap section">
            <div className="section-heading"><p className="eyebrow">DOS ENCUENTROS. UNA MIRADA MÁS AMPLIA.</p><h2 id="agenda">Reserva estas fechas.</h2><p>Dos temas para profundizar en una misma pregunta: ¿qué tratar primero?</p></div>
            <SectionImage src={IMAGES.agenda} alt="Material de estudio para las masterclasses de análisis de la piel" variant="image-wide" label="Dos masterclasses gratuitas" />
            <div className="agenda-grid">
              <article className="session"><div className="session-top"><span>MASTERCLASS 01</span><span>ACNÉ</span></div><div className="session-date"><strong>09</strong><div>noviembre<small>2026</small></div></div><h3>¿Por qué este acné no mejora aunque estés haciendo todo bien?</h3><p>Una invitación a revisar qué observas y qué variables consideras antes de decidir el siguiente paso.</p><div className="session-bottom"><time dateTime="2026-11-09">9 de noviembre</time><span>Acceso gratuito</span></div></article>
              <article className="session"><div className="session-top"><span>MASTERCLASS 02</span><span>MANCHAS</span></div><div className="session-date"><strong>16</strong><div>noviembre<small>2026</small></div></div><h3>La mancha no es el diagnóstico: qué tienes que entender antes de despigmentar</h3><p>Un espacio para mirar más allá de la mancha y comprender la importancia del análisis previo.</p><div className="session-bottom"><time dateTime="2026-11-16">16 de noviembre</time><span>Acceso gratuito</span></div></article>
            </div>
            <div className="centered"><Invitation /></div>
          </div>
        </section>

        <section className="wrap section teacher" aria-labelledby="docente">
          <SectionImage src={IMAGES.docente} alt="Dianela Draganov, fundadora y directora académica de Coach Estético" variant="image-teacher" label="Dianela Draganov · Coach Estético" />
          <div><p className="eyebrow">QUIÉN TE ACOMPAÑA</p><h2 id="docente">Dianela Draganov</h2><p className="teacher-role">Cosmiatra profesional y dermatocosmiatra.</p><p>Fundadora y directora académica de <strong>Coach Estético</strong>.</p><div className="teacher-rule" /><p>Te acompañará en estas dos masterclasses dedicadas al análisis de la piel y a los criterios que orientan las decisiones en estética.</p></div>
        </section>

        <section className="faq-section" aria-labelledby="preguntas"><div className="wrap faq-layout"><div><p className="eyebrow">ANTES DE UNIRTE</p><h2 id="preguntas">Tus preguntas,<br />con claridad.</h2><SectionImage src={IMAGES.preguntas} alt="Cabina de estética preparada para la atención profesional" variant="image-inline" label="Tus preguntas, con claridad" /></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

        <section className="closing wrap" aria-labelledby="cierre"><SectionImage src={IMAGES.cierre} alt="Profesional preparando un espacio de cuidado facial" variant="image-wide" label="Cada piel merece una decisión pensada" /><p className="eyebrow">9 Y 16 DE NOVIEMBRE DE 2026</p><h2 id="cierre">Cada piel merece<br />una decisión pensada.</h2><p>Empieza por ampliar tu mirada. Únete a las masterclasses gratuitas.</p><Invitation /></section>
      </main>
      <footer className="wrap footer"><span>Cada piel, una decisión</span><p>Evento formativo para profesionales de la estética con conocimientos previos.</p></footer>
      <aside className="mobile-cta" aria-label="Acceso a las masterclasses"><Invitation compact /></aside>
    </>
  );
}
