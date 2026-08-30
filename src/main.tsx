import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './coverTransition.css'
import './loading.css'
import './responsiveFixes.css'
import './pageTurnStability'
import App from './App.tsx'
import { getPublicPath, getTermRoutePath } from './utils/ogImage'

const publicBase = import.meta.env.BASE_URL || '/'
const rootPath = getPublicPath(publicBase, '')
const aboutPath = getPublicPath(publicBase, 'about/')

function isAboutPath(pathname: string): boolean {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  return normalized === aboutPath
}

function getLegacyTermPath(): string | null {
  if (typeof window === 'undefined') return null

  const match = window.location.hash.match(/^#term=([^&]+)/)
  if (!match) return null

  try {
    const word = decodeURIComponent(match[1].replace(/\+/g, ' '))
    return getPublicPath(publicBase, getTermRoutePath({ word }))
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

function normalizeAboutUrl(): boolean {
  if (window.location.hash !== '#about') return false

  const cleanUrl = `${aboutPath}${window.location.search}`
  window.history.replaceState(window.history.state, '', cleanUrl)
  return true
}

let aboutNormalizationFrame: number | null = null

function scheduleAboutUrlNormalization(): void {
  if (window.location.hash !== '#about' || aboutNormalizationFrame !== null) return

  const normalizeWhenMounted = () => {
    // Keep #about available until AlmanacApp has actually consumed it. This is
    // important for direct legacy links and for the Suspense-backed initial
    // render; normalizing earlier would make the app initialize in term view.
    if (document.querySelector('.about-page-layer')) {
      normalizeAboutUrl()
      lastLocation = window.location.href
      aboutNormalizationFrame = null
      return
    }

    aboutNormalizationFrame = window.requestAnimationFrame(normalizeWhenMounted)
  }

  aboutNormalizationFrame = window.requestAnimationFrame(normalizeWhenMounted)
}

// App.tsx still recognizes #about internally. For a direct /about/ request,
// temporarily expose that legacy signal during bootstrap, then replace it with
// the clean path as soon as the About view has mounted.
if (isAboutPath(window.location.pathname) && !window.location.hash) {
  window.history.replaceState(
    window.history.state,
    '',
    `${rootPath}${window.location.search}#about`
  )
}

// Legacy #term= links remain valid, but the visible/canonical browser URL is
// path-only. Run this before React mounts so direct old links initialize from
// /term/<slug>/ immediately instead of flashing the legacy hash form.
normalizeLegacyTermUrl()

let lastLocation = window.location.href

// App.tsx still emits legacy hashes internally to preserve its established
// page-turn flow. Term hashes can be cleaned immediately. About hashes must
// survive until the About layer mounts so the app can consume the signal.
window.addEventListener('hashchange', () => {
  if (normalizeLegacyTermUrl()) {
    lastLocation = window.location.href
    return
  }

  if (window.location.hash === '#about') {
    scheduleAboutUrlNormalization()
    return
  }

  lastLocation = window.location.href
})

// Clean term entries no longer differ by hash, so Back/Forward produces a
// popstate event instead of hashchange. /about/ needs the same compatibility
// bridge: briefly expose #about, dispatch the app's existing navigation signal,
// then restore the clean path after the About layer is present.
window.addEventListener('popstate', () => {
  const previous = new URL(lastLocation)
  const beforeNormalization = new URL(window.location.href)
  const pathnameChanged = previous.pathname !== beforeNormalization.pathname
  const hashChanged = previous.hash !== beforeNormalization.hash

  if (isAboutPath(beforeNormalization.pathname) && !beforeNormalization.hash) {
    window.history.replaceState(
      window.history.state,
      '',
      `${rootPath}${beforeNormalization.search}#about`
    )
    lastLocation = beforeNormalization.toString()

    window.dispatchEvent(new HashChangeEvent('hashchange', {
      oldURL: previous.toString(),
      newURL: window.location.href,
    }))
    scheduleAboutUrlNormalization()
    return
  }

  if (beforeNormalization.hash === '#about') {
    scheduleAboutUrlNormalization()
  }

  normalizeLegacyTermUrl()
  lastLocation = window.location.href

  if (pathnameChanged && !hashChanged) {
    window.dispatchEvent(new HashChangeEvent('hashchange', {
      oldURL: previous.toString(),
      newURL: window.location.href,
    }))
  }
})

const appLoader = (
  <div className="app-loading" role="status" aria-live="polite" aria-label="Loading The AI Almanac">
    <div className="app-loading-mark" aria-hidden="true">
      <div className="app-loading-title">The AI Almanac</div>
      <div className="app-loading-rule" />
    </div>
  </div>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={appLoader}>
      <App />
    </Suspense>
  </StrictMode>,
)

scheduleAboutUrlNormalization()
