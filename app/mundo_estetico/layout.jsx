
import { Inter, Montserrat } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Image from 'next/image';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata = {
  title: 'Cada piel, una decisión | Masterclasses gratuitas de acné y manchas',
  description:
    'Únete a las masterclasses gratuitas del 9 y 16 de noviembre de 2026 con Dianela Draganov. Análisis y prioridades ante casos de acné y manchas para profesionales de la estética.',
  openGraph: {
    title: 'Cada piel, una decisión — ¿Qué tratar primero?',
    description:
      '2 masterclasses gratuitas para profesionales de la estética. 9 y 16 de noviembre de 2026. Con Dianela Draganov.',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cada piel, una decisión',
    description:
      '2 masterclasses gratuitas · 9 y 16 de noviembre de 2026.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101110',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${montserrat.variable}`}>
        {/* Meta Pixel */}
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
              fbq('init', '1472442001474152');
              fbq('track', 'PageView');
            `,
          }}
        />

        {children}

        <noscript>
          <Image
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1472442001474152&ev=PageView&noscript=1"
            alt=""
            unoptimized
          />
        </noscript>
      </body>
    </html>
  );
}
