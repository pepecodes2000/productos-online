# Auditoría e implementación — 5 de noviembre de 2026

## 1. Diagnóstico del proyecto recibido

Se inspeccionaron todos los archivos fuente del ZIP, los cuatro layouts, páginas, UI de Velas, componentes compartidos, utilidades y configuraciones. No se utilizaron supuestos sobre otros proyectos o cuentas.

- `package.json` declara Next.js **16.3.4**, React **19.2.6**, Node >=20. La compilación local confirmó Next 16.3.4. Sí utiliza **App Router**.
- Cuatro directorios de landing con sus propios layouts raíz (`html`/`body`). No había `app/layout.tsx`. `app/page.tsx` redirigía a cafetería.
- Cada layout instalaba el mismo bootstrap de `fbevents.js`, con `id="meta-pixel"`, `init` y un `track('PageView')` genérico.
- No había componente compartido, seguimiento de navegación SPA, consentimiento Meta, `event_id`, CAPI, middleware, API routes, hooks de analítica ni backend de registro/pagos.
- El `.env` recibido contiene las claves genéricas `META_PIXEL_ID` y `META_ACCESS_TOKEN`, sin referencias desde el código. Su existencia no era una integración CAPI. Se excluyó ese archivo del entregable; no se imprimieron ni utilizaron sus valores. Conserva los ajustes existentes de checkout en Vercel. Si el token incluido es real y ha sido compartido, rótalo antes de producción.
- No se encontraron formularios, manejadores `onSubmit`, páginas de agradecimiento, verificación de pagos ni webhooks.
- No se encontraron reglas de dominio/rewrite para separar negocios. La asociación se confirmó por contenido, IDs y destinos de cada landing; no solo por el nombre de su ruta.

| Landing / negocio confirmado | Pixel original | Acciones reales encontradas |
|---|---|---|
| `/autocad_master` | `987224667726544` | Invitación a grupo WhatsApp; `WhatsAppClick` personalizado y `dataLayer.whatsapp_click` con placement/UTM |
| `/cafeteria_en_casa` | `987224667726544` | Botones a `NEXT_PUBLIC_CHECKOUT_URL`, fallback `#oferta`; Clarity |
| `/mundo_estetico` | `1472442001474152` | Invitación a grupo WhatsApp; Pixel JS y respaldo `noscript` |
| `/velas_artesanales` | `1033830876354785` | Enlace afiliado Hotmart `go.hotmart.com`, consultas `wa.me`, CTA flotante diferido y Clarity |

Cafetería comparte Pixel intencionalmente como prueba. Se conserva esa decisión. **Mientras lo comparta, Meta almacenará sus datos en el mismo conjunto de AutoCAD**, aunque las variables de configuración y tokens sean independientes. Para independencia real en producción se necesita cambiar el Pixel de cafetería.

Riesgos previos: código repetido y eventos genéricos sin destino explícito; riesgo de envío a varios Pixels si coexistiesen en una misma ventana; falta de deduplicación; pérdida de clics si el Pixel todavía no estaba listo; ausencia de eventos en Mundo/Velas aparte de PageView; sin consentimiento. No se afirma que ya hubiese doble PageView en todas las rutas: los múltiples layouts raíz suelen implicar recarga completa y el `noscript` solo funciona sin JavaScript.

El ZIP también omitía `public/`, configuración TypeScript para `@/`, configuración PostCSS y lockfile. Se restauró la configuración necesaria para compilar; no se inventaron imágenes ni recursos faltantes.

## 2. Arquitectura implementada

`lib/meta/config.mjs` mantiene el catálogo verificado de negocios y productos. Cada negocio tiene sus propias variables privadas de Pixel/token y listas explícitas de orígenes/rutas. Un origen es protocolo + host + puerto, sin ruta ni slash final. Se rechazan rutas desconocidas y coincidencias ambiguas; `/autocad_master-falso` no coincide con `/autocad_master`.

