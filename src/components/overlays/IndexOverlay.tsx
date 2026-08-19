import React, { useMemo } from 'react';
import type { Term, TermSelectionTarget } from '../../types/almanac';

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
  const groups = useMemo(() => {
    const map: Record<string, Term[]> = {};
    terms.forEach((t) => {
      const l = t.word[0].toUpperCase();
      if (!map[l]) map[l] = [];
      map[l].push(t);
    });
    return map;
  }, [terms]);

  if (!isOpen) return null;

  const sortedLetters = Object.keys(groups).sort();

  return (
    <div className="overlay" id="indexOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section className="insert index-insert" role="dialog" aria-modal="true">
        <div className="insert-head">
          <div>
            <small>The AI Almanac · complete index</small>
            <h2>Every filed term</h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="index-summary" id="indexSummary">
          {terms.length} entries · {sortedLetters.length} index sections · updated field edition
        </div>

        <div className="full-index" id="fullIndex">
          {sortedLetters.map((letter) => (
            <section key={letter} className="index-letter-group">
              <div className="index-letter">{letter}</div>
              <div className="index-terms">
                {groups[letter].map((t) => (
                  <button
                    key={t.word}
                    className="index-term"
                    title={t.category || 'AI Concepts'}
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
