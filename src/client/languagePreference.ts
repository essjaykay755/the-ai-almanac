const PREFERENCE_KEY = 'aiAlmanacLanguage';
const DISMISSAL_KEY = 'aiAlmanacLanguageSuggestionDismissed';

const supportedLocales = ['es', 'pt', 'it', 'fr', 'de', 'hi'] as const;
export type AutoLocale = (typeof supportedLocales)[number];

const countryDefaultLocale: Partial<Record<string, AutoLocale>> = {
  AR: 'es',
  AT: 'de',
  BO: 'es',
  BR: 'pt',
  CL: 'es',
  CO: 'es',
  CR: 'es',
  CU: 'es',
  DE: 'de',
  DO: 'es',
  EC: 'es',
  ES: 'es',
  FR: 'fr',
  GT: 'es',
  HN: 'es',
  IT: 'it',
  MX: 'es',
  NI: 'es',
  PA: 'es',
  PE: 'es',
  PR: 'es',
  PT: 'pt',
  PY: 'es',
  SV: 'es',
  UY: 'es',
  VE: 'es'
};

function normalizeLanguage(value: string): AutoLocale | null {
  const language = value.trim().toLowerCase().split(/[-_]/)[0];
  return supportedLocales.includes(language as AutoLocale) ? language as AutoLocale : null;
}

export function getPreferredBrowserLocale(languages: readonly string[]): AutoLocale | null {
  for (const language of languages) {
    const locale = normalizeLanguage(language);
    if (locale) return locale;
  }
  return null;
}

export function resolveAutoLocale(country: string | null, browserLanguages: readonly string[]): AutoLocale | null {
  const browserLocale = getPreferredBrowserLocale(browserLanguages);
  const region = country?.trim().toUpperCase() || null;

  // India stays English unless the browser itself prefers Hindi.
  if (region === 'IN') return browserLocale === 'hi' ? 'hi' : null;

  // Country is the primary automatic signal. Browser language is the fallback.
  if (region && countryDefaultLocale[region]) return countryDefaultLocale[region] || null;
  return browserLocale;
}

function getBrowserLanguages(): string[] {
  if (typeof navigator === 'undefined') return [];
  if (navigator.languages?.length) return Array.from(navigator.languages);
  return navigator.language ? [navigator.language] : [];
}

function getLanguageLink(locale: string): HTMLAnchorElement | null {
  return document.querySelector<HTMLAnchorElement>(`[data-language-code="${locale}"]`);
}

function rememberLanguageChoice(locale: string): void {
  try {
    localStorage.setItem(PREFERENCE_KEY, locale);
  } catch {}
}

function getSavedLanguage(): string | null {
  try {
    return localStorage.getItem(PREFERENCE_KEY);
  } catch {
    return null;
  }
}

function clearDismissedLocale(): void {
  try {
    localStorage.removeItem(DISMISSAL_KEY);
  } catch {}
}

function clearLanguagePreferenceMemory(): void {
  try {
    localStorage.removeItem(PREFERENCE_KEY);
    localStorage.removeItem(DISMISSAL_KEY);
  } catch {}
}

function syncLanguagePreferenceState(): void {
  const savedLanguage = getSavedLanguage();

  document.querySelectorAll<HTMLButtonElement>('[data-language-auto]').forEach((button) => {
    if (savedLanguage) button.removeAttribute('aria-current');
    else button.setAttribute('aria-current', 'true');
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-language-code]').forEach((link) => {
    if (savedLanguage && link.dataset.languageCode === savedLanguage) {
      link.dataset.languageRemembered = 'true';
    } else {
      delete link.dataset.languageRemembered;
    }
  });
}

function closeLanguageMenus(): void {
  document.querySelectorAll('details.site-language-switcher').forEach((details) => {
    details.removeAttribute('open');
  });
}

function navigateToLocale(locale: AutoLocale): void {
  const link = getLanguageLink(locale);
  if (link) window.location.assign(link.href);
}

let controlsBound = false;
let languagePreferenceRequestId = 0;

function cancelLanguagePreferenceInitialization(): void {
  languagePreferenceRequestId += 1;
}

function bindLanguageControls(): void {
  if (controlsBound) return;
  controlsBound = true;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest<HTMLAnchorElement>('[data-language-code]');
    if (link) {
      cancelLanguagePreferenceInitialization();
      rememberLanguageChoice(link.dataset.languageCode || 'en');
      clearDismissedLocale();
      syncLanguagePreferenceState();
      return;
    }

    const autoButton = target.closest<HTMLButtonElement>('[data-language-auto]');
    if (!autoButton) return;

    cancelLanguagePreferenceInitialization();
    clearLanguagePreferenceMemory();
    syncLanguagePreferenceState();
    closeLanguageMenus();

    if (document.documentElement.lang !== 'en') {
      const englishLink = getLanguageLink('en');
      if (englishLink) window.location.assign(englishLink.href);
      return;
    }

    void initializeLanguagePreference();
  });
}

function addedLanguageMenu(node: Node): boolean {
  if (!(node instanceof Element)) return false;
  return node.matches('.site-language-switcher') || Boolean(node.querySelector('.site-language-switcher'));
}

function observeLanguageMenus(callback: () => void): void {
  if (document.querySelector('.site-language-switcher')) callback();

  const observer = new MutationObserver((mutations) => {
    const hasNewMenu = mutations.some((mutation) =>
      Array.from(mutation.addedNodes).some(addedLanguageMenu)
    );
    if (hasNewMenu) callback();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

async function getIpCountry(): Promise<string | null> {
  try {
    const response = await fetch('/api/locale', {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    if (!response.ok) return null;
    const payload = await response.json() as { country?: unknown };
    return typeof payload.country === 'string' ? payload.country.toUpperCase() : null;
  } catch {
    return null;
  }
}

async function initializeLanguagePreference(): Promise<void> {
  const requestId = ++languagePreferenceRequestId;
  if (document.documentElement.lang !== 'en') return;

  const savedLanguage = getSavedLanguage();
  if (savedLanguage === 'en') return;

  if (supportedLocales.includes(savedLanguage as AutoLocale)) {
    navigateToLocale(savedLanguage as AutoLocale);
    return;
  }

  const country = await getIpCountry();
  if (requestId !== languagePreferenceRequestId) return;

  // A manual choice may have been made while the country lookup was pending.
  // Let the link navigation finish instead of overriding it with stale detection.
  const latestSavedLanguage = getSavedLanguage();
  if (latestSavedLanguage || document.documentElement.lang !== 'en') return;

  const locale = resolveAutoLocale(country, getBrowserLanguages());
  if (requestId !== languagePreferenceRequestId) return;
  if (locale) navigateToLocale(locale);
}

function bootLanguagePreference(): void {
  bindLanguageControls();

  let initialized = false;
  observeLanguageMenus(() => {
    syncLanguagePreferenceState();
    if (initialized) return;
    initialized = true;
    void initializeLanguagePreference();
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootLanguagePreference, { once: true });
  } else {
    queueMicrotask(bootLanguagePreference);
  }
}
