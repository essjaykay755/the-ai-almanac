import React from 'react';
import type { Term, TermSelectionTarget } from '../../types/almanac';

interface ListOverlayProps {
  isOpen: boolean;
  kind: 'bookmarks' | 'history';
  words: string[];
  termsByWord: Record<string, Term>;
  onClose: () => void;
  onSelectTerm: (term: TermSelectionTarget) => void;
}

export const ListOverlay: React.FC<ListOverlayProps> = ({
  isOpen,
  kind,
  words,
  termsByWord,
  onClose,
  onSelectTerm
}) => {
  if (!isOpen) return null;

  const isBookmarks = kind === 'bookmarks';
  const title = isBookmarks ? 'Dog-eared pages' : 'Reading history';
  const eyebrow = isBookmarks
    ? 'AI Almanac · saved leaves'
    : 'AI Almanac · recently opened';

  return (
    <div className="overlay" id="listOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section className="insert" role="dialog" aria-modal="true">
        <div className="insert-head">
          <div>
            <small id="listEyebrow">{eyebrow}</small>
            <h2 id="listTitle">{title}</h2>
          </div>
          <button className="close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="list" id="listContent">
          {words.length === 0 ? (
            <div className="empty-state">No pages filed here yet.</div>
          ) : (
            words.map((word) => {
              const t = termsByWord[word.toLowerCase()];
              if (!t) return null;
              return (
                <button
                  key={t.word}
                  className="list-row"
                  onClick={() => {
                    onSelectTerm(t);
                    onClose();
                  }}
                >
                  <span className="list-letter">{t.word[0].toUpperCase()}</span>
                  <span>
                    <strong>{t.word}</strong>
                    <span>{t.part}</span>
                  </span>
                  <span>open →</span>
                </button>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};
