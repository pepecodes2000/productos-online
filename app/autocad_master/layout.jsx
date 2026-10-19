import "./globals.css";

// Configura el dominio real en .env.local para las URLs de Open Graph.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "AutoCAD Master | 26 y 27 de octubre de 2026",
  description: "¿AutoCAD te está frenando? Únete gratis al grupo de WhatsApp y recibe la información del entrenamiento especial del 26 y 27 de octubre de 2026.",
  openGraph: {
    type: "website", locale: "es_EC", siteName: "AutoCAD Master",
    title: "¿AutoCAD te está frenando? | AutoCAD Master",
    description: "26 y 27 de octubre de 2026. Únete gratis al grupo de información en WhatsApp.",
    images: [{ url: "/images/og-autocad.webp", width: 1200, height: 630, alt: "AutoCAD Master · Entrenamiento especial · 26 y 27 de octubre de 2026" }],
  },
  twitter: { card: "summary_large_image", title: "AutoCAD Master | Entrenamiento especial", description: "26 y 27 de octubre de 2026. Grupo de información gratuito.", images: ["/images/og-autocad.webp"] },
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#080e19" };

export default function RootLayout({ children }) {
  return <html lang="es"><body>{children}</body></html>;
}
