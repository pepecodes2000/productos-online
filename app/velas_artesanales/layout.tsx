import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

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

const META_PIXEL_ID = "1033830876354785";

export default function VelasArtesanalesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      {/* =========================
            META PIXEL
        ========================== */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
        }}
      />
      <body>{children}</body>
    </html>
  );
}
