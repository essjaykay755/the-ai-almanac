import { getLocaleFromPathname, type SupportedLocale } from '../i18n/catalog.ts';

const PREFERENCE_KEY = 'aiAlmanacLanguage';
const DISMISSAL_KEY = 'aiAlmanacLanguageSuggestionDismissed';
const AUTO_SWITCH_SESSION_KEY = 'aiAlmanacAutomaticLanguageSwitch';

const supportedLocales = ['es', 'pt', 'it', 'fr', 'de', 'hi'] as const;
export type AutoLocale = (typeof supportedLocales)[number];

const countryDefaultLocale: Partial<Record<string, AutoLocale>> = {
  AR: 'es', AT: 'de', BO: 'es', BR: 'pt', CL: 'es', CO: 'es', CR: 'es', CU: 'es', DE: 'de',
  DO: 'es', EC: 'es', ES: 'es', FR: 'fr', GT: 'es', HN: 'es', IT: 'it', MX: 'es', NI: 'es',
  PA: 'es', PE: 'es', PR: 'es', PT: 'pt', PY: 'es', SV: 'es', UY: 'es', VE: 'es'
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
  const region = country?.trim().toUpperCase() || null;

  // India intentionally defaults to English regardless of browser language.
  if (region === 'IN') return null;

  // A successfully detected country is authoritative. Unsupported countries stay English.
  if (region) return countryDefaultLocale[region] || null;

  // Browser language is only a fallback when IP country detection is unavailable.
  return getPreferredBrowserLocale(browserLanguages);
}

function getBrowserLanguages(): string[] {
  if (typeof navigator === 'undefined') return [];
  if (navigator.languages?.length) return Array.from(navigator.languages);
  return navigator.language ? [navigator.language] : [];
}

function getLanguageLink(locale: string): HTMLAnchorElement | null {
  return document.querySelector<HTMLAnchorElement>(`[data-language-code="${locale}"]`);
}

function getLanguageName(locale: string): string {
  const link = getLanguageLink(locale);
  return link?.querySelector('span')?.textContent?.trim() || locale.toUpperCase();
}

function getCurrentLocale(): SupportedLocale {
  return getLocaleFromPathname(window.location.pathname, import.meta.env.BASE_URL || '/');
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

function rememberAutomaticSwitch(locale: AutoLocale, country: string | null): void {
  try {
    sessionStorage.setItem(AUTO_SWITCH_SESSION_KEY, JSON.stringify({ locale, country }));
  } catch {}
}

function readAutomaticSwitch(): { locale: AutoLocale; country: string | null } | null {
  try {
    const raw = sessionStorage.getItem(AUTO_SWITCH_SESSION_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as { locale?: unknown; country?: unknown };
    if (!supportedLocales.includes(value.locale as AutoLocale)) return null;
    return {
      locale: value.locale as AutoLocale,
      country: typeof value.country === 'string' ? value.country : null
    };
  } catch {
    return null;
  }
}

function clearAutomaticSwitch(): void {
  try {
    sessionStorage.removeItem(AUTO_SWITCH_SESSION_KEY);
  } catch {}
}

function syncLanguagePreferenceState(): void {
  const savedLanguage = getSavedLanguage();

  document.querySelectorAll<HTMLButtonElement>('[data-language-auto]').forEach((button) => {
    if (savedLanguage) button.removeAttribute('aria-current');
    else button.setAttribute('aria-current', 'true');
  });

  document.querySelectorAll<HTMLAnchorElement>('[data-language-code]').forEach((link) => {
    if (savedLanguage && link.dataset.languageCode === savedLanguage) link.dataset.languageRemembered = 'true';
    else delete link.dataset.languageRemembered;
  });
}

function closeLanguageMenus(): void {
  document.querySelectorAll('details.site-language-switcher').forEach((details) => details.removeAttribute('open'));
}

function isSameDestination(link: HTMLAnchorElement): boolean {
  const next = new URL(link.href, window.location.href);
  const current = new URL(window.location.href);
  return next.origin === current.origin && next.pathname === current.pathname && next.search === current.search;
}

function navigateToLocale(locale: AutoLocale): void {
  const link = getLanguageLink(locale);
  if (!link || isSameDestination(link)) return;
  window.location.assign(link.href);
}

function navigateToEnglish(): void {
  const link = getLanguageLink('en');
  if (!link || isSameDestination(link)) return;
  window.location.assign(link.href);
}

function getCountryName(country: string | null): string | null {
  if (!country) return null;
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(country) || country;
  } catch {
    return country;
  }
}

function showAutomaticSwitchBanner(): void {
  const pending = readAutomaticSwitch();
  if (!pending || pending.locale !== getCurrentLocale()) return;

  const host = document.querySelector<HTMLElement>('[data-language-suggestion-host]');
  const englishLink = getLanguageLink('en');
  if (!host || !englishLink || host.querySelector('[data-language-suggestion]')) return;

  const languageName = getLanguageName(pending.locale);
  const countryName = getCountryName(pending.country);
  const card = document.createElement('aside');
  card.className = 'site-language-suggestion';
  card.dataset.languageSuggestion = pending.locale;
  card.setAttribute('role', 'status');
  card.setAttribute('aria-live', 'polite');

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'site-language-suggestion-close';
  closeButton.setAttribute('aria-label', 'Dismiss language notice');
  closeButton.textContent = '×';

  const message = document.createElement('p');
  message.textContent = countryName
    ? `We switched The AI Almanac to ${languageName} based on your location in ${countryName}.`
    : `We switched The AI Almanac to ${languageName} based on your browser language.`;

  const actions = document.createElement('div');
  actions.className = 'site-language-suggestion-actions';

  const keepButton = document.createElement('button');
  keepButton.type = 'button';
  keepButton.className = 'site-language-suggestion-primary';
  keepButton.textContent = `Keep ${languageName}`;

  const englishButton = document.createElement('button');
  englishButton.type = 'button';
  englishButton.className = 'site-language-suggestion-secondary';
  englishButton.textContent = 'Use English';

  const dismiss = () => {
    clearAutomaticSwitch();
    card.remove();
  };

  closeButton.addEventListener('click', dismiss);
  keepButton.addEventListener('click', () => {
    rememberLanguageChoice(pending.locale);
    clearDismissedLocale();
    syncLanguagePreferenceState();
    dismiss();
  });
  englishButton.addEventListener('click', () => {
    rememberLanguageChoice('en');
    clearDismissedLocale();
    clearAutomaticSwitch();
    window.location.assign(englishLink.href);
  });

  actions.append(keepButton, englishButton);
  card.append(closeButton, message, actions);
  host.append(card);
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
      clearAutomaticSwitch();
      rememberLanguageChoice(link.dataset.languageCode || 'en');
      clearDismissedLocale();
      syncLanguagePreferenceState();
      return;
    }

    const autoButton = target.closest<HTMLButtonElement>('[data-language-auto]');
    if (!autoButton) return;

    cancelLanguagePreferenceInitialization();
    clearAutomaticSwitch();
    clearLanguagePreferenceMemory();
    syncLanguagePreferenceState();
    closeLanguageMenus();
    void initializeLanguagePreference(true);
  });
}

