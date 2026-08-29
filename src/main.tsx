import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getPublicPath, getTermRoutePath } from './utils/ogImage'

function getLegacyTermPath(): string | null {
  if (typeof window === 'undefined') return null

  const match = window.location.hash.match(/^#term=([^&]+)/)
  if (!match) return null

  try {
    const word = decodeURIComponent(match[1].replace(/\+/g, ' '))
    return getPublicPath(import.meta.env.BASE_URL || '/', getTermRoutePath({ word }))
  } catch {
    return null
  }
}

function normalizeLegacyTermUrl(): boolean {
  const cleanPath = getLegacyTermPath()
  if (!cleanPath) return false

  const cleanUrl = `${cleanPath}${window.location.search}`
  window.history.replaceState(window.history.state, '', cleanUrl)
  return true
}

// Legacy #term= links remain valid, but the visible/canonical browser URL is
// path-only. Run this before React mounts so direct old links initialize from
// /term/<slug>/ immediately instead of flashing the legacy hash form.
normalizeLegacyTermUrl()

let lastLocation = window.location.href

// App.tsx still emits the legacy hash internally to preserve its established
// page-turn flow. Strip it from the current history entry before it becomes the
// long-lived browser URL. The app's own hashchange listener still receives the
// same event and completes its normal state transition.
window.addEventListener('hashchange', () => {
  normalizeLegacyTermUrl()
  lastLocation = window.location.href
})

// Clean term entries no longer differ by hash, so Back/Forward produces a
// popstate event instead of hashchange. Re-dispatch the existing navigation
// signal only when the pathname changed without a hash transition; this keeps
// the routing logic in App.tsx as the single place that resolves/animates terms.
window.addEventListener('popstate', () => {
  const previous = new URL(lastLocation)
  const beforeNormalization = new URL(window.location.href)
  const pathnameChanged = previous.pathname !== beforeNormalization.pathname
  const hashChanged = previous.hash !== beforeNormalization.hash

  normalizeLegacyTermUrl()
  lastLocation = window.location.href

  if (pathnameChanged && !hashChanged) {
    window.dispatchEvent(new HashChangeEvent('hashchange', {
      oldURL: previous.toString(),
      newURL: window.location.href,
    }))
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="app-loading" role="status" aria-live="polite">Opening The AI Almanac…</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
