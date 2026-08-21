import React from 'react';
import type { TimelineItem, Term, TermSelectionTarget } from '../../types/almanac';
import { useDialogFocus } from '../../hooks/useDialogFocus';

interface TimelineOverlayProps {
  isOpen: boolean;
  timeline: TimelineItem[];
  termsByWord: Record<string, Term>;
  onClose: () => void;
  onSelectTerm: (term: TermSelectionTarget) => void;
}

export const TimelineOverlay: React.FC<TimelineOverlayProps> = ({
  isOpen,
  timeline,
  termsByWord,
  onClose,
  onSelectTerm
}) => {
  const dialogRef = useDialogFocus(isOpen, onClose);
  if (!isOpen) return null;

  return (
    <div className="overlay" id="timelineOverlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <section
        ref={dialogRef}
        className="insert timeline-insert"
        role="dialog"
        aria-modal="true"
        aria-labelledby="timelineTitle"
        tabIndex={-1}
      >
        <div className="timeline-head">
          <div>
            <small>The AI Almanac · timeline</small>
            <h2 id="timelineTitle">How the terms developed</h2>
          </div>
          <button className="close" type="button" onClick={onClose} aria-label="Close timeline">
            ×
          </button>
        </div>

        <div className="timeline-paper">
          <div className="timeline-line"></div>
          <div className="timeline-items" id="timelineItems">
            {timeline.map((item) => (
              <article key={item.year + item.title} className="time-item">
                <div className="time-year">{item.year}</div>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                <button
                  type="button"
                  onClick={() => {
                    const t = termsByWord[item.term.toLowerCase()];
                    if (t) {
                      onSelectTerm(t);
                      onClose();
                    }
                  }}
                >
                  Open this term →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