Cada layout monta **el mismo** `MetaTracking`. Se preservan los layouts raíz y las rutas públicas. El redirect `/` pasa a `app/(inicio)/page.tsx` con un layout mínimo propio, evitando crear un padre que anidaría los cuatro documentos HTML originales.

El navegador solicita configuración a **`POST /api/meta`**. No envía un Pixel ni token elegidos por él. El servidor resuelve origen/ruta contra su catálogo y entrega solo Pixel público, datos de producto y contexto firmado con HMAC, ligado a sesión, negocio y URL canónica. Un visitante puede acceder a otra landing permitida, pero no seleccionar destinos fuera de la configuración. El header Origin y `Sec-Fetch-Site` se verifican; no se confía en un Host reenviado para seleccionar credenciales.

La misma API procesa acciones de consentimiento, configuración y eventos. Las integraciones internas usan `trackVerifiedConversion` en `lib/meta/server.ts`, que reutiliza resolución, validación, idempotencia y transporte. No se expone una API pública para declarar compras. Es una frontera deliberada: el proyecto no tiene un proveedor/backend que permita verificar ese hecho.

## 3. Consentimiento, Pixel y navegación

- No carga `fbevents.js` ni envía CAPI antes de aceptar. GPC y DNT bloquean la medición incluso si se pulsa aceptar.
- Preferencia local y consentimiento firmado HttpOnly/SameSite=Strict, Secure con HTTPS, de 180 días. Sesión revocable en Redis: retirar el permiso invalida también copias antiguas de la cookie. El contexto de evento caduca a los 30 minutos y se renueva cada 20.
- Retirar el permiso detiene nuevos envíos, revoca consentimiento de Pixel y elimina cookies Meta accesibles. No puede retirar eventos que ya se enviaron.
- Pixel se inicializa una vez por documento; se desactiva `autoConfig`. Todos los envíos usan `trackSingle`/`trackSingleCustom` al ID correcto.
- Observa `usePathname`: PageView y ViewContent por cambio de pathname; cambios solo de hash/query no son otra visita. El guard evita repeticiones por efectos de React. No se reproducen visitas previas a la aceptación.
- Los negocios conservan documentos raíz independientes. Si una futura navegación SPA cambia de negocio dentro del mismo documento, se fuerza recarga para no conservar Pixels inicializados de otro negocio.
- Se añade exclusivamente el pequeño control de privacidad. No se editan hojas de estilo, contenido o flujos de compra.
- Clarity y el `dataLayer` previo de AutoCAD permanecen. El control nuevo es de Meta; no es una implementación de consentimiento para todos los proveedores. Revisa integraciones externas como GTM si las tienes fuera del ZIP, para evitar que vuelvan a disparar el Pixel antiguo.

## 4. Eventos, datos y deduplicación

| Evento | Comportamiento implementado | Límite |
|---|---|---|
| PageView | Pixel + CAPI, mismo nombre/UUID | Una visita del pathname consentido; sin importe |
| ViewContent | Pixel + CAPI, mismo nombre/UUID, producto del catálogo | Visualización de la landing; no interacción/compra |
| Contact | Pixel + CAPI al pulsar WhatsApp | `contact_method=whatsapp_link_click`; no confirma conversación ni ingreso al grupo |
| CheckoutLinkClick | Personalizado, Pixel + CAPI en CTA externo marcado | No se confunde con apertura real de checkout; `#oferta` no dispara |
| WhatsAppClick | Admitido por el helper para compatibilidad explícita | No se dispara además de Contact en los botones migrados |
| Lead | Servicio interno disponible | No hay registro que confirmar en el proyecto; bloqueado en API de navegador |
| InitiateCheckout | Servicio interno disponible con moneda/importe reales | Requiere confirmación del inicio por la integración de checkout |
| Purchase | Servicio interno disponible con moneda/importe reales | Requiere pago verificado; ningún clic/URL de gracias lo genera |

