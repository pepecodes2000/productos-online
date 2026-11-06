import MetaTracking from "../../components/meta/MetaTracking";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curso de Velas Artesanales | Velas como Negocio Creativo",
  description:
    "Curso online de velas artesanales desde cero con más de 135 clases, 15 módulos, proyectos prácticos, emprendimiento, bonos y certificado.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Velas Artesanales como Negocio Creativo",
    description:
      "Aprende desde cero a elaborar velas artesanales con clases grabadas, proyectos, contenidos de emprendimiento y bonos incluidos.",
    type: "website",
    images: ["/velas-artesanales/material/mockup-principal.png"],
  },
};

const CLARITY_ID = "yq4ydwow9v";

export default function VelasArtesanalesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        {children}
        <MetaTracking enabled={process.env.META_TRACKING_ENABLED === "true"} />

        {/* =========================
            MICROSOFT CLARITY
        ========================== */}
        <Script
          id="microsoft-clarity"
          strategy="lazyOnload"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){
                (c[a].q=c[a].q||[]).push(arguments)
              };
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      </body>
    </html>
  );
}
