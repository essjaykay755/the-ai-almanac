import '../pageTurnStability';
import { getPublicPath, getTermRoutePath } from '../utils/ogImage';

const publicBase = import.meta.env.BASE_URL || '/';
const rootPath = getPublicPath(publicBase, '');
const aboutPath = getPublicPath(publicBase, 'about/');

function isAboutPath(pathname: string): boolean {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return normalized === aboutPath;
}

function getLegacyTermPath(): string | null {
  const match = window.location.hash.match(/^#term=([^&]+)/);
  if (!match) return null;

  try {
    const word = decodeURIComponent(match[1].replace(/\+/g, ' '));
    return getPublicPath(publicBase, getTermRoutePath({ word }));
  } catch {
    return null;
  }
}

function normalizeLegacyTermUrl(): boolean {
  const cleanPath = getLegacyTermPath();
  if (!cleanPath) return false;

  const cleanUrl = `${cleanPath}${window.location.search}`;
  window.history.replaceState(window.history.state, '', cleanUrl);
  return true;
}

function normalizeAboutUrl(): boolean {
  if (window.location.hash !== '#about') return false;

  const cleanUrl = `${aboutPath}${window.location.search}`;
  window.history.replaceState(window.history.state, '', cleanUrl);
  return true;
}

let lastLocation = window.location.href;
let aboutNormalizationFrame: number | null = null;

function scheduleAboutUrlNormalization(): void {
  if (window.location.hash !== '#about' || aboutNormalizationFrame !== null) return;

  const normalizeWhenMounted = () => {
    if (document.querySelector('.about-page-layer')) {
      normalizeAboutUrl();
      lastLocation = window.location.href;
      aboutNormalizationFrame = null;
      return;
    }

    aboutNormalizationFrame = window.requestAnimationFrame(normalizeWhenMounted);
  };

  aboutNormalizationFrame = window.requestAnimationFrame(normalizeWhenMounted);
}

// App.tsx still recognizes #about internally. For a direct /about/ request,
// briefly expose that legacy signal during bootstrap and restore the clean path
// once the About view has mounted.
if (isAboutPath(window.location.pathname) && !window.location.hash) {
  window.history.replaceState(
    window.history.state,
    '',
    `${rootPath}${window.location.search}#about`
  );
  lastLocation = window.location.href;
}

// Preserve old #term= links while keeping the visible URL crawlable.
normalizeLegacyTermUrl();
lastLocation = window.location.href;

window.addEventListener('hashchange', () => {
  if (normalizeLegacyTermUrl()) {
    lastLocation = window.location.href;
    return;
  }

  if (window.location.hash === '#about') {
    scheduleAboutUrlNormalization();
    return;
  }

  lastLocation = window.location.href;
});

window.addEventListener('popstate', () => {
  const previous = new URL(lastLocation);
  const beforeNormalization = new URL(window.location.href);
  const pathnameChanged = previous.pathname !== beforeNormalization.pathname;
  const hashChanged = previous.hash !== beforeNormalization.hash;

  if (isAboutPath(beforeNormalization.pathname) && !beforeNormalization.hash) {
    window.history.replaceState(
      window.history.state,
      '',
      `${rootPath}${beforeNormalization.search}#about`
    );
    lastLocation = beforeNormalization.toString();

    window.dispatchEvent(new HashChangeEvent('hashchange', {
      oldURL: previous.toString(),
      newURL: window.location.href
    }));
    scheduleAboutUrlNormalization();
    return;
  }

  if (beforeNormalization.hash === '#about') {
    scheduleAboutUrlNormalization();
  }

  normalizeLegacyTermUrl();
  lastLocation = window.location.href;

  if (pathnameChanged && !hashChanged) {
    window.dispatchEvent(new HashChangeEvent('hashchange', {
      oldURL: previous.toString(),
      newURL: window.location.href
    }));
  }
});

scheduleAboutUrlNormalization();
