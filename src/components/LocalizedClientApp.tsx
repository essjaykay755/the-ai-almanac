import { StrictMode, Suspense, use, useLayoutEffect } from 'react';
import App from '../App';
import { isStrictAlmanacAppPath } from '../i18n/appPath';
import { prepareLocalizedRuntime, startLocalizedDomSync } from '../i18n/runtimeClient';
import { getLocalizedEntries, type LocalizedLocale } from '../i18n/catalog';
import { NotFoundPage } from './NotFoundPage';

type AlmanacData = typeof import('../data/terms');
const almanacDataPromise: Promise<AlmanacData> = import('../data/terms');
const bengaliKeys = new Set(getLocalizedEntries('bn').map((entry) => entry.key.toLowerCase()));
let bengaliCorpusPrepared = false;

function prepareBengaliCorpus(data: AlmanacData): void {
  if (bengaliCorpusPrepared) return;

  const isVisible = (value: string): boolean => {
    const resolved = data.resolveTerm(value);
    return Boolean(resolved && bengaliKeys.has(resolved.word.toLowerCase()));
  };

  // The Bengali edition must never masquerade an English-only entry as localized.
  // Keep the canonical English technical headword, but expose only entries that
  // have complete Bengali content.
  data.terms.forEach((term) => {
    if (!bengaliKeys.has(term.word.toLowerCase())) return;
    term.related.splice(0, term.related.length, ...term.related.filter(isVisible));
  });

  data.terms.splice(0, data.terms.length, ...data.terms.filter((term) => bengaliKeys.has(term.word.toLowerCase())));
  data.sortedTerms.splice(
    0,
    data.sortedTerms.length,
    ...data.sortedTerms.filter((term) => bengaliKeys.has(term.word.toLowerCase()))
  );

  Object.keys(data.termsByWord).forEach((key) => {
    const term = data.termsByWord[key];
    if (!term || !bengaliKeys.has(term.word.toLowerCase())) delete data.termsByWord[key];
  });

  Object.keys(data.crossRefs).forEach((key) => {
    if (!isVisible(key)) {
      delete data.crossRefs[key];
      return;
    }
    const refs = data.crossRefs[key];
    refs.compare = refs.compare.filter(isVisible);
    refs.confused = refs.confused.filter(isVisible);
  });

  data.timeline.splice(0, data.timeline.length, ...data.timeline.filter((item) => isVisible(item.term)));
  bengaliCorpusPrepared = true;
}

interface LocalizedClientAppProps {
  locale: LocalizedLocale;
  initialTermKey?: string;
}

const appLoader = (
  <div className="app-loading" role="status" aria-live="polite" aria-label="Loading The AI Almanac">
    <div className="app-loading-mark" aria-hidden="true">
      <div className="app-loading-title">The AI Almanac</div>
      <div className="app-loading-rule" />
    </div>
  </div>
);

export function LocalizedClientApp({ locale, initialTermKey }: LocalizedClientAppProps) {
  const data = use(almanacDataPromise);
  if (locale === 'bn') prepareBengaliCorpus(data);

  prepareLocalizedRuntime(locale, initialTermKey);

  useLayoutEffect(() => startLocalizedDomSync(locale), [locale]);

  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname;
  const content = isStrictAlmanacAppPath(pathname, import.meta.env.BASE_URL || '/')
    ? <App />
    : <NotFoundPage />;

  return (
    <StrictMode>
      <Suspense fallback={appLoader}>
        {content}
      </Suspense>
    </StrictMode>
  );
}

export default LocalizedClientApp;
