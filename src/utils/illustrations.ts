import manifest from '../data/illustration-manifest.json';
import type { Term } from '../types/almanac';
import { slugifyTerm } from './ogImage';

type IllustrationManifest = {
  termImages: Record<string, string>;
  categoryImages: Record<string, string>;
};

const typedManifest = manifest as IllustrationManifest;
const illustrationPreloadCache = new Map<string, Promise<void>>();

export function getTermIllustrationSource(term: Term): string | null {
  return typedManifest.termImages[slugifyTerm(term.word)]
    || typedManifest.categoryImages[term.category]
    || null;
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
