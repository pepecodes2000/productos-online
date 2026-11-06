'use client';
// Public bridge: safe no-op until the provider has valid consent/configuration.
export function trackMeta(name, parameters = {}) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('meta:track', { detail: { name, parameters } }));
}
export function setMetaConsent(granted) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('meta:consent', { detail: granted === true }));
}
