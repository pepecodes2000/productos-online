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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://productos-online.vercel.app'
  ),
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
  const metaTrackingEnabled =
    process.env.META_TRACKING_ENABLED === 'true'

  return (
    <html lang='es'>
      <body className={`${inter.variable} ${montserrat.variable}`}>

        {children}

        {/* META PIXEL + CONVERSION API + CONSENTIMIENTO */}
        {metaTrackingEnabled && (
          <MetaTracking enabled />
        )}

        {/* META PIXEL */}
        <Script
          id='meta-pixel'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];
      t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}
      (window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', '${process.env.META_AUTOCAD_PIXEL_ID}');
      fbq('track', 'PageView');
    `
          }}
        />

        {/* MICROSOFT CLARITY */}
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
