import MetaTracking from '../../components/meta/MetaTracking'

import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap'
})

export const metadata = {
  title: 'Cada piel, una decisión | Masterclasses gratuitas de acné y manchas',
  description:
    'Únete a las masterclasses gratuitas del 9 y 16 de noviembre de 2026 con Dianela Draganov. Análisis y prioridades ante casos de acné y manchas para profesionales de la estética.',
  openGraph: {
    title: 'Cada piel, una decisión — ¿Qué tratar primero?',
    description:
      '2 masterclasses gratuitas para profesionales de la estética. 9 y 16 de noviembre de 2026. Con Dianela Draganov.',
    locale: 'es_ES',
    type: 'website'
  },
  twitter: {
    card: 'summary',
    title: 'Cada piel, una decisión',
    description:
      '2 masterclasses gratuitas · 9 y 16 de noviembre de 2026.'
  }
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101110'
}

const CLARITY_ID = 'z996dm4lhw'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body className={`${inter.variable} ${montserrat.variable}`}>

        {children}
        <MetaTracking enabled={process.env.META_TRACKING_ENABLED === 'true'} />

        {/* =========================
                    MICROSOFT CLARITY
                ========================== */}
        <Script
          id='microsoft-clarity'
          strategy='lazyOnload'
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
  )
}
