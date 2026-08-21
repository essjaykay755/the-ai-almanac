import React from 'react';
import type { Term } from '../../types/almanac';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface CompareOverlayProps {
  isOpen: boolean;
  leftTerm: Term;
  rightTerm: Term;
  onClose: () => void;
  onOpenTerm: (term: Term) => void;
}

export const CompareOverlay: React.FC<CompareOverlayProps> = ({
  isOpen,
  leftTerm,
  rightTerm,
  onClose,
  onOpenTerm
}) => {
  const dialogRef = useDialogFocus(isOpen, onClose);
  if (!isOpen) return null;

  const terms = [leftTerm, rightTerm];

  return (
    <div className="overlay" id="compareOverlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="insert compare-insert"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compareTitle"
        tabIndex={-1}
      >
        <div className="insert-head">
          <div>
            <small>The AI Almanac · side-by-side reading</small>
            <h2 id="compareTitle">Compare terms</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label="Close comparison">
            ×
          </button>
        </div>

        <p className="compare-intro">
          Read both definitions in the same frame, then open either entry for its full field note.
        </p>

        <div className="compare-layout">
          {terms.map((term) => (
            <article className="compare-card" key={term.word}>
              <small>{term.category || 'AI Concepts'}</small>
              <h3>{term.word}</h3>
              <p className="compare-part">{term.pron ? `${term.pron} · ${term.part}` : term.part}</p>

              <div className="compare-section">
                <h4>Definition</h4>
                <p>{term.definition}</p>
              </div>

              <div className="compare-section">
                <h4>In practice</h4>
                <p>{term.note || 'Use the term precisely in context.'}</p>
              </div>

              <button type="button" className="compare-open" onClick={() => onOpenTerm(term)}>
                Open this term <span aria-hidden="true">→</span>
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
