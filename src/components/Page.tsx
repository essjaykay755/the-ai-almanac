import React, { useDeferredValue, useMemo, useState, useEffect, useRef } from 'react';
import type { Term, ExplanationMode, CrossRefInfo, SpecialModes, TermSelectionTarget } from '../types/almanac';
import { searchTerms, type SearchIndex } from '../utils/search';
import { getPronunciation } from '../utils/pronunciation';
import { APP_VERSION } from '../version';
import {
  getLocalizedTermPresentation,
  getModeLabels,
  getRuntimeLocale,
  getUiStrings
} from '../i18n/reactLocale';

interface PageProps {
  currentTerm: Term;
  termIndex: number;
  totalTerms: number;
  isBookmarked: boolean;
  explanationMode: ExplanationMode;
  specialModes: SpecialModes;
  crossRefs: Record<string, CrossRefInfo>;
  searchIndex: SearchIndex;
  searchQuery: string;
  isMobileSearchOpen: boolean;
  fromSearchQuestion: string;
  trail: string[];
  searchRef: React.RefObject<HTMLInputElement | null>;
  onSelectTerm: (term: TermSelectionTarget, options?: { fromSearch?: boolean; addTrail?: boolean }) => void;
  onCompareTerm: (term: TermSelectionTarget) => void;
  onPrevTerm?: () => void;
  onNextTerm?: () => void;
  onToggleBookmark: () => void;
  onChangeMode: (mode: ExplanationMode) => void;
  onSearchChange: (q: string) => void;
  onClearTrail: () => void;
  onOpenPicker: () => void;
  onOpenClip: () => void;
  onOpenTimeline: () => void;
  onCopyLink: () => void;
  onSpeak: () => void;
}

