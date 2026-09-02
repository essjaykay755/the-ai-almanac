import React from 'react';
import type { Term, TermSelectionTarget } from '../../types/almanac';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import { getOverlayStrings } from '../../i18n/overlayLocale';

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
  const strings = getOverlayStrings();
  const dialogRef = useDialogFocus(isOpen, onClose);
  if (!isOpen) return null;

  const isBookmarks = kind === 'bookmarks';
  const title = isBookmarks ? strings.bookmarks : strings.readingHistory;
  const eyebrow = `The AI Almanac · ${isBookmarks ? strings.savedEntries : strings.recentlyOpened}`;
  const emptyMessage = isBookmarks ? strings.noBookmarks : strings.noHistory;

  return (
    <div className="overlay" id="listOverlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="insert"
        role="dialog"
        aria-modal="true"
        aria-labelledby="listTitle"
        tabIndex={-1}
      >
        <div className="insert-head">
          <div>
            <small id="listEyebrow">{eyebrow}</small>
            <h2 id="listTitle">{title}</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label={`${strings.close} ${title}`}>
            ×
          </button>
        </div>

        <div className="list" id="listContent">
          {words.length === 0 ? (
            <div className="empty-state">{emptyMessage}</div>
          ) : (
            words.map((word) => {
              const term = termsByWord[word.toLowerCase()];
              if (!term) return null;
              return (
                <button
                  key={term.word}
                  className="list-row"
                  type="button"
                  onClick={() => {
                    onSelectTerm(term);
                    onClose();
                  }}
                >
                  <span className="list-letter">{term.word[0].toUpperCase()}</span>
                  <span>
                    <strong>{term.word}</strong>
                    <span>{term.part}</span>
                  </span>
                  <span>{strings.open} →</span>
                </button>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};
