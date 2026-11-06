# Proyecto actualizado: Meta Pixel + CAPI por negocio

La implementación está en este proyecto, no solo en ejemplos. Lee `docs/INFORME.md` antes de activarla.

**Estado:** código implementado, compilación y pruebas locales aprobadas; no desplegado ni verificado con cuentas reales de Meta. La configuración de ejemplo desactiva la medición hasta completar la instalación. No se incluyen credenciales reales, `node_modules`, `.next` ni el `.env` original.

## Para usarlo

1. Integra estos archivos con tu proyecto completo. El ZIP original no contenía `public/`; conserva tus imágenes y demás recursos existentes. No borres esos recursos al sustituir el código.
2. Conserva en privado el valor de `NEXT_PUBLIC_CHECKOUT_URL` que ya tienes. En el ejemplo está vacío: si no lo configuras, cafetería conserva su fallback `#oferta` y no abrirá el pago.
3. Configura las variables de `.env.example` en Vercel y los dominios exactos de cada negocio. Los cuatro Pixels ya están identificados. Cafetería mantiene el ID de prueba compartido con AutoCAD por tu indicación.
4. Añade un Redis REST compatible (por ejemplo, Upstash), su URL y token. Es obligatorio en producción; protege contra abuso y reintentos entre instancias.
5. Valida la versión de Graph API en la documentación oficial. `v26.0` es candidata; la documentación de Meta devolvió HTTP 429 durante la auditoría y no se pudo confirmar que fuera la última vigente.
6. Prueba primero en un despliegue Preview: `META_TRACKING_ENABLED=true` y códigos de prueba separados. Añade también su origen exacto en `META_*_ORIGINS`. Redeploy después de cambiar variables.
7. Revisa cada Pixel en Events Manager antes de promover el despliegue. Retira los códigos de prueba en producción.

## Comandos

Node >=20 (verificado con Node 24.22.1). Para instalación reproducible con el lock entregado:

```sh
npm ci
npm test
npm run lint:meta
npm run lint
npm run typecheck
npm run test:integration
npm run build
```

No ejecutes `test:integration` mientras otro `next dev` use este mismo directorio. No usa Meta real: arranca Next en el puerto 3107, carga credenciales ficticias y simula la respuesta de Meta.

El proyecto original declara pnpm. Se preservó esa declaración; para usar el lock de npm entregado, configura en Vercel **Install Command: `npm ci`** y **Build Command: `npm run build`**. Si prefieres pnpm, genera y valida tu propio lock de pnpm, sin mezclar instaladores en un mismo despliegue.

Para desarrollo con tus propios ajustes: copia `.env.example` a `.env.local`, configura orígenes y credenciales, usa `META_DEV_MEMORY_STORE=true` solo en local. Esta opción nunca funciona en producción.

## Lo que se mide

- `PageView` y `ViewContent`: después de aceptar el seguimiento de Meta.
- `Contact`: clic de WhatsApp, no conversación ni ingreso confirmado al grupo.
- `CheckoutLinkClick`: clic externo en los botones de compra; evento personalizado, no checkout confirmado.
- `Lead`, `InitiateCheckout` y `Purchase`: servicio interno preparado; requieren conectar el backend que confirme el hecho. No se disparan en las landings actuales.

El consentimiento añade un control pequeño de privacidad. Los estilos, textos, precios, enlaces y funcionalidades comerciales originales se conservan. Clarity se conserva como estaba; este control solo gobierna Meta.

El informe contiene la auditoría, archivos cambiados, variables, guía de tokens, pruebas y límites. `docs/rollback-originales.zip` conserva los archivos originales afectados sin incluir `.env`: sirve de referencia para revertir, no se carga en la aplicación.
