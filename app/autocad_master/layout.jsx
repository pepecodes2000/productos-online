
import Script from "next/script";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const META_PIXEL_ID = "1033830876354785";

export const metadata = {
  metadataBase: new URL(siteUrl),

  title: "AutoCAD Master | 26 y 27 de octubre de 2026",

  description:
    "¿AutoCAD te está frenando? Únete gratis al grupo de WhatsApp y recibe la información del entrenamiento especial del 26 y 27 de octubre de 2026.",

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },

  openGraph: {
    type: "website",
    locale: "es_EC",
    siteName: "AutoCAD Master",
    title: "¿AutoCAD te está frenando? | AutoCAD Master",
    description:
      "26 y 27 de octubre de 2026. Únete gratis al grupo de información en WhatsApp.",
    images: [
      {
        url: "/images/og-autocad.webp",
        width: 1200,
        height: 630,
        alt: "AutoCAD Master - Entrenamiento especial - 26 y 27 de octubre de 2026",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AutoCAD Master | Entrenamiento especial",
    description:
      "26 y 27 de octubre de 2026. Grupo de información gratuito.",
    images: ["/images/og-autocad.webp"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080e19",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}

        {/* META PIXEL */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;
              n.push=n;
              n.loaded=!0;
              n.version='2.0';
              n.queue=[];
              t=b.createElement(e);
              t.async=!0;
              t.src=v;
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)
              }(window, document, 'script',
              'https://connect.facebook.net/en_US/fbevents.js');

              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      </body>
    </html>
  );
}
