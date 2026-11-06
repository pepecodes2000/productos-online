// Server configuration. Never import this module from a client component.
export const definitions = [
  { key: 'autocad', prefix: 'AUTOCAD', path: '/autocad_master', product: { content_ids: ['autocad_master'], content_name: 'AutoCAD Master', content_category: 'Formación' } },
  { key: 'cafeteria', prefix: 'CAFETERIA', path: '/cafeteria_en_casa', product: { content_ids: ['cafeteria_en_casa'], content_name: 'Cafetería en Casa', content_category: 'Recetario' } },
  { key: 'mundo', prefix: 'MUNDO', path: '/mundo_estetico', product: { content_ids: ['mundo_estetico'], content_name: 'Masterclasses de estética', content_category: 'Formación profesional' } },
  { key: 'velas', prefix: 'VELAS', path: '/velas_artesanales', product: { content_ids: ['velas_artesanales'], content_name: 'Velas Artesanales', content_category: 'Formación' } }
]
export function resolveBusiness (source, env = process.env) {
  const url = new URL(source)
  if (url.username || url.password || !['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid source')
  const matches = definitions.filter(b => {
    // Explicit origins and paths, no wildcard, Host or X-Forwarded-Host trust.
    const origins = (env[`META_${b.prefix}_ORIGINS`] || '').split(',').map(s => s.trim()).filter(Boolean)
    const paths = (env[`META_${b.prefix}_PATHS`] || b.path).split(',').map(s => s.trim()).filter(Boolean)
    return origins.includes(url.origin) && paths.some(p => p.startsWith('/') && (p === '/' || url.pathname === p || url.pathname.startsWith(p.replace(/\/$/, '') + '/')))
  })
  if (matches.length !== 1) throw new Error('Unmapped or ambiguous business')
  const b = matches[0]
  const pixel = env[`META_${b.prefix}_PIXEL_ID`]
  if (!/^\d{5,30}$/.test(pixel || '')) throw new Error('Pixel not configured')
  return { ...b, pixel, token: env[`META_${b.prefix}_ACCESS_TOKEN`], testCode: env[`META_${b.prefix}_TEST_EVENT_CODE`] }
}
export function safeSource (source) { const u = new URL(source); return u.origin + u.pathname }
