const PREFERENCE_KEY = 'aiAlmanacLanguage';

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

  if (region && countryDefaultLocale[region]) return countryDefaultLocale[region] || null;
  return browserLocale;
}

function getBrowserLanguages(): string[] {
  if (typeof navigator === 'undefined') return [];
  if (navigator.languages?.length) return Array.from(navigator.languages);
  return navigator.language ? [navigator.language] : [];
}

function getLanguageHref(locale: string): string | null {
  return document.querySelector<HTMLAnchorElement>(`[data-language-code="${locale}"]`)?.href || null;
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

function bindLanguageLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-language-code]').forEach((link) => {
    link.addEventListener('click', () => rememberLanguageChoice(link.dataset.languageCode || 'en'));
  });
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

function navigateToLocale(locale: AutoLocale): void {
  const href = getLanguageHref(locale);
  if (!href || href === window.location.href) return;
  window.location.replace(href);
}

async function initializeLanguagePreference(): Promise<void> {
  if (document.documentElement.lang !== 'en') return;

  const savedLanguage = getSavedLanguage();
  if (savedLanguage === 'en') return;
  if (savedLanguage && supportedLocales.includes(savedLanguage as AutoLocale)) {
    navigateToLocale(savedLanguage as AutoLocale);
    return;
  }

  const country = await getIpCountry();
  const locale = resolveAutoLocale(country, getBrowserLanguages());
  if (locale) navigateToLocale(locale);
}

function bootLanguagePreference(): void {
  bindLanguageLinks();
  void initializeLanguagePreference();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootLanguagePreference, { once: true });
  } else {
    queueMicrotask(bootLanguagePreference);
  }
}
