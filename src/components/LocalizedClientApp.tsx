import { StrictMode, Suspense, useLayoutEffect } from 'react';
import App from '../App';
import { isStrictAlmanacAppPath } from '../i18n/appPath';
import { prepareLocalizedRuntime, startLocalizedDomSync } from '../i18n/runtimeClient';
import type { LocalizedLocale } from '../i18n/catalog';
import { NotFoundPage } from './NotFoundPage';

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
