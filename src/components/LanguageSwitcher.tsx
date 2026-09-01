import React from 'react';
import {
  allLocaleCodes,
  getLanguageSwitchPath,
  getLocaleFromPathname,
  localeMeta,
  type SupportedLocale
} from '../i18n/catalog';
import { getPublicPath } from '../utils/ogImage';

const automaticLanguageLabels: Record<SupportedLocale, string> = {
  en: 'Automatic',
  es: 'Automático',
  pt: 'Automático',
  it: 'Automatico',
  fr: 'Automatique',
  de: 'Automatisch',
  hi: 'स्वचालित'
};

interface LanguageSwitcherProps {
  termKey?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ termKey }) => {
  const base = import.meta.env.BASE_URL || '/';
  const locale = typeof window === 'undefined'
    ? 'en'
    : getLocaleFromPathname(window.location.pathname, base);
  const currentMeta = localeMeta[locale];

  return (
    <div className="site-language-control">
      <details className="site-language-switcher">
        <summary aria-label={currentMeta.languageLabel}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M3.5 12h17" />
            <path d="M12 3.5c2.4 2.8 3.6 5.7 3.6 8.5s-1.2 5.7-3.6 8.5" />
            <path d="M12 3.5C9.6 6.3 8.4 9.2 8.4 12s1.2 5.7 3.6 8.5" />
          </svg>
          <span>{currentMeta.languageLabel}</span>
          <small>{currentMeta.shortName}</small>
        </summary>
        <nav className="site-language-menu" aria-label={currentMeta.languageLabel}>
          {allLocaleCodes.map((code) => {
            const meta = localeMeta[code];
            return (
              <a
                key={code}
                href={getPublicPath(base, getLanguageSwitchPath(code, termKey))}
                hrefLang={meta.htmlLang}
                lang={meta.htmlLang}
                aria-current={code === locale ? 'true' : undefined}
                data-language-code={code}
              >
                <span>{meta.nativeName}</span>
                <span>{meta.shortName}</span>
              </a>
            );
          })}
          <button type="button" className="site-language-auto" data-language-auto>
            <span>{automaticLanguageLabels[locale]}</span>
            <span>AUTO</span>
          </button>
        </nav>
      </details>
    </div>
  );
};

