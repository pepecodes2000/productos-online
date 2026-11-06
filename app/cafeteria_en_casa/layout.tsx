import MetaTracking from "../../components/meta/MetaTracking";
import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cafetería en Casa | Bebidas, postres y salsas",
  description:
    "Ebook digital de 42 páginas con bebidas, postres, pastelería y salsas inspiradas en cafeterías reconocidas.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const CLARITY_PROJECT_ID = "yn3a4rlr8n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){
                    (c[a].q=c[a].q||[]).push(arguments)
                  };
                  t=l.createElement(r);
                  t.async=1;
                  t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];
                  y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
            `,
          }}
        />
      </body>
    </html>
  );
}
