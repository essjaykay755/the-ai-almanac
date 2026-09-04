import { getLocalizedEntryByKey } from './catalog.ts';
import { slugifyTerm } from '../utils/ogImage.ts';

export function getBengaliTermSlug(termKey: string): string {
  return getLocalizedEntryByKey('bn', termKey)?.slug || slugifyTerm(termKey);
}

export function getBengaliTermPath(termKey: string): string {
  return `bn/term/${getBengaliTermSlug(termKey)}/`;
}
