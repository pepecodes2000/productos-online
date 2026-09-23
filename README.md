# Cafetería en Casa — Landing page

Landing page de venta creada con Next.js, TypeScript y diseño responsive para el ebook digital **Cafetería en Casa**.

## Incluye

- Hero con propuesta de valor, mockup y precio.
- Secciones de problema, transformación, contenido y beneficios.
- Presentación de los bonos “Barista en Casa” y “Mi Momento Café”.
- Oferta de $20.00 a $10.99 USD.
- Preguntas frecuentes interactivas.
- Barra de oferta para celulares.
- Imágenes optimizadas en WebP y componente `next/image`.
- Metadatos, favicon y diseño adaptable a computadora, tablet y teléfono.

## Configurar el enlace de pago

1. Duplica `.env.example` y nómbralo `.env.local`.
2. Cambia el valor de `NEXT_PUBLIC_CHECKOUT_URL` por el enlace real de tu checkout:

```env
NEXT_PUBLIC_CHECKOUT_URL=https://tu-enlace-real-de-checkout.com
```

Todos los botones principales utilizarán automáticamente ese enlace. Mientras no se configure, los botones llevan a la sección de oferta de la misma página.

## Ejecutar el proyecto

Necesitas Node.js 20 o superior.

```bash
pnpm install
pnpm dev
```

También puedes utilizar npm:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Crear la versión de producción

```bash
pnpm build
pnpm start
```

## Archivos principales

- `app/page.tsx`: contenido y estructura de la landing.
- `app/globals.css`: identidad visual, maquetación y responsive.
- `app/layout.tsx`: título, descripción e idioma del sitio.
- `public/images`: fotografías y mockups optimizados.
- `public/people`: imágenes utilizadas en la sección de público.

## Nota de marca

El producto es independiente. Starbucks® es una marca registrada de su respectivo titular; el ebook no se presenta como un producto oficial, afiliado ni patrocinado por Starbucks.
