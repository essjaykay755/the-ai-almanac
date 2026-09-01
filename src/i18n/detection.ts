import type { LocalizedLocale } from './catalog.ts';

const browserLocaleMap: Record<string, LocalizedLocale> = {
  es: 'es',
  pt: 'pt',
  it: 'it',
  fr: 'fr',
  de: 'de',
  hi: 'hi'
};

const countryLocaleMap: Record<string, LocalizedLocale> = {
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
  GQ: 'es',
  GT: 'es',
  HN: 'es',
  IT: 'it',
  MC: 'fr',
  MX: 'es',
  NI: 'es',
  PA: 'es',
  PE: 'es',
  PR: 'es',
  PY: 'es',
  SM: 'it',
  SV: 'es',
  UY: 'es',
  VE: 'es'
};

export function getPrimaryBrowserLocale(languages: readonly string[]): LocalizedLocale | null {
  const primary = languages[0]?.trim().toLowerCase();
  if (!primary) return null;
  const base = primary.split('-')[0];
  return browserLocaleMap[base] || null;
}

export function getCountrySuggestedLocale(countryCode?: string | null): LocalizedLocale | null {
  const country = countryCode?.trim().toUpperCase();
  if (!country || country === 'IN') return null;
  return countryLocaleMap[country] || null;
}

export function getSuggestedLocale(
  languages: readonly string[],
  countryCode?: string | null
): LocalizedLocale | null {
  return getPrimaryBrowserLocale(languages) || getCountrySuggestedLocale(countryCode);
}
