'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
const preferenceKey = 'meta-marketing-v1'
const events = ['PageView', 'ViewContent', 'Contact', 'WhatsAppClick', 'CheckoutLinkClick']
const custom = ['WhatsAppClick', 'CheckoutLinkClick']
function preference () {
  try { const p = JSON.parse(localStorage.getItem(preferenceKey)); return p && p.expires > Date.now() ? p.granted : null } catch { return null }
}
function privacyBlocked () { return navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' }
function cookie (name) { return document.cookie.split('; ').find(s => s.startsWith(name + '='))?.slice(name.length + 1) }
function clearAttribution () {
  // Remove both host-only and parent-domain Meta cookies on withdrawal.
  const labels = location.hostname.split('.')
  for (const name of ['_fbp', '_fbc']) {
    document.cookie = `${name}=; Max-Age=0; Path=/`
    for (let i = 0; i < labels.length - 1; i++) document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${labels.slice(i).join('.')}`
  }
}
function initPixel (pixel) {
  if (!window.fbq) {
    const fbq = function (...args) { if (fbq.callMethod) fbq.callMethod(...args); else fbq.queue.push(args) }
    fbq.queue = []; fbq.loaded = true; fbq.version = '2.0'; fbq.push = fbq
    window.fbq = window._fbq = fbq
    const script = document.createElement('script'); script.src = 'https://connect.facebook.net/en_US/fbevents.js'; script.async = true
    document.head.appendChild(script)
  }
  window.__metaPixels ||= new Set()
  if (!window.__metaPixels.has(pixel)) {
    // Disable automatic button/microdata events. All events use trackSingle.
    window.fbq('set', 'autoConfig', false, pixel)
    window.fbq('init', pixel)
    window.fbq('track', 'PageView')
    window.__metaPixels.add(pixel)
  }
  window.fbq('consent', 'grant')
}
async function api (body, keepalive = false) {
  const response = await fetch('/api/meta', {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive
  })
  if (!response.ok) throw new Error('Tracking unavailable')
  return response.json()
}
export default function MetaTracking ({ enabled = false }) {
  const pathname = usePathname()
  const [choice, setChoice] = useState(null)
  const [show, setShow] = useState(false)
  const state = useRef({ config: null, source: '', generation: 0, lastPage: '', allowed: false })
  useEffect(() => {
    if (!enabled) return
    let disposed = false
    const s = state.current
    const source = location.origin + pathname
    s.source = source; s.config = null; s.generation++; const generation = s.generation
    let granted = !privacyBlocked() && preference() === true
    s.allowed = granted
    async function configure (action = 'config') {
      const config = await api({ action, ...(action === 'consent' ? { granted: true } : {}), source })
      if (disposed || generation !== s.generation || !s.allowed) return
      if (window.__metaBusiness && window.__metaBusiness !== config.business) {
        location.assign(source); return // Separate document per business, including future SPA links.
      }
      window.__metaBusiness = config.business
      s.config = config
      initPixel(config.pixel)
      // Capture click attribution only after opt-in, never store query strings.
      const click = new URLSearchParams(location.search).get('fbclid')
      if (click && /^[A-Za-z0-9_-]{1,450}$/.test(click)) document.cookie = `_fbc=fb.1.${Date.now()}.${click}; Max-Age=7776000; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
      if (s.lastPage !== source) {
        s.lastPage = source
        emit('PageView'); emit('ViewContent')
      }
    }
    function emit (name, parameters = {}) {
      if (!s.allowed || privacyBlocked() || !s.config || !events.includes(name)) return
      const config = s.config
      const id = crypto.randomUUID(); const time = Math.floor(Date.now() / 1000)
      const placement = typeof parameters.placement === 'string' && /^[\p{L}\p{N}_ -]{1,80}$/u.test(parameters.placement) ? parameters.placement : undefined
      const data = { ...(name === 'PageView' ? {} : config.product), ...(placement ? { placement } : {}), ...(name === 'Contact' ? { contact_method: 'whatsapp_link_click' } : {}) }
      window.fbq(custom.includes(name) ? 'trackSingleCustom' : 'trackSingle', config.pixel, name, data, { eventID: id })
      const payload = { action: 'event', source, context: config.context, event: { name, id, time, placement }, fbp: cookie('_fbp'), fbc: cookie('_fbc') }
      // Retry once with exactly the same identity; shared store + Meta dedup protect it.
      api(payload, true).catch(() => { if (s.allowed && !disposed) return api(payload, true) }).catch(() => {})
    }
    async function consent (grant) {
      granted = grant && !privacyBlocked(); s.allowed = granted
      setChoice(granted); setShow(false)
      try { localStorage.setItem(preferenceKey, JSON.stringify({ granted, expires: Date.now() + 180 * 86400000 })) } catch { /* storage may be unavailable */ }
      if (granted) { try { await configure('consent') } catch { s.config = null } } else {
        s.config = null
        window.fbq?.('consent', 'revoke'); clearAttribution()
        try { await api({ action: 'consent', granted: false, source }) } catch { /* no further events */ }
      }
    }
    const onConsent = e => { void consent(e.detail === true) }
    const onTrack = e => emit(e.detail?.name, e.detail?.parameters)
    const onClick = e => {
      if (e.defaultPrevented || !e.isTrusted) return
      const anchor = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (!anchor) return
      let url; try { url = new URL(anchor.href) } catch { return }
      const placement = anchor.dataset.metaPlacement || anchor.dataset.ctaLocation || 'enlace'
      if (['wa.me', 'chat.whatsapp.com', 'api.whatsapp.com'].includes(url.hostname)) emit('Contact', { placement })
      else if (anchor.dataset.metaCheckout === 'true' && url.origin !== location.origin && url.protocol === 'https:') emit('CheckoutLinkClick', { placement })
    }
    const onStorage = e => { if (e.key === preferenceKey && preference() !== true) void consent(false) }
    window.addEventListener('meta:consent', onConsent); window.addEventListener('meta:track', onTrack)
    window.addEventListener('storage', onStorage); document.addEventListener('click', onClick)
    // Defer UI initialization, avoiding state updates during render/hydration.
    queueMicrotask(() => { if (!disposed) { setChoice(granted ? true : privacyBlocked() ? false : preference()); setShow(!privacyBlocked() && preference() === null) } })
    if (granted) {
      configure().catch(() => { /* No consent cookie? Require a new explicit decision. */
        if (!disposed) { s.allowed = false; setShow(true) }
      })
    } else if (privacyBlocked()) void consent(false)
    const refresh = window.setInterval(() => { if (s.allowed) configure().catch(() => { s.config = null }) }, 20 * 60000)
    return () => {
      disposed = true; s.config = null; s.allowed = false; clearInterval(refresh)
      window.removeEventListener('meta:consent', onConsent); window.removeEventListener('meta:track', onTrack)
      window.removeEventListener('storage', onStorage); document.removeEventListener('click', onClick)
    }
  }, [enabled, pathname])
  if (!enabled || (!show && choice !== true)) return null
  const decide = granted => window.dispatchEvent(new CustomEvent('meta:consent', { detail: granted }))
  return (
    <aside
      aria-label='Preferencias de medición'
      style={{
        position: 'fixed',
        bottom: 12,
        left: 12,
        zIndex: 2147483000,
        maxWidth: 350,
        padding: 12,
        background: '#fff',
        color: '#171717',
        border: '1px solid #bbb',
        borderRadius: 8,
        font: '14px/1.5 system-ui'
      }}
    >
      {show
        ? (
          <>
            <p style={{ margin: '0 0 8px' }}>
              ¿Permites compartir visitas y clics con Meta para medir publicidad?
              Puedes rechazar o retirar tu permiso.
            </p>

            <button type='button' onClick={() => decide(true)}>
              Aceptar
            </button>

            <button
              type='button'
              onClick={() => decide(false)}
              style={{ marginLeft: 12 }}
            >
              Rechazar
            </button>
          </>
          )
        : (
          <button type='button' onClick={() => decide(false)}>
            Retirar permiso de Meta
          </button>
          )}
    </aside>
  )
}
