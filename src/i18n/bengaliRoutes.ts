import { getLocalizedEntryByKey } from './catalog';
import { slugifyTerm } from '../utils/ogImage';

export function getBengaliTermSlug(termKey: string): string {
  return getLocalizedEntryByKey('bn', termKey)?.slug || slugifyTerm(termKey);
}

export function getBengaliTermPath(termKey: string): string {
  return `bn/term/${getBengaliTermSlug(termKey)}/`;
}
