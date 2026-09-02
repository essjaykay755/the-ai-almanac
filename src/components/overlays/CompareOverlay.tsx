import React from 'react';
import type { Term } from '../../types/almanac';
import { useDialogFocus } from '../../hooks/useDialogFocus';
import { getOverlayStrings } from '../../i18n/overlayLocale';
import { getLocalizedTermPresentation, getRuntimeLocale, getUiStrings } from '../../i18n/reactLocale';

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
  const strings = getOverlayStrings();
  const locale = getRuntimeLocale();
  const ui = getUiStrings(locale);
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
            <small>The AI Almanac · {strings.compareEyebrow}</small>
            <h2 id="compareTitle">{strings.compareTitle}</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label={`${strings.close} ${strings.compareTitle}`}>
            ×
          </button>
        </div>

        <p className="compare-intro">{strings.compareIntro}</p>

        <div className="compare-layout">
          {terms.map((term) => {
            const presentation = getLocalizedTermPresentation(term, 'dictionary', {}, locale);
            return (
              <article className="compare-card" key={term.word}>
                <small>{presentation.category || ui.aiConcepts}</small>
                <h3>{presentation.word}</h3>
                <p className="compare-part">{term.pron ? `${term.pron} · ${presentation.part}` : presentation.part}</p>

                <div className="compare-section">
                  <h4>{strings.definition}</h4>
                  <p>{presentation.definition}</p>
                </div>

                <div className="compare-section">
                  <h4>{strings.inPractice}</h4>
                  <p>{presentation.note}</p>
                </div>

                <button type="button" className="compare-open" onClick={() => onOpenTerm(term)}>
                  {strings.openThisTerm} <span aria-hidden="true">→</span>
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
