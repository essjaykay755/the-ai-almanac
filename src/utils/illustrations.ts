import manifest from '../data/illustration-manifest.json';
import type { Term } from '../types/almanac';
import { getPublicPath, slugifyTerm } from './ogImage';
import { APP_VERSION } from '../version';

type IllustrationManifest = {
  termImages: Record<string, string>;
  categoryImages: Record<string, string>;
};

const typedManifest = manifest as IllustrationManifest;
const illustrationPreloadCache = new Map<string, Promise<void>>();

export function getTermIllustrationSource(term: Term): string | null {
  const source = typedManifest.termImages[slugifyTerm(term.word)]
    || typedManifest.categoryImages[term.category]
    || null;

  if (!source) return null;

  // Manifest paths are site-root relative; resolve them under the deploy base.
  // Illustration URLs use immutable CDN caching; APP_VERSION invalidates them on release.
  const publicPath = getPublicPath(import.meta.env?.BASE_URL || '/', source);
  return `${publicPath}?v=${encodeURIComponent(APP_VERSION)}`;
}

export function preloadTermIllustration(term: Term): void {
  const source = getTermIllustrationSource(term);
  if (!source || typeof window === 'undefined' || illustrationPreloadCache.has(source)) return;

  const ready = new Promise<void>((resolve) => {
    const image = new window.Image();
    const finish = () => resolve();
    image.decoding = 'async';
    image.onload = finish;
    image.onerror = finish;
    image.src = source;
    if (image.complete) finish();
  });

  illustrationPreloadCache.set(source, ready);
}
