import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', display: 'swap' });

export const metadata = {
  title: 'Cada piel, una decisión | Masterclasses gratuitas de acné y manchas',
  description: 'Únete a las masterclasses gratuitas del 9 y 16 de noviembre de 2026 con Dianela Draganov. Análisis y prioridades ante casos de acné y manchas para profesionales de la estética.',
  openGraph: {
    title: 'Cada piel, una decisión — ¿Qué tratar primero?',
    description: '2 masterclasses gratuitas para profesionales de la estética. 9 y 16 de noviembre de 2026. Con Dianela Draganov.',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Cada piel, una decisión', description: '2 masterclasses gratuitas · 9 y 16 de noviembre de 2026.' },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#101110' };

export default function RootLayout({ children }) {
  return <html lang="es"><body className={`${inter.variable} ${montserrat.variable}`}>{children}</body></html>;
}
