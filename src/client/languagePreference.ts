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

  // Browser language is the primary signal. Country is a fallback only.
  if (browserLocale) return browserLocale;
  if (region && countryDefaultLocale[region]) return countryDefaultLocale[region] || null;
  return null;
}

function getBrowserLanguages(): string[] {
  if (typeof navigator === 'undefined') return [];
  if (navigator.languages?.length) return Array.from(navigator.languages);
  return navigator.language ? [navigator.language] : [];
}

function getLanguageLink(locale: string): HTMLAnchorElement | null {
  return document.querySelector<HTMLAnchorElement>(`[data-language-code="${locale}"]`);
}

function getLanguageName(locale: AutoLocale): string {
  const link = getLanguageLink(locale);
  return link?.querySelector('span')?.textContent?.trim() || locale.toUpperCase();
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

function rememberDismissedLocale(locale: AutoLocale): void {
  try {
    localStorage.setItem(DISMISSAL_KEY, locale);
  } catch {}
}

function getDismissedLocale(): string | null {
  try {
    return localStorage.getItem(DISMISSAL_KEY);
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

let controlsBound = false;

function bindLanguageControls(): void {
  if (controlsBound) return;
  controlsBound = true;

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const link = target.closest<HTMLAnchorElement>('[data-language-code]');
    if (link) {
      rememberLanguageChoice(link.dataset.languageCode || 'en');
      clearDismissedLocale();
      syncLanguagePreferenceState();
      return;
    }

    const autoButton = target.closest<HTMLButtonElement>('[data-language-auto]');
    if (!autoButton) return;

    clearLanguagePreferenceMemory();
    syncLanguagePreferenceState();
    document.querySelector<HTMLElement>('[data-language-suggestion]')?.remove();
    document.querySelectorAll('details.site-language-switcher').forEach((details) => {
      details.removeAttribute('open');
    });

    if (document.documentElement.lang === 'en') {
      void initializeLanguagePreference();
    }
  });
}

function whenLanguageMenuReady(callback: () => void): void {
  if (document.querySelector('[data-language-code]')) {
    callback();
    return;
  }

  const observer = new MutationObserver(() => {
    if (!document.querySelector('[data-language-code]')) return;
    observer.disconnect();
    callback();
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

function getCountryName(country: string): string {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country;
  } catch {
    return country;
  }
}

function countrySupportsLocale(country: string | null, locale: AutoLocale): boolean {
  if (!country) return false;
  const region = country.trim().toUpperCase();
  if (region === 'IN') return locale === 'hi';
  return countryDefaultLocale[region] === locale;
}

function buildSuggestionMessage(
  locale: AutoLocale,
  country: string | null,
  isSavedPreference: boolean
): string {
  const languageName = getLanguageName(locale);

  if (isSavedPreference) return `Continue in ${languageName}?`;

  if (countrySupportsLocale(country, locale) && country) {
    return `Visiting from ${getCountryName(country)}? The AI Almanac is available in ${languageName}.`;
  }

  return `Your browser prefers ${languageName}. The AI Almanac is available in ${languageName}.`;
}

function showLanguageSuggestion(
  locale: AutoLocale,
  country: string | null,
  isSavedPreference: boolean
): void {
  const host = document.querySelector<HTMLElement>('[data-language-suggestion-host]');
  const link = getLanguageLink(locale);
  if (!host || !link || host.querySelector('[data-language-suggestion]')) return;

  const languageName = getLanguageName(locale);
  const card = document.createElement('aside');
  card.className = 'site-language-suggestion';
  card.dataset.languageSuggestion = locale;
  card.setAttribute('role', 'status');
  card.setAttribute('aria-live', 'polite');

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'site-language-suggestion-close';
  closeButton.setAttribute('aria-label', 'Dismiss language suggestion');
  closeButton.textContent = '×';

  const message = document.createElement('p');
  message.textContent = buildSuggestionMessage(locale, country, isSavedPreference);

  const actions = document.createElement('div');
  actions.className = 'site-language-suggestion-actions';

  const switchButton = document.createElement('button');
  switchButton.type = 'button';
  switchButton.className = 'site-language-suggestion-primary';
  switchButton.textContent = `Switch to ${languageName}`;

  const stayButton = document.createElement('button');
  stayButton.type = 'button';
  stayButton.className = 'site-language-suggestion-secondary';
  stayButton.textContent = 'Stay in English';

  const dismiss = (): void => {
    rememberDismissedLocale(locale);
    card.remove();
  };

  closeButton.addEventListener('click', dismiss);
  stayButton.addEventListener('click', () => {
    rememberLanguageChoice('en');
    dismiss();
    syncLanguagePreferenceState();
  });
  switchButton.addEventListener('click', () => {
    rememberLanguageChoice(locale);
    clearDismissedLocale();
    syncLanguagePreferenceState();
    window.location.assign(link.href);
  });

  actions.append(switchButton, stayButton);
  card.append(closeButton, message, actions);
  host.append(card);
}

async function initializeLanguagePreference(): Promise<void> {
  if (document.documentElement.lang !== 'en') return;

  const savedLanguage = getSavedLanguage();
  if (savedLanguage === 'en') return;

  const country = await getIpCountry();
  const savedLocale = supportedLocales.includes(savedLanguage as AutoLocale)
    ? savedLanguage as AutoLocale
    : null;
  const locale = savedLocale || resolveAutoLocale(country, getBrowserLanguages());

  if (!locale || getDismissedLocale() === locale) return;
  showLanguageSuggestion(locale, country, savedLocale === locale);
}

function bootLanguagePreference(): void {
  bindLanguageControls();
  whenLanguageMenuReady(() => {
    syncLanguagePreferenceState();
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
