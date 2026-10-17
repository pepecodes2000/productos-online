"use client";

import { useEffect, useState } from "react";

type Props = {
  checkoutUrl: string;
  whatsappUrl?: string;
};

export default function VelasClientUI({ checkoutUrl, whatsappUrl }: Props) {
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [showMobileBuyBar, setShowMobileBuyBar] = useState(false);

  useEffect(() => {
    const whatsappTimer = window.setTimeout(() => setShowWhatsApp(true), 60000);
    const firstCTA = document.querySelector(
      ".conversion-offer .offer-cta"
    ) as HTMLElement | null;

    let observer: IntersectionObserver | null = null;

    if (firstCTA && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setShowMobileBuyBar(true);
            observer?.disconnect();
          }
        },
        { threshold: 0.01 }
      );

      observer.observe(firstCTA);
    } else if (firstCTA) {
      const fallback = () => {
        if (firstCTA.getBoundingClientRect().top <= window.innerHeight) {
          setShowMobileBuyBar(true);
          window.removeEventListener("scroll", fallback);
        }
      };

      window.addEventListener("scroll", fallback, { passive: true });
      fallback();

      return () => {
        window.clearTimeout(whatsappTimer);
        window.removeEventListener("scroll", fallback);
      };
    }

    return () => {
      window.clearTimeout(whatsappTimer);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      {showMobileBuyBar ? (
        <div className="mobile-buy-bar" aria-label="Acceso rápido a la oferta">
          <div>
            <small>70% DE DESCUENTO</small>
            <strong>US$21</strong>
          </div>
          <a href={checkoutUrl} target="_blank" rel="noreferrer">
            APROVECHAR AHORA
          </a>
        </div>
      ) : null}

      {whatsappUrl && showWhatsApp ? (
        <div className="whatsapp-support">
          <div className="whatsapp-message">
            <strong>¿Necesitas información? 👋</strong>
            <span>Escríbenos y te contamos qué incluye el curso.</span>
          </div>
          <a
            className="whatsapp-float"
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Consultar información del curso por WhatsApp"
          >
            <svg viewBox="0 0 32 32" aria-hidden="true" className="whatsapp-icon">
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
    </>
  );
}