Cada acción del navegador crea **un** UUID, enviado a Pixel como `eventID` y a CAPI como `event_id`; nombre igual en ambos. El reintento conserva UUID y timestamp. Redis usa claves por negocio, Pixel, nombre e ID; bloqueo atómico de 120 s y registro de recepción durante 7 días. Solicitudes repetidas o en curso devuelven 202 `duplicate_or_inflight`, no una compra nueva. No es una garantía de entrega exactamente una vez: ante un timeout ambiguo se reintenta con el mismo ID para que Meta pueda deduplicar.

Las conversiones internas exigen ID estable del registro/pedido, por ejemplo `purchase:<id-transaccion>`, y timestamp del hecho, no del reintento. Hoy solo se envían por servidor; no existe una segunda copia de navegador de Lead/InitiateCheckout/Purchase. Si añades una confirmación visual, entrega desde tu backend una identidad verificable para reutilizar ese mismo ID; no habilites la declaración libre desde el navegador.

`content_ids`, `content_name` y `content_category` proceden del catálogo para eventos de producto. No se inventan monedas/importes para visitas o clics. `currency` y `value` se admiten en conversiones internas correspondientes. El helper no acepta precios arbitrarios desde la landing.

CAPI recibe `event_source_url` sin query ni fragmento, `event_time`, `event_id`, `action_source=website`, User-Agent e IP solo cuando la cabecera de Vercel es confiable. En otros hosts se omite IP y se usa un bucket local compartido conservador. `fbp`/`fbc` se validan, no se hashean; `fbclid` solo se conserva como `_fbc` tras consentimiento. El servidor no almacena query strings ni UTM en CAPI. Puede faltar `_fbp` en los primeros envíos si el script todavía no creó la cookie.

El servicio interno normaliza y aplica SHA-256 a email, teléfono internacional y external ID. No recoge esos datos desde el navegador ni los infiere; se proporcionan únicamente desde un backend verificado con consentimiento registrado. Para teléfonos exige prefijo internacional explícito, no adivina el país.

## 5. Seguridad y errores

Tokens en entorno privado, nunca `NEXT_PUBLIC_*`; transporte con Authorization Bearer al endpoint Graph configurado. El módulo de integración interna está protegido con `server-only`. No se escriben eventos, credenciales ni PII en logs de producción.

Validación de origen, contexto firmado, sesión vigente, lista de eventos, IDs, timestamps, placement e importes; cuerpo máximo 8 KiB. El navegador no puede declarar Lead, checkout o compra. Redis REST aplica rate limit atómico de 100 solicitudes/minuto por negocio/IP (revocar permiso no queda bloqueado por el límite). Las claves de IP usan SHA-256. La ruta falla de forma cerrada si Redis no está disponible; nunca utiliza un Map de proceso en producción. La excepción de almacenamiento en memoria es solo para pruebas locales.

Estos controles reducen abuso, pero un endpoint público de visitas no puede certificar que cada visitante es humano. Si recibes tráfico abusivo distribuido, añade reglas WAF/bot protection en Vercel. El contexto no es autenticación de un comprador.

Timeout de Meta: 8 segundos. Se comprueba tanto HTTP como JSON: `error` debe estar ausente y `events_received` debe ser 1. La respuesta dice `received_by_meta` y **`processed:false`**: recepción no prueba procesamiento, atribución ni deduplicación en Events Manager. El cliente hace un reintento conservando ID. No hay cola duradera de recuperación: para transacciones reales, conecta un outbox/worker y reintentos persistentes en el backend que verifique pagos. Nunca ocultes un fallo de `trackVerifiedConversion` como si fuese entrega confirmada.

## 6. Variables de Vercel

La lista exacta está en `.env.example`; configura Production y Preview por separado.