function addedLanguageMenu(node: Node): boolean {
  if (!(node instanceof Element)) return false;
  return node.matches('.site-language-switcher') || Boolean(node.querySelector('.site-language-switcher'));
}

function observeLanguageMenus(callback: () => void): void {
  if (document.querySelector('.site-language-switcher')) callback();

  const observer = new MutationObserver((mutations) => {
    const hasNewMenu = mutations.some((mutation) => Array.from(mutation.addedNodes).some(addedLanguageMenu));
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

async function initializeLanguagePreference(allowLocalizedPage = false): Promise<void> {
  const requestId = ++languagePreferenceRequestId;
  const currentLocale = getCurrentLocale();

  // Direct localized links from search or sharing are respected. Automatic mode is the exception.
  if (!allowLocalizedPage && (currentLocale !== 'en' || document.documentElement.lang !== 'en')) return;

  const savedLanguage = getSavedLanguage();
  if (savedLanguage === 'en') return;

  if (supportedLocales.includes(savedLanguage as AutoLocale)) {
    if (currentLocale === 'en') navigateToLocale(savedLanguage as AutoLocale);
    return;
  }

  const country = await getIpCountry();
  if (requestId !== languagePreferenceRequestId) return;

  const latestSavedLanguage = getSavedLanguage();
  if (latestSavedLanguage) return;

  const locale = resolveAutoLocale(country, getBrowserLanguages());
  if (requestId !== languagePreferenceRequestId) return;

  if (locale) {
    rememberAutomaticSwitch(locale, country);
    if (locale !== getCurrentLocale()) {
      navigateToLocale(locale);
      return;
    }
    showAutomaticSwitchBanner();
    return;
  }

  clearAutomaticSwitch();
  if (allowLocalizedPage && getCurrentLocale() !== 'en') navigateToEnglish();
}

function bootLanguagePreference(): void {
  bindLanguageControls();

  let initialized = false;
  observeLanguageMenus(() => {
    syncLanguagePreferenceState();
    showAutomaticSwitchBanner();
    if (initialized) return;
    initialized = true;
    void initializeLanguagePreference();
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bootLanguagePreference, { once: true });
  else queueMicrotask(bootLanguagePreference);
}
