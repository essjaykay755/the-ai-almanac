import { StrictMode, Suspense, use, useLayoutEffect } from 'react';
import App from '../App';
import { isStrictAlmanacAppPath } from '../i18n/appPath';
import { prepareLocalizedRuntime, startLocalizedDomSync } from '../i18n/runtimeClient';
import type { LocalizedLocale } from '../i18n/catalog';
import { getBengaliTermCopy } from '../i18n/bengali';
import { getBengaliDefinition } from '../i18n/bengaliDefinitions.generated';
import { NotFoundPage } from './NotFoundPage';

type AlmanacData = typeof import('../data/terms');
const almanacDataPromise: Promise<AlmanacData> = import('../data/terms');
const bengaliParts: Record<string, string> = {
  noun: 'বিশেষ্য',
  verb: 'ক্রিয়া',
  adjective: 'বিশেষণ',
  phrase: 'বাক্যাংশ',
  acronym: 'সংক্ষিপ্ত রূপ'
};
let bengaliCorpusPrepared = false;

function prepareBengaliCorpus(data: AlmanacData): void {
  if (bengaliCorpusPrepared) return;

  // Every source term has a committed Bengali definition. Keep canonical
  // technical headwords in English while replacing the explanatory text used
  // by the page, search, overlays and page-turn snapshots. Hand-curated Bengali
  // entries override the generated definition where richer copy exists.
  data.terms.forEach((term) => {
    const generatedDefinition = getBengaliDefinition(term.word);
    if (!generatedDefinition) {
      throw new Error(`Missing Bengali definition for ${term.word}`);
    }

    term.definition = generatedDefinition;
    term.part = bengaliParts[term.part.toLowerCase()] || term.part;
    data.specialModes[term.word] = {
      plain: `সহজভাবে: ${generatedDefinition}`,
      technical: `প্রযুক্তিগতভাবে: ${generatedDefinition}`,
      vibe: `ভাইব কোডারের দৃষ্টিতে: ${generatedDefinition}`
    };

    const curated = getBengaliTermCopy(term.word);
    if (!curated) return;

    term.definition = curated.modes.dictionary;
    term.example = curated.example;
    term.origin = curated.origin;
    term.note = curated.note;
    term.category = curated.category;
    data.specialModes[term.word] = {
      plain: curated.modes.plain,
      technical: curated.modes.technical,
      vibe: curated.modes.vibe
    };
  });

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