| Variable | Uso |
|---|---|
| `META_TRACKING_ENABLED` | `true` al probar/activar; requiere redeploy por los layouts prerenderizados |
| `META_GRAPH_API_VERSION` | Versión confirmada oficialmente; candidata `v26.0`, pendiente de verificar vigencia |
| `META_SIGNING_SECRET` | Secreto aleatorio de mínimo 32 caracteres; generar con `openssl rand -hex 32` |
| `META_REDIS_REST_URL`, `META_REDIS_REST_TOKEN` | Almacenamiento compartido compatible con comandos Redis REST/EVAL |
| `META_DEV_MEMORY_STORE` | `false` en Vercel; solo pruebas locales con `true` |
| `META_<PREFIJO>_PIXEL_ID` | ID público del Pixel/conjunto de datos correspondiente |
| `META_<PREFIJO>_ACCESS_TOKEN` | Token privado de ese negocio |
| `META_<PREFIJO>_ORIGINS` | Lista separada por comas de orígenes exactos autorizados |
| `META_<PREFIJO>_PATHS` | Prefijos de rutas separados por comas, con límites de segmento |
| `META_<PREFIJO>_TEST_EVENT_CODE` | Código de Events Manager; vacío en producción |
| `NEXT_PUBLIC_CHECKOUT_URL` | Mantener el enlace original de cafetería |
| `NEXT_PUBLIC_SITE_URL` | Mantener la URL pública original |

Prefijos: `AUTOCAD`, `CAFETERIA`, `MUNDO`, `VELAS`. No hay token global compartido en el código.

Para un dominio único compartido: usa el mismo origen en los cuatro negocios y sus rutas actuales. Para un dominio exclusivo de un negocio, puedes configurar su origen y `/` como prefijo; no asignes `/` a varios negocios del mismo origen. Esta configuración identifica tráfico, **no crea rewrites ni nuevas páginas**: si quieres servir una landing en `/` de otro dominio debes configurar ese enrutamiento aparte sin cambiar inadvertidamente el redirect actual.

Añadir negocio: crea una entrada en `definitions`, producto real, variables propias y montaje de `MetaTracking` en su layout. Una nueva ruta no se convierte automáticamente en negocio. Reutilizar rutas de un mismo negocio requiere añadirlas a PATHS, sin duplicar el proveedor.

## 7. Tokens y prueba en Meta

