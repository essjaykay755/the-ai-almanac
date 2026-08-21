import React, { useDeferredValue, useMemo, useState, useEffect, useRef } from 'react';
import type { Term, ExplanationMode, CrossRefInfo, SpecialModes, TermSelectionTarget } from '../types/almanac';
import { searchTerms, type SearchIndex } from '../utils/search';
import { getPronunciation } from '../utils/pronunciation';
import { getExplanationForTerm } from '../utils/explanations';
import { APP_VERSION } from '../version';

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

const modeNames: Record<ExplanationMode, string> = {
  dictionary: 'Dictionary',
  plain: 'Plain English',
  technical: 'Technical',
  vibe: 'Vibe Coder'
};

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

  const deferredSearchQuery = useDeferredValue(searchQuery);
  const suggestions = useMemo(
    () => searchTerms(deferredSearchQuery, searchIndex, 7),
    [deferredSearchQuery, searchIndex]
  );

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchShellRef.current && !searchShellRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp' && suggestions.length > 0) {
      e.preventDefault();
      setSelectedSuggestion((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      searchRef.current?.blur();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (suggestions.length > 0) {
        const picked = suggestions[selectedSuggestion] || suggestions[0];
        onSelectTerm(picked.term, { fromSearch: true });
        setShowSuggestions(false);
      }
    }
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
  const explanationText = getExplanationForTerm(currentTerm, explanationMode, specialModes);
  // Each glossary entry is one real page in the alphabetical book order.
  const pageNumber = termIndex + 1;
  const pageCounter = `Page ${pageNumber}`;

  return (
    <article className="page" id="page" ref={ref}>
      <div className="page-inner" id="pageInner">
        <header className={`topline${isMobileSearchOpen ? ' mobile-search-open' : ''}`}>
          <div className="edition" id="editionLabel">
            Field edition · v{APP_VERSION} · {totalTerms} terms
          </div>

          <div className="search-shell" ref={searchShellRef}>
            <label className="search-box">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
              <input
                ref={searchRef}
                id="search"
                autoComplete="off"
                placeholder="Ask The AI Almanac or search a term…"
                aria-label="Search The AI Almanac"
                value={searchQuery}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedSuggestion(0);
                  setShowSuggestions(Boolean(value.trim()));
                  onSearchChange(value);
                }}
                onFocus={() => {
                  if (searchQuery.trim()) setShowSuggestions(true);
                }}
                onKeyDown={handleKeyDown}
              />
              <span className="shortcut">⌘ K</span>
            </label>

            {showSuggestions && searchQuery.trim() && (
              <div className="suggestions" id="suggestions">
                {suggestions.length === 0 ? (
                  <button className="suggestion" type="button">
                    <span className="letter">?</span>
                    <span>
                      <strong>No exact match</strong>
                      <br />
                      <small>Describe the idea instead</small>
                    </span>
                  </button>
                ) : (
                  suggestions.map((item, idx) => (
                    <button
                      key={item.term.word}
                      type="button"
                      className={`suggestion ${idx === selectedSuggestion ? 'active' : ''}`}
                      onClick={() => {
                        onSelectTerm(item.term, { fromSearch: true });
                        setShowSuggestions(false);
                      }}
                    >
                      <span className="letter">{item.term.word[0].toUpperCase()}</span>
                      <span>
                        <strong>{item.term.word}</strong>
                        <br />
                        <small>{item.term.part}</small>
                      </span>
                      <small>{item.score < 0 ? 'suggested' : item.score < 2 ? 'entry' : 'related'}</small>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="folio-top" id="folioTop">
            {pageCounter}
          </div>
        </header>

        <div className="page-layout">
          <section className="entry" id="entry" aria-live="polite">
            <button
              className={`bookmark-btn ${isBookmarked ? 'saved' : ''}`}
              id="bookmarkBtn"
              onClick={onToggleBookmark}
              aria-label={`${isBookmarked ? 'Remove bookmark' : 'Bookmark'} ${currentTerm.word}`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark this entry'}
            >
              <svg className="bookmark-svg" viewBox="0 0 24 34" fill="none">
                <path
                  d="M3 0H21V30L12 23L3 30V0Z"
                  className="bookmark-ribbon-path"
                />
              </svg>
              <span className="bookmark-star">{isBookmarked ? '★' : '☆'}</span>
            </button>

            <div className="headword-line">
              <h1 className="word">{currentTerm.word}</h1>
              <span className="part">{currentTerm.part}</span>
            </div>

            <div className="pronounce-row">
              <span className="pronounce-text">{getPronunciation(currentTerm.word, currentTerm.pron)}</span>
              <button className="speak" id="speakBtn" onClick={onSpeak} aria-label={`Pronounce ${currentTerm.word}`} title={`Pronounce ${currentTerm.word}`}>
                <svg viewBox="0 0 24 24">
                  <path d="M5 10v4h4l5 4V6l-5 4H5z" />
                  <path d="M17 9c1 1 1.5 2 1.5 3S18 14 17 15M19 6.5c2 1.6 3 3.5 3 5.5s-1 3.9-3 5.5" />
                </svg>
              </button>
            </div>

            <div className="mode-switch" id="modeSwitch">
              {(Object.keys(modeNames) as ExplanationMode[]).map((m) => (
                <button
                  key={m}
                  className={`mode-btn ${explanationMode === m ? 'active' : ''}`}
                  onClick={() => onChangeMode(m)}
                >
                  {modeNames[m]}
                </button>
              ))}
            </div>

            <div className="definition-wrap" id="definitionContent">
              <span className="sense-num">1.</span>
              <div className="definition-mode">{modeNames[explanationMode]}</div>
              <p className={`definition ${fromSearchQuestion ? 'search-hit' : ''}`}>{explanationText}</p>
              <p className="example">{currentTerm.example || ''}</p>
            </div>

            <div className="lower-grid">
              <section>
                <h3 className="kicker">Origin</h3>
                <p>{currentTerm.origin}</p>
              </section>
              <section>
                <h3 className="kicker">In practice</h3>
                <p>{currentTerm.note}</p>
              </section>
            </div>

            <div className="entry-actions" id="entryActions">
              <button className="text-action" onClick={onOpenPicker} id="addCollection">
                + add to collection
              </button>
              <button className="text-action" onClick={onOpenClip} id="clipEntry">
                save entry
              </button>
              <button className="text-action" onClick={onCopyLink} id="copyDeepLink">
                copy link
              </button>
              <button className="text-action" onClick={onOpenTimeline} id="openChronology">
                timeline
              </button>
            </div>

            <div className="thread" id="thread">
              <div className="thread-head">
                <span className="thread-title">Recent terms</span>
                <button className="thread-clear" onClick={onClearTrail} id="clearThread">
                  Clear list
                </button>
              </div>
              <div className="trail" id="trail">
                {trail.slice(-10).map((word, idx) => (
                  <button
                    key={`${word}-${idx}`}
                    onClick={() => {
                      onSelectTerm({ word }, { addTrail: false });
                    }}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <aside className="margin" id="margin">
            {refs.see.length > 0 && (
              <section className="margin-section">
                <h3>See also</h3>
                <div className="xref">
                  {refs.see.map((r) => (
                    <button key={r} onClick={() => onSelectTerm({ word: r })}>
                      {r}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {refs.compare.length > 0 && (
              <section className="margin-section">
                <h3>Compare</h3>
                <div className="xref">
                  {refs.compare.map((r) => (
                    <button key={r} onClick={() => onSelectTerm({ word: r })}>
                      {r}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {refs.confused.length > 0 && (
              <section className="margin-section">
                <h3>Often confused with</h3>
                <div className="xref">
                  {refs.confused.map((r) => (
                    <button key={r} onClick={() => onSelectTerm({ word: r })}>
                      {r}
                    </button>
                  ))}
                </div>
              </section>
            )}

            <section className="margin-section">
              <h3>Filed under</h3>
              <p>{currentTerm.category || 'AI Concepts'}</p>
            </section>

            <aside className={`margin-note ${fromSearchQuestion ? 'search-note' : ''}`}>
              <strong>{fromSearchQuestion ? 'The Almanac suggests' : 'Marginalia'}</strong>
              <p>
                {fromSearchQuestion
                  ? `“${fromSearchQuestion}” points most closely to this entry.`
                  : currentTerm.note}
              </p>
            </aside>
          </aside>
        </div>

        <footer className="page-footer" id="pageNavigation">
          <button
            type="button"
            className="footer-nav footer-prev left"
            onClick={onPrevTerm}
            title="Previous definition (Left arrow or P)"
            aria-label="Previous definition"
            id="prevDefBtn"
          >
            <span className="nav-arrow">←</span> Previous
          </button>
          <span className="center" id="pageNumber">
            {pageCounter}
          </span>
          <button
            type="button"
            className="footer-nav footer-next right"
            onClick={onNextTerm}
            title="Next definition (Right arrow or N)"
            aria-label="Next definition"
            id="nextDefBtn"
          >
            Next <span className="nav-arrow">→</span>
          </button>
        </footer>
      </div>
    </article>
  );
});

export const Page = React.memo(PageContent);
