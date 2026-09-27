import type { Metadata } from "next";
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

export default function VelasArtesanalesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
