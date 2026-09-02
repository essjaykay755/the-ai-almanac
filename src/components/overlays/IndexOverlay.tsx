import React, { useEffect, useMemo, useState } from 'react';
import type { Term, TermSelectionTarget } from '../../types/almanac';
import { normalizeText } from '../../utils/search';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import { getOverlayStrings } from '../../i18n/overlayLocale';
import { getUiStrings } from '../../i18n/reactLocale';

interface IndexOverlayProps {
  isOpen: boolean;
  terms: Term[];
  onClose: () => void;
  onSelectTerm: (term: TermSelectionTarget) => void;
}

export const IndexOverlay: React.FC<IndexOverlayProps> = ({
  isOpen,
  terms,
  onClose,
  onSelectTerm
}) => {
  const strings = getOverlayStrings();
  const ui = getUiStrings();
  const [indexQuery, setIndexQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const dialogRef = useDialogFocus(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      setIndexQuery('');
      setCategoryFilter('');
    }
  }, [isOpen]);

  const categories = useMemo(
    () => Array.from(new Set(terms.map((term) => term.category || ui.aiConcepts))).sort(),
    [terms, ui.aiConcepts]
  );

  const filteredTerms = useMemo(() => {
    const query = normalizeText(indexQuery);
    if (!query && !categoryFilter) return terms;

    return terms.filter((term) => normalizeText([
      term.word,
      term.category,
      ...term.aliases
    ].join(' ')).includes(query) && (!categoryFilter || (term.category || ui.aiConcepts) === categoryFilter));
  }, [categoryFilter, indexQuery, terms, ui.aiConcepts]);

  const groups = useMemo(() => {
    const map: Record<string, Term[]> = {};
    filteredTerms.forEach((term) => {
      const letter = term.word[0].toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(term);
    });
    return map;
  }, [filteredTerms]);

  if (!isOpen) return null;

  const sortedLetters = Object.keys(groups).sort();
  const jumpToLetter = (letter: string) => {
    document.getElementById(`index-letter-${letter}`)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="overlay" id="indexOverlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="insert index-insert"
        role="dialog"
        aria-modal="true"
        aria-labelledby="index-title"
        aria-describedby="indexSummary"
        tabIndex={-1}
      >
        <div className="insert-head">
          <div>
            <small>The AI Almanac · {strings.completeIndex}</small>
            <h2 id="index-title">{strings.everyFiledTerm}</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label={`${strings.close} ${strings.completeIndex}`}>
            ×
          </button>
        </div>

        <div className="index-summary" id="indexSummary" aria-live="polite">
          {filteredTerms.length} / {terms.length} {strings.entries} · {sortedLetters.length} {strings.indexSections} · {strings.updatedFieldEdition}
        </div>

        <div className="index-tools">
          <div className="index-filter-field">
            <label className="index-search-label" htmlFor="indexSearch">{strings.filterIndex}</label>
            <input
              id="indexSearch"
              className="index-search"
              type="search"
              placeholder={strings.filterTerms}
              value={indexQuery}
              onChange={(event) => setIndexQuery(event.target.value)}
            />
          </div>
          <div className="index-filter-field">
            <label className="index-search-label" htmlFor="indexCategoryFilter">{strings.filterCategory}</label>
            <select
              id="indexCategoryFilter"
              className="index-search index-category-filter"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="">{strings.allCategories}</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
        </div>

        <nav className="index-jump" aria-label={strings.jumpToLetter}>
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
            const isAvailable = Boolean(groups[letter]);
            return (
              <button
                key={letter}
                type="button"
                disabled={!isAvailable}
                aria-label={isAvailable ? `${strings.jumpToLetter}: ${letter}` : `${strings.noEntriesUnder} ${letter}`}
                onClick={() => jumpToLetter(letter)}
              >
                {letter}
              </button>
            );
          })}
        </nav>

        <div className="full-index" id="fullIndex">
          {sortedLetters.length === 0 ? (
            <div className="index-empty" role="status">
              {strings.noTermsMatch} “{indexQuery}”.{' '}
              <button type="button" onClick={() => setIndexQuery('')}>{strings.clearFilter}</button>
            </div>
          ) : sortedLetters.map((letter) => (
            <section key={letter} id={`index-letter-${letter}`} className="index-letter-group">
              <div className="index-letter">{letter}</div>
              <div className="index-terms">
                {groups[letter].map((term) => (
                  <button
                    key={term.word}
                    className="index-term"
                    title={term.category || ui.aiConcepts}
                    type="button"
                    onClick={() => {
                      onSelectTerm(term);
                      onClose();
                    }}
                  >
                    {term.word}
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
};