Accede con permisos sobre el conjunto de datos correcto a [Events Manager](https://business.facebook.com/events_manager/). Selecciona ese conjunto, entra en Configuración y busca la sección API de conversiones / configuración manual y generación de token. Los nombres de pantalla pueden variar. Genera el token para ese conjunto y guárdalo exclusivamente en `META_<PREFIJO>_ACCESS_TOKEN` en Vercel. Si no aparece la opción, revisa los permisos del negocio/conjunto; no uses un token de otro negocio para resolverlo. Repite para cada uno.

Consulta [Get started](https://developers.facebook.com/docs/marketing-api/conversions-api/get-started/) y [Using the API](https://developers.facebook.com/docs/marketing-api/conversions-api/using-the-api/). Meta respondió 429 al consultar su documentación durante esta auditoría. No se validó la UI de tu cuenta ni se pudo certificar la última versión de Graph al 05/11/2026; verifica [Changelog](https://developers.facebook.com/docs/graph-api/changelog/) antes de activar. La versión es configurable y no está incrustada en el transporte.

Prueba cada landing por separado:

1. En Preview configura origen exacto, Pixel, token y el `test_event_code` de ese conjunto. Activa el flag y despliega.
2. En una sesión limpia, antes de aceptar confirma que no se carga `fbevents.js`, no aparecen `_fbp/_fbc` nuevos y no salen eventos a `/api/meta`.
3. Acepta. Comprueba con Pixel Helper un solo Pixel, PageView y ViewContent; revisa en Network que el Pixel y el JSON de CAPI comparten nombre e ID.
4. En Probar eventos verifica la recepción navegador/servidor en el conjunto correcto y su deduplicación. Repite en otro negocio y confirma que Mundo/Velas no reciben lo de AutoCAD. Cafetería comparte conjunto por diseño de prueba.
5. Haz clic en WhatsApp: un Contact. No debe aparecer Lead ni Purchase. En Velas/cafetería el enlace comercial genera solo CheckoutLinkClick si es externo HTTPS.
6. Prueba recarga, navegación de pathname, volver/adelante, cambios de query/hash, retirar permiso, GPC/DNT y bloqueo del script de Meta. La pérdida de eventos por rechazo es intencional.
7. En Network y JS descargado busca tokens: no deben aparecer. Solo Pixel público y contexto firmado. No envíes los secretos a capturas ni logs.
8. Desactiva reglas automáticas/event setup externos que disparen las mismas conversiones. Tras validar, borra códigos de prueba y promueve el despliegue. Revisa Diagnósticos y calidad de coincidencia; un HTTP 200 no reemplaza esa revisión.

## 8. Migración y reversión

Los Pixels originales se inspeccionaron antes de sustituirse. En el código entregado se retiran solamente los bootstraps/noscript Meta y el `fbq` personalizado de AutoCAD, sustituidos por el proveedor común. El evento `dataLayer` se conserva. Ya no se dispara automáticamente `WhatsAppClick` además de Contact; si tus conversiones personalizadas dependen de aquel nombre, migra su definición a Contact con el parámetro de método. No añadas ambos para contar dos veces el mismo contacto.

Los originales afectados están archivados en `rollback-originales.zip` y no forman parte del runtime. Tu despliegue actual no se ha tocado. Mantén producción en la versión previa mientras completas Preview; no publiques el flag apagado sobre una campaña activa esperando que los Pixels antiguos sigan funcionando. Apagado significa **sin seguimiento Meta**, no fallback al código antiguo sin consentimiento.

Para revertir una publicación, lo preferible es restaurar el despliegue anterior completo de Vercel. Si restauras archivos manualmente, hazlo como una única versión coherente: originales + eliminación del proveedor/ruta nueva y del grupo `(inicio)` antes de recuperar `app/page.tsx`. Nunca mezcles los loaders antiguos con el proveedor nuevo. El archivo de rollback no contiene tu `.env`, que debes conservar privado.

## 9. Pruebas y límites de validación

- `npm test`: **13 pruebas aprobadas**. Rutas/negocios y dominios, ambigüedad, privacidad de URL, firma/caducidad, seis eventos estándar e IDs, conversiones bloqueadas, parámetros, hashing, atribución, respuesta Meta, concurrencia/idempotencia, rate limit, fallo cerrado en producción y revocación persistida.
- `npm run test:integration`: **aprobado para las cuatro landings** usando Next real y Graph simulado. Valida Pixel/configuración por negocio, consentimiento, contexto, replay, aislamiento, orígenes, cuerpos excesivos, bloqueo de falsas conversiones, revocación y cuatro entregas únicas al destino esperado. No hay llamadas a Meta real.
- `npm run lint:meta`: aprobado sin errores. `npm run lint`: aprobado con tres advertencias preexistentes de `<img>` en AutoCAD. No se reescribieron esas imágenes.
- `npm run typecheck`: aprobado.
- `npm run build`: compilación Next 16.3.4 aprobada, incluyendo `/api/meta` y las rutas públicas originales. Advertencia previa de metadataBase en metadata de imágenes; no afecta al tracking.
- Navegador automatizado: **no ejecutado con éxito**, porque no se pudo descargar Chromium en este entorno. No se afirma una verificación visual ni de deduplicación de navegación en navegador real. Se entrega `tests/browser.mjs` para completarla.
- Redis remoto, múltiples instancias de Vercel, entrega real Meta, coincidencia, deduplicación final y políticas de consentimiento de tu despliegue: **pendientes**. Las pruebas locales usan almacenamiento en memoria; no sustituyen probar el Redis real.
- Activos/imágenes: ausentes en el ZIP original, deben conservarse del proyecto completo; no se pudo verificar su presentación final.

Para ejecutar las pruebas de navegador pendientes: instala Playwright como herramienta de desarrollo (`npm install --no-save playwright`, `npx playwright install chromium`). En una terminal inicia `node tests/serve-browser.mjs`; en otra ejecuta `npm run test:browser`. Usa solo los ajustes ficticios de ese servidor de prueba. La prueba bloquea peticiones externas y simula el SDK, por lo que tampoco valida procesamiento real de Meta. No configures su preload ni sus credenciales ficticias en Vercel.

## 10. Integraciones adicionales necesarias

- Registro real: guardar la inscripción antes de emitir Lead, con su ID estable.
- Checkout real: obtener confirmación del inicio desde la plataforma; no inferirla del redirect afiliado.
- Compra: webhook del proveedor autenticado/verificado, consulta o validación del estado de pago, control transaccional, moneda/importe reales, correlación de producto/negocio y consentimiento/atribución persistidos. Después llamar `trackVerifiedConversion` y gestionar reintentos mediante outbox. No hay ruta webhook ficticia ni `verified:true` aceptado desde internet.
- Si Hotmart ya envía Pixel/CAPI, coordina cuál integración es la responsable y cómo comparte IDs antes de activar Purchase propio. De otro modo se duplicarán compras con identidades distintas. En un producto afiliado quizá no tengas acceso al webhook; ese permiso debe confirmarse con el productor.
- La confirmación de conversación WhatsApp o ingreso a grupos requiere integración independiente; un enlace de invitación no la demuestra.
- Una CMP externa puede llamar `setMetaConsent(boolean)` después de obtener la decisión explícita. Para eventos personalizados permitidos desde componentes cliente, usa `trackMeta('NombrePermitido', { placement: 'hero' })`; amplía la allowlist del cliente y del servidor si añades un nombre. Nunca envíes PII en placement ni expongas el servicio de conversiones verificadas como endpoint libre.

Referencia de infraestructura verificada: [cabeceras de solicitudes de Vercel](https://vercel.com/docs/headers/request-headers), para la IP de origen. Referencias Meta pendientes de acceso directo: [deduplicación](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events/) y [parámetros de usuario](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters/).

## 11. Lista de archivos

### Creados

- `app/(inicio)/layout.tsx`
- `app/(inicio)/page.tsx`
- `app/api/meta/route.ts`
- `components/meta/MetaTracking.jsx`
- `lib/meta/client.js`
- `lib/meta/config.mjs`
- `lib/meta/core.mjs`
- `lib/meta/server.ts`
- `lib/meta/store.mjs`
- `package-lock.json`
- `postcss.config.mjs`
- `tests/browser.mjs`
- `tests/integration.mjs`
- `tests/meta.test.mjs`
- `tests/mock-meta.cjs`
- `tests/serve-browser.mjs`
- `tsconfig.json`
- `LEEME.md`
- `docs/INFORME.md`
- `docs/rollback-originales.zip`

### Modificados

- `.env.example`
- `.gitignore`
- `app/autocad_master/layout.jsx`
- `app/autocad_master/page.jsx`
- `app/cafeteria_en_casa/layout.tsx`
- `app/cafeteria_en_casa/page.tsx`
- `app/mundo_estetico/layout.jsx`
- `app/velas_artesanales/VelasClientUI.tsx`
- `app/velas_artesanales/layout.tsx`
- `app/velas_artesanales/page.tsx`
- `next-env.d.ts`
- `package.json`

### Movidos / excluidos

- `app/page.tsx` → `app/(inicio)/page.tsx`: conserva el redirect público `/`.
- `.env` original excluido deliberadamente; conservar sus ajustes privados en el entorno.

Los CSS originales se compararon byte a byte y permanecen idénticos. `next-env.d.ts`, si figura modificado, fue actualizado por Next durante la compilación. `package-lock.json` fija las dependencias instaladas para las pruebas. La configuración TypeScript/PostCSS añadida recupera requisitos que faltaban en el ZIP.