const PageContent = React.forwardRef<HTMLElement, PageProps>(function Page(
  {
    currentTerm,
    termIndex,
    totalTerms,
    isBookmarked,
    explanationMode,
    specialModes,
    crossRefs,
    searchIndex,
    searchQuery,
    isMobileSearchOpen,
    fromSearchQuestion,
    trail,
    searchRef,
    onSelectTerm,
    onCompareTerm,
    onPrevTerm,
    onNextTerm,
    onToggleBookmark,
    onChangeMode,
    onSearchChange,
    onClearTrail,
    onOpenPicker,
    onOpenClip,
    onOpenTimeline,
    onCopyLink,
    onSpeak
  },
  ref
) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const searchShellRef = useRef<HTMLDivElement>(null);
  const locale = getRuntimeLocale();
  const strings = getUiStrings(locale);
  const modeNames = getModeLabels(locale);
  const localizedTerm = getLocalizedTermPresentation(currentTerm, explanationMode, specialModes, locale);

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const suggestions = useMemo(
    () => searchTerms(deferredSearchQuery, searchIndex, 7),
    [deferredSearchQuery, searchIndex]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchShellRef.current && !searchShellRef.current.contains(event.target as Node)) setShowSuggestions(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault();
      setSelectedSuggestion((previous) => (previous + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
      event.preventDefault();
      setSelectedSuggestion((previous) => (previous - 1 + suggestions.length) % suggestions.length);
    } else if (event.key === 'Escape') {
      setShowSuggestions(false);
      searchRef.current?.blur();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (suggestions.length > 0) {
        const picked = suggestions[selectedSuggestion] || suggestions[0];
        onSelectTerm(picked.term, { fromSearch: true });
        setShowSuggestions(false);
      }
    }
  };

  const handleSearchExample = (example: string) => {
    onSearchChange(example);
    setSelectedSuggestion(0);
    setShowSuggestions(true);
    window.requestAnimationFrame(() => searchRef.current?.focus());
  };

  const getRefs = (term: Term): CrossRefInfo & { see: string[] } => {
    const x = crossRefs[term.word] || { compare: [], confused: [] };
    return {
      see: term.related,
      compare: x.compare && x.compare.length > 0 ? x.compare : term.related.slice(0, 2),
      confused: x.confused || []
    };
  };

  const refs = getRefs(currentTerm);
  const pageNumber = termIndex + 1;
  const pageCounter = `${strings.page} ${pageNumber}`;
  const previousAria = locale === 'en' ? 'Previous definition' : strings.previous;
  const nextAria = locale === 'en' ? 'Next definition' : strings.next;

  return (
    <article className="page" id="page" ref={ref}>
      <div className="page-inner" id="pageInner">
        <header className={`topline${isMobileSearchOpen ? ' mobile-search-open' : ''}`}>
          <div className="edition" id="editionLabel">{strings.fieldEdition} · v{APP_VERSION} · {totalTerms} {strings.terms}</div>

          <div className="search-shell" ref={searchShellRef}>
            <label className="search-box">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
              <input
                ref={searchRef}
                id="search"
                autoComplete="off"
                placeholder={strings.searchPlaceholder}
                aria-label={strings.searchLabel}
                role="combobox"
                aria-expanded={Boolean(showSuggestions && searchQuery.trim())}
                aria-controls="suggestions"
                aria-autocomplete="list"
                aria-activedescendant={suggestions[selectedSuggestion] ? `suggestion-${selectedSuggestion}` : undefined}
                value={searchQuery}
                onChange={(event) => {
                  const value = event.target.value;
                  setSelectedSuggestion(0);
                  setShowSuggestions(Boolean(value.trim()));
                  onSearchChange(value);
                }}
                onFocus={() => { if (searchQuery.trim()) setShowSuggestions(true); }}
                onKeyDown={handleKeyDown}
              />
              <span className="shortcut">⌘ K</span>
            </label>

            {showSuggestions && searchQuery.trim() && (
              <div
                className="suggestions"
                id="suggestions"
                role={suggestions.length > 0 ? 'listbox' : undefined}
                aria-label={suggestions.length > 0 ? strings.searchSuggestions : undefined}
              >
                {suggestions.length === 0 ? (
                  <div className="suggestion-empty">
                    <p role="status"><strong>{strings.noExactMatch}</strong><span>{strings.tryIdea}</span></p>
                    <div className="suggestion-examples">
                      {strings.searchExamples.map((example) => (
                        <button key={example} className="suggestion-example" type="button" onClick={() => handleSearchExample(example)}>{example}</button>
                      ))}
                    </div>
                    <button className="suggestion-clear" type="button" onClick={() => onSearchChange('')}>{strings.clearSearch}</button>
                  </div>
                ) : (
                  suggestions.map((item, index) => (
                    <button
                      key={item.term.word}
                      id={`suggestion-${index}`}
                      type="button"
                      className={`suggestion ${index === selectedSuggestion ? 'active' : ''}`}
                      role="option"
                      aria-selected={index === selectedSuggestion}
                      onClick={() => {
                        onSelectTerm(item.term, { fromSearch: true });
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="letter">{item.term.word[0].toUpperCase()}</span>
                      <span><strong>{item.term.word}</strong><br /><small>{item.term.part}</small></span>
                      <small>{item.score < 0 ? strings.suggested : item.score < 2 ? strings.entry : strings.related}</small>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="folio-top" id="folioTop">{pageCounter}</div>
        </header>

        <div className="page-layout">
          <section className="entry" id="entry" aria-live="polite">
            <button
              className={`bookmark-btn ${isBookmarked ? 'saved' : ''}`}
              id="bookmarkBtn"
              onClick={onToggleBookmark}
              aria-label={`${isBookmarked ? strings.removeBookmark : strings.bookmark} ${localizedTerm.word}`}
              title={isBookmarked ? strings.removeBookmark : strings.bookmarkEntry}
            >
              <svg className="bookmark-svg" viewBox="0 0 24 34" fill="none"><path d="M3 0H21V30L12 23L3 30V0Z" className="bookmark-ribbon-path" /></svg>
              <span className="bookmark-star">{isBookmarked ? '★' : '☆'}</span>
            </button>

            <div className="headword-line"><h1 className="word">{localizedTerm.word}</h1><span className="part">{localizedTerm.part}</span></div>

            <div className="pronounce-row">
              <span className="pronounce-text">{getPronunciation(currentTerm.word, currentTerm.pron)}</span>
              <button className="speak" id="speakBtn" onClick={onSpeak} aria-label={`${strings.pronounce} ${localizedTerm.word}`} title={`${strings.pronounce} ${localizedTerm.word}`}>
                <svg viewBox="0 0 24 24"><path d="M5 10v4h4l5 4V6l-5 4H5z" /><path d="M17 9c1 1 1.5 2 1.5 3S18 14 17 15M19 6.5c2 1.6 3 3.5 3 5.5s-1 3.9-3 5.5" /></svg>
              </button>
            </div>

            <div className="mode-switch" id="modeSwitch" role="tablist" aria-label={strings.explanationMode}>
              {(Object.keys(modeNames) as ExplanationMode[]).map((mode) => (
                <button key={mode} type="button" id={`mode-tab-${mode}`} role="tab" aria-selected={explanationMode === mode} aria-controls="definitionContent" className={`mode-btn ${explanationMode === mode ? 'active' : ''}`} onClick={() => onChangeMode(mode)}>{modeNames[mode]}</button>
              ))}
            </div>

            <div className="definition-wrap" id="definitionContent" role="tabpanel" aria-labelledby={`mode-tab-${explanationMode}`} tabIndex={0}>
              <span className="sense-num">1.</span>
              <div className="definition-mode">{modeNames[explanationMode]}</div>
              <p className={`definition ${fromSearchQuestion ? 'search-hit' : ''}`}>{localizedTerm.definition}</p>
              <p className="example">{localizedTerm.example}</p>
            </div>

            <div className="lower-grid">
              <section><h3 className="kicker">{strings.origin}</h3><p>{localizedTerm.origin}</p></section>
              <section><h3 className="kicker">{strings.inPractice}</h3><p>{localizedTerm.note}</p></section>
            </div>

            <div className="entry-actions" id="entryActions">
              <button className="text-action" onClick={onOpenPicker} id="addCollection">{strings.addCollection}</button>
              <button className="text-action" onClick={onOpenClip} id="clipEntry">{strings.saveEntry}</button>
              <button className="text-action" onClick={onCopyLink} id="copyDeepLink">{strings.copyLink}</button>
              <button className="text-action" onClick={onOpenTimeline} id="openChronology">{strings.navTimeline}</button>
            </div>

            <div className="thread" id="thread">
              <div className="thread-head"><span className="thread-title">{strings.recentTerms}</span><button className="thread-clear" onClick={onClearTrail} id="clearThread">{strings.clearList}</button></div>
              <div className="trail" id="trail">{trail.slice(-10).map((word, index) => <button key={`${word}-${index}`} onClick={() => onSelectTerm({ word }, { addTrail: false })}>{word}</button>)}</div>
            </div>
          </section>

          <aside className="margin" id="margin">
            {refs.see.length > 0 && <section className="margin-section"><h3>{strings.seeAlso}</h3><div className="xref">{refs.see.map((related) => <button key={related} onClick={() => onSelectTerm({ word: related })}>{related}</button>)}</div></section>}

            {refs.compare.length > 0 && (
              <section className="margin-section">
                <h3>{strings.compare}</h3>
                <div className="xref">
                  {refs.compare.map((related) => (
                    <button
                      key={related}
                      type="button"
                      aria-label={locale === 'en' ? `Compare ${currentTerm.word} with ${related}` : `${strings.compare} ${localizedTerm.word} / ${related}`}
                      onClick={() => onCompareTerm({ word: related })}
                    >{related}</button>
                  ))}
                </div>
              </section>
            )}

            {refs.confused.length > 0 && <section className="margin-section"><h3>{strings.confused}</h3><div className="xref">{refs.confused.map((related) => <button key={related} onClick={() => onSelectTerm({ word: related })}>{related}</button>)}</div></section>}

            <section className="margin-section"><h3>{strings.filedUnder}</h3><p>{localizedTerm.category || strings.aiConcepts}</p></section>

            <aside className={`margin-note ${fromSearchQuestion ? 'search-note' : ''}`}>
              <strong>{fromSearchQuestion ? strings.almanacSuggests : strings.marginalia}</strong>
              <p>{fromSearchQuestion ? strings.searchPointsToEntry(fromSearchQuestion) : localizedTerm.note}</p>
            </aside>
          </aside>
        </div>

        <footer className="page-footer" id="pageNavigation">
          <button type="button" className="footer-nav footer-prev left" onClick={onPrevTerm} title={previousAria} aria-label={previousAria} id="prevDefBtn"><span className="nav-arrow">←</span> {strings.previous}</button>
          <span className="center" id="pageNumber">{pageCounter}</span>
          <button type="button" className="footer-nav footer-next right" onClick={onNextTerm} title={nextAria} aria-label={nextAria} id="nextDefBtn">{strings.next} <span className="nav-arrow">→</span></button>
        </footer>
      </div>
    </article>
  );
});

export const Page = React.memo(PageContent);
