import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
