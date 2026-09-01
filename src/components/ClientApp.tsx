import { StrictMode, Suspense, useLayoutEffect } from 'react';
import App from '../App';
import { prepareLocalizedRuntime, startLocalizedDomSync } from '../i18n/runtimeClient';
import type { SupportedLocale } from '../i18n/catalog';

interface ClientAppProps {
  locale?: SupportedLocale;
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

export function ClientApp({ locale = 'en', initialTermKey }: ClientAppProps) {
  prepareLocalizedRuntime(locale, initialTermKey);

  useLayoutEffect(() => startLocalizedDomSync(locale), [locale]);

  return (
    <StrictMode>
      <Suspense fallback={appLoader}>
        <App />
      </Suspense>
    </StrictMode>
  );
}

export default ClientApp;
