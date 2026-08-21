import React, { useEffect, useMemo, useState } from 'react';
import type { Term, TermSelectionTarget } from '../../types/almanac';
import { normalizeText } from '../../utils/search';
import { useDialogFocus } from '../../hooks/useDialogFocus';

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
    () => Array.from(new Set(terms.map((term) => term.category || 'AI Concepts'))).sort(),
    [terms]
  );

  const filteredTerms = useMemo(() => {
    const query = normalizeText(indexQuery);
    if (!query && !categoryFilter) return terms;

    return terms.filter((term) => normalizeText([
      term.word,
      term.category,
      ...term.aliases
    ].join(' ')).includes(query) && (!categoryFilter || (term.category || 'AI Concepts') === categoryFilter));
  }, [categoryFilter, indexQuery, terms]);

  const groups = useMemo(() => {
    const map: Record<string, Term[]> = {};
    filteredTerms.forEach((t) => {
      const l = t.word[0].toUpperCase();
      if (!map[l]) map[l] = [];
      map[l].push(t);
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
    <div className="overlay" id="indexOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
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
            <small>The AI Almanac · complete index</small>
            <h2 id="index-title">Every filed term</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label="Close complete index">
            ×
          </button>
        </div>

        <div className="index-summary" id="indexSummary" aria-live="polite">
          {filteredTerms.length} of {terms.length} entries · {sortedLetters.length} index sections · updated field edition
        </div>

        <div className="index-tools">
          <div className="index-filter-field">
            <label className="index-search-label" htmlFor="indexSearch">Filter the complete index</label>
            <input
              id="indexSearch"
              className="index-search"
              type="search"
              placeholder="Filter terms, aliases, or categories…"
              value={indexQuery}
              onChange={(event) => setIndexQuery(event.target.value)}
            />
          </div>
          <div className="index-filter-field">
            <label className="index-search-label" htmlFor="indexCategoryFilter">Filter by category</label>
            <select
              id="indexCategoryFilter"
              className="index-search index-category-filter"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
        </div>

        <nav className="index-jump" aria-label="Jump to index letter">
          {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => {
            const isAvailable = Boolean(groups[letter]);
            return (
              <button
                key={letter}
                type="button"
                disabled={!isAvailable}
                aria-label={isAvailable ? `Jump to ${letter}` : `No entries under ${letter}`}
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
              No terms match “{indexQuery}”.{' '}
              <button type="button" onClick={() => setIndexQuery('')}>Clear filter</button>
            </div>
          ) : sortedLetters.map((letter) => (
            <section key={letter} id={`index-letter-${letter}`} className="index-letter-group">
              <div className="index-letter">{letter}</div>
              <div className="index-terms">
                {groups[letter].map((t) => (
                  <button
                    key={t.word}
                    className="index-term"
                    title={t.category || 'AI Concepts'}
                    type="button"
                    onClick={() => {
                      onSelectTerm(t);
                      onClose();
                    }}
                  >
                    {t.word}
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
