const PREFERENCE_KEY = 'aiAlmanacLanguage';
const DISMISSED_KEY = 'aiAlmanacLanguageSuggestionDismissed';

const supportedLocales = ['es', 'pt', 'it', 'fr', 'de', 'hi'] as const;
type SupportedLocale = (typeof supportedLocales)[number];

const regionDefaultLocale: Partial<Record<string, SupportedLocale>> = {
  AR: 'es',
  BO: 'es',
  BR: 'pt',
  CL: 'es',
  CO: 'es',
  CR: 'es',
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

const timezoneRegion: Record<string, string> = {
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Bogota': 'CO',
  'America/Caracas': 'VE',
  'America/Costa_Rica': 'CR',
  'America/Fortaleza': 'BR',
  'America/Guatemala': 'GT',
  'America/La_Paz': 'BO',
  'America/Lima': 'PE',
  'America/Manaus': 'BR',
  'America/Mexico_City': 'MX',
  'America/Montevideo': 'UY',
  'America/Panama': 'PA',
  'America/Recife': 'BR',
  'America/Santiago': 'CL',
  'America/Santo_Domingo': 'DO',
  'America/Sao_Paulo': 'BR',
  'Asia/Calcutta': 'IN',
  'Asia/Kolkata': 'IN',
  'Europe/Berlin': 'DE',
  'Europe/Lisbon': 'PT',
  'Europe/Madrid': 'ES',
  'Europe/Paris': 'FR',
  'Europe/Rome': 'IT'
};

const localeNames: Record<SupportedLocale, string> = {
  es: 'Español',
  pt: 'Português',
  it: 'Italiano',
  fr: 'Français',
  de: 'Deutsch',
  hi: 'हिन्दी'
};

function getBrowserLocales(): Intl.Locale[] {
  const values = navigator.languages?.length ? navigator.languages : [navigator.language];
  return values.flatMap((value) => {
    try {
      return [new Intl.Locale(value)];
    } catch {
      return [];
    }
  });
}

function getRegion(locales: Intl.Locale[]): string | null {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone && timezoneRegion[timezone]) return timezoneRegion[timezone];
  } catch {}

  return locales.find((locale) => locale.region)?.region?.toUpperCase() || null;
}

function getBrowserLocale(locales: Intl.Locale[]): SupportedLocale | null {
  for (const locale of locales) {
    const language = locale.language.toLowerCase();
    if (supportedLocales.includes(language as SupportedLocale)) return language as SupportedLocale;
  }
  return null;
}

function getCountryName(region: string | null): string | null {
  if (!region) return null;
  try {
    const displayNames = new Intl.DisplayNames([navigator.language || 'en'], { type: 'region' });
    return displayNames.of(region) || region;
  } catch {
    return region;
  }
}

function getCandidateLocale(locales: Intl.Locale[], region: string | null): SupportedLocale | null {
  const browserLocale = getBrowserLocale(locales);

  // India deliberately stays English unless the browser explicitly prefers Hindi.
  if (region === 'IN') return browserLocale === 'hi' ? 'hi' : null;

  if (browserLocale) return browserLocale;
  return region ? regionDefaultLocale[region] || null : null;
}

function getLanguageHref(locale: string): string | null {
  return document.querySelector<HTMLAnchorElement>(`[data-language-code="${locale}"]`)?.href || null;
}

function rememberLanguageChoice(locale: string): void {
  try {
    localStorage.setItem(PREFERENCE_KEY, locale);
    localStorage.removeItem(DISMISSED_KEY);
  } catch {}
}

function dismissSuggestion(value = '1'): void {
  try {
    localStorage.setItem(DISMISSED_KEY, value);
  } catch {}
  document.querySelector<HTMLElement>('[data-language-suggestion]')?.setAttribute('hidden', '');
}

function bindLanguageLinks(): void {
  document.querySelectorAll<HTMLAnchorElement>('[data-language-code]').forEach((link) => {
    link.addEventListener('click', () => rememberLanguageChoice(link.dataset.languageCode || 'en'));
  });
}

function showSuggestion(locale: SupportedLocale, region: string | null, savedPreference: boolean): void {
  const suggestion = document.querySelector<HTMLElement>('[data-language-suggestion]');
  const title = suggestion?.querySelector<HTMLElement>('[data-language-suggestion-title]');
  const copy = suggestion?.querySelector<HTMLElement>('[data-language-suggestion-copy]');
  const switchLink = suggestion?.querySelector<HTMLAnchorElement>('[data-language-suggestion-switch]');
  const stayButton = suggestion?.querySelector<HTMLButtonElement>('[data-language-suggestion-stay]');
  const closeButton = suggestion?.querySelector<HTMLButtonElement>('[data-language-suggestion-close]');
  const href = getLanguageHref(locale);
  if (!suggestion || !title || !copy || !switchLink || !stayButton || !closeButton || !href) return;

  const countryName = getCountryName(region);
  title.textContent = savedPreference
    ? `Continue in ${localeNames[locale]}?`
    : countryName
      ? `${countryName} detected`
      : `${localeNames[locale]} available`;
  copy.textContent = savedPreference
    ? `You previously selected ${localeNames[locale]}. Would you like to continue in that language?`
    : countryName
      ? `The AI Almanac is available in ${localeNames[locale]}. Would you like to switch?`
      : `Your browser prefers ${localeNames[locale]}. Would you like to switch?`;
  switchLink.textContent = `Switch to ${localeNames[locale]}`;
  switchLink.href = href;
  switchLink.onclick = () => rememberLanguageChoice(locale);
  stayButton.onclick = () => {
    rememberLanguageChoice('en');
    dismissSuggestion('english');
  };
  closeButton.onclick = () => dismissSuggestion(`${locale}:${region || 'browser'}`);
  suggestion.removeAttribute('hidden');
}

function initializeSuggestion(): void {
  if (document.documentElement.lang !== 'en') return;

  let dismissed = false;
  let savedLanguage: string | null = null;
  try {
    dismissed = Boolean(localStorage.getItem(DISMISSED_KEY));
    savedLanguage = localStorage.getItem(PREFERENCE_KEY);
  } catch {}
  if (dismissed || savedLanguage === 'en') return;

  if (savedLanguage && supportedLocales.includes(savedLanguage as SupportedLocale)) {
    showSuggestion(savedLanguage as SupportedLocale, null, true);
    return;
  }

  const browserLocales = getBrowserLocales();
  const region = getRegion(browserLocales);
  const candidate = getCandidateLocale(browserLocales, region);
  if (candidate) showSuggestion(candidate, region, false);
}

bindLanguageLinks();
initializeSuggestion();
