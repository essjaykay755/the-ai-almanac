import { localizedLocales, type LocalizedLocale } from './catalog.ts';

function stripBasePath(pathname: string, baseUrl = '/'): string {
  const base = baseUrl.replace(/\/+$/, '');
  if (base && pathname === base) return '/';
  if (base && pathname.startsWith(`${base}/`)) return pathname.slice(base.length) || '/';
  return pathname;
}

function isLocalizedLocale(value: string): value is LocalizedLocale {
  return (localizedLocales as readonly string[]).includes(value);
}

export function isStrictAlmanacAppPath(pathname: string, baseUrl = '/'): boolean {
  const normalized = stripBasePath(pathname, baseUrl).replace(/\/+$/, '') || '/';
  if (normalized === '/' || normalized === '/index.html' || normalized === '/about') return true;

  const segments = normalized.replace(/^\/+/, '').split('/');

  if (segments.length === 1 && isLocalizedLocale(segments[0])) return true;
  if (segments.length === 2 && segments[0] === 'term' && Boolean(segments[1])) return true;
  if (
    segments.length === 3 &&
    isLocalizedLocale(segments[0]) &&
    segments[1] === 'term' &&
    Boolean(segments[2])
  ) return true;

  return false;
}
